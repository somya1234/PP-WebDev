let fs = require("fs");

let firstPromise = fs.promises.readFile("../f2.txt");
firstPromise.then(function(data){
    console.log("then number 1");
    console.log(data);
    //as there was not any failure callback, so the code went to the catch block 
    //all then then() were not executed.
}).then(function(){
    console.log("then number 2");
}).then(undefined,function(err){
    console.log("I am error");
    // console.log(err);
})

console.log("********************************");

//case 2 => when there is error and you do not handle the error anywhere 
//(neither in then() nor in catch())

let errorPromise = fs.promises.readFile("../f2.txt");
errorPromise.then(function(data){
    console.log("then number 1");
    console.log(data);
    //as there was not any failure callback, so the code went to the catch block 
    //all then then() were not executed.
}).then(function(){
    console.log("then number 2");
})
