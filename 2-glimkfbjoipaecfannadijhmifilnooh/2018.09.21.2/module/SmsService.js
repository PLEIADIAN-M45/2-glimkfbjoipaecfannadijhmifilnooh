define(['common'], function() {

    var sms = function(user) {
        //console.log(a);



    };

    sms.prototype.init = function(user) {
        return
        //var mobile = user.mobile.value;
        var mobile = user.mobile;
        //console.log(isNaN(mobile));
        if (isNaN(mobile)) { return }

        Object.defineProperty(this, 'status', {
            get: function() { return sessionStorage.getItem(mobile); },
            set: function(value) { sessionStorage.setItem(mobile, value); }
        });
        var that = this;
        sms.setSession = function(res) { return that.status = res.status; };
        if (this.status == null) { sms.setSession(user) };
        return this;
    };
    sms.prototype.send = function(user) {
        sms.setSession(0);
        var { channel, account, operator, status } = user;
        var mobile = user.mobile;
        evo.sendMessage({
            command: 'apiFunctions:smsService:smsc:' + channel,
            params: { mobile, channel, account, status, operator }
        }).then(sms.setSession).then(showModalDialog);
    };

    return sms;

    //return new sms();
})


function getDialogModal(param, content) {
    return {
        "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
        "0": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: evo.sms, description: "" },
        "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
        "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: content, description: "" }
    } [param]
};

function showModalDialog(status, content) {
    if (status == "blacklisk") content.forEach(function(d, index) { content[index] = { match: d[0], value: d.input } });
    $scope.mdcDialog = getDialogModal(status, content);
    $scope.$apply();
    var dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
    dialog.listen("MDCDialog:accept", function() {});
    dialog.listen("MDCDialog:cancel", function() {});
    dialog.show()
};