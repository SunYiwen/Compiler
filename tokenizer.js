module.exports = function tokenizer(input, lineNumber) {
    input += ' ';
    let current = 0; //单词缓冲区指针
    let tokens = [];
    let wrongLocation = 0; //错误的行号
    let wrongFlag = false; //出现错误的标记
    let nestedBrace = false; //判断注释嵌套的标志
    const reservedWordArray = ['if', 'then', 'else', 'end', 'repeat', 'until', 'read', 'write'];
    const reservedWord = new Set(reservedWordArray); // 保留字集合
    const specialWordArray = ['+', '-', '*', '/', '=', '<', '(', ')', ';', ':='];
    const specialWord = new Set(specialWordArray); // 特殊字集合
    while (current < input.length) {
        let char = input[current];
        let LITTERS = /[a-z]/i; //识别字母的正则
        let NUMBERS = /\d/; //识别数字的正则
        if (LITTERS.test(char)) { // 识别标识符和保留字
            let value = '';
            while(LITTERS.test(char) || NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            if (reservedWord.has(value)) {
                tokens.push({
                    type: 'reservedWord',
                    value: value
                });
            } else {
                tokens.push({
                    type: 'identifier',
                    value: value
                });
            }
            continue;
        }
        let WHITESPACE = /\s/; // 匹配空格符的正则表达式
        if (WHITESPACE.test(char)) { //跳过空白符
            current++;
            continue;
        }
        if (NUMBERS.test(char)) {
            let value = '';
            while(NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            if (char === '.') { //获取小数字符
                value += '.';
                char = input[++current];
                while(NUMBERS.test(char)) {
                    value += char;
                    char = input[++current];
                }
            }
            tokens.push({
                type: 'number',
                value: Number(value)
            });
            continue;
        }
        if (specialWord.has(char) || char === ':') { // 识别特殊字符
            if (char === ':') {
                char = input[++current];
                tokens.push({
                    type: 'specialWord',
                    value: ':='
                });
            } else {
                tokens.push({
                    type: 'specialWord',
                    value: char
                });
            }
            ++current;
            continue;
        }
        if (char === '{') { //匹配注释
            char = input[++current];
            while (char !== '}' && (current < input.length)) { // 一直寻找右大括号
                if (char === '{' ) { // 注释发生了嵌套
                    nestedBrace = true;
                    break;
                }
                char = input[++current];
            }
            if (nestedBrace || char !== '}') { // 找不到右括号匹配左括号，则抛出错误
                wrongFlag = true;
                wrongLocation = lineNumber;
                break; // 结束对当前当的字符处理
            }
            ++current;
            continue;
        }
        wrongLocation = lineNumber;
        wrongFlag = true;
        break;
    }
    tokens.push({ // 手动添加终结符号
        type:'$',
        value: '$'
    });
    return {tokens, wrongFlag, wrongLocation};
};