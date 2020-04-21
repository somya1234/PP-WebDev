//this one is for practice
//there is more better way to solve in activity folder.

let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

console.log("sending request**");
request("https://www.espncricinfo.com/series/19322/scorecard/1187683", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        parseHtml(html);
        console.log("connection made");
    } else if (res.statusCode == 404) {
        console.log("invalid url");
    } else {
        console.log(err);
        console.log(res.statusCode);
    }
});

function parseHtml(html) {
    console.log("````````````````````");
    let $ = cheerio.load(html);
    let bowlingTable = $(".scorecard-section.bowling");
    let maxWicketTaker = "";
    let maxWickets = 0;

    for (let i = 0; i < bowlingTable.length; i++) {
        let rows = $(bowlingTable[i]).find("table tr");
        for (let row = 0; row < rows.length; row++) {

            let singleRow = $(rows[row]).find("td");
                let bowlerName = $(singleRow[0]).text();
                let wickets = $(singleRow[5]).text();
                if(wickets>maxWickets){
                    maxWickets = wickets;
                    maxWicketTaker = bowlerName;
                } 
            }
        }
        console.log(maxWicketTaker+ " "+maxWickets);
}

console.log("parsing html**");