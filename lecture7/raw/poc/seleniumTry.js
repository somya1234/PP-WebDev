let swd = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");
// let credentials = require("credentials.json");
let credentialFile = process.argv[2];
let metaDataFile = process.argv[3];
let codeFile = "codes/code1/main.java";
// let courseName = process.argv[4];
let username, password;

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

// => search email
// => input email
// => search password
// => input password
//=> search submit
//=> press submit btn

let credentialsWillBeReadPromise = fs.promises.readFile(credentialFile);
credentialsWillBeReadPromise.then(function (credentials) {
    credentials = JSON.parse(credentials);
    username = credentials.username;
    // console.log(username)
    password = credentials.password;
    let googlePageWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login");
    return googlePageWillBeOpenedPromise;
}).then(function(){
    //implicit wait
    //you do not need wait for the elements anywhere else in the program. 
    //it will set to wait for all findElement() and findElements() by default using this fn.
    let willBeSetPromise = driver.manage().setTimeouts({
        implicit:10000
    })
    return willBeSetPromise;
})
.then(function () {
    // console.log("Google page opened");
    //when the page is opened
    //search email box

    //we find this email element input by "inspecting" at that usernname box.
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
    }).then(willWaitForOverlay)
    // }).then(function () {
    //     let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
    //     return siteOverlayWillBeSelectedPromise;
    //     //*******************************check************************** */
    //     // if both these fns can be converted into one, 
    //     //by replacing soe with the class from #siteOverlay.
    // }).then(function (soe) {
    //     //it will throw error after 10s , if the preloader doesn't hide
    //     let waitForOverlayToRemovepromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
    //     return waitForOverlayToRemovepromise;
    // })
    .then(function () {
        let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
        return courseWillBeLocatedPromise;
    }).then(function (courseCard) {
        let courseCardWillBeClickedPromise = courseCard.click();
        return courseCardWillBeClickedPromise;
    })
   
    .then(function () {
        //read json file
        let metaDataWillBeReadPromise = fs.promises.readFile(metaDataFile);
        console.log(metaDataFile);
        return metaDataWillBeReadPromise;
    }).then(function (metadata) {
        //check why it is important to parse again
        console.log(metadata);
        metadata = JSON.parse(metadata);
        let question = metadata[0];
        console.log(question +" this is my wquestion");
        let willWaitToBenavigatedToQnPage = goToQuestionPage(question);
        return willWaitToBenavigatedToQnPage;
    }).then(function(){
        let willWaitForTheSolutionPromise = solveQuestion();
        return willWaitForTheSolutionPromise;
    })
    .catch(function (err) {
        //if any error comes in between the then chain, then , if then() wasn't able to cactch 
        // the error in the chain, catch() will catch the error.
        console.log(err);
    });

//these code is used a lot of times
//so we are writing using a function and made a separate promise here.

function goToQuestionPage(question) {
    //wait for overlay 
    //will click on module 
    //wait for overlay 
    // will click on lecture
    //wait for overlay
    //click on question 
    return new Promise(function(resolve,reject){
        let waitPromise = willWaitForOverlay();
        waitPromise.then(function(){
            let willClickModule = navigationHelper(question.module,".lis.tab");
            return willClickModule;
        }).then(willWaitForOverlay).then(function(){
            let willClickOnLecture = navigationHelper(question.lecture,".collection-item");
            return willClickOnLecture;
        }).then(willWaitForOverlay).then(function(){
            let willClickQuestion = navigationHelper(question.problem,".collection-item");
            return willClickQuestion;
        })
        //we can write function(resolve ) or resolve(); directly 
        .then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}

function willWaitForOverlay() {
    let waitForPromiseIsDismissed = new Promise(function (resolve, reject) {
        //let us assume done is working
        //wait for overlay
        let waitForSoe = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay")));
        //search overlay

        /*
        waitForSoe
            .then(driver.wait(swd.until.elementIsNotVisible(driver.findElement(swd.By.css("#siteOverlay"))), 10000)) 
            .then(function () {
                // console.log(resolve());
                console.log("chlgya");
                resolve();
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })*/



        waitForSoe.then(driver.findElement(swd.By.css("#siteOverlay")))
            .then(function (soe) {
                //wait
                let waitForOverlayToRemovepromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
                return waitForOverlayToRemovepromise;
            }).then(function () {
                // console.log(resolve());
                resolve();
            }).catch(function (err) {
                reject(err);
            })

        //done above //this was just rough to understand in layman language
        // if(done){
        //     resolve();
        // } else {
        //     reject(err);
        // }
    })
    return waitForPromiseIsDismissed;
}

function navigationHelper(nameToBeSelected, selector){
    return new Promise(function(resolve,reject){
        let gElements;
         //it is necessary to click, because it is not necessary that we will always be selecting the first 
        //element, which is by default.
        //we can also select DP.
        let listTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(selector)), 10000);
        listTabToBeLocatedPromise.then(function () {
            let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(selector));
            return ModulesWillBeSelectedPromise;
        }).then(function (modules) {
            //console.log(modules);
            gElements = modules;
            // console.log(modules.length);
            let moduleTextPromiseArr = [];
            for (let i = 0; i < modules.length; i++) {
                //getText() also gives a promise.
                let moduleNamePromise = modules[i].getText();
                moduleTextPromiseArr.push(moduleNamePromise);
            }
            let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
            return AllModuleNamesPromise;
        }).then(function (AllModulesText) {
            let i;
            for (i = 0; i < AllModulesText.length; i++) {
                if (AllModulesText[i].includes(nameToBeSelected) === true) {
                    //it results in true or false (boolean value)
                    break;
                }
            }
            let moduleWillBeClickedPromise = gElements[i].click();
            //understand this by printing output
            return moduleWillBeClickedPromise;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    
    })
}


function solveQuestion(){
    //click on editorTab 
    //take the test whatever written there
    //upload the answer
    return new Promise(function(resolve,reject){
        let waitPromise = willWaitForOverlay();
        waitPromise.then(function(){
            let willClickOnEditorPromise = clickOnEditor();
            console.log("idhar aagya firse")
            return willClickOnEditorPromise; 
        }).then(function(){
            let willUploadAnswerPromise = uploadAnswer();
            return willUploadAnswerPromise;
        })
        .then(function(){
            console.log("Solution found");
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

function uploadAnswer(){
    let codeText = "";
    return new Promise(function(resolve,reject){
        let readFile = fs.promises.readFile(codeFile);
        readFile.then(function(code){
            codeText+=code;
        })
        .then(function(){
            let findTextEditorPromise = driver.findElement(swd.By.css("#codeEditor3120 textarea"));
            return findTextEditorPromise;
        }).then(function(textbox){
            console.log("we got elements");
            let textBoxClearPromise = textbox.clear();
           textbox.sendKeys(codeText);
            return textBoxClearPromise;
        })
        .then(function(){
            console.log("Code has been copied");
            resolve("success 1");
        }).catch(function(err){
            console.log(err);
            reject(err);
        })

    })
}

function clickOnEditor(){
    return new Promise(function(resolve,reject){
        let editorWillBeSelectedPromise = driver.findElements(swd.By.css(".editorTab a"));
        editorWillBeSelectedPromise.then(function(editor){
        console.log("mila element");
        let newPromise = editor[0].click();
        return newPromise;
    }).then(function(){
        console.log("Editor is clicked");
        resolve();
    }).catch(function(err){
        console.log(err);
        reject(err);
    })
})
}

console.log("after");