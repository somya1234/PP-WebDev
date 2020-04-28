let fs = require("fs");
let files = ["../../f1.txt","../../f1.html","../../f3.txt"];

let f1Promise = fs.promises.readFile(files[0]);
f1Promise.then(function(data){
    console.log("file 1 read"+ data.length);
},function(err){
    console.log(err);
})

let f2Promise = fs.promises.readFile(files[2]);
f2Promise.then(function(data){
    console.log("file 2"+ data.length);
},function(err){
    console.log(err);
})

console.log("Between");