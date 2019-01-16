/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive


js隐式装箱-ToPrimitive
https://sinaad.github.io/xfe/2016/04/15/ToPrimitive/
*/

/*

The Symbol.toPrimitive is a symbol that specifies a function valued property that is called to convert an object to a corresponding primitive value.
Symbol.toPrimitive是一个符号，它指定一个函数值属性，该属性被调用以将对象转换为相应的原始值。



借助Symbol.toPrimitive属性（用作函数值），可以将对象转换为原始值。 使用字符串参数hint调用该函数，该参数指定结果原语值的首选类型。 提示参数可以是“数字”，“字符串”和“默认”之一

ToPrimitive(input [, PreferredType])

1.如果没有传入PreferredType参数，则让hint的值为'default'
2.否则，如果PreferredType值为String，则让hint的值为'string'
3.否则，如果PreferredType值为Number，则让hint的值为'number'
4.如果input对象有@@toPrimitive方法，则让exoticToPrim的值为这个方        法，否则让exoticToPrim的值为undefined
5.如果exoticToPrim的值不为undefined，则
	a.让result的值为调用exoticToPrim后得到的值
	b.如果result是原值，则返回
	c.抛出TypeError错误
6.否则，如果hint的值为'default'，则把hint的值重新赋为'number'
7.返回 OrdinaryToPrimitive(input,hint)

OrdinaryToPrimitive(input,hint)

1.如果hint的值为'string',则
	a.调用input对象的toString()方法，如果值是原值则返回
	b.否则，调用input对象的valueOf()方法，如果值是原值则返回
	c.否则，抛出TypeError错误
2.如果hint的值为'number',则
	a.调用input对象的valueOf()方法，如果值是原值则返回
	b.否则，调用input对象的toString()方法，如果值是原值则返回
	c.否则，抛出TypeError错误

*/

var object1 = {
    [Symbol.toPrimitive](hint) {
        console.log(hint);
        if (hint == 'number') {
            return '42';
        }
        if (hint == 'default') {
            return '625';
        }
        if (hint == 'string') {
            return '975';
        }
        return null;
    }
};

console.log(object1 + "dwwdw");


console.log(+object1);
// expected output: 42


console.log(object1);
// expected output: 42


var object2 = {
    [Symbol.toPrimitive]: function(hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'hello world!';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
};

var n = object2;

console.log(n);


String(object2)

/******************************************************/


// An object without Symbol.toPrimitive property.
var obj1 = {};
console.log(+obj1); // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ''); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == 'number') {
            return 10;
        }
        if (hint == 'string') {
            return 'hello';
        }
        return true;
    }
};
console.log(+obj2); // 10        -- hint is "number"
console.log(`${obj2}`); // "hello"   -- hint is "string"
console.log(obj2 + ''); // "true"    -- hint is "default"

/*****************************************************************/


/*

Date默认定义的方法是Date.prototype[Symbol.toPrimitive]
Symbol默认定义的方法是Symbol.prototype[Symbol.toPrimitive]
用户可以重写上面的两种方法或者给其他对象新定义求原值的方法，用如下方式
*/

Array.prototype[Symbol.toPrimitive] = function(hint) {
    switch (hint) {
        case 'number':
            return 123;
        case 'string':
            return 'hello world!';
        case 'default':
            return 'default';
        default:
            throw new Error();
    }
}


Array.prototype[Symbol.toPrimitive] = function(hint) {
    switch (hint) {
        case 'number':
            return 123;
        case 'string':
            return 'hello world!';
        case 'default':
            return 'default';
        default:
            throw new Error();
    }
}

var arr = [];
arr + 2; //"default2"
arr * 2; //"246"
String(arr); //"hello world!"




var obj2 = {
    toString: () => 1,
    valueOf: () => 2,
    [Symbol.toPrimitive]: () => 2111
};

console.log(obj2);


var obj = {
    toString: () => 1,
    valueOf: () => 2,
    [Symbol.toPrimitive]: Date.prototype[Symbol.toPrimitive]
};

console.log(obj + ''); // 1

console.log(obj); // 1






function MyNumberType(n) {
    this.number = n;
}

MyNumberType.prototype.valueOf = function() {
    return this.number;
};

const object1 = new MyNumberType(4);

console.log(object1 + 3);
// expected output: 7



MyNumberType.prototype.valueOf = function() {
    return customPrimitiveValue;
};


function MyNumberType(n) {
    this.number = n;
}

MyNumberType.prototype.valueOf = function() {
    return this.number;
};

var myObj = new MyNumberType(4);
myObj + 3; // 7



/**************************************************/





function Dog(name) {
    this.name = name;
}

dog1 = new Dog('Gabby');

Dog.prototype.toString = function dogToString() {
    return this.name;
}

console.log(dog1.toString());
// expected output: "Gabby"



/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
*/

function Mobile(name) {
    this.callee = "mobile";
    this.title = "6556******41";
    this.value = "655665146541";
}


Mobile.prototype.toString = function() {
    return this.title;
}


Mobile.prototype.valueOf = function() {
    return this.value;
};



var mobile = new Mobile('Gabby');

console.log("86" + mobile);