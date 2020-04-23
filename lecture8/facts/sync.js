//file read => sync,async
let fs = require("fs");
console.log("started executing file");
console.log("cpu is stuck till file is read");
// let content = fs.readFileSync("f1.html");

let content = fs.readFileSync("Video.mp4");
//if the file is large, then it will take some time to read the file.

//binary data -> in the form of an array
console.log(content.byteLength);
console.log("CPU is free now");
console.log("I can print something");