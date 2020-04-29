var p1 = new Promise((resolve, reject) => {
    // resolve('Success!');
    // or
    reject(new Error("Error!"));
  });
  
  p1.then(value => {
    console.log(value); // Success!
  }, reason => {
    console.error(reason); // Error!
  });