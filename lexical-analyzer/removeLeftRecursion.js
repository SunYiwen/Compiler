module.exports = function removeLeftRecursion(productions) {
    let VT = ["program", "stmt-sequence",  "statement", "if-stmt", "repeat-stmt", "repeat-stmt", "assign-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term'", "addop", "term", "factor'", "mulop", "factor"];
    let VN = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number"];
    let VNSet = new Set(VN);
    for (let i = 0; i < VT.length ;i++) {
        console.log('VT[i]', VT[i]);
        for (let j = 0; j < i; j++) {
            let iProductions = productions.get(VT[i]);
            for (let pro1 of iProductions) {
                let Aj = pro1[0];
                let jProduction = productions.get(Aj);
                for (let pro2 of jProduction) {
                    if (VNSet.has(pro2[0])) {
                        pro1[0] = pro2[0];
                    }
                }
            }
            productions.set(VT[i], iProductions);
        }
        let iProductions = productions.get(VT[i]);
        for (let item1 of iProductions) {
            if (item1[0] === VT[i]) { //存在直接左递归的形式
                console.log('VT[i]hh', VT[i]);
                let newProduction = [];
                for (let i = 0; i < iProductions.length; i++) {
                    if (iProductions[i][0] !== VT[i]) {
                        iProductions[i].push(VT[i] + "'"); //构建新的产生式
                    } else {
                        let temp = iProductions[i].slice(1);
                        temp.push(VT[i] + "'");
                        newProduction.push(temp);
                    }
                }
                productions.set(VT[i]+"'", newProduction);
                productions.set(VT[i], iProductions);
                console.log('ip', iProductions);
                break;
            }
        }
    }
    return productions;
}