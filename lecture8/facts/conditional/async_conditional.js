let fs = require("fs");

fs.readFile("../f1.txt",function(err,data){
    let f1Size = data.byteLength;
    console.log("f1 size "+f1Size);

    //serially async fn
    if(f1Size>20){
        console.log("bigger");
        //parallel 1 async
        fs.readFile("../f1.html",function(err,data){
            let f2Size = data.byteLength;
            console.log("f2 size "+f2Size);

            if(f2Size>100){
                fs.readFile("../f1.txt",function(err,data){
                    console.log("file 4 printed");
                })
                // read file 1
            } else {
                fs.readFile("../f1.html",function(err,data){
                    console.log("file 2 printed");
                })
                // read file 2
            }

        })

        //parallel 2 async function
        fs.readFile("../f3.txt",function(err,data){
            let f3Size = data.byteLength;
            console.log("f3 size "+f3Size);

            //serially async funciton
            
            if(f3Size>10){
                fs.readFile("../f3.txt",function(err,data){
                    console.log(data.byteLength);
                })
                // read f4
            } else{
                // read f5
                fs.readFile("../f5.txt",function(err,data){
                    console.log(data.byteLength);
                })
            }

        })
    } else {
        console.log("smaller");
    }
})