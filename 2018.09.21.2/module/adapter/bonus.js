console.log(12, 34);


xmlSpider.loadend = function() {


    if (this.lastPath == "DepositBonus") {
        console.log(this);
        try {
            sessionStorage.clear();
            var dataset = this._response.rows;

            console.log(dataset);

            /*
            dataset.forEach(function(cv, idx, arr) {
            	console.log(var1, var2);
                this[cv.f_id] = json(cv);
            }, sessionStorage);*/
        } catch (ex) {}

    }



    if (this.lastPath == "GetMemberBonusLogBackendByCondition") {
        console.log(this);
        try {
            sessionStorage.clear();
            var dataset = this._response.rows;

            console.log(dataset);

            /*
            dataset.forEach(function(cv, idx, arr) {
            	console.log(var1, var2);
                this[cv.f_id] = json(cv);
            }, sessionStorage);*/
        } catch (ex) {}

    }





};