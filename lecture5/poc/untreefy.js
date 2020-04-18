// file --> copy its data with new name of file
//directory =>
let fs = require("fs");
let path = require("path");

//npm install uniqid
//then
let uniqid = require("uniqid");

function checkPathisDirOrNot(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

function untreefy(src, dest, node) {
    //check if path is directory or not
    let ans = checkPathisDirOrNot(src);
    //triple ===
    if (ans === true) {
        let newFileName = uniqid();

        // let node = {
        //     isFile: true,
        //     oldName: path.basename(src),
        //     newName: newFileName
        // }

        node.isFile = true;
        node.oldName = path.basename(src);
        node.newName = newFileName;


        let destPath = path.join(dest, newFileName);
        fs.copyFileSync(src, destPath);
        // console.log(`file copied form ${path.basename(src)} ${src} to ${destPath}`);
        // console.log(`file copied to ${src} to ${destPath}`);

        // console.log("I am a file"+ path.basename(src));
        //new Name data copy
        //unique name file
        //oldFile => new File with unique name data copy old file ka


    } else {
        //it is directory 

        node.data = path.basename(src);
        node.children = [];
        node.isFile = false;

        console.log("I am a directory" + path.basename(src));
        let children = fs.readdirSync(src);
        //children
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childPath = path.join(src, child);
            let chObj = {};
            untreefy(childPath, dest,chObj);
            node.children.push(chObj);
        }
    }
}

let root = {}
// untreefy("/home/somya/Documents/PP-WebDev/lecture5/poc/d10", "/home/somya/Documents/PP-WebDev/lecture5/poc/dest", root);
//to view the children array, we can store it in metadata.json
// console.log(process.argv[3]);
untreefy(process.argv[2],process.argv[3],root);
fs.writeFileSync(path.join(process.argv[3],"metadata.json"),JSON.stringify(root));
console.log(root);