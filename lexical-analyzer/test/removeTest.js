module.exports = function removeLeftRecursion(productions) {
    let VN = ["program", "stmt-sequence", "statement", "if-stmt", "repeat-stmt", "repeat-stmt", "assign-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop"];
    let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number"];
    let VNSet = new Set(VN);
    //let VT = ['a', 'b', 'c'];
    let VTSet = new Set(VT);
    for (let i = 0; i < VN.length; i++) {
        let iProductions = productions.get(VN[i]); // 获取以Ai开头的产生式
        let iLength = iProductions.length;
        for (let j = 0; j < i; j++) {
            if (iProductions !== undefined) {  // 存在产生式的情况
                for (let k1 = 0; k1 < iLength; k1++) {
                    let Aj = iProductions[k1][0]; // 获取以Ai开头的产生式的第一个元素
                    console.log('Aj',Aj);
                    let jProductions = productions.get(Aj); // 获取Aj的产生式
                    console.log('jProductions', jProductions);
                    if (jProductions !== undefined) {
                        let part = iProductions[k1].slice(1); // 截取数组除第一个元素的所有元素
                        console.log('part',part);
                        iProductions[k1] = []; // 将原来的产生式用空数组替换代表删除
                        for (let k2 = 0; k2 < jProductions.length; k2++) {
                            console.log('jP[k2]',jProductions[k2]);
                             let temp = [...jProductions[k2], ...part];
                             console.log('temp', temp);
                             iProductions.push(temp);
                             console.log('iProductions', iProductions);
                        }
                        productions.set(VN[i], iProductions);
                        console.log('hh',productions.get(VN[i]));
                    }
                }
            }
        }
    }
    return productions;
};