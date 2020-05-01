function PC(){
    return new Promise(function(resolve,reject){
        reject("some error");
    });
}
let p1 = PC();
let p2 = p1.then(undefined,function(data){
    //printing error
    console.log(data);
    //here, fcb is called.
    // return data;/


    //if i return error 
    throw "some new things";
    //then fcb is called
})

let p3 = p2.then(function(data){
    console.log("scb");
},function(data){
    console.log("fcb");
})