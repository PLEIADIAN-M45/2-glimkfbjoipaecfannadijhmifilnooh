define([], function() {
    var requestverificationtoken = evo.token;
    return {
        siteName: "KU711",
        channel: "16",
        requestverificationtoken,
        operator: $scope.ctrl.resetModel.AccountID.toUpperCase()
    }
})
//if (evo.test) { $('.collapse').removeClass('collapse') }