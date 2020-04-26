let fs = require("fs");

function parallel_Promise(){
    return new Promise(function(resolve,reject){
        let readFirstFilePromise = fs.promises.readFile("../../f1.txt");
        let readSecondFilePromise = fs.promises.readFile("../../f1.html");
        let combinedPromise = Promise.all([readFirstFilePromise,readSecondFilePromise]);
        combinedPromise.then(function(dataArr){
            // resolve("success");
            for(let i=0;i<dataArr.length;i++){
                console.log(dataArr[i].byteLength);
            }
        }).catch(function(err){
            // reject(err);
            console.log(err);
        })
    })
}

parallel_Promise();

// parallel_Promise().then(function(data){
//     console.log(data);
// }).then(undefined,function(err){
//     console.log(err);
// });
//it will always return "success", i.e the resolve fn to the then of the fn.call.