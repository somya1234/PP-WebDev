let fs = require("fs");

//serial asynchronous
console.log("before");
let content = fs.readFile("f1.html",function(err,content){
    if(err){
        console.log(err)
    }
    else{
        console.log(content+" ");
        let content1 = fs.readFile("f2.html",function(err,content){
            if(err){
                console.log(err);
            } else {
                console.log(content1);
            }
        })

    }
})


//parallel asynchronous
let content = fs.readFile("f1.html",function(err,content){
    if(err){
        console.log(err)
    }
    else{
        console.log(content+" ");

    }
})
let content1 = fs.readFile("f2.html",function(err,content){
    if(err){
        console.log(err);
    } else {
        console.log(content1);
    }
})
console.log("after");