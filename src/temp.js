let x = 0; 
let y = x++; 
console.log(x, y);
function f(z) { 
    return ++z; 
} 
console.log(x + y + f(x));