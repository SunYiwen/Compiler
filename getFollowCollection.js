let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'", "cmp-exp'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";"];
let Follow = new Map();
module.exports = function getFollowCollection(First, productions) {
    let Follow = new Map();
    for (let i = 0; i < VN.length; i++) {
        Follow.set(VN[i], [...getVNFollow(VN[i], First, productions)]);
    }
    return Follow;

};
function getVNFollow(VN, First, productions) {
    let Follow = new Set();
    if (VN === 'program') { // 将输入结束符号加了开始符号的Follow集合
        Follow.add('$');
    }
    for (let key of productions.keys()) {
        for (let item of productions.get(key)) {
            for (let i = 0; i < item.length; i++) {
                if (item[i] === VN) {
                    //console.log('item', item);
                    if (i === (item.length - 1)) { //如果当前非终结符号为产生式的最后一个符号
                        if (key !== VN) {
                            let tempSet = getVNFollow(key, First, productions);
                            for (let key1 of tempSet) {
                                Follow.add(key1);
                            }
                        }
                    } else {
                        let begin = i + 1;
                        let firstSet = First.get(item[begin]);
                        // console.log('item',item[begin]);
                        // console.log('firstSet',firstSet);
                        while(begin < item.length ) {
                            let flag = false; // 判断集合中是否存在空元素
                            for (let first of firstSet) {
                               if (first !== 'ε') {
                                   Follow.add(first);
                               } else {
                                   flag = true;
                               }
                            }
                            if (!flag) { // 该符号的first集合中不存在空元素
                                break;
                            }
                            firstSet = First.get(item[++begin]);
                        }
                        if (begin === item.length) {
                            //console.log('begin',begin);
                            firstSet = First.get(item[--begin]);
                            //console.log('firstSet2',firstSet);
                            for (let first of firstSet) {
                                if (first === 'ε') {
                                    let tempSet = getVNFollow(key, First, productions);
                                    for (let key2 of tempSet) {
                                        Follow.add(key2);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return Follow;
}


// let productions = new Map();
// productions.set('E', [['T', "E'"]]);
// productions.set("E'", [['+', 'T', "E'"], ['ε']]);
// productions.set('T', [['F', "T'"]]);
// productions.set("T'", [['*', 'F', "T'"], ['ε']]);
// productions.set('F', [['(', 'E', ')'], ['a']]);
//
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
// console.log(getVNFollow("F", First, productions));