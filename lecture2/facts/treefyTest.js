let fs = require("fs");
let path = require("path");
let root = path.join("/home/somya/Documents/PP-WebDev/lecture2/src"+"metadata.json");

function treefy(src, dest, node){
    if(node.isFile==true){
        //create a file and rename it to the new name.
        let oldFile = path.join(src,node.newName);
        let newFile = path.join(dest,node.name);
        fs.copyFileSync(oldFile,newFile);
    } else {
        //create a directory.
        folderPath = path.join(dest,node.name);
        folder = fs.mkdirSync(folderPath);
        for(let i=0; i<node.children.length; i++){
            treefy(src,dest,node.children[i]);
        }
    }
}

// treefy(src,dest,root);
treefy("/home/somya/Documents/PP-WebDev/lecture2/src","/home/somya/Documents/PP-WebDev/lecture2/dest",root);