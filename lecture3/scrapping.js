let request = require("request");
let fs = require("fs");

request("https://www.espncricinfo.com/series/19322/game/1187679", function(err, res, html){
    // console.log(err);
    // console.log(res);
    // console.log(html);
    if(err == null && res.statusCode == 200){
        fs.writeFileSync("abc.html",html);
        console.log("File written");
    } else if(res.statusCode == 404){
        console.log("Page not found");
    } else {
        console.log(err);
    }
});