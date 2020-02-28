let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/19322/scorecard/1187679", function(err, res, html){
    // console.log(err);
    // console.log(res);
    // console.log(html);
    if(err == null && res.statusCode == 200){
        // fs.writeFileSync("abc.html",html);
        parseHtml(html);
        console.log("File written");
    } else if(res.statusCode == 404){
        console.log("Page not found");
    } else {
        console.log(err);
    }
});

function parseHtml(html){
    let $ = cheerio.load(html);
    let BowlingRecord = $('.scorecard-section.bowling').html();
    fs.writeFileSync("table.html", BowlingRecord);
}