let fs = require("fs");
let f1 = fs.readFileSync("../f1.txt");
let f1Size = f1.byteLength;
console.log("f1 size "+f1Size);

//conditionals wowrk serially as stated condition by condition.
//and synchronous always works serially

if(f1Size>20){

    console.log("size bigger");
    let f2 = fs.readFileSync("../f1.html");
    let f2Size = f2.byteLength;
    let f3 = fs.readFileSync("../f3.txt");
    let f3Size = f3.byteLength;
    console.log("f2 size "+ f2Size);
    console.log("f3 size "+f3Size);

    if(f2Size<=40){
        //read file 1 
    } else{
        //read file 2
    }

    if(f3Size<50){
        //read file 4
    } else {
        //read file 5
    }
} else {
    console.log("size smaller");
}