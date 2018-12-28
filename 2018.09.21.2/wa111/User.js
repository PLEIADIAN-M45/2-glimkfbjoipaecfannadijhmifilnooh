https: //medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

    class User {

        constructor() {

            super();

            console.log(this);

            //return this.setUser()
            //console.log(12);
        }

        getUserBasic() {
            ['server', 'origin', 'unique', 'channel', 'account', 'operator']
            .forEach((name) => { this[name] = this.__proto__[name]; });
        }

        getUserState(m) {
            this.status = [m.ishow.value];
            this.permit = [m.isOpenDeposit.value];
            //this.sms = { status: m.ishow.value }
        }

        getUserStore() {
            this.dexie.user.get(this.account).then((d) => {
                this.sequel = d.f_id;
                this.attach = d.f_joindate;
                this.agency = d.f_alagent;
                this.black = d.f_blacklist;
                this.peril = d.f_peril;
                this.nickName = d.f_nickName;
                this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
                this.banker = this.banker.filter((a) => { return a.value });
            });
        }

        getPhoneDate() {
            this.ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + this.account
            }).then(([d]) => {
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
            });
        }

        getSystemLog() {
            return this.ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            });
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
        }

        /*
        getUser() {
            //console.log(this);
            this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique })
                .then((user) => {
                    //console.log(user);
                })

        }
        */

        setUser() {
            Promise.all([
                this.getUserBasic(),
                this.getUserModel(this.model),
                this.getUserState(this.model),
                this.getUserStore(),
                this.getPhoneDate(),
                this.getSystemLog(),
            ]).then((x) => {
                console.log("---------");
                console.log(this);
            })
        }




        static foo() {
            //with(this.model) {}
        }

    }