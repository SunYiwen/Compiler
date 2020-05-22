const readline = require('readline');
const fs = require('fs');
const tokenizer = require('./tokenizer');
const table = require('./data/table.json'); // 预测分析表
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
    //console.log(Tokens);
    //console.log(table);
    //console.log(productions);
    parse(Tokens, table, productions);

});
let index = 1;
let Tokens = [];

objReadline.on('line', (line)=>{
    if (enableWriteIndex && line) { // 文件没有读完并且当前行不为空
        let {tokens, wrongFlag, wrongLocation} = tokenizer(line,index);
        fWrite.write(index + ':' + line.trim() + '\n');
        if (tokens.length !== 0) {
            if (!wrongFlag) {
                for (let token of tokens) {
                    Tokens.push(token);
                    fWrite.write('\t' + index + ':' + token.type + ',' + token.value + '\n');
                }
            } else {
                fWrite.write('\t' + 'the' + wrongLocation + 'has wrong!!!' + '\n');
            }
        } else {
            if (wrongFlag) {
                fWrite.write('\t' + 'the ' + wrongLocation + ' has wrong!!!' + '\n');
            }
        }
        index++;
    }
});



