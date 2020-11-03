var xx = 0;
let a = pow(2, 4);

console.log('result: ' + a);


function pow(x, n) {
    
    console.log(xx)
    if (n === 1) {
        console.log('if 1');
        return x;
    }
    
    xx = x * pow(x, n - 1);
    console.log(xx)
    return xx
}
