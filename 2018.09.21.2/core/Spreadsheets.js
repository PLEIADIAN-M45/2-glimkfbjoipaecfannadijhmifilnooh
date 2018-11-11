define(["xmlSpider"], function(xmlSpider) {

    console.log(xmlSpider);

    var Spreadsheets = {

        authorize_wa111: function(pastData, postData) {

            getUser(evo).then((user) => {

                user.status[1] = postData.f_ishow;
                user.permit[1] = postData.f_depositStatus;
                user.timing[1] = postData.timespan;
                user.timing[2] = timeDiff(user.timing);
                user.permit = user.permit.map($Num);
                if(user.status[0] == 3) {
                    user.command = "google:scripts:authorize"
                } else {
                    user.command = "google:scripts:suspended"
                }
                alert('authorize')
                console.log(user);
                //evo.apiFunctions(user);
            })


            /*
            pastData.f_ishow = Number(pastData.f_ishow);
            postData.f_ishow = Number(postData.f_ishow);
            pastData.f_depositStatus = Number(pastData.f_depositStatus);
            postData.f_depositStatus = Number(postData.f_depositStatus);

            //console.log(pastData.f_ishow, postData.f_ishow);
            //console.log(pastData.f_depositStatus, postData.f_depositStatus);
            if (pastData.f_ishow == postData.f_ishow) { return }

            if (pastData.f_ishow == 3) {
                alert('審核 -> 開通表')
            } else {
                alert('其它轉停權=停權表')
                //其它轉停權=停權表
            }
            console.log(user);
            alert('authorize')
            */
        },
        authorize_ku711: function(pastData, postData) {
            getUser(evo).then((user) => {
                user.status[1] = postData.MemberStatus;
                user.permit[1] = postData.IsDeposit;
                user.timing[1] = postData.timespan;
                user.timing[2] = timeDiff(user.timing);
                user.permit = user.permit.map($Num);
                if(user.status[0] == 3) {
                    user.command = "google:scripts:authorize"
                } else {
                    user.command = "google:scripts:suspended"
                }
                alert('authorize')
                console.log(user);
                //evo.apiFunctions(user);
            })
        },

        siribonus: function(postData) {
            //user.command = "google:scripts:siribonus"
            console.log(postData);
            alert('siribonus')
        },
    }

    var $robot = {

        /*開通或停權*/
        StopMember: function() {
            //還原或停權
            if(this.respData == 1) { return };
            var pastData = $scope.user;
            var postData = { f_ishow: 2, f_depositStatus: 0 }
            Spreadsheets.authorize_wa111(pastData, postData);
        },

        getmodel: function() {
            var pastData = $scope.user;
            var postData = this.respData;
            Spreadsheets.authorize_wa111(pastData, postData);
        },


        /*開通或停權*/
        UpdateMemberSNInfoBackend: function() { //控制用户状态開關 //判斷一下是否執行成功 //這個動作用於 轉為停權
            var pastData = $scope.user;
            var postData = this.sendData;
            if(pastData.MemberStatus == postData.MemberStatus) { return }
            Spreadsheets.authorize_ku711(pastData, postData);
        },

        UpdateMemberRiskInfoAccountingBackend: function() { //控制存款開關
            if(this.success) {} else { return };

            /*var s = this.sendData;
            $scope.user.status.push(s.MemberStatus);
            $scope.user.permit.push(s.IsDeposit);
            console.log($scope.user);*/
            var pastData = $scope.user;
            var postData = this.sendData;
            //if(pastData.IsDeposit == postData.IsDeposit) { return }
            Spreadsheets.authorize_ku711(pastData, postData);
        },

        UpdateMemberRisksInfoBackendIsFSuspension: function() { //還原或停權
            if(this.success) {} else { return };
            if(this.sendData.IsFSuspension == false) { return };
            var pastData = $scope.user;
            var postData = { MemberStatus: 0, IsDeposit: 0 };
            Spreadsheets.authorize_ku711(pastData, postData);
        },

        //禮金表
        delDiceWinRecords: function() { /*用於刪除*/
            if(this.respData == 1) { this.cacheBonusData = this.sendData; }
        },
        DelDiceWinRecords: function() { /*用於給點*/
            if(this.respData == 1) { this.cacheBonusData = this.sendData; }
        },
        DepositBonus: function() {
            if(this.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.f_id == this.cacheBonusData.id; });
                if(postData) {
                    this.cacheBonusData = null;
                    Spreadsheets.bonus(postData);
                }
            }
        },
        //禮金表
        UpdateMemberBonusLog: function() {
            if(this.success) {} else { return };
            this.cacheBonusData = this.sendData;
        },
        GetMemberBonusLogBackendByCondition: function() {
            if(this.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.BonusNumber == this.cacheBonusData.BonusNumber; });
                if(postData) {
                    this.cacheBonusData = null;
                    Spreadsheets.bonus(postData);
                }
            }
        },
    }


    xmlSpider.loadend = function() {
        var robot = $robot[this.command];
        if(robot) { return robot.call(this); }
        var robot = $robot[this.lastPath];
        if(robot) { return robot.call(this); }
    }


    //console.log(chrome.runtime);
    //console.log(location.);
    /*
        var connectName = location.pathname.split('.')[0].split('/').pop();
        var port = chrome.runtime.connect(evo.extensionId, {
            name: connectName
        })
        port.onMessage.addListener(function(a) {
            console.log(a);
        })*/

    //console.log(port);



    /* chrome.runtime.onConnect.addListener(function(port) {
         console.log(port);

     })*/







})