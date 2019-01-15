angular.extend:依次将第[ 二个参数及后续的参数的 "第一层"属性 ]（不管是简单属性还是对象）拷贝赋给第一个参数的第一层属性，

即如果是对象，则是引用的是同一个对象，并返回第一个参数对象。

实例一：var r = angular.extend(b, a);将对象a的第一层属性（不管是简单属性还是对象）拷贝赋给对象b的第一层属性，即如果是对象，则是引用的是同一个对象，并返回对象b




var object = angular.extend(object1, object2);
console.log(object1);
console.log(object2);
console.log(object);


