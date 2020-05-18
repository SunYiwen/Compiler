# Compiler

一个针对tiny语法进行词法分析和LL(1)的语法分析器

- index.js  对测试文本逐行读取进行词法分析，将词法分析结果以文件的形式保存在tokens.txt文件中
- makeProduction.js对文法的产生式进行处理，利用removeLeftRecursion.js来消除文法的左递归，利用getFirstCollection.js来获取每一个非终结符号的First集合...
- getFollowCollection.js 获取每一个非终结符号的Follow集合 （未完待续。。。）

