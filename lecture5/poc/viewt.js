let path = require("path");
let fs = require("fs");

function checkIfFileOrDir(src){
    let ans = fs.lstatSync(src).isDirectory();
    return ans;
}

function giveDirChildren(src){
    let children = fs.readdirSync(src);
    return children;
}

function viewAsTree(indent,src){
    let type = checkIfFileOrDir(src);
    if(type == false){
        //file 
        console.log(indent+path.basename(src)+"*");
    } else{
        console.log(indent+path.basename(src));
        let children = giveDirChildren(src);
        for(let i=0; i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            viewAsTree(indent+"\t",childPath);
 //note:-           //we cannot pass "child" as the source parameter in the recursive function.
            //because if we pass its child(eg d20) , there will be many files as d20
            //so we have to give the whole path always to src.
        }
    }
}

viewAsTree("",process.argv[2]);