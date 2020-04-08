const getToken = require('./getToken');
let{tokens,flag} = getToken('read(id);');
 console.log(tokens);
 console.log(flag);