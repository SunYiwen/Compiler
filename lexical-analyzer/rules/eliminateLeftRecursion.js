let VT = ["program", "stmt-sequence", "stmt'", "statement", "if-stmt", "else-part'", "repeat-stmt",
"repeat-stmt", "assign-stmt", "write-stmt", "exp", "comparison-op", "simple-exp", "term'", "addop", "term", "factor'", "mulop", "factor"];
let VTSet = new Set(VT);
let VN = ["if", "then", "end", "else", "repeat", "until", "identifier", ":=", "read", "write", "<", "=", "+", "-", "*", "/", "(", ")", "number"];
let VNSet = new Set(VN);