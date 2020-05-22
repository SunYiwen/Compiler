let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'", "cmp-exp'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";", "$"];
let VNSet = new Set(VN);
let VTSet = new Set(VT);
function parse(tokens, map, productions) {
    let current = 0;
    let ip = tokens[current];
    let stack = [];
    stack.push('$');
    stack.push('program');
    let top = stack[stack.length-1]; // 获取栈顶元素
    while (top !== '$') {
        console.log('stack:',stack);
        console.log('ip', ip);
        console.log('ip.type', ip.type);
        console.log('top', top);
        if (ip.type === 'specialWord' || ip.type === 'reservedWord') {
            ip.type = ip.value;
        }
        if (top === ip.type) { // 如果栈顶元素就是输入带上所指向的元素
            console.log('match success', ip);
            ip = tokens[++current]; // ip向前移动一个位置
            stack.pop(); // 执行栈的弹出操作
        } else if (VTSet.has(top)) {
            throw new Error('cant match the vt'); // 抛出错误
        } else if (map[top][ip.type] === '#') {
            throw new Error('no match production'); // 抛出错误
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
}