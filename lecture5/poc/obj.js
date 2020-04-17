let cap = {
    name:"steve",
    last :"Rogers",
    age:45,
    address: {
        state:"New York",
        address:"Manhatten"
    },
    isAvenger:true
}

//get
console.log(cap.name);
console.log(cap.address.state);

 //set
 cap.movies = ["civil Wars","First Avengers","avengers"];
 console.log(cap);

 //update
 cap.age = 46;
 console.log(cap);

 //delete
 delete cap.isAvenger;
 console.log(cap);


 //another method to update 
 /* This is used when you don't the name of which key to update, then you can use square bracket method
 to update*/
 function updateCap(prop,val){
    cap[prop] = val;
 }
 updateCap("address","slovakia");
 updateCap("name","Buckey");
 console.log(cap);