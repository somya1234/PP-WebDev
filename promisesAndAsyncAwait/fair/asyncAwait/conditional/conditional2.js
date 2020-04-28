let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt","../f2.txt", "../f3.txt"];

//reading 2 files parallely at the same time.

(async function () {
    let file1 = await fs.promises.readFile(files[0]);
    console.log(`File 1 data is ${file1.byteLength}`)
    if (file1.byteLength > 10) {
        console.log("read file 2 and 4");
        let file2 = fs.promises.readFile(files[1]);
        let file4 =  fs.promises.readFile(files[3]);
        let combinedfile1 = await Promise.all([file2,file4]);
        console.log(`File 2 data is ${combinedfile1[0].byteLength}`);
        console.log(`File 4 data is ${combinedfile1[1].byteLength}`);
    } else {
        console.log("read file 3 and file 5.");
        let file3 = fs.promises.readFile(files[2]);
        let file5 = fs.promises.readFile(files[4]);
        let combinedfile2 = await Promise.all([file3,file5]);
        console.log(`File 3 data is ${combinedfile2[0].byteLength}`);
        console.log(`File 5 data is ${combinedfile2[1].byteLength}`);
    }
})()

