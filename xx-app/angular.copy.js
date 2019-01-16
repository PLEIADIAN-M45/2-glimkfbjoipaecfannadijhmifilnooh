/*
深拷貝

angular.copy(source, [destination]);

這個方法會使obj2 變成obj1, 而原本obj2的屬性會消失

這個方法會使obj3 的constructor 增加obj1的屬性,
//而原本obj2的屬性會消失

拷貝後 對等的屬性會消失
*/


var obj1 = {
    a: 6,
    hello: function() {}
}


var obj2 = {
    stop: true
}

//angular.copy(obj1, obj2);

function obj3() {
    this.butt = 66
}

obj3.prototype.fuck = 666

angular.copy(obj1, obj3.prototype);


var c = new obj3()
console.log(c);
console.log(c.butt);
console.log(c.a);
console.log(c.fuck);











console.log(obj3);
//console.log(obj3.a);

console.log(obj3.prototype.a);
console.log(obj3.__proto__.a);
console.log(obj3.constructor.a);