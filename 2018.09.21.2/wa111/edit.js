define(["wa111/User"], function(User) {

    return async function() {

        this.xmlSpider.loadend = function() {
            if(this.action == "getmodel") { console.log(this.respData); }
        }


        this.user = await new User(this);





        //this.sendSms

        // = new sendSms(this);

        console.log(this.user);


        //new User()

        //await this.setUser.call(new User(this))

        //this.user = await this.getUser() || await new User(this)

        //this.putUser()



        return;

        console.log(this.user.server);
        console.log(this.user.agency);
        console.log(this.user.mobile.value);


        return;




        //var c = new User(this);
        //console.log(c);
        //console.log(c.server);

        //merge //copy

        //this.extends(User.prototype, true);

        //angular.extend(this);

        //Object.assign(User.prototype, this)

        //var user = new User(this);
        //this.user = await this.getUser() || new User()

        //this.user = User.get()

        //new User();

        // console.log("000", this.user);

        //console.log(this.user.timing[0]);

        /*
        setTimeout(function() {
            console.log(this.user.idcard);
        }.bind(this), 2000)
        */




        //User.getUser()

        //var c = this.user



        //this.putUser()


        /*
        this.user =
            //await this.getUser() ||
            await setUser.call(this);
            */

        //console.log(this.user);





        /*
        this.ctrl.btnSetPermit
            .toggle(this.user.status[0] == 3)
            .click((e) => {
                this.ctrl.btnSetPermit.toggle();
                this.ctrl.isOpenDeposit.val(1)
                this.ctrl.btnSaveInfo.click();
            });
            */



        //this.sendSms = new sendSms(this);
        //console.log(this.sendSms);


        this.$apply();
    }
});




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



/*
instance

2ality – JavaScript and more

http://2ality.com/2014/05/this.html
https://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
https://medium.freecodecamp.org/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81
https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc

*/



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