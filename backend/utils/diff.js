const diff = require('diff');
const fs = require('fs');

const file1 = fs.readFileSync('test1.txt', 'utf-8');
const file2 = fs.readFileSync('test2.txt', 'utf-8');

// console.log(file1);
// console.log(file2);

// const res = diff.diffLines(file1, file2);
// console.log(res);

const patch = diff.createTwoFilesPatch('test1', 'test2', file1, file2);
console.log(patch);

const res = diff.applyPatch(file1, patch);

// const res = diff.createPatch('test', file1, file2);

console.log(res);
