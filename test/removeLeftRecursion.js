module.exports = function removeLeftRecursion(productions) {
    // let VN = ["program", "stmt-sequence", "statement", "if-stmt", "repeat-stmt", "repeat-stmt", "assign-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop"];
    // let VT = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number"];
    let VN = ['B', 'A', 'S'];
    let VNSet = new Set(VN);
    let VT = ['a', 'b', 'c'];
    let VTSet = new Set(VT); // 终结符号集合
    for (let i = 0; i < VN.length ;i++) {
        for (let j = 0; j < i; j++) {
            let iProductions = productions.get(VN[i]);
           // console.log('iProductions',iProductions);
            if (iProductions !== 'undefined') {
                for (let pro1 of iProductions) {
                    let Aj = pro1[0];
                    if (VNSet.has(Aj)) {
                        let jProduction = productions.get(Aj);
                       // console.log('jProductions',jProduction);
                        if (jProduction !== 'undefined') {
                            for (let pro2 of jProduction) {
                                if (VTSet.has(pro2[0])) {
                                    pro1[0] = pro2[0];
                                }
                            }
                        }
                    }
                }
            }
            productions.set(VN[i], iProductions);
        }
        let iProductions = productions.get(VN[i]);
        let deleteLocation = -1;
        if (iProductions !== 'undefined') {
            for (let item1 of iProductions) {
                if (item1[0] === VN[i]) { //存在直接左递归的形式
                    let newProduction = [];
                    for (let k = 0; k < iProductions.length; k++) {
                        if (iProductions[k][0] !== VN[i]) {
                            iProductions[k].push(VN[i] + "'");
                            // console.log('NEW',iProductions[k]); //修改原有产生式
                        } else {
                            let temp = iProductions[k].slice(1);// slice返回新的数组
                            temp.push(VN[i] + "'");
                            newProduction.push(temp);
                            temp = ['$'];
                            newProduction.push(temp);
                            deleteLocation = k;
                        }
                    }
                    if (deleteLocation !== -1) {
                        iProductions.splice(deleteLocation, 1);
                    }
                    productions.set(VN[i]+"'", newProduction);
                    productions.set(VN[i], iProductions);
                    break;
                }
            }
        }
    }
    return productions;
};