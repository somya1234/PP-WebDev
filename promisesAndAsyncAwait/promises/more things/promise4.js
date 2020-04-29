//example like try{} catch{}

//an example where in first then(), promise is rejected, then it is resolved in further then().

Promise.reject()
  .then(() => 99, () => 42) // onRejected returns 42 which is wrapped in a resolving Promise
  .then(solution => console.log('Resolved with ' + solution)); // Resolved with 42