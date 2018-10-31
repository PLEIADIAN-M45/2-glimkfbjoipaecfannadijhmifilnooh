define(['common'], function() {
    function Dialog({ status, message, mobile }) {
        $scope.mdcDialog = {
            "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
            "0": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: mobile, description: "" },
            "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
            "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
            "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: message, description: "" }
        }[status];
        if (!$scope.$$phase) { $scope.$apply(); }
        var dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
        dialog.listen("MDCDialog:accept", function() {});
        dialog.listen("MDCDialog:cancel", function() {});
        dialog.show();
    };

    function Assign(res) {
        sms.status = res.status;
        localStorage[res.mobile] = res.status;
        return res;
    }

    var sms = {
        bind: function({ channel, account, operator, status, mobile }) {
            var mobile = mobile.value;
            console.log(mobile);
            console.log(status);

            var status = localStorage[mobile] || status;
            
            return Object.assign(this, { channel, account, operator, mobile, status });
        },
        send: function() {
            this.status = 9;
            evo.apiFunctions({ command: 'apiFunctions:smsService:smsc:channel', params: this })
                .then(Assign).then(Dialog);
        }
    }
    return sms;
})