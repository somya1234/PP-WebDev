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
    let maxWicketTaker = "";
    let maxWickets = 0;
    let tableArr = $('.scorecard-section.bowling table tbody tr');
    for(let i=0; i<tableArr.length; i++){
        let bowlerName = $(tableArr[i]).find("td a").html();
        let wicket = $($(tableArr[i]).find("td")[5]).html();
        //find does not work without cheerio ($) whenever an index comes.
        if(wicket>maxWickets){
            maxWickets = wicket;
            maxWicketTaker = bowlerName;
        }
    }
    console.log(maxWicketTaker + " "+ maxWickets);
    fs.writeFileSync("table.html", tableArr);
}