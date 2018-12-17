define([], function() {




    //console.log(global);

    function sendMessage() {

        //console.log(localStorage.extensionId);
        //console.log(this);
        //console.log(params);

        this.active = true;


        chrome.runtime.sendMessage(localStorage.extensionId, this, (res) => {


            console.log(res);

            this.active = false;

            /*
            params.active = false;
            Object.assign(params, res);
            this.$apply();
            this.putUser();
            */
        });

    }

    //return new class apiFunction {

    return class apiFunction {

        constructor($scope) {

            this.extensionId = $scope.extensionId;
            //this.apply = $scope.apply;


            //Object.assign(this, $scope);
            //console.log($scope.extensionId);

            //sendMessage.bind($scope)

        }

        getUserState(m) {
            this.status = [m.ishow.value];
            this.permit = [m.isOpenDeposit.value];
        }

        getUserModel(m) {
            this.timing = [];
            this.equpmt = {};
            this.birthday = m.birthday;
            this.author = { attr: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
            this.locate = { attr: 'locate', title: m.lblIp, value: m.lblIp };
            this.mobile = { attr: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
            this.idcard = { attr: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
            this.banker = [
                { attr: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
            ];
            this.smss = m.ishow.value;
            return this;
        }

        getUserStore($scope) {
            return $scope.dexie.user.get(this.account).then((d) => {
                this.sequel = d.f_id;
                this.attach = d.f_joindate;
                this.agency = d.f_alagent;
                this.black = d.f_blacklist;
                this.peril = d.f_peril;
                this.nickName = d.f_nickName;
                this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
                this.banker = this.banker.filter((a) => { return a.value });
                return this;
            })
        }

        getSystemLog($scope) {
            return $scope.ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            })
        }

        getPhoneDate($scope) {
            return $scope.ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + this.account
            }).then((rows) => {
                var d = rows[0];
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
                return this;
            })
        }


        apply(c) {

            console.log(c);

        }


        region(parameters, e) {

            //console.log(this);

            if (parameters.region && e == undefined) { return };

            parameters.command = "apiFunctions.region";
            parameters.active = true;
            parameters.region = "";

            //parameters.assign = this.assign;

            chrome.runtime.sendMessage(

                this.extensionId,

                parameters, (res) => {

                    //console.log(this);

                    //parameters.active = false;
                    //parameters.assign(res);


                    var c = angular.merge(parameters, res);

                    this.apply(c);

                    /*
                    console.log(parameters);



                  
                    this.putUser();

                    */


                });
        }


    }

});




/*
  Object.assign(parameters, {
                        active: false,
                        res
                    })

           Object.assign(parameters, {
               command: "apiFunctions.region",
               active: true,
               region: ""
           })
           console.log(parameters);

           paramaters

           return
           */















/*
function ajax({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
      return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
  }
return new apiFunction();
*/