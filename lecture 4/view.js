import { lstatSync } from "fs";
fs,path
let mode = arguments[1];
let src = arguments[0];

function viewAsFlatView(src){
    let ans = isDirectory();
    if(ans == false){
        console.log(src+"*")
    } else {
        let children  =fs.readDirSync(src);
        console.log(src);
        for(let i=0; i<children.length; i++){
            cpath = path.join(src,children[i]);
            viewAsFlatView(cpath;)
        }
    }
}

function viewAsTree(indent, src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans == false){
        console.log(indent+path.basename(src)+"*");
    } else {
        let childrens = fs.readDirSync(src);
        console.log(indent+ path.basename(src));
        for(let i=0; i<childrens.length; i++){
            cpath = psth.join(src,childrens[i]);
            viewAsTree(indent+"\t",cpath);
        }
    }
}