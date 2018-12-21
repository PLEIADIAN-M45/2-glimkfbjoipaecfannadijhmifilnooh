define(['myApp'], function(myApp) {

    myApp.$controller = function CookieID($compile, $rootScope, $timeout) {

        //console.log(evo.user);

        myApp.$scope.dataset = [
        {
            method: 'author',
            title: evo.user.author.title,
            value: evo.user.author.value,
            icon: 'user circle',
            category: '汇款户名',
            sites: [{
                method: 'GetMemberList',
                param: 'f_RemittanceName',
                value: evo.user.author.value,
                port: '26'
            }, {
                method: 'GetMemberList',
                param: 'f_RemittanceName',
                value: evo.user.author.value,
                port: '35'
            }, {
                method: 'GetMemberList',
                param: 'f_RemittanceName',
                value: evo.user.author.value,
                port: '17'
            }, {
                method: 'GetMemberList',
                param: 'AccountName',
                value: evo.user.author.value,
                port: '16'
            }]
        },
        {
            method: 'locate',
            port: '0',
            title: evo.user.locate.title,
            value: evo.user.locate.value,
            result: {
                country: evo.user.locate.country,
                province: evo.user.locate.province,
                city: evo.user.locate.city,
            },
            icon: 'map marker',
            category: '登入地区',
            sites: [{
                method: 'getAllIPAddress',
                value: evo.user.locate.value,
                port: evo.user.siteNumber,
                rows: evo.user.regions,
                uniqueId: evo.user.uniqueId
            }]
        }, {
            method: 'mobile',
            title: evo.user.mobile.title,
            value: evo.user.mobile.value,
            result: {
                province: evo.user.mobile.province,
                city: evo.user.mobile.city,
            },
            port: evo.siteNumber,
            icon: 'phone square',
            category: '手机号码',
            sites: [{
                method: 'GetMemberList',
                param: 'txtPhoto',
                value: evo.user.mobile.value,
                port: '26',
                hide: (evo.siteNumber == '26')
            }, {
                method: 'GetMemberList',
                param: 'txtPhoto',
                value: evo.user.mobile.value,
                port: '35',
                hide: (evo.siteNumber == '35')
            }, {
                method: 'GetMemberList',
                param: 'txtPhoto',
                value: evo.user.mobile.value,
                port: '17',
                hide: (evo.siteNumber == '17')
            }, {
                method: 'GetMemberList',
                param: 'CellPhone',
                value: evo.user.mobile.value,
                port: '16',
                hide: (evo.siteNumber == '16')
            }]
        }, {
            method: 'idcard',
            title: evo.user.idcard.title,
            value: evo.user.idcard.value,
            result: {
                province: evo.user.idcard.province,
                city: evo.user.idcard.city,
                area: evo.user.idcard.area,
            },
            port: '0',
            icon: 'id card',
            category: '身份证号',
            sites: [{
                method: 'GetMemberList',
                param: 'txtIdCard',
                value: evo.user.idcard.value,
                port: '26',
                hide: (evo.siteNumber == '26')
            }, {
                method: 'GetMemberList',
                param: 'txtIdCard',
                value: evo.user.idcard.value,
                port: '35',
                hide: (evo.siteNumber == '35')
            }, {
                method: 'GetMemberList',
                param: 'txtIdCard',
                value: evo.user.idcard.value,
                port: '17',
                hide: (evo.siteNumber == '17')
            }, {
                method: 'GetMemberList',
                param: 'IDNumber',
                value: evo.user.idcard.value,
                port: '16',
                hide: (evo.siteNumber == '16')
            }]
        }];

        evo.user.banker.forEach(function(item, index) {
            if (item.title == "") { return }
            myApp.$scope.dataset.push({
                method: 'banker',
                title: item.title,
                value: item.value,
                result: {
                    province: item.province,
                    city: item.city,
                    meta: item.name,
                },
                icon: 'cc visa',
                category: '银行账号',
                sites: [{
                    method: 'GetMemberList',
                    param: 'f_BankAccount',
                    value: item.value,
                    port: '26',
                    hide: (evo.siteNumber == '26')
                }, {
                    method: 'GetMemberList',
                    param: 'f_BankAccount',
                    value: item.value,
                    port: '35',
                    hide: (evo.siteNumber == '35')
                }, {
                    method: 'GetMemberList',
                    param: 'f_BankAccount',
                    value: item.value,
                    port: '17',
                    hide: (evo.siteNumber == '17')
                }, {
                    method: 'GetMemberList',
                    param: 'PayeeAccountNo',
                    value: item.value,
                    port: '16',
                    hide: (evo.siteNumber == '16')
                }]
            })
        });
        myApp.$scope.$apply();
    };

})