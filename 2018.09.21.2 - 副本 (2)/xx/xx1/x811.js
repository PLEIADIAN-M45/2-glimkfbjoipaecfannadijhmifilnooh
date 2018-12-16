 $scope.user = {
     account: m.f_account,
     birthday: m.birthday,
     timing: [],
     status: [m.ishow.value],
     permit: [m.isOpenDeposit.value],
     author: { title: m.txtRemittaceName, value: m.txtRemittaceName, },
     locate: { title: m.lblIp, value: m.lblIp },
     mobile: { title: m.txtPhoto, value: null },
     idcard: { title: m.txtIdCard, value: null },
     banker: [
         { title: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
         { title: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
         { title: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
         { title: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
         { title: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
     ]
 };


 apiFunction.getPhoneDate().then((x) => {
     $scope.user.mobile.value = x.f_photo;
     $scope.user.idcard.value = x.f_idCard;
     $scope.user.browser = x.f_browser;
     $scope.user.osInfo = x.f_osInfo;
 })


 apiFunction.getSystemLog().then(timerFilter1)
     .then((x) => {
         $scope.user.timing[0] = x.f_time;
     });


 apiFunction.getUserStore().then((x) => {
     $scope.user.sequel = x.f_id;
     $scope.user.attach = x.f_joindate;
     $scope.user.agency = x.f_alagent;
     $scope.user.black = x.f_blacklist;
     $scope.user.peril = x.f_peril;
     $scope.user.nickName = x.f_nickName;
     $scope.user.banker.map((d, i) => {
         d.value = x.f_RemittanceAccount[i];
     });
 });