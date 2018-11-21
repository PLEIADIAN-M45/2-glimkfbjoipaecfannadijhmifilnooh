define(["factory"], function() {

    return function() {
        console.log(this.model.spTitle2);
        localStorage.assign({
            host: "wa111",
            siteName: this.model.spTitle2,
            operator: this.model.hdfsite_tab.split('_')[0],
            channel: window.siteNumber
        })
    }
});



/*
return {
    host     : "wa111",
    siteName : $scope.model.spTitle2,
    operator : $scope.model.hdfsite_tab.split('_')[0],
    channel  : $scope.window.siteNumber
}
*/