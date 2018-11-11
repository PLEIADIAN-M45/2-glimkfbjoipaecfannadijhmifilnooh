define(['@page'], function() {;
    'use strict';

    // setTimeout(resolve, 2000)
    //return new Promise((resolve, reject) => {});

    function getMemberAlertInfoBackend() {
        chrome.runtime.sendMessage(
            evo.extensionId, {
                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                channel: "16",
                account: $scope.user.account,
                author: $scope.user.author.value,
            }, (result) => { sessionStorage[$scope.user.author.value] = angular.toJson(result.list_RemittanceName); });
    }

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;
            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];

            $scope.user = user = await getUser();

            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                x.level = 1;
                x.command = "apiFunctions:host.attr".replace('host', evo.host).replace('attr', x.attr);
                x.sites = [
                    { command: "apiFunctions:wa111.member", channel: "26", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "35", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "17", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:ku711.member", channel: "16", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                ];
                return x;
            });

            getMemberAlertInfoBackend();

            //$scope.extend = function() { if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } } }

            function finish(result) {

                console.log(result);

                this.active = false;
                Object.assign(this, result);
                $scope.$apply();
                // if (this.level == 1) { putUser(); }
            }


            $scope.reset = function() {
                console.log(this);
                if (this.level == 1) {
                    this.prov = ""
                    /*city
                    prov
                    area
                    country
                    meta                    
                    alert
                    alarm
                    */
                }
            }

            function api() {
                this.active = true;
                //this.result = {};
                chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
            }

            $scope.apiFunctions = function(e) {

                if (!this.value) { return }
                if (this.active == undefined || e) { api.call(this); }
            }


            $scope.apiMemberList = function(s) {
                return

                if (this.value.includes('*')) { return }
                api.call(this);
            }



            console.log($scope.user);

            console.log($scope.userlist);



            $scope.getAlertInfo = function(r) {
                return
                if (this.host == "ku711") {
                    //console.log(this.author);
                    if (this.author) {

                    } else {
                        chrome.runtime.sendMessage(
                            evo.extensionId, {
                                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                                channel: "16",
                                account: $scope.user.account,
                                author: $scope.user.author.value,
                            },
                            (result) => {
                                if (result) {
                                    console.log(result);
                                }
                            });
                    }

                    /*
                    chrome.runtime.sendMessage(
                        this.extensionId, {
                            command: "apiFunctions",
                            attr: "alerts",
                            host: "ku711",
                            channel: "16",
                            account: $scope.user.account,
                            author: s.author,
                        },
                        (result) => {
                            if (result) {
                                console.log(2, result);
                                //this.active = false;                                
                                this.extend(result);
                            }
                        });*/

                }

                /* else {
                    this.list_RemittanceName = [];
                    //$scope.apiMemberList(s)
                }*/
            }

            $scope.setPopup = function() {
                this.popid = "pop_" + this.$id;
                setTimeout(function(popid) {
                    var $target = $(popid).parent();
                    var content = $(popid).html();
                    $target.popup({
                        html: content,
                        hoverable: true,
                        setFluidWidth: true,
                        exclusive: true,
                        on: "hover",
                        position: "bottom left",
                        variation: "special"
                    });
                }, 500, "#" + this.popid);
            };


            $scope.changeColor = function() {
                //this.list_Accounts =this.list_RemittanceName.filter((x) => { return x.AccountID == this.AccountID; });
                if (this.list_Accounts && this.list_Accounts.length) { this.color = "pink" };
                if (this.f_blacklist == 17) { this.color = "black" };
                if (this.IsBlackList == true) { this.color = "black" };
                if (this.f_id == $scope.user.sequel) { this.color = "brown" };
                if (this.MNO == $scope.user.sequel) { this.color = "brown" };
            };


            $scope.init = function(parameters) {
                /* parameters==me */
                //this.extend(parameters);
                //this.parameters = Object.assign({ command: "apiFunctions", host: evo.host }, parameters);
            }



            //apiFunctions:host:property:value
            //evo.apiFunctions.call(this);


            dispatch();

            resolve($scope);

            return;


        })
    }
});



//putUser()


/*if (me.attr == "author") { api.call(me); }
if (me.attr == "locate") { api.call(me); }
if (me.attr == "mobile") { api.call(me); }
if (me.attr == "idcard") { api.call(me); }
if (me.attr == "banker") { api.call(me); }*/