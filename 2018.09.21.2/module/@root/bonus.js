define(['@page', 'Spreadsheets'], function(module, Spreadsheets) {

    console.log(xmlSpider);
    console.log(Spreadsheets);

    xmlSpider.loadend = function() {
        console.log(this);

        switch (this.lastPath) {
            case "DelDiceWinRecords":
                if(this.respData == 1) {
                    sessionStorage["cacheData"] = json(this.params);
                }
                break;
            case "DepositBonus":
                var cacheData = json(sessionStorage["cacheData"])
                if(cacheData) {
                    console.log(cacheData);
                    var postData = this.dataRows.find((row) => {
                        return row.f_id == cacheData.id;
                    });
                    Spreadsheets.upload_3(postData);
                    sessionStorage.removeItem("cacheData");
                }
                break;
            case "UpdateMemberBonusLog":
                if(this.respData.Data.Message == "更新成功") {
                    console.log(this.respData);
                    sessionStorage["cacheData"] = json(this.postData);
                }
                break;
            case "GetMemberBonusLogBackendByCondition":
                var cacheData = json(sessionStorage["cacheData"])
                if(cacheData) {
                    console.log(cacheData);
                    var postData = this.dataRows.find((row) => {
                        return row.BonusNumber == cacheData.BonusNumber
                    });
                    Spreadsheets.upload_3(postData);
                    sessionStorage.removeItem("cacheData")
                }
                break;
            default:
                // statements_def
                break;
        }

    }
});

function xxx() {


    /*sessionStorage.clear();
    this.dataRows.forEach((row, index) => {
        sessionStorage[row.f_id] = json(row);
        if(cacheData) {
            if(row.f_id == cacheData.id) {
                Spreadsheets.upload_3(row);
                sessionStorage.removeItem("cacheData")
            }
        }
    });*/
    /*if(row.BonusNumber == cacheData.BonusNumber) {
        Spreadsheets.upload_3(row);
        sessionStorage.removeItem("cacheData")
    }*/
    /*if(this.postData.RecordCounts == 20) {
        sessionStorage.clear();
        this.rows.forEach((row, index) => {
            sessionStorage[row.BonusNumber] = json(row);
        });
    }*/
    /*console.log(this.params);
    console.log(this.respData);
    console.log(sessionStorage[this.params.id]);*/
    //setTimeout()
    //var pastData = json(sessionStorage[this.params.id])
    //console.log(pastData);
    xmlSpider.loadend = function() {


        if(this.lastPath == "DepositBonus") {
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



        if(this.lastPath == "GetMemberBonusLogBackendByCondition") {
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
}