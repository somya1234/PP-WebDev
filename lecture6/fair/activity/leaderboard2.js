let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let count = 0;
let leaderboard = [];
// require("console.table");

console.log("Before");
request("https://www.espncricinfo.com/scores/series/19322",function(err,res,html){
    if(err==null && res.statusCode===200){
        console.log("connection made**");
        parseSeries(html);
    } else if(res.statusCode===404){
        console.log("Incorrect url");
    } else{
        console.log(err);
        console.log(res.statusCode);
    }
});

function parseSeries(html){
    let $ = cheerio.load(html);
    let series = $(".cscore.cscore--final.cricket.cscore--watchNotes")
    for(let i=0;i<series.length;i++){
        //always put series[i] or any element of an array into cheerio.
        // console.log($(series[i]).text());

        //we can put .html() to find the type of series as it is the text only, so using text() or html()
        //will give the same results. as well as, there is only 1 element.
        let seriesType = $(series[i]).find(".cscore_info-overview").text();
        //if the line includes the string "ODI" or "T20",then only we will move further.
        if(seriesType.includes("ODI") || seriesType.includes("T20")){

            console.log(seriesType);
            //very important to write the classes correctly
            //and with their correct names.
            let anchor = $(series[i]).find(".cscore_buttonGroup ul li a").attr("href");
     //wrong=>      // let anchor = $(".cscore_details").attr("href");
            // console.log(anchor);
            let subLink = `https://www.espncricinfo.com${anchor}`;
            subSeries(subLink);
            // console.log(subLink);
            // count++;
            
        }
    }
    console.log("request made to open single series**");
    console.log("````````````````````````````");
}

function subSeries(subLink){
    request(subLink,function(err,res,html){
        if(err==null && res.statusCode===200){
            // console.log(`File ${count} saved to disk`);
            // fs.writeFileSync(`match${count}.html`,html);
            handleMatch(html);
            count--;
            if(count == 0){
                // console.log("000000000000000000000000000000000000000")
                console.table(leaderboard);
            }

        } else if(res.statusCode === 404){
            console.log("Incorrect url");
        } else{
            console.log(err);
            console.log(res.statusCode);
        }
    });
}

function handleMatch(html){
     let $ = cheerio.load(html);
     console.log("linked to the handle page.");
            // let teams = $(".sub-module.gameHeader .cscore_team.icon-font-after .cscore_truncate a .cscore_name.cscore_name--long");
            // let teams = $(".cscore.cscore--final.cricket.cscore--away-winner .cscore_name.cscore_name--long");
           
           //since 2 
           //we are sending link of each series one by one, and then we are calculating the matchType for that.
           //so no need of for loop.
           //as it will be calculated for each of the series itself by the fn call.
            let format = $(".cscore.cscore--final.cricket .cscore_info-overview").html();
            if(format.includes("T20")){
                format = "T20";
            } else{
                format="ODI";
            }
            // console.log(format);
            // let teams = $(".sub-module.scorecard");
            // for(let i=0;i<teams.length;i++){
            //     let team = $(teams[i]).find("h2").text();
            //     console.log(team);
            // }
            //or
            //same thing 

            //there are 2 teams -> India and New Zealand
            let teams = $(".sub-module.scorecard h2");
            //in batsmen, there are 2 cards of batsmen (1 for india and other for new zealand).
            let batsmen = $(".scorecard-section.batsmen");
            for(let i=0;i<teams.length;i++){
                let team = $(teams[i]).text();
                // console.log(team);

                //for each team, display their batsmen
                //for each scorecard, there are many players, so second loop for that.
                let team1batsManName = $(batsmen[i]).find(".flex-row .wrap.batsmen .cell.batsmen");
                //doing html() at the end will give only the first column of the cell-runs class.
                let team1Runs = $(batsmen[i]).find(".flex-row .wrap.batsmen .cell.runs");
                //loop for each row which will give name of the players and its runs scored.

                for(let j=0;j<team1batsManName.length;j++){
                    let batsManNameSingle = $(team1batsManName[j]).text();
                    let batsManRunsSingle = $(team1Runs[j]).html();
                    // console.log(batsManNameSingle+" "+batsManRunsSingle);
                   handlePlayer(format,team,batsManNameSingle,batsManRunsSingle);
                }
                
            }
           
           
}

function handlePlayer(format,team,batsManNameSingle,batsManRunsSingle){
    
    //because we are getting runs in the string format.
    batsManRunsSingle = Number(batsManRunsSingle);
    // if the batsman with the same team and same format of match, already exists, then 
    //add the score to get the total score he had in the T20 series.

    for(let i=0;i<leaderboard.length;i++){
        let singleRecord = leaderboard[i];
        if(format === singleRecord.format && team===singleRecord.teamName && batsManNameSingle===singleRecord.batsManName){
            singleRecord.score+=batsManRunsSingle;
            return;
        }
    }

    let obj = {
        format : format,
        teamName : team,
        batsManName : batsManNameSingle,
        score : batsManRunsSingle
    };
    leaderboard.push(obj);
}

console.log("After");
