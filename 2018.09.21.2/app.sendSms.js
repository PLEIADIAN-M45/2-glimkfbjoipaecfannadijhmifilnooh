define([], function() {

    class sendSms {

        constructor($scope) {
            this.aaa = 56
            //$scope.extends(this, true);

            /*this.mdcDialog = new this.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            this.mdcDialog.listen("MDCDialog:cancel", function() {});
            */
        }
        get dialog() {
            return {
                "200": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: this.user.mobile.value, description: "" },
                "401": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: this.content, description: "" }
            } [this.status];
        }

        /*get status() { return this.user.sms.status }
        set status(value) {
            this.user.sms.status = value;
            this.putUser();
        }
        */

        sendxxxx() {
            this.status = -10000;
            this.command = "apiFunctions.sendsms";
            this.requestUrl = "http://client.motosms.com/smsc/smssend";
            this.loginUrl = "http://client.motosms.com/login";
            this.sendMessage({ ...this, ...this.user }).then((res) => {
                this.extends(res);
                this.mdcDialog.show();
                this.$apply();
            });
        }

        static init($scope) {
            return new sendSms($scope)
        }
    }
    return sendSms;
});





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