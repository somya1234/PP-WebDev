let fs = require("fs");
let path = require("path");

function displayList(src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(src+" * ");
    } else {
        //asynchronous function
        fs.readdir(src, function(err,files){
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            console.log(src);
            files.forEach(file => {
                let newPath = path.join(src,file);
                displayList(newPath);
            });
        });

        // synchronous function
        // console.log(src);
        // let children = fs.readdirSync(src);
        // for (let i=0; i<children.length; i++){
        //     let cPath = path.join(src,children[i]);
        //     displayList(cPath);
        // }


    }
}

displayList("/home/somya/Documents/PP-WebDev/lecture2/src/d10");