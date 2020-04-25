//by default, functions of JS are async.

//file read => sync,async

//fs gives the list of all function which are in fs module.
let fs = require("fs");
console.log(fs)
console.log("started executing file");
console.log("cpu is stuck till file is read");

//async function executes at the end of the code (when stack is empty).
//reads the file first in API but callbacks executes when stack is empty.

//here the syntax of the methods changed.
//we console the data in the callback function 
//parameter 1 is error, and the second is what we get after reading the file.
fs.readFile("../Video.mp4",function(err,data){
    console.log(data.byteLength);

});
//if the file is large, then it will take some time to read the file.

console.log("CPU is free now");
console.log("I can print something");