define([], function() {
    return {
        host     : "wa111",
        siteName : $scope.model.spTitle2,
        operator : $scope.model.hdfsite_tab.split('_')[0],
        channel  : $scope.window.siteNumber
    }
});
