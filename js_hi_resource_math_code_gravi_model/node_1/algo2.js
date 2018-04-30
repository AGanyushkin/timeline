
function add(a, b) {
    return a + b;
}

let p = 100;
while (p--) {
    for (let i = 0; i < 1000; i++) {
        const r = add(i, i * 2);
    }
    
    let r = add(i, '1');
}
