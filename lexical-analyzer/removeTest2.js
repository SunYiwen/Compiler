module.exports = function removeLeftRecursion(productions) {
    let VN = ["stmt-sequence", "program", "statement", "if-stmt", "repeat-stmt", "repeat-stmt", "assign-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop"];
    //let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number"];
    for (let i = 0; i < VN.length; i++) {
        let iProductions = productions.get(VN[i]); // 获取以Ai开头的产生式
        // console.log('iProductions',iProductions);
        // console.log('VN[i]',VN[i]);
        for (let j = 0; j < i; j++) {
            if (iProductions !== undefined) { // 如果以Ai开头的产生式存在
                let iLength = iProductions.length; // 保留增加新增产生式的长度
                for (let k1 = 0; k1 < iLength; k1++) {
                    // console.log('1',iProductions[k1][0]);
                    // console.log('2',VN[j]);
                    if (iProductions[k1][0] === VN[j]) {
                        //console.log('VN[j]', VN[j]);
                        let jProductions = productions.get(VN[j]);
                        if (jProductions !== undefined) {
                            let part = iProductions[k1].slice(1); // 获取产生式除了第一个字符以外的部分
                            iProductions[k1] = [];
                            for (let k2 = 0; k2 < jProductions.length; k2++) {
                                let temp = [...jProductions[k2], ...part]; // 产生新的产生式
                                //console.log('temp', temp);
                                iProductions.push(temp);
                                //console.log('iProductions', iProductions);
                            }
                        }
                    }
                }
            }
        }
        if (iProductions !== undefined) {
            iProductions = iProductions.filter(function (item) {
                return item.length !== 0; // 去除空元素
            });
        }
        productions.set(VN[i], iProductions);
    }
    return productions;
};