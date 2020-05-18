// 消除左递归算法
module.exports = function removeLeftRecursion(productions) {
    let VN = ["program", "stmt-sequence", "statement", "if-stmt", "else-part'",  "repeat-stmt", "assign-stmt", "read-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term", "addop", "factor", "mulop"];
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
        iProductions = productions.get(VN[i]); // 重新获取以Ai开头的产生式
        if (iProductions !== undefined) {
            for (let k = 0; k < iProductions.length; k++) {
                if (iProductions[k][0] === VN[i]) { // 存在左递归现象
                    let newBegin = VN[i] + "'"; // 构建新产生式的左边
                    let newProductions = [];
                    newProductions.push(['ε']); // 表示空元素
                    for (let iproduction of iProductions) {
                        if (iproduction[0] === VN[i]) {
                            //console.log('iproduction', iproduction);
                            let temp = iproduction.slice(1);
                            //console.log('temp1', temp);
                            temp.push(newBegin);
                            //console.log('temp2', temp);
                            newProductions.push(temp);
                            while (iproduction.length !== 0) { // 清空原有数组，作为删除标记
                                iproduction.pop();
                            }
                        } else {
                            iproduction.push(newBegin);
                        }
                    }
                    iProductions = iProductions.filter(function (item) {
                        return item.length !== 0; // 去除空元素
                    });
                    productions.set(VN[i], iProductions);
                    productions.set(newBegin, newProductions);
                    break;
                }
            }
        }
    }
    return productions;
};