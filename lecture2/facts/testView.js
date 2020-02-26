let fs = require("fs");
let path = require("path");

function displayList(src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(src+" * ");
    } else {
        //asynchronous function
        // fs.readdir(src, function(err,files){
        //     if (err) {
        //         return console.log('Unable to scan directory: ' + err);
        //     } 
        //     files.forEach(file => {
        //         console.log(src);
        //         let newPath = path.join(src,file);
        //         displayList(newPath);
        //     });
        // });

        // synchronous function
        let children = fs.readdirSync(src);
        console.log(src);
        for (let i=0; i<children.length; i++){
            //if we write console here, the output won't be correct.
            //as it will see if the src has how many children and after calculating the length of the children,output gets printed.
            //but in case when src = 50, it has no children so at that time 50 won't be printed ever.
            // and it will be missed. and the src will return back to src = 20.
            // and hence it will be printed again.
            //to avoid that condition, we write it ablove for loop so that it is always printed.
            let cPath = path.join(src,children[i]);
            displayList(cPath);
        }


    }
}

displayList("/home/somya/Documents/PP-WebDev/lecture2/src/d10");

function displayAsTree(indent, src){
    let ans = fs.lstatSync(src).isDirectory();
    if(ans==false){
        console.log(indent+ path.basename(src)+" * ");
    } else {
        let children = fs.readdirSync(src);
        console.log(indent+path.basename(src));
        for(let i=0; i<children.length; i++){
            let cPath = path.join(src,children[i]);
            displayAsTree(indent+"\t",cPath);
        }
    }
}

displayAsTree("","/home/somya/Documents/PP-WebDev/lecture2/src/d10");