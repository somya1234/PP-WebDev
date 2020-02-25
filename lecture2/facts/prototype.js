let arr = [1,2,3,4,5,6];

Array.prototype.mymap = function(cb){
    let newArr = [];
    for(let i=0; i<this.length; i++){
        let ans = cb(this[i]);
        newArr.push(ans);
    }
    return newArr;
};

function transformer(num){
    if(num%2==0){
        return num+1;
    } else {
        return num-1;
    }
}


let transArr = arr.mymap(transformer);
console.log(transArr);