//extension of promise1.js

//Dry Run all these codes by making the diagram => it's easy with that.

function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            //here, first error will occur because there's no one to catch the error.
            //though the value of the promise will be => Promise {<rejected> : some error only.}
            

            //It shows that the value of the promise is rejected in case of rejection.
            //whereas if the promise is only resolved, output will be Promise {"some error only"}.
            //or Promise {10}, whatever we pass to it.
            resolve("some error only");
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
