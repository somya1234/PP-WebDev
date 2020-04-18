let fs = require("fs");
let path = require("path");

module.exports.view = function () {
    //you can also write it as function(src, mode) --> it will contain the values itself, if
    //you don;t want it to assign as arguments[0] or arguments[1].

    // console.log("view is implemented");
    // console.log(arguments);
    let src = arguments[0];
    let mode = arguments[1];

    if (mode == "-t") {
        viewAsTree("",src);
    } else if (mode == "-f") {
        viewAsFlatFile(src);
    } else {
        console.log("Wrong mode.");
    }
}

function viewAsTree(indent, src) {
    let type = fs.lstatSync(src).isDirectory();
    if (type == false) {
        //file 
        console.log(indent + path.basename(src) + "*");
    } else {
        console.log(indent + path.basename(src));
        let children = fs.readdirSync(src);
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childPath = path.join(src, child);
            viewAsTree(indent + "\t", childPath);
            //note:-           //we cannot pass "child" as the source parameter in the recursive function.
            //because if we pass its child(eg d20) , there will be many files as d20
            //so we have to give the whole path always to src.
        }
    }
}

//if we don't want to pass the full path of the src, then , you have to make sure src in the same
//directory, otherwise it will not work.
function viewAsFlatFile(src) {
    let ans = fs.lstatSync(src).isFile();
    if(ans == true){
        console.log(src+"*");
    } else{
        console.log(src);
        let children = fs.readdirSync(src);
        for(let i=0; i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            viewAsFlatFile(childPath);
        }
    }
}