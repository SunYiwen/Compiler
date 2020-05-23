let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";"];
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
        console.log('stack:',stack);
        if (ip.type === 'specialWord' || ip.type === 'reservedWord') {
            ip.type = ip.value;
        }
        if (top === ip.type) { // 如果栈顶元素就是输入带上所指向的元素
            console.log('match success', ip);
            ip = tokens[++current]; // ip向前移动一个位置
            stack.pop(); // 执行栈的弹出操作
        } else if (VTSet.has(top)) {
<<<<<<< HEAD
            throw new Error('cant match the vt'); // 抛出错误
        } else if (map[top][ip.type] === '#') {
            throw new Error('no match production'); // 抛出错误
=======
            console.log('top1', top);
            console.log('ip2', ip);
            throw new Error('不匹配的终结符号'); // 抛出错误
        } else if (map[top][ip.type] === '#') {
            console.log('toptest', top);
            console.log('type', ip.type);
            throw new Error('产生式不存在'); // 抛出错误
>>>>>>> e067b37c8e1cbb07e80e4405c3dc5e697ea7b822
        } else if (map[top][ip.type] !== '#') {
            let production = productions[map[top][ip.type]];
            console.log('match rule', production);
            stack.pop();
            for (let i = production.value.length - 1; i >= 0; i--) {
                if (production.value[i] !== 'ε') {
                    stack.push(production.value[i]);
                }
            }
        }
        top = stack[stack.length-1];
    }
};