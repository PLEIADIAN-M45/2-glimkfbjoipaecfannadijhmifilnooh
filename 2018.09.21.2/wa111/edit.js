define(["app.sendSms"], function(sendSms) {

    function User($scope) {
        $scope.extends(this, true);
        return this.build()
    }

    User.prototype.getUserBasic = function() {
        ['server', 'origin', 'unique', 'channel', 'account', 'operator'].forEach((name) => { this[name] = this.__proto__[name]; });
    };

    User.prototype.getUserModel = function() {
        var m = this.model;
        this.timing = [];
        this.equpmt = {};
        this.birthday = m.birthday;
        this.author = { attr: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
        this.locate = { attr: 'locate', title: m.lblIp, value: m.lblIp };
        this.mobile = { attr: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
        this.idcard = { attr: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
        this.banker = [
            { attr: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
            { attr: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
            { attr: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
            { attr: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
            { attr: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
        ];
    };

    User.prototype.getUserState = function() {
        var m = this.model;
        this.status = [m.ishow.value];
        this.permit = [m.isOpenDeposit.value];

    };

    User.prototype.getUserStore = function() {
        return this.dexie.user.get(this.account).then((d) => {
            this.sequel = d.f_id;
            this.attach = d.f_joindate;
            this.agency = d.f_alagent;
            console.log(this.agency, "+++++++++++++");
            this.black = d.f_blacklist;
            this.peril = d.f_peril;
            this.nickName = d.f_nickName;
            this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
            this.banker = this.banker.filter((a) => { return a.value });
        });
    };

    User.prototype.getPhoneDate = function() {
        return this.ajax({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "type=getPhoneDate&account=" + this.account
        }).then(([d]) => {
            this.mobile.value = d.f_photo;
            this.idcard.value = d.f_idCard;
            this.equpmt.browser = d.f_browser;
            this.equpmt.osInfo = d.f_osInfo;
        });
    };

    User.prototype.getSystemLog = function() {
        return this.ajax({
            url: "/LoadData/AccountManagement/GetSystemLog.ashx",
            method: "POST",
            data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
        }).then((rows) => {
            return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
            });
        });
    };

    User.prototype.build = function() {
        return Promise.all([
            this.getUserBasic(), this.getUserModel(),
            this.getUserState(), this.getPhoneDate(),
            this.getUserStore(), this.getSystemLog()
        ]).then((x) => { return this })
    }




    return async function() {

        this.xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                console.log(this.respData);
            }
        }


        async function abcd() {
            return await new User(this)
        }



        this.user = await new User(this)

        //abcd.call(this)

        //this.user = await new User(this)

        console.log(this.user);



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