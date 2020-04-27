function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            //try doing reject(10) here.
            resolve(10);
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