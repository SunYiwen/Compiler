const readline = require('readline');
const fs = require('fs');
const fileReadName = './data/production.txt';
const fWriteTableName = './data/table.json';
const fWriteProductionsName = './data/productions.json';
const fWriteProductionsNameTest = './data/productionsTest.json';
const removeLeftRecursion = require('./removeLeftRecursion');
const getFirstCollection = require('./getFirstCollection');
const getFollowCollection = require('./getFollowCollection');
const makePredictiveAnalysisTable = require('./makePredictiveAnalysisTable');
const fRead = fs.createReadStream(fileReadName);
const fWriteTable = fs.createWriteStream(fWriteTableName);
const fWriteProductions = fs.createWriteStream(fWriteProductionsName);
const fWriteProductionsTest = fs.createWriteStream(fWriteProductionsNameTest);
const productions = new Map();
/*
 productions以map的数据结构存放产生式，key为产生式的左边符号，value为一个数组，每一个项中存放着一条产生式的右边符号
 */
class Production { // 产生式的结构体 key --> value(数组)
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
<<<<<<< HEAD
    let ans = removeLeftRecursion(productions);
    let finalProductions = [];
=======
    //console.log(productions);
    let ans = removeLeftRecursion(productions); // productions是原本map格式的产生式
    // console.log(ans);
    let finalProductions = []; // 数组格式的产生式
>>>>>>> e067b37c8e1cbb07e80e4405c3dc5e697ea7b822
    for (let key of productions.keys()) {
        for (let item of productions.get(key)) {
           finalProductions.push( new Production(key,item));
        }
    }
<<<<<<< HEAD
    fWriteProductions.write(JSON.stringify(finalProductions));
    fWriteProductionsTest.write(JSON.stringify({...finalProductions}));
    let First = getFirstCollection(ans);
    let Follow =  getFollowCollection(First, ans);
    let map = makePredictiveAnalysisTable(First, Follow, finalProductions);
    fWriteTable.write(JSON.stringify(map));
=======
    // console.log(finalProductions);
    // fWrite.write(JSON.stringify(finalProductions));
    let First = getFirstCollection(ans); // First集合
    let Follow =  getFollowCollection(First, ans); // Follow集合
    let map = makePredictiveAnalysisTable(First, Follow, finalProductions); // 预测分析表
    //console.log(map);
    fWrite.write(JSON.stringify(map)); // 将构造预测分析表转化为json格式存入文本文件
>>>>>>> e067b37c8e1cbb07e80e4405c3dc5e697ea7b822
});
let index = 1;

objReadline.on('line', (line)=>{
   if (enableWriteIndex && line) {
       let parts = line.split(' --> '); //数组
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

