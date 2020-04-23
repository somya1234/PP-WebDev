let swd = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");

console.log("Before");

let credentailFile = process.argv[2];
let metadataFile = process.argv[3];

//browser build
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let username, password;
let gModules, moduleIndex, Tomodule;
let gLectures, Tolecture;
let Toproblem, gProblems;

let googlePageWillBeOpenedPromise = driver.get("http://www.pepcoding.com/login");
googlePageWillBeOpenedPromise.then(function () {
    let credentailsWillBeReadPromise = fs.promises.readFile(credentailFile);
    // console.log(credentailsWillBeReadPromise); => pending state
    return credentailsWillBeReadPromise;
}).then(function (credentails) {
    // console.log(credentails);
    //it is very important to parse the any object into JSON before use.
    //because what we get is a promise, now we have to convert into an object.
    credentails = JSON.parse(credentails);
    // console.log(credentails);
    username = credentails.username;
    password = credentails.password;
    //no need to make separate promise for the credentials and the email, password inputs
    //we can work with the single promise also because credntials promise is not returning anything.
})
    .then(function () {
        let emailBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[placeholder=email]"));
        let passwordBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
        let combinedPromise = Promise.all([emailBoxWillBeSelectedPromise, passwordBoxWillBeSelectedPromise]);
        return combinedPromise;
    }).then(function (ElementsArray) {
        let emailWillBeFilledPromise = ElementsArray[0].sendKeys(username);
        let passwordWillBeFilledPromise = ElementsArray[1].sendKeys(password);
        let combinedInputPromise = Promise.all([emailWillBeFilledPromise, passwordWillBeFilledPromise]);
        return combinedInputPromise;
    }).then(function () {
        //we write classes, id's and tags in the similar way we used to write in web scrapping
        //this is the way to write attributes in selenium.
        let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
        return submitBtnWillBeSelectedPromise;
    }).then(function (submitBtn) {
        let submitBtnClickedPromise = submitBtn.click();
        return submitBtnClickedPromise;
        // }).then(function(){
        //     //this way it will open up in a new tab
        //     //but we don not want this
        //     //so let's ignore this
        //     let resourceCardWillBeSelectedPromise = driver.findElement(swd.By.css(".card.resource.no-padding.no-margin"));
        //     return resourceCardWillBeSelectedPromise;
        // }).then(function(rPage){
        //     let resourcePage = rPage.click();
        //     return resourcePage;
        // })
        //we can do with another tab also, but here we want to work with the same tab to look more good.
    }).then(function () {
        let rewbwp = driver.wait(swd.until.elementLocated(swd.By.css('.resource a')), 10000);
        return rewbwp;
    })
    .then(function () {
        let resourcePageAnchorWillBeSelectedPromise = driver.findElement(swd.By.css(".resource a"));
        return resourcePageAnchorWillBeSelectedPromise;
    }).then(function (resourceAnchor) {
        let resourcePageLinkPromise = resourceAnchor.getAttribute("href");
        return resourcePageLinkPromise;
    }).then(function (resourceLink) {
        let NavigateToCoursePagePromise = driver.get(resourceLink);
        return NavigateToCoursePagePromise;
    })
    // here we can use click function also, because it takes us to the same page only.
    /*
    .then(function(){
        let courseAnchorPromise = driver.findElement(swd.By.css("#courseCard33 a"));
        return courseAnchorPromise;
    }).then(function(courseAnchor){
        let courseWillBeSelectedPromise = courseAnchor.getAttribute("href");
        return courseWillBeSelectedPromise;
    }).then(function(cLink){
        let NavigateToModulePage = driver.get(cLink);
        return NavigateToModulePage;
    })*/
    //or method)
    //**************remove overlay to select course******************* */
    .then(function () {
        let owbfp = driver.wait(swd.until.elementLocated(swd.By.css('#siteOverlay')), 10000)
        return owbfp;
    })
    .then(function () {
        let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
        return siteOverlayWillBeSelectedPromise;
    }).then(function (siteOverlay) {
        let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(siteOverlay), 10000);
        return waitForOverlayToRemovePromise;
    })
    .then(function () {
        let courseWillBeSelectedPromise = driver.findElement(swd.By.css("#courseCard33"));
        return courseWillBeSelectedPromise;
    }).then(function (course) {
        let courseWillBeClickedPromise = course.click();
        return courseWillBeClickedPromise;
    })
    //**********************************metadata file read******************************
    .then(function () {
        let metaDataWillbeReadPromise = fs.promises.readFile(metadataFile);
        return metaDataWillbeReadPromise;
    }).then(function (metaData) {
        metaData = JSON.parse(metaData);
        let question = metaData[0];
        Tomodule = question.module;
        Tolecture = question.lecture;
        Toproblem = question.problem;
        console.log(Tolecture);
    }) 
        /*******************module overlay *Not Removed*      ********************** */
    .then(function () {
        let listToBeLocatedPromise = driver.wait(swd.until.elementLocated(swd.By.css(".lis.tab")), 10000);
        return listToBeLocatedPromise;
    }).then(function () {
        let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
        return ModulesWillBeSelectedPromise;
    }).then(function (modules) {
        gModules = modules;
        // console.log(modules); => promises array
        let moduleTextPromiseArr = [];
        for (let i = 0; i < modules.length; i++) {
            let moduleNamePromise = modules[i].getText();
            moduleTextPromiseArr.push(moduleNamePromise);
        }
        // console.log(moduleTextPromiseArr);
        let AllModulesNamesPromise = Promise.all(moduleTextPromiseArr);
        // console.log(AllModulesNamesPromise);
        return AllModulesNamesPromise;
    }).then(function (AllModulesText) {
        let i;
        for (i = 0; i < AllModulesText.length; i++) {
            //Tomodule contains "Data Structure and Algorithms"
            if (AllModulesText[i].includes(Tomodule) == true) {
                break;
            }
        }
        moduleIndex = i;
        let moduleWillBeClickedPromise = gModules[i].click();
        return moduleWillBeClickedPromise;
        // console.log(AllModulesText);
        //******************module ends*********************** */
    }) 
    /**************remove overlay for lecture  (from module) ********************************** */
    .then(function () {
        //we use wait so that it doesn't findElement straight away in the next step
        //it waits for 10 seconds to come and then searches for the particular element
        //eg - if the speed of net is slow, and if we do not use wait for element and it searches for
        //it straight away, then it will give error because no element is located, so how will it find.
        // so for that we first need to wait for the element to occur
        //and it will find the element from inspect in the time span of 10 seconds, if not found
        //now it can give the error.
        let moduleWillWaitOverlayPromise = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay"), 10000));
        return moduleWillWaitOverlayPromise;
    }).then(function () {
        let moduleOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
        return moduleOverlayWillBeSelectedPromise;
    }).then(function (moduleOverlay) {
        let RemoveModuleOverlayPromise = driver.wait(swd.until.elementIsNotVisible(moduleOverlay));
        return RemoveModuleOverlayPromise;

        //******************finding lecture name*************************************************** */
    }).then(function () {
        let searchModule = "module" + moduleIndex;
        let lectureListLocatePromise = driver.wait(swd.until.elementsLocated(swd.By.css("#" + searchModule + " ul a p")));
        return lectureListLocatePromise;
    }).then(function () {
        //module0=> ul> a> p
        let searchModule = "module" + moduleIndex;
        let LecturesWillBeSelectedPromise = driver.findElements(swd.By.css("#" + searchModule + " ul a p"));
        console.log("lecture promises selected");
        return LecturesWillBeSelectedPromise;
        //*****************************lectures**************************************** */
    }).then(function (lectures) {
        gLectures = lectures;
        let lectureTextPromiseArr = [];
        for (let i = 0; i < lectures.length; i++) {
            let lectureNamePromise = lectures[i].getText();
            lectureTextPromiseArr.push(lectureNamePromise);
        }
        let AllLecturesNamePromise = Promise.all(lectureTextPromiseArr)
        return AllLecturesNamePromise;
    }).then(function (AllLecturesText) {
        let i;
        for (i = 0; i < AllLecturesText.length; i++) {
            if (AllLecturesText[i] == Tolecture) {
                break;
            }
        }
        // let lectureIdx = i;
        let lectureToClick = gLectures[i].click();
        console.log("clicked lecture");
        return lectureToClick;
    })
    /*****************removing overlay for problem click (from lecture page)*********** */
    .then(function () {
        let lectureOverlayWillWaitPromise = driver.wait(swd.until.elementsLocated(swd.By.css("#siteOverlay")), 10000);
        return lectureOverlayWillWaitPromise;
    }).then(function () {
        let lectureOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
        return lectureOverlayWillBeSelectedPromise;
    }).then(function (lectureOverlay) {
        //because the siteOverlay has a property of hide.
        //so till that hides, wait to proceed further.
        let removeLectureOverlayPromise = driver.wait(swd.until.elementIsNotVisible(lectureOverlay));
        return removeLectureOverlayPromise;
    })

    /************************find problem****************************** */
    .then(function () {
        let ProblemListWaitPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".collection.resourceList li a p")));
        return ProblemListWaitPromise;
    }).then(function () {
        let ProblemsWillBeSelectedPromise = driver.findElements(swd.By.css(".collection.resourceList li a p"));
        console.log("problems selected");
        return ProblemsWillBeSelectedPromise;
    }).then(function (problems) {
        // console.log(problems);
        gProblems = problems;
        let ProblemTextPromiseArr = [];
        for (let i = 0; i < problems.length; i++) {
            let problemNamePromise = problems[i].getText();
            ProblemTextPromiseArr.push(problemNamePromise);
        }
        let AllProblemNamePromise = Promise.all(ProblemTextPromiseArr);
        return AllProblemNamePromise;
    }).then(function (AllProblemsText) {
        // console.log(AllProblemsText);
        let i;
        for (i = 0; i < AllProblemsText.length; i++) {
            if ((AllProblemsText[i].includes(Toproblem)) == true) {
                console.log("matched");
                break;
            }
        }
        //click from the problems promise (gProblem)
        //so that we don;t want to find the link again.
        let problemToClick = gProblems[i].click();
        console.log("we arrived to the question page.");
        return problemToClick;
    })
    /*************************problem found done********************************* */
    /********************removing overlay from question page yet to be done(for clicking editors)******************** */

    //************************ clicking the editors******************************** */
    .then(function () {
        let editorWillWaitPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".editorTab a[action=showEditor]")), 10000);
        return editorWillWaitPromise;
    }).then(function () {
        let editorBoxSelectedPromise = driver.findElement(swd.By.css(".editorTab a[action=showEditor]"));
        return editorBoxSelectedPromise;
    }).then(function (editorBox) {
        let editorBeClickedPromise = editorBox.click();
        return editorBeClickedPromise;
    }).then(function () {
        console.log("connection made successfully");
    }).catch(function (err) {
        console.log(err);
    })

console.log("After");
