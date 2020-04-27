function promiseCreator(){
    return new Promise(function(resolve,reject){
        //try without setTimeout() only reject(), sync code.
        setTimeout(function(){
            reject(10);
        },10000);
    })
}

let pPromise= promiseCreator();
console.log("when i was pending");
console.log(pPromise);

function resolve(data){
    console.log(data)
}
function reject(err){
    console.log(err);
}
pPromise.then(resolve,reject).then(resolve1,reject1);