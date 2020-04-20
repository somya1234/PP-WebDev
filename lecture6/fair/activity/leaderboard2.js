let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

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
            let anchor = $(".cscore_details").attr("href");
            let subLink = `https://www.espncricinfo.com${anchor}`
            subSeries(subLink);
            // console.log(subLink);
            console.log("request made to open single series**");
        }
    }
}

function subSeries(subLink){
    request(subLink,function(err,res,html){
        
        console.log("linked to sub Series page.");
    })
}

console.log("After");
