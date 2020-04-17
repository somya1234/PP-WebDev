const input = process.argv;
let view = require("./commands/viewFile");
let treefy = require("./commands/treefyFile");
let untreefy = require("./commands/untreefyFile");
//it will return the help() from the help file.
let {help} = require("./commands/help");
// console.log(input);

let cmd = input[2];
switch(cmd){
    case "view":
        //node tpp view src -t  
        view.view(process.argv[3],process.argv[4]);
    // console.log("View is implemented");
    break;
    case "treefy":
        // node tpp treefy dest src
        treefy.treefy(process.argv[3],process.argv[4]);
        break;
    case "untreefy":
        untreefy.untreefy(process.argv[3],process.argv[4]);
        break;
    case "help":
        // node tpp help
        help();
        break;
    case "default":
        console.log("Wrong command");
}