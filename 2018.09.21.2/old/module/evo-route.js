define([], function() {
    'use strict';
    class Route {
        constructor() {
            this.version = '7.0';
        }
        get host() {
            var _host = location.host.split('.')[1];
            if (location.pathname.includes('company')) {
                return 'company';
            }
            if (location.pathname.includes('layout')) {
                return 'lottery';
            }
            if (location.port == "8876") {
                return "wa111";
            }
            if (location.host == "127.0.0.1") {
                return "wa111";
            }
            if (location.host == "127.0.0.1:16") {
                return "ku711";
            }

            switch (_host) {
                case "github":
                    return "wa111";
                    break;
                case "tp33":
                    return "wa111";
                    break;
                default:
                    return _host;
                    break;
            }
        }

        get filename() {
            var _filename = location.pathname.split('/').pop().split('.')[0];
            return _filename;
        }

        get domain() {
            return location.host.split('.');
        }

        get route() {
            if (this.filename) {
                var _route = this.filename.toLowerCase();
                switch (_route) {
                    case "IGetMemberInfo".toLowerCase():
                    case "SameBrowserList".toLowerCase():
                    case "WebMemberInfo".toLowerCase():
                    case "WebMemberInfoForPhoto".toLowerCase():
                    case "MemberLoginLog".toLowerCase():
                        _route = "MemberLoginLog";
                        break;
                    case "EditMemberInfoManage".toLowerCase():
                    case "MemberModify".toLowerCase():
                        _route = "MemberModify";
                        break;
                    case "MemberInfoManage".toLowerCase():
                    case "MemberList".toLowerCase():
                        _route = "MemberList"
                        break;
                    /*case "BonusLog".toLowerCase():
                    case "DepositBonus".toLowerCase():
                        _route = "MemberBonus"
                        break;*/
                        //https://bk.ku711.net/member/Bonus/BonusLog
                    case "Member".toLowerCase():
                    case "Index".toLowerCase():
                        _route = "Index";
                        break;
                    case "signin".toLowerCase():
                    case "Login".toLowerCase():
                        _route = "Login";
                        break;
                    case "DeltaBank".toLowerCase():
                    case "DeltaOnline".toLowerCase():
                    case "DeltaWeChat".toLowerCase():
                    case "DeltaAlipay".toLowerCase():
                    case "WithdrawalsBank".toLowerCase():
                    case "AstropayWithdrawals".toLowerCase():
                        _route = "Cashflow";
                        break;



                    default:
                        return undefined;
                        break;
                }

                evo.extend = this.host + '/' + _route;
                return _route;
            }
        }
    }
    return Route;
})