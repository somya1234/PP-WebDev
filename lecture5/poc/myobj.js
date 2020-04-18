function myobjFn(obj){
    // obj.myProperty = "hello aded";
    obj = {myProp: "new prop"}
    return obj;
}
let my_obj = {name:"myobj"};
myobjFn(my_obj);
console.log(my_obj);