/*
instance
2ality – JavaScript and more
http://2ality.com/2014/05/this.html
https://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
https://medium.freecodecamp.org/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81
https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
*/

define(["wa111/User", "app.sendSms"], function(User, sendSms) {

    return async function() {

        var $scope = this;
        this.xmlSpider.loadend = function() {
            if(this.action == "getmodel") {
                with(this.respData) {
                    //console.log(f_ishow, f_depositStatus);
                    $scope.user.status.push(f_ishow);
                    $scope.user.permit.push(f_depositStatus);
                    $scope.user.sms.status = ($scope.user.sms.status == 3) ? 9 : $scope.user.sms.status;
                    $scope.$digest();
                    //$scope.$apply();
                }
            }
        }



        this.user = await new User(this);

        console.log(this.user);


        return

        //this.delUser();
        this.user = await new User(this);
        this.smss = new sendSms(this);
        this.$watch('user', (newVal, oldVal) => {
            if(newVal) { this.user.save() }
        }, true);

    }
});








//sendSms.prototype =
//var c = angular.copy(sendSms.prototype, $scope)
//sendSms.prototype = c
//console.log(c);

//console.log(sendSms);




// this.$watch('user', this.user.save, true);


//this.$watch('user', this.user.save.bind(this), true);
/*
        this.delUser();
        this.$watchCollection('user', (newVal, oldVal) => {
            console.log(newVal);
            if(newVal) { this.user.save() }
        });
    */


//console.log(this.user.save1);





//console.log(this.user.mobile + '');
//console.log(this.user.mobile.toString());
//console.log(this.user.mobile.valueOf());
//console.log(this.user.obj + '');