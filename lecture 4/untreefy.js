let path = require("path");
module.exports untreefy = function(){
    let src = arguments[0];
    let dest = arguments[1];
    let root = {};
    fs.writeFileSync(path.join(dest,"metadata,json"),JSON.stringify(root));
}

function untreefyFolder(src,dest,node){
    isDirectory (
        let uniqueName = uniquid();
        node.isFile = true;
        node.name = path.basename(src);
        node.newName = uniqueName;
        false :
        fs.copyFileSync(src,path.join(dest,uniqueName));
    ) else {
        node.name = path.basename(Src);
        node.isFile = false;
        node.children=[];
        childObj = {};
        let children = fs.readdirSync(src);
        for(let i=0; i<node.children.length; i++){
            untreefyFolder(path.join(src,children[i]),dest,childObj);
            node.push.childObj;
        }
    }
}