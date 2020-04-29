function creator(){
    return new Promise(function(resolve,reject){
        resolve("success");
    })
}

mypromise1 = creator();
console.log(mypromise1);
//scb() is async in nature.
mypromise1.then(function(mypromise1){
    console.log(mypromise1);
    // retrun mypromise2;
    
}).then(function(data){
    console.log(data);
});
// console.log(mypromise2);
// mypromise3 = mypromise2.then();
// console.log(mypromise3);