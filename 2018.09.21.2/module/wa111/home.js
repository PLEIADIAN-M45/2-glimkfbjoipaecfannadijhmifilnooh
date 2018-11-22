define([], function () {
    return function ({ $scope }) {
        localStorage.assign({
            host: "wa111",
            channel: window.siteNumber,
            siteName: $scope.model.spTitle2,
            operator: $scope.model.hdfsite_tab.split('_')[0]
        })
    }
});