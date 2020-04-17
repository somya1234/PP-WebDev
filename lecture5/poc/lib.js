module.exports.happyLibrary = function happyLibrary(){
    console.log("I will give you a happy function");
}
module.exports.myProperty = "I am from happy library";
let notExported = 'Sorry i would not be exported'

module.exports.myFn = function myFn(){
    console.log("I am myFn");
}