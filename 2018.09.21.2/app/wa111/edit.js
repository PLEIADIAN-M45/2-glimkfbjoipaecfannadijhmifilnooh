define([], function() {

    return async function({ $ajax, $account, $dexie, $model, $ctrl, $scope, $getUser, $xmlSpider }) {

        var _user_ = {
            timing: [],
            status: [],
            permit: [],
            region: [],
            equpmt: {}
        };

        var { account, server, origin, unique, channel, operator } = this;


        function getUserBasic() {
            Object.assign(_user_, { server, origin, unique, channel, account, operator })
        }

        function getUserModel() {
            var m = $model;
            _user_.birthday = m.birthday;
            _user_.author = { callee: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
            _user_.locate = { callee: 'locate', title: m.lblIp, value: m.lblIp };
            _user_.mobile = { callee: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
            _user_.idcard = { callee: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
            _user_.banker = [
                { callee: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111, city: m.ddlCityArea, prov: m.ddlCity } },
                { callee: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2, city: m.ddlCityArea2, prov: m.ddlCity2 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3, city: m.ddlCityArea3, prov: m.ddlCity3 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4, city: m.ddlCityArea4, prov: m.ddlCity4 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5, city: m.ddlCityArea5, prov: m.ddlCity5 } }
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
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return _user_.timing[0] = f_time; }
                });
            });
        }

        $scope.$setUser = function() {
            console.log('+');
            return Promise.all([getUserBasic(this),
                    getUserModel(), getUserState(), getUserStore(),
                    getPhoneDate(), getSystemLog()
                ])
                .then(() => {
                    _user_.idcard.region = {};
                    _user_.mobile.region = {};
                    _user_.locate.region = {};
                    return _user_;
                })
        }

        $scope.setPermit = function(e) {
            e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();
        };




        $xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                console.log($scope.user);
                $getUser()
            }
        };

    }
})