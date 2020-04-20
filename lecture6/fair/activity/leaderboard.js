//first npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

//requesting any particular site from node instead of google.

console.log("before");
// request("http://www.google.com",function(err,res,html){
    request("https://www.espncricinfo.com/scores/series/19322",
    function(err,res,html){
    if(err==null && res.statusCode == 200){
        fs.writeFile("index.html",html,function(){
            console.log("file written to disk");
        })
        parseHtml(html);
    } else if(res.statusCode == 404){
        console.log("Invalid URL");
    } else{
        console.log(err);
        console.log(res.statusCode);
    }
});

function parseHtml(html){
    let $ = cheerio.load(html);
    let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes")
    // console.log(cards.length)
    for(let i=0;i<cards.length;i++){
        let matchType = $(cards[i]).find(".csore_info-overview").html();
        let test = matchType.includes("ODI")|| matchType.includes("T20");
        if(test == true){
            console.log(matchType);
            let anchor = $(cards[i]).find(".csocre_buttonGroup ul li a").attr("href");
            let matchLink = `https://www.espncricinfo.com${anchor}`;
            gotToMatchPage(link);

        }
        console.log(type);
    }
}


function gotToMatchPage(MatchLink){
    gcount++;
    request(MatchLink,function(err,res,html){
        if(err==null && res.statusCode==200){
            // console.log(`File ${count} save to disk`);
            // fs.writeFileSync(`match${count}.html`,html);
            handleMatch(html);
            gcount--;
            if(count == 0){
                console.table()
            }
        } else if(res.statusCode==404){
            console.log("Invalid url");
        } else {
            console.log(err);
            console.log(res.statusCode);
        }
    })
}

function handleMatch(html){
    const $ = cheerio.load(html);
    //batsman, runs,format,teams
    let format = $(".cscore.csocre--final.cricket .csocre_info-overview").html();
    //team
    let teams = $(".sub-module.scorecard h2");
    let innings = $(".sub-module.scorecard");
    console.log(format);
    for(let i=0;i<innings.length;i++){
        let batsManRows = $(innings[i].find(".scorecard-section.batsmen .flex-rows .wrap-batsmen"));
        console.log($(teams[i]).text());
        for(let br=0;br<batsManRows;br++){
            let batsMan = $(batsManRows[br]);
            let batsManName = batsMan.find(".cell.batsmen").text();
            let batsManRuns = batsMan.find(".cell.runs").html();
            console.log(batsManName+" "+batsManRuns);
        }
        console.log("*************");

    }
    console.log("###################");
}
console.log("after");