//first npm install request

//tushar bhaiya => it is working perfectly.

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let gcount = 0;
let leaderboard = [];

//requesting any particular site from node instead of google.

console.log("before");
// request("http://www.google.com",function(err,res,html){
    request("https://www.espncricinfo.com/scores/series/19322",
    function(err,res,html){
    if(err==null && res.statusCode == 200){
        // fs.writeFile("index.html",html,function(){
            // console.log("file written to disk");
        // })
        parseSeries(html);
    } else if(res.statusCode == 404){
        console.log("Invalid URL");
    } else{
        console.log(err);
        console.log(res.statusCode);
    }
});

//1. link --> request
function parseSeries(html){
    let $ = cheerio.load(html);
    let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes")
    // console.log(cards.length)
    for(let i=0;i<cards.length;i++){
        let matchType = $(cards[i]).find(".cscore_info-overview").html();
        let test = matchType.includes("ODI")|| matchType.includes("T20");
        if(test === true){
            console.log(matchType);
            let anchor = $(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
            let matchLink = `https://www.espncricinfo.com${anchor}`;
            gotToMatchPage(matchLink);

        }
        // console.log(type);
    }
    console.log("`");
}

// page request 
function gotToMatchPage(matchLink){
    gcount++;
    request(matchLink,function(err,res,html){
        if(err==null && res.statusCode==200){
            // console.log(`File ${count} save to disk`);
            // fs.writeFileSync(`match${count}.html`,html);
            handleMatch(html);
            gcount--;

            if(gcount == 0){
                // console.log(leaderboard);
                console.log('it wfhefie')
                console.table(leaderboard);
            }
            // count--;
        } else if(res.statusCode==404){
            console.log("Invalid url");
        } else {
            console.log(err);
            // console.log(res.statusCode);
        }
    });
}

//team => handleMatch team,format,runs,name
function handleMatch(html){
    const $ = cheerio.load(html);
    //batsman, runs,format,teams
    let format = $(".cscore.cscore--final.cricket .cscore_info-overview").html();
    format = format.includes("ODI")? "ODI" : "T20";
    console.log(format);
    //team
    let teams = $(".sub-module.scorecard h2");
    let innings = $(".sub-module.scorecard");
    fs.writeFileSync('innings.html',innings);
    // console.log(format);
    for(let i=0;i<innings.length;i++){
        let batsManRows = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
        fs.writeFileSync('batsmen2.html',batsManRows);
        // console.log($(teams[i]).text());
        let team = $(teams[i]).text();
        console.log(team);
        for(let br=0;br<batsManRows.length;br++){
            let batsMan = $(batsManRows[br]);
            let batsManName = batsMan.find(".cell.batsmen").text();
            //we need to find only first col, i.e html() => it gives only 1 col.
            let batsManRuns = batsMan.find(".cell.runs").html();
            console.log(batsManName+"  "+batsManRuns)
            handlePlayer(format,team,batsManName,batsManRuns);
            // console.log(batsManName+" "+batsManRuns);
        }
        // console.log("***");

    }
    console.log("###################");
}
// console.log("after");

//player 
function handlePlayer(format,team,batsManName,batsManRuns){
    //batsman
    batsManRuns = Number(batsManRuns);
    for(let i=0;i<leaderboard.length;i++){
        let pObj = leaderboard[i];
        if(pObj.name == batsManName && pObj.team == team && pObj.format ===format){
            pObj.runs += batsManRuns;
            return;
        }
    }
    let obj = {
        runs : batsManRuns,
        format: format,
        team: team,
        name: batsManName
    }

    leaderboard.push(obj);
    //1. First Time => Create New
    //2. Existing runs increase
}