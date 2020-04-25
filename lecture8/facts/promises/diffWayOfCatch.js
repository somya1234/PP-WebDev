let fs = require("fs");

let firstPromise = fs.promises.readFile("../f1.txt");
firstPromise.then(
    //success call back function 
    function(data){
        console.log("file 1 read");
        console.log(data);
        return "123";
    },
//separated by commas

    //fcb in then => this is optional to write
//if we write the fcb in then(), there is a benefit that the error is resolved here only
//or printed and the next then() functions can be executed, otherwise all won't be executed.
    function(err){
        console.log("failure callback function");
        console.log(err);
        //an fcb can also return anything to the next fn.
        return false;
    }
).then(function(data){
    //this will be executed irrespective of there is error in previous then () or not
    //because even if there is error ,it will be handled by the failure callback fn().
    console.log("second then , only written success callback function in this case");
    console.log(data);
    //syntax of writing => catch in then() format.
}).then(undefined,function(err){
    console.log("I am catch function written in another way.");
    console.log(err);
})