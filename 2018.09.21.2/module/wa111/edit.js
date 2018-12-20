define([], function() {

    function getSystemLog() {
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

    function getPhoneDate() {
        return this.ajax({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "type=getPhoneDate&account=" + this.account
        }).then(([d]) => {
            this.mobile.value = d.f_photo;
            this.idcard.value = d.f_idCard;
            this.equpmt.browser = d.f_browser;
            this.equpmt.osInfo = d.f_osInfo;
            return this;
        });
    }

    function getUserModel(m) {
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

        /*
        console.log(m);
        this.sendSms = (function() {
            console.log(m.ishow.value);
        }());
        */
        return this;
    }

    function getUserState(m) {
        this.status = [m.ishow.value];
        this.permit = [m.isOpenDeposit.value];
        return this;
    }

    function getUserBasic(s) {
        this.host = s.host;
        this.origin = s.origin;
        this.unique = s.unique;
        this.channel = s.channel;
        this.account = s.account;
        this.operator = s.operator;
        return this;
    }

    function getUserStore() {
        return this.dexie.user.get(this.account).then((d) => {
            this.sequel = d.f_id;
            this.attach = d.f_joindate;
            this.agency = d.f_alagent;
            this.black = d.f_blacklist;
            this.peril = d.f_peril;
            this.nickName = d.f_nickName;
            this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
            this.banker = this.banker.filter((a) => { return a.value });
            return this;
        });
    }

    function setUser() {
        this.user = Object.create(this.__proto__);
        return Promise.all([
            getUserBasic.call(this.user, this),
            getUserModel.call(this.user, this.model),
            getUserState.call(this.user, this.model),
            getUserStore.call(this.user, this),
            getPhoneDate.call(this.user, this),
            getSystemLog.call(this.user, this)
        ]).then(this.putUser.bind(this));
    }

    class sendSms {

        constructor(user, $scope) {
            Object.assign(this.__proto__, $scope.__proto__);
            this.$scope = $scope;
            this.user = user;
            this.mobile = user.mobile.value;
            this.status = user.status[0];

            this.mdcDialog = new this.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            this.mdcDialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            this.mdcDialog.listen("MDCDialog:cancel", function() {});


            //mdcDialog.show();
            //this.session = user.status[0];
            //this.status = user.status[0];
            //this.createSession();
        }


        createSession() {
            if (!sessionStorage[this.mobile] && this.status == 0) { sessionStorage[this.mobile] = this.status; }
            return sessionStorage[this.mobile];
        }

        get dialog() {
           
            return {
                "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "0": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "1": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: this.mobile, description: "" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: this.message, description: "" }
            } [this.status];
        }



        dialog() {
            var dialog = new this.mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            dialog.listen("MDCDialog:accept", function() { window.open("http://client.motosms.com/login", "_blank"); });
            dialog.listen("MDCDialog:cancel", function() {});
            dialog.show();
        }

        send($scope) {
            this.status = 9;
            this.sendMessage({
                command: 'apiFunctions.sendsms',
                params: this.user
            }).then((x) => {

                console.log(x);
                this.status = x.status;
                this.message = x.message;

                this.mdcDialog.message = x.message;
                this.dialog();
                this.mdcDialog.show();
                
                this.$scope.apply();
            });
        }

        get status() { return sessionStorage[this.mobile]; }
        set status(value) { sessionStorage[this.mobile] = value; }
    }


    return async function() {
        //this.user = await this.getUser() || await setUser.call(this);
        this.user = await setUser.call(this);
        this.sendSms = new sendSms(this.user, this);
        this.apply();
        console.log(this.user);
        //console.log(this.sendSms);
        //console.log(this.sendSms.mdcDialog);
    }

});