function shadowfn(){
    console.log("I will run even if you will pass parameters to me");
}
shadowfn("abc");
shadowfn("");


function shadow(){
    //basically it will returns an array.
    console.log(arguments);
}
shadow();
shadow("abc");
shadow("12",12);