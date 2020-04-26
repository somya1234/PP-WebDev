let fs = require("fs");

let promise = fs.promises.readFile("../f1.txt");
promise.then(function(data){
    console.log("file read successfully");
    console.log(data);
}).catch(function(err){
    console.log(err);
})