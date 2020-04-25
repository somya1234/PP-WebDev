//in this without wait => task 2 will always end before task 1


//function will execute after 3 seconds
setTimeout(function(){
    console.log("Task 1 printed after 3 sec")
},3000);
// let ft = Date.now()+5*1000;

// while(Date.now()<ft){

// }

setTimeout(function(){
    console.log("Task 2 printed after minimum delay of 2 sec");
},2000);


//why => 2,3, 1
setTimeout(function(){
    console.log("Task 3 printed after 2 sec");
},2000);


//when wait => 5,6,3,2,=> task 1,3,2 (output)