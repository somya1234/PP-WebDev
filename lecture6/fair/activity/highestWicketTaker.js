let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");
console.log("**sending request**");

request("https://www.espncricinfo.com/series/19322/scorecard/1187683",function(err,res,html){
    if(err===null && res.statusCode==200){
        // fs.writeFile("hwt.html",html,function(err){
        //     console.log("file written to disk");
        // });
        console.log("Received data");
        fs.writeFileSync("scorecard.html",html);
        parseHtml(html);
    } else if(res.statusCode==404){
        console.log("Invalid Url");
    } else{
        console.log(err);
        console.log(res.statusCode);
    }
});

function parseHtml(html){
    let $ = cheerio.load(html);
    console.log("`````````````````````");
    $(".scorecard-section .bowling")

    // let team1Bowler = $(scoreCardBowl[0]).text();
    // let team2Bowler = $(scoreCardBowl[1]).text();
    
    // let scoreCardBowl = $(".scorecard-section.bowling");
    /*for(let i=0;i<scoreCardBowl.length;i++){
        let tArry1 = $(scoreCardBowl[i]).find("table tbody tr");
        // let max = 0;
        console.log(`Bowlers of team ${i+1} are:-`)
        for(let j=0;j<tArry1.length;j++){
            console.log($(tArry1[j]).text());
            // Math.max()
        }
        console.log("``````````````````````")
    }*/
    let bowlers = $(".scorecard-section.bowling table tbody tr");

    let maxwicket=0;
    let maxwickettaker=" ";
    for(let i=0;i<bowlers.length;i++){
        let bowlername=$($(bowlers[i]).find("td")[0]).text();
        let wicket=$($(bowlers[i]).find("td")[5]).text();
        if(wicket>maxwicket){
          maxwicket=wicket;  
          maxwickettaker=bowlername;
        }

    }
    console.log(maxwickettaker+" "+maxwicket);

    // for(let i=0;i<bowlers.length;i++){
    //     let maxWicket = 0;
    //     let bowlerName = $($(bowlers[i]).find("td")[0]).text();
    //     let wickets = $($(bowlers[i]).find("td")[5]).text();
    //     maxWicket = Math.max(maxWicket,wickets);

    //     console.log(`${bowlerName}   ${maxWicket}`);
    // }
    // console.log(scoreCardBowl.text());

    // fs.writeFileSync("scorecard.html",),
    //search or access the html file by operning in firefox.
    console.log("written html");
}

console.log("**parsing html**");