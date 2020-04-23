let fs = require("fs");

let files = ["../f1.txt","../f3.txt","../f1.html"];

readFiles(0);

// sequentially n number files read
function readFiles(i){
    if(i==files.length){
        return;
    }
    //async fn so it will go to API but it will not execute until all the rest of the code executes
    //as it is an async function.
    fs.readFile(files[i],function(err,data){
        console.log(`Data of files ${i+1}: ${data.byteLength}`);
    });
    readFiles(i+1);
} 