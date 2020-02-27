module.exports.untreefy = function(){
    console.log("untreefy function is called");
    src = arguments[0];
    dest = arguments[1];
    untreefy(src,dest);
}

function untreefy(src,dest){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        let uniqueName = uniqid();
        fs.copyFileSync(src, path.join(dest,uniqueName));
        console.log("copied a new file");
    } else {
        let children = fs.readdirSync(src);
        for(let i=0; i<children.length; i++){
            let cPath = path.join(src,children[i]);
            untreefy(cPath,dest);
        }
    }
}