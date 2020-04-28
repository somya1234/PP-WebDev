let fs = require("fs");
console.log("Before");

//immediately invoke function expression

(async function (){
   let data = await fs.promises.readFile("../f1.txt");
    console.log("f1 data");
    data = await fs.promises.readFile("../f2.txt");
    console.log("f2 data");
    data = await fs.promises.readFile("../f3.txt");
    console.log("f3 data");
})()

//expanded code =>
/*
async function myFn(){
    let data = await fs.promises.readFile("../f1.txt");
     console.log("f1 data");
     data = await fs.promises.readFile("../f2.txt");
     console.log("f2 data");
     data = await fs.promises.readFile("../f3.txt");
     console.log("f3 data");
 }
 myFn();
 */

 console.log("After");

 