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
            var user = await getUser();

            user.author.value = "王杰";
            $scope.user = user;
            $scope.sequel = $scope.user.sequel;
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                //x.command = "apiFunctions.region:host.attr";
                //x.command = `apiFunctions.region:${evo.host}.${x.attr}`;
                x.command = `apiFunctions:${evo.host}.${x.attr}`;
                x.channel = evo.channel;
                x.sites = [

                ]
                /*x.sites = [
                    { command: "apiFunctions:member", host: "wa111", channel: "26", attr: "member", [x.attr]: x.value, index: 1 },
                    { command: "apiFunctions:member", host: "wa111", channel: "35", attr: "member", [x.attr]: x.value, index: 1 },
                    { command: "apiFunctions:member", host: "wa111", channel: "17", attr: "member", [x.attr]: x.value, index: 1 },
                    { command: "apiFunctions:member", host: "ku711", channel: "16", attr: "member", [x.attr]: x.value, index: 1 }
                ];*/
                return x;
            });

            console.log($scope.user);


            $scope.extend = function() {
                if(this == window) { return } else {
                    //this.active = !this.active;
                    Object.assign(this, ...arguments);
                    //this.parameters = arguments[0];
                    if(!this.$$phase) { this.$apply(); }
                }
            }

            Object.prototype.assign = function() {
                console.log(this);
                console.log(arguments);
                Object.assign(this, ...arguments)
            }

            getMemberAlertInfoBackend();

            $scope.extend = function() {
                if(this == window) { return } else { Object.assign(this, ...arguments); if(!this.$$phase) { this.$apply(); } }
            }
            $scope.assign = function() {
                if(this == window) { return } else { Object.assign(this, ...arguments); if(!this.$$phase) { this.$apply(); } }
            }

            $scope.reset = function() {
                for(var key of Object.keys(this.result)) { delete this[key]; };
                api.call(this);
            }

            function finish(result) {
                this.active = false;
                //this.result = result;
            }

            function api() {
                this.active = true;
                chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
            }

            $scope.apiFunctions = function(e) {
                console.log(this);
                return
                if(!this.value) { return }
                if(this.active == undefined || e) { api.call(this); }
            }

            $scope.getMemberAlertInfoBackend = function(s) {
                return
                if(this.host == "ku711" && this.author) {
                    console.log(this);
                    chrome.runtime.sendMessage(
                        this.extensionId, {
                            command: "apiFunctions",
                            attr: "getMemberAlertInfoBackend",
                            host: "ku711",
                            channel: "16",
                            account: $scope.user.account,
                            author: this.author,
                        },
                        (result) => {
                            if(result) {
                                this.extend(result);
                            }
                        });
                }
            }
            $scope.apiMemberList = function(s) {
                return
                if(this.value.includes('*')) { return }
                api.call(this);
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

            $scope.changeColor = function(args) {
                this.extend(args);
                if(this.host == "ku711" && this.author) { this.list_Accounts = this.list_RemittanceName.filter((x) => { return x.AccountID == this.AccountID; }); }
                if(this.list_Accounts && this.list_Accounts.length) { this.color = "pink" };
                if(this.f_blacklist == 17) { this.color = "black" };
                if(this.IsBlackList == true) { this.color = "black" };
                if(this.f_id == this.sequel) { this.color = "brown" };
                if(this.MNO == this.sequel) { this.color = "brown" };
            };

            dispatch();
            resolve($scope);
        })
    }
})