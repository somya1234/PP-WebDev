let number = 17;
for(let div = 2; div*div<= number; div++){
    if(number%2==0){
        console.log("Number is not prime");
        return;
    }
}
console.log("Number is prime");