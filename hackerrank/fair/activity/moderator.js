let fs = require("fs");

require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let questionFile = process.argv[3];

//actual code is by selenium => using promises
//we are writing the same code in different ways and the computer will compile it in
//then() way only.

(async function () {
    try {
        await loginHelper();
        //user will never use href
        //so find element for dropdown **************************
        let DropDownBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"));
        await DropDownBtn.click();

        let adminLinkAnchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
        await adminLinkAnchor.click();
        // await driver.get(adminPageUrl);
        //sometimes no element found error comes => that is because of loader.
        //stale elements => selected elements were in page but they are not currently here
        /******wait for loader to avoid stale error *************** */
        await waitForLoader();
        /************ manage contest click *********** */
        let manageContestTab = await driver.findElements(swd.By.css(".administration header ul li"));
        await manageContestTab[1].click();

        let ManageChallengePage = await driver.getCurrentUrl();
        //to get an object
        let questions = require(questionFile);
        for(let i=0;i<questions.length;i++){
            await driver.get(ManageChallengePage);
            // await waitForLoader();
            await createNewChallenge(questions[i]);
        }
        //json file read 

        /*******create challenge click *********** */
    } catch (err) {
        console.log(err);
    }

})()

async function editorHandler(parentSelector, selector, data) {
    selector.split(" ").pop();
    let textAreaParent = await driver.findElement(swd.By.css(parentSelector));
    //in dom=> document.querySelector(".problem-statement").style.height="10px";
    //you can change style.backgroundColor = "red"
    //you can not use document object here [like in jquery ]
    //you have to use arguments to manipulate here .
    //
    //here, we only use argument[0] in selenium instead of document in jquery.
    await driver.executeScript("arguments[0].style.height=10px", textAreaParent)
    await selector.sendKeys("data");
}

async function loginHelper() {
    //implicit wait => no need to see where we all we have to wait individually
    await driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000
    })

    let data = await fs.promises.readFile(cFile);
    let { url, pwd, user } = JSON.parse(data);
    await driver.get(url);
    //parallel code => s no await here , await at the time of Promises.all()
    //you can check await_parallel file
    let unInputWillBeFoundPromise = driver.findElement(swd.By.css("#input-1"));
    let psInputWillBeFoundPromise = driver.findElement(swd.By.css("#input-2"));
    let unNpsEl = await Promise.all([unInputWillBeFoundPromise, psInputWillBeFoundPromise]);
    let usernameWillBeSendPromise = unNpsEl[0].sendKeys(user);
    let passwordWillBeSendPromise = unNpsEl[1].sendKeys(pwd);
    await Promise.all([usernameWillBeSendPromise, passwordWillBeSendPromise]);
    let loginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
    await loginBtn.click();
    console.log("We have logged in");
}


//we made it in a fn as it will be used time and again to wait till loader hides to remove the 
//stale elements error
async function waitForLoader() {
    //stale error changes the name of the element.
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}

/*** create New challenge function *************** */

async function createNewChallenge(question) {
    let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
    await createChallenge.click();
    await waitForLoader();
    //operation => selection , data entry
    //we are putting it into an array to save the time
    //there are all the selectors 

    //note => id uniquely identifies in a page.
    //so if there is any id given, we don't have to doubt if there is another element with the same id
    //because it is not possibe.

    //element will be found promise 
    let eSelector = ["name", "textarea.description", "#problem_statement-container .CodeMirror textarea",
        "#input_format-container .CodeMirror textarea",
        "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];
    //use map() to reduce the code .
    let eleWillBeSelectedPromise = eSelector.map(function (s) {
        //we will not put await here because we want to execute it parallely.
        //if we put await here, it will not give second element until the first element will not found
        //but we want to execute it parallely.(all calls at one time with map time by time)
        //so that they can find their element and return their value whenever they get their values.
        return driver.findElement(swd.By.css(s));
    })
    //second way instead of map()
    /*
    let AllSelecors = [];
    for(let i=0;i<eSelector.length;i++){
        let elementsWillBeFoundPromise =  driver.findElement(swd.By.css(eSelector[i]));
        AllSelecors.push(eleWillBeSelectedPromise);
    }
    */
    //await 
    //promise.all maintains the order in which order the answer is get first,
    //in that order only it will give for sendKeys . 
    //so it maintains the order by taking the save indices.

    let allElements = await Promise.all(eleWillBeSelectedPromise);
    //always use [] to fetch any key value form the object 
    //whenever there is space in th key
    let NameWillBeAddedPromise = allElements[0].sendKeys(question["Challenge Name"]);
    let descWillBeAddedPromise = allElements[1].sendKeys(question["Description"]);
    await Promise.all([NameWillBeAddedPromise, descWillBeAddedPromise]);
    console.log("name and description added");

    let data = "strong try";
    await editorHandler("#problem_statement-container .CodeMirror div", allElements[2], question["Problem Statement"]);
    await editorHandler("#input_format-container .CodeMirror div",allElements[3], question["Input Format"]);
    await editorHandler("#constraints-container .CodeMirror div",allElements[4], question["Constraints"]);
    await editorHandler("#output_format-container .CodeMirror div",allElements[4], question["Output Format"]);

    console.log("all code editors have some data .");
    //just to show that we can exxecute js using executeScript 
    // await driver.executeScript("alert(hello all)");

    let TagInput = allElements[6];
    await TagInput.sendKeys(data);
    await TagInput.sendKeys(swd.Key.ENTER);
    let submitBtn = await driver.findElement(swd.By.css("save-challenge.btn.btn-green"));
    await submitBtn.click();


    //challengeName
    //Description
    //Problem Statement
    //Input Format
    //Constraints
    //Output Format
    //Tags 
    //Save Changes
}