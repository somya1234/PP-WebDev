let fs = require("fs");
let path = require("path");


//now our source is (dest) folder
//and destination is (d10) folder
function treefy(src,dest,node){
    // console.log(node);
    if(node.isFile === true){
        //file copy
        //file is available with the new name in the source folder.
        let srcPath = path.join(src,node.newName);
        //create the file with the old name in the destination
        let destPath = path.join(dest,node.oldName);
        fs.copyFileSync(srcPath,destPath);
    } else{
        //directory create
        let dirPath = path.join(dest,node.data);
        fs.mkdirSync(dirPath);
        //children
        let children = node.children;
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let parentPath = dirPath;
            treefy(src,parentPath,child);
        }


        //loop
    }



}

// wrong ->
// let root = require("./dest/metadata.json");
let src = "/home/somya/Documents/PP-WebDev/lecture5/poc/dest";
let root = require(path.join(src,"metadata.json"));
// console.log(root);
treefy(src,"/home/somya/Documents/PP-WebDev/lecture5/poc/test",root);
console.log("executed");