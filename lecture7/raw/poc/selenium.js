let swd = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");
// let credentials = require("credentials.json");
let credentialFile = process.argv[2];
let metaDataFile = process.argv[3];
// let courseName = process.argv[4];
let username, password, gModules;

//browser build
let bldr = new swd.Builder();
// using driver, it is giving a tab, you can work on that particular tab. 
let driver = bldr.forBrowser("chrome").build();

//promise => page open future
//it will not open the google page, it will give a promise to open 
//but at current the state of promise is pending, we don;t know when it will open the page.
//when the task is performed, it will move to the then portion.

//because we know our procedure has this url for login
// let googlePageWillOpenPromised =  (earlier)


//all these things are done serially asynchronous way.
// **************************Login*****************************

let credentialsWillBeReadPromise = fs.promises.readFile(credentialFile);
credentialsWillBeReadPromise.then(function (credentials) {
    credentials = JSON.parse(credentials);
    username = credentials.username;
    // console.log(username)
    password = credentials.password;
    let googlePageWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login");
    return googlePageWillBeOpenedPromise;
}).then(function () {
    // console.log("Google page opened");
    //when the page is opened
    //search email box

    //we find this email element input by inspecting at that usernname box.
    //we use findElement because it is an attribute (type is an atribute)
    //everything will be an attribute except input (which is a tag).

    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password"));
    let combinedPromise = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    //array => answer

    return combinedPromise;
    //click
}).then(function (ElementsArray) {
    let emailWillBeSendPromise = ElementsArray[0].sendKeys(username);
    let passwordWillBeSendPromise = ElementsArray[1].sendKeys(password);
    let combinedInputPromise = Promise.all([emailWillBeSendPromise, passwordWillBeSendPromise]);
    return combinedInputPromise;

}).then(function () {
    let submitBtnWillSelected = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillSelected;
}).then(function (submitbtn) {
    let submitBtnClicked = submitbtn.click();
    return submitBtnClicked;
})

    /**************************Home Page**************************************/
    .then(function () {
        //you should always wait
        let willWaitToResourceToLoad = driver.wait(swd.until.elementsLocated(swd.By.css(".resource a")));
        return willWaitToResourceToLoad;
    })
    .then(function () {
        //resource card find
        let resocurcePageAnchorWillBeSelectedPromise = driver.findElement(swd.By.css(".resource a"));
        return resocurcePageAnchorWillBeSelectedPromise;
        // console.log("all send");
    }).then(function (resourceCard) {
        //to open at the same page rather than in new tab, we select get attribute (href),
        //otherwise we could have done by click method by taking the class only.
        let rPageLinkPromise = resourceCard.getAttribute("href");
        return rPageLinkPromise;
        //resource page
    }).then(function (rPageLink) {
        console.log("reached courses page");
        // console.log(rPageLink);
        let NavigateToCourseListPage = driver.get(rPageLink);
        return NavigateToCourseListPage;
    }).then(function () {
        let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
        return siteOverlayWillBeSelectedPromise;
        //*******************************check************************** */
        // if both these fns can be converted into one, 
        //by replacing soe with the class from #siteOverlay.
    }).then(function (soe) {
        //it will throw error after 10s , if the preloader doesn't hide
        let waitForOverlayToRemovepromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
        return waitForOverlayToRemovepromise;
    }).then(function () {
        let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
        return courseWillBeLocatedPromise;
    }).then(function (courseCard) {
        let courseCardWillBeClickedPromise = courseCard.click();
        return courseCardWillBeClickedPromise;
    })
    //*******************************Module Click  */
    .then(function () {
        //it is necessary to click, because it is not necessary that we will always be selecting the first 
        //element, which is by default.
        //we can also select DP.
        let listToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
        return listToBeLocatedPromise;
        ///////////////////////not sure about the above statement
    }).then(function () {
        let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
        return ModulesWillBeSelectedPromise;
    }).then(function (modules) {
        //console.log(modules);
        gModules = modules;
        // console.log(modules.length);
        let moduleTextPromiseArr = [];
        for (let i = 0; i < modules.length; i++) {
            let moduleNamePromise = modules[i].getText();
            moduleTextPromiseArr.push(moduleNamePromise);
        }
        let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
        return AllModuleNamesPromise;
    }).then(function (AllModulesText) {
        let i;
        for (i = 0; i < AllModulesText.length; i++) {
            if (AllModulesText[i].includes("Dynamic Programming") === true) {
                //it results in true or false (boolean value)
                break;
            }
        }
        let moduleWillBeClickedPromise = gModules[i].click();
        //understand this by printing output
        return moduleWillBeClickedPromise;
    })
    //Homework ---------------------------------------------
    // ********************************Lecture***************************************
    //***********************************Question**************************** */
    .then(function () {
        //read json file
        let metaDataWillBeReadPromise = fs.promises.readFile(metaDataFile);
        return metaDataWillBeReadPromise;
    }).then(function (metadata) {
        //check why it is important to parse again
        metadata = JSON.parse(metadata);
        let question = metadata[0];
        // let willOpenQuestionPagePromise = driver.get(question.url);
        // return willOpenQuestionPagePromise;
        // }).then(function(){
        // console.log("Opened question page");
        // list => names
        // name => metadata.json => question name
    }).catch(function (err) {
        //if any error comes in between the then chain, and the chain will of then will break
        // and catch will catch the error
        console.log(err);
    });

// => search email
// => input email
// => search password
// => input password
//=> search submit
//=> press submit btn

function goToquestionPage() {
    let listTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
    listTabToBeLocatedPromise.then(function () {
        let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
        return ModulesWillBeSelectedPromise;
    }).then(function (modules) {
        //console.log(modules);
        gModules = modules;
        // console.log(modules.length);
        let moduleTextPromiseArr = [];
        for (let i = 0; i < modules.length; i++) {
            let moduleNamePromise = modules[i].getText();
            moduleTextPromiseArr.push(moduleNamePromise);
        }
        let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
        return AllModuleNamesPromise;
    }).then(function (AllModulesText) {
        let i;
        for (i = 0; i < AllModulesText.length; i++) {
            if (AllModulesText[i].includes("Dynamic Programming") === true) {
                //it results in true or false (boolean value)
                break;
            }
        }
        let moduleWillBeClickedPromise = gModules[i].click();
        //understand this by printing output
        return moduleWillBeClickedPromise;
    })

}

console.log("yaha kuch nahi hua hai");

//earlier
// googlePageWillOpenPromised.catch(function(err){
//     console.log(err);
// });