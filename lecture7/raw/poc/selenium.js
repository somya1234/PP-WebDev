let swd = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");
// let credentials = require("credentials.json");
let credentialFile = process.argv[2];
let username,password;

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

let credentialsWillBeReadPromise = fs.promises.readFile(credentialFile);
credentialsWillBeReadPromise.then(function(credentials){
    credentials =  JSON.parse(credentials);
    username = credentials.username;
    // console.log(username)
    password = credentials.password;
    let googlePageWillBeOpenedPromise =driver.get("https://www.pepcoding.com/login");
    return googlePageWillBeOpenedPromise;
}).then(function(){
    // console.log("Google page opened");
    //when the page is opened
    //search email box

    //we find this email element input by inspecting at that usernname box.
    //we use findElement because it is an attribute (type is an atribute)
    //everything will be an attribute except input (which is a tag).

    let emailWillBeSelectedPromise =  driver.findElement(swd.By.css("input[type=email]"));
    //return sends theat the promise is done to the next .then() promise,
    //so that can execute.

    //it is a promise at the time of console.(webElementPromise)
    // console.log(emailWillBeSelectedPromise)
    return emailWillBeSelectedPromise;
    //click
}).then(function(emailElement){
    let abracadabraWillSendPromise = emailElement.sendKeys(username);
    return abracadabraWillSendPromise;
}).then(function(){
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password"));
    return passwordWillBeSelectedPromise;
}).then(function(passwordElement){
    let passwordWillBeEnteredPromise = passwordElement.sendKeys(password);
    return passwordWillBeEnteredPromise;
}).then(function(){
    let submitBtnWillSelected = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillSelected;
}).then(function(submitbtn){
    let submitBtnClicked = submitbtn.click();
    return submitBtnClicked;
}).then(function(){
    console.log("all send");
    console.log("yaha sab khatam hogya hai");
}).catch(function(err){
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

console.log("yaha kuch nahi hua hai");

//earlier
// googlePageWillOpenPromised.catch(function(err){
//     console.log(err);
// });