function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },2000);
    })
}
let pPromise= promiseCreator();
console.log("when i was pending");
console.log(pPromise);
function cb(data){
    console.log(data)
}
pPromise.then(cb)
//functions are also variables.
//promise.Prototype.then => used in another way [check this]
