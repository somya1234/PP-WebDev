const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
//here, setTimeout() will be called always later on at any time .
//because it will be added in the queue later.
wait().then(() => console.log(4));
Promise.resolve()
//after the promise is resolved with Promise.resolve(), 
//the scb() is attached, and the callback goes to the API
//but it executes faster than setTimeou()
.then(() => console.log(2))
.then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
