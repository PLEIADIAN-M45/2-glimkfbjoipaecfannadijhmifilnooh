// 合并对象
function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

// 测试
var a = { a: 1, b: 2 };
var b = { a: 2, b: 3, c: 4 };

var c = extend(a, b);
console.log(c);




//用第三方库， 如： underscore、 lodash等。

__ = require('lodash')
a = { 'a': 1 };
b = { 'b': 1 };
c = __.extend(a, b)




//jquery有一个继承方法， 可以直接用

a = { 'a': 1 };
b = { 'b': 1 };
c = $.extend(a, b)
或
c = $.extend({}, a, b)