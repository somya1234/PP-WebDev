//derived from promise2.js 
//output => 100

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
//cb executed before the promise get into the final state.
pPromise.then(cb(100))
//this is a constant.
//functions are also variables .