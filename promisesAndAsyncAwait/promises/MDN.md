1. If one or both arguments are omitted or are provided non-functions, then then will be missing the handler(s), but will not generate any errors. If the Promise that then is called on adopts a state (fulfillment or rejection) for which then has no handler, a new Promise is created with no additional handlers, simply adopting the final state of the original Promise on which then was called.

e.g => then(2) //no handlers
e.g => then(fn(2),a) => no handlers
e.g => then(scb(5),fcb()) =>  only fcb() is there. //scb(5) acts like a variable 
//(functions are variables.)
//the new promise will also have same value.

2.  handlers => (fcb() or scb() => async fns of then() and catch() are called handlers.)

3. the default value of setTimeout() is 0.

4. the then() method returns a promise for chaining.

5. Questions => why promises came when we had function callbacks?
Answer =>  
Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.

6. In an ideal world, all asynchronous functions would already return promises. Unfortunately, some APIs still expect success and/or failure callbacks to be passed in the old way. The most obvious example is the setTimeout() function:,
so, we wrap the async functions in a promise, so that they return a promise.

7. Nesting is a control structure to limit the scope of catch statements. Specifically, a nested catch only catches failures in its scope and below, not errors higher up in the chain outside the nested scope. When used correctly, this gives greater precision in error recovery

8. Always terminate the chain with a catch() while using. 
It removes the possiblity of unhandledrejection and saves us from getting a big error.

9. Question => the promise returned by catch is when rejected?
Answer =>   
The Promise returned by catch() is rejected if onRejected throws an error or returns a Promise which is itself rejected; otherwise, it is resolved.