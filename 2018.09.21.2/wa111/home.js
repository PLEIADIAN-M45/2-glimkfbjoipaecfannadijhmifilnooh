define([], function() {
    return function() {
        localStorage.channel  = window.siteNumber;
        localStorage.siteName = this.model.spTitle2;
        localStorage.operator = this.model.hdfsite_tab.split('_')[0];
    }
});