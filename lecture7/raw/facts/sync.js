let fs = require("fs");
console.log("before")
let content1 = fs.readFileSync("f1.html");
console.log(content1+" ");
let content2 = fs.readFileSync("f1.html");
console.log(content2+" ");
console.log("after");