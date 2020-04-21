let fs = require("fs");
let path = require("path");
// let src = "/home/somya/Documents/PP-WebDev/lecture5/poc/dest";
// let dest = "/home/somya/Documents/PP-WebDev/lecture5/poc/test";

module.exports.treefy = function () {
    let src = process.argv[3];
    let dest = process.argv[4];
    let rootPath = path.join(src, "metadata.json");
    let root = require(rootPath);
    treefy(src, dest, root);
    console.log("treefy is implemented");
}



function treefy(src, dest, node) {
    if (node.isFile === true) {
        let oldPath = path.join(src, node.newName);
        //give the full path while creating a file or directory.
        let newPath = path.join(dest, node.oldName);
        // important to note the path from which file is copied.
        fs.copyFileSync(oldPath, newPath);
    } else {
        //imp to note the path to create a folder.
        dest = path.join(dest, node.data);
        fs.mkdirSync(dest);
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            treefy(src, dest, child);
        }
    }
}
