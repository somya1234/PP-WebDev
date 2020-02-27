let fs = require("fs");
let path = require("path");
const uniqid = require('uniqid');

module.exports.untreefy = function(){
    console.log("untreefy function is called");
    src = arguments[0];
    dest = arguments[1];
    let root = {};
    untreefyFolder(src,dest,root);
    console.log("All files are copied.");
    fs.writeFileSync(path.join(src,"metadata.json"),JSON.stringify(root));
    console.log("Metadata is created.");
}

function untreefyFolder(src,dest,node){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans == false){
        let uniqueName = uniqid();
        node.isFile = true;
        node.name = path.basename(src);
        node.newName = uniqueName;
        fs.copyFileSync(src,path.join(dest,uniqueName));
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