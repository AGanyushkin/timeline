
const ROWS = 1000;
const COLS = 1000;

function initMatrix() {
    let matrix = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            matrix[r,c] = Math.random();
        }
    }
    return matrix;
}

let matrix1 = initMatrix();
let matrix2 = initMatrix();

function add(m1, m2) {
    let matrix = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            matrix[r,c] = m1[r,c] + m2[r,c];
        }
    }
    return matrix;
}

let tries = 10;
while (tries--) {
    add(matrix1, matrix2);
}
