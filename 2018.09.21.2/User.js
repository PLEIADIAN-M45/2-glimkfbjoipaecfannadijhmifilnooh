.factory('User', function(Organisation) {

    /**
     * Constructor, with class name
     */
    function User(firstName, lastName, role, organisation) {
        // Public properties, assigned to the instance ('this')
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.organisation = organisation;
    }

    /**
     * Public method, assigned to prototype
     */
    User.prototype.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
    };

    /**
     * Private property
     */
    var possibleRoles = ['admin', 'editor', 'guest'];

    /**
     * Private function
     */
    function checkRole(role) {
        return possibleRoles.indexOf(role) !== -1;
    }

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    User.possibleRoles = angular.copy(possibleRoles);

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    User.build = function(data) {
        if (!checkRole(data.role)) {
            return;
        }
        return new User(
            data.first_name,
            data.last_name,
            data.role,
            Organisation.build(data.organisation) // another model
        );
    };

    /**
     * Return the constructor function
     */
    return User;
})


/**
 * One-way reference from subclass to superclass (instance)
 * Most of the time this is what you want. It should be done
 * before adding other methods to Subclass.
 */
Subclass.prototype = new Superclass();

/**
 * Two-way reference
 * Superclass will also get any Subclass methods added later.
 */
Subclass.prototype = Superclass.prototype;

/**
 * Cloning behavior
 * This does not setup a reference, so instanceof will not work.
 */
angular.extend(Subclass.prototype, Superclass.prototype);

/**
 * Enhancing a single instance
 * This could be used to implement the decorator pattern.
 */
angular.extend(subclassInstance, SuperClass.prototype);




function getSystemLog() {
    return this.ajax({
        url: "/LoadData/AccountManagement/GetSystemLog.ashx",
        method: "POST",
        data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
    }).then((rows) => {
        return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
            if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
        });
    });
}

function getPhoneDate() {
    return this.ajax({
        url: "/LoadData/AccountManagement/GetMemberList.ashx",
        data: "type=getPhoneDate&account=" + this.account
    }).then(([d]) => {
        this.mobile.value = d.f_photo;
        this.idcard.value = d.f_idCard;
        this.equpmt.browser = d.f_browser;
        this.equpmt.osInfo = d.f_osInfo;
        return this;
    });
}

function getUserModel(m) {
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
    return this;
}

function getUserState(m) {
    this.status = [m.ishow.value];
    this.permit = [m.isOpenDeposit.value];
    this.sms = {
        status: m.ishow.value
    }
    return this;
}

function getUserBasic(s) {
    this.host = s.host;
    this.origin = s.origin;
    this.unique = s.unique;
    this.channel = s.channel;
    this.account = s.account;
    this.operator = s.operator;
    return this;
}

function getUserStore() {
    return this.dexie.user.get(this.account).then((d) => {
        this.sequel = d.f_id;
        this.attach = d.f_joindate;
        this.agency = d.f_alagent;
        console.log(this.agency);
        this.black = d.f_blacklist;
        this.peril = d.f_peril;
        this.nickName = d.f_nickName;
        this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
        this.banker = this.banker.filter((a) => { return a.value });
        return this;
    });
}

function setUser() {
    this.user = Object.create(this);

    console.log(this.user);
    return
    return Promise.all([
        getUserBasic.call(this.user, this),
        getUserModel.call(this.user, this.model),
        getUserState.call(this.user, this.model),
        getUserStore.call(this.user, this),
        getPhoneDate.call(this.user, this),
        getSystemLog.call(this.user, this)
    ]).then(this.putUser.bind(this));
}




/*
       (async () => {
           with(this) {
               await Promise.all([
                   getUserBasic(),
                   getUserModel(model),
                   getUserState(model),
                   getPhoneDate(),
                   getUserStore(),
                   getSystemLog(),
               ]).then((x) => {
                   console.log(999);
                   return
               })
           }
       }());
       -*/


/*
User.prototype.setUser = function() {
    return Promise.all([
        this.getUserBasic()
    ])        
    return Promise.all([
        getUserBasic.call(this.user, this),
        getUserModel.call(this.user, this.model),
        getUserState.call(this.user, this.model),
        getUserStore.call(this.user, this),
        getPhoneDate.call(this.user, this),
        getSystemLog.call(this.user, this)
    ]).then(this.putUser.bind(this));
    

};
*/
/*return new Promise((resolve, reject) => {
           setTimeout(function() {
               return resolve(6265)
           }, 2000)
       });
       */


/* User.get = function() {
        console.log(this.a);
    };
*/



return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('doSomething1 end')

        resolve(this)
    }, 3000)
})


this.setUser = function() {
    var user = new User(this)
    return Promise.all([
        user.getUserBasic(),
        user.getUserModel(),
        user.getUserState(),
        user.getPhoneDate(),
        user.getUserStore(),
        user.getSystemLog(),
    ]).then((x) => {
        console.log(999);
        return user
    })
}