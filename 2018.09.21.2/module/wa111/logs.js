define([], function() {

    function createElement(value) {
        return $('<b>').text(value[0])
            .addClass('pointer')
            .popup({ on: 'click' })
            .click(this.copy)
            .attr('data-content', value.reverse().join('-'))
    }

    function addHighlightAccountsId(account, channel) {
        if(this.user.channel == channel && this.user.account == account) {
            this.children[2].style.backgroundColor = "#01579b";
            this.children[2].style.color = "white";
        }
    }


    function addChannelToAccountsId() {
        var account = this.children[2].outerText;
        var channel = this.children[0].outerText.split('-').shift();
        this.children[2].firstChild.remove();
        this.createElement([account]).appendTo(this.children[2]);
        this.createElement([channel, account]).appendTo(this.children[2]);
        this.addHighlightAccountsId(account, channel);
    }

    return async function($scope) {

        this.createElement = createElement;
        this.addChannelToAccountsId = addChannelToAccountsId;
        this.addHighlightAccountsId = addHighlightAccountsId;

        this.user = await this.getUser();
        this.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        this.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

        this.apiFunctions = {};
        this.apiFunctions.region = function(params, e) {
            params.command = "apiFunctions.region";
            params.active = true;
            params.region = (params.attr == "banker") ? params.region : {};
            chrome.runtime.sendMessage(this.extensionId, params, (res) => {
                params.active = false;
                Object.assign(params, res);
                this.$apply();
                this.putUser();
            });
        }.bind(this);


        this.apiFunctions.member = function(params) {
            params.command = "apiFunctions.member"
            params.active = true;
            params.rows = [];
            chrome.runtime.sendMessage(this.extensionId, params, (res) => {
                params.active = false;
                Object.assign(params, res);
                this.$apply();
            });
        }.bind(this);



        this.apiFunctions.getProtocolSet = function(params) {
            console.log(params);
            return
            var cells = $('#divCookie > ul').filter((i, { firstElementChild, children }) => {
                return firstElementChild.outerText && children.length > 10;
            }).toArray().forEach((ul) => {
                //console.log(ul.children);
                //ul.children.user = this.user;
                //Object.assign(this, ul)
                this.children = ul.children;
                //this.addHighlightAccountsId(ul.children);
                this.addChannelToAccountsId();
            });

            this.user.region = params.rows.map((x) => { return x.IPLocation });

        }.bind(this);


        this.changeColor = function(r) {
            r.$id = "#" + this.$id;
            r.sequel = this.user.sequel;
            if(r.list_Accounts && r.list_Accounts.length) { this.color = "pink"; };
            if(r.f_blacklist == 17 || r.IsBlackList == true) { this.color = "black" };
            if(r.f_id == r.sequel || r.MNO == r.sequel) { this.color = "brown" };
        };

        this.setPopup = function(r) {
            if(r.list_Accounts && r.list_Accounts.length) { setTimeout((popupId) => { $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" }); }, 500, r.$id); };
        }

        this.showSemanticModal = function(s) {
            $rootScope.list_RemittanceName = s.list_RemittanceName;
            $('.ui.modal').modal('show');
        }

        this.openMemberModify = function(r, s) {
            var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${r.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${r.AccountID}` } [s.host];
            console.log(url);
            window.open(url, "_blank");
        }

        this.queryInputModel = function() {
            switch (this.host) {
                case "wa111":
                    break;
                case "ku711":
                    $scope.ctrl.model.QueryInputModel.AccountID = this.params.accounts;
                    $scope.ctrl.GetQueryLoginLog(this.params.method);
                    break;
            }
        }

        this.createIFrame = function(_src) {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo($projElement);
            $('<iframe>', { id: 'sameBrowserList', src: _src, frameborder: 0, width: '100%' }).load(addScrollHeightEventListener).appendTo($projElement);
        }

        this.checkSensitiveUserWarn = function() {
            this.notice = search.notice.compare(this.f_remarks || this.Memo);
        }

        this.list = [this.user.author, this.user.locate, this.user.mobile, this.user.idcard]
            .concat(this.user.banker).map((x) => {
                var params = { attr: x.attr, value: x.value, index: 1 };
                x.sites = [
                    { channel: "26", host: "wa111", ...params },
                    { channel: "35", host: "wa111", ...params },
                    { channel: "17", host: "wa111", ...params },
                    { channel: "16", host: "ku711", ...params }
                ];
                return x;
            });


        console.log(this.list);
        console.log(this.user);
        this.$apply();
    }
})


//.forEach(({ children }) => {