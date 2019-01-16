this.symbolList = function() {
    for (var i = 0; i < 500; i++) {
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













/*
let s1 = Symbol('foo');
let s2 = Symbol('bar');

//s1 // Symbol(foo)
//s2 // Symbol(bar)

//s1.toString() // "Symbol(foo)"
//s2.toString() // "Symbol(bar)"

var obj = {
    s1: 123,
    s2: 266
}


console.log(obj);
console.log(obj.foo);
console.log(obj.s1);
*/

let mySymbol = Symbol();

console.log(mySymbol);
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

console.log(a);

/*
// 第二种写法
let a = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
*/