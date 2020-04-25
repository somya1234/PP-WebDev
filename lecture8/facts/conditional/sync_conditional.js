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
    console.log("f2 size "+ f2Size);
    if(f2Size<=40){
        //read file 1 
        let f1 = fs.readFileSync("../f1.txt");
        console.log("File 1 is "+f1.byteLength);
    } else{
        //read file 2
        let f2 = fs.readFileSync("../f3.txt");
        console.log("File 2 is "+f2.byteLength);
    }

} else {
    console.log("size smaller");
    let f3 = fs.readFileSync("../f3.txt");
    let f3Size = f3.byteLength;
    console.log("f3 size "+f3Size);

    if(f3Size<50){
        //read file 4
        let f4 = fs.readFileSync("../f1.html");
        console.log("File 4 is "+f4.byteLength);
    } else {
        //read file 5
        let f5 = fs.readFileSync("../f1.txt");
        console.log("File 5 is "+f5.byteLength);
    }

}