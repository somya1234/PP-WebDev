let fs = require("fs");

//case 1=> then_catch_then

let firstPromise = fs.promises.readFile("../f1.txt");
firstPromise.then(function(){
    console.log("first promise called");
    //this data will be returned to the last then function.
    return true;
}).catch(function(err){
    // console.log(data) => this statement won't give you any output as 
    //there is no parameter called data in catch function .
    console.log(err);
}).then(function(data){
    console.log("third then called");
    console.log(data);
})

//case 2:- when error comes 

//if you will run both together , as promises are async in nature
//so any of them can give the result earlier.

/*
let newPromise = fs.promises.readFile("f1.txt");
newPromise.then(function(){
    console.log("new promise called");
}).catch(function(err){
    //error is traped here. and so when the next then is called, no error is there.
    console.log(err);w
    //nothing returned
    //it means returned undefined
}).then(function(data){
    console.log("third then called");
    console.log(data);

})
*/