define([], function() {
    return function({ $scope, $model }) {
        localStorage.channel = window.siteNumber;
        localStorage.siteName = $model.spTitle2;
        localStorage.operator = $model.hdfsite_tab.split('_')[0];
    }
})