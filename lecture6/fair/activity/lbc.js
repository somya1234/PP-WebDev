let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/19322/commentary/1187683",function(err,res,html){
    if(err===null && res.statusCode==200){
        fs.writeFile("index.html",html,function(err){
            console.log("file written to disk");
        });
        parseHtml(html);
    } else if(res.statusCode==404){
        console.log("Invalid Url");
    } else {
        console.log(err);
        console.log(res.statusCode);
    }
});

function parseHtml(html){
    //cheerio can be used as the same wasy in which we console the things

    console.log("``````````````````````");

    //similar to document.querySelector();
    //in cheerio document => $
    //in jquery or js we use document, but in cheerio we use $.
    let $ = cheerio.load(html);
    // let itemWrapper = $(".item-wrapper");
    let itemWrapper = $(".description");
    let text = $(itemWrapper[0]).text();
    // let html = $(itemWrapper[0]).html();
    // let headings = $("#global-header .container h1");
    // let text = headings.text();
    console.log(text);
}

console.log("working");