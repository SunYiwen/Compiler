let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop", "stmt-sequence'", "simple-exp'", "term'"];
let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number", "ε", ";"];

// let VN = ['A', "B", 'C'];
// let VT = ['a', 'b', 'c', 'ε'];
let VNSet = new Set(VN);
let VTSet = new Set(VT);

module.exports = function getFirstCollection(productions) {
    let First = new Map();
    for (let i = 0; i < VN.length; i++) {
        First.set(VN[i], [...getVNFirst(VN[i], productions)]);
    }

    return First;
};
// let productions = new Map();
// productions.set('A',[["a"], ['ε']]);
// productions.set("B",[['b'], ['ε']]);
// productions.set('C',[['A', "B", 'c']]);
// productions.set("T'",[['*', 'F', "T'"], ['ε']]);
// productions.set('F',[['(', 'E', ')'], ['a']]);

// console.log(getFirstCollection(productions));
function getVNFirst(VN, productions) {
    if (VTSet.has(VN)) {
        return new Set().add(VN);
    }
    let VNProductions = productions.get(VN);
    // console.log('VNProductions', VNProductions);
    let First = new Set(); //保证set集合中的元素不重复
    let flag = false;
    if (VNProductions !== undefined) {
        for (let i = 0; i < VNProductions.length; i++) {
            if (VTSet.has(VNProductions[i][0])) {
                First.add(VNProductions[i][0]); // 如果第一个字符就是终结符号就加入First集合
                //console.log('First', First);
            } else {
                flag = true;
                let begin = 0;
                let tempSet = getVNFirst(VNProductions[i][begin], productions);
                while ((begin < VNProductions[i].length) && tempSet.has('ε')) {
                    //console.log('tempSet', tempSet);
                    for (let item of tempSet.keys()) {
                        if (item !== 'ε') {
                            First.add(item);
                        }
                    }
                    tempSet = getVNFirst(VNProductions[i][++begin], productions);
                }
                 //console.log('begin', begin);
                // console.log('length', VNProductions[i].length);
                 //console.log('tempSet2', tempSet);
                // console.log('First', First);
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