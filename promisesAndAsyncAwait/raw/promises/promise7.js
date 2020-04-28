//extension of promise1.js

//user breakpoints to debug the code, if you do not understand it.
//Dry Run all these codes to get a better understanding of the concepts.

function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            //here, first error will occur because there's no one to catch the error.
            //though the value of the promise will be => Promise {<rejected> : some error only.}
            
            console.log("inside first setTimeout()");
          //in this case, catch() has already been attached , it's just that catch's fn call hasn't been 
          //executed yet. so it will not return any errro here. 
            reject("some error only");
        },1000);
    })
}

let pPromise= promiseCreator();
console.log("when i was pending");
console.log(pPromise);

setTimeout(function(){
    console.log("when pPromise got its value after resolved");
    //when we resolve(10) => 10 comes to pPromise after getting resolved.

    //it shows {promise} => {10}, because it's the value of a promise.
    //it is not the case here that we get value from the previous then(), which is there in promise4.js
    console.log(pPromise);
},2000);
pPromise.catch(function(err){
    console.log(err);
})