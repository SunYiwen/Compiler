let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'", "cmp-exp'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "$", ";"];
/*
构建预测分析表
 */
module.exports = function makePredictiveAnalysisTable(First, Follow, Productions) {
    let map = {};
    for (let i = 0; i < VN.length; i++) { // 初始化map
        map[VN[i]] = {};
        for (let j = 0; j < VT.length; j++) {
            map[VN[i]][VT[j]] = '#'; // 置空标志，预留错误位置
        }
    }
    for (let i = 0; i < Productions.length; i++) { // 对每一个产生式扫描
        if (Productions[i].value[0] === 'ε') { // 如果产生式右部为空，直接加入产生式左边的Follow集合
            for (let item of Follow.get(Productions[i].key)) {
                map[Productions[i].key][item] = i;
            }
            continue;
        }
        let begin = 0;
        let first = First.get(Productions[i].value[begin]); // 逐个扫面产生式的右边的元素，如果一个元素的First集合中没有空元素，则结束加入。如果存在空元素，则继续扫描。
        while(begin < Productions[i].value.length) {
            let flag = false; // 判断first集合中是否存在空元素
            for (let fi of first) {
                if (fi !== 'ε') {
                    map[Productions[i].key][fi] = i; // 将first集合中非空的元素
                } else {
                    flag = true;
                }
            }
            if (!flag) { // 如果当前first集合没有空元素
                break;
            }
            first = First.get(Productions[i].value[++begin]);
        }
        if (begin === Productions[i].length) { // 最后一个元素的First集合有空元素，那么需要加入左边元素的Follow集合
            let follow = Follow.get(Productions[i].key);
            for (let fo of follow) {
                map[Productions[i].key][fo] = i;
            }
        }
    }
    return map;
};