let swd = require("selenium-webdriver");
require("chromedriver");

console.log("Before");

//browser build
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let gModules;

let googlePageWillBeOpenedPromise = driver.get("http://www.pepcoding.com/login");
googlePageWillBeOpenedPromise.then(function () {
    let emailBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[placeholder=email]"));
    let passwordBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    let combinedPromise = Promise.all([emailBoxWillBeSelectedPromise, passwordBoxWillBeSelectedPromise]);
    return combinedPromise;
}).then(function (ElementsArray) {
    let emailWillBeFilledPromise = ElementsArray[0].sendKeys("ssomya352@gmail.com");
    let passwordWillBeFilledPromise = ElementsArray[1].sendKeys("somya1234");
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
}).then(function()
{
    let rewbwp = driver.wait(swd.until.elementLocated(swd.By.css('.resource a')),10000);
    return rewbwp;
})
.then(function () {
    let resourcePageAnchorWillBeSelectedPromise = driver.findElement(swd.By.css(".resource a"));
    return resourcePageAnchorWillBeSelectedPromise;
}).then(function (resourceAnchor) {
    // console.log("22222222222222222")
    let resourcePageLinkPromise = resourceAnchor.getAttribute("href");
    return resourcePageLinkPromise;
}).then(function (resourceLink) {
    // console.log("33333333333333333333")
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
    .then(function(){
        let owbfp = driver.wait(swd.until.elementLocated(swd.By.css('#siteOverlay')),10000)
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
    }).then(function(){
        let listToBeLocatedPromise = driver.wait(swd.until.elementLocated(swd.By.css(".lis.tab"),10000));
        return listToBeLocatedPromise;
    }).then(function(){
        let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
        return ModulesWillBeSelectedPromise;
    }).then(function(modules){
        gModules=modules;
        // console.log(modules); => promises array
        let moduleTextPromiseArr = [];
        for(let i=0;i<modules.length;i++){
            let moduleNamePromise = modules[i].getText();
            moduleTextPromiseArr.push(moduleNamePromise);
        }
        // console.log(moduleTextPromiseArr);
        let AllModulesNamesPromise = Promise.all(moduleTextPromiseArr);
        // console.log(AllModulesNamesPromise);
        return AllModulesNamesPromise;
    }).then(function(AllModulesText){
        let i;
        for(i=0;i<AllModulesText.length;i++){
            if(AllModulesText[i].includes("Dynamic Programming")==true){
                break;
            }
        }
        let moduleWillBeClickedPromise = gModules[i].click();
        return moduleWillBeClickedPromise;
        // console.log(AllModulesText);
    }).then(function(){
        //we use wait so that it doesn't findElement straight away in the next step
        //it waits for 10 seconds to come and then searches for the particular element
        //eg - if the speed of net is slow, and if we do not use wait for element and it searches for
        //it straight away, then it will give error because no element is found
        // so for that we first need to wait for the element to occur
        //and it will find the element from inspect in the time span of 10 seconds, if not found
        //now it can give the error.
        let lectureWillWaitOverlayPromise = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay"),10000));
        return lectureWillWaitOverlayPromise;
    }).then(function(){
        let lectureOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
        return lectureOverlayWillBeSelectedPromise;
    }).then(function(lectureOverlay){
        let RemoveLectureOverlayPromise = driver.wait(swd.until.elementIsNotVisible(lectureOverlay));
        return RemoveLectureOverlayPromise;
    }).then(function(){
        let 
    })
    .then(function () {
        console.log("connection made successfully");
    }).catch(function (err) {
        console.log(err);
    })

console.log("After");
