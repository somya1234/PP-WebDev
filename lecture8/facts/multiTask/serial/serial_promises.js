let fs = require("fs");

let firstPromise = fs.promises.readFile("../../f1.txt");
firstPromise.then(function(data){
    console.log("inside first then");
    console.log(data.length);
    let secondPromise = fs.promises.readFile("../../f3.txt");
    //returned promise 
    return secondPromise;
}).then(function(data){
    console.log("inside second then");
    console.log(data.byteLength);
    let thirdPromise = fs.promises.readFile("../../f1.txt");
    //returned nothing => undefined
}).then(function(data){
    console.log("inside third then");
    console.log(data);
},
function(err){
    console.log("Error occured");
    console.log(err);
}).then(undefined,function(er){
    console.log(er);
})

//2nd => check it up by incommenting all this.
/*
let secondPromise = fs.promises.readFile("../../f1.txt");
secondPromise.then(function(data){
    console.log("inside first then");
    console.log(data.length);
    let secondPromise = fs.promises.readFile("../../f33.txt");
    return secondPromise;
}).then(function(data){
    console.log("inside second then");
    console.log(data.byteLength);
    let thirdPromise = fs.promises.readFile("../../f1.txt");
}).then(function(data){
    console.log("inside third then");
    console.log(data);
},
function(err){
 //error catched here only.
    console.log("Error occured");
    console.log(err);
}).then(undefined,function(er){
    console.log(er);
})
*/