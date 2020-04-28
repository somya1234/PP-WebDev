let fs=require("fs");
console.log("Before");

let firstfilewillbereadpromise=fs.promises.readFile("../../f1.txt");
firstfilewillbereadpromise.then(function(data){
    console.log("File 1:-"+data.length);
},function(err){
    console.log(err);
})
let secondfilewillbereadpromise=fs.promises.readFile("../../f1.html");
secondfilewillbereadpromise.then(function(data){
    console.log("FIle 2:-"+data.length);
},function(err){
    console.log(err);
})
console.log("After");

let thirdfilewillbereadpromise=fs.promises.readFile("../../f3.txt");
thirdfilewillbereadpromise.then(function(data){
    
    console.log("File 3:-"+data.length);
},function(err){
    console.log(err);
})




console.log("Between");