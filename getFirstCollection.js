let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'", "cmp-exp'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";"];
let VNSet = new Set(VN);
let VTSet = new Set(VT);

module.exports = function getFirstCollection(productions) {
    let First = new Map();
    for (let i = 0; i < VN.length; i++) {
        First.set(VN[i], [...getVNFirst(VN[i], productions)]);
    }
    for (let i = 0; i < VT.length; i++) {
        First.set(VT[i], [...getVNFirst(VT[i], productions)]);
    }
    return First;
};
function getVNFirst(VN, productions) {
    if (VTSet.has(VN)) {
        return new Set().add(VN);
    }
    let VNProductions = productions.get(VN);
    let First = new Set(); //保证set集合中的元素不重复
    let flag = false;
    if (VNProductions !== undefined) {
        for (let i = 0; i < VNProductions.length; i++) {
            if (VTSet.has(VNProductions[i][0])) {
                First.add(VNProductions[i][0]); // 如果第一个字符就是终结符号就加入First集合
            } else {
                flag = true;
                let begin = 0;
                let tempSet = getVNFirst(VNProductions[i][begin], productions);
                while ((begin < VNProductions[i].length) && tempSet.has('ε')) {
                    for (let item of tempSet.keys()) {
                        if (item !== 'ε') {
                            First.add(item);
                        }
                    }
                    tempSet = getVNFirst(VNProductions[i][++begin], productions);
                }
                if (begin === VNProductions[i].length) { //最后一个还满足while条件,最后一个字符的First集合中含有空元素
                    First.add('ε');
                }
                if (begin < VNProductions[i].length ) { // 当前字符已经不含有空元素了
                    for (let item of tempSet.keys()) {
                        First.add(item);
                    }
                }
            }
        }
        if (!flag) {
            return First;
        }
        return First;
    }
}