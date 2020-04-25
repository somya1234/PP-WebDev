let fs = require("fs");

let files = ["../f1.txt","../f3.txt","../f1.html"];

readFiles(0);

function readFiles(i){
    if(i==files.length){
        return;
    }
    //it doesn't follow the diagram as of async functions because it doesn't have any callback
    //it's code runs as a normal js code 
    //top-bottom , left-right approach
    //normally line by line it goes into stack and executes.
    let a = fs.readFileSync(files[i]);
    console.log(`file ${i+1} is ${a.byteLength}`);
    readFiles(i+1);
}