//A good example => 

Promise.resolve()
  .then((data) => {
      console.log(data)
    // Makes .then() return a rejected promise
    //
    //throw returns this error further or basically throw creates an error.
    throw new Error('Oh no!');
  })
  .then(() => {
    console.log('Not called.');
  }, error => {
    console.error('onRejected function called: ' + error.message);
  });