let fs = require("fs");

require("chromedriver");
let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let cFile = process.argv[2];
let uToAdd = process.argv[3];

//actual code is by selenium => using promises
//we are writing the same code in different ways and the computer will compile it in
//then() way only.

(async function () {
    try {
        //implicit wait => no need to see where we all we have to wait individually
        await driver.manage().setTimeouts({
            implicit:10000,
            pageLoad:10000
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
        console.log("We have logged in");
        let loginBtn = await driver.findElement("button[data-analytics=LoginPassword]");
        await loginBtn.click();

        let adminLinkAnchor = driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
        let adminPageUrl = await adminLinkAnchor.getAttribute("href");
        await driver.get(adminPageUrl);
        let manageContestTab = await driver.findElement(swd.By.css(".administration header ul li"));
        await manageContestTab[1].click();
    } catch (err) {
        console.log(err);
    }

})()