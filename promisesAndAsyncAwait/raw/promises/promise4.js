//statement => then and catch also returns a promise
//final state of  promise returned by then/catch depends upon the value returned from their callback.

function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },1000);
        //try with 2000s .
    })
}

let pPromise= promiseCreator();
console.log("pending received");
console.log(pPromise);

function resolve(data){
    console.log(data);
    return 20;
}

function reject(err){
    console.log(err);
}

//earlier, we made the scb and fcb inside then, here we have made outside as a separate function.
const pPromiseFrom1stthen  = pPromise.then(resolve,reject);
console.log("pending received from p1");
console.log(pPromiseFrom1stthen);
setTimeout(function(){
    console.log("```````````````````````````");
    console.log(pPromiseFrom1stthen);
},1500);

//[check] => when both timeouts have same values.

//promise {20} comes because dependent on above promise.