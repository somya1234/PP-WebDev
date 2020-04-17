let array = [4,14,17,23,48,66];

Array.prototype.sum = function(){
    let arrSum = 0;
    for(let i=0; i<this.length; i++){
        arrSum += this[i];
    }
    return arrSum;
}


let sum = array.sum();
console.log(sum);
/*
now each of the children of Array class can access the sum method, using the prototype method.
So, similarly, we can put mymap and myfilter under the prototype, so that every children in the 
Array class can use it.
As, earlier there were no library functions such as map and filter , 
so we are making our own mymap and myfilter functions.
*/


//second function

Array.prototype.myEach = function(){
    for(let i=0; i<this.length; i++){
        //for each element,a callback fn is exceuted.
        //similar operation like for(each:val) whatever loop
        cb(this[i]);
    }
}
