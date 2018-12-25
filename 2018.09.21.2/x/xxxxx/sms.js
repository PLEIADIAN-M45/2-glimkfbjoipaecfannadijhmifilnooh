class Smss extends Scope {

    constructor() {

        super();

        console.log(this.user);

        //console.log(this.$id);


        /*
        this.user = $scope.user;
        this.mobile = this.user.mobile.value;
        this.status = this.user.status[0];

        this.mdcDialog = new $scope.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
        this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
        this.mdcDialog.listen("MDCDialog:cancel", function() {});
        */
    }


    get status() { return sessionStorage[this.mobile]; }
    set status(value) { sessionStorage[this.mobile] = value; }
    setDialog(res) {
        this.status = res.status;
        this.dialog = {
            "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
            "0": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
            "1": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: res.mobile, description: "" },
            "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
            "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
            "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: res.message, description: "" }
        } [res.status];
    }

    send($scope) {

        console.log(this.user);

        return
        this.status = 9;
        this.$scope.sendMessage({
            command: 'apiFunctions.sendsms',
            params: this.user
        }).then((res) => {
            this.setDialog(res);
            this.mdcDialog.show();
            this.$scope.$apply();
        });
    }
}