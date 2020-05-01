doSomethingCritical()
.then(result => doSomethingOptional(result)
  .then(optionalResult => doSomethingExtraNice(optionalResult))
  .catch(e => {})) // Ignore if optional stuff fails; proceed.
.then(() => moreCriticalStuff())
.catch(e => console.error("Critical failure: " + e.message));


/*
The inner neutralizing catch statement only catches failures from doSomethingOptional() and 
doSomethingExtraNice(), after which the code resumes with moreCriticalStuff(). 
Importantly, if doSomethingCritical() fails or moreCriticalStuff(), 
its error is caught by the final (outer) catch only.
*/