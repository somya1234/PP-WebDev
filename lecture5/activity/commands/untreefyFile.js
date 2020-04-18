let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");

module.exports.untreefy = function(){
    console.log("untreefy is implemented");
    let src = process.argv[3];
    let dest = process.argv[4];
    let root = {};
    untreefy(src,dest,root);
    console.log(root);
    let pathToWrite = path.join(dest,"metadata.json");
    fs.writeFileSync(pathToWrite,JSON.stringify(root));
}

function untreefy(src,dest,node){
    let ans = fs.lstatSync(src).isFile();
    if(ans == true){
        let newFileName = uniqid();
        let destPath = path.join(dest,newFileName);
        fs.copyFileSync(src,destPath);

        node.isFile = true;
        node.oldName = path.basename(src);
        node.newName = newFileName;

    } else {

        node.isFile = false;
        node.name = path.basename(src);
        node.children = [];

        let children = fs.readdirSync(src);
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            let chObj = {};
            untreefy(childPath,dest,chObj);
            node.children.push(chObj);
        }
    }
}