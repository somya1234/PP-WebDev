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
//reject named is a fcb() here, and it can suppress any error 
//as we know there are 2 methods of handling an error .
//[fcb of then() or catch()].
function reject(err){
    console.log(err);
}
pPromise.then(resolve,reject);
//pPromise.then(function scb(){

// },function fcb(){

// })