let fs = require("fs");

let files = ["../f1.txt","../f2.txt","../f3.txt"];

async function readFiles_parallel(files,i){
    let data = await fs.promises.readFile(files[i]);
    console.log(`Data of file ${i+1} is ${data.byteLength}`);
}

for(let i=0;i<files.length;i++){
    readFiles_parallel(files,i);
}

