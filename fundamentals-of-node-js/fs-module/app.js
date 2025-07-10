/* import fs from 'fs';


const content=fs.readFileSync('content.js', 'utf-8');
console.log(content);//  This will print the content of the file content.js


fs.readFile("content.js", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log(data); // This will print the content of the file content.js
});

*/
import fs from "node:fs/promises";  

const content = await fs.readFile("content.js", "utf-8"); // Using promises to read the file content.js
// This will read the file content.js asynchronously and return its content as a string.
// it is more optimised and modern way to handle file operations in Node.js.
console.log(content); // This will print the content of the file content.js