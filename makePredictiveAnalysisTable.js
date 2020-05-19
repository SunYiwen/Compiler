let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "$", ";"];
// let VN = ['E', "E'", "T'", 'T', 'F'];
// let VT = ['+', 'a', '(', ')', '*', '$'];
module.exports = function makePredictiveAnalysisTable(First, Follow, Productions) {
    let map = {};
    for (let i = 0; i < VN.length; i++) { // 初始化map
        map[VN[i]] = {};
        for (let j = 0; j < VT.length; j++) {
            map[VN[i]][VT[j]] = '#'; // 置空标志，预留错误位置
        }
    }
    for (let i = 0; i < Productions.length; i++) {
        if (Productions[i].value[0] === 'ε') {
            for (let item of Follow.get(Productions[i].key)) {
                map[Productions[i].key][item] = i;
            }
            continue;
        }
        let begin = 0;
        //console.log('production', Productions[i]);
        let first = First.get(Productions[i].value[begin]);
        // console.log('value', Productions[i].value[0]);
        // console.log('first', first);
        while(begin < Productions[i].value.length) {
            let flag = false; // 判断first集合中是否存在空元素
            for (let fi of first) {
                //console.log('fi',fi);
                if (fi !== 'ε') {
                    map[Productions[i].key][fi] = i;
                } else {
                    flag = true;
                }
            }
            if (!flag) { // 如果当前first集合没有空元素
                break;
            }
            first = First.get(Productions[i].value[++begin]);
        }
        if (begin === Productions[i].length) { // 最后一个元素的First集合有空元素
            let follow = Follow.get(Productions[i].key);
            for (let fo of follow) {
                map[Productions[i].key][fo] = i;
                if (fo === '$') {
                    map[Productions[i].key]['$'] = i;
                }
            }
        }
    }
    return map;

}
// let First = new Map();
// First.set('E', ['(', 'a']);
// First.set("E'", ['+', 'ε']);
// First.set('T', ['(', 'a']);
// First.set("T'", ['*', 'ε']);
// First.set('F', ['(', 'a']);
// First.set('*', ['*']);
// First.set(')', [')']);
// First.set('a', ['a']);
// First.set('+', ['+']);
// First.set('(', ['(']);
// First.set('ε', ['ε']);
// let Follow = new Map();
// Follow.set('E', [')', '$']);
// Follow.set("E'", [')', '$']);
// Follow.set('T', ['+', ')', '$']);
// Follow.set("T'", ['+', ')', '$']);
// Follow.set('F', ['*', '+', ')', '$']);
// let productions = new Map();
// productions.set('E', [['T', "E'"]]);
// productions.set("E'", [['+', 'T', "E'"], ['ε']]);
// productions.set('T', [['F', "T'"]]);
// productions.set("T'", [['*', 'F', "T'"], ['ε']]);
// productions.set('F', [['(', 'E', ')'], ['a']]);
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
// console.log(finalProductions);
// console.log(makePredictiveAnalysisTable(First, Follow, finalProductions));