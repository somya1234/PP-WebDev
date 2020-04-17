const fs = require("fs");

module.exports.view = function (){
    //you can also write it as function(src, mode) --> it will contain the values itself, if
    //you don;t want it to assign as arguments[0] or arguments[1].

    // console.log("view is implemented");
    // console.log(arguments);
    let src = arguments[0];
    let mode = arguments[1];

    if(mode == "-t"){
        viewAsTree(src);
    } else if(mode == "-f"){
        viewAsFlatFile(src);
    } else {
        console.log("Wrong mode.");
    }
}

function viewAsTree(src){
    console.log("view as tree is implemented");
}

function viewAsFlatFile(root){
    console.log("view as flat file is implemented");
    let ans = fs.lstatSync(root).isDirectory();
    if(ans == false){
        console.log(root.data+"*");
    } else {
        for(int i=0; i<root.children.length;i++){
            let child = root.children[i];
            console.log("/"+src.data);
            viewAsFlatFile(child);
        }
    }
}