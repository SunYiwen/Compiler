# Compiler

一个针对tiny语法进行词法分析和LL(1)的语法分析器

- index对测试文本逐行读取进行词法分析，将词法分析结果以文件的形式保存在tokens.txt文件中
- makeProduction对文法的产生式进行处理，利用removeLeftRecursion来消除文法的左递归，利用getFirstCollection来获取每一个非终结符号的First集合
- getFollowCollection获取每一个非终结符号的Follow集合 
- makePredictiveAnalysisTable来构建预测分析表
- parse利用预测分析表判断语法是否正确
- index.html实现页面可视化效果

***

## 使用

1. 全局安装json-serve

2. 针对生成好的table.json(预测分析表)，productionsTest.json(产生式集合)启动json-serve服务

   ```shell
   json-server --watch --port 3001  table.json
   json-server --watch --port 3002 productionsTest.json
   ```