const readline = require('lexical-analyzer/test/readLine');
const fs = require('fs');
const getToken = require('./getToken');

const fileReadName = './data.txt';
const fWriteName = './tokens.txt';
const fRead = fs.createReadStream(fileReadName);
const fWrite = fs.createWriteStream(fWriteName);

let objReadline = readline.createInterface({
    input: fRead,
    terminal: true
});

let index = 1;

objReadline.on('line', (line)=>{
    if (line) {
        line = line.trim();
        let{ tokens, flag } = getToken(line);
        if (tokens.length !== 0) {
            for (let token of tokens) {
                fWrite.write(JSON.stringify(token));
            }
        }
        if (!flag) {
            console.log(index + ': ' +line);
            for (let item of tokens) {
                if (item.type === 'reserved word') {
                    console.log('\t' + index + ': ' + item.type + ': ' + item.value );
                } else if (item.type === 'NUM') {
                    console.log('\t' + index + ': ' + item.type + ', value= ' + item.value );
                } else if (item.type === 'specialWord') {
                    console.log('\t' + index + ': ' + item.value );
                } else if (item.type === 'ID') {
                    console.log('\t' + index + ': ' + item.type + ', name= ' + item.value );
                }
            }
            index++;
        } else {
            objReadline.close();
        }
    }
});



