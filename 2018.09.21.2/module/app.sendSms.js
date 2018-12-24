define([], function() {
    return class Smss {
        constructor($scope) {
            this.command = "apiFunctions.sendsms";
            this.params = $scope.user;

            //$scope.user.status[0];
            //this.mobile = $scope.user.mobile.value;
            //this.status = this._status();
            //this.init();
            this.mdcDialog = new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            this.mdcDialog.listen("MDCDialog:cancel", function() {});
        }

        get mobile() {
            return this.params.mobile.value
        }

        get status() {
            if (sessionStorage[this.mobile] == undefined) { this.status = this.params.status[0]; }
            return sessionStorage[this.mobile];
        }

        set status(value) {
            console.log(value);
            sessionStorage[this.mobile] = value;
        }

        setDialog(res) {
            //console.log(res);
            this.status = res.status;
            this.dialog = {
                "401": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "200": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: res.mobile, description: "" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: res.message, description: "" }
            } [res.status];
        }
        send($scope) {
            //this.status = 1000;
            $scope.sendMessage({ command: this.command, params: this.params }).then((res) => {
                this.setDialog(res);
                this.mdcDialog.show();
                $scope.$apply();
            });
        }
    }
});



/*get sessionStorage() {
           return sessionStorage[this.mobile]
       }*/