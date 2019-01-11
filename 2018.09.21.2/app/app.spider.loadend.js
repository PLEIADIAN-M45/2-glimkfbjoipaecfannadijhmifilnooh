//  xmlSpider.loadend = _loadend;
/*

       $xmlSpider.loadend = function xmlSpider() {

           console.log(this.action);


           if ($scope.user) { this.user = $scope.user; };

           switch (this.action) {
               case "btnUserSet":
                   apis.sendMessage(this);
                   break;
               case "getmodel":
                   apis.getUser();
                   break;
               case "-------":
                   break;
           }
       };


       */

/*
            chrome.runtime.sendMessage(
                this.extensionId, {
                    caller: "xmlSpider",
                    params: [
                        action,
                        respData,
                        sendData,
                        server,
                        channel
                    ],
                }, (res) => {
                    console.log(res);
                    //resolve(res);
                    //this.active = false;
                })
    */


this.MISSION = ext.MD5(this.lastPath)
this.COMMANDER = this.action.toUpperCase();
this.SEND_DATA = this.sendData;
this.RESP_DATA = this.respData;
this.EXTENSION = localStorage.extensionId;

// _loadend(this)


/*
var COMMANDER = this.action.toUpperCase(),
    SEND_DATA = this.sendData,
    RESP_DATA = this.respData,
    EXTENSION = localStorage.extensionId;
*/

//_loadend(COMMANDER, SEND_DATA, RESP_DATA, EXTENSION, this)
//this.action = MD5(this.sendData.action) || MD5(this.sendData.type) || MD5(this.lastPath)
//this.moment = Date.now();
//this.$unique = window.$unique;
//moment().format("YYYY-MM-DD HH:mm:ss")
//console.log(window.$unique);
//console.log(this.$scope);
define([], function() {
    //return function xmlSpider_loadend(COMMANDER, SEND_DATA, RESP_DATA, EXTENSION) {
    return function xmlSpider_loadend({ COMMANDER, SEND_DATA, RESP_DATA, EXTENSION, $scope, apis }) {





        //console.log(COMMANDER, SEND_DATA, RESP_DATA, EXTENSION, EXTENSION)
        //console.log($scope, apis);



        /*
        btnUserSet
        getmodel
        */


        //console.log(3);
        //console.log(this);
        //console.log(this.extensionId);
        /*
      getmodel: 開通表
      StopMember:
      getDepositBonusList:
      delDiceWinRecords:
      DelDiceWinRecords:
      -------------------------
      UpdateMemberBonusLog
      GetMemberBonusLogBackendByCondition
      UpdateMemberRiskInfoAccountingBackend
      UpdateMemberSNInfoBackend
      UpdateMemberRisksInfoBackendIsFSuspension
      */

    };


})