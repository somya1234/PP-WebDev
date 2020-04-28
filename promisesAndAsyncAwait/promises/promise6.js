function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            //as, according to dry run, all the main code has executed once, and we see that
            //there is sync catch() attached to it [catch are sync in nature]
            //so it will through the error at the moment setTimeout fn ends.
            reject("some error only");
        },1000);
    })
    //gets returned from here => [while breakpoint debugging]
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