///  Decimal number system

let arr1=[2,4,5];

let digit= 2*1 + 4*10 + 5*100;

console.log(digit);// Output: 542
let digit2= 5*1 + 4*10 + 2*100;
console.log(digit2);// Output: 245



function number(digitList){
    let num = 0
    for(let i =0; i < digitList.length; i++){
        num =  num + digitList[i] * Math.pow(10,i)
    }
    return num 
}
const x = number([2,4,6,5])
console.log(x); // Output: 5642
// Math.pow(base, exponent) returns base raised to the power of exponent
// Example: Math.pow(2,3) returns 8 (2 raised to the power of 3) 2**3 = 8
// kisi bhi num ki power 0 hoti hai to wo 1 hota hai
// kisi bhi num ki power 1 hoti hai to wo num khud hota hai
// 2**0 = 1
// 2**1 = 2
