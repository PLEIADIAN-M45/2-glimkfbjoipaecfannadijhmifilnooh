define([], function() {
    return function({ $model }) {
        localStorage.channel = window.siteNumber;
        localStorage.siteName = $model.spTitle2;
        localStorage.operator = $model.hdfsite_tab.split('_')[0];
    }
});