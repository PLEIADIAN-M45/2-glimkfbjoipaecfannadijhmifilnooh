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
        //this.smss = m.ishow.value;
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

            Object.assign(this.__proto__, $scope.__proto__)

            this.user = user;
            this.mobile = user.mobile.value;
            this.status = user.status[0];
            this.session = this.createSession();
        }


        createSession() {
            if (!sessionStorage[this.mobile] && this.status == 0) {
                sessionStorage[this.mobile] = this.status;
            }
            return sessionStorage[this.mobile]
        }

        send() {

            //console.log(12454);
            console.log(this.user);

            this.sendMessage({
                    command: 'apiFunctions.sendsms'
                    params: this.user
                })
                .then((x) => {
                    console.log(x);
                })


        }

        /*
        get session() {
            return sessionStorage[this.mobile];
        }

        set session(user) {
            if (this.status == 3 && !this.session) {
                sessionStorage[this.mobile] = this.state;
            } else {
                console.log('xxxxxx');
            }
        }
        */

    }



    return async function() {

        this.user = await this.getUser() || await setUser.call(this);

        this.sendSms = new sendSms(this.user, this);



        console.log(this.user);

        console.log(this.sendSms);

    }




});