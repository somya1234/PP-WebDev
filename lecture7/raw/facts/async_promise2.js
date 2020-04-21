let fs = require("fs");
console.log("Before");

let fileWillBeReadPromise = fs.promises.readFile("f1.html");
console.log(fileWillBeReadPromise);

fileWillBeReadPromise.then(function(content){
    console.log(content+" ");
})

setTimeout( function(){
    console.log("I was called after 3 sec");
    //idk why, it is just an example, so don't think about it.
    console.log(fileWillBeReadPromise+ " ");
},3000);

console.log("after");