let fs = require("fs");

let files = ["../f1.txt","../f2.txt","../f3.txt"];

//this is not parallel

let arr = [];

(async function(){
    for(let i=0;i<files.length;i++){
        let readFile = fs.promises.readFile(files[i]);
        // console.log(readFile)
        arr.push(readFile);
    }
    let combinedPromise = await Promise.all(arr);

    for(let i=0;i<files.length;i++){
        console.log(`files ${i+1} is ${combinedPromise[i].byteLength}`)
    }
})()