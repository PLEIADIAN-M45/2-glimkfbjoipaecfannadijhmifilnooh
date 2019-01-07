/*
merge

最前面的屬性會被合併 後面所有的物件


*/



//var object = angular.merge({}, object1, object2);
//var object = angular.merge(object1, object2);
//var object = angular.merge(object1, Object.__proto__); XXX
//var object = angular.merge(object1, Object.prototype); xxx
//var object = angular.merge(object1, Object.constructor); xxx

var object1 = { a: 6 }
var object2 = { c: 1 }
var obj = angular.copy(Object);
console.log(obj);

var object1 = { a: 6 }
var object2 = { c: 1 }

var a = angular.copy(Object)


var object = angular.extend(object1, Object.create(Object));

var a = angular.copy(Object)

angular.copy(object1, a);

console.log(object1);
console.log(object.assign);



console.log(object2);
console.log(object);
console.log(object.assign);



console.log(object1);
console.log(object1.assign);
console.log(object.assign);


/*
console.log(object2);
console.log(object);
*/