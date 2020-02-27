let fs = require("fs");
let path = require("path");
const uniqid = require('uniqid');

let root = {};

// untreefyFolder(src,dest,root);
// console.log(root);
// console.log("All files have been copied");

function untreefyFolder(src,dest,node){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans == false){
        let uniqueName = uniqid();
        node.isFile = true;
        node.name = path.basename(src);
        node.newName = uniqueName;
        fs.copyFileSync(src,path.join(dest,uniqueName));
        console.log(src);
        console.log(path.join(dest,uniqueName));
    } else {
        node.isFile = false;
        node.name = path.basename(src);
        node.children = [];
        let childrens = fs.readdirSync(src);
        for(let i=0; i<childrens.length; i++){
            let childObj = {};
            let cPath = path.join(src,childrens[i]);
            untreefyFolder(cPath, dest,childObj);
            node.children.push(childObj);
        }
    }
}

fs.writeFileSync(path.join(src,"metadata.txt"),JSON.stringify(root));
console.log("All files have been copied");

// function untreefy(src,dest,root){
    //     let ans = fs.lstatSync(src).isDirectory();
    //     if(ans==false){
        //         let uniqueName = uniqid();
//         fs.copyFileSync(src, path.join(dest,uniqueName));
//         console.log("copied a new file");
//     } else {
    //         let children = fs.readdirSync(src);
    //         for(let i=0; i<children.length; i++){
//             let cPath = path.join(src,children[i]);
//             untreefy(cPath,dest);
//         }
//     }
// }

// untreefy("/home/somya/Documents/PP-WebDev/lecture2/src/d10", "/home/somya/Documents/PP-WebDev/lecture2/dest");
untreefyFolder("/home/somya/Documents/PP-WebDev/lecture2/src", "/home/somya/Documents/PP-WebDev/lecture2/dest",root);
console.log(root);