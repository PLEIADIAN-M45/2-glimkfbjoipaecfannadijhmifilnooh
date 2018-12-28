define([], function() {
    return async function() {
        localStorage.channel = "16";
        localStorage.requestverificationtoken = $("ajax-anti-forgery-token").attr("token");
        localStorage.operator = this.ctrl.resetModel.AccountID;
    }
});