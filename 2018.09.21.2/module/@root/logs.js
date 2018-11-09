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
<<<<<<< HEAD
            var user = await getUser();

            user.author.value = "王杰";

            $scope.user = user;
            $scope.sequel = $scope.user.sequel;
=======

            $scope.user = user = await getUser();
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1

            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);

            $scope.userlist.map((x) => {
<<<<<<< HEAD
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

            $scope.init = function(parameters) {
                /* parameters==me */
                //this.extend(parameters);
                //this.parameters = Object.assign({ command: "apiFunctions", host: evo.host }, parameters);
            }



            function apiFunctions() {
                return
                return new Promise((resolve, reject) => {

                    this.active = true;

                    chrome.runtime.sendMessage(

                        evo.extensionId,

                        this,

                        (result) => {

                            if(result) {

                                this.active = false;

                                Object.assign(this, result);


                                $scope.$apply();

                                resolve($scope.user)
                                //this.extend(result);
                            }
                        });
                })
            }


            $scope.apiFunctions = apiFunctions;

            $scope.apiGetRegion = function(me, e) {
                chrome.runtime.sendMessage(
                    this.extensionId,
                    this.me,
                    (result) => {
                        if(result) {
                            console.log(result);
                            me.active = false;
                            Object.assign(me, result);
                            $scope.$apply();
                            //this.extend(result);
                            //putUser();
                        }
                    });
                return

                apiFunctions.call(me).then(putUser)

                return

                this.extend(me);
                return

                if(this.active == undefined || e) {
                    me.active = true;
                    chrome.runtime.sendMessage(
                        this.extensionId,
                        this.me,
                        (result) => {
                            if(result) {
                                me.active = false;
                                Object.assign(me, result);
                                this.extend(result);
                                putUser();
                            }
                        });
                }
=======
                x.level = 1;
                x.command = "apiFunctions:host.attr".replace('host', evo.host).replace('attr', x.attr);
                //x.__proto__.assign = function() {                };
                x.sites = [
                    { command: "apiFunctions:wa111.member", channel: "26", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "35", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "17", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:ku711.member", channel: "16", [x.attr]: x.value, attr: x.attr, value: x.value, index: 1 },
                ];
                return x;
            });


            Object.prototype.assign = function() {
                console.log(this);
                console.log(arguments);
                Object.assign(this, ...arguments)
            }

            getMemberAlertInfoBackend();

            $scope.extend = function() {
                if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
            }
            $scope.assign = function() {
                if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
            }

            $scope.reset = function() {
                for (var key of Object.keys(this.result)) { delete this[key]; };
                api.call(this);
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
            }

            function finish(result) {
                this.active = false;
                //this.result = result;

<<<<<<< HEAD
            $scope.apiMemberList = function(s) {
                return
                this.extend(s);
                this.active = true;
                this.rows = [];
                chrome.runtime.sendMessage(
                    this.extensionId,
                    this.s,
                    (result) => {
                        if(result) {
                            this.active = false;
                            this.extend(result);
                        }
                    });
=======
                this.assign(result)
                //Object.assign(this, result);
                $scope.$apply();
            }

            function api() {
                this.active = true;
                chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
            }



            $scope.apiFunctions = function(e) {

                console.log(this);
                
                return
                if (!this.value) { return }
                if (this.active == undefined || e) { api.call(this); }
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
            }

            $scope.getMemberAlertInfoBackend = function(s) {
                return

<<<<<<< HEAD
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
=======
            $scope.apiMemberList = function(s) {
                return

                if (this.value.includes('*')) { return }
                api.call(this);
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
            }



<<<<<<< HEAD
                if(this.host == "ku711") {
=======
            console.log($scope.user);

            console.log($scope.userlist);



            $scope.getAlertInfo = function(r) {
                return
                if (this.host == "ku711") {
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
                    //console.log(this.author);
                    if(this.author) {

                    } else {
                        chrome.runtime.sendMessage(
                            evo.extensionId, {
                                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                                channel: "16",
                                account: $scope.user.account,
                                author: $scope.user.author.value,
                            },
                            (result) => {
<<<<<<< HEAD
                                if(result) {
                                    //console.log(2, result);
                                    //this.active = false;
                                    this.extend(result);
=======
                                if (result) {
                                    console.log(result);
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
                                }
                            });
                    }


                }

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


<<<<<<< HEAD
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



//apiFunctions:host:property:value
//evo.apiFunctions.call(this);


/* else {
    this.list_RemittanceName = [];
    //$scope.apiMemberList(s)
}*/
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
=======
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
>>>>>>> 3fdc632dd9c4bcabe40c65626a7fb70f428d0af1
