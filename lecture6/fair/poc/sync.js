let fs = require("fs");

console.log("before");
//1 sec
let content = fs.readFileSync("f1.html");

//text => text editor
//image => paint
//video => vlc player
// => similarly, below line gives the output as buffer, we have to conver it in text.
console.log(content);


console.log(content+"");
//after 
console.log("after");