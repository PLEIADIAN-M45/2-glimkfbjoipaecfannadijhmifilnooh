define([], function() {

    var _user_ = { timing: [], status: [], permit: [], region: [], equpmt: {} };

    return async function({ apis, $ajax, $account, $dexie, $model, $ctrl, $scope, $router, $extensionId }) {

        function getUserBasic() {
            var { server, origin, unique, channel, account, operator } = $router;
            Object.assign(_user_, { unique, account, origin, server, channel, operator });
        }

        function getUserModel(m) {
            _user_.birthday = m.birthday;
            _user_.author = { caller: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
            _user_.locate = { caller: 'locate', title: m.lblIp, value: m.lblIp };
            _user_.mobile = { caller: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
            _user_.idcard = { caller: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
            _user_.banker = [
                { caller: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111, city: m.ddlCityArea, prov: m.ddlCity } },
                { caller: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2, city: m.ddlCityArea2, prov: m.ddlCity2 } },
                { caller: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3, city: m.ddlCityArea3, prov: m.ddlCity3 } },
                { caller: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4, city: m.ddlCityArea4, prov: m.ddlCity4 } },
                { caller: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5, city: m.ddlCityArea5, prov: m.ddlCity5 } }
            ];
        }

        function getUserState() {
            _user_.status = [$ctrl.ishow[0].value];
            _user_.permit = [$ctrl.isOpenDeposit[0].value];
        }

        function getUserStore() {
            return $dexie.user.get($account).then((d) => {
                _user_.sequel = d.f_id;
                _user_.attach = d.f_joindate;
                _user_.agency = d.f_alagent;
                _user_.black = d.f_blacklist;
                _user_.peril = d.f_peril;
                _user_.nickName = d.f_nickName;
                _user_.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
                _user_.banker = _user_.banker.filter((a) => { return a.value });
            });
        }

        function getPhoneDate() {
            return $ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + $account
            }).then(([d]) => {
                _user_.mobile.value = d.f_photo;
                _user_.idcard.value = d.f_idCard;
                _user_.equpmt.browser = d.f_browser;
                _user_.equpmt.osInfo = d.f_osInfo;
            });
        }

        function getSystemLog() {
            return $ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + $account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if(f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return _user_.timing[0] = f_time; }
                });
            });
        }

        apis.setUser = function() {
            console.log('+ setUser');
            return Promise.all([getUserBasic(), getUserModel($model), getUserState(), getUserStore(), getPhoneDate(), getSystemLog()])
                .then(() => { return _user_; });
        };


        $scope.setPermit = async function() {
            $('.setPermit').hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();

            console.log(12, 32);
        };




    }
});





/*
        _user_.$sender = $sender;

      var $sender;
      var port = chrome.runtime.connect($extensionId);
      port.postMessage('sender');
      port.onMessage.addListener(function(res) { $sender = res; });
      */

/*
        var inp = document.createElement('input');
        var XMLS = new XMLSerializer();
        var inp_xmls = XMLS.serializeToString(inp); // First convert DOM node into a string
        console.log(inp_xmls);
        // Insert the newly created node into the document's body
        document.body.insertAdjacentHTML('afterbegin', inp_xmls);
    */

// $xmlSpider.loadend = function xmlSpider() {
//     //console.log(this.action);
//     switch (this.action) {
//         case "btnUserSet":
//             //if ($scope.user) {};
//             this.user = $scope.user;
//             apis.sendMessage(this);
//             break;
//         case "getmodel":
//             apis.getUser();
//             break;
//         case "-------":
//             break;
//     }
// };



//_user_.idcard.region = {};
//_user_.mobile.region = {};
//_user_.locate.region = {};




/*
apis.setPermit = function(e) {
    //open then upload to google
}
*/