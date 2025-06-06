

//const sum = require('./sum_moduel.js');
//const[sum, minus] = require('./sum_moduel.js'); // Importing the sum and minus functions from the module
const{ sum, minus } = require('./sum_moduel.js'); // Importing the sum and minus functions from the module
// require is function that accpet // the path to the module file and returns the exported content

const result = sum(5, 10);
console.log(`The sum of 5 and 10 is: ${result}`); // Output: The sum of 5 and 10 is: 15
const resultMinus = minus(10, 5);
console.log(`The minus of 10 and 5 is: ${resultMinus}`); // Output: The minus of 10 and 5 is: 5