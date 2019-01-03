define(['wa111/apiFunction'], function(apiFunction) {

    function addHighlightAccountsId(account, channel) {
        if(this.user.channel == channel && this.user.account == account) {
            this.children[2].style.backgroundColor = "#01579b";
            this.children[2].style.color = "white";
        }
    }

    function addChannelToAccountsId() {
        //console.log(this);
        var account = this.children[2].outerText;
        var channel = this.children[0].outerText.split('-').shift();
        this.children[2].firstChild.remove();
        createElement([account]).appendTo(this.children[2]);
        createElement([channel, account]).appendTo(this.children[2]);
        //this.addHighlightAccountsId(account, channel);
    }

    return async function({ $scope, $getUser, $putUser, $setUser, $sendMessage }) {
        $scope.apiFunctions = function() {}

        $scope.apiFunctions.region = function(me, e) {
            if(me.callee == "banker") { return }
            if(me.callee == "author") { return }
            if(!me.active || e) {
                me.region = "";
                me.active = true;
                $sendMessage(me).then((res) => {
                    me.active = false;
                    me.region = res;
                    $scope.$apply();
                })
            };
        }

        $scope.apiFunctions.member = function(me, e) {
            //if(me.channel != "35") { return }
            //if(me.callee != "author") { return }
            me.command = "apiFunctions.member";
            me.active = true;
            me.member = "";
            $sendMessage(me).then((res) => {
                me.active = false;
                me.member = res
                $scope.$apply();
            })
        }

        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
        $scope.user = await $getUser();
        console.log($scope.user);

        $scope.user.author.value = "王杰"

        $scope.$watch('user', $putUser, true);

        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard]
            .concat($scope.user.banker).map((x) => {
                //x.command = "apiFunctions.region";
                x.command = "apiFunctions." + x.callee;
                var params = { callee: x.callee, value: x.value, index: 1 };
                x.sites = [
                    { channel: "26", host: "wa111", ...params },
                    { channel: "35", host: "wa111", ...params },
                    { channel: "17", host: "wa111", ...params },
                    { channel: "16", host: "ku711", ...params }
                ];
                return x;
            });

        $scope.$apply();


        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

        /*
        Object.defineProperty($scope.user, 'bind', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: "static"
        })
        */


        /* user.author .26.member
               user.author.site[26].member*/



        //视图控制器
        //https://www.jianshu.com/p/07ba2b0c8fca
        /*
        var userInfo = {};
        Object.defineProperty(userInfo, "nickName", {
            get: function() {
                return document.getElementById('nickName').innerHTML;
            },
            set: function(nick) {
                document.getElementById('nickName').innerHTML = nick;
            }
        });
        Object.defineProperty(userInfo, "introduce", {
            get: function() {
                return document.getElementById('introduce').innerHTML;
            },
            set: function(introduce) {
                document.getElementById('introduce').innerHTML = introduce;
            }
        })


        作者： 进击的前端
        链接： https: //www.jianshu.com/p/07ba2b0c8fca
            來源： 简书
        简书著作权归作者所有， 任何形式的转载都请联系作者获得授权并注明出处。

*/


        /*
                $scope.$watch('user', function(nv, ov) {
                    if(!angular.equals(nv, ov)) {
                        //console.log("+++", nv);
                        $scope.$putUser();
                    }
                }, true);
                */



        /*
        console.log($scope.list);
    */



        return

        this.apiFunction = new apiFunction($scope);
        //console.log(this.apiFunction);

        this.createElement = function createElement(value) {
            return $('<b>').text(value[0])
                .addClass('pointer')
                .popup({ on: 'click' })
                .click(this.copy)
                .attr('data-content', value.reverse().join('-'))
        };

        this.addChannelToAccountsId = addChannelToAccountsId;
        this.addHighlightAccountsId = addHighlightAccountsId;

        //this.user = await this.getUser();
        this.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        this.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

        this.cells = $('#divCookie > ul:not(.TrHead):not(.TrHead2)').filter((i, { firstElementChild, children }) => {
            return firstElementChild.outerText && children.length > 10;
        }).toArray();


        this.cells.forEach(function(ul) {
            //addChannelToAccountsId.call(ul)
            //console.log(this);
        })

        this.getUsersRegion = function() {
            this.user.region = this.cells.map(({ children }) => { return children[9].outerText; });
            this.putUser();
        }

        this.getProtocolSet = function(params) {
            //this.getUsersRegion();
            params.rows = this.cells.map(({ children }) => {
                return [
                    children[7].outerText,
                    children[9].outerText
                ]
            });

            //console.log(params.rows);
            //console.log(new Map(params.rows));
            /*return {
                IPAddress: children[7].outerText,
                IPLocation: children[9].outerText
            }
            */
            //console.log(ul);
            //ul.children.user = this.user;
            //Object.assign(this, ul)
            //this.children = ul.children;
            //this.addHighlightAccountsId(ul.children);
            //this.addChannelToAccountsId();
        };


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


        this.$apply();
    }

})





//console.log(this.list);
//console.log(this.user);


//for (var x of apiFunction.__proto__) { console.log(x); }
//console.log(apiFunction($scope));
//console.log($scope);
//this.apiFunc
//this.apiFunc = new apiFunction($scope);
//console.log(var1, var2);

//this.apiFunction.region.bind(this);
/*
this.apiFunctions = {};
this.apiFunctions.region = function(params, e) {
    if (params.region && e == undefined) { return };
    params.command = "apiFunctions.region";
    params.active = true;
    chrome.runtime.sendMessage(this.extensionId, params, (res) => {
        console.log(res);
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
*/

//params.region = (params.attr == "banker") ? params.region : {};
//.forEach(({ children }) => {
//ul.children = this.children;
//ul.unique = this.unique;
//this.channel = this.children[0];
//this.account = this.children[2];