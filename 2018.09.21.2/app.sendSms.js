define([], function() {
    return class sendSms {
        constructor($scope) {
            this.command = "apiFunctions.sendsms";
            this.user = $scope.user;
            this.channel = this.user.channel;
            this.mobile = "86" + this.user.mobile.value;
            this.mdcDialog = new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            this.mdcDialog.listen("MDCDialog:cancel", function() {});
        }
        set status(value) { sessionStorage[this.mobile] = value; }
        get status() {
            if (sessionStorage[this.mobile] == undefined) { this.status = this.user.status[0]; }
            return sessionStorage[this.mobile];
        }
        setDialog(res) {
            this.dialog = {
                "200": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: res.mobile, description: "" },
                "401": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: res.message, description: "" }
            } [res.status];
        }
        send($scope) {
            this.status = -100;
            $scope.sendMessage({ command: this.command, channel: this.channel, mobile: this.mobile }).then((result) => {
                //console.log(result);
                this.status = result.status;
                this.setDialog(result);
                this.mdcDialog.show();
                $scope.$apply();
            });
        }
    }
});