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

function sherlockAndMinimax(arr, p, q) {
    arr.sort((a, b) => a - b);

    let bestM = p;
    let bestValue = -1;

    function getClosestDistance(x) {
        let left = 0, right = arr.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] === x) return 0;
            if (arr[mid] < x) left = mid + 1;
            else right = mid - 1;
        }

        let d1 = left < arr.length ? Math.abs(arr[left] - x) : Infinity;
        let d2 = right >= 0 ? Math.abs(arr[right] - x) : Infinity;

        return Math.min(d1, d2);
    }

    let candidates = [p, q];

    for (let i = 0; i < arr.length - 1; i++) {
        let mid = Math.floor((arr[i] + arr[i + 1]) / 2);
        if (mid >= p && mid <= q) candidates.push(mid);
    }

    for (let x of candidates) {
        let dist = getClosestDistance(x);

        if (dist > bestValue) {
            bestValue = dist;
            bestM = x;
        }
    }

    return bestM;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().trim().split(' ').map(Number);

    const firstMultipleInput = readLine().trim().split(' ');

    const p = parseInt(firstMultipleInput[0], 10);
    const q = parseInt(firstMultipleInput[1], 10);

    const result = sherlockAndMinimax(arr, p, q);

    ws.write(result + '\n');
    ws.end();
}
