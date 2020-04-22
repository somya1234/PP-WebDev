let swd = require("selenium-webdriver");
require("chromedriver");

console.log("Before");

//browser build
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let googlePageWillBeOpenedPromise = driver.get("http://www.pepcoding.com/login");
googlePageWillBeOpenedPromise.then(function(){
    let emailBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[placeholder=email]"));
    let passwordBoxWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    let combinedPromise = Promise.all([emailBoxWillBeSelectedPromise,passwordBoxWillBeSelectedPromise]);
    return combinedPromise;
}).then(function(ElementsArray){
    let emailWillBeFilledPromise = ElementsArray[0].sendKeys("ssomya352@gmail.com");
    let passwordWillBeFilledPromise = ElementsArray[1].sendKeys("somya1234");
    let combinedInputPromise = Promise.all([emailWillBeFilledPromise,passwordWillBeFilledPromise]);
    return combinedInputPromise;
}).then(function(){
    //we write classes, id's and tags in the similar way we used to write in web scrapping
    //this is the way to write attributes in selenium.
    let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillBeSelectedPromise;
}).then(function(submitBtn){
    let submitBtnClickedPromise = submitBtn.click();
    return submitBtnClickedPromise;
}).then(function(){
    let resourceCardWillBeSelectedPromise = driver.findElement(swd.By.css(".resource"));
    return resourceCardWillBeSelectedPromise;
}).then(function(rPage){
    let resourcePage = rPage.click();
    return resourcePage;
})
.then(function(){
    console.log("connection made successfully");
}).catch(function(err){
    console.log(err);
})

console.log("After");
