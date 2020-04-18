
let fs = require("fs");
let path = require("path");

function viewAsFlatFile(src){
    let isFile = checkPathisDirectoryorNot(src);
    if(isFile==true){
        console.log(src+"*");
    } else {
        //print
        console.log(src);
        //content read --> children
        //and faith --> they will print the path of their children
        //d2-
        let children = childrenReader(src);
        //childrenReader is a fn we have made by faith.
        for(let i=0;i<children.length; i++){
            let child = children[i];
            let childPath = path.join(src,child);
            // let chidPath = src+"/"+child;
            viewAsFlatFile(childPath);
        }

    }
}

function childrenReader(src){
    let children = fs.readdirSync(src);
    // console.log(children);
    return children;

}

function checkPathisDirectoryorNot(src){
    
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

viewAsFlatFile(process.argv[2]);