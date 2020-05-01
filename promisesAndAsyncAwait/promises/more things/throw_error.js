//important to debug this code 
//=> here, all then() and catch() are attached first, 
//=> and then their async code executes.

new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    //after throw error , it returns an error from that function
    //so lines after that won't execue.
    throw new Error('Something failed');
    //it caused a rejection here so the next line wasn;t printed.
        
    console.log('Do this');
})
.catch(() => {
    console.error('Do that');
})
.then(() => {
    console.log('Do this, no matter what happened before');
});
