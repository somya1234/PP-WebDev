const fs = require("fs");
//creator 1 
// const fileWillBeReadPromise =  fs.promises.readFile("f1.html");


// promises are paradigm
//convert callback fns into promise based function

//creator of the code 

//creator 2 side
function priomisedByFs(path){
    //new Promise is an API already given

    //names of resolve and reject can be success or failure.
    let fileWillBeReadPromise = new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
    return fileWillBeReadPromise;
}

let fileWillBeReadPromise = priomisedByFs("f1.html");


//consumer side => 
// console.log(fileWillBeReadPromise); //=> pending state
//if answer
fileWillBeReadPromise.then(function(data){
    console.log("inside then");
    console.log(data.length);
});
//if error
fileWillBeReadPromise.catch(function(err){
    console.log(err);
})


