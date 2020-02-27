let fs = require("fs");
let path = require("path");
const uniqid = require('uniqid');

function untreefy(src,dest){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        let uniqueName = uniqid();
        fs.copyFileSync(src, path.join(dest,uniqueName));
        console.log("copied a new file");
    } else {
        let children = fs.readdirSync(src);
        for(let i=0; i<children.length; i++){
            let cPath = path.join(src,children[i]);
            untreefy(cPath,dest);
        }
    }
}

untreefy("/home/somya/Documents/PP-WebDev/lecture2/src/d10", "/home/somya/Documents/PP-WebDev/lecture2/dest");