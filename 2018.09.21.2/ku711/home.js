define([], function() {
    return async function({ $scope }) {
        localStorage.channel = "16";
        localStorage.requestverificationtoken = $("ajax-anti-forgery-token").attr("token");
        localStorage.operator = $scope.ctrl.resetModel.AccountID;
    }
});