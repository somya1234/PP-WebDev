module.exports.view = function(){
    console.log("view function is called");
    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t"){
        viewAsTree(src);
    } else if(mode == "-f"){
        viewAsFlatFile(src);
    } else {
        console.log("Wrong parameter passed.");
    }
};

function viewAsTree(){
    console.log("View As Tree is working");
}

function viewAsFlatFile(){
    console.log("View As Flat File is working");
}