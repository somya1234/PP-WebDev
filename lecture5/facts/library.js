// import { exec } from "child_process";
function lib(number){
    for(let div = 0; div*div<=number ; div++){
        if(number%div == 0){ 
            return false;
        }
    }
    return true;
}


//using library
let ans = lib(21);
if(ans == false){
    console.log("Number is not prime");
} else {
    console.log("Number is prime");
}


// let {exec} = require("child_process")
let exec = require('child_process').exec;
//******************************************** */
//framework
function framework(data, scb, fcb){
    for(let div=2; div*div<=data; div++){
        if(data%div == 0){
            fcb();
            return;
        }
    }
    scb();
}

//user code 
function success(){
    console.log("Number is prime");
    exec(gnome-calculator);
}

function failure(){
    console.log("Number is not prime");
    exec("start chrome");
}
framework(12,success,failure);