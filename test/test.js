let tokenizer = require('../tokenizer');
let input = '{Test Repeat}';
let {tokens, wrongFlag, wrongLocation} = tokenizer(input,1);
console.log('tokens',tokens);
console.log('flag',wrongFlag);
if (wrongFlag) {
    console.log('wrongLocation', wrongLocation);
}