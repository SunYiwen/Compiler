const readline = require('readline');
const fs = require('fs');
const fileReadName = './data/production.txt';
const fWriteName = './data/table.json';
const removeLeftRecursion = require('./removeLeftRecursion');
const getFirstCollection = require('./getFirstCollection');
const getFollowCollection = require('./getFollowCollection');
const makePredictiveAnalysisTable = require('./makePredictiveAnalysisTable');
const fRead = fs.createReadStream(fileReadName);
const fWrite = fs.createWriteStream(fWriteName);
const productions = new Map();
/*
 productions以map的数据结构存放产生式，key为产生式的左边符号，value为一个数组，每一个项中存放着一条产生式的右边符号
 */
class Production {
    constructor(key, value) {
       this.key = key;
       this.value = value;
    }
}
let objReadline = readline.createInterface({
    input: fRead,
    terminal: true
});
let enableWriteIndex = true;
fRead.on('end', () => {
    enableWriteIndex = false;
    //console.log(productions);
    let ans = removeLeftRecursion(productions);
    //console.log(ans);
    let finalProductions = [];
    for (let key of productions.keys()) {
        for (let item of productions.get(key)) {
           finalProductions.push( new Production(key,item));
        }
    }
    // console.log(finalProductions);
    // fWrite.write(JSON.stringify(finalProductions));
    let First = getFirstCollection(ans);
    let Follow =  getFollowCollection(First, ans);
    let map = makePredictiveAnalysisTable(First, Follow, finalProductions);
    //console.log(map);
    fWrite.write(JSON.stringify(map));
});
let index = 1;

objReadline.on('line', (line)=>{
   if (enableWriteIndex && line) {
       let parts = line.split(' --> ');
       let key = parts[0];
       let value = parts[1].split(' ');
       if (productions.has(key)) {
           let values = productions.get(key);
           values.push(value);
           productions.set(key,values);
       } else {
           productions.set(key, [value]);
       }
       index++;
   }
});

