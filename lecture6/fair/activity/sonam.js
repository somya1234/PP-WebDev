let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let gcount=0;
let leaderboard=[];
console.log("Before");

request("https://www.espncricinfo.com/scores/series/19322",function(err,res,html){
    if(err==null && res.statusCode===200){
        parsehtml(html);
        //fs.writeFileSync("index.html",html);
        //console.log("file written");
    }
    else if(res.statusCode===404){
        console.log("Invalid page");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
})
function parsehtml(html){
    let $=cheerio.load(html);
    let cards=$(".cscore.cscore--final.cricket.cscore--watchNotes");
    for(let i=0;i<cards.length;i++){
        let matchtype=$(cards[i]).find(".cscore_info-overview").html();
        let test=matchtype.includes("ODI") || matchtype.includes("T20");
        if(test===true){
            console.log(matchtype);
            let anchor=$(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
            let matchLink=`https://www.espncricinfo.com${anchor}`;
            gotoMatchpage(matchLink);
        }
    }
    console.log("```````");
}
function gotoMatchpage(matchLink){
    gcount++;
    request(matchLink,function(err,res,html){
        if(err==null && res.statusCode==200){
            handleMatch(html);
            gcount--;
            if(gcount==0){
                console.table(leaderboard);
            }
        }
        else if(res.statusCode==404){
            console.log("Invalid url");
        }
        else{
            console.log(err);
        }
    })
}
function handleMatch(html){
    let $=cheerio.load(html);
    let formats=$(".cscore.cscore--final.cricket .cscore_info-overview").html();
    let format="";
    if(formats.includes("ODI")){
       format="ODI";
    }
    else{
        format="T20";
    }
    let teams=$(".sub-module.scorecard h2");
    let innings=$(".sub-module.scorecard");
    //console.log(format);
    for(let i=0;i<innings.length;i++){
        let batsmanrow=$(innings[i]).find(".wrap.batsmen");

        let team=($(teams[i]).text());
        for(let br=0;br<batsmanrow.length;br++){
            let batsman=$(batsmanrow[br]);
            let batsmanName=batsman.find(".cell.batsmen").text();
            let batsmanrun=batsman.find(".cell.runs").html();
            handlePlayer(format,team,batsmanName,batsmanrun);
        }
    }
}
function  handlePlayer(format,team,batsmanName,batsmanrun){
    batsmanrun=Number(batsmanrun);
    for(let i=0;i<leaderboard.length;i++){
        let pObj=leaderboard[i];
        if(pObj.Name==batsmanName && pObj.Team==team  && pObj.Format==format){
            pObj.Runs+=batsmanrun;
            return;
        }
    }
    let obj={
        Runs:batsmanrun,
        Format:format,
        Team:team,
        Name:batsmanName
    }
    leaderboard.push(obj);

}