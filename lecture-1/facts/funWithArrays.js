let arr = [2,6,17,28,46,68];
//map and filter.

arr = arr.map(function(x){
    if((x%2)==0){
        x=x+1;
        return x;
    } else {
        x = x-1;
        return x;
    }
});


const prime = arr.filter(function(x){
    for(div = 2;div*div<=x; div++){
        if(x%div==0){
            return false;
        }
    }
    return true;
    //or can be done by using flag.
})

console.log(prime);
