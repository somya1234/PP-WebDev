let fs = require("fs");

let files = ["../f1.txt","../f3.txt","../f1.html"];

let file1WillBeReadFromPromise = fs.promises.readFile(files[0]);

//for loops sync and then ke andar function is async => that's why piyush code won't work
//dry run it ans you'll get to know that stack will never be empty so async fn will
//never be executed.

function promiseMultiReader(){
    for(let i=0;i<files.length;i++){
        file1WillBeReadFromPromise =  file1WillBeReadFromPromise.then(function(data){
            console.log(` file ${i} printed`)
            let nfp = fs.promises.readFile(files[i]);
            return nfp;
        })
        // return file1WillBeReadFromPromise;
    }
    return file1WillBeReadFromPromise;
}

promiseMultiReader.then(function(data){
    console.log("last file will be printed");
    console.log(data);
    console.log("task completed");
})

/*
let f1WillBeReadpromise = file0WillBeReadFromPromise.then(function(data){
    console.log(data);
    return fs.promises.readFile(files[1]);
})

let f2WillBeReadpromise = f1WillBeReadpromise.then(function(data){
    console.log(data);
    return fs.promises.readFile(files[1]);
})

f2WillBeReadpromise.then(function(data){
    console.log(data);
})*/