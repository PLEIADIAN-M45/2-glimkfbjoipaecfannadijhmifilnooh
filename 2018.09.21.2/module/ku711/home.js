define(["myApp"], function() {
    evo.sendMessage({ command: 'requestverificationtoken', value: evo.token });
    return {
        siteName: "KU711",
        channel: "16",
        siteNumber: "16",
        operator: $scope.ctrl.resetModel.AccountID.toUpperCase()
    }
})


if (evo.test) { $('.collapse').removeClass('collapse') }