let fs = require("fs");

let files = ["../f1.txt","../f1.txt","../f1.txt"];

function promiseMultiFileReader(){
    for(let i=0;i<files.length;){
        let nsp =  fs.promises.readFile(files[i++]);
        nsp.then(function(data){
            console.log(`File ${i} is `);
     
        })
        nsp.catch(function(err){
            console.log(err);
        })
     }
}

promiseMultiFileReader();
