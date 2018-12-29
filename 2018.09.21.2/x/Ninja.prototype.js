
/*
var obj = {
    a: 789,
    toString: () => 1,
    valueOf: () => 2,
    [Symbol.toPrimitive]: Date.prototype[Symbol.toPrimitive]

    //[Symbol.toPrimitive]: Date.prototype[Symbol.toPrimitive]
};
console.log(obj); // 1
console.log(obj.a);
console.log(obj.valueOf());

*/



        // = new sendSms(this);




/*
      this.setPermit = function(e) {
          //e.currentTarget.hide();
          this.setPermit.show = false;
          this.ctrl.isOpenDeposit.val(1)
          this.ctrl.btnSaveInfo.click();
      }
      */

/*
this.sendSms = function(e) {
    e.currentTarget.hide();
    console.log(this.user);
}
*/





//this.setPermit.show = (this.user.status[0] == 3 && this.user.status[1] == undefined);
//this.sendSms.show = (this.user.sms.status == 3 || this.user.sms.status == 401);
//console.log(this.setPermit);





function Person(name) {
    this.name = name;
    this.sayName = function() {
        return "Hi, I'm " + this.name;
    };
}
var adam = new Person('Adam');

function Ninja(name, weapon) {
    Person.call(this, name);
    this.weapon = weapon;
}
Ninja.prototype = Object.create(Person.prototype);
Ninja.prototype.constructor = Ninja;









//this.extends(sendSms.prototype, true)
//sendSms.prototype = Object.assign(sendSms.prototype, this)

//.bind(this.user);
//this.sendSms = new sendSms(this);
//new sendSms(this);

/*
function sendSms() {
    console.log(this);
    this.
}

sendSms.bind(this)

sendSms.a = 6

sendSms.b = 6212

sendSms.send = function() {
    console.log(this);
    console.log(this.b);
}
*/




//console.log(sendSms);
//console.log(sendSms.a);


//console.log(window.btnSetPermit);
/*this.btnSetPermit = $('#btnSetPermit')
this.btnSetPermit.hide()
console.log(this.btnSetPermit);*/


//setTimeout(function() {}, 3000)


/*
   return function() {
       return new Promise(function(resolve, reject) {
           console.log('doSomething1 end')
           setTimeout(function() {}, 3000)
           resolve(1)
       })
   }
   */



/*
//console.log(this.smss);
console.log(this.user);
console.log(this.smss);
*/


//console.log(this);
//console.log(12, 33);

/*

        return

        function Scope() {};
        Scope.prototype = this;
this.$scope = $scope;
Object.assign(this.__proto__, $scope.user)
//this.user
return
*/







//console.log(class.prototype);
//console.log(this);
//sendSms.prototype = Object.create(this);
//console.log(this);
//console.log(this.sendMessage);
//return
//console.log(this.$apply);


/*
createSession() {
    if(!sessionStorage[this.mobile] && this.status == 0) { sessionStorage[this.mobile] = this.status; }
    return sessionStorage[this.mobile];
}*/

/*
console.log(sendSms);
console.log(sendSms.__proto__);
console.log(sendSms.prototype);
*/
//sendSms.prototype//


//this.user = await setUser.call(this);
//this.sendSms.mdcDialog.show();











//this.mobile = Object.create(null);
//this.mobile.value = 'static';

/*Object.defineProperty({}, "mobile", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static"
});*/
/*get mobile() {
    return "982598292912859"
}
*/





/*
     console.log(m);
     this.sendSms = (function() {
         console.log(m.ishow.value);
     }());
     */


/*
class abc {
    constructor() {
        this.a = 1213
    }
    setUser() {
        console.log(this);
    }
}



class xyz extends abc {
    constructor() {
        super();
        this.bv = 32434
    }
    getUserStore() {
        console.log(this);

    }
}




var bc = new xyz()
bc.setUser()
bc.getUserStore()
*/




//$("#btnSetPermit").click(setPermit.bind(this))







/*

/*enumerable: false,
configurable: false,
writable: true,*/
//value: "static"
/*value: {
    a: 655,
    b: 929
}*/

//this.extends(User.prototype, true);
//angular.extend(this);
//Object.assign(User.prototype, this)

/*
setTimeout(function() {
    console.log(this.user.idcard);
}.bind(this), 2000)
*/



