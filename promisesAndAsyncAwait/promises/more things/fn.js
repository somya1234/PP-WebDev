function one() {
    console.log("i am one function ");
    throw new Error("hey, i am an error.");
    console.log("fn 1 is ending!");
}

one();

