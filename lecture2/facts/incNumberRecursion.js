function incNum(num){
    if(num==6){
        return;
    }
    console.log(num);
    incNum(num+1);
}

incNum(1);