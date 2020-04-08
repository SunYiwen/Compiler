module.exports = function getToken(line) {
    line += ' ';
    let tokens = [];
    const reservedWordArray = ['if', 'then', 'else', 'end', 'repeat', 'until', 'read', 'write'];
    const reservedWord = new Set(reservedWordArray);
    const specialWordArray = ['+', '-', '*', '/', '=', '<', '(', ')', ';', ':='];
    const specialWord = new Set(specialWordArray);
    let tokenPoint = 0;// 单词缓冲区指针
    let ch = line.charAt(tokenPoint);// ch指向当前输入带上的字符
    let checkLetter = /^[A-Za-z]+$/;
    let checkNumber = /^[0-9]+$/;
    let checkLetterAndNumber = /^[0-9a-zA-Z]+$/;
    let flag = false; //假设不出现错误
    while (tokenPoint < line.length && !flag){ //当前字符没有终止且不出现错误
        if (checkLetter.test(ch)) { //当前字符为字母
            let token = '';
            while (checkLetter.test(ch) || checkLetterAndNumber.test(ch)) {
                token += ch;
                tokenPoint++;
                ch = line.charAt(tokenPoint);
            }
            if (tokenPoint === line.length) {
                break;
            }
            if (reservedWord.has(token)) {// 判断是否为关键字
                tokens.push({
                    type: 'reserved word',
                    value: token
                })
            } else {
                tokens.push({
                    type: 'ID',
                    value: token
                })
            }
        } else if (ch === ' ') { //当前字符为空字符
            tokenPoint++;
            ch = line.charAt(tokenPoint);
        } else if (checkNumber.test(ch)) { //当前是数字
            let token = '';
            while (checkNumber.test(ch)) {
                token += ch;
                tokenPoint++;
                ch = line.charAt(tokenPoint);
            }
            if (tokenPoint === line.length) {
                break;
            }
            tokens.push({
                type: 'NUM',
                value: Number(token)
            })
        } else if (ch === '{') {
            while(ch !== '}' && tokenPoint <= line.length){//没有右括号匹配
                tokenPoint ++;
                ch = line.charAt(tokenPoint);
            }
            if (ch !== '}') {
                flag = true;
                break;
            }
            else {
                tokenPoint ++;
                ch = line.charAt(tokenPoint);
            }
        }
        else {
            ch = line.charAt(tokenPoint);
            if (specialWord.has(ch)) {
                tokens.push({
                    type: 'specialWord',
                    value: ch
                });
                tokenPoint ++;
                ch = line.charAt(tokenPoint);
            } else {
                flag = true;
                break;
            }
        }
    }
    return {tokens, flag};
};


