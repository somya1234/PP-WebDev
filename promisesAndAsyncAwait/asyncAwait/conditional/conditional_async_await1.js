let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

//serially conditionally async await.

(async function () {
    let file1 = await fs.promises.readFile(files[0]);
    console.log(`File 1 data is ${file1.byteLength}`)
    if (file1.byteLength > 10) {
        console.log("read file 2");
        let file2 = await fs.promises.readFile(files[1]);
        console.log(`File 2 data is ${file2.byteLength}`);
    } else {
        console.log("read file 3");
        let file3 = await fs.promises.readFile(files[2]);
        console.log(`File 3 data is ${file3.byteLength}`);
    }
})()
