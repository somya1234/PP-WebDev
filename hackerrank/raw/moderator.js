let fs = require("fs");
let swd = require("selenium-webdriver");
require("chromedriver");

let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

//for 0 and 1 are something else in the array as the arguments of process
//and node and moderator.js are the command , so input starts from credentials.js directly.
let cFile = process.argv[2];
let uToAdd = process.argv[3];

//removing async while writing because it places await automatically while writing the promises
//as in parallel await, we don't need to write await everywhere.
//so at the time of execution, place async keyword before the function .

(async function () {
    // ( function () {
    try {
        //it is very important to wait for elements before just finding them.
        //so we wait here once for all elements.

        driver.manage().setTimeouts({
            implicit: 10000,
            //implicit wait is the time searching for an element on the page
            //pageLoad is the time waiting for a URL to load.
            pageLoad: 10000
            //as this hackerrank main page takes a lot of time to load.
        })

        console.log("try block")

        //error     
         // cFile = JSON.parse(cFile);
        //it will not parse the CFile directly, it will parse the object.
        let data = await fs.promises.readFile(cFile);
        let { user, pwd, url } = JSON.parse(data);
        await driver.get(url);

        let usernameBoxPromise = driver.findElement(swd.By.css("#input-1"));
        let passwordBoxPromise = driver.findElement(swd.By.css("input[type=password]"));
        let combinedInput = await Promise.all([usernameBoxPromise, passwordBoxPromise]);
        let userSendDataPromise = combinedInput[0].sendKeys(user);
        let pwdSendDataPromise = combinedInput[1].sendKeys(pwd);
        //no let for next line as we don't have to do anything of the promise once
        //the values are entered.
        await Promise.all([userSendDataPromise, pwdSendDataPromise]);

        let findLoginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
        await findLoginBtn.click();
        console.log("successfully logged in.");

        /****************click on the Administration in home page ************ */
        let adminTagPromise = await driver.findElement(swd.By.css(".dropdown-menu a[data-analytics=NavBarProfileDropDownAdministration]"));
        //error
        // await adminTagPromise.click(); => it does not have the property of click.
        let adminUrlPromise = await adminTagPromise.getAttribute("href");
        await driver.get(adminUrlPromise);

        /**************click on Manage Challenges ************************** */
        let manageChallengeListPromise = await driver.findElements(swd.By.css(".administration ul li a"));
        let manageChallengeUrlPromise = await manageChallengeListPromise[1].getAttribute("href");
        // manageChallengeUrlPromise => this promise gives the whole of the url .
        await driver.get(manageChallengeUrlPromise);
        console.log("manage challenges clicked");

        /*******************click on create challenges ********************* */
        // let createChallengePromise = await driver.findElement(swd.By.css(".administration button"));
        // await createChallengePromise.click();

        /******************editing the Challenges************************ */
        let editTheChallengeAnchorPromise = await driver.findElements(swd.By.css(".backbone.block-center"))
        console.log("i found edit challenege")
        console.log(editTheChallengeAnchorPromise);
        for(let i=0;i<editTheChallengeAnchorPromise.length;i++){
            let editTheChallngUrlPromise = await editTheChallengeAnchorPromise[i].getAttribute("href");
            await driver.get(editTheChallngUrlPromise);
            console.log("i visited the edit challenge page.");
        }


        console.log("successfully completed.");
    }
    catch (err) {
        console.log("i am error");
        console.error(err)
    }

})()
