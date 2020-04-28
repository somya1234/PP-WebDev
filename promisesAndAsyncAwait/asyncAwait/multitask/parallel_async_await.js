let fs=require("fs");
 (async function(){
       let data= await fs.promises.readFile("../f1.txt");
       console.log("File 1 data:-"+data.length);
       
 })();
 (async function(){
    
    let data2=await fs.promises.readFile("../f2.txt");
    console.log("File 2 data:-"+data2.length);
})();
(async function(){
    
    let data3=await fs.promises.readFile("../f3.txt");
   
    console.log("File 3 data:-"+data3.length);
    
})();

/*
(async function(){
    let data= await
    //asyn code started
    fs.promises.readFile("../f1.txt");
    console.log("File 1 data:-"+data.length);
    //async code ends.
    
})();*/