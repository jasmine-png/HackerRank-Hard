'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function boardCutting(cost_y, cost_x) {
    const MOD = 1000000007;

    cost_y.sort((a, b) => b - a);
    cost_x.sort((a, b) => b - a);

    let i = 0, j = 0;
    let h = 1, v = 1; 
    let cost = 0;

    while (i < cost_y.length && j < cost_x.length) {
        if (cost_y[i] > cost_x[j]) {
            cost = (cost + cost_y[i] * v) % MOD;
            h++;
            i++;
        } else {
            cost = (cost + cost_x[j] * h) % MOD;
            v++;
            j++;
        }
    }

    while (i < cost_y.length) {
        cost = (cost + cost_y[i] * v) % MOD;
        i++;
    }

    while (j < cost_x.length) {
        cost = (cost + cost_x[j] * h) % MOD;
        j++;
    }

    return cost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().trim().split(' ');

        const m = parseInt(firstMultipleInput[0], 10);
        const n = parseInt(firstMultipleInput[1], 10);

        const cost_y = readLine().trim().split(' ').map(Number);
        const cost_x = readLine().trim().split(' ').map(Number);

        const result = boardCutting(cost_y, cost_x);

        ws.write(result + '\n');
    }

    ws.end();
}
