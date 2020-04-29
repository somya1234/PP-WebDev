//statement => then and catch also returns a promise
//final state of  promise returned by then/catch depends upon the value returned from their callback.

function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject(10);
            //if we do reject(), then , it will return undefined.
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
    //here 10 goes to it
    //so err= > 10 and 10 is printed here.
    console.log(err);
    //but it return undefined to 2 then.

    //try these also.
    // return Promise.reject("i am rejected");
    //return Promise.resolve();
    // throw new Error("you are an error send by reject/fcb of 1st then.")
}

function resolve1(data){
    console.log("inside scb of 2nd then");
    console.log(data);
}
function reject1(err){
    console.log("inside of fcb of 2nd then.");
    console.log(err);
}

//earlier, we made the scb and fcb inside then, here we have made outside as a separate function.
// pPromise.then(resolve,reject)
//whatever this returns, according to that next then() works.
// .then(function(data){
//     console.log("scb of 2 then");
//     console.log(data)
// },function(err){
//     console.log("2 fcb ")
//     console.log(err);
// })


pPromise.then(resolve,reject).then(resolve1,reject1);
//[check] => resolve1(20) => rajan (returns undefined.)
//answer to rajan problem => copying value from the old promise.