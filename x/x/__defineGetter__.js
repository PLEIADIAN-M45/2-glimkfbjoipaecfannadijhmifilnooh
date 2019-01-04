
var obj = {};

var readCallback = function() {
    console.log('name was read');
}

obj.__defineGetter__('name', readCallback);

console.log(obj.name); // 读取 name 属性后，会调用上面的函数。

var reassignCallback = function(val) { // 新值会作为参数传进来
    console.log('name was assigned again with : ' + val);
};

obj.__defineSetter__('name', reassignCallback);

obj.name = 'name'; // 修改 name 属性后，会调用上面的函数。

var lookupGetFun = obj.__lookupGetter__('name'); // 返回上面我们设置的 Getter函数
console.log(lookupGetFun === readCallback) // 输出 true

var lookupSetFun = obj.__lookupSetter__('name'); // 返回上面我们设置的 Setter函数
console.log(lookupSetFun === reassignCallback) // 输出 true

obj.__proto__.constructor === Object // 因为 obj 的原型式 Object ，因此输出 true

var hasNameProp = obj.hasOwnProperty('name') // 输出 true

obj.isPrototypeOf(Object);

var secondObj = {};
secondObj.__proto__.isPrototypeOf(obj)
// 因为 secondObj 和 obj 是共用一个原型，因此输出 true

var isNameEnumerable = obj.propertyIsEnumerable('name');

get status() {
    return this._status
}

set status(value) {
    //console.log(value);
    this._status = value
    //this.status = value
}




var d = Date.prototype;
d.__defineGetter__("year", function() {
    console.log(this);
    return this.getFullYear();
});
d.__defineSetter__("year", function(y) { this.setFullYear(y); });






function Dog(name) {
    this.name = name;
    return Dog.now();
}

Dog.prototype.run = function() {
    return this.name + ' is running!'
}

Dog.now = function() {
    return Date.now()
}



var c = new Dog("happy")


console.log(c);


var c = new Date()

console.log(c);

console.log(c.getDate());




//user.extends(this)
//console.log(this);
//Object.assign(user, this)
//angular.copy(user, this)
//user = angular.merge(user, this)

//angular.extend(user.__proto__, this.__proto__)

//angular.merge(user.__proto__, User.prototype)

//console.log(this);
//$scope.extends(this, true);
//return this.setUser($scope);
//console.log(user);

//]).then(() => { return this.putUser(this) })

/*


bindProp() {
    console.log(this.__proto__);
}

putUser(user) {
    if (user) {
        Object.assign(user.__proto__, User.prototype);
        return user;
    } else {
        return this;
    }
}
*/


//this._status[Symbol.toPrimitive] = 123;
//console.log(this._status[Symbol.toPrimitive]);

//console.log(this._status);
