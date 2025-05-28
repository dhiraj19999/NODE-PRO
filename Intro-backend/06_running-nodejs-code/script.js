const fs = require("fs");

const text = fs.readFileSync("C:\\Users\\anura\\OneDrive\\Desktop\\text.txt");
console.log(text.toString());
console.log(globalThis);
console.log("End");
