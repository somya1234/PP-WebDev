function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },20000);
    })
}
let pPromise= promiseCreator();
console.log("when i was pending");
console.log(pPromise);
function cb(data){
    console.log(data)
}
//Problem :=>
//here, when time is of 20sec, then also, SetTimeout() is executing before cb()
//when both are in API.
pPromise.then(cb)