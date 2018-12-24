define([], function() {

    function loadend() {
        // console.log(this.prototype);
        //console.log(this.action, this.type);
    }



    loadend.prototype.getmodel = function() {
    	console.log(this.respData);

    }


    return loadend;



})








/*
return class xmlSpiderExtend {
    constructor() {
    }
    getmodel(user) {
        var { f_ishow, f_depositStatus } = this.respData;
        var data = [f_ishow, f_depositStatus];
        //var user = await getUser.call(this);
        //Spreadsheets.authorize(user, data, "開通");
    }
    }
*/