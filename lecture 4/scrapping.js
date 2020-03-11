let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

let salesId = process.argv[2];

request(`/${seriesId}`,function(err,res,html){

})

function parseHtml(html){
    let $ = cheerio.load(html);
    let cardsHtml = $(".cscore.cscore--final");
}
let format = $(cardsHtml[i]).find().html();
let ans = format.includes("T20I");
