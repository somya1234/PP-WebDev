function promiseCreater(){
    return new Promise(function(resolve,reject){
        resolve(10);
})
}
let pPromise = promiseCreater();
console.log("pending recieved from p1");
console.log(pPromise);
console.log("``````");
function scb(data) {
  console.log("Inside resolve of 1st then")
  console.log(data);
  console.log("`````````");
  return 100;
}
function fcb(err) {
  console.log(err);
}
//it will execute asynchronously because here, the promise is resolved.
let pPromiseFrom1stThen = pPromise.then(scb,fcb)
setTimeout(function () {
  console.log("ajdafnbfabfb");
  console.log("pending recieved from then");
console.log(pPromiseFrom1stThen);
  //console.log(data);
  
}, 1000);
console.log("777777777777777777777777");