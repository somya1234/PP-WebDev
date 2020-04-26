let fs = require("fs");

let files = ["../f1.txt","../f1.html","../f3.txt"];

let allPromises = [];
for(let i=0;i<files.length;){
    let nsp = fs.promises.readFile(files[i]);
    nsp.then((content)=> {

        //here, we are incrementing the i inside the callback 
        //and callbacks are only taken to the stack when stack is empty.
        //But, in this case stack is never empty as an infinite for loop is there.
        //it will repeatedly call for fpr(0) .

        //here, we are storing the data in an array (zabardasti ka)
        //we could also print that.
        allPromises[i] = content;
        i++;
    }).catch(err => {
        console.log("Error is ",err);
        return;
    })
}

