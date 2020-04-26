const fs = require("fs");
//creator 1 
//consumer side => use written api's
// const fileWillBeReadPromise =  fs.promises.readFile("f1.html");


// promises are paradigm
//convert callback fns into promise based function

//creator of the code / producer

//creator 2 side => creating promises through funcions
//when we want to code using a function but make that function async using a promise 
function priomisifyFs(path){
    //new Promise is an API already given

    //names of resolve and reject can be success or failure.
    let creatorPromise = new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            //acc to whether there is error or not while reading a file, the fn is called and
            
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
    // console.log(creatorPromise); => it is a pending state (initially pending state).
    //returning promise
    return creatorPromise;
}

let fileWillBeReadPromise = priomisifyFs("f1.html");

//internal working of creatorPromise, after it reads the file , if there is error it calls reject fm
//which is made in then() of the promise .
//it is the synatx that second parameter of the function is for handling error
//and first fn is success callback, so depending upon whatever is called inside the 
//creator promise fn, it gets handled.

//consumer side => 

// console.log(fileWillBeReadPromise); //=> pending state

//if answer,=> resolve function calls then 
fileWillBeReadPromise.then(function(data){
    //scb
    console.log("inside then or scb");
    console.log(data.length);
    let f2WillBeReadPromise = priomisifyFs("f2.html");
    //pending state promise f2WillBeReadPromise
    return f2WillBeReadPromise;
},function(err){
    //error handled
    console.log("inside failure callback");
    console.log(err);
    let f2WillBeReadPromise = priomisifyFs("f2.html");
    return f2WillBeReadPromise;
}).then(function(data){
    console.log("***************2 nd then ***********");
    console.log(data);
    console.log("********** 2nd then ends ****************");
})

//consumer => code 2
//consumer => we normally write this code but it is using the producer's code.
/*
fileWillBeReadPromise.then(
    //data passed whatever returned by the promise 
    function(data){
        console.log("inside scb");
        console.log(data.length);
        let f2WillBeReadPromise = priomisifyFs("f2.html");
        return f2WillBeReadPromise;
    }).then(function(data){
        console.log("inside 2 scb of then");
        console.log(data.length);
    },function fcb(err){
        console.log("fcb of 2nd then");
        console.log(err);
        return "All Well";
    }).then(function(data){
        console.log(data);
    })
*/

//code 3-
/*
let fileWillBeReadPromise = priomisifyFs("f11.html");
fileWillBeReadPromise.then(
    function(data){
        console.log("inside scb");
        console.log(data.length);
        let f2WillBeReadPromise = priomisifyFs("f2.html");
        return f2WillBeReadPromise;
    }).then(function(data){
        console.log("inside 2nd then")
        console.log(data);
    }).then(undefined,function(err){
        console.log("I saved the day");
        console.log(err);
    }).catch(function(err){
        console.log("catch saved me");
        // console.log(err);
    })
*/

//wherever you will introduce catch => error will be supressed.

