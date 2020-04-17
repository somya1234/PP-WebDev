let array = [4,14,17,23,48,66];
console.log(array);
array = array.map(function myFn(num){
    if(num%2 == 0){
        return num+1;
    } else {
        return num-1;
    }
});

console.log(array);

//a better approach - 
/*
function add(num){
    if(num%2 == 0){
        return num+1;
    } else {
        return num-1;
    }
}
let map1 = array.map(num);
//here, the name can also be transformed.
console.log(map1);
*/

let result = array.filter(function prime(num){
    for(let div = 2; div*div<=num ; div++){
        if(num%div==0){
            return false;
        }
    }
    return num;
});
console.log(result);


/*let result = map1.filter(test)
function test(){

}
console.log(result);
*/