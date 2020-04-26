//A promise excutes itself . It doesn't need any fn call like a function.

//Run all the concepts individually to get a better understanding.

//The code inside the promise gets called immediately.

let singlePromise = new Promise(function(resolve,reject){
    console.log("I am a promise");
});

function fn(){
    console.log("I am a function");
    console.log("*************************************")
}
fn();


//second concept

let secondPromise = new Promise(function(resolve,reject){
    // resolve("I am a promise");
    reject("not working beta")
    console.log("I am a console and I will be called before resolve or reject");
    //they are called in then and catch.
});
secondPromise.then(function(data){
    console.log(data);
    console.log("*************************************")
}).catch(function(err){
    console.log(err);
    console.log("*************************************")
});


//concept 3=
//to prevent our code to execute immediately as in our first concept, we return it through a function.

// let thirdPromise = fetch("hhtps://www.google.com");

function createAPromiseThroughFn(param){
    if(param){
        return new Promise(function(resolve,reject){
            resolve("success 2");
        });
    } else {
        //if param is not found or certain condition is not met, we can directly call 
        //resolve or reject fn then also.
        Promise.resolve("else part working");
        //or Promise.reject();
    }
}

//now as we have wrapped the promise into a function, nothing will be executed till the 
//fn is called.
//fn call => 
createAPromiseThroughFn(124).then(function(data){
    console.log("then called of 3 promise");
    console.log(data);
    console.log("*****************************");
}).catch(function(err){
    console.log(err);
})



//concept 4 => if no then , catch then a no resolve() and reject() called.
let fs = require("fs");

let fourthPromise = new Promise(function(resolve,reject){
    let promise = fs.readFileSync("../f14.txt");
    if(promise){
        resolve("success of 4 promise");
    } else {
        reject("failure of 4 promise");
    }
})

//no then() -> nothing will happen, because it does not get its then() where actually the 
//resolve fn is called.
//but if there is error then, a long error will come in output, because it didn't get catch() to 
//catch the error called by the reject(). So, it displays raw error.

//concept 5=> 
//Promise.all returns response of an array and waits for all the promises to be resolved, otherwise
//gives an error.

//2. Promise.race() waits for a single promise to be resolved and gives a single response
//with the value that is resolved faster.
//It will also give error if any of them is not resolved.

//Better example for Promise.race() is setTimeout()
let fs = require("fs");

let concept5PromiseOne = fs.promises.readFile("../f1.txt");
let concept5PromiseTwo = fs.promises.readFile("../f3.txt");
let concept5PromiseThree = fs.promises.readFile("../f1.html");

Promise.race([concept5PromiseOne,concept5PromiseTwo,concept5PromiseThree]).then(function(data){
    console.log(data);
    console.log("*********************************");
}).catch(function(err){
    console.log(err);
    console.log("*********************************");
})

// concept 6
// these both individually will give errors for reading wrong files wthout requiring any 
// other statement.
let readFile = fs.readFileSync("../f11.txt");
let readFilePromise = fs.promises.readFile("../f1.txt");