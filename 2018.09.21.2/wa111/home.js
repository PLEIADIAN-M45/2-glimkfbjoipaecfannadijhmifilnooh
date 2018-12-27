define([], function() {
    return function() {

    	console.log(window.hdfsite_tab);   	

    	console.log($(".user-info").text());

        localStorage.channel = this.siteNumber;
        localStorage.siteName = this.model.spTitle2;
        localStorage.operator = this.model.hdfsite_tab.split('_')[0];
    }
});




/*
  	console.log(this);
  	console.log(this.performance);
  	console.log(window.spTitle2);
  	console.log(this.siteNumber);
  	*/


/*

console.log(window.spTitle2);
*/