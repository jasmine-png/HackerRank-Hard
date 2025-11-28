'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    const m = matrix.length;
    const n = matrix[0].length;
    const layers = Math.min(m, n) / 2;

    for (let l = 0; l < layers; l++) {
        const elements = [];

        for (let i = l; i < n - l; i++) elements.push(matrix[l][i]);
        for (let i = l + 1; i < m - l - 1; i++) elements.push(matrix[i][n - l - 1]);
        for (let i = n - l - 1; i >= l; i--) elements.push(matrix[m - l - 1][i]);
        for (let i = m - l - 2; i > l; i--) elements.push(matrix[i][l]);

        const rot = r % elements.length;
        const rotated = elements.slice(rot).concat(elements.slice(0, rot));

        let idx = 0;

        for (let i = l; i < n - l; i++) matrix[l][i] = rotated[idx++];
        for (let i = l + 1; i < m - l - 1; i++) matrix[i][n - l - 1] = rotated[idx++];
        for (let i = n - l - 1; i >= l; i--) matrix[m - l - 1][i] = rotated[idx++];
        for (let i = m - l - 2; i > l; i--) matrix[i][l] = rotated[idx++];
    }

    for (let row of matrix) console.log(row.join(' '));
}


function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
