define(["wa111/User", "app.sendSms"], function(User, sendSms) {

    return async function() {
        var $scope = this;
        this.xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                with(this.respData) {
                    //console.log(f_ishow, f_depositStatus);
                    $scope.user.status.push(f_ishow);
                    $scope.user.permit.push(f_depositStatus);
                    $scope.user.sms.status = ($scope.user.sms.status == 3) ? 9 : $scope.user.sms.status;
                    $scope.putUser();
                }
            }
        }
        //this.delUser()
        this.user = await new User(this);
        this.smss = new sendSms(this);
        console.log(this.user);
        //console.log(this.user.mobile);
        //console.log(this.user.mobile.toString());
        //console.log(this.user.mobile.valueOf());
    }
});


var obj = {
    a: 789,
    toString: () => 1,
    valueOf: () => 2,
    [Symbol.toPrimitive]: Date.prototype[Symbol.toPrimitive]
};


console.log(obj);








/*
instance
2ality – JavaScript and more
http://2ality.com/2014/05/this.html
https://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
https://medium.freecodecamp.org/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81
https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
*/

