let fs = require("fs");

console.log("before");

let fileWillBereadPromise = fs.promises.readFile("f1.html")

console.log("after");

fileWillBereadPromise.then(function(content){
    console.log(content+" ")
    console.log("finish");
})


fileWillBereadPromise.catch(function(err){
    console.log(err);
})

//it will execute first like at the time the request is sent to the promise, it will execute
//all of the code below will execute (ansynchronous nature)

//And the answer from the request will execute after we get answer from promise.
console.log("I will execute");