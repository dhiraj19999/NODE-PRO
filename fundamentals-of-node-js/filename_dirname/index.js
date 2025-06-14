

import { num } from "./num.js";

let meta= import.meta
const {url, dirname, filename} = import.meta; // ye bus node ke 20 version me acces hoga 
console.log(meta)// 
console.log(meta.url) // file:///C:/Users/Administrator/Desktop/NodeJS/fundamentals-of-node-js/filename_dirname/index.js
//console.log(meta.dirname) // undefined be
//console.log(meta.filename) // undefined
console.log(dirname) // C:\Users\Administrator\Desktop\NodeJS\fundamentals-of-node-js\filename_dirname
console.log(filename) // C:\Users\Administrator\Desktop\NodeJS\fundamentals-of-node-js\filename_dirname\index.js
console.log(url) // file:///C:/Users/Administrator/Desktop/NodeJS/fundamentals-of-node-js/filename_dirname/index.js
