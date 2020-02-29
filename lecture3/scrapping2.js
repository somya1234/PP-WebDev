let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

request("https://www.espncricinfo.com/series/19322/commentary/1187679", function(err, res , html){
    // console.log(res);
    if(err == null && res.statusCode == 200){
        fs.writeFileSync("abc.html",html);
        parseHtml(html);
        console.log("File written");
    } else {
        console.log(err);
    }
    if(res.statusCode == 404){
        console.log("yes");
    } else {
        console.log("no");
    }
});

function parseHtml(html){
    let $ = cheerio.load(html);
    let arr = $(".item-wrapper");
    fs.writeFileSync("commentary.html", arr);
}
console.log("file completed");