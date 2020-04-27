//this async function does not goes to API
//readFile goes to API
//it is similar to promises never goes to API.

//async is just at place of (create promise)
//await is because of then.

(async function (){
    //first then
    let dataOne =  fs.promises.readFile("../f1.txt");
    let dataTwo =  fs.promises.readFile("../f2.txt");
    let dataThree =  fs.promises.readFile("../f3.txt");

    //second then
    dataOne =  await dataOne;
    //so as of then's fn call is async, similarly, consol of this is async.
    console.log("f1 data");
    dataTwo =  await dataTwo;
    console.log("f2 data");
    dataThree = await dataThree;
    console.log("f3 data");
})()



//this code => then() method
/*
(async function (){
    //first then
    let dataOne =  fs.promises.readFile("../f1.txt");
    let dataTwo =  fs.promises.readFile("../f2.txt");
    let dataThree =  fs.promises.readFile("../f3.txt");

    dataOne.then(function(data){
        console.log("f1 data");
        return data1;
        
    }).then(function(data){
        console.log("f2 data");
        return data2;
    })

    //second then
    dataOne =  await dataOne;
    dataTwo =  await dataTwo;
    dataThree = await dataThree;
    console.log("f3 data");
})()
*/

//
