define([], function() {
    return function() {
        this.channel = window.siteNumber;
        this.operator = this.model.hdfsite_tab.split('_')[0];
        this.siteName = this.model.spTitle2;
    }
});












/*
localStorage.channel = window.siteNumber;
localStorage.siteName = this.model.spTitle2;
localStorage.operator = this.model.hdfsite_tab.split('_')[0];
*/