let fs = require("fs");

//but it didn't run. => not working 


//time and timeEnd are a marker that from line 6 to line 9 how much time took.
//it shoudl have same label, both time and timeEnd , for eg -> here ("task1").
console.time("task1");
fs.readFile("../../f1.txt",function(err,data){
    console.log(data.byteLength);
    console.timeEnd("task1");
})
//synchronous wait
let ft = Date.now()+2*1000;
while(Date.now()<ft){

}

console.time("task2");
fs.readFile("../../f1.txt",function(err,data){
    console.log(data.byteLength);
    console.timeEnd("task2");
})

console.time("task3");
fs.readFile("../../f1.txt",function(err,data){
    console.log(data.byteLength);
    console.timeEnd("task3");
})