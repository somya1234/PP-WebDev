function promiseCreator(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Some error occured");
        },1000);
    })
}

async function promiseConsumer(){
    // promiseCreator().then(function(data){
    //     console.log(data);
    // })
    //try catch for error
    let data = await promiseCreator();
    console.log(data);
}

promiseConsumer();

//Note -: 
//await is only valid with async fucntion 
//await => corresponds to => then
//await is not valid for top-level code (i.e. sync code).