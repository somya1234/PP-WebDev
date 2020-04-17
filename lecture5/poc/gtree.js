
let root = {
    data:"d10",
    children: [
        {
            data:"d20",
            children : [{
                data:"d50",
                children:[]
            },{
                data:"d60",
                children:[]
            }]
        },{
            data:"d30",
            children:[{
                data:"d70",
                children:[]
            }]
        },{
            data:"d40",
            children:[{
                data:"d80",
                children:[]
            },{
                data:"d90",
                children:[]
            }]
        }
    ]
}

function viewGTree(node){
    let meNMyFamily = node.data + "=>" ;
    for(let i=0; i<node.children.length; i++){
        let child = node.children[i];
        meNMyFamily+= child.data+",";
    }
// error -->    // console.log(node.data +"=>" node.children)
console.log(meNMyFamily);
for(let i=0; i<node.children.length; i++){
    let child = node.children[i];
    viewGTree(child);
}
}

viewGTree(root);