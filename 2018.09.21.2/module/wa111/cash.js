define(['myApp', 'moment', 'extension', 'common', 'semantic'], function(myApp, moment) {

    auto_clean();

    var clipboard = new Object();
    Object.defineProperty(clipboard, 'copyText', {
        get: function() {
            return copyText;
        },
        set: function(value) {
            copyText = value;
            document.execCommand("copy");
        }
    });
    document.oncopy = function(e) {
        if (window.getSelection().type === "Caret") {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData("text/plain", clipboard.copyText);
                console.clear();
                console.log('目前剪贴板内容：', clipboard.copyText.toString());
            } else if (window.clipboardData) {
                window.clipboardData.setData("Text", clipboard.copyText);
            }
        }
    };
    var shorcuts = function() {
        if (evo.filename === 'WithdrawalsBank' || evo.filename === "AstropayWithdrawals") {
            return {
                "1": {
                    name: "reasons",
                    text: "催促取款",
                    color: "violet"
                },
                "2": {
                    name: "reasons",
                    text: "未收到款",
                    color: "violet"
                }
            };
        } else {
            return {
                "1": {
                    name: "reasons",
                    text: "催促存款",
                    color: "violet"
                },
                "2": {
                    name: "reasons",
                    text: "更正账本",
                    color: "violet"
                },
                "3": {
                    name: "reasons",
                    text: "更正金额",
                    color: "violet"
                },
                "4": {
                    name: "reasons",
                    text: "查询是否入账",
                    color: "violet"
                },
                "+": {
                    name: "receipt",
                    text: "有明细",
                    color: "green"
                },
                "-": {
                    name: "receipt",
                    text: "无明细",
                    color: "pink"
                }
            };
        }
    };

    var getTrasaction = function(tr) {
        var sncodes = function() {
            var c = column[arguments.callee.name];
            return tr.cells[c].textContent.trim();
        };
        var account = function() {
            var c = column[arguments.callee.name];
            var label = tr.cells[c].querySelector('span');
            if (label == null) {
                return tr.cells[c].textContent.trim() + '-' + evo.channel
            } else {
                return label.textContent.trim() + '-' + evo.channel;
            }
        };
        var bankbuk = function() {
            var c = column[arguments.callee.name];
            var select = tr.cells[c].querySelector('select');
            if (select !== null) {
                return select.selectedOptions[0].textContent;
            } else {
                return tr.cells[c].textContent.trim();
            }
        };
        var amounts = function() {
            var c = column[arguments.callee.name];
            return parseInt(tr.cells[c].textContent.trim().replace(',', ''));
        };
        var gateway = function() {
            var c = column[arguments.callee.name];
            if (isNaN(c)) {
                return column.gateway;
            } else {
                var string = tr.cells[c].textContent.trim();
                var regexp = /^\d{3}/g;
                var match = regexp.test(string);
                if (match) {
                    return jsonCode.Font_chakanchongzhiliebiao;
                } else {
                    return string;
                }
            }
        };
        var reasons = function() {
            return null;
        };
        var receipt = function() {
            return null;
        };
        var senders = function() {
            return evo.config.private.username;
        };
        var postime = function() {
            return moment().format('HH:mm');
        };
        var obj = {
            sncodes: sncodes(),
            account: account(),
            bankbuk: bankbuk(),
            amounts: amounts(),
            gateway: gateway(),
            reasons: reasons(),
            receipt: receipt(),
            senders: senders(),
            postime: postime()
        }

        if (evo.filename === 'WithdrawalsBank') {
            delete obj.receipt;
        }

        return obj;
    }


    myApp.controller('myCtrl', function($scope) {
        $scope.extensionId = evo.extensionId;
        $scope.color = new Object();
        $scope.shorcuts = shorcuts();
        document.onkeydown = function(e) {
            var shorcut = $scope.shorcuts[e.key];
            if (shorcut && $scope.order) {
                $scope.$apply(function() {
                    $scope.order[shorcut.name] = shorcut.text;
                    $scope.color[shorcut.name] = shorcut.color;
                    clipboard.copyText = Object.values($scope.order);
                });
            }
        };

        var isCn = window.parent.isCn;

        var setColumn = function(i, th) {
            //console.log(th.outerText);
            switch (th.outerText) {
                case jsonCode.Font_xuhao:
                    //case '序号':
                    column.sncodes = i;
                    break;
                case jsonCode.Font_zhangben:
                case jsonCode.Font_yibaozhanghu:
                case jsonCode.Font_alipaybookname:
                case jsonCode.Font_duiyin:
                case jsonCode.Font_alipayzhangben: //Rượu
                case jsonCode.Font_dsgs: //Công ty môi giới
                    //case "帐本":
                    //case "代收账户":
                    //case "支付宝帐本":
                    //case "兑银":
                    column.bankbuk = i;
                    break;
                case jsonCode.Font_chongzhizhe:
                case jsonCode.Font_AccountFont:
                case jsonCode.Font_duihuanzhe:
                    //case "存款者":
                    //case "帐号":
                    //case "兑换者":
                    column.account = i;
                    break;
                case jsonCode.Font_chongzhileixing:
                case jsonCode.Font_chongzhifangshi:
                case jsonCode.Font_chongzhifangshi:
                case jsonCode.Font_BankNumber:
                    column.gateway = i;
                    break;
                case jsonCode.Font_chongzhidianshu:
                case jsonCode.Font_duihuandianshu:
                    column.amounts = i;
                    break;
            }
            switch (evo.filename) {
                case 'DeltaBank':
                    /*if (isTw) {
                        column.gateway = jsonCode.Font_chakanchongzhiliebiao;
                    }*/
                    break;
                case 'DeltaWeChat':
                    if (isCn == "true") {
                        column.gateway = jsonCode.Font_chakanWeChat;
                    }
                    break;
                case 'DeltaAlipay':
                    if (isCn == "true") {
                        column.gateway = jsonCode.Font_chakanzhifubao;
                    }
                    break;
                case 'WithdrawalsBank':
                    column.gateway = jsonCode.Font_chakanduijiangliebiao;
                    break;
                case 'AstropayWithdrawals':
                    column.gateway = jsonCode.Font_Asdkqk; //"Astropay点卡取款"
                    break;
            }
        }

        var $target = document.getElementById('paging')

        $target.addEventListener('DOMNodeInserted', function(e) {
            //console.log(e);
            if (e.relatedNode.id !== 'paging') {
                return
            };
            if (window.column === undefined) {
                window.column = {};
                $('#sample-table-1>thead>tr>th').each(setColumn);
            }
            $('#sample-table-1>tbody>tr').each(function(i, tr) {
                $(tr).click(function() {
                    $scope.$apply(function() {
                        clipboard.copyText = '';
                        $scope.order = new getTrasaction(tr);
                    });
                });
            });
        });
    });

    async function exec() {

        var config = await extension.localStorage.getItem('config')
        evo.config = config;

        $('<directive>', {
            url: 'components/cashflow.html'
        }).appendTo('.table-header');

        angular.bootstrap(document, ['myApp']);
    }

    exec();
})