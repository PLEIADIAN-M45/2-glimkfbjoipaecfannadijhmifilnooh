define([], function() {

    //console.log(a);
    //console.log('sendsms');

    return class SendSms {
        constructor(user) {
            this.status = localStorage[user.mobile] || user.status[0];
            this.status = 0;
            this.mobile = user.mobile.value;
            this.channel = user.channel;
            this.account = user.account;
            this.operator = user.operator;
            this.sendMessage=

        }

        send() {

            console.log(12);

            evo.apiFunctions({ command: 'apiFunctions:sendsms:motosms:channel', params: this }).then(Assign).then(Dialog);

        }
    }


    //return this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique })





    console.log($scope.sendsms);

    // return send
    /*$scope.sendsms = function() {

    }*/


})






/*

        ///this.sendSms.status = sessionStorage[this.user.mobile.value] || this.user.status[0];
        //this.sendsms = sendSms.apply(this);
        //console.log(this.sendSms.status);
        //console.log(this.user);
function sendSms() {
    //console.log(this);
    //if (this.user.status[0] == 3) { sessionStorage[this.user.mobile.value] = 3 }
    return {
        //status: sessionStorage[this.user.mobile.value],
        send: function() {

            this.user.sms_status = false;
            //console.log(this);
            //this.status = false;
            this.sendMessage({ command: 'apiFunctions.sendsms', params: this.user })
                .then((res) => {
                    console.log(res.status);
                    this.user.sms_status = res.status;
                    //this.status = res.status;
                    this.dialog(res);
                    this.$apply();
                });
        }.bind(this)
    }
}
*/
//console.log(res);

//|| this.user.status[0]
//this.status = res.status;
//localStorage[res.mobile.value] = res.status;
//this.$apply();


/*this.$watch('user', function(nv, ov) {
    console.log(nv);
}, true)*/


//console.log(this.sendsms);

//new apiFunction.sendSms(this)

//

//console.log(this.user);

//console.log(this.ctrl);


//this.sendsms = new sendSms(this);


/*
              console.log(this);
              console.log(this.sendMessage);
              console.log(this.user);
              */


/*
  //sessionStorage[this.user.mobile.value] = this.user.status[0];
        // if ($scope.user.status[0] == 3 && ) { sessionStorage[$scope.user.mobile.value] = 3 } else {            return;        }
        //console.log(this);
        //this.user.status[0],

this.$watch('user.status', function(newValue, oldValue) {
    console.log(oldValue);
    console.log(newValue);
});
*/


/*

        //this.sendsms = new sendSms(this);

    var obj = {};
    Object.defineProperties(obj, {
        newDataProperty: {
            value: 101,
            writable: true,
            enumerable: true,
            configurable: true
        },
        newAccessorProperty: {
            set: function(x) {
                document.write("in property set accessor" + newLine);
                this.newaccpropvalue = x;
            },
            get: function() {
                document.write("in property get accessor" + newLine);
                return this.newaccpropvalue;
            },
            enumerable: true,
            configurable: true
        }
    });



    var sendsms = {};
    Object.defineProperties(sendsms, {
        newDataProperty: {
            value: 101,
            writable: true,
            enumerable: true,
            configurable: true
        },
        newAccessorProperty: {
            set: function(x) {
                document.write("in property set accessor" + newLine);
                this.newaccpropvalue = x;
            },
            get: function() {
                document.write("in property get accessor" + newLine);
                return this.newaccpropvalue;
            },
            enumerable: true,
            configurable: true
        }
    });


console.log(user.mobile.value);

function Dialog({ status, message, mobile }) {
    $scope.mdcDialog = {
        "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
        "0": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: mobile, description: "" },
        "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: message, description: "" }
    } [status];
    if(!$scope.$$phase) { $scope.$apply(); }
    var dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
    dialog.listen("MDCDialog:accept", function() {});
    dialog.listen("MDCDialog:cancel", function() {});
    dialog.show();
};

function Assign(res) {
    //console.log(res);
    $scope.sendsms.status = res.status;
    localStorage[res.mobile] = res.status;
    return res;
}



this.status = localStorage[user.mobile.value] || user.status[0];
this.mobile = user.mobile.value;
this.status = 0;
this.mobile = user.mobile.value;
this.channel = user.channel;
this.account = user.account;
this.operator = user.operator;
*/


//.bind($scope)


//this.$apply();
//.send()
//new SendSms(this);


///.then(Assign).then(Dialog);
// console.log(this.mobile);

/*
function Dialog({ status, message, mobile }) {
    $scope.mdcDialog = {
        "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
        "0": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: mobile, description: "" },
        "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: message, description: "" }
    } [status];
    if(!$scope.$$phase) { $scope.$apply(); }
    var dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
    dialog.listen("MDCDialog:accept", function() {});
    dialog.listen("MDCDialog:cancel", function() {});
    dialog.show();
};

function Assign(res) {
    //console.log(res);
    $scope.sendsms.status = res.status;
    localStorage[res.mobile] = res.status;
    return res;
}

function SendSms({ channel, account, operator, status, mobile }) {
    //console.log(status, mobile);
    this.status = localStorage[mobile] || status[0];
    this.mobile = mobile.value;
    Object.assign(this, { channel, account, operator });
}

SendSms.prototype.send = function() {
    this.status = 9;
    evo.apiFunctions({ command: 'apiFunctions:sendsms:motosms:channel', params: this }).then(Assign).then(Dialog);
}

return SendSms;*/