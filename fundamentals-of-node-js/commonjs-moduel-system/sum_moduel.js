const sum= (a, b) => {
    return a + b;
}

const minus = (a, b) => {
    return a - b;
}

// Export the sum function using module.exports
//module.exports = sum;
// module.exports is an object, so we can export multiple functions
module.exports = {
    sum,minus
};

// we can use array also
// module.exports = [sum, minus]; // Exporting as an array