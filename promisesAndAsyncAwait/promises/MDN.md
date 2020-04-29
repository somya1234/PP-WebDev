1. If one or both arguments are omitted or are provided non-functions, then then will be missing the handler(s), but will not generate any errors. If the Promise that then is called on adopts a state (fulfillment or rejection) for which then has no handler, a new Promise is created with no additional handlers, simply adopting the final state of the original Promise on which then was called.

e.g => then(2) //no handlers
e.g => then(fn(2),a) => no handlers
e.g => then(scb(5),fcb()) =>  only fcb() is there. //scb(5) acts like a variable 
//(functions are variables.)
//the new promise will also have same value.

2.  handlers => (fcb() or scb() => async fns of then() and catch() are called handlers.)

3. the default value of setTimeout() is 0.

4. the then() method returns a promise for chaining.