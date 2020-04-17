const input = process.argv;
// console.log(input);

let cmd = input[2];
switch(cmd){
    case "view": 
    console.log("View is implemented");
    break;
    case "treefy":
        console.log("treefy is implemented");
        break;
    case "untreefy":
        console.log("untreefy is implemented");
        break;
    case "help":
        console.log("help is implemented");
        break;
    case "default":
        console.log("Wrong command");
}