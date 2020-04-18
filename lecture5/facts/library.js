// import { exec } from "child_process";
const { exec } = require('child_process');
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
// let exec = require('child_process').exec;
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
    exec("gnome-terminal");
}

/* gedit --> untitled document,
    nautilus --> file explorer.
    gnome-calculator --> to open calculator
    code --> to open editor
    file-roller --> to open code as well as archive manager
    gnome-terminal --> terminal
*/

function failure(){
    console.log("Number is not prime");
    exec("file-roller");
    // exec("code");
}
framework(27,success,failure);