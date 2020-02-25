let arr = [2,6,17,28,46,68];

function mymap(arr,cb){
    new_arr = [];
    for(let i=0; i<arr.length; i++){
        new_arr.push(cb(arr[i]));
    }
    return new_arr;
}
 
function transformer(num){
    if(num%2==0){
        return num+1;
    } else {
        return num-1;
    }
}

ans1=mymap(arr,transformer);

console.log(ans1);

function myfilter(arr,cb){
    new_arr = [];
    for(i=0;i<arr.length;i++){
        if(cb(arr[i])==true)
            new_arr.push(arr[i]);
    }
    return new_arr;
}

function transformer2(num){
    for(div = 2; div*div<=num; div++){
        if(num%div==0)
            return false;
    }
    return true;
}

ans2 = myfilter(ans1,transformer2);
console.log(ans2);