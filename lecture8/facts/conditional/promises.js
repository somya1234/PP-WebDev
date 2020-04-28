let fs = require("fs");

let files = ["../f1.txt","../f3.txt","../f1.html"];

let file1 = fs.promises.readFile(files[0]);
file1.then(function(data){
    console.log(`File 1 data is ${data.byteLength}`);
    if(data.byteLength>10){
        let file2 = fs.promises.readFile(files[1]);
        file2.then(function(data){
            console.log(`File 2 data is ${data.byteLength}`);

        })
    } else {
        let file3 = fs.promises.readFile(files[2]);
        file3.then(function(data){
            console.log(`File 3 data is ${data.byteLength}`);

        })
    }
},function(err){
    console.log(err);
})