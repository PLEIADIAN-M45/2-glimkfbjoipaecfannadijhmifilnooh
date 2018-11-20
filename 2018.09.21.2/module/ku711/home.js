define([], function() {
    return {
        host                     : "ku711",
        channel                  : "16",
        requestverificationtoken : $("ajax-anti-forgery-token").attr("token"),
        operator                 : $scope.ctrl.resetModel.AccountID.toUpperCase()
    }
})









//if (evo.test) { $('.collapse').removeClass('collapse') }