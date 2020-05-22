const readline = require('readline');
const fs = require('fs');
const tokenizer = require('./tokenizer');
const table = require('./data/table.json');
const parser = require('./parse');
const productions = require('./data/productions');
const parse = require('./parse');
const fileReadName = './data/data.txt';
const fWriteName = './data/tokens.txt';
const fRead = fs.createReadStream(fileReadName);
const fWrite = fs.createWriteStream(fWriteName);

let objReadline = readline.createInterface({
    input: fRead,
    terminal: true
});
let enableWriteIndex = true;
fRead.on('end', () => {
    enableWriteIndex = false;
    Tokens.push({ // 手动添加终结符号
        type:'$',
        value: '$'
    });
    console.log('wrongLines',wrongLines); // 输出错误的行号
    parse(Tokens, table, productions); // 进行语法分析阶段，语法分词出粗直接抛出错误
});
let index = 1;
let Tokens = [];
let wrongLines = []; // 记录错误的行号

objReadline.on('line', (line)=>{
    if (enableWriteIndex && line) { // 文件没有读完并且当前行不为空
        let {tokens, wrongFlag, wrongLocation} = tokenizer(line,index);
        fWrite.write(index + ':' + line.trim() + '\n');
        if (tokens.length !== 0) {
            if (!wrongFlag) {
                for (let token of tokens) {
                    Tokens.push(token);
                    // fWrite.write('\t' + index + ':' + token.type + ',' + token.value + '\n');
                }
            } else {
                wrongLines.push(wrongLocation); // 将错误的位置放入错误行号的数组
                // fWrite.write('\t' + 'the' + wrongLocation + 'has wrong!!!' + '\n');
            }
        } else {
            if (wrongFlag) {
                wrongLines.push(wrongLocation); // 将错误的位置放入错误行号的数组
                // fWrite.write('\t' + 'the ' + wrongLocation + ' has wrong!!!' + '\n');
            }
        }
        index++;
    }
});



