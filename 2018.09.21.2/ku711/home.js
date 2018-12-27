define([], function() {
    return function() {
        localStorage.channel = "16";
        localStorage.requestverificationtoken = $("ajax-anti-forgery-token").attr("token");
        localStorage.operator = this.ctrl.resetModel.AccountID;
    }
});