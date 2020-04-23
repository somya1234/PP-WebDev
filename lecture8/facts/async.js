//by default, functions of JS are async.

//file read => sync,async
let fs = require("fs");
console.log(fs)
console.log("started executing file");
console.log("cpu is stuck till file is read");
// let content = fs.readFileSync("f1.html");

//here the method changed to write
//we console the data in the callback function 
//parameter 1 is error, and the second is what we get after reading the file.
let content = fs.readFile("Video.mp4",function(err,data){
    console.log(data.byteLength);

});
//if the file is large, then it will take some time to read the file.

//binary data -> in the form of an array
console.log("CPU is free now");
console.log("I can print something");