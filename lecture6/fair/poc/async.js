let fs = require("fs");

console.log("before");
//wrok start
fs.readFile("f1.html",function(err,content){
    //it should have the code of a callback.
    //later
    console.log(content);
    //if some work is dependent on this content or after reading this file,
    //then write all the work in async function.
});
//move on
console.log("after");