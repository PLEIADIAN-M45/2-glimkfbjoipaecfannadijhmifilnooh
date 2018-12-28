this.symbolList = function() {
    for(var i = 0; i < 500; i++) {
        console.log(String.fromCharCode(i));
    }
    return
    this.symbol = {
        slash: 47,
        dash: 95,
        comma: 44,
        hyphen: 45,
        colon: 58, //:
        semicolon: 59, //;
    }
    Object.entries(this.symbol)
        .map(([name, val]) => {
            this.symbol[name] = String.fromCharCode(val)
        })
}
/*
’   Apostrophe  撇號
（）   Bracket (英式) / Parentheses (美式)    括號
 ：   Colon  冒號
 ，   Comma  逗號
 －   Dash   破折號
 …   Ellipsis   省略號
 ！   Exclamation Mark (英式) / Point (美式) 感嘆號
 .   Full Stop (英式) / Period (美式)   句號
 《　》     Guillemets 書名號
 –   Hyphen 連字號
？    Question Mark  問號
 ＂＂  Quotation Mark 引號
；    Semicolon  分號
/    Slash  斜線
*/


/*
console.log(0xFFFFFFFF);
console.log(0x2F);

console.log(String.fromCharCode(189, 43, 190, 61));
console.log(String.fromCharCode(47));
*/