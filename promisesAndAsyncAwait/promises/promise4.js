//statement => then and catch also returns a promise
//final state of  promise returned by then/catch depends upon the value returned from their callback.

function promiseCreator(){
    return new Promise(function nameOrNot(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },20000);
        //this case is very important to realise when setTimeout1 is larger than setTimeout2.
    })
}
let pPromise= promiseCreator();
console.log("pending received");
console.log(pPromise);
function resolve(data){
    console.log("inside resolve of first then");
    console.log(data);
    return 20;
}                                   
function reject(err){
    console.log(err);
}
const pPromiseFrom1stthen  = pPromise.then(resolve,reject);
console.log("pending received from p1");
console.log(pPromiseFrom1stthen);
setTimeout(function(){
    console.log("```````````````````````````");
    console.log(pPromiseFrom1stthen);
},20000);

//failure callback
//success callback

//earlier, we made the scb and fcb inside then, here we have made outside as a separate function.

//[check] => when both timeouts have same values.

//promise {20} comes because dependent on above promise.

//whenever we prints the value of a promise, it shows like Promise : {whatever value}

//if taken small margins while debugging between setTimeout1 and setTimeout2, the time will 
//be spent on debugging and it will behave differently.