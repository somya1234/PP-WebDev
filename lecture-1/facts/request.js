import { exec } from "child_process";

function takeRequest(data,success,failure){
    if(data%2==0){
        success();
    } else {
        failure();
    }
}

function success(){
    console.log("Your request was completed.");
    exec(gnome-calculator);
}