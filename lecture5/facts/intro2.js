function greeter(whatToSay){
    console.log(whatToSay);
}

let sayHi = greeter;
sayHi(function(){
    console.log("I am passed as a parameter");
})