let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";"];
// const tokenizer = require('./tokenizer');
// const makePredictiveAnalysisTable = require('./makePredictiveAnalysisTable');
// let {tokens, wrongFlag, wrongLocation} = tokenizer("id + id * id $",0);
// console.log(tokens);
//
// let productions = new Map();
// productions.set('E', [['T', "E'"]]);
// productions.set("E'", [['+', 'T', "E'"], ['ε']]);
// productions.set('T', [['F', "T'"]]);
// productions.set("T'", [['*', 'F', "T'"], ['ε']]);
// productions.set('F', [['(', 'E', ')'], ['identifier']]);
// let First = new Map();
// First.set('E', ['(', 'identifier']);
// First.set("E'", ['+', 'ε']);
// First.set('T', ['(', 'identifier']);
// First.set("T'", ['*', 'ε']);
// First.set('F', ['(', 'identifier']);
// First.set('*', ['*']);
// First.set(')', [')']);
// First.set('identifier', ['identifier']);
// First.set('+', ['+']);
// First.set('(', ['(']);
// First.set('ε', ['ε']);
// let Follow = new Map();
// Follow.set('E', [')', '$']);
// Follow.set("E'", [')', '$']);
// Follow.set('T', ['+', ')', '$']);
// Follow.set("T'", ['+', ')', '$']);
// Follow.set('F', ['*', '+', ')', '$']);
// class Production {
//     constructor(key, value) {
//         this.key = key;
//         this.value = value;
//     }
// }
// let finalProductions = [];
// for (let key of productions.keys()) {
//     for (let item of productions.get(key)) {
//         finalProductions.push( new Production(key,item));
//     }
// }
// //console.log(finalProductions);
//
// let table = makePredictiveAnalysisTable(First, Follow, finalProductions);
// console.log(table);

// let VN = ['E', "E'", "T'", 'T', 'F'];
// let VT = ['+', 'identifier', '(', ')', '*', '$'];
let VNSet = new Set(VN);
let VTSet = new Set(VT);
module.exports = function parse(tokens, map, productions) {
    let current = 0;
    let ip = tokens[current];
    let stack = [];
    stack.push('$');
    stack.push('program');
    let top = stack[stack.length-1]; // 获取栈顶元素
    while (top !== '$') {
        console.log('stack1',stack);
        console.log('top', top);
        if (ip.type === 'specialWord' || ip.type === 'reservedWord') {
            ip.type = ip.value;
            //console.log('ip1', ip);
        }
        if (top === ip.type) { // 如果栈顶元素就是输入带上所指向的元素
            console.log('ipsuccess', ip);
            ip = tokens[++current]; // ip向前移动一个位置
            stack.pop(); // 执行栈的弹出操作
        } else if (VTSet.has(top)) {
            console.log('top1', top);
            console.log('ip2', ip);
            throw new Error('不匹配的终结符号'); // 抛出错误
        } else if (map[top][ip.type] === '#') {
            console.log('toptest', top);
            console.log('type', ip.type);
            throw new Error('产生式不存在'); // 抛出错误
        } else if (map[top][ip.type] !== '#') {
            let production = productions[map[top][ip.type]];
            console.log('规则', production);
            stack.pop();
            for (let i = production.value.length - 1; i >= 0; i--) {
                if (production.value[i] !== 'ε') {
                    stack.push(production.value[i]);
                }
            }
            console.log('stack2',stack);

        }
        top = stack[stack.length-1];
    }
};
// parse(tokens, table, finalProductions);