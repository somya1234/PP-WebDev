let root = {
    data: 10,
    children : [
        {
            data:20,
            children:[
                {
                    data: 50,
                    children: []
                },
                {
                    data: 60,
                    children:[]
                }
            ]
        },
        {
            data: 30,
            children: [
                {
                    data:70,
                    children: [
                        {
                            data: 100,
                            children: []
                        },
                        {
                            data: 110,
                            children: []
                        }
                    ]
                },
                {
                    data: 80,
                    children: []
                }
            ]
        },
        {
            data: 40, 
            children: [
                {
                    data: 90,
                    children: []
                }
            ]
        }
    ]
}

function treefy(root){
    newTree = ""+ root.data + " => ";
    for(let i=0; i<root.children.length; i++){
        newTree+= root.children[i].data+" ,";
    }
    console.log(newTree);
    for(let i=0; i<root.children.length; i++){
        treefy(root.children[i]);
    }
}

treefy(root);