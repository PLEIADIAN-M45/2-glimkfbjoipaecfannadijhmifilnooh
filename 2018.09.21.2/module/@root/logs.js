define(['@page'], function() {;
    'use strict';

    // setTimeout(resolve, 2000)
    //return new Promise((resolve, reject) => {});
    //$scope.user.account
    function getMemberAlertInfoBackend() {
        chrome.runtime.sendMessage(
            evo.extensionId, {
                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                channel: "16",
                account: "",
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

            $scope.user = user;


            $scope.sequel = $scope.user.sequel;

            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                //x.command = "apiFunctions.region:host.attr";
                //x.command = `apiFunctions.region:${evo.host}.${x.attr}`;
                x.command = `apiFunctions:${evo.host}.${x.attr}`;
                x.channel = evo.channel;
                x.level = 1;

                // x.sites = []
                x.sites = [
                    /*{ command: "apiFunctions:wa111.member", host: "wa111", channel: "26", attr: x.attr, [x.attr]: x.value, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", host: "wa111", channel: "35", attr: x.attr, [x.attr]: x.value, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", host: "wa111", channel: "17", attr: x.attr, [x.attr]: x.value, value: x.value, index: 1 },*/
                    { command: "apiFunctions:ku711.member", host: "ku711", channel: "16", attr: x.attr, [x.attr]: x.value, value: x.value, index: 1 }
                ];

                return x;
            });

            getMemberAlertInfoBackend();

            console.log($scope.user);
            console.log($scope.userlist);

            /*
            $scope.extend = function() {
                if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
            }
            $scope.assign = function() {
                if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
            }
            $scope.reset = function() {
                for (var key of Object.keys(this.result)) { delete this[key]; };
                api.call(this);
            }
            */

            /**********************************************/
            Object.prototype.assign = function() {
                Object.assign(this, ...arguments);
                if (!$scope.$$phase) { $scope.$apply(); }
            }
            /**********************************************/
            function finish(result) {
                //console.log(this.attr, this.channel, result);
                this.active = false;
                this.assign(result);

                if (this.level == 1) {
                    console.log('putUser');
                    putUser();
                }
            }

            function api() {
                this.active = true;
                chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
            }

            $scope.apiFunctions = function(e) {
                if (this.value == undefined) { return };
                if (this.active == undefined || e) {
                    console.log(1);
                    api.call(this);
                };
            }


            $scope.apiMemberList = function() {
                return
                
                if (!this.author) { return }
                if (this.value.includes('*')) { return }
                api.call(this);
            }



            $scope.setPopup = function(r) {
                //console.log(r.popup);
                return

                setTimeout(function(r) {
                    var target = document.getElementById(r.popup);
                    console.log($(target));

                    $(target).popup({
                        on: "hover",
                        popup: "12132243",
                        position: "top left",
                        variation: "special"
                    })


                }, 500, r)


                /*
                 */
                /*

                setTimeout(function() {

                    console.log($(target));

                  
                })
                */

            };




            setTimeout(function() {
                console.log($('.custom.button'));

                $('.custom.button')
                    .popup({
                        popup: $('.custom.popup'),
                        on: 'click'
                    });



            }, 2000)





            $scope.changeColor = function() {

                //console.log(this);


                this.popup = "pop" + (this.MNO || this.f_id) + Date.now();

                //console.log(this.popup);


                if (this.list_Accounts && this.list_Accounts.length) {
                    this.color = "pink";
                };

                if (this.f_blacklist == 17) { this.color = "black" };
                if (this.IsBlackList == true) { this.color = "black" };

                if (this.f_id == $scope.sequel) { this.color = "brown" };
                if (this.MNO == $scope.sequel) { this.color = "brown" };
            };

            dispatch();
            resolve($scope);
        })
    }
})


/*

$scope.getMemberAlertInfoBackend = function(s) {
    return
    if (this.host == "ku711" && this.author) {
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
                if (result) {
                    this.extend(result);
                }
            });
    }
}

*/