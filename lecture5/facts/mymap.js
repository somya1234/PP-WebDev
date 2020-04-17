let arr = [4,14,17,23,48,66];

//these are library functions

function add(num){
    if(num%2 == 0){
        num = num+1;
        return num;
        // return num+1;
    } else {
        num = num-1;
        return num;
        // return num-1;
    }
}

function mymap(arr,cb){
    let narr = [];
    for(let i=0; i<arr.length; i++){
        narr.push(cb(arr[i]));
    }
    return narr;
}

let result1 = mymap(arr,add);
//similarly, you cand pass squarer method inside the callback instead of add which will return n*n;
console.log(result1);
// ***************************************************************
//my filter

function myfilter(arr,cb){
    let new_array = [];
    for(let i=0; i<arr.length; i++){
        let ans = cb(arr[i]);
        if(ans == true){
            // return arr[i];
            new_array.push(arr[i]);
        }
    }
    return new_array;
}

function prime(num){
    for(let div = 2; div*div<=num ; div++){
        if(num%div==0){
            return false;
        }
    }
    return true;
}

let result2 = myfilter(result1,prime);
console.log(result2);