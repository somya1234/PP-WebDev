//only async can be worked as parallel
//f1 => read
//f2 => reaD
// ==> serial => f1 >read, f2> read

//read nodejs,readFile,browser and request to solve the problem with wait.

let fs = require("fs");
console.log("started executing file");
console.log("cpu is stuck till file is read");

//To Do:- Try with 3 files 
//when files are of comparable size (e.g 15 and 17),
// then any of the file comes first 

fs.readFile("../../f1.txt",function cb(err,data){
    console.log("file 1 has arrived");
    console.log(data.byteLength);
});
//synchronous wait
//1000*10 => 1sec* 10 = 10 seconds
let finalTime = Date.now()+1000*10;

while(Date.now()<finalTime){

}
//10 seconds
console.log("file 2 reading process");
fs.readFile("../../f1.html",function cb(err,data){
    console.log("file 2 has arrived");
    console.log(data.byteLength);
    //check this => Google
    // console.log(timeEnd."task3")
})

console.log("CPU is free now");
console.log("I can print something");