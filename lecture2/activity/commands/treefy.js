module.exports.treefy = function(){
    console.log("treefy function is called");
    src = arguments[0];
    dest = arguments[1];
    let root = require(path.join(src,"metadata.json"));
    treefyFolder(src,dest,root);
}

function treefyFolder(src,dest,node){
    if(node.isFile == true){
        let oldFile = path.join(src,node.newName);
        let newFile = path.join(dest,node.name);
        fs.copyFileSync(oldFile,newFile);
    } else {
        let dirName = path.join(dest, node.name);
        fs.mkdirSync(dirName);
        for(let i=0; i<node.children.length; i++){
            treefyFolder(src, dirName, node.children[i]);
        }
    }
}