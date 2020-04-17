function lib(number){
    for(let div = 0; div*div<=number ; div++){
        if(number%div == 0){
            console.log("Number is not prime");
            // console.log(div);
            // break;
            return ;
        }
    }
    console.log("Number is prime");
}
//in break --> it will print (Number is prime ) as well.

//using library
lib(21);