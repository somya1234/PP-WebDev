let fs = require('fs');
    fs.readFile("../../f1.html",function(err,data){
    console.log("F1 File content"+data.byteLength);
    fs.readFile("../../f1.txt",function(err,data){
        console.log("F2 File content"+data.length);
        fs.readFile("../../f3.txt",function(err,data){
            console.log("F3 File content"+data.length);

        });

    });

});


/********another way */
fs.readFile("../../f1.html",f1cb);
function f1cb(err,data){
    console.log("F1 data");
    fs.readFile("../../f1.txt",f2cb);
}
function f2cb(err,data){
    console.log("F2 data");
    fs.readFile("../../f3.txt",f3cb);
}
function f3cb(err,data){
    console.log("F3 data");
}
// fs.readFile()