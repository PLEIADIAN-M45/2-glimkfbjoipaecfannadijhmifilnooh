define(['material'], function(mdc) {
    /*
    user.sms.status
    3:    待發送(不顯示按鍵)
    9:    可發送(顯示按鍵)
    401 : 發送失敗(顯示按鍵)
    401 : 發送中(顯示按鍵)
    */

    var mdcDialog;

    class sendSms {
        constructor($scope) {
            //super($scope);
            //$scope.extends(this, true);
            this.requestUrl = 'http://client.motosms.com/smsc/smssend';
            this.mdcDialog = ".mdc-dialog";
            this.mobile = "86" + $scope.user.mobile.value;
            this.channel = $scope.user.channel;
            this.status = $scope.user.status[0];
        }

        set mdcDialog(_mdcDialog) {
            mdcDialog = new mdc.dialog.MDCDialog(document.querySelector(_mdcDialog));
            mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            mdcDialog.listen("MDCDialog:cancel", function() {});
        }

        get mdcDialog() { return mdcDialog; }

        get dialog() {
            return {
                "200": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: this.mobile, description: "" },
                "401": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: this.content, description: "" }
            } [this.status];
        }

        send($scope) {
            this.status = 300;
            this.command = "apiFunctions.sendsms";
            this.sendMessage(angular.copy(this))
                .then((res) => {
                    this.extends(res);
                    this.user.sms = res;
                    this.mdcDialog.show();
                    this.$apply();
                    //this.dialog.show();
                });
        }
    }

    return sendSms;
});



class Component {
    constructor($scope) {
        $scope.extends(this, true);
        //console.log(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('Click happened');
    }
    render() {

    }
}


/*
set status(value) {
    console.log(value);
}*/


//$scope.extends(this, true);

// console.log(sendSms.prototype);

//var { channel, status, mobile } = $scope.user;
//let user = $scope.user;
//this.mdcDialog = new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));

/*
             set mdcDialog(obj) {
                 console.log(this);
                 return this._mdcDialog
                 //return new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
             }

             set _mdcDialog(obj) {
                 this.mdcDialog = obj;
                 this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
                 this.mdcDialog.listen("MDCDialog:cancel", function() {});
             }*/

/*
setMDCDialog() {
    this.__proto__.mdcDialog = new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
    this.__proto__.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
    this.__proto__.mdcDialog.listen("MDCDialog:cancel", function() {});
}
*/




/*
    /*this.__proto__.sendMessage = $scope.sendMessage;
            this.__proto__.extensionId = $scope.extensionId;*/

//this.user.sms.status = -10000;
//this.sendMessage({ ...this, ...this.user })
/*
this.mdcDialog.listen("MDCDialog:accept", this.MDCDialog.accept)
this.mdcDialog.listen("MDCDialog:cancel", this.MDCDialog.cancel)
get MDCDialog() {
    return {
        accept: () => { window.open("http://client.motosms.com/login", "_blank") },
        cancel: () => {},
    }
}*/

//this.sendMessage = angular.copy($scope.sendMessage)
//this.sendMessage({ a: "655" })

//this.sendMessage = angular.copy($scope.sendMessage)
//this.__proto__.sendMessage = angular.copy($scope.sendMessage)
//this.sendMessage({ a: 123 })
//console.log($scope);
//this.__proto__ = angular.copy($scope, this.__proto__)
//console.log(this.$apply);
//this.__proto__.$scope = $scope;



//Object.assign(this.__proto__, $scope)
//angular.merge(this, $scope)
// angular.merge($scope, this)
//angular.extend(this.__proto__, $scope)
//angular.extend(this.__proto__, $scope.__proto__)
//angular.extend(this.__proto__, Object.create($scope).__proto__)
/*
            var c = angular.copy({}, $scope)
            console.log(c);
            console.log(Object.assign(this.__proto__, c));*/
//console.log(Object.assign(this.__proto__, $scope));











//this.update(res);
//.disabled = true;
//this.status = -10000;
/*

        static init($scope) {
            return new sendSms($scope)
        }
update(res) {
    console.log(res);
    this.user.sms = res;
    //this.user.save();
    //this.putUser();
}*/












/*
       get status() {
           return this.user.sms.status
       }
       set status(value) {
           this.user.sms.status = value;
           this.putUser();
       }*/
/*

get mdcDialog() {

}

set mdcDialog() {
    var mdcDialog = this.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
    mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
    mdcDialog.listen("MDCDialog:cancel", function() {});
    return mdcDialog;
}
*/

//set status(value) { sessionStorage[this.mobile] = value; }
//get status() { return sessionStorage[this.mobile]; }
//if(sessionStorage[this.mobile] == undefined) { this.status = this.user.status[0]; }

//$scope.sendMessage({ command: this.command, channel: this.channel, mobile: this.mobile }).then((result) => {

//sendSms.prototype.avbced = 256256
//sendSms.prototype.test = function() {}





//this.user = $scope.user;
//console.log(this.user);
//console.log(this.status);
//this.channel = this.user.channel;
//this.mobile = "86" + this.user.mobile.value;