//first npm install request

let request = require("request");
let fs = require("fs");

//requesting any particular site from node instead of google.

console.log("before");
// request("http://www.google.com",function(err,res,html){
    request("https://www.primevideo.com/?ref_=dvm_pds_amz_in_as_s_g_brand1&ext_vrnc=hi|c_386559716766_m_lgAX6a65-dc_s_",
    function(err,res,html){
    if(err==null && res.statusCode == 200){
        fs.writeFile("index.html",html,function(){
            //for nodejs, they have made it like the first parameter of any callback fn will be err.

            //callback fns are used in the asynchronous fns
            //sunce synchronous fn will look like
            // fs.writeFileSync("index.html",html);
            console.log("file written to disk");
        })
    } else if(res.statusCode == 404){
        console.log("Invalid URL");
    } else{
        console.log(err);
        console.log(res.statusCode);
    }
});
console.log("after");