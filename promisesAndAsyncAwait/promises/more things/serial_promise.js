const firstPromise = Promise.resolve(33);

let secondPromise = firstPromise.then(function(val){
    console.log("i am in first then "+val);
    //does it returns to secondPromise or to the next then () , if only the code is till here
    // [Query 1]
    // console.log(secondPromise);
    return val;
}).then(function(data){
    console.log("i am in second then "+ data);
})

// [Query 2 ] => how does serially many then() executes 