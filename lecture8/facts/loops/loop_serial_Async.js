let fs = require("fs");

let files = ["../f1.txt","../f3.txt","../f1.html"];

readFiles(0);

// sequentially n number files read
function readFiles(i){
    if(i==files.length){
        return;
    }
    fs.readFile(files[i],function(err,data){
        console.log(`Data of files ${i+1}: ${data.byteLength}`);
        //inside callback
        readFiles(i+1);
    })
} 