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