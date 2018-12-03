define(['apiFunction'], function(apiFunction) {

    function sendSms() {

        return {
            //status: this.user.mobile.value,
            status: this.user.status[0],

            send: function() {

                this.sendMessage({ command: 'apiFunctions.sendsms', params: this.user })
                    .then((res) => {

                        console.log(res);


                        //this.status = res.status;
                        //localStorage[res.mobile.value] = res.status;
                        //this.$apply();
                    });
            }.bind(this)
        }
    }

    return async function() {

        this.setUser = function() {
            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };
            return Promise.all([
                apiFunction.getUserModel.call(this.user),
                apiFunction.getPhoneDate.call(this.user),
                apiFunction.getSystemLog.call(this.user),
                apiFunction.getUserStore.call(this.user)
            ]).then(this.putUser.bind(this));
        };


        this.user = await this.getUser() || await this.setUser(this);

        //this.user = await this.setUser(this);


        //console.log(this.user.status);

        this.sendsms = sendSms.apply(this);
        this.$apply();

        //console.log(this.user);


        /*this.$watch('user', function(nv, ov) {
            console.log(nv);
        }, true)*/

    }
});




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