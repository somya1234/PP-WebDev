let fs = require("fs");
let path = require("path");

module.exports.view = function(){
    console.log("view function is called");
    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t"){
        viewAsTree("",src);
    } else if(mode == "-f"){
        viewAsFlatFile(src);
    } else {
        console.log("Wrong parameter passed.");
    }
};

function viewAsTree(indent,src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(indent+ path.basename(src)+" * ");
    } else {
        let children = fs.readdirSync(src);
        console.log(indent+path.basename(src));
        for(let i=0; i<children.length; i++){
            let cPath = path.join(src,children[i]);
            viewAsTree(indent+"\t",cPath);
        }
    }
}

function viewAsFlatFile(src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(src+" * ");
    } else {
        // synchronous function
        let children = fs.readdirSync(src);
        console.log(src);
        for (let i=0; i<children.length; i++){
            let cPath = path.join(src,children[i]);
            viewAsFlatFile(cPath);
        }


    }
}