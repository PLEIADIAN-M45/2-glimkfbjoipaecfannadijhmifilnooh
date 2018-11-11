var UpdateMemberRisksInfoBackendEnum, OBSApp;
(function(n) {
    var t;
    (function(t) {
        var wu = function() {
            function yt() {
                this.SelectorLanguage = new t.MutiSelectorLanguage;
                this.SelectorLanguageForBank = new t.MutiSelectorLanguage;
                this.SelectorLanguagePleaseSelect = new t.MutiSelectorLanguage;
                this.ShowCustomerQueField = !1;
                this.IsQueryByMemeberInfo = !1;
                this.IsQuery = !1;
                this.IsCheckAll = !1;
                this.MemberWithdrawalBankInfoCount = 0;
                this.MemberDepositAliPayInfoCount = 0;
                this.MemberDepositWeiXinInfoCount = 0;
                this.GetAccountBookLevelInput = {
                    PaywayID: "BA",
                    DirectorID: "",
                    LevelType: 0
                };
                this.GetAliPayLevelInput = {
                    PaywayID: "AP",
                    DirectorID: "",
                    LevelType: 0
                };
                this.GetWeChatLevelInput = {
                    PaywayID: "WC",
                    DirectorID: "",
                    LevelType: 0
                };
                this.GetLoginMutipleDeviceList = [];
                this.GetLoginMutipleDeviceModel = new rt;
                this.LoginMutiplePageSize = 10;
                this.LoaPageSize = 5;
                this.IsQueryPhoneLocalInfo = !1;
                this.IsIdentityValid = !1;
                this.IsCellPhoneIsVerified = !0;
                this.BasicIsEditAccountNameNoMask = !1;
                this.BasicIsEditIdentity = !1;
                this.BasicIsEditIdentityNoMask = !1;
                this.BasicIsEmailNoMask = !1;
                this.BasicIsCellPhone = !1;
                this.BasicIsCellPhoneNoMask = !1;
                this.BasicIsEditAddress = !1;
                this.BasicIsEditAddressNoMask = !1;
                this.BasicIsEditReceiveSMS = !1;
                this.BasicIsEditUseWithdrawalSecurityCode = !1;
                this.FinanceMemberStatusPermissionList = [];
                this.FinanceIsEditAccountBookLevel = !1;
                this.FinanceIsEditAliPayLevel = !1;
                this.FinanceIsEditWeChatLevel = !1;
                this.BankIsEditBankAccount = !1;
                this.BankIsPayeeAccountNoNoMask = !1;
                this.AliPayIsEditAliPayAccountNo = !1;
                this.AliPayAliPayAccountNoMask = !1;
                this.RiskIsQueryLoginLog = !1;
                this.GamePermissionList = [];
                this.GameIsEditLockLVUp = !1;
                this.GameIsEditPlatformTurnover = !1;
                this.DepositIsEditWithdrawalFeeEnable = !1;
                this.DepositIsEditWithdrawalFeeWithdrawalCount = !1;
                this.DepositIsEditWithdrawalFeeWithdrawalFee = !1;
                this.InputBankCodeID = [];
                this.OuputBankCodeID = [];
                this.OuputBankProID = [];
                this.OuputBankCityID = [];
                this.Times = [{
                    Text: n.Helpers.ChangeLanguage("無限制"),
                    Value: 0
                }, {
                    Text: 1 + n.Helpers.ChangeLanguage("次數"),
                    Value: 1
                }, {
                    Text: 2 + n.Helpers.ChangeLanguage("次數"),
                    Value: 2
                }, {
                    Text: 3 + n.Helpers.ChangeLanguage("次數"),
                    Value: 3
                }, {
                    Text: 4 + n.Helpers.ChangeLanguage("次數"),
                    Value: 4
                }, {
                    Text: 5 + n.Helpers.ChangeLanguage("次數"),
                    Value: 5
                }, {
                    Text: 6 + n.Helpers.ChangeLanguage("次數"),
                    Value: 6
                }, {
                    Text: 7 + n.Helpers.ChangeLanguage("次數"),
                    Value: 7
                }, {
                    Text: 8 + n.Helpers.ChangeLanguage("次數"),
                    Value: 8
                }, {
                    Text: 9 + n.Helpers.ChangeLanguage("次數"),
                    Value: 9
                }, ];
                this.LogMapper = [{
                    Value: "true",
                    Text: "是"
                }, {
                    Value: "false",
                    Text: "否"
                }];
                this.SearchMemberInfoManage = {
                    AccountID: "",
                    IDNumber: "",
                    RigistedIP: "",
                    TotalDepositAmount: null,
                    AccountNumber: "",
                    AccountName: "",
                    Email: "",
                    PhoneVerified: null,
                    IDVerified: null,
                    MinDeposit: null,
                    MaxDeposit: null,
                    StartRegistedTime: "",
                    EndRegistedTime: "",
                    PageNumber: 0,
                    RecordCounts: 99999,
                    OrderField: "",
                    Desc: "true",
                    TotalDepositBonus: null,
                    AccountBookLevel: "",
                    AliPayLevel: "",
                    WeChatLevel: "",
                    CellPhone: "",
                    IsBlackList: null,
                    LevelType: null,
                    MemberStatus: null,
                    IsFisrstDeposit: "",
                    MemberMemoType: null,
                    TransferOutStatus: null,
                    IsLogIn: null,
                    TestType: null,
                    AgencyID: "",
                    PayeeAccountNo: "",
                    LineType: ""
                };
                this.VerifyIdentityModel = {
                    Identitycard: "",
                    AccountID: "",
                    EnabledVerified: !0,
                    Name: "",
                    VerifyUsage: 1,
                    CellPhone: ""
                };
                this.VerifyPhoneResultModel = {
                    Shouji: "",
                    Province: "",
                    City: "",
                    Company: "",
                    Cardtype: ""
                };
                this.MemberSNInfoBackendByVerifyIdentity = {
                    AccountID: "",
                    IDNumber: "",
                    AccountName: "",
                    RecordCounts: 20,
                    PageNumber: 0,
                    OrderField: "",
                    Desc: "true"
                };
                this.ReportTotal = {
                    TotalBetResult: 0,
                    TotalBetAmount: 0,
                    TotalBetCount: 0
                };
                this.AccountID = jQuery("#AccountID").val();
                this.MemberAccountType = new a;
                this.MemberAccountType = {
                    LineType: jQuery("#LineType").val(),
                    TestType: jQuery("#TestType").val()
                };
                this.SelectedAnency = [];
                this.UpdateEditMemberInfoManage = new i;
                this.EditMemberInfoManage = {
                    AccountID: this.AccountID
                };
                this.MemberSNInfoBackendUpgradeModelInput = new u;
                this.OldMemberBaseInfo = new i;
                this.NewMemberBaseInfo = new i;
                this.OldMemberSNInfoBackendUpgrade = new u;
                this.NewMemberSNInfoBackendUpgrade = new u;
                this.AccountLevelListModel = new it;
                this.UpdateEditMemberRisksInfo = new v;
                this.EditMemberRisksInfo = {
                    AccountID: this.AccountID
                };
                this.OldAgencyID = new h;
                this.NewAgencyID = new h;
                this.NewMemberRisksInfo = new c;
                this.OldMemberRisksInfo = new c;
                this.NewCashFlow = [];
                this.OldCashFlow = [];
                this.NewGameStatus = [];
                this.OldGameStatus = [];
                this.OldBlackList = new l;
                this.NewBlackList = new l;
                this.GetMemberPlatformTurnoverDisabledByConditionInput = new ot;
                this.GetMemberPlatformTurnoverDisabledByConditionInput.AccountID = this.AccountID;
                this.GetMemberPlatformTurnoverDisabledByConditionOutput = [];
                this.CheckGameID = [];
                this.CreateMemberPlatformTurnoverDisabledInput = new st;
                this.CreateMemberPlatformTurnoverDisabledInput.AccountID = this.AccountID;
                this.UpdateEditMemberWithdrawalLimitSurchargeSetting = new y;
                this.EditMemberWithdrawalLimitSurchargeSetting = {
                    AccountID: this.AccountID
                };
                this.DefaultEditMemberWithdrawalLimitSurchargeSetting = {
                    AccountID: this.AccountID,
                    WithdrawalLimitType: 1,
                    WithdrawalLimit: 1,
                    WithdrawalLimitSurcharge: 0,
                    SurchargeMode: 1,
                    WithdrawalLimitSurcharge_2: 0,
                    WithdrawalLimitSurcharge_3: 0,
                    WithdrawalSurchargePercent: 0,
                    WithdrawalSurchargeLowLimit: 0,
                    WithdrawalSurchargeHighLimit: 0,
                    WithdrawalLimitSurcharge_4: 0,
                    WithdrawalReachLimitAmount: 0,
                    WithdrawalNoReachLimitSurcharge: 0,
                    Visible: "false"
                };
                this.QueryAlertModuleModel = new p;
                this.QueryAlertModuleModel.DisplayArea = "0";
                this.AlertModuleSelect = new w;
                this.SearchAlertInfoModel = new b;
                this.SearchMemberAlertInfoMultiplayer = [];
                this.AlertInfo = new t.AlertInfo;
                this.DisplayAreaList = [{
                    Id: "1",
                    Name: n.Helpers.ChangeLanguage("會員列表")
                }, {
                    Id: "2",
                    Name: n.Helpers.ChangeLanguage("存款列表")
                }, {
                    Id: "3",
                    Name: n.Helpers.ChangeLanguage("提款列表")
                }, {
                    Id: "4",
                    Name: n.Helpers.ChangeLanguage("回電服務")
                }];
                this.EditGetMemberLoginLogBackendByAccountID = {
                    AccountID: this.AccountID,
                    StartTime: "",
                    EndTime: "",
                    PageNumber: 0,
                    RecordCounts: 20,
                    OrderField: "",
                    Desc: !0
                };
                this.GetMemberWithdrawalBankInfoBackendByAccountIDInput = new nt;
                this.GetMemberWithdrawalBankInfoBackendByAccountIDInput.AccountID = this.AccountID;
                this.GetMemberWithdrawalBankInfoBackendByAccountIDOutput = [];
                this.GetMemberWithdrawalBankInfoBackendByAccountIDCheck = [];
                this.GetMemberWithdrawalBankInfoBackendByAccountIDCache = [];
                this.BankInfoList = [];
                this.SelectorLanguageForBank.nothingSelected = n.Helpers.ChangeLanguage("請選擇銀行");
                this.SelectorLanguagePleaseSelect.nothingSelected = n.Helpers.ChangeLanguage("請選擇");
                this.GetCityInfoByLanguageCodeInput = new k;
                this.GetBranchInfoByLanguageCodeInput = new d;
                this.VerifyBankAccountExistModel = new ct;
                this.GetMemberDWAliPayInfoByAccountIDInput = new g;
                this.GetMemberDWAliPayInfoByAccountIDInput.AccountID = this.AccountID;
                this.GetMemberDWAliPayInfoByAccountIDOutput = [];
                this.GetMemberDWAliPayInfoByAccountIDCheck = [];
                this.GetMemberDWAliPayInfoByAccountIDCache = [];
                this.GetMemberDWWeiXinInfoByAccountIDInput = new ht;
                this.GetMemberDWWeiXinInfoByAccountIDInput.AccountID = this.AccountID;
                this.GetMemberDWWeiXinInfoByAccountIDOutput = [];
                this.GetMemberDWWeiXinInfoByAccountIDCheck = [];
                this.GetMemberDWWeiXinInfoByAccountIDCache = [];
                this.GetMemberRiskInfoAccountingBackendByAccountIDInput = new ut;
                this.GetMemberRiskInfoAccountingBackendByAccountIDInput.AccountID = this.AccountID;
                this.GetMemberRiskInfoAccountingBackendByAccountIDOutput = new ft;
                this.UpdateMemberRiskInfoAccountingBackendInput = new r;
                this.OldMemberRiskInfoAccountingBackendLog = new r;
                this.NewMemberRiskInfoAccountingBackendLog = new r;
                this.GetMemberDWCountLogByAccountIDModel = new vt;
                this.GetMemberDWCountLogByAccountIDModel = {
                    AccountID: this.AccountID,
                    ActionType: 1,
                    PaywayID: "",
                    DealType: 1
                };
                this.GetMemberDWCountLogByAccountIDResultList = [];
                this.GetOtherPaymentSetting = new lt;
                this.GetMemberOPAccountBookSettingByAccountIDPostModel = new at;
                this.GetMemberOPAccountBookSettingByAccountIDPostModel.AccountID = this.AccountID;
                this.OriginalMemberOPAccountBookSettingModel = [];
                this.OldMemberOPAccountBookSettingModel = [];
                this.NewMemberOPAccountBookSettingModel = [];
                this.CreateMemberOPAccountBookSettingPostModel = new t.CreateMemberOPAccountBookSettingPostModel;
                this.OldUpdateMemberInfoPWDModel = new f;
                this.NewUpdateMemberInfoPWDModel = new f;
                this.UpdateMemberInfoPWDModelField = new t.LogFields;
                this.UpdateMemberInfoPWDModelField.DataID = "AccountID";
                this.UpdateMemberInfoPWDModelField.PWD = new t.LogFieldData;
                this.UpdateMemberInfoPWDModelField.PWD.FieldDisplayName = n.Helpers.ChangeLanguage("帳號密碼");
                this.OldUpdateMemberInfoWithdrawalPWDModel = new e;
                this.NewUpdateMemberInfoWithdrawalPWDModel = new e;
                this.UpdateMemberInfoWithdrawalPWDModelField = new t.LogFields;
                this.UpdateMemberInfoWithdrawalPWDModelField.DataID = "AccountID";
                this.UpdateMemberInfoWithdrawalPWDModelField.WithdrawalPWD = new t.LogFieldData;
                this.UpdateMemberInfoWithdrawalPWDModelField.WithdrawalPWD.FieldDisplayName = n.Helpers.ChangeLanguage("提款密碼");
                this.OldMemberInfoPWDForLogModelInput = new o;
                this.NewMemberInfoPWDForLogModelInput = new o;
                this.MemberInfoPWDForLogModelField = new t.LogFields;
                this.MemberInfoPWDForLogModelField.DataID = "AccountID";
                this.MemberInfoPWDForLogModelField.PWD = new t.LogFieldData;
                this.MemberInfoPWDForLogModelField.PWD.FieldDisplayName = n.Helpers.ChangeLanguage("帳號密碼");
                this.MemberInfoPWDForLogModelField.WithdrawalPWD = new t.LogFieldData;
                this.MemberInfoPWDForLogModelField.WithdrawalPWD.FieldDisplayName = n.Helpers.ChangeLanguage("提款密碼");
                this.GetMemberSNInfoBackendReportGetByAccountIDInput = new s;
                this.GetGameListResult = [];
                this.GetGameListAllResult = [];
                this.GetMemberSNInfoMemberTotalResultGetByAccountIDInpute = new s;
                this.GetMemberSNInfoMemberTotalResultGetByAccountIDResult = new tt;
                this.MemberChangeRecordPostModel = {
                    AccountID: this.AccountID,
                    PageNumber: 0,
                    RecordCounts: 20,
                    OrderField: "CreateTime",
                    Desc: "true"
                };
                this.MemberBaseInfoField = new t.LogFields;
                this.MemberBaseInfoField.DataID = "AccountID";
                this.MemberRisksInfoField = new t.LogFields;
                this.MemberRisksInfoField.DataID = "AccountID";
                this.BlackListField = new t.LogFields;
                this.BlackListField.DataID = "AccountID";
                this.MemberRiskInfoAccountingBackendField = new t.LogFields;
                this.MemberRiskInfoAccountingBackendField.DataID = "AccountID";
                this.UpdateMemberWithdrawalBankInfoField = new t.LogFields;
                this.UpdateMemberWithdrawalBankInfoField.DataID = "AccountID";
                this.DeleteMemberWithdrawalBankInfoField = new t.LogFields;
                this.DeleteMemberWithdrawalBankInfoField.DataID = "AccountID";
                this.DeleteMemberWithdrawalBankInfoField.PayeeAccountNo = new t.LogFieldData;
                this.DeleteMemberWithdrawalBankInfoField.PayeeAccountNo.FieldDisplayName = n.Helpers.ChangeLanguage("(銀行帳號維護)會員提款匯款帳號");
                this.MemberSNInfoBackendUpgradeField = new t.LogFields;
                this.MemberSNInfoBackendUpgradeField.DataID = "AccountID";
                this.UpdateMemberDWAliPayInfoBackendField = new t.LogFields;
                this.UpdateMemberDWAliPayInfoBackendField.DataID = "AccountID";
                this.UpdateMemberDWAliPayInfoBackendField.AliPayAccountNo = new t.LogFieldData;
                this.UpdateMemberDWAliPayInfoBackendField.AliPayAccountNo.FieldDisplayName = n.Helpers.ChangeLanguage("(支付寶帳號維護)會員存款匯款帳號");
                this.DeleteMemberDWAliPayInfoField = new t.LogFields;
                this.DeleteMemberDWAliPayInfoField.DataID = "AccountID";
                this.DeleteMemberDWAliPayInfoField.AliPayAccountNo = new t.LogFieldData;
                this.DeleteMemberDWAliPayInfoField.AliPayAccountNo.FieldDisplayName = n.Helpers.ChangeLanguage("(支付寶帳號維護)會員存款匯款帳號");
                this.LogQueryCondition = new t.MemberInfoLogQueryByMultiAccountID;
                this.LogQueryCondition.Platform = PlatformEnum.Unspecified;
                this.DatePickerList = [{
                    Text: "今天",
                    Value: 0
                }, {
                    Text: "昨天",
                    Value: 1
                }, {
                    Text: "本周",
                    Value: 2
                }, {
                    Text: "上周",
                    Value: 3
                }, {
                    Text: "本月",
                    Value: 4
                }, {
                    Text: "上月",
                    Value: 5
                }, {
                    Text: "全部",
                    Value: 6
                }];
                this.MemberInfoContentQueryInput = new et;
                this.ProvinceInfoList = new t.ProvinceInfo
            }
            return yt
        }(), a, i, v, yt, pt, wt, y, p, w, bt, b, kt, dt, gt, ni, f, e, o, ti, ii, ri, k, d, g, ui, nt, fi, ei, oi, si, hi, ci, s, li, tt, ai, vi, yi, h, it, c, pi, rt, wi, l, ut, ft, r, bi, ki, di, gi, nr, tr, ir, rr, et, ot, ur, st, fr, er, or, u, sr, ht, hr, cr, lr, ar, vr, yr, pr, wr, br, kr, dr, ct, gr, nu, tu, iu, ru, uu, fu, eu, ou, su, hu, cu, lu, lt, au, at, vu, yu, vt, pu;
        t.EditMemberInfoManageViewModel = wu;
        a = function() {
            function n() {}
            return n
        }();
        t.MemberAccountType = a;
        i = function() {
            function n() {}
            return n
        }();
        t.EditMemberInfoManageModel = i;
        v = function() {
            function n() {}
            return n
        }();
        t.EditMemberRisksInfoModel = v;
        yt = function() {
            function n() {}
            return n
        }();
        t.CashFlowLimitRisk = yt;
        pt = function() {
            function n() {}
            return n
        }();
        t.Member_Platform_BlackListForSearch = pt;
        wt = function() {
            function n() {}
            return n
        }();
        t.Member_Platform_BlackList = wt;
        y = function() {
            function n() {}
            return n
        }();
        t.EditMemberWithdrawalLimitSurchargeSettingModel = y;
        p = function() {
            function n() {}
            return n
        }();
        t.AlertModuleModelForEdit = p;
        w = function() {
            function n() {}
            return n
        }();
        t.AlertModuleSelectModelForEdit = w;
        bt = function() {
            function n() {}
            return n
        }();
        t.AlertInfoModelForEdit = bt;
        b = function() {
            function n() {
                this.DisplayArea = "1"
            }
            return n
        }();
        t.AlertInfoConditionModelForEdit = b;
        kt = function() {
            function n() {
                this.AccountID = "";
                this.AccountName = ""
            }
            return n
        }();
        t.MemberAlertInfoMultiplayerForEdit = kt;
        dt = function() {
            function n() {}
            return n
        }();
        t.GetAlertTypeInfoByLanguageCodeConditionModelForEdit = dt;
        gt = function() {
            function n() {}
            return n
        }();
        t.GetAlertTypeInfoByLanguageCodeModelForEdit = gt;
        ni = function() {
            function n() {}
            return n
        }();
        t.DisplayAreaListForEdit = ni;
        f = function() {
            function n() {}
            return n
        }();
        t.MemberInfoPWDModel = f;
        e = function() {
            function n() {}
            return n
        }();
        t.MemberInfoWithdrawalPWDModel = e;
        o = function() {
            function n() {}
            return n
        }();
        t.MemberInfoPWDForLogModel = o;
        ti = function() {
            function n() {}
            return n
        }();
        t.GetMemberLoginLogBackendByAccountIDModel = ti;
        ii = function() {
            function n() {}
            return n
        }();
        t.GetBankCodeInfoByLanguageCodeForEditInfoManage = ii;
        ri = function() {
            function n() {}
            return n
        }();
        t.GetProvincesInfoByLanguageCodeForEditInfoManage = ri;
        k = function() {
            function n() {}
            return n
        }();
        t.GetCityInfoByLanguageCodeForEditInfoManage = k;
        d = function() {
            function n() {}
            return n
        }();
        t.GetBranchInfoByLanguageCode = d;
        g = function() {
            function n() {}
            return n
        }();
        t.GetMemberDWAliPayInfoByAccountID = g;
        ui = function() {
            function n() {
                this.IsSQL = !1;
                this.AliPayAccountNoShow = ""
            }
            return n
        }();
        t.GetMemberDWAliPayInfoByAccountIDModel = ui;
        nt = function() {
            function n() {}
            return n
        }();
        t.GetMemberWithdrawalBankInfoBackendByAccountID = nt;
        fi = function() {
            function n() {
                this.IsSQL = !1;
                this.PayeeAccountNoShow = "";
                this.BranchName = ""
            }
            return n
        }();
        t.GetMemberWithdrawalBankInfoBackendByAccountIDModel = fi;
        ei = function() {
            function n() {
                this.WithdrawalBankInfo = []
            }
            return n
        }();
        t.UpdateMemberWithdrawalBankInfoBackend = ei;
        oi = function() {
            function n() {
                this.WithdrawalBankInfo = []
            }
            return n
        }();
        t.UpdateMemberWithdrawalBankInfoBackendLog = oi;
        si = function() {
            function n() {
                this.BranchName = ""
            }
            return n
        }();
        t.WithdrawalBankInfo = si;
        hi = function() {
            function n() {}
            return n
        }();
        t.DepositAliPayInfo = hi;
        ci = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberRisksInfoBackendOther = ci;
        s = function() {
            function n() {}
            return n
        }();
        t.GetMemberSNInfoBackendReportGetByAccountIDInput = s;
        li = function() {
            function n() {}
            return n
        }();
        t.GetMemberSNInfoBackendReportGetByAccountIDResult = li;
        tt = function() {
            function n() {}
            return n
        }();
        t.GetMemberSNInfoMemberTotalResultGetByAccountIDResult = tt;
        ai = function() {
            function n() {
                this.DepositAliPayInfo = []
            }
            return n
        }();
        t.UpdateMemberDWAliPayInfoBackend = ai;
        vi = function() {
            function n() {}
            return n
        }();
        t.DeleteMemberDWAliPayInfo = vi;
        yi = function() {
            function n() {
                this.ServiceID = "";
                this.ServiceName = "";
                this.GameID = "";
                this.ServiceStatus = 0;
                this.TransferType = 0;
                this.Sort = null;
                this.HashKey = "";
                this.ConfirmUrl = "";
                this.NotifyURL = "";
                this.BetCount = 0;
                this.BetAmount = 0;
                this.BetResult = 0;
                this.IsShowMember = !1;
                this.IsRiskVisible = !1
            }
            return n
        }();
        t.GetAllGameList = yi;
        h = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberSNInfoBackendAgencyIDByAccountID = h;
        it = function() {
            function n() {}
            return n
        }();
        t.AccountLevelListForEditMemberInfo = it;
        c = function() {
            function n() {}
            return n
        }();
        t.MemberRisksInfoLog = c;
        pi = function() {
            function n() {}
            return n
        }();
        t.GetAccountBookLevelSettingByPaywayIdForEdit = pi;
        rt = function() {
            function n() {
                this.PageNumber = 0;
                this.RecordCounts = 20;
                this.OrderField = "";
                this.Desc = !0
            }
            return n
        }();
        t.GetMemberLoginLogDeviceNoByConditionModel = rt;
        wi = function() {
            function n() {}
            return n
        }();
        t.GetMemberLoginLogDeviceNoByConditionResult = wi;
        l = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberRisksInfoBackendIsBlackList = l;
        ut = function() {
            function n() {}
            return n
        }();
        t.GetMemberRiskInfoAccountingBackendByAccountID = ut;
        ft = function() {
            function n() {}
            return n
        }();
        t.GetMemberRiskInfoAccountingBackendByAccountIDModel = ft;
        r = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberRiskInfoAccountingBackend = r;
        bi = function() {
            function n() {}
            return n
        }();
        t.ProvincesInfoMember = bi;
        ki = function() {
            function n() {}
            return n
        }();
        t.ProvincesFilterModelMember = ki;
        di = function() {
            function n() {}
            return n
        }();
        t.CityInfoPostModelMember = di;
        gi = function() {
            function n() {}
            return n
        }();
        t.CityInfoResultMember = gi;
        nr = function() {
            function n() {}
            return n
        }();
        t.DistrictInfoPostModel = nr;
        tr = function() {
            function n() {}
            return n
        }();
        t.DistrictInfoResult = tr;
        ir = function() {
            function n() {}
            return n
        }();
        t.BankInfo = ir;
        rr = function() {
            function n() {}
            return n
        }();
        t.DeleteMemberWithdrawalBankInfo = rr;
        et = function() {
            function n() {}
            return n
        }();
        t.MemberInfoContentQuery = et;
        ot = function() {
            function n() {
                this.PageNumber = 0;
                this.RecordCounts = 999;
                this.OrderField = "";
                this.Desc = "true";
                this.IsCheckSetStatus = !1
            }
            return n
        }();
        t.GetMemberPlatformTurnoverDisabledByCondition = ot;
        ur = function() {
            function n() {}
            return n
        }();
        t.GetMemberPlatformTurnoverDisabledByConditionModel = ur;
        st = function() {
            function n() {
                this.GameID = []
            }
            return n
        }();
        t.CreateMemberPlatformTurnoverDisabled = st;
        fr = function() {
            function n() {}
            return n
        }();
        t.uType_GameID = fr;
        er = function() {
            function n() {}
            return n
        }();
        t.MemberChangeRecordResultModelForEditMemberInfo = er;
        or = function() {
            function n() {}
            return n
        }();
        t.EditMemberInfoManageLevelType = or;
        u = function() {
            function n() {}
            return n
        }();
        t.MemberSNInfoBackendUpgradeModel = u;
        sr = function() {
            function n() {}
            return n
        }();
        t.MemberSNInfoBackendUpgradeOutputModel = sr;
        ht = function() {
            function n() {}
            return n
        }();
        t.GetMemberDWWeiXinInfoByAccountID = ht;
        hr = function() {
            function n() {
                this.IsSQL = !1;
                this.LimitType = LimitTypeEnum.Unspecified
            }
            return n
        }();
        t.GetMemberDWWeiXinInfoByAccountIDModel = hr;
        cr = function() {
            function n() {
                this.DepositWeiXinInfo = []
            }
            return n
        }();
        t.UpdateMemberDWWeiXinInfoBankend = cr;
        lr = function() {
            function n() {}
            return n
        }();
        t.DepositWeiXinInfo = lr;
        ar = function() {
            function n() {}
            return n
        }();
        t.DeleteMemberDWWeiXinInfo = ar;
        vr = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberRisksInfoBackendIsFSuspension = vr;
        yr = function() {
            function n() {}
            return n
        }();
        t.UpdateMemberInfoPWDModel = yr;
        pr = function() {
            function n() {}
            return n
        }();
        t.EditMemberInfoManageBankInfo = pr;
        wr = function() {
            function n() {}
            return n
        }();
        t.ProvinceInfo = wr;
        br = function() {
            function n() {}
            return n
        }();
        t.NameKey = br;
        kr = function() {
            function n() {}
            return n
        }();
        t.ValueKey = kr;
        dr = function() {
            function n() {}
            return n
        }();
        t.errorlist = dr;
        ct = function() {
            function n() {
                this.GetMemberWithdrawalBankInfoByConditionModel = []
            }
            return n
        }();
        t.GetMemberWithdrawalBankInfoModel = ct;
        gr = function() {
            function n() {
                this.AccountID = "";
                this.PayeeAccountName = "";
                this.BankCodeID = ""
            }
            return n
        }();
        t.MemberWithdrawalBankInfoByConditionModel = gr;
        nu = function() {
            function n() {}
            return n
        }();
        t.GetMemberSNInfoMemberWithdrawalBankInfoByConditionResult = nu;
        tu = function() {
            function n() {}
            return n
        }();
        t.MemberInfoPolicyPayway = tu;
        iu = function() {
            function n() {}
            return n
        }();
        t.GetProvincesInfoByLanguageCodeModelForMemberInfo = iu;
        ru = function() {
            function n() {}
            return n
        }();
        t.GetProvincesInfoByLanguageCodeResultForMemberInfo = ru;
        uu = function() {
            function n() {
                this.OrderField = "";
                this.Desc = "true";
                this.RecordCounts = 999;
                this.PageNumber = 0
            }
            return n
        }();
        t.GetCityInfoByConditionPostModelForMemberInfo = uu;
        fu = function() {
            function n() {}
            return n
        }();
        t.GetCityInfoByConditionModelResultForMemberInfo = fu;
        eu = function() {
            function n() {}
            return n
        }();
        t.MemberInfoWalletSumLog = eu;
        ou = function() {
            function n() {
                this.Amount = 0
            }
            return n
        }();
        t.MemberInfoGetMemberDepositDailySumLogListByConditionResult = ou;
        su = function() {
            function n() {
                this.OrderField = "TransDoneTime";
                this.Desc = "true";
                this.PageNumber = 0;
                this.RecordCounts = 10
            }
            return n
        }();
        t.MemberInfoWalletSumLogQueryModel = su;
        hu = function() {
            function n() {
                this.OrderField = "TransDoneTime";
                this.Desc = "true";
                this.PageNumber = 0;
                this.RecordCounts = 10
            }
            return n
        }();
        t.MemberInfoWalletSumHistoryLogQueryModel = hu;
        cu = function() {
            function n() {
                this.Desc = "true";
                this.OrderField = "AccountingMonth";
                this.RecordCounts = 10;
                this.PageNumber = 0
            }
            return n
        }();
        t.MemberInfoGetMemberDailySumLogListByConditionModel = cu;
        lu = function() {
            function n() {
                this.Amount = 0;
                this.Surcharge = 0
            }
            return n
        }();
        t.MemberInfoGetMemberWithdrawalDailySumLogListByConditionResult = lu;
        lt = function() {
            function n() {}
            return n
        }();
        t.GetOtherPaymentSettingByConditionModel = lt;
        au = function() {
            function n() {}
            return n
        }();
        t.OtherPaymentSetting = au;
        at = function() {
            function n() {}
            return n
        }();
        t.GetMemberOPAccountBookSettingByAccountIDPostModel = at;
        vu = function() {
            function n() {}
            return n
        }();
        t.OPAccountBookModel = vu;
        yu = function() {
            function n() {
                this.OP_AccountBook = []
            }
            return n
        }();
        t.CreateMemberOPAccountBookSettingPostModel = yu;
        vt = function() {
            function n() {}
            return n
        }();
        t.GetMemberDWCountLogByAccountIDModel = vt;
        pu = function() {
            function n() {}
            return n
        }();
        t.GetMemberDWCountLogByAccountIDResult = pu
    }
    )(t = n.Models || (n.Models = {}))
}
)(OBSApp || (OBSApp = {})),
function(n) {
    n[n.Fail = 0] = "Fail";
    n[n.Success = 1] = "Success";
    n[n.BlackRemoveFail = 2] = "BlackRemoveFail";
    n[n.BlackAddFail = 3] = "BlackAddFail";
    n[n.BlackCheckFail = 4] = "BlackCheckFail";
    n[n.OpenDeposit = 5] = "OpenDeposit"
}(UpdateMemberRisksInfoBackendEnum || (UpdateMemberRisksInfoBackendEnum = {})),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n(n, t) {
                this.dataProvider = n;
                this.xpagerSvc = t
            }
            return n.prototype.GetBankCodeInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetBankCodeInfoList", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberSNInfoBackendByCondition = function(n) {
                var i = this
                  , t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo", HttpMethodEnum.Post, n).then(function(n) {
                    n.Data.Pager.TotalItemCount = n.Data.TotalItemCount;
                    n.Data.Pager = i.xpagerSvc.GetPager(n.Data.Pager);
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberSNInfoBackendByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberSNInfoBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberSNInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberSNInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.VerifyMemberInfoEmailCellPhone = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/VerifyMemberInfoEmailCellPhone", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberRisksInfoBackendByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberRisksInfoBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberRisksInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRisksInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberRisksInfoBackendIsFSuspension = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRisksInfoBackendIsFSuspension", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberRisksInfoBackendOther = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRisksInfoBackendOther", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberRisksInfoBackendIsBlackList = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRisksInfoBackendIsBlackList", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberMemoTypeByLanguageCode = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberMemoTypeByLanguageCodeToExpando", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.GetMemberWithdrawalLimitSurchargeSettingByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberWithdrawalLimitSurchargeSettingByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberWithdrawalLimitSurchargeSettingBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberWithdrawalLimitSurchargeSettingBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberAlertModuleBackendByValid = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberAlertModuleBackendByValid", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberAlertInfoBackendByMultiplayer = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetAlertTypeInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetAlertTypeInfoByLanguageCode", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.CreateMemberAlertInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/CreateMemberAlertInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberInfoPWD = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberInfoPWD", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberPlatformTurnoverDisabledByCondition = function(n) {
                var i = this
                  , t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberPlatformTurnoverDisabledByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    n.Data.Pager.TotalItemCount = n.Data.TotalItemCount;
                    n.Data.Pager = i.xpagerSvc.GetPager(n.Data.Pager);
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.CreateMemberPlatformTurnoverDisabled = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/CreateMemberPlatformTurnoverDisabled", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberLoginLogBackendByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberLoginLogBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberStatusByLanguageCode = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberStatusByLanguageCode", HttpMethodEnum.Get).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.GetBankCodeInfoList = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetBankCodeInfoListToExpando", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetProvincesInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetProvincesInfoByLanguageCodeToExpando", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetCityInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetCityInfoByLanguageCodeToExpando", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetDistrictInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetDistrictInfoByLanguageCode", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetBranchInfoByLanguageCode = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetBranchInfoByLanguageCodeToExpando", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.VerifyBankAccountExist = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/VerifyBankAccountExist", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberRiskInfoAccountingBackendByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberRiskInfoAccountingBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetAccountBookLevelSettingByPaywayId = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetAccountBookLevelSettingByPaywayId", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberRiskInfoAccountingBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRiskInfoAccountingBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberWithdrawalBankInfoBackendByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberWithdrawalBankInfoBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberWithdrawalBankInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberWithdrawalBankInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.DeleteMemberWithdrawalBankInfo = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/DeleteMemberWithdrawalBankInfo", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberDWAliPayInfoByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberDWAliPayInfoBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberDWAliPayInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberDWAliPayInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.DeleteMemberDWAliPayInfoModel = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/DeleteMemberDWAliPayInfo", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberDWWeiXinInfoByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberDWWeiXinInfoBackendByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.UpdateMemberDWWeiXinInfoBackend = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberDWWeiXinInfoBackend", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.DeleteMemberDWWeiXInfoModel = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/DeleteMemberDWWeiXinInfo", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetBackendAccountByAccountType = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/AgentAccount/GetBackendAccountByAccountType", HttpMethodEnum.Post, {
                    AccountType: 3
                }).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.UpdateMemberSNInfoBackendAgencyIDByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberSNInfoBackendAgencyIDByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberSNInfoBackendReportGetByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberSNInfoBackendReportGetByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberSNInfoMemberTotalResultGetByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberSNInfoMemberTotalResultGetByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetPlatformServiceInfoAll = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/GameManage/GetPlatformServiceInfoAllOrderByBackendSort", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.UpdateMemberSNInfoBackendModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberSNInfoBackendModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.UpdateMemberRiskInfoAccountingBackendModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRiskInfoAccountingBackendModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.MemberSNInfoBackendUpgradeModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/MemberSNInfoBackendUpgradeModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.MemberRiskInfoModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/MemberRiskInfoModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.UpdateMemberRisksInfoBackendIsBlackListModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberRisksInfoBackendIsBlackListModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.UpdateMemberWithdrawalBankInfoBackendModelToDescription = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/UpdateMemberWithdrawalBankInfoBackendModelToDescription", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.GetMemberLoginLogDeviceNoByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberLoginLogDeviceNoByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.CreateMemberBalanceLogBackEnd = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/PointManage/CreateEditMemberBalanceLogBackEnd", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberBalanceSummaryChangeRecordByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberBalanceSummaryChangeRecordByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetLevelType = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetLevelTypeInfoGetByLanguageCode", HttpMethodEnum.Get).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.MemberSNInfoBackendUpgrade = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/MemberSNInfoBackendUpgrade", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetVerifyPhoneLocal = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetVerifyPhoneLocal", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberSNInfoBackendByVerifyIdentityFromDBAPI = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberSNInfoBackendByConditionByVerifyIdentity", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetVerifyIdentityFromAPI = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetVerifyIdentity", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetPaywayList = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetPaywayList", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.GetWithdrawalPaywayList = function() {
                var n = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Withdrawal/GetPaywayListToWithdrawal", HttpMethodEnum.Post).then(function(t) {
                    n.resolve(t.Data)
                }).catch(function(t) {
                    n.reject(t)
                }),
                n.promise
            }
            ,
            n.prototype.GetDealTypeList = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetDealTypeList", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetProvincesInfoByLanguageCodeForMemberInfo = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetProvincesInfoByLanguageCode", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetCityInfoByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Common/GetCityInfoByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberWalletSumLogByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Deposit/GetMemberWalletSumLogByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberHistoryWalletSumLogByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/PaymentHistory/GetMemberWalletSumLogByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberDepositDailySumLogListByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Deposit/GetMemberDepositDailySumLogListByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberWithdrawalDailySumLogListByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/Withdrawal/GetMemberWithdrawalDailySumLogListByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetOtherPaymentByCondition = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/PaymentSetting/GetOtherPaymentSettingByCondition", HttpMethodEnum.Post, n).then(function(n) {
                    n.Data != null ? t.resolve(n.Data) : t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberOPAccountBookSettingByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/PaymentSetting/GetMemberOPAccountBookSettingByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    n.Data != null ? t.resolve(n.Data) : t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.CreateMemberOPAccountBookSetting = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/PaymentSetting/CreateMemberOPAccountBookSetting", HttpMethodEnum.Post, n).then(function(n) {
                    n.Data != null ? t.resolve(n.Data) : t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.prototype.GetMemberDWCountLogByAccountID = function(n) {
                var t = this.dataProvider.CreateDeferred();
                return this.dataProvider.Get("../api/MemberInfoManage/GetMemberDWCountLogByAccountID", HttpMethodEnum.Post, n).then(function(n) {
                    t.resolve(n.Data)
                }).catch(function(n) {
                    t.reject(n)
                }),
                t.promise
            }
            ,
            n.$name = "EditMemberInfoManageSvc",
            n.$inject = ["DataProvider", "XPagerSvc"],
            n
        }();
        n.EditMemberInfoManageSvc = t
    }
    )(t = n.Services || (n.Services = {}))
}(OBSApp || (OBSApp = {}));
OBSApp.RegisterAngular.RegisterService(OBSApp.Services.EditMemberInfoManageSvc.$name, OBSApp.Services.EditMemberInfoManageSvc),
function(n) {
    var t;
    (function(t) {
        var i = function() {
            function t(n, t, i, r, u, f, e, o, s, h) {
                this.CheckAllGetMemberPlatformTurnoverDisabled = !1;
                this.TempBankInfoList = [];
                this.OldIsDeposit = !1;
                this.WalletSumType = 0;
                this.TransType = 1;
                this.$filter = n;
                this.editMemberInfoManageSvc = t;
                this.appConfig = i;
                this.ngTableParams = r;
                this.xPagerSvc = u;
                this.qSvc = f;
                this.logSvc = e;
                this.diff = o;
                this.blockUI = s;
                this.displayAreaListArry = [];
                this.language = this.appConfig.LanguageCode;
                this.country = this.appConfig.Country;
                this.initializeViewModel();
                this.InitializeCkEditor();
                this.DivBlock();
                this.Loaded = !1;
                this.timeout = h
            }
            return t.prototype.DivBlock = function() {
                var i = this.blockUI.instances.get("tb_disable"), t;
                i.start(n.Helpers.ChangeLanguage("此區塊尚未有功能"));
                i.start(n.Helpers.ChangeLanguage("此區塊尚未有功能"));
                t = this.blockUI.instances.get("Ten");
                t.start(n.Helpers.ChangeLanguage("暫不開放"));
                t.start(n.Helpers.ChangeLanguage("暫不開放"))
            }
            ,
            t.prototype.InitializeCkEditor = function() {
                this.ckEditorOptions = {};
                this.ckEditorOptions.toolbar = [["Undo", "Redo"], ["TextColor"], ["Bold", "Italic"]];
                this.ckEditorOptions.allowedContent = !0
            }
            ,
            t.prototype.initializeViewModel = function() {
                var t = this, r = this.blockUI.instances.get("tb1"), i = this.blockUI.instances.get("tb2"), u = this.blockUI.instances.get("tb3"), f, e, o;
                r.start("Loading...");
                i.start("Loading...");
                u.start("Loading...");
                this.model = new n.Models.EditMemberInfoManageViewModel;
                this.model.BasicIsEditAccountNameNoMask = (jQuery("#hfBasicIsEditAccountNameNoMask").val() || "false") === "true";
                this.model.BasicIsEditIdentity = (jQuery("#hfBasicIsEditIdentity").val() || "false") === "true";
                this.model.BasicIsEditIdentityNoMask = (jQuery("#hfBasicIsEditIdentityNoMask").val() || "false") === "true";
                this.model.BasicIsEmailNoMask = (jQuery("#hfBasicIsEmailNoMask").val() || "false") === "true";
                this.model.BasicIsCellPhone = (jQuery("#hfBasicIsCellPhone").val() || "false") === "true";
                this.model.BasicIsCellPhoneNoMask = (jQuery("#hfBasicIsCellPhoneNoMask").val() || "false") === "true";
                this.model.BasicIsEditAddress = (jQuery("#hfBasicIsEditAddress").val() || "false") === "true";
                this.model.BasicIsEditAddressNoMask = (jQuery("#hfBasicIsEditAddressNoMask").val() || "false") === "true";
                this.model.BasicIsEditReceiveSMS = (jQuery("#hfBasicIsEditReceiveSMS").val() || "false") === "true";
                this.model.BasicIsEditUseWithdrawalSecurityCode = (jQuery("#hfBasicIsEditUseWithdrawalSecurityCode").val() || "false") === "true";
                f = jQuery("#hfFinanceMemberStatusPermissionList").val() || "";
                this.model.FinanceMemberStatusPermissionList = f.length > 0 ? f.split(",") : [];
                this.model.FinanceIsEditAccountBookLevel = (jQuery("#hfFinanceIsEditAccountBookLevel").val() || "false") === "true";
                this.model.FinanceIsEditAliPayLevel = (jQuery("#hfFinanceIsEditAliPayLevel").val() || "false") === "true";
                this.model.FinanceIsEditWeChatLevel = (jQuery("#hfFinanceIsEditWeChatLevel").val() || "false") === "true";
                this.model.BankIsEditBankAccount = (jQuery("#hfBankIsEditBankAccount").val() || "false") === "true";
                this.model.BankIsPayeeAccountNoNoMask = (jQuery("#hfBankIsPayeeAccountNoNoMask").val() || "false") === "true";
                this.model.AliPayIsEditAliPayAccountNo = (jQuery("#hfAliPayIsEditAliPayAccountNo").val() || "false") === "true";
                this.model.AliPayAliPayAccountNoMask = (jQuery("#hfAliPayAliPayAccountNoMask").val() || "false") === "true";
                this.model.RiskIsQueryLoginLog = (jQuery("#hfRiskIsQueryLoginLog").val() || "false") === "true";
                e = jQuery("#hfGamePermissionList").val() || "";
                this.model.GamePermissionList = e.length > 0 ? e.split(",") : [];
                this.model.GameIsEditLockLVUp = (jQuery("#hfGameIsEditLockLVUp").val() || "false") === "true";
                this.model.GameIsEditPlatformTurnover = (jQuery("#hfGameIsEditPlatformTurnover").val() || "false") === "true";
                this.model.DepositIsEditWithdrawalFeeEnable = (jQuery("#hfDepositIsEditWithdrawalFeeEnable").val() || "false") === "true";
                this.model.DepositIsEditWithdrawalFeeWithdrawalCount = (jQuery("#hfDepositIsEditWithdrawalFeeWithdrawalCount").val() || "false") === "true";
                this.model.DepositIsEditWithdrawalFeeWithdrawalFee = (jQuery("#hfDepositIsEditWithdrawalFeeWithdrawalFee").val() || "false") === "true";
                this.editMemberInfoManageSvc.GetLevelType().then(function(n) {
                    t.model.LevelTypeList = n.filter(function(n) {
                        return n.LevelType != 0
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                });
                this.GetBankCodeInfoByLanguageInput = new n.Models.GetBankCodeInfoByLanguageCodeForEditInfoManage;
                this.GetBankCodeInfoByLanguageInput.LanguageCode = this.language;
                this.GetBankCodeInfoByLanguageInput.CountryID = this.country;
                this.GetBankCodeInfoByLanguageCode(this.GetBankCodeInfoByLanguageInput);
                this.GetProvincesInfoByLanguageCodeInput = new n.Models.GetProvincesInfoByLanguageCodeForEditInfoManage;
                this.GetProvincesInfoByLanguageCodeInput.LanguageCode = this.language;
                this.GetProvincesInfoByLanguageCodeInput.CountryID = this.country;
                this.GetProvincesInfoByLanguageCode();
                o = {
                    LanguageCode: "AUTO",
                    ActionType: 1
                };
                this.model.GetMemberSNInfoMemberTotalResultGetByAccountIDInpute.AccountID = this.model.AccountID;
                this.model.MemberLoginLogBackendPager = this.xPagerSvc.GetPageList([], 1, this.model.EditGetMemberLoginLogBackendByAccountID.RecordCounts);
                this.qSvc.all([this.editMemberInfoManageSvc.GetMemberSNInfoBackendByAccountID(this.model.EditMemberInfoManage), this.editMemberInfoManageSvc.UpdateMemberSNInfoBackendModelToDescription()]).then(function(i) {
                    if (t.model.UpdateEditMemberInfoManage = i[0][0],
                    t.OriginalIsLogin = i[0][0].IsLogIn,
                    t.SaveAccountingMemberStatus = i[0][0].MemberStatus,
                    t.SetAccountNameInfo(),
                    t.SetIDNumberInfo(),
                    t.SetEmailInfo(),
                    t.SetCellPhoneInfo(),
                    t.SetAddressInfo(),
                    t.model.UpdateEditMemberInfoManage.MemoType == null && (t.model.UpdateEditMemberInfoManage.MemoType = 0),
                    t.model.UpdateEditMemberInfoManage.BirthDay != null && t.model.UpdateEditMemberInfoManage.BirthDay != "" && (t.model.UpdateEditMemberInfoManage.BirthDay = t.FormatMomentToShortDate(moment(t.model.UpdateEditMemberInfoManage.BirthDay))),
                    t.model.UpdateEditMemberInfoManage.QueID === 8 && (t.model.ShowCustomerQueField = !0),
                    t.model.GetMemberSNInfoBackendByAccountIDResultToDescription = i[1],
                    jQuery.extend(t.model.MemberBaseInfoField, t.model.GetMemberSNInfoBackendByAccountIDResultToDescription),
                    angular.copy(t.model.UpdateEditMemberInfoManage, t.model.OldMemberBaseInfo),
                    t.model.IsIdentityValid = n.Helpers.IdentityCheck(t.model.UpdateEditMemberInfoManage.IDNumber) ? !0 : !1,
                    t.model.UpdateEditMemberInfoManage.IsIDVerified = t.model.UpdateEditMemberInfoManage.IDVerifiedTime != null ? !0 : !1,
                    /1\d{10}/.test(t.model.UpdateEditMemberInfoManage.CellPhone) || (t.model.IsCellPhoneIsVerified = !1),
                    t.model.OldMemberBaseInfo.IDVerifiedTime = t.FormatMomentToShortDate(moment()),
                    t.model.OldMemberBaseInfo.BirthDay != null && t.model.OldMemberBaseInfo.BirthDay != "") {
                        var u = moment(t.model.OldMemberBaseInfo.BirthDay);
                        t.model.OldMemberBaseInfo.BirthDay = t.FormatMomentToShortDate(u)
                    }
                    t.ChangeProvincesInfos();
                    r.stop()
                }).catch(function() {
                    r.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                });
                this.qSvc.all([this.editMemberInfoManageSvc.GetMemberMemoTypeByLanguageCode(), this.editMemberInfoManageSvc.GetMemberRisksInfoBackendByAccountID(this.model.EditMemberRisksInfo), this.editMemberInfoManageSvc.GetMemberWithdrawalLimitSurchargeSettingByAccountID(this.model.EditMemberWithdrawalLimitSurchargeSetting), this.editMemberInfoManageSvc.GetAlertTypeInfoByLanguageCode(o), this.editMemberInfoManageSvc.GetPlatformServiceInfoAll(), this.editMemberInfoManageSvc.GetMemberSNInfoMemberTotalResultGetByAccountID(this.model.GetMemberSNInfoMemberTotalResultGetByAccountIDInpute), this.editMemberInfoManageSvc.MemberRiskInfoModelToDescription(), this.editMemberInfoManageSvc.UpdateMemberRisksInfoBackendIsBlackListModelToDescription(), this.editMemberInfoManageSvc.GetMemberPlatformTurnoverDisabledByCondition(this.model.GetMemberPlatformTurnoverDisabledByConditionInput)]).then(function(r) {
                    t.model.GetMemberMemoTypeByLanguageCodeOutput = r[0];
                    t.model.UpdateEditMemberRisksInfo = r[1];
                    t.model.UpdateEditMemberRisksInfo.AccountID = t.model.AccountID;
                    t.model.OnLineCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 3 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.AliOpCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 1 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.AliAPICashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 1 && n.FunctionType === 2 && n.ActionType === 1
                    })[0];
                    t.model.PayFastCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 3 && n.FunctionType === 2 && n.ActionType === 1
                    })[0];
                    t.model.QQCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 5 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.WechatOLCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 2 && n.FunctionType === 2 && n.ActionType === 1
                    })[0];
                    t.model.WechatAICashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 2 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.UnionPayScanCodeCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 6 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.BaiduWalletCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 7 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.DiankaPaymentCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 8 && n.FunctionType === 1 && n.ActionType === 1
                    })[0];
                    t.model.JDScanCodeCashFlowLimitRisk = t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk.filter(function(n) {
                        return n.CashFlowType === 6 && n.FunctionType === 2 && n.ActionType === 1
                    })[0];
                    t.model.GetAccountBookLevelInput.DirectorID = r[1].DirectorID;
                    t.model.GetAliPayLevelInput.DirectorID = r[1].DirectorID;
                    t.model.GetWeChatLevelInput.DirectorID = r[1].DirectorID;
                    t.model.GetAccountBookLevelInput.LevelType = r[1].LevelType;
                    t.model.GetAliPayLevelInput.LevelType = r[1].LevelType;
                    t.model.GetWeChatLevelInput.LevelType = r[1].LevelType;
                    t.editMemberInfoManageSvc.GetAccountBookLevelSettingByPaywayId(t.model.GetAccountBookLevelInput).then(function(n) {
                        t.model.GetAccountBookLevelOutput = n
                    }).catch(function() {
                        i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                    });
                    t.editMemberInfoManageSvc.GetAccountBookLevelSettingByPaywayId(t.model.GetAliPayLevelInput).then(function(n) {
                        t.model.GetAliPayLevelOutput = n
                    }).catch(function() {
                        i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                    });
                    t.editMemberInfoManageSvc.GetAccountBookLevelSettingByPaywayId(t.model.GetWeChatLevelInput).then(function(n) {
                        t.model.GetWeChatLevelOutput = n
                    }).catch(function() {
                        i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                    });
                    r[2] == null ? t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting = t.model.DefaultEditMemberWithdrawalLimitSurchargeSetting : (t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting = r[2],
                    t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting.AccountID = t.model.AccountID);
                    t.model.GetAlertTypeInfoByLanguageCodeModel = r[3];
                    t.InitialAlertInfo();
                    t.model.GetGameListResult = r[4].filter(function(n) {
                        return n.GameID != "Member" && n.ServiceStatus == 1 && n.IsRiskVisible
                    });
                    t.model.GetGameListAllResult = r[4].filter(function(n) {
                        return n.GameID != "Member" && n.ServiceStatus == 1 && n.IsShowMember
                    });
                    t.GetMemberSNInfoBackendReportGetByAccountID();
                    t.model.GetMemberSNInfoMemberTotalResultGetByAccountIDResult = r[5];
                    t.model.GetMemberSNInfoBackendByAccountIDResultToDescription = r[6];
                    jQuery.extend(t.model.MemberRisksInfoField, t.model.GetMemberSNInfoBackendByAccountIDResultToDescription);
                    t.logSvc.LogField.IsLockLVUp = new n.Models.LogFieldData;
                    t.logSvc.LogField.IsLockLVUp.FieldDisplayName = n.Helpers.ChangeLanguage("帳號不升級");
                    angular.copy(t.model.LogMapper, t.logSvc.LogField.IsLockLVUp.MapperData);
                    t.GetWalletSumDisplayText();
                    jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberRisksInfo);
                    jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting);
                    t.model.OldMemberRisksInfo.IsLockLVUp = String(t.model.UpdateEditMemberInfoManage.IsLockLVUp);
                    t.model.OldMemberRisksInfo.MemberMemoType = t.model.UpdateEditMemberInfoManage.MemberMemoType;
                    t.model.UpdateMemberRisksInfoBackendIsBlackListModelToDescription = r[7];
                    jQuery.extend(t.model.BlackListField, t.model.UpdateMemberRisksInfoBackendIsBlackListModelToDescription);
                    t.model.OldBlackList.AccountID = t.model.AccountID;
                    t.model.OldBlackList.IsBlackList = String(t.model.UpdateEditMemberInfoManage.IsBlackList);
                    t.model.GetMemberPlatformTurnoverDisabledByConditionOutput = r[8].Data;
                    t.model.GetMemberPlatformTurnoverDisabledByConditionOutput.forEach(function(n) {
                        var i = {
                            GameID: n.GameID,
                            ServiceName: n.ServiceName
                        };
                        t.model.CheckGameID.push(i)
                    });
                    t.SeachBlackListToEdit(t.model.UpdateEditMemberRisksInfo);
                    angular.copy(t.model.UpdateEditMemberRisksInfo.Member_Platform_BlackList, t.model.OldGameStatus);
                    angular.copy(t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk, t.model.OldCashFlow);
                    t.qSvc.all([t.editMemberInfoManageSvc.GetMemberStatusByLanguageCode(), t.editMemberInfoManageSvc.GetMemberRiskInfoAccountingBackendByAccountID(t.model.GetMemberRiskInfoAccountingBackendByAccountIDInput), t.editMemberInfoManageSvc.UpdateMemberRiskInfoAccountingBackendModelToDescription(), t.editMemberInfoManageSvc.GetMemberDWCountLogByAccountID(t.model.GetMemberDWCountLogByAccountIDModel), t.editMemberInfoManageSvc.GetOtherPaymentByCondition(t.model.GetOtherPaymentSetting), t.editMemberInfoManageSvc.GetMemberOPAccountBookSettingByAccountID(t.model.GetMemberOPAccountBookSettingByAccountIDPostModel)]).then(function(r) {
                        t.model.GetMemberStatusByLanguageCodeModelOutput = r[0];
                        t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput = r[1];
                        t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Original = r[1];
                        t.OldIsDeposit = r[1].IsDeposit;
                        t.model.UpdateMemberRiskInfoAccountingBackendModelToDescription = r[2];
                        jQuery.extend(t.model.MemberRiskInfoAccountingBackendField, t.model.UpdateMemberRiskInfoAccountingBackendModelToDescription);
                        jQuery.extend(t.model.OldMemberRiskInfoAccountingBackendLog, t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput);
                        t.model.GetMemberDWCountLogByAccountIDResultList = r[3];
                        t.model.AllOtherPaymentSetting = r[4];
                        var u = new n.Models.OtherPaymentSetting;
                        u.ShowName = n.Helpers.ChangeLanguage("請選擇");
                        u.PaymentName = "";
                        u.PaymentID = "";
                        t.model.DropdownPaymentSettingOBA = angular.copy(t.model.AllOtherPaymentSetting.filter(function(n) {
                            return n.PaywayID == "OBA"
                        }));
                        t.model.DropdownPaymentSettingOQQ = angular.copy(t.model.AllOtherPaymentSetting.filter(function(n) {
                            return n.PaywayID == "OQQ"
                        }));
                        t.model.DropdownPaymentSettingOUS = angular.copy(t.model.AllOtherPaymentSetting.filter(function(n) {
                            return n.PaywayID == "OUS"
                        }));
                        t.model.DropdownPaymentSettingOJD = angular.copy(t.model.AllOtherPaymentSetting.filter(function(n) {
                            return n.PaywayID == "OJD"
                        }));
                        t.model.DropdownPaymentSettingOPF = angular.copy(t.model.AllOtherPaymentSetting.filter(function(n) {
                            return n.PaywayID == "OPF"
                        }));
                        t.model.DropdownPaymentSettingOBA.splice(0, 0, u);
                        t.model.DropdownPaymentSettingOQQ.splice(0, 0, u);
                        t.model.DropdownPaymentSettingOUS.splice(0, 0, u);
                        t.model.DropdownPaymentSettingOJD.splice(0, 0, u);
                        t.model.DropdownPaymentSettingOPF.splice(0, 0, u);
                        t.model.OriginalMemberOPAccountBookSettingModel = r[5];
                        t.SetEachPaymentAccountBookSetting();
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.OldMemberOPAccountBookSettingModel);
                        t.InitialMemberStatusChange();
                        i.stop()
                    }).catch(function() {
                        i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                    });
                    u.stop()
                }).catch(function() {
                    u.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                });
                this.InitialMemberWithdrawalBankInfoBackend();
                this.InitialMemberDepositAliPayInfoBackend();
                this.UpdateMemberWithdrawalBankInfoBackendModelToDescription();
                this.BindingProvinces();
                this.RegisterChkEvent()
            }
            ,
            t.prototype.AccountNameIsDisabled = function() {
                return this.model.UpdateEditMemberInfoManage.AccountName == null || this.model.UpdateEditMemberInfoManage.AccountName == "" || this.model.UpdateEditMemberInfoManage.AccountName == "undefined" ? !1 : !0
            }
            ,
            t.prototype.ItemClick = function(n) {
                var t = this;
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCodeID == this.model.OuputBankCodeID[n][0].BankCodeID ? (this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCodeID = null,
                this.model.BankInfoList[n].BankCodeID = null,
                this.model.OuputBankCodeID[n][0] = [],
                this.model.InputBankCodeID[n].forEach(function(n) {
                    return n.Ticked = !1
                })) : (this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCodeID = this.model.OuputBankCodeID[n][0].BankCodeID,
                this.model.BankInfoList[n].BankCodeID = this.model.OuputBankCodeID[n][0].BankCodeID,
                this.model.InputBankCodeID[n].forEach(function(i) {
                    i.Ticked = i.BankCodeID == t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCodeID ? !0 : !1
                }))
            }
            ,
            t.prototype.ProvincesItemClick = function(n) {
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankProID == Number(this.model.OuputBankProID[n][0].key) ? (this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankProID = null,
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCityID = null,
                this.model.OuputBankProID[n][0].key = null,
                this.model.OuputBankCityID[n][0].key = null,
                this.model.BankInfoList[n].BankProID = null,
                this.model.BankInfoList[n].BankProID.NameKey.forEach(function(n) {
                    return n.Ticked = !1
                }),
                this.model.BankInfoList[n].BankCityID.NameKey.forEach(function(n) {
                    return n.Ticked = !1
                })) : (this.model.OuputBankProID[n][0].Ticked = !0,
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankProID = Number(this.model.OuputBankProID[n][0].key),
                this.ChangeProvincesInfo(this.model.OuputBankProID[n][0].key, n))
            }
            ,
            t.prototype.BankCityIDItemClick = function(n) {
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].BankCityID = Number(this.model.OuputBankCityID[n][0].key)
            }
            ,
            t.prototype.UpdateMemberSNInfo = function() {
                if (this.CheckAccountNameIsChange() && (this.model.UpdateEditMemberInfoManage.AccountName = this.model.UpdateEditMemberInfoManage.AccountNameShow),
                this.CheckIDNumberIsChange() && (this.model.UpdateEditMemberInfoManage.IDNumber = this.model.UpdateEditMemberInfoManage.IDNumberShow),
                this.CheckEmailIsChange() && (this.model.UpdateEditMemberInfoManage.Email = this.model.UpdateEditMemberInfoManage.EmailShow),
                this.CheckCellPhoneIsChange() && (this.model.UpdateEditMemberInfoManage.CellPhone = this.model.UpdateEditMemberInfoManage.CellPhoneShow),
                this.CheckAddressIsChange() && (this.model.UpdateEditMemberInfoManage.Address = this.model.UpdateEditMemberInfoManage.AddressShow),
                (this.model.UpdateEditMemberInfoManage.ProvincesID || this.model.UpdateEditMemberInfoManage.CityID || this.model.UpdateEditMemberInfoManage.Address) && (!this.model.UpdateEditMemberInfoManage.ProvincesID || !this.model.UpdateEditMemberInfoManage.CityID || !this.model.UpdateEditMemberInfoManage.Address))
                    return n.Helpers.Alert(n.Helpers.ChangeLanguage("地區或地址不能為空") + "!", SweetAlertTypeEnum.warning),
                    !1;
                if (this.model.UpdateEditMemberInfoManage.DistrictID = 0,
                !this.model.UpdateEditMemberInfoManage.NickName || this.model.UpdateEditMemberInfoManage.NickName == "")
                    return n.Helpers.Alert(n.Helpers.ChangeLanguage("暱稱不能為空") + "!", SweetAlertTypeEnum.warning),
                    !1;
                if (this.model.UpdateEditMemberInfoManage.Email != null && this.model.UpdateEditMemberInfoManage.Email != "" && !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(this.model.UpdateEditMemberInfoManage.Email))
                    return !1;
                this.model.UpdateEditMemberInfoManage.MemberStatus != this.OriginalMemberStatus ? (this.model.UpdateEditMemberInfoManage.IsDeposit = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Temp.IsDeposit,
                this.model.UpdateEditMemberInfoManage.IsAccountBookDeposit = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Temp.IsAccountBookDeposit,
                this.model.UpdateEditMemberInfoManage.IsAccountBookBonus = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Temp.IsAccountBookBonus,
                this.model.UpdateEditMemberInfoManage.IsBet = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Temp.IsBet) : (this.model.UpdateEditMemberInfoManage.IsDeposit = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Original.IsDeposit,
                this.model.UpdateEditMemberInfoManage.IsAccountBookDeposit = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Original.IsAccountBookDeposit,
                this.model.UpdateEditMemberInfoManage.IsAccountBookBonus = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Original.IsAccountBookBonus,
                this.model.UpdateEditMemberInfoManage.IsBet = this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Original.IsBet);
                angular.copy(this.model.UpdateEditMemberInfoManage, this.model.NewMemberBaseInfo);
                this.model.UpdateEditMemberInfoManage.BirthDay != null && (this.model.NewMemberBaseInfo.BirthDay = this.FormatMomentToShortDate(moment(this.model.UpdateEditMemberInfoManage.BirthDay)));
                this.model.UpdateEditMemberInfoManage.EmailUnverified = this.model.OldMemberBaseInfo.Email != this.model.UpdateEditMemberInfoManage.Email;
                this.model.UpdateEditMemberInfoManage.CellPhoneUnverified = this.model.UpdateEditMemberInfoManage.CellPhone == "" ? !0 : !1;
                var t = angular.copy(this.model.UpdateEditMemberInfoManage);
                return t.BirthDay != null && t.BirthDay != "" && (t.BirthDay = n.Helpers.FormatMomentWithUnit(moment(t.BirthDay), "second")),
                n.Helpers.ButtonDisabledSwitch("btnEditBasicInfo", DisabledStateEnum.True, n.Helpers.ChangeLanguage("更新中")),
                t.LogContent = this.GetUpdateMemberSNInfoLogContent(this.model.OldMemberBaseInfo, this.model.NewMemberBaseInfo),
                this.editMemberInfoManageSvc.UpdateMemberSNInfoBackend(t).then(function() {
                    n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                    location.reload()
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("btnEditBasicInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                    n.Helpers.AlertSwitch(t)
                }),
                !0
            }
            ,
            t.prototype.SeachBlackListToEdit = function(n) {
                n.Member_Platform_BlackList = [];
                n.Member_Platform_BlackListForSearch.forEach(function(t) {
                    var i = {
                        ServiceID: t.ServiceID,
                        SubItemID: t.SubItemID == null || t.SubItemID == "" ? "" : t.SubItemID,
                        BlackStatus: t.SubItemID == null || t.SubItemID == "" ? t.BlackStatus : t.SubItemBlackStatus,
                        ServiceName: t.SubItemID == null || t.SubItemID == "" ? t.ServiceName : t.SubItemName
                    };
                    n.Member_Platform_BlackList == null && (n.Member_Platform_BlackList = []);
                    n.Member_Platform_BlackList.push(i)
                })
            }
            ,
            t.prototype.UpdateFSuspension = function(t) {
                var i = this
                  , r = {
                    AccountID: this.model.AccountID,
                    IsFSuspension: t
                };
                this.editMemberInfoManageSvc.UpdateMemberRisksInfoBackendIsFSuspension(r).then(function() {
                    var r = "MemberStatus", u, o, f, e, s;
                    if (i.logSvc.FieldAdapter(i.model.MemberBaseInfoField, i.logSvc.LogField),
                    i.logSvc.LogField[r]) {
                        i.logSvc.LogField[r].MapperData = [];
                        for (u in i.model.GetMemberStatusByLanguageCodeModelOutput.NameKey)
                            o = {
                                Value: "" + i.model.GetMemberStatusByLanguageCodeModelOutput.NameKey[u],
                                Text: "" + u
                            },
                            i.logSvc.LogField[r].MapperData.push(o)
                    }
                    f = angular.copy(i.model.OldMemberBaseInfo);
                    e = angular.copy(i.model.OldMemberBaseInfo);
                    t ? e.MemberStatus = 0 : f.MemberStatus = 0;
                    s = i.diff.diffOwnProperties(f, e);
                    i.logSvc.CreateMemberInfoOperationLog(s);
                    n.Helpers.Alert("更新成功", SweetAlertTypeEnum.success, !1, "", null, function() {
                        location.reload()
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.SeachCashFlowToEdit = function(n) {
                n.CashFlowLimitRisk = [];
                n.CashFlowLimitRisk.push(this.model.OnLineCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.AliOpCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.AliAPICashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.PayFastCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.QQCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.WechatOLCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.WechatAICashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.UnionPayScanCodeCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.BaiduWalletCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.DiankaPaymentCashFlowLimitRisk);
                n.CashFlowLimitRisk.push(this.model.JDScanCodeCashFlowLimitRisk)
            }
            ,
            t.prototype.UpdateMemberRisksInfo = function() {
                var t = this
                  , i = new n.Models.UpdateMemberRisksInfoBackendOther;
                this.SeachBlackListToEdit(this.model.UpdateEditMemberRisksInfo);
                this.SeachCashFlowToEdit(this.model.UpdateEditMemberRisksInfo);
                n.Helpers.ButtonDisabledSwitch("EditMemberRisksInfo", DisabledStateEnum.True, n.Helpers.ChangeLanguage("傳送中"));
                this.editMemberInfoManageSvc.UpdateMemberRisksInfoBackend(this.model.UpdateEditMemberRisksInfo).then(function() {
                    return t.editMemberInfoManageSvc.UpdateMemberWithdrawalLimitSurchargeSettingBackend(t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting)
                }).then(function() {
                    return i = {
                        AccountID: t.model.AccountID,
                        IsLockLVUp: String(t.model.UpdateEditMemberInfoManage.IsLockLVUp),
                        MemberMemoType: t.model.UpdateEditMemberInfoManage.MemberMemoType
                    },
                    t.editMemberInfoManageSvc.UpdateMemberRisksInfoBackendOther(i)
                }).then(function() {
                    return angular.copy(t.model.CheckGameID, t.model.CreateMemberPlatformTurnoverDisabledInput.GameID),
                    t.editMemberInfoManageSvc.CreateMemberPlatformTurnoverDisabled(t.model.CreateMemberPlatformTurnoverDisabledInput)
                }).then(function() {
                    return angular.copy(t.model.NewMemberOPAccountBookSettingModel, t.model.CreateMemberOPAccountBookSettingPostModel.OP_AccountBook),
                    t.editMemberInfoManageSvc.CreateMemberOPAccountBookSetting(t.model.CreateMemberOPAccountBookSettingPostModel)
                }).then(function() {
                    jQuery.extend(t.model.NewMemberRisksInfo, t.model.UpdateEditMemberRisksInfo);
                    jQuery.extend(t.model.NewMemberRisksInfo, t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting);
                    jQuery.extend(t.model.NewMemberRisksInfo, i);
                    jQuery.extend(t.model.NewMemberRisksInfo, t.model.NewMemberOPAccountBookSettingModel);
                    angular.copy(t.model.UpdateEditMemberRisksInfo.Member_Platform_BlackList, t.model.NewGameStatus);
                    angular.copy(t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk, t.model.NewCashFlow);
                    t.CreateMemberRisksInfoLog(function() {
                        n.Helpers.ButtonDisabledSwitch("EditMemberRisksInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberRisksInfo);
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting);
                        jQuery.extend(t.model.OldMemberRisksInfo, i);
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.NewMemberOPAccountBookSettingModel);
                        angular.copy(t.model.UpdateEditMemberRisksInfo.Member_Platform_BlackList, t.model.OldGameStatus);
                        angular.copy(t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk, t.model.OldCashFlow);
                        angular.copy(t.model.NewMemberOPAccountBookSettingModel, t.model.OldMemberOPAccountBookSettingModel);
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                        t.editMemberInfoManageSvc.GetMemberPlatformTurnoverDisabledByCondition(t.model.GetMemberPlatformTurnoverDisabledByConditionInput).then(function(n) {
                            t.model.GetMemberPlatformTurnoverDisabledByConditionOutput = n.Data
                        }).catch(function(t) {
                            n.Helpers.AlertSwitch(t)
                        })
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(r) {
                    t.CreateMemberRisksInfoLog(function() {
                        n.Helpers.ButtonDisabledSwitch("EditMemberRisksInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberRisksInfo);
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.UpdateEditMemberWithdrawalLimitSurchargeSetting);
                        jQuery.extend(t.model.OldMemberRisksInfo, i);
                        jQuery.extend(t.model.OldMemberRisksInfo, t.model.NewMemberOPAccountBookSettingModel);
                        angular.copy(t.model.UpdateEditMemberRisksInfo.Member_Platform_BlackList, t.model.OldGameStatus);
                        angular.copy(t.model.UpdateEditMemberRisksInfo.CashFlowLimitRisk, t.model.OldCashFlow);
                        angular.copy(t.model.NewMemberOPAccountBookSettingModel, t.model.OldMemberOPAccountBookSettingModel);
                        n.Helpers.AlertSwitch(r);
                        t.editMemberInfoManageSvc.GetMemberPlatformTurnoverDisabledByCondition(t.model.GetMemberPlatformTurnoverDisabledByConditionInput).then(function(n) {
                            t.model.GetMemberPlatformTurnoverDisabledByConditionOutput = n.Data
                        }).catch(function(t) {
                            n.Helpers.AlertSwitch(t)
                        })
                    })
                })
            }
            ,
            t.prototype.CreateMemberRisksInfoLog = function(t, i) {
                var r = this, e = this.diff.diffOwnProperties(this.model.OldMemberRisksInfo, this.model.NewMemberRisksInfo), f = !1, u = [], o, s;
                this.FillMemberPlatformTurnoverDisabledLog(u);
                u.length != 0 && (f = !0);
                this.model.OldCashFlow.every(function(t) {
                    var i = r.model.NewCashFlow.filter(function(n) {
                        return n.CashFlowType == t.CashFlowType && n.FunctionType == t.FunctionType && n.ActionType == t.ActionType
                    });
                    return i == null || i.length == 0 ? !0 : (i[0].IsOpen !== t.IsOpen && (u.push({
                        FieldName: "IsOpen",
                        FieldDisplayName: n.Helpers.ChangeLanguage(t.Description_Backend.replace("(", "（").replace(")", "）")) + "：" + n.Helpers.ChangeLanguage("儲值功能"),
                        BeforeName: t.IsOpen.toString() === "0" ? n.Helpers.ChangeLanguage("隱藏") : t.IsOpen.toString() === "1" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("維護"),
                        BeforeValue: t.IsOpen.toString(),
                        AfterName: i[0].IsOpen.toString() === "0" ? n.Helpers.ChangeLanguage("隱藏") : i[0].IsOpen.toString() === "1" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("維護"),
                        AfterValue: i[0].IsOpen.toString()
                    }),
                    f = !0),
                    i[0].DayCount !== t.DayCount && (u.push({
                        FieldName: "DayCount",
                        FieldDisplayName: n.Helpers.ChangeLanguage(t.Description_Backend.replace("(", "（").replace(")", "）")) + "：" + n.Helpers.ChangeLanguage("單日存款次數"),
                        BeforeName: t.DayCount.toString(),
                        BeforeValue: t.DayCount.toString(),
                        AfterName: i[0].DayCount.toString(),
                        AfterValue: i[0].DayCount.toString()
                    }),
                    f = !0),
                    i[0].Daylimit !== t.Daylimit && (u.push({
                        FieldName: "Daylimit",
                        FieldDisplayName: n.Helpers.ChangeLanguage(t.Description_Backend.replace("(", "（").replace(")", "）")) + "：" + n.Helpers.ChangeLanguage("單日存款金額"),
                        BeforeName: t.Daylimit.toString(),
                        BeforeValue: t.Daylimit.toString(),
                        AfterName: i[0].Daylimit.toString(),
                        AfterValue: i[0].Daylimit.toString()
                    }),
                    f = !0),
                    !0)
                });
                this.model.OldMemberOPAccountBookSettingModel.every(function(t) {
                    var i = r.model.NewMemberOPAccountBookSettingModel.filter(function(n) {
                        return n.SEQNO == t.SEQNO && n.PaywayID == t.PaywayID && n.DeviceType == t.DeviceType
                    }), o, s;
                    if (i == null || i.length == 0)
                        return !0;
                    var h = new n.Models.OtherPaymentSetting
                      , c = new n.Models.OtherPaymentSetting
                      , e = "";
                    switch (t.PaywayID) {
                    case "OBA":
                        e = r.model.OnLineCashFlowLimitRisk.Description_Backend;
                        break;
                    case "OQQ":
                        e = r.model.QQCashFlowLimitRisk.Description_Backend;
                        break;
                    case "OUS":
                        e = r.model.UnionPayScanCodeCashFlowLimitRisk.Description_Backend;
                        break;
                    case "OJD":
                        e = r.model.JDScanCodeCashFlowLimitRisk.Description_Backend;
                        break;
                    case "OPF":
                        e = r.model.PayFastCashFlowLimitRisk.Description_Backend
                    }
                    return o = r.model.AllOtherPaymentSetting.filter(function(n) {
                        return n.PaywayID == t.PaywayID && n.PaymentID == t.PaymentID
                    }),
                    o != null && o.length > 0 ? h = o[0] : h.PaymentName = "",
                    s = r.model.AllOtherPaymentSetting.filter(function(n) {
                        return n.PaywayID == i[0].PaywayID && n.PaymentID == i[0].PaymentID
                    }),
                    s != null && s.length > 0 ? c = s[0] : c.PaymentName = "",
                    i[0].PaymentID !== t.PaymentID && (u.push({
                        FieldName: "PaymentID",
                        FieldDisplayName: n.Helpers.ChangeLanguage(e.replace("(", "（").replace(")", "）")) + "：" + (t.DeviceType == 1 ? n.Helpers.ChangeLanguage("PC") : n.Helpers.ChangeLanguage("手機")) + "-" + n.Helpers.ChangeLanguage("帳本") + t.SEQNO.toString(),
                        BeforeName: h.PaymentName,
                        BeforeValue: t.PaymentID,
                        AfterName: c.PaymentName,
                        AfterValue: i[0].PaymentID.toString()
                    }),
                    f = !0),
                    !0
                });
                this.model.OldGameStatus.every(function(t) {
                    var i = r.model.NewGameStatus.filter(function(n) {
                        return n.ServiceID == t.ServiceID && n.SubItemID == t.SubItemID
                    });
                    return i == null || i.length == 0 ? !0 : i[0].BlackStatus == t.BlackStatus ? !0 : (u.push({
                        FieldName: t.ServiceID.toString(),
                        FieldDisplayName: t.ServiceName,
                        BeforeName: t.BlackStatus == "0" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("關閉"),
                        BeforeValue: t.BlackStatus,
                        AfterName: i[0].BlackStatus == "0" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("關閉"),
                        AfterValue: i[0].BlackStatus
                    }),
                    f = !0,
                    !0)
                });
                e.changed != "equal" && angular.forEach(e.value, function(n, t) {
                    if (n.changed.indexOf("change") > -1 && r.model.MemberRisksInfoField[t] != null) {
                        var e = ""
                          , i = ""
                          , f = "";
                        r.logSvc.LogField[t] ? (e = r.logSvc.LogField[t].FieldDisplayName,
                        r.logSvc.LogField[t].MapperData.forEach(function(t) {
                            i = n.removed.toString() == t.Value.toString() ? t.Text : i;
                            f = n.added.toString() == t.Value.toString() ? t.Text : f
                        })) : e = String(r.model.MemberRisksInfoField[t]);
                        u.push({
                            FieldName: t.toString(),
                            FieldDisplayName: e,
                            BeforeName: i == "" ? n.removed : i,
                            BeforeValue: n.removed,
                            AfterValue: n.added,
                            AfterName: f == "" ? n.added : f
                        })
                    }
                    t.toString() == r.model.MemberRisksInfoField.DataID && (s = n.value)
                });
                (f || e.changed != "equal") && u != null && u.length != 0 ? (o = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: u
                },
                this.logSvc.InsertMemberInfoOperationLog(o).then(function() {
                    t && t()
                }).catch(function() {
                    t && n.Helpers.Alert(i + "操作纪录失败", SweetAlertTypeEnum.error, !1, "", null, function() {
                        t()
                    })
                })) : t && t()
            }
            ,
            t.prototype.FillMemberPlatformTurnoverDisabledLog = function(t) {
                var i = this;
                (this.model.GetMemberPlatformTurnoverDisabledByConditionOutput != null || this.model.GetMemberPlatformTurnoverDisabledByConditionOutput.length != 0) && this.model.GetMemberPlatformTurnoverDisabledByConditionOutput.forEach(function(r) {
                    var u = i.model.CreateMemberPlatformTurnoverDisabledInput.GameID.filter(function(n) {
                        return n.GameID === r.GameID
                    });
                    (u == null || u.length === 0) && t.push({
                        FieldName: r.GameID + "-PlatformTurnover",
                        FieldDisplayName: n.Helpers.ChangeLanguage("平台返水設定"),
                        BeforeName: r.ServiceName + "-返水",
                        BeforeValue: "true",
                        AfterValue: "false",
                        AfterName: r.ServiceName + "-不返水"
                    })
                });
                (this.model.CreateMemberPlatformTurnoverDisabledInput.GameID != null || this.model.CreateMemberPlatformTurnoverDisabledInput.GameID.length != 0) && this.model.CreateMemberPlatformTurnoverDisabledInput.GameID.forEach(function(r) {
                    var u = i.model.GetMemberPlatformTurnoverDisabledByConditionOutput.filter(function(n) {
                        return n.GameID === r.GameID
                    });
                    (u == null || u.length === 0) && t.push({
                        FieldName: r.GameID + "-PlatformTurnover",
                        FieldDisplayName: n.Helpers.ChangeLanguage("平台返水設定"),
                        BeforeName: r.ServiceName + "-不返水",
                        BeforeValue: "false",
                        AfterValue: "true",
                        AfterName: r.ServiceName + "-返水"
                    })
                })
            }
            ,
            t.prototype.ChangeBlackList = function(t) {
                var i = this
                  , r = {
                    AccountID: this.model.AccountID,
                    IsBlackList: String(t)
                };
                this.editMemberInfoManageSvc.UpdateMemberRisksInfoBackendIsBlackList(r).then(function() {
                    n.Helpers.AlertEvent(EventAlertEnum.Update_Success);
                    i.model.UpdateEditMemberInfoManage.IsBlackList = t;
                    i.model.NewBlackList.AccountID = i.model.AccountID;
                    i.model.NewBlackList.IsBlackList = String(i.model.UpdateEditMemberInfoManage.IsBlackList);
                    i.CreateBlackListLog();
                    i.model.OldBlackList.IsBlackList = String(i.model.UpdateEditMemberInfoManage.IsBlackList)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.CreateBlackListLog = function() {
                var t = this, i = this.diff.diffOwnProperties(this.model.OldBlackList, this.model.NewBlackList), r = [], u, f;
                i.changed != "equal" && angular.forEach(i.value, function(i, u) {
                    i.changed.indexOf("change") > -1 && t.model.BlackListField[u] != null && r.push({
                        FieldName: u.toString(),
                        FieldDisplayName: String(t.model.BlackListField[u]),
                        BeforeValue: i.removed,
                        BeforeName: i.removed == "true" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("關閉"),
                        AfterValue: i.added,
                        AfterName: i.added == "true" ? n.Helpers.ChangeLanguage("開啟") : n.Helpers.ChangeLanguage("關閉")
                    });
                    u.toString() == t.model.MemberRisksInfoField.DataID && (f = i.value)
                });
                (!1 || i.changed != "equal") && (u = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: r
                },
                this.logSvc.InsertMemberInfoOperationLog(u).then(function() {}).catch(function() {}))
            }
            ,
            t.prototype.UpdateMemberSNInfoBackendAgencyIDByAccountID = function() {
                var t = this, i;
                return this.model.SelectedAnency.length == 0 ? (n.Helpers.Alert("請選擇代理帳號", SweetAlertTypeEnum.error),
                !1) : (this.model.AccountLevelListModel.Type3 = this.model.SelectedAnency[0].AccountID,
                i = {
                    AccountID: this.model.AccountID,
                    AgencyID: String(this.model.AccountLevelListModel.Type3)
                },
                this.model.NewAgencyID.AgencyID = this.model.AccountLevelListModel.Type3,
                n.Helpers.ButtonDisabledSwitch("btnUpdateMemberSNInfoBackendAgencyIDByAccountID", DisabledStateEnum.True, n.Helpers.ChangeLanguage("建立中")),
                this.editMemberInfoManageSvc.UpdateMemberSNInfoBackendAgencyIDByAccountID(i).then(function() {
                    t.ModalCancel();
                    t.UpdateAgencyIDLog(function() {
                        n.Helpers.ButtonDisabledSwitch("btnUpdateMemberSNInfoBackendAgencyIDByAccountID", DisabledStateEnum.False, n.Helpers.ChangeLanguage("確定"));
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                        location.reload()
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("btnUpdateMemberSNInfoBackendAgencyIDByAccountID", DisabledStateEnum.False, n.Helpers.ChangeLanguage("確定"));
                    n.Helpers.AlertSwitch(t)
                }),
                !0)
            }
            ,
            t.prototype.MemberUpgrade = function() {
                var t = this;
                n.Helpers.ButtonDisabledSwitch("btnMemberUpgrade", DisabledStateEnum.True, n.Helpers.ChangeLanguage("建立中"));
                this.editMemberInfoManageSvc.MemberSNInfoBackendUpgrade(this.model.MemberSNInfoBackendUpgradeModelInput).then(function(i) {
                    t.ModalCancel();
                    angular.copy(t.model.MemberSNInfoBackendUpgradeModelInput, t.model.NewMemberSNInfoBackendUpgrade);
                    i.forEach(function(n) {
                        switch (n.PaywayID) {
                        case "BA":
                            n.IsAlter ? t.model.NewMemberSNInfoBackendUpgrade.AccountBookLevelByAccoutLevel = n.AccountBookName : t.model.OldMemberSNInfoBackendUpgrade.AccountBookLevelByAccoutLevel = n.AccountBookName;
                            break;
                        case "AP":
                            n.IsAlter ? t.model.NewMemberSNInfoBackendUpgrade.AliPayLevelByAccoutLevel = n.AccountBookName : t.model.OldMemberSNInfoBackendUpgrade.AliPayLevelByAccoutLevel = n.AccountBookName;
                            break;
                        case "WC":
                            n.IsAlter ? t.model.NewMemberSNInfoBackendUpgrade.WeChatLevelByAccoutLevel = n.AccountBookName : t.model.OldMemberSNInfoBackendUpgrade.WeChatLevelByAccoutLevel = n.AccountBookName
                        }
                    });
                    t.logSvc.FieldAdapter(t.model.MemberSNInfoBackendUpgradeField, t.logSvc.LogField);
                    var r = t.diff.diffOwnProperties(t.model.OldMemberSNInfoBackendUpgrade, t.model.NewMemberSNInfoBackendUpgrade);
                    t.logSvc.CreateMemberInfoOperationLog(r, function() {
                        n.Helpers.ButtonDisabledSwitch("btnMemberUpgrade", DisabledStateEnum.False, n.Helpers.ChangeLanguage("確定"));
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                        location.reload()
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("btnMemberUpgrade", DisabledStateEnum.False, n.Helpers.ChangeLanguage("確定"));
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.UpdateAgencyIDLog = function(t, i) {
                var r, u;
                this.model.OldAgencyID.AgencyID != this.model.NewAgencyID.AgencyID ? (r = [],
                r.push({
                    FieldName: "AgencyID",
                    FieldDisplayName: n.Helpers.ChangeLanguage("上層代理"),
                    BeforeValue: this.model.OldAgencyID.AgencyID,
                    BeforeName: this.model.OldAgencyID.AgencyID,
                    AfterValue: this.model.NewAgencyID.AgencyID,
                    AfterName: this.model.NewAgencyID.AgencyID
                }),
                u = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: r
                },
                this.logSvc.InsertMemberInfoOperationLog(u).then(function() {
                    t && t()
                }).catch(function() {
                    t && n.Helpers.Alert(i + "操作纪录失败", SweetAlertTypeEnum.error, !1, "", null, function() {
                        t()
                    })
                })) : t && t()
            }
            ,
            t.prototype.InitialMemberUpgrade = function() {
                var t = this;
                return this.editMemberInfoManageSvc.GetMemberSNInfoBackendByAccountID(this.model.EditMemberInfoManage).then(function(n) {
                    t.model.MemberSNInfoBackendUpgradeModelInput.AccountID = n[0].AccountID;
                    t.model.MemberSNInfoBackendUpgradeModelInput.LevelType = n[0].LevelType;
                    angular.copy(t.model.MemberSNInfoBackendUpgradeModelInput, t.model.OldMemberSNInfoBackendUpgrade);
                    t.editMemberInfoManageSvc.MemberSNInfoBackendUpgradeModelToDescription().then(function(n) {
                        t.model.MemberSNInfoBackendUpgradeModelToDescription = n;
                        jQuery.extend(t.model.MemberSNInfoBackendUpgradeField, t.model.MemberSNInfoBackendUpgradeModelToDescription)
                    }).catch(function() {})
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                }),
                !0
            }
            ,
            t.prototype.GetDisplayName = function(n) {
                return n.RelactionAccount + "&nbsp;&nbsp;(" + n.NickName + ")&nbsp;&nbsp;-&nbsp;&nbsp;" + this.DisplayTestType(n.TestType, n.LineType)
            }
            ,
            t.prototype.DisplayTestType = function(t, i) {
                return t == 1 ? i == 1 ? n.Helpers.ChangeLanguage("正式帳號") : n.Helpers.ChangeLanguage("代理帳號") : t == 2 ? n.Helpers.ChangeLanguage("測試帳號") : t == 3 ? n.Helpers.ChangeLanguage("推廣帳號") : ""
            }
            ,
            t.prototype.InitialUpdateManageAccountHigherAccountID = function() {
                var t = this;
                return this.model.AccountLevelListModel.Type3 = this.model.UpdateEditMemberRisksInfo.AgencyID,
                this.Loaded = !1,
                this.editMemberInfoManageSvc.GetBackendAccountByAccountType().then(function(n) {
                    n = n.filter(function(n) {
                        return n.TestType == 1 == t.model.UpdateEditMemberInfoManage.MemberStatus < 4
                    });
                    n.forEach(function(n) {
                        n.DisplayName = t.GetDisplayName(n)
                    });
                    t.model.GetBackEndAccountLevelListByAccountIDAccountType3 = n;
                    t.model.GetBackEndAccountLevelListByAccountIDAccountType3.forEach(function(n) {
                        n.Ticked = n.AccountID === t.model.UpdateEditMemberRisksInfo.AgencyID ? !0 : !1
                    });
                    t.model.OldAgencyID.AgencyID = t.model.UpdateEditMemberRisksInfo.AgencyID;
                    t.Loaded = !0
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                }),
                this.model.SelectedAnency.length > 0 && (this.model.OldAgencyID.AgencyID = this.model.SelectedAnency[0].AccountID),
                !0
            }
            ,
            t.prototype.CheckGetMemberPlatformTurnoverDisabledByCondition = function(n) {
                var t = !1;
                return this.model.CheckGameID.every(function(i) {
                    return i.GameID === n ? (t = !0,
                    !1) : !0
                }),
                t
            }
            ,
            t.prototype.ClickGetMemberPlatformTurnoverDisabledByCondition = function(n, t) {
                var i = this, r = !0, u;
                this.model.CheckGameID.every(function(t, u) {
                    return t.GameID === n ? (r = !1,
                    i.model.CheckGameID.splice(u, 1),
                    i.CheckAllGetMemberPlatformTurnoverDisabled = !1,
                    !1) : !0
                });
                r && (u = {
                    GameID: n,
                    ServiceName: t
                },
                this.model.CheckGameID.push(u))
            }
            ,
            t.prototype.CheckAllGetMemberPlatformTurnoverDisabledByCondition = function() {
                var n = this;
                this.model.CheckGameID = [];
                this.CheckAllGetMemberPlatformTurnoverDisabled && this.model.GetGameListAllResult.forEach(function(t) {
                    if (n.FilterGameWithTurnoverDisabled(t)) {
                        var i = {
                            GameID: t.GameID,
                            ServiceName: t.ServiceName
                        };
                        n.model.CheckGameID.push(i)
                    }
                })
            }
            ,
            t.prototype.DisplayServiceGameName = function(t) {
                var i = "", u = "", f = "", r;
                return t.ChangeType === 5 ? (r = this.model.GetGameListAllResult,
                r != null && (r.forEach(function(n) {
                    if (n.ServiceID === t.SourceServiceID) {
                        u = n.ServiceName;
                        return
                    }
                }),
                r.forEach(function(n) {
                    if (n.ServiceID === t.TargetServiceID) {
                        f = n.ServiceName;
                        return
                    }
                })),
                u != "" && f != "" && (i = u + "  " + n.Helpers.ChangeLanguage("轉") + "  " + f),
                i === "" && (i = t.Description)) : t.ChangeType === 10 ? (r = this.model.GetGameListAllResult,
                r != null && r.forEach(function(n) {
                    if (n.ServiceID === t.SourceServiceID) {
                        u = n.ServiceName;
                        return
                    }
                }),
                u != "" && (i = u + "  " + t.Description),
                i === "" && (i = t.Description)) : i = t.Description,
                i
            }
            ,
            t.prototype.FilterGameWithTurnoverDisabled = function(n) {
                return n.ServiceStatus === 1 && n.DisplayType !== 4 && n.Sort > 0
            }
            ,
            t.prototype.GetAlertModule = function(t) {
                var i = this;
                this.editMemberInfoManageSvc.GetMemberAlertModuleBackendByValid(t).then(function(t) {
                    if (t == null) {
                        n.Helpers.Alert("目前還沒可用的警示模板，請去警示模板新增", SweetAlertTypeEnum.warning);
                        jQuery.fancybox.close();
                        return
                    }
                    i.model.ShowAlertModuleModel = t;
                    i.model.AlertModuleSelect.AlertID = 0;
                    i.BindAddAlertInfoModel()
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t);
                    jQuery.fancybox.close()
                })
            }
            ,
            t.prototype.CheckAllAlertType = function() {
                var n = this;
                this.timeout(function() {
                    n.displayAreaListArry = [];
                    n.model.IsCheckAll && n.model.DisplayAreaList.map(function(n) {
                        return n.Id
                    }).forEach(function(t) {
                        n.displayAreaListArry.push(t)
                    });
                    n.model.AddAlertInfoModel.DisplayArea = n.displayAreaListArry.sort().join(",")
                })
            }
            ,
            t.prototype.StartEditAlertModule = function() {
                return this.GetAlertModule(this.model.QueryAlertModuleModel),
                !0
            }
            ,
            t.prototype.EndEditAlertModule = function() {
                this.model.AddAlertInfoModel = null;
                this.model.AlertModuleSelect.AlertID = null;
                this.model.AlertModuleSelect.AlertType = 0
            }
            ,
            t.prototype.BindAddAlertInfoModel = function() {
                var u = this, i, t, r;
                (this.displayAreaListArry = [],
                i = this.model.AlertModuleSelect.AlertID,
                this.model.AddAlertInfoModel = new n.Models.AlertInfoModelForEdit,
                this.model.AddAlertInfoModel.AccountID = this.model.AccountID,
                this.model.AddAlertInfoModel.AccountName = this.model.UpdateEditMemberInfoManage.AccountName,
                this.model.AddAlertInfoModel.Source = 1,
                t = this.model.ShowAlertModuleModel.filter(function(n) {
                    return n.AlertID == i
                }),
                this.model.AddAlertInfoModel.AccountNumber = this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput != null && this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.length != 0 && this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[0].PayeeAccountNo ? this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[0].PayeeAccountNo : "",
                t == null || t.length <= 0) || (this.model.AddAlertInfoModel.Memo = t[0].Memo,
                this.model.AlertModuleSelect.AlertType = t[0].AlertType,
                r = t[0].DisplayArea.split(","),
                r.forEach(function(n) {
                    u.BindDisplayArea(n)
                }),
                this.displayAreaListArry)
            }
            ,
            t.prototype.ChangeEditAlertModule = function() {
                this.BindAddAlertInfoModel();
                CKEDITOR.instances.Memo.setData(this.model.AddAlertInfoModel.Memo)
            }
            ,
            t.prototype.BindDisplayArea = function(n) {
                var t = this.displayAreaListArry.indexOf(n);
                t > -1 ? this.displayAreaListArry.splice(t, 1) : this.displayAreaListArry.push(n);
                this.model.AddAlertInfoModel.DisplayArea = this.displayAreaListArry.sort().join(",")
            }
            ,
            t.prototype.InitialAlertInfo = function() {
                var t = this
                  , i = new n.Models.MemberAlertInfoMultiplayerForEdit;
                i.AccountID = this.model.AccountID;
                this.model.SearchMemberAlertInfoMultiplayer.push(i);
                this.model.SearchAlertInfoModel.Account = this.model.SearchMemberAlertInfoMultiplayer;
                this.editMemberInfoManageSvc.GetMemberAlertInfoBackendByMultiplayer(this.model.SearchAlertInfoModel).then(function(n) {
                    n != null && (angular.forEach(t.model.SearchMemberAlertInfoMultiplayer, function(i) {
                        var r = n.filter(function(n) {
                            return n.AccountID == i.AccountID
                        });
                        r.forEach(function(n) {
                            n.AlertEnum = t.DisplayAlertTypeInfoText(n.AlertType)
                        });
                        t.model.AlertInfo[i.AccountID] = r
                    }),
                    t.model.IsQuery = !0)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.DisplayAlertTypeInfoText = function(n) {
                var t = ""
                  , i = this.model.GetAlertTypeInfoByLanguageCodeModel;
                return i != null && i.forEach(function(i) {
                    if (i.AlertType === n) {
                        t = i.Description;
                        return
                    }
                }),
                t
            }
            ,
            t.prototype.DisplayLevelTypeText = function(n) {
                var t = ""
                  , i = this.model.LevelTypeList;
                return i != null && i.forEach(function(i) {
                    if (i.LevelType === n) {
                        t = i.Description;
                        return
                    }
                }),
                t
            }
            ,
            t.prototype.GetAlerInfo = function() {
                return this.model.AlertInfo[this.model.AccountID] == undefined || this.model.AlertInfo[this.model.AccountID].length == 0 ? null : this.model.AlertInfo[this.model.AccountID]
            }
            ,
            t.prototype.CreateAlertInfo = function() {
                var t = this;
                return this.model.AddAlertInfoModel.Memo == null || this.model.AddAlertInfoModel.Memo == "" ? !1 : this.model.AddAlertInfoModel.DisplayArea == null || this.model.AddAlertInfoModel.DisplayArea == "" ? !1 : this.model.AlertModuleSelect.AlertType == null || String(this.model.AlertModuleSelect.AlertType) == "" ? !1 : (this.model.AddAlertInfoModel.AlertType = this.model.AlertModuleSelect.AlertType,
                this.editMemberInfoManageSvc.CreateMemberAlertInfoBackend(this.model.AddAlertInfoModel).then(function() {
                    t.ModalCancel();
                    n.Helpers.AlertEvent(EventAlertEnum.Create_Success);
                    n.Helpers.Alert("建立成功", SweetAlertTypeEnum.success, !1, "", null, function() {
                        location.reload()
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t, EventAlertEnum.Create_Fail)
                }),
                !0)
            }
            ,
            t.prototype.StartUpdatePassword = function() {
                return this.model.UpdateMemberInfoPWDModel = new n.Models.MemberInfoPWDModel,
                this.model.UpdateMemberInfoPWDModel.AccountID = this.model.UpdateEditMemberInfoManage.AccountID,
                angular.copy(this.model.UpdateMemberInfoPWDModel, this.model.OldUpdateMemberInfoPWDModel),
                this.model.UpdateMemberInfoWithdrawalPWDModel = new n.Models.MemberInfoWithdrawalPWDModel,
                this.model.UpdateMemberInfoWithdrawalPWDModel.AccountID = this.model.UpdateEditMemberInfoManage.AccountID,
                angular.copy(this.model.UpdateMemberInfoWithdrawalPWDModel, this.model.OldUpdateMemberInfoWithdrawalPWDModel),
                !0
            }
            ,
            t.prototype.EndUpdatePassword = function() {
                this.model.UpdateMemberInfoPWDModel = new n.Models.MemberInfoPWDModel;
                this.model.UpdateMemberInfoWithdrawalPWDModel = new n.Models.MemberInfoWithdrawalPWDModel
            }
            ,
            t.prototype.UpdatePassword = function() {
                var t = this, i;
                return this.model.UpdateMemberInfoPWDModel.PWD != null && this.model.UpdateMemberInfoPWDModel.PWD != "" && (!/^[a-zA-Z0-9]{6,10}$/.test(this.model.UpdateMemberInfoPWDModel.PWD) || this.model.UpdateMemberInfoPWDModel.PWD != this.model.UpdateMemberInfoPWDModel.ConfirmPWD) ? !1 : this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != null && this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != "" && (!/^[a-zA-Z0-9]{6,10}$/.test(this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD) || this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD) ? !1 : (this.model.UpdateMemberInfoPWDModel.PWD == "" || this.model.UpdateMemberInfoPWDModel.PWD == null) && (this.model.UpdateMemberInfoPWDModel.ConfirmPWD == "" || this.model.UpdateMemberInfoPWDModel.ConfirmPWD == null) && (this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD == "" || this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD == null) && (this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD == "" || this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD == null) ? !1 : this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != "" && this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != null && (this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD == "" || this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD == null) || (this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD == "" || this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD == null) && this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD != "" && this.model.UpdateMemberInfoWithdrawalPWDModel.ConfirmWithdrawalPWD != null ? !1 : this.model.UpdateMemberInfoPWDModel.PWD != "" && this.model.UpdateMemberInfoPWDModel.PWD != null && (this.model.UpdateMemberInfoPWDModel.ConfirmPWD == "" || this.model.UpdateMemberInfoPWDModel.ConfirmPWD == null) || (this.model.UpdateMemberInfoPWDModel.PWD == "" || this.model.UpdateMemberInfoPWDModel.PWD == null) && this.model.UpdateMemberInfoPWDModel.ConfirmPWD != "" && this.model.UpdateMemberInfoPWDModel.ConfirmPWD != null ? !1 : (i = {
                    AccountID: this.model.UpdateEditMemberInfoManage.AccountID,
                    PWD: this.model.UpdateMemberInfoPWDModel.PWD,
                    WithdrawalPWD: this.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD
                },
                n.Helpers.ButtonDisabledSwitch("UpdatePasswordButton", DisabledStateEnum.True, n.Helpers.ChangeLanguage("建立中")),
                this.editMemberInfoManageSvc.UpdateMemberInfoPWD(i).then(function() {
                    i.PWD != null && i.PWD != "" && (t.model.OldMemberInfoPWDForLogModelInput.AccountID = t.model.UpdateMemberInfoPWDModel.AccountID,
                    t.model.OldMemberInfoPWDForLogModelInput.PWD = "*****",
                    t.model.NewMemberInfoPWDForLogModelInput.AccountID = t.model.UpdateMemberInfoPWDModel.AccountID,
                    t.model.NewMemberInfoPWDForLogModelInput.PWD = "****");
                    i.WithdrawalPWD != null && i.WithdrawalPWD != "" && (t.model.OldMemberInfoPWDForLogModelInput.AccountID = t.model.UpdateMemberInfoPWDModel.AccountID,
                    t.model.OldMemberInfoPWDForLogModelInput.WithdrawalPWD = "*****",
                    t.model.NewMemberInfoPWDForLogModelInput.AccountID = t.model.UpdateMemberInfoPWDModel.AccountID,
                    t.model.NewMemberInfoPWDForLogModelInput.WithdrawalPWD = "****");
                    angular.copy(t.model.MemberInfoPWDForLogModelField, t.logSvc.LogField);
                    var r = t.diff.diffOwnProperties(t.model.OldMemberInfoPWDForLogModelInput, t.model.NewMemberInfoPWDForLogModelInput);
                    t.logSvc.CreateMemberInfoOperationLog(r, function() {
                        n.Helpers.ButtonDisabledSwitch("UpdatePasswordButton", DisabledStateEnum.False, n.Helpers.ChangeLanguage("儲存"));
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                        t.ModalCancel()
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("UpdatePasswordButton", DisabledStateEnum.False, n.Helpers.ChangeLanguage("儲存"));
                    n.Helpers.AlertSwitch(t)
                }),
                !1)
            }
            ,
            t.prototype.StartIPInfo = function() {
                return this.GetIPInfo(),
                !0
            }
            ,
            t.prototype.EndIPInfo = function() {
                this.BuildIPInfoNgTableParams(null)
            }
            ,
            t.prototype.BuildIPInfoNgTableParams = function(n) {
                var t = this;
                n != null ? (this.model.MemberLoginLogBackendPager = this.xPagerSvc.GetPager(n.Pager),
                this.model.MemberLoginLogBackendPager.TotalItemCount = n.TotalItemCount,
                this.model.MemberLoginLogBackendTableParams = new this.ngTableParams({
                    page: this.model.MemberLoginLogBackendPager.PageNumber,
                    count: this.model.MemberLoginLogBackendPager.PageSize
                },{
                    counts: [],
                    getData: function(i) {
                        return i.sorting() ? t.$filter("orderBy")(n.Data, i.orderBy()) : n.Data
                    }
                })) : this.model.MemberLoginLogBackendTableParams = new this.ngTableParams({},{})
            }
            ,
            t.prototype.GetIPInfo = function(t) {
                var r = this, i;
                t === void 0 && (t = !0);
                t && (this.model.MemberLoginLogBackendPager.PageNumber = 1,
                this.model.EditGetMemberLoginLogBackendByAccountID.PageNumber = 0);
                i = angular.copy(this.model.EditGetMemberLoginLogBackendByAccountID);
                i.StartTime && (i.StartTime = this.FormatMoment(moment(i.StartTime)));
                i.EndTime && (i.EndTime = this.FormatMoment(moment(i.EndTime), !0));
                this.editMemberInfoManageSvc.GetMemberLoginLogBackendByAccountID(i).then(function(n) {
                    r.BuildIPInfoNgTableParams(n);
                    r.fancyboxFixPosition(".popUp_in")
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t);
                    r.BuildIPInfoNgTableParams(null)
                })
            }
            ,
            t.prototype.MemberLoginLogBackendChangePageIndex = function(n) {
                /^[0-9]*[1-9][0-9]*$/.test(n + "") && (n > this.model.MemberLoginLogBackendPager.PageCount || ($.type(n) === "string" && (n = parseInt(n.toString())),
                this.model.MemberLoginLogBackendPager.PageNumber !== n) && (this.model.MemberLoginLogBackendPager.PageNumber = n,
                this.model.EditGetMemberLoginLogBackendByAccountID.PageNumber = n - 1,
                this.MemberLoginLogBackendChangePage && (this.MemberLoginLogBackendChangePage = n),
                this.GetIPInfo(!1)))
            }
            ,
            t.prototype.UpdateMemberRiskInfoAccountingBackend = function() {
                var t = this;
                (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AliPayLevel == null || this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AliPayLevel == undefined) && (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AliPayLevel = "");
                (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.WeChatLevel == null || this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.WeChatLevel == undefined) && (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.WeChatLevel = "");
                this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.MemberStatus = this.SaveAccountingMemberStatus;
                this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsLogIn = this.OriginalIsLogin;
                jQuery.extend(this.model.UpdateMemberRiskInfoAccountingBackendInput, this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput);
                jQuery.extend(this.model.NewMemberRiskInfoAccountingBackendLog, this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput);
                n.Helpers.ButtonDisabledSwitch("btnEditBalanceInfo", DisabledStateEnum.True, n.Helpers.ChangeLanguage("更新中"));
                this.editMemberInfoManageSvc.UpdateMemberRiskInfoAccountingBackend(this.model.UpdateMemberRiskInfoAccountingBackendInput).then(function() {
                    t.logSvc.FieldAdapter(t.model.MemberRiskInfoAccountingBackendField, t.logSvc.LogField);
                    var i = t.diff.diffOwnProperties(t.model.OldMemberRiskInfoAccountingBackendLog, t.model.NewMemberRiskInfoAccountingBackendLog);
                    t.logSvc.CreateMemberInfoOperationLog(i, function() {
                        n.Helpers.ButtonDisabledSwitch("btnEditBalanceInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                        jQuery.extend(t.model.OldMemberRiskInfoAccountingBackendLog, t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput);
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                        t.OldIsDeposit = t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit;
                        t.ResetEditMemberRisksInfo();
                        location.reload()
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("btnEditBalanceInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.InitialMemberStatusChange = function() {
                var t;
                this.OriginalMemberStatus = angular.copy(this.model.UpdateEditMemberInfoManage.MemberStatus);
                this.MemberStatus = angular.copy(this.model.UpdateEditMemberInfoManage.MemberStatus);
                switch (this.MemberStatus) {
                case 0:
                    t = this.blockUI.instances.get("tb0");
                    t.start(n.Helpers.ChangeLanguage("停權戶不允許修改此區塊"));
                    break;
                case 4:
                    if (this.model.UpdateEditMemberRisksInfo.IsFSuspension === !0) {
                        t = this.blockUI.instances.get("tb0");
                        t.start(n.Helpers.ChangeLanguage("停權戶不允許修改此區塊"));
                        break
                    }
                }
            }
            ,
            t.prototype.MemberStatusChange = function() {
                var t = this, i;
                if (this.model.UpdateEditMemberInfoManage.MemberStatus != null) {
                    if (this.model.UpdateEditMemberInfoManage.MemberStatus == 1 && (this.model.UpdateEditMemberInfoManage.CellPhoneShow == null || this.model.UpdateEditMemberInfoManage.CellPhoneShow == "")) {
                        n.Helpers.Alert("手機號碼未驗證", SweetAlertTypeEnum.error);
                        this.model.UpdateEditMemberInfoManage.MemberStatus = angular.copy(this.MemberStatus);
                        return
                    }
                    if (this.model.UpdateEditMemberInfoManage.AccountName == "" && (this.model.UpdateEditMemberInfoManage.TestType == 1 && this.model.UpdateEditMemberInfoManage.LineType == 1 || this.model.UpdateEditMemberInfoManage.TestType == 1 && this.model.UpdateEditMemberInfoManage.LineType == 2) && this.model.UpdateEditMemberInfoManage.MemberStatus != 0 && this.model.UpdateEditMemberInfoManage.MemberStatus != 2) {
                        n.Helpers.Alert("戶名不可為空，無法開啟存款", SweetAlertTypeEnum.warning);
                        this.model.UpdateEditMemberInfoManage.MemberStatus = angular.copy(this.MemberStatus);
                        return
                    }
                    i = this.MemberStatus;
                    this.timeout(function() {
                        t.MemberStatus = angular.copy(t.model.UpdateEditMemberInfoManage.MemberStatus);
                        var r = t.blockUI.instances.get("tb0");
                        switch (t.MemberStatus) {
                        case 0:
                            t.ChangeAllState(!1);
                            r.start(n.Helpers.ChangeLanguage("停權戶不允許修改此區塊"));
                            break;
                        case 1:
                            t.ChangeAllState(!0);
                            i === 0 && (t.model.UpdateEditMemberRisksInfo.TransferOutStatus = 2);
                            r.stop();
                            break;
                        case 2:
                            t.model.UpdateEditMemberRisksInfo.TransferInStatus = "false";
                            t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = !1;
                            r.stop()
                        }
                        t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput_Temp = angular.copy(t.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput)
                    })
                }
            }
            ,
            t.prototype.ChangeAllState = function(n) {
                var t = this;
                n ? (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = !0,
                this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsBet = !0,
                this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsLogIn = !0,
                this.CheckAllGetMemberPlatformTurnoverDisabled = !1,
                this.model.UpdateEditMemberRisksInfo.Member_Platform_BlackListForSearch.forEach(function(n) {
                    n.SubItemID == null ? n.BlackStatus = "0" : n.SubItemBlackStatus = "0"
                }),
                this.model.UpdateEditMemberRisksInfo.TransferOutStatus = 1,
                this.model.UpdateEditMemberRisksInfo.TransferInStatus = "true",
                this.model.OnLineCashFlowLimitRisk.IsOpen = 1,
                this.model.AliOpCashFlowLimitRisk.IsOpen = 1,
                this.model.AliAPICashFlowLimitRisk.IsOpen = 1,
                this.model.WechatOLCashFlowLimitRisk.IsOpen = 1,
                this.model.WechatAICashFlowLimitRisk.IsOpen = 1,
                this.model.QQCashFlowLimitRisk.IsOpen = 1,
                this.model.UnionPayScanCodeCashFlowLimitRisk.IsOpen = 1,
                this.model.BaiduWalletCashFlowLimitRisk.IsOpen = 1,
                this.model.DiankaPaymentCashFlowLimitRisk.IsOpen = 1,
                this.model.JDScanCodeCashFlowLimitRisk.IsOpen = 1,
                this.model.PayFastCashFlowLimitRisk.IsOpen = 1,
                this.model.UpdateEditMemberWithdrawalLimitSurchargeSetting.Visible = "true",
                this.model.UpdateEditMemberInfoManage.IsLockLVUp = !1,
                this.model.CheckGameID = []) : (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = !1,
                this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsBet = !1,
                this.model.UpdateEditMemberRisksInfo.Member_Platform_BlackListForSearch.forEach(function(n) {
                    n.SubItemID == null ? n.BlackStatus = "1" : n.SubItemBlackStatus = "1"
                }),
                this.model.UpdateEditMemberRisksInfo.TransferOutStatus = 2,
                this.model.UpdateEditMemberRisksInfo.TransferInStatus = "false",
                this.model.OnLineCashFlowLimitRisk.IsOpen = 0,
                this.model.AliOpCashFlowLimitRisk.IsOpen = 0,
                this.model.AliAPICashFlowLimitRisk.IsOpen = 0,
                this.model.WechatOLCashFlowLimitRisk.IsOpen = 0,
                this.model.WechatAICashFlowLimitRisk.IsOpen = 0,
                this.model.QQCashFlowLimitRisk.IsOpen = 0,
                this.model.UnionPayScanCodeCashFlowLimitRisk.IsOpen = 0,
                this.model.BaiduWalletCashFlowLimitRisk.IsOpen = 0,
                this.model.DiankaPaymentCashFlowLimitRisk.IsOpen = 0,
                this.model.JDScanCodeCashFlowLimitRisk.IsOpen = 0,
                this.model.PayFastCashFlowLimitRisk.IsOpen = 0,
                this.model.UpdateEditMemberWithdrawalLimitSurchargeSetting.Visible = "false",
                this.model.UpdateEditMemberInfoManage.IsLockLVUp = !0,
                this.CheckAllGetMemberPlatformTurnoverDisabled = !0,
                this.model.GetGameListAllResult.forEach(function(n) {
                    if (t.FilterGameWithTurnoverDisabled(n)) {
                        var i = {
                            GameID: n.GameID,
                            ServiceName: n.ServiceName
                        };
                        t.model.CheckGameID.push(i)
                    }
                }))
            }
            ,
            t.prototype.DefineMemberStatusRange = function(n) {
                var t = !0;
                if (this.model.FinanceMemberStatusPermissionList.indexOf(n.toString()) == -1)
                    return t;
                switch (this.OriginalMemberStatus) {
                case 0:
                    if (n === 2 || n === 1 || n === 0) {
                        t = !1;
                        break
                    }
                    t = !0;
                    break;
                case 1:
                    if (n === 2 || n === 0 || n === 1) {
                        t = !1;
                        break
                    }
                    t = !0;
                    break;
                case 2:
                    if (n === 1 || n === 0 || n === 2) {
                        t = !1;
                        break
                    }
                    t = !0;
                    break;
                case 3:
                    if (n === 2 || n === 0 || n === 1 || n === 3) {
                        t = !1;
                        break
                    }
                    t = !0;
                    break;
                case 4:
                    if (n === 4) {
                        t = !1;
                        break
                    }
                    t = !0;
                    break;
                case 5:
                    if (n === 5) {
                        t = !1;
                        break
                    }
                    t = !0
                }
                return t
            }
            ,
            t.prototype.GetProvincesInfoByLanguageCode = function() {
                var t = this;
                this.editMemberInfoManageSvc.GetProvincesInfoByLanguageCode(this.GetProvincesInfoByLanguageCodeInput).then(function(i) {
                    var f, r, u, e, o;
                    t.model.GetProvincesInfoByLanguageCodeOutput = i;
                    f = t.model.GetProvincesInfoByLanguageCodeOutput.ValueKey;
                    t.model.ProvinceInfoList = new n.Models.ProvinceInfo;
                    r = new n.Models.ProvinceInfo;
                    r.NameKey = [];
                    r.ValueKey = [];
                    for (u in f)
                        e = new n.Models.NameKey,
                        o = new n.Models.ValueKey,
                        e.key = u,
                        e.value = f[u],
                        r.NameKey.push(e),
                        o.key = u,
                        o.value = f[u],
                        r.ValueKey.push(o);
                    t.model.ProvinceInfoList = angular.copy(r)
                }).catch(function() {})
            }
            ,
            t.prototype.InitialMemberWithdrawalBankInfoBackend = function() {
                var t = this, i;
                this.model.BankInfoList = [];
                i = this.blockUI.instances.get("tb4");
                i.start("Loading...");
                this.model.MemberWithdrawalBankInfoCount = 0;
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput = [];
                this.editMemberInfoManageSvc.GetMemberWithdrawalBankInfoBackendByAccountID(this.model.GetMemberWithdrawalBankInfoBackendByAccountIDInput).then(function(r) {
                    t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput = r;
                    t.SetBankPayeeAccountNoInfo(t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput);
                    angular.copy(t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput, t.model.GetMemberWithdrawalBankInfoBackendByAccountIDCheck);
                    t.model.MemberWithdrawalBankInfoCount = t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.length;
                    t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.length === 0 && i.stop();
                    t.model.UpdateMemberWithdrawalBankInfoBackendOld = new n.Models.UpdateMemberWithdrawalBankInfoBackend;
                    t.model.UpdateMemberWithdrawalBankInfoBackendOld = t.FillUpdateMemberWithdrawlBankInfoBackend(t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput);
                    t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.forEach(function(r, u) {
                        var c, o = angular.copy(t.model.EditBankInfoList), s = _.find(o, function(n) {
                            return n.BankCodeID === r.BankCodeID
                        }), e, f, h;
                        s != undefined && (s.Ticked = !0,
                        t.model.InputBankCodeID[u] = angular.copy(o),
                        t.model.BankInfoList.push({
                            BankCodeID: r.BankCodeID,
                            BankProID: null,
                            BankCityID: null,
                            BranchID: c
                        }),
                        e = angular.copy(t.model.ProvinceInfoList),
                        f = _.find(e.NameKey, function(n) {
                            return Number(n.key) == r.BankProID
                        }),
                        f != undefined && (f.Ticked = !0,
                        t.model.BankInfoList[u].BankProID = angular.copy(e),
                        t.model.GetCityInfoByLanguageCodeInput.CountryID = t.country,
                        t.model.GetCityInfoByLanguageCodeInput.LanguageCode = t.language,
                        t.model.GetCityInfoByLanguageCodeInput.ProvincesID = parseInt(f.key),
                        h = angular.copy(t.model.GetCityInfoByLanguageCodeInput),
                        t.editMemberInfoManageSvc.GetCityInfoByLanguageCode(h).then(function(f) {
                            var e = new n.Models.ProvinceInfo, o, s, h, c;
                            e.NameKey = [];
                            e.ValueKey = [];
                            for (o in f.ValueKey)
                                s = new n.Models.NameKey,
                                h = new n.Models.ValueKey,
                                s.key = o,
                                s.value = f.ValueKey[o],
                                e.NameKey.push(s),
                                h.key = o,
                                h.value = f.ValueKey[o],
                                e.ValueKey.push(h);
                            c = _.find(e.NameKey, function(n) {
                                return Number(n.key) == r.BankCityID
                            });
                            c != undefined && (c.Ticked = !0,
                            t.model.BankInfoList[u].BankCityID = angular.copy(e),
                            i.stop())
                        }).catch(function() {}).finally(function() {
                            if (5 - t.model.MemberWithdrawalBankInfoCount != 0)
                                for (var n = t.model.MemberWithdrawalBankInfoCount; n < 5; n++)
                                    t.AddBank(n)
                        })))
                    })
                }).catch(function(r) {
                    if (r.Error.Code == ApiStatusCodeEnum.NotResultData) {
                        if (5 - t.model.MemberWithdrawalBankInfoCount != 0)
                            for (var u = t.model.MemberWithdrawalBankInfoCount; u < 5; u++)
                                t.AddBank(u);
                        i.stop();
                        return
                    }
                    n.Helpers.AlertSwitch(r);
                    i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                })
            }
            ,
            t.prototype.GetBankCodeInfoByLanguageCode = function(n) {
                var t = this;
                this.editMemberInfoManageSvc.GetBankCodeInfoByLanguageCode(n).then(function(n) {
                    n.forEach(function(n, t, i) {
                        (n.BankCodeID == "000" || n.BankCodeID == "000") && i.splice(t, 1)
                    });
                    t.model.EditBankInfoList = angular.copy(n)
                })
            }
            ,
            t.prototype.InitialBankInfoList = function(n, t) {
                n !== 1 && (this.model.BankInfoList[t].BranchID = null,
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].BranchID = "",
                n !== 2) && (this.model.BankInfoList[t].BankCityID = null,
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].BankCityID = null,
                n !== 3) && (this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].BankProID = null,
                n === 4)
            }
            ,
            t.prototype.UpdateMemberWithdrawalBankInfoBackendModelToDescription = function() {
                var n = this;
                this.editMemberInfoManageSvc.UpdateMemberWithdrawalBankInfoBackendModelToDescription().then(function(t) {
                    n.model.UpdateMemberWithdrawalBankInfoBackendModelToDescription = t;
                    jQuery.extend(n.model.UpdateMemberWithdrawalBankInfoField, n.model.UpdateMemberWithdrawalBankInfoBackendModelToDescription);
                    jQuery.extend(n.model.DeleteMemberWithdrawalBankInfoField, n.model.UpdateMemberWithdrawalBankInfoBackendModelToDescription)
                }).catch(function() {})
            }
            ,
            t.prototype.AddBank = function(t) {
                var e, r, u, i, f;
                if (this.model.MemberWithdrawalBankInfoCount === 5) {
                    n.Helpers.Alert("最多只能5筆", SweetAlertTypeEnum.warning);
                    return
                }
                r = new n.Models.GetMemberWithdrawalBankInfoBackendByAccountIDModel;
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.push(r);
                this.model.MemberWithdrawalBankInfoCount++;
                u = angular.copy(this.model.EditBankInfoList);
                this.model.InputBankCodeID[t] = angular.copy(u);
                i = new n.Models.ProvinceInfo;
                i.NameKey = [];
                i.ValueKey = [];
                f = angular.copy(this.model.ProvinceInfoList);
                this.model.BankInfoList.push({
                    BankCodeID: null,
                    BankProID: angular.copy(f),
                    BankCityID: i,
                    BranchID: e
                });
                this.TempBankInfoList = angular.copy(this.model.BankInfoList)
            }
            ,
            t.prototype.ChangeBankCodeID = function(n) {
                this.InitialBankInfoList(4, n)
            }
            ,
            t.prototype.ChangeProvincesInfo = function(n, t) {
                this.InitialBankInfoList(3, t);
                this.model.GetCityInfoByLanguageCodeInput.CountryID = this.country;
                this.model.GetCityInfoByLanguageCodeInput.LanguageCode = this.language;
                this.model.GetCityInfoByLanguageCodeInput.ProvincesID = n;
                this.model.GetCityInfoByLanguageCodeInput.ProvincesID && this.GetCityInfoByLanguageCode(this.model.GetCityInfoByLanguageCodeInput, t)
            }
            ,
            t.prototype.GetCityInfoByLanguageCode = function(t, i) {
                var r = this;
                this.editMemberInfoManageSvc.GetCityInfoByLanguageCode(t).then(function(t) {
                    var s = t.ValueKey, h = new n.Models.ProvinceInfo, u = new n.Models.ProvinceInfo, f, e, o;
                    u.NameKey = [];
                    u.ValueKey = [];
                    for (f in s)
                        e = new n.Models.NameKey,
                        o = new n.Models.ValueKey,
                        e.key = f,
                        e.value = s[f],
                        u.NameKey.push(e),
                        o.key = f,
                        o.value = s[f],
                        u.ValueKey.push(o);
                    h = angular.copy(u);
                    r.model.BankInfoList[i].BankCityID = h
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.GetBranchInfoByLanguageCode = function(t, i) {
                var r = this;
                t.LanguageCode = this.language;
                t.CountryID = this.country;
                this.editMemberInfoManageSvc.GetBranchInfoByLanguageCode(t).then(function(n) {
                    r.model.BankInfoList[i].BranchID = n
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.FillUpdateMemberWithdrawlBankInfoBackend = function(t) {
                var i = new n.Models.UpdateMemberWithdrawalBankInfoBackend;
                return i.AccountID = this.model.AccountID,
                t.forEach(function(n) {
                    var t = {
                        PayeeAccountNo: n.PayeeAccountNo,
                        PayeeAccountName: n.PayeeAccountName,
                        BankCodeID: n.BankCodeID,
                        BankProID: n.BankProID,
                        BankCityID: n.BankCityID,
                        BranchID: n.BranchID,
                        BranchName: n.BranchName == null ? "" : n.BranchName
                    };
                    i.WithdrawalBankInfo.push(t)
                }),
                i
            }
            ,
            t.prototype.UpdateMemberWithdrawalBankInfoBackend = function(t) {
                var i = this, u = !0, f, r;
                if (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AccountName == null || this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AccountName == "")
                    return n.Helpers.AlertEvent(EventAlertEnum.Search_NoCondition, "請先設定會員戶名"),
                    !1;
                for (f = this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.length,
                r = 0; r < f; r++)
                    this.CheckBankPayeeAccountNoIsChange(r) && (this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[r].PayeeAccountNo = this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[r].PayeeAccountNoShow);
                if (this.model.UpdateMemberWithdrawalBankInfoBackendInput = new n.Models.UpdateMemberWithdrawalBankInfoBackend,
                this.model.UpdateMemberWithdrawalBankInfoBackendInput = this.FillUpdateMemberWithdrawlBankInfoBackend(this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput),
                this.model.UpdateMemberWithdrawalBankInfoBackendInput.WithdrawalBankInfo = this.model.UpdateMemberWithdrawalBankInfoBackendInput.WithdrawalBankInfo.filter(function(n) {
                    return n.BankCodeID != null || n.BankProID != null || n.BankCityID != null || n.PayeeAccountNo != null && n.PayeeAccountNo != ""
                }),
                this.model.UpdateMemberWithdrawalBankInfoBackendInput.WithdrawalBankInfo.forEach(function(n) {
                    n.BankCodeID && n.BankProID && n.BankCityID && n.PayeeAccountNo || (u = !1);
                    var t = i.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.filter(function(t) {
                        return t.PayeeAccountNo == n.PayeeAccountNo && t.PayeeAccountNo != null
                    }).length;
                    t >= 2 && (u = !1);
                    /^[0-9]+(.[0-9]{1,2})?$/.test(n.PayeeAccountNo) || (u = !1);
                    n.PayeeAccountName == null && (n.PayeeAccountName = i.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.AccountName)
                }),
                !u)
                    return u;
                this.model.VerifyBankAccountExistModel.GetMemberWithdrawalBankInfoByConditionModel = [];
                this.model.UpdateMemberWithdrawalBankInfoBackendInput.WithdrawalBankInfo.forEach(function(t) {
                    if (t.BankCodeID != null && t.BankProID != null && t.BankCityID != null && t.PayeeAccountNo != null) {
                        var r = new n.Models.MemberWithdrawalBankInfoByConditionModel;
                        r.PayeeAccountNo = t.PayeeAccountNo;
                        i.model.VerifyBankAccountExistModel.GetMemberWithdrawalBankInfoByConditionModel.push(r)
                    }
                });
                n.Helpers.ButtonDisabledSwitch("btnEditBankInfo", DisabledStateEnum.True, n.Helpers.ChangeLanguage("更新中"));
                this.model.VerifyBankAccountExistModel.ExceptAccountID = this.model.UpdateEditMemberInfoManage.AccountID;
                this.editMemberInfoManageSvc.VerifyBankAccountExist(this.model.VerifyBankAccountExistModel).then(function() {
                    return i.editMemberInfoManageSvc.UpdateMemberWithdrawalBankInfoBackend(i.model.UpdateMemberWithdrawalBankInfoBackendInput).then(function() {
                        i.model.UpdateMemberWithdrawalBankInfoBackendNew = new n.Models.UpdateMemberWithdrawalBankInfoBackend;
                        i.model.UpdateMemberWithdrawalBankInfoBackendNew = i.model.UpdateMemberWithdrawalBankInfoBackendInput;
                        i.CreateUpdateMemberWithdrawalBankInfoLog(function() {
                            n.Helpers.ButtonDisabledSwitch("btnEditBankInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                            t == !0 ? n.Helpers.AlertEvent(EventAlertEnum.Delete_Success) : n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success);
                            i.InitialMemberWithdrawalBankInfoBackend()
                        })
                    }).catch(function() {
                        n.Helpers.ButtonDisabledSwitch("btnEditBankInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                        n.Helpers.AlertEvent(EventAlertEnum.Update_Fail)
                    }),
                    !0
                }).catch(function(t) {
                    return $(".BM_bank .divBMNotify").stop(),
                    $(".BM_bank .divBMNotify").stop(!1, !0),
                    i.model.BMNotifyMessage = n.Helpers.ChangeLanguage(t.Error.Message),
                    $(".BM_bank .divBMNotify").fadeIn(100).delay(5e3).fadeOut(100),
                    !1
                })
            }
            ,
            t.prototype.CreateUpdateMemberWithdrawalBankInfoLog = function(t, i) {
                var r = this, u = [], f, e;
                if (this.model.UpdateMemberWithdrawalBankInfoBackendOld == null && (this.model.UpdateMemberWithdrawalBankInfoBackendOld = new n.Models.UpdateMemberWithdrawalBankInfoBackend),
                f = this.diff.diffOwnProperties(this.model.UpdateMemberWithdrawalBankInfoBackendOld.WithdrawalBankInfo, this.model.UpdateMemberWithdrawalBankInfoBackendNew.WithdrawalBankInfo),
                this.model.BankInfoList,
                f.changed === "equal") {
                    t && t();
                    return
                }
                angular.forEach(f.value, function(t, i) {
                    if (t.changed.indexOf("change") > -1) {
                        var f = ""
                          , e = "";
                        angular.forEach(t.value, function(t, o) {
                            if (o === "PayeeAccountNo" && (f = n.Helpers.ChangeLanguage("匯款帳號") + (":(" + (t.value || t.removed) + "): "),
                            e = n.Helpers.ChangeLanguage("匯款帳號") + (":(" + (t.value || t.added) + "): ")),
                            t.changed.indexOf("change") > -1 && r.model.UpdateMemberWithdrawalBankInfoField[o] != null) {
                                var s = ""
                                  , h = "";
                                r.model.BankInfoList[i][o] != null ? (o == "BankCodeID" ? r.model.InputBankCodeID[0].forEach(function(n) {
                                    n.BankCodeID == t.removed && (s = n.BankCodeName);
                                    n.BankCodeID == t.added && (h = n.BankCodeName)
                                }) : r.model.BankInfoList[i][o].ValueKey != null && (o == "BankProID" && r.model.BankInfoList[i][o].ValueKey.forEach(function(n) {
                                    n.key == t.removed && (s = n.value);
                                    n.key == t.added && (h = n.value)
                                }),
                                o == "BankCityID" && (r.model.BankInfoList[i][o].ValueKey.forEach(function(n) {
                                    n.key == t.added && (h = n.value)
                                }),
                                r.TempBankInfoList[i][o] != null && r.TempBankInfoList[i][o].ValueKey != null && r.TempBankInfoList[i][o].ValueKey.forEach(function(n) {
                                    n.key == t.removed && (s = n.value)
                                }))),
                                s == null && (s = r.model.BankCityOldMapper.ValueKey[t.removed])) : (s = t.removed,
                                h = t.added);
                                o != "PayeeAccountNo" ? u.push({
                                    FieldName: o.toString(),
                                    FieldDisplayName: String(r.model.UpdateMemberWithdrawalBankInfoField[o]),
                                    BeforeValue: t.removed,
                                    BeforeName: f + s,
                                    AfterValue: t.added,
                                    AfterName: e + h
                                }) : u.push({
                                    FieldName: o.toString(),
                                    FieldDisplayName: String(r.model.UpdateMemberWithdrawalBankInfoField[o]),
                                    BeforeValue: t.removed,
                                    BeforeName: s,
                                    AfterValue: t.added,
                                    AfterName: h
                                })
                            }
                        })
                    }
                    t.changed.indexOf("added") > -1 ? angular.forEach(t.value, function(t, f) {
                        if (r.model.UpdateMemberWithdrawalBankInfoField[f] != null) {
                            var e = "";
                            r.model.BankInfoList[i][f] != null ? f == "BankCodeID" ? r.model.InputBankCodeID[0].forEach(function(n) {
                                n.BankCodeID == r.model.BankInfoList[i][f] && (e = n.BankCodeName)
                            }) : f == "BankProID" ? r.model.BankInfoList[i][f].ValueKey.forEach(function(n) {
                                n.key == t && (e = n.value)
                            }) : f == "BankCityID" ? r.model.BankInfoList[i][f].ValueKey.forEach(function(n) {
                                n.key == t && (e = n.value)
                            }) : e = r.model.BankInfoList[i][f].ValueKey[t] : e = t;
                            u.push({
                                FieldName: f.toString(),
                                FieldDisplayName: String(r.model.UpdateMemberWithdrawalBankInfoField[f]),
                                BeforeValue: n.Helpers.ChangeLanguage("新增"),
                                BeforeName: n.Helpers.ChangeLanguage("新增"),
                                AfterValue: t,
                                AfterName: e
                            })
                        }
                    }) : t.changed.indexOf("removed") > -1 && angular.forEach(t.value, function(t, f) {
                        if (r.model.UpdateMemberWithdrawalBankInfoField[f] != null) {
                            var e = "";
                            r.model.BankInfoList[i][f] != null ? f == "BankCodeID" ? r.model.InputBankCodeID[0].forEach(function(n) {
                                n.BankCodeID == r.model.BankInfoList[i][f] && (e = n.BankCodeName)
                            }) : f == "BankProID" ? r.model.BankInfoList[i][f].ValueKey.forEach(function(n) {
                                n.key == t && (e = n.value)
                            }) : f == "BankCityID" ? r.model.BankInfoList[i][f].ValueKey.forEach(function(n) {
                                n.key == t && (e = n.value)
                            }) : e = r.model.BankInfoList[i][f].ValueKey[t] : e = t;
                            u.push({
                                FieldName: f.toString(),
                                FieldDisplayName: String(r.model.UpdateMemberWithdrawalBankInfoField[f]),
                                BeforeValue: t,
                                BeforeName: e,
                                AfterValue: n.Helpers.ChangeLanguage("刪除"),
                                AfterName: n.Helpers.ChangeLanguage("刪除")
                            })
                        }
                    })
                });
                e = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: u
                };
                this.logSvc.InsertMemberInfoOperationLog(e).then(function() {
                    t && t()
                }).catch(function() {
                    t && n.Helpers.Alert(i + "操作纪录失败", SweetAlertTypeEnum.error, !1, "", null, function() {
                        t()
                    })
                })
            }
            ,
            t.prototype.DeleteMemberWithdrawalBankInfo = function(t) {
                var i = this, r;
                t.IsSQL === !1 ? (r = this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.indexOf(t),
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.splice(r, 1),
                this.model.BankInfoList.splice(r, 1),
                this.model.MemberWithdrawalBankInfoCount--) : n.Helpers.Alert(n.Helpers.ChangeLanguage("確定刪除") + "?", SweetAlertTypeEnum.warning, !0, "", null, function(n) {
                    if (n === !0) {
                        var r = i.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.indexOf(t);
                        i.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.splice(r, 1);
                        i.UpdateMemberWithdrawalBankInfoBackend(!0)
                    }
                })
            }
            ,
            t.prototype.CreateDeleteMemberWithdrawalBankInfoLog = function() {
                var i = [], t, r;
                for (t in this.model.DeleteMemberWithdrawalBankInfoOld)
                    t != "AccountID" && i.push({
                        FieldName: t.toString(),
                        FieldDisplayName: String(this.model.DeleteMemberWithdrawalBankInfoField[t]),
                        BeforeValue: this.model.DeleteMemberWithdrawalBankInfoOld[t],
                        BeforeName: n.Helpers.ChangeLanguage("匯款帳號") + (": " + this.model.DeleteMemberWithdrawalBankInfoOld[t]),
                        AfterValue: n.Helpers.ChangeLanguage("刪除"),
                        AfterName: n.Helpers.ChangeLanguage("刪除")
                    });
                r = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: i
                };
                this.logSvc.InsertMemberInfoOperationLog(r).then(function() {}).catch(function() {})
            }
            ,
            t.prototype.InitialMemberDepositAliPayInfoBackend = function() {
                var t = this
                  , i = this.blockUI.instances.get("tb5");
                i.start("Loading...");
                this.model.GetMemberDWAliPayInfoByAccountIDOutput = [];
                this.editMemberInfoManageSvc.GetMemberDWAliPayInfoByAccountID(this.model.GetMemberDWAliPayInfoByAccountIDInput).then(function(r) {
                    if (t.model.GetMemberDWAliPayInfoByAccountIDOutput = r,
                    t.SetAliPayAliPayAccountNoInfo(t.model.GetMemberDWAliPayInfoByAccountIDOutput),
                    angular.copy(t.model.GetMemberDWAliPayInfoByAccountIDOutput, t.model.GetMemberDWAliPayInfoByAccountIDCheck),
                    t.model.MemberDepositAliPayInfoCount = t.model.GetMemberDWAliPayInfoByAccountIDOutput.length,
                    6 - t.model.MemberDepositAliPayInfoCount >= 0)
                        for (var u = t.model.MemberDepositAliPayInfoCount; u < 6; u++)
                            t.AddAliPay();
                    i.stop();
                    t.model.UpdateMemberDWAliPayInfoBackendOld = new n.Models.UpdateMemberDWAliPayInfoBackend;
                    t.model.UpdateMemberDWAliPayInfoBackendOld = t.FillUpdateMemberDepositAliPayInfoBackend(t.model.GetMemberDWAliPayInfoByAccountIDOutput);
                    t.model.UpdateMemberDWAliPayInfoBackendOld.DepositAliPayInfo = t.model.UpdateMemberDWAliPayInfoBackendOld.DepositAliPayInfo.filter(function(n) {
                        return n.AliPayAccountNo != null && n.AliPayAccountNo != undefined && n.AliPayAccountNo != ""
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t);
                    i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                })
            }
            ,
            t.prototype.AddAliPay = function() {
                if (this.model.MemberDepositAliPayInfoCount === 6) {
                    n.Helpers.Alert("最多只能6筆", SweetAlertTypeEnum.warning);
                    return
                }
                var t = new n.Models.GetMemberDWAliPayInfoByAccountIDModel;
                this.model.GetMemberDWAliPayInfoByAccountIDOutput.push(t);
                this.model.MemberDepositAliPayInfoCount++
            }
            ,
            t.prototype.DeleteMemberDWAliPayInfo = function(t) {
                var i = this, r;
                t.IsSQL === !1 ? (r = this.model.GetMemberDWAliPayInfoByAccountIDOutput.indexOf(t),
                this.model.GetMemberDWAliPayInfoByAccountIDOutput.splice(r, 1),
                this.model.MemberDepositAliPayInfoCount--) : n.Helpers.Alert(n.Helpers.ChangeLanguage("確定刪除") + "?", SweetAlertTypeEnum.warning, !0, "", null, function(r) {
                    if (r === !0) {
                        var u = {
                            AccountID: i.model.AccountID,
                            AliPayAccountNo: t.AliPayAccountNo
                        };
                        i.model.DeleteMemberDWAliPayInfoOld = u;
                        i.editMemberInfoManageSvc.DeleteMemberDWAliPayInfoModel(u).then(function() {
                            i.CreateDeleteMemberDepositAliPayInfoLog();
                            i.InitialMemberDepositAliPayInfoBackend();
                            n.Helpers.AlertEvent(EventAlertEnum.Delete_Success)
                        }).catch(function(t) {
                            n.Helpers.Alert(t.Error.Message, SweetAlertTypeEnum.error)
                        })
                    }
                })
            }
            ,
            t.prototype.UpdateMemberDepositAliPayInfoBackend = function() {
                for (var t = this, r = !0, u = this.model.GetMemberDWAliPayInfoByAccountIDOutput.length, i = 0; i < u; i++)
                    this.CheckAliPayAliPayAccountNoIsChange(i) && (this.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNo = this.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNoShow);
                return (this.model.UpdateMemberDWAliPayInfoBackendInput = new n.Models.UpdateMemberDWAliPayInfoBackend,
                this.model.UpdateMemberDWAliPayInfoBackendInput = this.FillUpdateMemberDepositAliPayInfoBackend(this.model.GetMemberDWAliPayInfoByAccountIDOutput),
                this.model.UpdateMemberDWAliPayInfoBackendInput.DepositAliPayInfo = this.model.UpdateMemberDWAliPayInfoBackendInput.DepositAliPayInfo.filter(function(n) {
                    return n.AliPayAccountNo != null && n.AliPayAccountNo != undefined && n.AliPayAccountNo != ""
                }),
                this.model.UpdateMemberDWAliPayInfoBackendInput.DepositAliPayInfo.forEach(function(n) {
                    n.AliPayAccountNo || (r = !1);
                    var i = t.model.GetMemberDWAliPayInfoByAccountIDOutput.filter(function(t) {
                        return t.AliPayAccountNo == n.AliPayAccountNo
                    }).length;
                    i >= 2 && (r = !1);
                    typeof n.AliPayAccountNo == "undefined" && (r = !1)
                }),
                !r) ? !1 : (n.Helpers.ButtonDisabledSwitch("btnEditAlipayInfo", DisabledStateEnum.True, n.Helpers.ChangeLanguage("更新中")),
                this.editMemberInfoManageSvc.UpdateMemberDWAliPayInfoBackend(this.model.UpdateMemberDWAliPayInfoBackendInput).then(function() {
                    t.model.UpdateMemberDWAliPayInfoBackendNew = new n.Models.UpdateMemberDWAliPayInfoBackend;
                    t.model.UpdateMemberDWAliPayInfoBackendNew = t.model.UpdateMemberDWAliPayInfoBackendInput;
                    t.CreateUpdateMemberDepositAliPayInfoLog(function() {
                        n.Helpers.ButtonDisabledSwitch("btnEditAlipayInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                        t.InitialMemberDepositAliPayInfoBackend();
                        n.Helpers.Notify(n.Helpers.ChangeLanguage("更新成功"), NotifyTypeEunm.success)
                    }, n.Helpers.ChangeLanguage("更新成功"))
                }).catch(function(t) {
                    n.Helpers.ButtonDisabledSwitch("btnEditAlipayInfo", DisabledStateEnum.False, n.Helpers.ChangeLanguage("修改"));
                    n.Helpers.Alert(t.Error.Message, SweetAlertTypeEnum.error)
                }),
                !0)
            }
            ,
            t.prototype.FillUpdateMemberDepositAliPayInfoBackend = function(t) {
                var i = new n.Models.UpdateMemberDWAliPayInfoBackend;
                return i.AccountID = this.model.AccountID,
                t.forEach(function(n) {
                    var t = {
                        AliPayAccountNo: n.AliPayAccountNo
                    };
                    i.DepositAliPayInfo.push(t)
                }),
                i
            }
            ,
            t.prototype.CreateUpdateMemberDepositAliPayInfoLog = function(t, i) {
                var u = this, r = [], f = this.diff.diffOwnProperties(this.model.UpdateMemberDWAliPayInfoBackendOld.DepositAliPayInfo, this.model.UpdateMemberDWAliPayInfoBackendNew.DepositAliPayInfo), e;
                if (f.changed === "equal") {
                    t && t();
                    return
                }
                angular.forEach(f.value, function(t) {
                    var i, f, o, e;
                    t.changed.indexOf("change") > -1 ? (i = "",
                    f = "",
                    angular.forEach(t.value, function(t, e) {
                        e === "AliPayAccountNo" && (t.added !== undefined && (i = n.Helpers.ChangeLanguage("新增"),
                        f = n.Helpers.ChangeLanguage("支付寶帳號") + (":(" + t.added + "): ")),
                        t.added !== undefined && t.removed !== undefined && (i = n.Helpers.ChangeLanguage("支付寶帳號") + (":(" + t.removed + "): "),
                        f = n.Helpers.ChangeLanguage("支付寶帳號") + (":(" + t.added + "): ")));
                        t.changed.indexOf("change") > -1 && u.model.UpdateMemberDWAliPayInfoBackendField[e] != null && r.push({
                            FieldName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            FieldDisplayName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            BeforeValue: t.removed,
                            BeforeName: i,
                            AfterValue: t.added,
                            AfterName: f
                        })
                    })) : t.changed.indexOf("removed") > -1 ? angular.forEach(t.value, function(t) {
                        t != undefined && r.push({
                            FieldName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            FieldDisplayName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            BeforeValue: t,
                            BeforeName: n.Helpers.ChangeLanguage("支付寶帳號") + (":(" + t + "): "),
                            AfterValue: n.Helpers.ChangeLanguage("刪除"),
                            AfterName: n.Helpers.ChangeLanguage("刪除")
                        })
                    }) : t.changed.indexOf("added") > -1 && (o = "",
                    e = "",
                    angular.forEach(t.value, function(t, i) {
                        u.model.UpdateMemberDWAliPayInfoBackendField[i] != null && (e = n.Helpers.ChangeLanguage("支付寶帳號") + (":(" + t + "): "),
                        r.push({
                            FieldName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            FieldDisplayName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            BeforeValue: n.Helpers.ChangeLanguage("新增"),
                            BeforeName: n.Helpers.ChangeLanguage("新增"),
                            AfterValue: e,
                            AfterName: e
                        }))
                    }))
                });
                e = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: r
                };
                this.logSvc.InsertMemberInfoOperationLog(e).then(function() {
                    t && t()
                }).catch(function() {
                    t && n.Helpers.Alert(i + "操作纪录失败", SweetAlertTypeEnum.error, !1, "", null, function() {
                        t()
                    })
                })
            }
            ,
            t.prototype.CreateDeleteMemberDepositAliPayInfoLog = function() {
                var i = [], t, r;
                for (t in this.model.DeleteMemberDWAliPayInfoOld)
                    t != "AccountID" && i.push({
                        FieldName: t.toString(),
                        FieldDisplayName: "(" + n.Helpers.ChangeLanguage("支付寶帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                        BeforeValue: this.model.DeleteMemberDWAliPayInfoOld[t],
                        BeforeName: n.Helpers.ChangeLanguage("支付寶帳號") + (": " + this.model.DeleteMemberDWAliPayInfoOld[t]),
                        AfterValue: n.Helpers.ChangeLanguage("刪除"),
                        AfterName: n.Helpers.ChangeLanguage("刪除")
                    });
                r = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: i
                };
                this.logSvc.InsertMemberInfoOperationLog(r).then(function() {}).catch(function() {})
            }
            ,
            t.prototype.InitialMemberDepositWeiXinInfoBackend = function() {
                var t = this
                  , i = this.blockUI.instances.get("tb6");
                i.start("Loading...");
                this.model.GetMemberDWWeiXinInfoByAccountIDOutput = [];
                this.editMemberInfoManageSvc.GetMemberDWWeiXinInfoByAccountID(this.model.GetMemberDWWeiXinInfoByAccountIDInput).then(function(r) {
                    t.model.GetMemberDWWeiXinInfoByAccountIDOutput = r;
                    angular.copy(t.model.GetMemberDWWeiXinInfoByAccountIDOutput, t.model.GetMemberDWWeiXinInfoByAccountIDCheck);
                    t.model.MemberDepositWeiXinInfoCount = t.model.GetMemberDWWeiXinInfoByAccountIDOutput.length;
                    i.stop();
                    t.model.UpdateMemberDWWeiXinInfoBackendOld = new n.Models.UpdateMemberDWWeiXinInfoBankend;
                    t.model.UpdateMemberDWWeiXinInfoBackendOld = t.FillUpdateMemberDepositWeiXinInfoBackend(t.model.GetMemberDWWeiXinInfoByAccountIDOutput)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t);
                    i.start(n.Helpers.ChangeLanguage("資料取得發生錯誤"))
                })
            }
            ,
            t.prototype.FillUpdateMemberDepositWeiXinInfoBackend = function(t) {
                var i = new n.Models.UpdateMemberDWWeiXinInfoBankend;
                return i.AccountID = this.model.AccountID,
                t.forEach(function(n) {
                    var t = {
                        WeiXinAccountNo: n.WeiXinAccountNo,
                        NickName: n.NickName,
                        LimitType: n.LimitType
                    };
                    i.DepositWeiXinInfo.push(t)
                }),
                i
            }
            ,
            t.prototype.AddWeiXin = function() {
                if (this.model.MemberDepositWeiXinInfoCount === 5) {
                    n.Helpers.Alert("最多只能5筆", SweetAlertTypeEnum.warning);
                    return
                }
                var t = new n.Models.GetMemberDWWeiXinInfoByAccountIDModel;
                this.model.GetMemberDWWeiXinInfoByAccountIDOutput.push(t);
                this.model.MemberDepositWeiXinInfoCount++
            }
            ,
            t.prototype.DeleteMemberDWWeiXinInfo = function(t) {
                var i = this, r;
                t.IsSQL === !1 ? (r = this.model.GetMemberDWWeiXinInfoByAccountIDOutput.indexOf(t),
                this.model.GetMemberDWWeiXinInfoByAccountIDOutput.splice(r, 1),
                this.model.MemberDepositWeiXinInfoCount--) : n.Helpers.Alert(n.Helpers.ChangeLanguage("確定刪除") + "?", SweetAlertTypeEnum.warning, !0, "", null, function(r) {
                    if (r === !0) {
                        var u = {
                            AccountID: i.model.AccountID,
                            WeiXinAccountNo: t.WeiXinAccountNo,
                            LimitType: LimitTypeEnum.Unspecified
                        };
                        i.model.DeleteMemberDWWeiXinInfoOld = u;
                        i.editMemberInfoManageSvc.DeleteMemberDWWeiXInfoModel(u).then(function() {
                            i.CreateDeleteMemberDepositWeiXinInfoLog();
                            i.InitialMemberDepositWeiXinInfoBackend();
                            n.Helpers.AlertEvent(EventAlertEnum.Delete_Success)
                        }).catch(function(t) {
                            n.Helpers.Alert(t.Error.Message, SweetAlertTypeEnum.error)
                        })
                    }
                })
            }
            ,
            t.prototype.CreateDeleteMemberDepositWeiXinInfoLog = function() {
                var i = [], t, r;
                for (t in this.model.DeleteMemberDWWeiXinInfoOld)
                    t != "AccountID" && i.push({
                        FieldName: t.toString(),
                        FieldDisplayName: "(" + n.Helpers.ChangeLanguage("微信帳號維護") + ")" + n.Helpers.ChangeLanguage("微信帳號"),
                        BeforeValue: this.model.DeleteMemberDWWeiXinInfoOld[t],
                        BeforeName: n.Helpers.ChangeLanguage("微信帳號") + (": " + this.model.DeleteMemberDWWeiXinInfoOld[t]),
                        AfterValue: n.Helpers.ChangeLanguage("刪除"),
                        AfterName: n.Helpers.ChangeLanguage("刪除")
                    });
                r = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: i
                };
                this.logSvc.InsertMemberInfoOperationLog(r).then(function() {}).catch(function() {})
            }
            ,
            t.prototype.UpdateMemberDepositWeiXinInfoBackend = function() {
                var t = this;
                return this.model.MemberDepositWeiXinInfoCount === 0 ? (n.Helpers.AlertEvent(EventAlertEnum.Search_NoCondition, "至少要有一筆資料"),
                !1) : (this.model.UpdateMemberDWWeiXinInfoBackendInput = new n.Models.UpdateMemberDWWeiXinInfoBankend,
                this.model.UpdateMemberDWWeiXinInfoBackendInput = this.FillUpdateMemberDepositWeiXinInfoBackend(this.model.GetMemberDWWeiXinInfoByAccountIDOutput),
                this.editMemberInfoManageSvc.UpdateMemberDWWeiXinInfoBackend(this.model.UpdateMemberDWWeiXinInfoBackendInput).then(function() {
                    t.model.UpdateMemberDWWeiXinInfoBackendNew = new n.Models.UpdateMemberDWWeiXinInfoBankend;
                    t.model.UpdateMemberDWWeiXinInfoBackendNew = t.model.UpdateMemberDWWeiXinInfoBackendInput;
                    t.InitialMemberDepositWeiXinInfoBackend();
                    n.Helpers.AlertEvent(EventAlertEnum.Update_Success)
                }).catch(function() {
                    n.Helpers.AlertEvent(EventAlertEnum.Update_Fail)
                }),
                !0)
            }
            ,
            t.prototype.CreateUpdateMemberDepositWeiXinInfoLog = function() {
                var i = this, t = [], r = this.diff.diffOwnProperties(this.model.UpdateMemberDWWeiXinInfoBackendOld.DepositWeiXinInfo, this.model.UpdateMemberDWWeiXinInfoBackendNew.DepositWeiXinInfo), u;
                r.changed !== "equal" && (angular.forEach(r.value, function(r) {
                    var f, e, o, u;
                    r.changed.indexOf("change") > -1 ? (f = "",
                    e = "",
                    angular.forEach(r.value, function(r, u) {
                        u === "WeiXinAccountNo" && (f = n.Helpers.ChangeLanguage("微信帳號") + (":(" + (r.value || r.removed) + "): "),
                        e = n.Helpers.ChangeLanguage("微信帳號") + (":(" + (r.value || r.added) + "): "));
                        u === "NickName" && (f = n.Helpers.ChangeLanguage("暱稱") + (":(" + (r.value || r.removed) + "): "),
                        e = n.Helpers.ChangeLanguage("暱稱") + (":(" + (r.value || r.added) + "): "));
                        r.changed.indexOf("change") > -1 && i.model.UpdateMemberDWAliPayInfoBackendField[u] != null && t.push({
                            FieldName: "(" + n.Helpers.ChangeLanguage("微信帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            FieldDisplayName: "(" + n.Helpers.ChangeLanguage("微信帳號維護") + ")" + n.Helpers.ChangeLanguage("支付寶帳號"),
                            BeforeValue: r.removed,
                            BeforeName: f,
                            AfterValue: r.added,
                            AfterName: e
                        })
                    })) : r.changed.indexOf("added") > -1 && (o = "",
                    u = "",
                    angular.forEach(r.value, function(r, f) {
                        i.model.UpdateMemberDWAliPayInfoBackendField[f] != null && (f === "WeiXinAccountNo" && (o = n.Helpers.ChangeLanguage("微信帳號") + (":(" + (r.value || r.removed) + "): "),
                        u = n.Helpers.ChangeLanguage("微信帳號") + (":(" + (r.value || r.added) + "): ")),
                        f === "NickName" && (o = n.Helpers.ChangeLanguage("暱稱") + (":(" + (r.value || r.removed) + "): "),
                        u = n.Helpers.ChangeLanguage("暱稱") + (":(" + (r.value || r.added) + "): ")),
                        t.push({
                            FieldName: "(" + n.Helpers.ChangeLanguage("微信帳號維護") + ")" + n.Helpers.ChangeLanguage("微信帳號"),
                            FieldDisplayName: "(" + n.Helpers.ChangeLanguage("微信帳號維護") + ")" + n.Helpers.ChangeLanguage("微信帳號"),
                            BeforeValue: n.Helpers.ChangeLanguage("新增"),
                            BeforeName: n.Helpers.ChangeLanguage("新增"),
                            AfterValue: u,
                            AfterName: u
                        }))
                    }))
                }),
                u = {
                    Operated: this.model.AccountID,
                    OperateType: OperateTypeEnum.Update,
                    DataID: this.model.AccountID,
                    Content: t
                },
                this.logSvc.InsertMemberInfoOperationLog(u).then(function() {}).catch(function() {}))
            }
            ,
            t.prototype.GetMemberSNInfoBackendReportGetByAccountID = function() {
                var t = this;
                this.model.GetMemberSNInfoBackendReportGetByAccountIDInput.AccountID = this.model.AccountID;
                this.editMemberInfoManageSvc.GetMemberSNInfoBackendReportGetByAccountID(this.model.GetMemberSNInfoBackendReportGetByAccountIDInput).then(function(n) {
                    var r, i;
                    for (t.model.GetMemberSNInfoBackendReportGetByAccountIDResult = n,
                    r = 0; r < t.model.GetGameListResult.length; r++)
                        for (t.model.GetGameListResult[r].BetAmount = 0,
                        t.model.GetGameListResult[r].BetCount = 0,
                        t.model.GetGameListResult[r].BetResult = 0,
                        i = 0; i < t.model.GetMemberSNInfoBackendReportGetByAccountIDResult.length; i++)
                            if (t.model.GetGameListResult[r].GameID == t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].PlatformType) {
                                t.model.GetGameListResult[r].BetAmount = t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetAmount;
                                t.model.GetGameListResult[r].BetCount = t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetCount;
                                t.model.GetGameListResult[r].BetResult = t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetResult;
                                t.model.GetGameListResult[r].PlatformType = t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].PlatformType;
                                t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].PlatformType != "Lover" && (t.model.ReportTotal.TotalBetResult += t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetResult,
                                t.model.ReportTotal.TotalBetAmount += t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetAmount,
                                t.model.ReportTotal.TotalBetCount += t.model.GetMemberSNInfoBackendReportGetByAccountIDResult[i].BetCount);
                                break
                            }
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.FormatMoment = function(n, t) {
                return (t === void 0 && (t = !1),
                t) ? n.endOf("day").format("YYYY-MM-DD HH:mm:ss") : n.startOf("day").format("YYYY-MM-DD HH:mm:ss")
            }
            ,
            t.prototype.FormatMomentToShortDate = function(n, t) {
                return (t === void 0 && (t = !1),
                t) ? n.endOf("day").format("YYYY-MM-DD") : n.startOf("day").format("YYYY-MM-DD")
            }
            ,
            t.prototype.RegisterValidation = function() {
                var t = this;
                jQuery.validator.addMethod("ckNumber", function(n) {
                    return !isNaN(n) && angular.isNumber(+n)
                });
                jQuery.validator.addMethod("ckSpace", function(n) {
                    return /^[^\x20]{0,}$/.test(n)
                });
                jQuery.validator.addMethod("validatorNumAndEnglish", function(n) {
                    return n != null && n != "" ? /^[a-zA-Z0-9]{6,10}$/.test(n) : !0
                });
                jQuery.validator.addMethod("validatorPositiveInt", function(n) {
                    return /^\d+$/.test(n)
                });
                jQuery.validator.addMethod("ckCellPhone", function(n) {
                    return !n || !t.CheckCellPhoneIsChange() ? !0 : /1\d{10}/.test(n)
                });
                jQuery.validator.addMethod("ckIdentity", function(i) {
                    return i == null || i == "" || !t.CheckIDNumberIsChange() ? !0 : n.Helpers.IdentityCheck(i)
                });
                jQuery.validator.addMethod("ckPayeeAccountNo", function(n) {
                    return t.model.GetMemberWithdrawalBankInfoBackendByAccountIDCheck.length == 0 ? !0 : t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.filter(function(t) {
                        return t.PayeeAccountNo == n
                    }).length < 2
                });
                jQuery.validator.addMethod("ckAliPayAccountNo", function(n) {
                    var r, u, i;
                    if (t.model.GetMemberDWAliPayInfoByAccountIDCheck.length == 0)
                        return !0;
                    for (r = 0,
                    u = t.model.GetMemberDWAliPayInfoByAccountIDOutput.length,
                    i = 0; i < u; i++)
                        (t.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNo != "" || t.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNoShow != "") && (t.CheckAliPayAliPayAccountNoIsChange(i) ? t.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNoShow == n && r++ : t.model.GetMemberDWAliPayInfoByAccountIDOutput[i].AliPayAccountNo == n && r++);
                    return r < 2
                });
                jQuery.validator.addMethod("ckWeiXinAccountNo", function(n) {
                    return t.model.GetMemberDWWeiXinInfoByAccountIDCheck.length == 0 ? !0 : t.model.GetMemberDWWeiXinInfoByAccountIDOutput.filter(function(t) {
                        return t.WeiXinAccountNo == n
                    }).length < 2
                });
                jQuery.validator.addMethod("validatorEmail", function(n) {
                    return !n || !t.CheckEmailIsChange() ? !0 : /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(n.trim())
                });
                jQuery.validator.addMethod("ckPasswordConfirmation", function(n) {
                    return t.model.UpdateMemberInfoPWDModel.PWD != null ? n.toLowerCase() === t.model.UpdateMemberInfoPWDModel.PWD.toLowerCase() : !0
                });
                jQuery.validator.addMethod("ckWithdrawalPasswordConfirmation", function(n) {
                    return t.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD != null ? n.toLowerCase() === t.model.UpdateMemberInfoWithdrawalPWDModel.WithdrawalPWD.toLowerCase() : !0
                });
                jQuery.validator.addMethod("ckValidatorNum", function(n) {
                    return /^[0-9]+(.[0-9]{1,2})?$/.test(n)
                });
                jQuery.validator.addMethod("ckWithdrawalRequired", function(n, t, i) {
                    return jQuery("#hfBankCodeID" + i).val() != null && jQuery("#hfBankCodeID" + i).val() != "" || jQuery("#hfBankProID" + i).val() != null && jQuery("#hfBankProID" + i).val() != "" || jQuery("#hfBankCityID" + i).val() != null && jQuery("#hfBankCityID" + i).val() != "" || jQuery("#PayeeAccountNo" + i).val() != null && jQuery("#PayeeAccountNo" + i).val() != "" ? !!n : !0
                });
                jQuery.validator.addMethod("ckWithdrawalValidatorNum", function(n, i, r) {
                    return jQuery("#BankCodeID" + r).val() || jQuery("#BankProID" + r).val() || jQuery("#BankCityID" + r).val() || jQuery("#PayeeAccountNo" + r).val() != null && jQuery("#PayeeAccountNo" + r).val() != "" && t.CheckBankPayeeAccountNoIsChange(r) ? /^[0-9]+(.[0-9]{1,2})?$/.test(n) : !0
                });
                jQuery.validator.addMethod("ckWithdrawalPayeeAccountNo", function(i, r, u) {
                    var e, o, f;
                    if (jQuery("#BankCodeID" + u).val() || jQuery("#BankProID" + u).val() || jQuery("#BankCityID" + u).val() || jQuery("#PayeeAccountNo" + u).val() != null && jQuery("#PayeeAccountNo" + u).val() != "" && t.CheckBankPayeeAccountNoIsChange(u)) {
                        for (e = 0,
                        o = t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput.length,
                        f = 0; f < o; f++)
                            (t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[f].PayeeAccountNo != "" || t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[f].PayeeAccountNoShow != "") && (t.CheckBankPayeeAccountNoIsChange(f) ? t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[f].PayeeAccountNoShow == i && e++ : t.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[f].PayeeAccountNo == i && e++);
                        return e > 1 && ($(".BM_bank .divBMNotify").stop(),
                        $(".BM_bank .divBMNotify").stop(!1, !0),
                        $(".BM_bank .divBMNotify").text(n.Helpers.ChangeLanguage("匯款帳號已存在，請勿重複添加")).fadeIn(100).delay(5e3).fadeOut(100)),
                        e < 2
                    }
                    return !0
                });
                jQuery.validator.addMethod("ckAmount", function(n) {
                    return !isNaN(n) && /^[+-]?([0-9]{1,2})(\.[0-9]{1,6})?$/.test(n)
                })
            }
            ,
            t.prototype.GoBackToList = function() {
                window.location.href = "MemberInfoManage"
            }
            ,
            t.prototype.formatDate = function(n) {
                if (n == null)
                    return "";
                var t = new Date(n)
                  , i = "" + (t.getMonth() + 1)
                  , r = "" + t.getDate()
                  , u = t.getFullYear()
                  , f = " " + ("0" + t.getHours()).slice(-2)
                  , e = ":" + ("0" + t.getMinutes()).slice(-2);
                return i.length < 2 && (i = "0" + i),
                r.length < 2 && (r = "0" + r),
                [u, i, r].join("-") + f + e
            }
            ,
            t.prototype.ModalCancel = function() {
                jQuery.fancybox.close()
            }
            ,
            t.prototype.HandleErrorCode = function(t) {
                switch (t.Error.Code) {
                case 4e3:
                    n.Helpers.Alert(t.Error.Message, SweetAlertTypeEnum.error, !1, "", null, function() {
                        window.location.href = "MemberInfoManage"
                    });
                    break;
                default:
                    n.Helpers.AlertEvent(EventAlertEnum.Update_Fail)
                }
            }
            ,
            t.prototype.OpenLog = function() {
                return this.model.LogQueryCondition.PageIndex = 0,
                this.model.LogQueryCondition.PageSize = this.model.LoaPageSize,
                this.model.LogQueryCondition.DataID = this.model.AccountID,
                this.model.LogQueryCondition.Operated = this.model.AccountID,
                this.model.LogQueryConditionCache = new n.Models.MemberInfoLogQueryByMultiAccountID,
                angular.copy(this.model.LogQueryCondition, this.model.LogQueryConditionCache),
                this.QueryLog(),
                !0
            }
            ,
            t.prototype.SetupTimeRange = function(t) {
                this.model.SelectedDatePicker = t;
                var i, r;
                switch (t) {
                case DatePickerEnum.Today:
                    i = moment();
                    r = i;
                    break;
                case DatePickerEnum.Yesterday:
                    i = moment().add("-1", "day");
                    r = i;
                    break;
                case DatePickerEnum.ThisWeek:
                    i = moment().startOf("isoweek").isoWeekday(1);
                    r = moment().endOf("isoweek").isoWeekday(7);
                    break;
                case DatePickerEnum.LastWeek:
                    i = moment().subtract(1, "weeks").startOf("isoWeek");
                    r = moment().subtract(1, "weeks").endOf("isoWeek");
                    break;
                case DatePickerEnum.ThisMonth:
                    i = moment().startOf("month");
                    r = moment().endOf("month");
                    break;
                case DatePickerEnum.LastMonth:
                    i = moment().add(-1, "month").startOf("month");
                    r = moment().add(-1, "month").endOf("month");
                    break;
                case DatePickerEnum.All:
                    i = moment("2016-01-01", "YYYY-MM-dd");
                    r = moment()
                }
                this.model.LogQueryCondition.StartTime = this.FormatMoment(i);
                this.model.LogQueryCondition.EndTime = this.FormatMoment(r, !0);
                this.model.LogQueryCondition.PageIndex = 0;
                this.model.LogQueryConditionCache = new n.Models.MemberInfoLogQueryByMultiAccountID;
                angular.copy(this.model.LogQueryCondition, this.model.LogQueryConditionCache);
                this.QueryLog()
            }
            ,
            t.prototype.QueryLog = function() {
                var t = this
                  , i = this.model.LogQueryConditionCache;
                this.model.MemberInfoContentQueryInput.MemberMemoType != null || this.model.MemberInfoContentQueryInput.MemberStatus != null ? (this.model.SearchMemberInfoManage.MemberMemoType = parseInt(this.model.MemberInfoContentQueryInput.MemberMemoType),
                this.model.SearchMemberInfoManage.MemberStatus = parseInt(this.model.MemberInfoContentQueryInput.MemberStatus),
                this.editMemberInfoManageSvc.GetMemberSNInfoBackendByCondition(this.model.SearchMemberInfoManage).then(function(r) {
                    r.Data.forEach(function(t) {
                        var r = new n.Models.OperatedEntity
                          , u = new n.Models.DataIDEntity;
                        r.Operated = t.AccountID;
                        u.DataID = t.AccountID;
                        i.OperatorList.push(r);
                        i.DataIDList.push(u)
                    });
                    t.logSvc.GetMemberInfoOperationLogByMultiAccount(i).then(function(n) {
                        n.Pager.TotalItemCount = n.TotalItemCount;
                        n.Pager = t.xPagerSvc.GetPager(n.Pager);
                        t.model.Logs = n.Data;
                        t.model.LogPager = n.Pager
                    }).catch(function(i) {
                        t.model.Logs = null;
                        t.model.LogPager = t.xPagerSvc.GetPageList([]);
                        n.Helpers.AlertSwitch(i)
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })) : this.logSvc.GetMemberInfoOperationLogByMultiAccount(i).then(function(n) {
                    n.Pager.TotalItemCount = n.TotalItemCount;
                    n.Pager = t.xPagerSvc.GetPager(n.Pager);
                    t.model.Logs = n.Data;
                    t.model.LogPager = n.Pager
                }).catch(function(i) {
                    t.model.Logs = null;
                    t.model.LogPager = t.xPagerSvc.GetPageList([]);
                    n.Helpers.AlertSwitch(i)
                })
            }
            ,
            t.prototype.PushQueryLogContent = function(n, t) {
                return this.model.MemberInfoContentQueryInput[n] != null ? {
                    FieldName: n,
                    AfterValue: t
                } : null
            }
            ,
            t.prototype.ChangeLogPage = function(n) {
                this.ValidatePageNumber(n, this.model.LogPager) && (this.model.LogQueryConditionCache.PageIndex = n - 1,
                this.LogCurrentPage && (this.LogCurrentPage = n),
                this.QueryLog())
            }
            ,
            t.prototype.IsEmptyObject = function(n) {
                return n == null ? !0 : jQuery.isEmptyObject(n)
            }
            ,
            t.prototype.ValidatePageNumber = function(n, t) {
                return /^[0-9]*[1-9][0-9]*$/.test(n.toString()) ? n > t.PageCount || n <= 0 ? !1 : t.PageNumber === n ? !1 : !0 : !1
            }
            ,
            t.prototype.CheckVal = function(n) {
                return /[A-Z]{1}/.test(n) ? !0 : !1
            }
            ,
            t.prototype.GetMemberLoginLogDeviceNoByCondition = function(t) {
                var i = this;
                return t === void 0 && (t = this.model.GetLoginMutipleDeviceModel),
                this.model.GetLoginMutipleDeviceList = [],
                this.model.LoginMutiplePager = this.xPagerSvc.GetPageList([], 1, this.model.LoginMutiplePageSize),
                this.model.LoginMutipleTableParams = new this.ngTableParams({},{}),
                t.AccountID = angular.copy(this.model.UpdateEditMemberInfoManage.AccountID),
                t.RecordCounts = this.model.LoginMutiplePageSize,
                this.model.GetLoginMutipleDeviceModel = angular.copy(t),
                this.editMemberInfoManageSvc.GetMemberLoginLogDeviceNoByCondition(t).then(function(n) {
                    i.model.LoginMutiplePager = i.xPagerSvc.GetPager(n.Pager);
                    i.model.GetLoginMutipleDeviceList = n.Data;
                    i.BuildLoginMutipleNgTableParams(i.model.GetLoginMutipleDeviceList)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t);
                    return
                }),
                !0
            }
            ,
            t.prototype.BuildLoginMutipleNgTableParams = function(n) {
                var t = this;
                this.model.LoginMutipleTableParams = n != null ? new this.ngTableParams({
                    page: 1,
                    count: this.model.LoginMutiplePager.PageSize,
                    sorting: {
                        Status: "asc"
                    }
                },{
                    counts: [],
                    getData: function(i) {
                        return i.sorting() ? t.$filter("orderBy")(n, i.orderBy()) : n
                    }
                }) : new this.ngTableParams({},{})
            }
            ,
            t.prototype.ChangeLoginMutiplePage = function(n) {
                /^[0-9]*[1-9][0-9]*$/.test(n + "") && this.model.LoginMutiplePager.PageNumber !== n && (n > this.model.LoginMutiplePager.PageCount || n < 1 || (this.model.LoginMutiplePager.PageNumber = n,
                this.model.GetLoginMutipleDeviceModel.PageNumber = n - 1,
                this.GetMemberLoginLogDeviceNoByCondition(this.model.GetLoginMutipleDeviceModel)))
            }
            ,
            t.prototype.GetMemberBalanceSummaryChangeRecordByCondition = function() {
                var t = this;
                return this.editMemberInfoManageSvc.GetMemberBalanceSummaryChangeRecordByCondition(this.model.MemberChangeRecordPostModel).then(function(n) {
                    n.Pager.TotalItemCount = n.TotalItemCount;
                    n.Pager = t.xPagerSvc.GetPager(n.Pager);
                    t.model.MemberChangeRecordList = n.Data;
                    t.model.MemberChangeRecordPager = n.Pager;
                    t.fancyboxFixPosition(".limit_High")
                }).catch(function(i) {
                    t.model.MemberChangeRecordList = null;
                    t.model.MemberChangeRecordPager = t.xPagerSvc.GetPageList([]);
                    n.Helpers.AlertSwitch(i);
                    return
                }),
                !0
            }
            ,
            t.prototype.ChangeMemberBalanceSummaryChangeRecordPage = function(n) {
                /^[0-9]*[1-9][0-9]*$/.test(n + "") && this.model.MemberChangeRecordPager.PageNumber !== n && (n > this.model.MemberChangeRecordPager.PageCount || n < 1 || (this.model.MemberChangeRecordPager.PageNumber = n,
                this.MemberChangeRecordChangePage && (this.MemberChangeRecordChangePage = n),
                this.model.MemberChangeRecordPostModel.PageNumber = n - 1,
                this.GetMemberBalanceSummaryChangeRecordByCondition()))
            }
            ,
            t.prototype.EndMemberBalanceSummaryChangeRecord = function() {
                this.model.MemberChangeRecordPostModel.PageNumber = 0;
                this.model.MemberChangeRecordList = null;
                this.model.MemberChangeRecordPager = this.xPagerSvc.GetPageList([])
            }
            ,
            t.prototype.DepositChanged = function() {
                if (this.MemberStatus != 3) {
                    if (this.model.UpdateEditMemberInfoManage.MemberStatus == 1) {
                        this.model.UpdateEditMemberInfoManage.MemberStatus = 2;
                        this.SaveAccountingMemberStatus = 2;
                        this.MemberStatusChange();
                        return
                    }
                } else if (this.model.UpdateEditMemberInfoManage.MemberStatus == 1) {
                    this.model.UpdateEditMemberInfoManage.MemberStatus = 3;
                    this.SaveAccountingMemberStatus = 3;
                    this.MemberStatusChange();
                    return
                }
                if (this.model.UpdateEditMemberInfoManage.MemberStatus == 2 && this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit == !0 && !this.model.UpdateEditMemberInfoManage.AccountName) {
                    n.Helpers.Alert("戶名不可為空，無法開啟存款", SweetAlertTypeEnum.warning);
                    this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = !1;
                    return
                }
                if (this.model.UpdateEditMemberInfoManage.MemberStatus == 2 && this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit == !0 && this.model.UpdateEditMemberInfoManage.AccountName) {
                    this.model.UpdateEditMemberInfoManage.MemberStatus = 1;
                    this.SaveAccountingMemberStatus = 1;
                    this.MemberStatusChange();
                    return
                }
                if (this.model.UpdateEditMemberInfoManage.MemberStatus == 2 && this.model.UpdateEditMemberInfoManage.PhoneVerifiedTime != null) {
                    this.model.UpdateEditMemberInfoManage.MemberStatus = 1;
                    this.SaveAccountingMemberStatus = 1;
                    this.MemberStatusChange();
                    return
                }
                if (this.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit === !0 && this.model.UpdateEditMemberInfoManage.MemberStatus == 3) {
                    this.model.UpdateEditMemberInfoManage.MemberStatus = 1;
                    this.SaveAccountingMemberStatus = 1;
                    this.MemberStatusChange();
                    return
                }
            }
            ,
            t.prototype.RegisterChkEvent = function() {
                var t = this, i = jQuery("#txtCellPhone"), n;
                i.on("propertychange input", function() {
                    t.VerifyMemberInfoCellPhone(i)
                });
                n = jQuery("#txtEmail");
                n.on("propertychange input", function() {
                    t.VerifyMemberInfoEmail(n)
                })
            }
            ,
            t.prototype.VerifyMemberInfoCellPhone = function(t) {
                var e = n.Helpers.ChangeLanguage("已註冊"), u = jQuery(t).parent(), f = u.children(".errorText"), r, i;
                (f.length > 0 && f.text() == e && f.remove(),
                r = jQuery(t).val(),
                r != "") && /1\d{10}/.test(r) != !1 && (i = {},
                i.AccountID = this.model.AccountID,
                i.CellPhone = r,
                i.EMail = "",
                this.editMemberInfoManageSvc.VerifyMemberInfoEmailCellPhone(i).then(function() {}).catch(function() {
                    var n = u.children(".errorText");
                    n.length > 0 && n.remove();
                    u.append('<span class="errorText">' + e + "<\/span>")
                }))
            }
            ,
            t.prototype.VerifyMemberInfoEmail = function(t) {
                var f = n.Helpers.ChangeLanguage("已註冊"), e = jQuery(t).parent(), u = e.children(".errorText"), r, i;
                (u.length > 0 && u.text() == f && u.remove(),
                r = jQuery(t).val(),
                r != "") && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(r) != !1 && (i = {},
                i.AccountID = this.model.AccountID,
                i.CellPhone = "",
                i.EMail = r,
                this.editMemberInfoManageSvc.VerifyMemberInfoEmailCellPhone(i).then(function() {}).catch(function() {
                    var n = jQuery(t).parent()
                      , i = n.children(".errorText");
                    i.length > 0 && i.remove();
                    n.append('<span class="errorText">' + f + "<\/span>")
                }))
            }
            ,
            t.prototype.ChangeShowCustomerQueField = function() {
                this.model.ShowCustomerQueField = this.model.ShowCustomerQueField == !0 ? !1 : !0
            }
            ,
            t.prototype.BindingProvinces = function() {
                var t = this
                  , i = new n.Models.ProvincesFilterModelMember;
                i.LanguageCode = "zh-cn";
                i.CountryID = 2;
                this.editMemberInfoManageSvc.GetProvincesInfoByLanguageCode(i).then(function(n) {
                    n == null && (t.model.DefaultProvinceOption = null);
                    t.model.Provinces = n
                }).catch(function(i) {
                    t.model.DefaultProvinceOption = null;
                    t.model.Provinces = null;
                    n.Helpers.AlertSwitch(i)
                })
            }
            ,
            t.prototype.ChangeProvincesInfos = function() {
                var t = this
                  , i = new n.Models.CityInfoPostModelMember;
                if (i.LanguageCode = "zh-cn",
                i.CountryID = 2,
                i.ProvincesID = this.model.UpdateEditMemberInfoManage.ProvincesID == null ? 0 : this.model.UpdateEditMemberInfoManage.ProvincesID,
                i.LanguageCode == "" || i.CountryID == 0 || i.ProvincesID == 0) {
                    this.model.CityInfoModel = null;
                    return
                }
                this.editMemberInfoManageSvc.GetCityInfoByLanguageCode(i).then(function(n) {
                    var i, r;
                    n == null && (t.model.CityInfoModel = null);
                    t.model.CityInfoModel = n;
                    t.logSvc.LogField.CityID || t.NewFieldData("CityID", "城市");
                    for (i in t.model.CityInfoModel.NameKey)
                        r = {
                            Value: t.model.CityInfoModel.NameKey[i].toString(),
                            Text: i
                        },
                        t.logSvc.LogField.CityID.MapperData.indexOf(r) === -1 && t.logSvc.LogField.CityID.MapperData.push(r)
                }).catch(function(i) {
                    n.Helpers.AlertSwitch(i);
                    t.model.CityInfoModel = null
                })
            }
            ,
            t.prototype.NewFieldData = function(t, i) {
                var r = new n.Models.LogFieldData;
                r.FieldDisplayName = i;
                r.MapperData = [];
                this.logSvc.LogField[t] = r
            }
            ,
            t.prototype.OpenLoginLog = function(t) {
                var i = parent;
                return i.OpenTargetLinkTab("member-" + this.model.UpdateEditMemberInfoManage.AccountID, n.Helpers.ChangeLanguage("一機多登查詢"), t + "?AccountId=" + this.model.UpdateEditMemberInfoManage.AccountID),
                !0
            }
            ,
            t.prototype.GetVerifyIdentity = function() {
                var t = this, i = this.model.UpdateEditMemberInfoManage.IDNumber, r;
                if ((this.CheckIDNumberIsChange() && (i = this.model.UpdateEditMemberInfoManage.IDNumberShow),
                i != null && i != "" && this.model.IsIdentityValid) && /^[\w]*$/.test(i))
                    if (this.model.UpdateEditMemberInfoManage.IDVerifiedTime != null && this.model.UpdateEditMemberInfoManage.ResidentAddress != null && this.model.UpdateEditMemberInfoManage.ResidentAddress != "" && this.model.UpdateEditMemberInfoManage.Sex != null && this.model.UpdateEditMemberInfoManage.Sex > 0)
                        this.model.MemberSNInfoBackendByVerifyIdentity.IDNumber = i,
                        this.model.MemberSNInfoBackendByVerifyIdentity.AccountName = this.model.UpdateEditMemberInfoManage.AccountName,
                        this.editMemberInfoManageSvc.GetMemberSNInfoBackendByVerifyIdentityFromDBAPI(this.model.MemberSNInfoBackendByVerifyIdentity).then(function(n) {
                            n.Data.VerifyIdentityStatus == 0 ? (t.model.IdCardInfoResult = n.Data,
                            t.model.UpdateEditMemberInfoManage.IDVerifiedTime = t.model.OldMemberBaseInfo.IDVerifiedTime,
                            t.model.IsQueryByMemeberInfo = !0) : (t.model.UpdateEditMemberInfoManage.IDVerifiedTime = null,
                            t.model.IsQueryByMemeberInfo = !1)
                        }).catch(function() {
                            n.Helpers.Alert("戶名身分證號錯誤", SweetAlertTypeEnum.error)
                        });
                    else {
                        if (r = this.model.UpdateEditMemberInfoManage.AccountName,
                        this.CheckAccountNameIsChange() && (r = this.model.UpdateEditMemberInfoManage.AccountNameShow),
                        r == null || r == "") {
                            n.Helpers.Alert("戶名為必要欄位", SweetAlertTypeEnum.warning);
                            return
                        }
                        this.model.VerifyIdentityModel.AccountID = this.model.UpdateEditMemberInfoManage.AccountID;
                        this.model.VerifyIdentityModel.Identitycard = i;
                        this.model.VerifyIdentityModel.Name = r;
                        this.model.VerifyIdentityModel.VerifyUsage = 1;
                        this.editMemberInfoManageSvc.GetVerifyIdentityFromAPI(this.model.VerifyIdentityModel).then(function(n) {
                            n.Data != null && n.Data.IdCardInfo.VerifyIdentityStatus == 0 ? (t.model.IdCardInfoResult = n.Data,
                            t.model.UpdateEditMemberInfoManage.IDVerifiedTime = t.model.OldMemberBaseInfo.IDVerifiedTime,
                            t.model.UpdateEditMemberInfoManage.ResidentAddress = t.model.IdCardInfoResult.IdCardInfo.ResidentAddress,
                            t.model.UpdateEditMemberInfoManage.Sex = t.model.IdCardInfoResult.IdCardInfo.Sex == "男" ? 1 : 2,
                            t.model.IsQueryByMemeberInfo = !0) : t.model.IsQueryByMemeberInfo = !1;
                            n.Data.VerifyIdentityStatus == 0 ? (t.model.UpdateEditMemberInfoManage.BirthDay = t.model.IdCardInfoResult.IdCardInfo.BirthDay,
                            t.model.UpdateEditMemberInfoManage.IsIDVerified = !0,
                            t.model.UpdateEditMemberInfoManage.IDVerifiedTime = t.model.OldMemberBaseInfo.IDVerifiedTime) : (t.model.UpdateEditMemberInfoManage.IsIDVerified = !1,
                            t.model.UpdateEditMemberInfoManage.IDVerifiedTime = null)
                        }).catch(function() {
                            t.model.IsQueryByMemeberInfo = !1
                        })
                    }
            }
            ,
            t.prototype.GetMemberInfo = function() {
                var u = jQuery("<div><\/div>").addClass("hintBox"), t = jQuery("<ul><\/ul>"), f = jQuery("<li><\/li>").text(n.Helpers.ChangeLanguage("性　　別") + ": "), s = jQuery("<span><\/span>").text(this.model.IdCardInfoResult.IdCardInfo.Sex), i, e, r, o;
                return f.append(s),
                f.appendTo(t),
                i = jQuery("<li><\/li>").text(n.Helpers.ChangeLanguage("地　　址") + ": "),
                e = jQuery("<span><\/span>").text(this.model.IdCardInfoResult.IdCardInfo.ResidentAddress),
                i.append(e),
                i.appendTo(t),
                r = jQuery("<li><\/li>").text(n.Helpers.ChangeLanguage("生　　日") + ": "),
                o = jQuery("<span><\/span>").text(this.getBirthDayFormat(this.model.IdCardInfoResult.IdCardInfo.BirthDay)),
                r.append(o),
                r.appendTo(t),
                u.append(t),
                jQuery(".tooltip-idcardinfo").mouseout(),
                setTimeout(function() {
                    jQuery(".tooltip-idcardinfo").mouseover();
                    setTimeout(function() {
                        jQuery(".tooltip-idcardinfo").mouseout()
                    }, 4e3)
                }, 100),
                u.html()
            }
            ,
            t.prototype.getBirthDayFormat = function(t) {
                if (t == "")
                    return "";
                var i = new Date(t)
                  , r = i.getFullYear()
                  , u = i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1
                  , f = i.getDate() < 10 ? "0" + i.getDate() : i.getDate();
                return r + n.Helpers.ChangeLanguage("年") + u + n.Helpers.ChangeLanguage("月") + f + n.Helpers.ChangeLanguage("日")
            }
            ,
            t.prototype.VerifyIdentityChange = function() {
                this.model.UpdateEditMemberInfoManage.IDNumberShow = this.ClearMaskInfo(this.model.UpdateEditMemberInfoManage.IDNumberShow);
                jQuery(".tooltip-idcardinfo").hasClass("tooltipstered") && jQuery(".tooltip-idcardinfo").tooltipster("destroy");
                this.model.IsQueryByMemeberInfo = !1;
                this.model.UpdateEditMemberInfoManage.IsIDVerified = !1;
                this.model.UpdateEditMemberInfoManage.IDVerifiedTime = null;
                this.model.IsIdentityValid = n.Helpers.IdentityCheck(this.model.UpdateEditMemberInfoManage.IDNumberShow) ? !0 : !1
            }
            ,
            t.prototype.GetVerifyPhoneLocal = function() {
                var i = this
                  , t = this.model.UpdateEditMemberInfoManage.CellPhone;
                (this.CheckCellPhoneIsChange() && (t = this.model.UpdateEditMemberInfoManage.CellPhoneShow),
                t != null && t != "") && /1\d{10}/.test(t) && (this.model.VerifyIdentityModel.AccountID = this.model.UpdateEditMemberInfoManage.AccountID,
                this.model.VerifyIdentityModel.CellPhone = t,
                this.model.VerifyIdentityModel.Name = this.model.UpdateEditMemberInfoManage.AccountID,
                this.model.VerifyIdentityModel.VerifyUsage = 13,
                this.editMemberInfoManageSvc.GetVerifyPhoneLocal(this.model.VerifyIdentityModel).then(function(n) {
                    i.model.VerifyPhoneResultModel = n;
                    i.model.IsQueryPhoneLocalInfo = !0
                }).catch(function() {
                    n.Helpers.Alert("手機號碼錯誤", SweetAlertTypeEnum.error)
                }))
            }
            ,
            t.prototype.GetPhoneLocalInfo = function() {
                var i = jQuery("<div><\/div>").addClass("hintBox")
                  , t = jQuery("<ul><\/ul>")
                  , r = jQuery("<li><\/li>").text(n.Helpers.ChangeLanguage("手機歸屬地") + ": ")
                  , f = this.model.VerifyPhoneResultModel.Province + " " + this.model.VerifyPhoneResultModel.City
                  , e = jQuery("<span><\/span>").text(f);
                r.append(e);
                r.appendTo(t);
                var u = jQuery("<li><\/li>")
                  , o = this.model.VerifyPhoneResultModel.Company + " " + this.model.VerifyPhoneResultModel.Cardtype
                  , s = jQuery("<span><\/span>").text(o);
                return u.append(s),
                u.appendTo(t),
                i.append(t),
                jQuery(".tooltip-phone").mouseout(),
                setTimeout(function() {
                    jQuery(".tooltip-phone").mouseover();
                    setTimeout(function() {
                        jQuery(".tooltip-phone").mouseout()
                    }, 4e3)
                }, 100),
                i.html()
            }
            ,
            t.prototype.CellPhoneChange = function() {
                this.model.UpdateEditMemberInfoManage.CellPhoneShow = this.ClearMaskInfo(this.model.UpdateEditMemberInfoManage.CellPhoneShow);
                jQuery(".tooltip-phone").hasClass("tooltipstered") && jQuery(".tooltip-phone").tooltipster("destroy");
                this.model.IsQueryPhoneLocalInfo = !1;
                this.model.UpdateEditMemberInfoManage.CellPhoneShow == "" && (this.model.UpdateEditMemberInfoManage.PhoneVerifiedTime = null);
                this.model.IsCellPhoneIsVerified = /1\d{10}/.test(this.model.UpdateEditMemberInfoManage.CellPhoneShow) ? !0 : !1;
                (this.model.UpdateEditMemberInfoManage.MemberStatus == 1 || this.model.UpdateEditMemberInfoManage.MemberStatus == 3) && this.model.UpdateEditMemberInfoManage.CellPhoneShow == "" && (this.model.UpdateEditMemberInfoManage.MemberStatus = 2,
                this.MemberStatusChange())
            }
            ,
            t.prototype.CheckSurchargeModeIsSelect = function() {
                return this.model.UpdateEditMemberWithdrawalLimitSurchargeSetting.SurchargeMode == null || this.model.UpdateEditMemberWithdrawalLimitSurchargeSetting.SurchargeMode == 0 ? !1 : !0
            }
            ,
            t.prototype.TriggerInputOnBlur = function(n, t) {
                var i = "";
                return n != null && (i = n.replace(/([\u3105-\u3129\s])/g, "")),
                i.length > t && (i = i.substring(0, t)),
                i
            }
            ,
            t.prototype.TransferInStatusChange = function(t) {
                var i = t.toLowerCase() === "true"
                  , r = this.model.OldMemberRisksInfo.TransferInStatus === "true";
                if (!r && i && !this.OldIsDeposit) {
                    n.Helpers.Notify(n.Helpers.ChangeLanguage("請先開啟存款"), NotifyTypeEunm.danger);
                    this.model.UpdateEditMemberRisksInfo.TransferInStatus = this.model.OldMemberRisksInfo.TransferInStatus;
                    return
                }
            }
            ,
            t.prototype.ResetEditMemberRisksInfo = function() {
                var n = this;
                this.editMemberInfoManageSvc.GetMemberRisksInfoBackendByAccountID(this.model.EditMemberRisksInfo).then(function(t) {
                    n.model.OldMemberRisksInfo.TransferInStatus = n.model.UpdateEditMemberRisksInfo.TransferInStatus = t.TransferInStatus
                })
            }
            ,
            t.prototype.SetAccountNameInfo = function() {
                this.model.UpdateEditMemberInfoManage.AccountNameShow = this.model.BasicIsEditAccountNameNoMask ? this.model.UpdateEditMemberInfoManage.AccountName : n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.AccountName, FieldMaskTypeEnum.AccountName)
            }
            ,
            t.prototype.CheckAccountNameIsChange = function() {
                return this.model.BasicIsEditAccountNameNoMask ? this.model.UpdateEditMemberInfoManage.AccountNameShow != this.model.UpdateEditMemberInfoManage.AccountName : this.model.UpdateEditMemberInfoManage.AccountNameShow != n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.AccountName, FieldMaskTypeEnum.AccountName)
            }
            ,
            t.prototype.OnBasicAccountNameChange = function() {
                this.model.UpdateEditMemberInfoManage.AccountNameShow = this.ClearMaskInfo(this.model.UpdateEditMemberInfoManage.AccountNameShow)
            }
            ,
            t.prototype.SetIDNumberInfo = function() {
                this.model.UpdateEditMemberInfoManage.IDNumberShow = this.model.BasicIsEditIdentityNoMask ? this.model.UpdateEditMemberInfoManage.IDNumber : n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.IDNumber, FieldMaskTypeEnum.IDNumber)
            }
            ,
            t.prototype.CheckIDNumberIsChange = function() {
                return this.model.BasicIsEditIdentityNoMask ? this.model.UpdateEditMemberInfoManage.IDNumberShow != this.model.UpdateEditMemberInfoManage.IDNumber : this.model.UpdateEditMemberInfoManage.IDNumberShow != n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.IDNumber, FieldMaskTypeEnum.IDNumber)
            }
            ,
            t.prototype.SetEmailInfo = function() {
                this.model.UpdateEditMemberInfoManage.EmailShow = this.model.BasicIsEmailNoMask ? this.model.UpdateEditMemberInfoManage.Email : n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.Email, FieldMaskTypeEnum.EMail)
            }
            ,
            t.prototype.CheckEmailIsChange = function() {
                return this.model.BasicIsEmailNoMask ? this.model.UpdateEditMemberInfoManage.EmailShow != this.model.UpdateEditMemberInfoManage.Email : this.model.UpdateEditMemberInfoManage.EmailShow != n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.Email, FieldMaskTypeEnum.EMail)
            }
            ,
            t.prototype.OnBasicEmailChange = function() {
                this.model.UpdateEditMemberInfoManage.EmailShow = this.ClearMaskInfo(this.model.UpdateEditMemberInfoManage.EmailShow);
                this.model.UpdateEditMemberInfoManage.EmailVerifiedTime = null
            }
            ,
            t.prototype.SetCellPhoneInfo = function() {
                this.model.UpdateEditMemberInfoManage.CellPhoneShow = this.model.BasicIsCellPhoneNoMask ? this.model.UpdateEditMemberInfoManage.CellPhone : n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.CellPhone, FieldMaskTypeEnum.CellPhone)
            }
            ,
            t.prototype.CheckCellPhoneIsChange = function() {
                return this.model.BasicIsCellPhoneNoMask ? this.model.UpdateEditMemberInfoManage.CellPhoneShow != this.model.UpdateEditMemberInfoManage.CellPhone : this.model.UpdateEditMemberInfoManage.CellPhoneShow != n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.CellPhone, FieldMaskTypeEnum.CellPhone)
            }
            ,
            t.prototype.SetAddressInfo = function() {
                this.model.UpdateEditMemberInfoManage.AddressShow = this.model.BasicIsEditAddressNoMask ? this.model.UpdateEditMemberInfoManage.Address : n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.Address, FieldMaskTypeEnum.Address)
            }
            ,
            t.prototype.CheckAddressIsChange = function() {
                return this.model.BasicIsEditAddressNoMask ? this.model.UpdateEditMemberInfoManage.AddressShow != this.model.UpdateEditMemberInfoManage.Address : this.model.UpdateEditMemberInfoManage.AddressShow != n.Helpers.FieldMask(this.model.UpdateEditMemberInfoManage.Address, FieldMaskTypeEnum.Address)
            }
            ,
            t.prototype.OnBasicAddressChange = function() {
                this.model.UpdateEditMemberInfoManage.AddressShow = this.ClearMaskInfo(this.model.UpdateEditMemberInfoManage.AddressShow)
            }
            ,
            t.prototype.SetBankPayeeAccountNoInfo = function(t) {
                this.model.BankIsPayeeAccountNoNoMask ? t.forEach(function(n) {
                    n.PayeeAccountNoShow = n.PayeeAccountNo
                }) : t.forEach(function(t) {
                    t.PayeeAccountNoShow = n.Helpers.FieldMask(t.PayeeAccountNo, FieldMaskTypeEnum.PayAccount)
                })
            }
            ,
            t.prototype.CheckBankPayeeAccountNoIsChange = function(t) {
                return this.model.BankIsPayeeAccountNoNoMask ? this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].PayeeAccountNoShow != this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].PayeeAccountNo : this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].PayeeAccountNoShow != n.Helpers.FieldMask(this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[t].PayeeAccountNo, FieldMaskTypeEnum.PayAccount)
            }
            ,
            t.prototype.OnBankPayeeAccountNoChange = function(n) {
                this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].PayeeAccountNoShow = this.ClearMaskInfo(this.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput[n].PayeeAccountNoShow)
            }
            ,
            t.prototype.SetAliPayAliPayAccountNoInfo = function(t) {
                this.model.AliPayAliPayAccountNoMask ? t.forEach(function(n) {
                    n.AliPayAccountNoShow = n.AliPayAccountNo
                }) : t.forEach(function(t) {
                    t.AliPayAccountNoShow = n.Helpers.FieldMask(t.AliPayAccountNo, FieldMaskTypeEnum.AliPayAccount)
                })
            }
            ,
            t.prototype.CheckAliPayAliPayAccountNoIsChange = function(t) {
                return this.model.AliPayAliPayAccountNoMask ? this.model.GetMemberDWAliPayInfoByAccountIDOutput[t].AliPayAccountNoShow != this.model.GetMemberDWAliPayInfoByAccountIDOutput[t].AliPayAccountNo : this.model.GetMemberDWAliPayInfoByAccountIDOutput[t].AliPayAccountNoShow != n.Helpers.FieldMask(this.model.GetMemberDWAliPayInfoByAccountIDOutput[t].AliPayAccountNo, FieldMaskTypeEnum.AliPayAccount)
            }
            ,
            t.prototype.OnAliPayAliPayAccountNoChange = function(n) {
                this.model.GetMemberDWAliPayInfoByAccountIDOutput[n].AliPayAccountNoShow = this.ClearMaskInfo(this.model.GetMemberDWAliPayInfoByAccountIDOutput[n].AliPayAccountNoShow)
            }
            ,
            t.prototype.ClearMaskInfo = function(n) {
                return n.replace(/\*/g, "")
            }
            ,
            t.prototype.SetEachPaymentAccountBookSetting = function() {
                this.model.PCAccountBookOBA1 = this.SetSinglePaymentAccountBookSetting(1, "OBA", 1);
                this.model.PCAccountBookOBA2 = this.SetSinglePaymentAccountBookSetting(2, "OBA", 1);
                this.model.PCAccountBookOBA3 = this.SetSinglePaymentAccountBookSetting(3, "OBA", 1);
                this.model.MobileAccountBookOBA1 = this.SetSinglePaymentAccountBookSetting(1, "OBA", 2);
                this.model.MobileAccountBookOBA2 = this.SetSinglePaymentAccountBookSetting(2, "OBA", 2);
                this.model.MobileAccountBookOBA3 = this.SetSinglePaymentAccountBookSetting(3, "OBA", 2);
                this.model.PCAccountBookOQQ1 = this.SetSinglePaymentAccountBookSetting(1, "OQQ", 1);
                this.model.PCAccountBookOQQ2 = this.SetSinglePaymentAccountBookSetting(2, "OQQ", 1);
                this.model.PCAccountBookOQQ3 = this.SetSinglePaymentAccountBookSetting(3, "OQQ", 1);
                this.model.PCAccountBookOUS1 = this.SetSinglePaymentAccountBookSetting(1, "OUS", 1);
                this.model.PCAccountBookOUS2 = this.SetSinglePaymentAccountBookSetting(2, "OUS", 1);
                this.model.PCAccountBookOUS3 = this.SetSinglePaymentAccountBookSetting(3, "OUS", 1);
                this.model.PCAccountBookOJD1 = this.SetSinglePaymentAccountBookSetting(1, "OJD", 1);
                this.model.PCAccountBookOJD2 = this.SetSinglePaymentAccountBookSetting(2, "OJD", 1);
                this.model.PCAccountBookOJD3 = this.SetSinglePaymentAccountBookSetting(3, "OJD", 1);
                this.model.PCAccountBookOPF1 = this.SetSinglePaymentAccountBookSetting(1, "OPF", 1);
                this.model.PCAccountBookOPF2 = this.SetSinglePaymentAccountBookSetting(2, "OPF", 1);
                this.model.PCAccountBookOPF3 = this.SetSinglePaymentAccountBookSetting(3, "OPF", 1);
                this.model.OldMemberOPAccountBookSettingModel = angular.copy(this.model.NewMemberOPAccountBookSettingModel)
            }
            ,
            t.prototype.SetSinglePaymentAccountBookSetting = function(t, i, r) {
                var u = new n.Models.OPAccountBookModel, f;
                return u = {
                    AccountID: this.model.AccountID,
                    SEQNO: t,
                    PaywayID: i,
                    PaymentID: "",
                    DeviceType: r
                },
                f = _.filter(this.model.OriginalMemberOPAccountBookSettingModel, function(n) {
                    return n.SEQNO == t && n.PaywayID == i && n.DeviceType == r
                }),
                f.length > 0 && (u = f[0]),
                this.model.NewMemberOPAccountBookSettingModel.push(u),
                u
            }
            ,
            t.prototype.SetPaywaySuccessCount = function(t) {
                var i = 0
                  , r = _.filter(this.model.GetMemberDWCountLogByAccountIDResultList, function(n) {
                    return n.PaywayID == t
                });
                r != null && r.length > 0 && (i = r[0].CNT);
                switch (t) {
                case "OBA":
                    this.model.DepositSuccessCountOBA = i;
                    break;
                case "OQQ":
                    this.model.DepositSuccessCountOQQ = i;
                    break;
                case "OUS":
                    this.model.DepositSuccessCountOUS = i;
                    break;
                case "OJD":
                    this.model.DepositSuccessCountOJD = i;
                    break;
                case "OPF":
                    this.model.DepositSuccessCountOPF = i
                }
                return n.Helpers.ChangeLanguage("成功次數") + ":" + i
            }
            ,
            t.prototype.ChangeOPAccountBookSetting = function(t, i) {
                var r = 0, u;
                switch (t.PaywayID) {
                case "OBA":
                    r = this.model.DepositSuccessCountOBA;
                    break;
                case "OQQ":
                    r = this.model.DepositSuccessCountOQQ;
                    break;
                case "OUS":
                    r = this.model.DepositSuccessCountOUS;
                    break;
                case "OJD":
                    r = this.model.DepositSuccessCountOJD;
                    break;
                case "OPF":
                    r = this.model.DepositSuccessCountOPF
                }
                r < 10 ? (t.PaymentID = i,
                n.Helpers.Alert(n.Helpers.ChangeLanguage("暫無記憶帳本，不修改"), SweetAlertTypeEnum.warning)) : (u = _.filter(this.model.NewMemberOPAccountBookSettingModel, function(n) {
                    return n.PaywayID == t.PaywayID && n.DeviceType == t.DeviceType && n.PaymentID == t.PaymentID && n.PaymentID != ""
                }),
                u != null && u.length > 1 && (t.PaymentID = i,
                n.Helpers.Alert(n.Helpers.ChangeLanguage("此帳本已設定，不可重複"), SweetAlertTypeEnum.warning)))
            }
            ,
            t.prototype.IsSelectedItemEnabled = function(n) {
                var i = !0
                  , t = _.filter(this.model.AllOtherPaymentSetting, function(t) {
                    return t.PaywayID == n.PaywayID && t.PaymentID == n.PaymentID
                });
                return t != null && t.length > 0 && t[0].Visible == !1 && (i = !1),
                i
            }
            ,
            t.prototype.fancyboxFixPosition = function(n) {
                this.timeout(function() {
                    jQuery.fancybox.update()
                }, 300);
                n && $(n) && $(n).scrollTop(0)
            }
            ,
            t.prototype.DisplayPaywayText = function(n) {
                var t = ""
                  , i = this.model.PaywayList;
                return i != null && i.forEach(function(i) {
                    if (i.PaywayID === n) {
                        t = i.PaywayName;
                        return
                    }
                }),
                t
            }
            ,
            t.prototype.DisplayWithdrawalPaywayText = function(n) {
                var t = ""
                  , i = this.model.WithdrawalPaywayList;
                return i != null && i.forEach(function(i) {
                    if (i.PaywayID === n) {
                        t = i.PaywayName;
                        return
                    }
                }),
                t
            }
            ,
            t.prototype.DisplayDealTypeText = function(n) {
                var i = "", t;
                return t = this.TransType == 1 ? this.model.DepositDealTypeList : this.model.WithdrawalDealTypeList,
                t != null && t.forEach(function(t) {
                    if (t.DealType === n) {
                        i = t.Description;
                        return
                    }
                }),
                i
            }
            ,
            t.prototype.DisplayBankText = function(n) {
                var i = ""
                  , t = this.model.EditBankInfoList;
                return n !== undefined && t !== null && t.length > 0 && t.forEach(function(t) {
                    if (t.BankCodeID === n.toString()) {
                        i = t.BankCodeName;
                        return
                    }
                }),
                i
            }
            ,
            t.prototype.DisplayProText = function(n) {
                var i = ""
                  , t = this.model.ProvinceInfoListForMemberInfo;
                return t !== null && t.length > 0 && t.forEach(function(t) {
                    if (t.ProvincesID === n) {
                        i = t.ProvincesName;
                        return
                    }
                }),
                i
            }
            ,
            t.prototype.DisplayCityText = function(n, t) {
                var i = ""
                  , r = this.model.CityInfoList;
                return r && r.forEach(function(r) {
                    if (r.CityID === n && r.ProvincesID === t) {
                        i = r.CityName;
                        return
                    }
                }),
                i
            }
            ,
            t.prototype.GetProvincesForWalletSum = function() {
                var t = this
                  , i = {
                    CountryID: this.appConfig.Country,
                    LanguageCode: this.appConfig.LanguageCode
                };
                this.editMemberInfoManageSvc.GetProvincesInfoByLanguageCodeForMemberInfo(i).then(function(n) {
                    t.model.ProvinceInfoListForMemberInfo = angular.copy(n)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.GetCityForWalletSum = function() {
                var i = this
                  , t = new n.Models.GetCityInfoByConditionPostModelForMemberInfo;
                t.CountryID = this.appConfig.Country;
                t.LanguageCode = this.appConfig.LanguageCode;
                this.editMemberInfoManageSvc.GetCityInfoByCondition(t).then(function(n) {
                    i.model.CityInfoList = angular.copy(n)
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.GetWalletSumDisplayText = function() {
                var t = this
                  , i = new n.Models.DealTypePostModel;
                i.ActionType = 1;
                i.PlatformUseType = 2;
                i.LanguageCode = this.appConfig.LanguageCode;
                this.editMemberInfoManageSvc.GetPaywayList().then(function(i) {
                    var r = new n.Models.MemberInfoPolicyPayway;
                    return r.PaywayID = "OP",
                    r.PaywayName = n.Helpers.ChangeLanguage("在線渠道"),
                    t.model.PaywayList = i,
                    t.model.PaywayList.push(r),
                    t.editMemberInfoManageSvc.GetWithdrawalPaywayList()
                }).then(function(r) {
                    var u = new n.Models.MemberInfoPolicyPayway;
                    return u.PaywayID = "OP",
                    u.PaywayName = n.Helpers.ChangeLanguage("在線渠道"),
                    t.model.WithdrawalPaywayList = r,
                    t.model.WithdrawalPaywayList.push(u),
                    t.editMemberInfoManageSvc.GetDealTypeList(i)
                }).then(function(n) {
                    return t.model.DepositDealTypeList = n,
                    i.ActionType = 2,
                    t.editMemberInfoManageSvc.GetDealTypeList(i)
                }).then(function(n) {
                    t.model.WithdrawalDealTypeList = n;
                    t.GetProvincesForWalletSum();
                    t.GetCityForWalletSum()
                }).catch(function() {})
            }
            ,
            t.prototype.OpenWalletSumLog = function(t) {
                return this.TransType = t,
                this.WalletSumType = 0,
                this.model.WalletCondition = new n.Models.MemberInfoWalletSumLogQueryModel,
                this.model.WalletCondition.AccountID = this.model.AccountID,
                this.model.WalletCondition.TransType = t,
                this.model.WalletHistoryCondition = new n.Models.MemberInfoWalletSumHistoryLogQueryModel,
                this.model.WalletHistoryCondition.AccountID = this.model.AccountID,
                this.model.WalletHistoryCondition.TransType = t,
                this.model.WalletStatisticalDataCondition = new n.Models.MemberInfoGetMemberDailySumLogListByConditionModel,
                this.model.WalletStatisticalDataCondition.AccountID = this.model.AccountID,
                this.QueryWalletSumLog(this.model.WalletCondition),
                !0
            }
            ,
            t.prototype.ChangeWalletSumLog = function(n) {
                switch (n) {
                case 0:
                    this.WalletSumType = 0;
                    this.QueryWalletSumLog(this.model.WalletCondition);
                    break;
                case 1:
                    this.WalletSumType = 1;
                    this.QueryHistoryWalletSumLog(this.model.WalletHistoryCondition);
                    break;
                case 2:
                    this.WalletSumType = 2;
                    this.QueryStatisticalData(this.model.WalletStatisticalDataCondition)
                }
            }
            ,
            t.prototype.WalletBuildNgTableParams = function(n, t) {
                var i = this;
                return n == NgTableTypeEnum.Clear ? (this.model.WalletSumPager = null,
                this.model.HistoryWalletSumPager = null,
                this.model.StatisticalDataPager = null,
                new this.ngTableParams({},{})) : new this.ngTableParams({
                    page: 0,
                    count: t.Pager.PageSize,
                    sorting: {
                        CreateTime: "desc"
                    }
                },{
                    getData: function(n) {
                        return n.sorting() ? i.$filter("orderBy")(t.Data, n.orderBy()) : t.Data
                    },
                    counts: []
                })
            }
            ,
            t.prototype.QueryWalletSumLog = function(t) {
                var i = this;
                this.editMemberInfoManageSvc.GetMemberWalletSumLogByAccountID(t).then(function(n) {
                    i.model.WalletSumPager = i.xPagerSvc.GetPager(n.Pager);
                    i.model.tableWalletSumLog = i.WalletBuildNgTableParams(NgTableTypeEnum.Create, n)
                }).catch(function(t) {
                    i.model.tableWalletSumLog = i.WalletBuildNgTableParams(NgTableTypeEnum.Clear);
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.QueryHistoryWalletSumLog = function(t) {
                var i = this;
                this.editMemberInfoManageSvc.GetMemberHistoryWalletSumLogByAccountID(t).then(function(n) {
                    i.model.HistoryWalletSumPager = i.xPagerSvc.GetPager(n.Pager);
                    i.model.tableHistoryWalletSumLog = i.WalletBuildNgTableParams(NgTableTypeEnum.Create, n)
                }).catch(function(t) {
                    i.model.tableHistoryWalletSumLog = i.WalletBuildNgTableParams(NgTableTypeEnum.Clear);
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.QueryStatisticalData = function(t) {
                var i = this;
                this.TransType == 1 && this.editMemberInfoManageSvc.GetMemberDepositDailySumLogListByCondition(t).then(function(n) {
                    i.model.StatisticalDataPager = i.xPagerSvc.GetPager(n.Pager);
                    i.model.tableStatisticalData = i.WalletBuildNgTableParams(NgTableTypeEnum.Create, n)
                }).catch(function(t) {
                    i.model.tableStatisticalData = i.WalletBuildNgTableParams(NgTableTypeEnum.Clear);
                    n.Helpers.AlertSwitch(t)
                });
                this.TransType == 2 && this.editMemberInfoManageSvc.GetMemberWithdrawalDailySumLogListByCondition(t).then(function(n) {
                    i.model.StatisticalDataPager = i.xPagerSvc.GetPager(n.Pager);
                    i.model.tableStatisticalData = i.WalletBuildNgTableParams(NgTableTypeEnum.Create, n)
                }).catch(function(t) {
                    i.model.tableStatisticalData = i.WalletBuildNgTableParams(NgTableTypeEnum.Clear);
                    n.Helpers.AlertSwitch(t)
                })
            }
            ,
            t.prototype.ChangeWalletSumPage = function(n) {
                this.ValidatePageNumber(n, this.model.WalletSumPager) && (this.model.WalletCondition.PageNumber = n - 1,
                this.QueryWalletSumLog(this.model.WalletCondition))
            }
            ,
            t.prototype.ChangeHistoryWalletSumPage = function(n) {
                this.ValidatePageNumber(n, this.model.HistoryWalletSumPager) && (this.model.WalletHistoryCondition.PageNumber = n - 1,
                this.QueryHistoryWalletSumLog(this.model.WalletHistoryCondition))
            }
            ,
            t.prototype.ChangeStatisticalDataPage = function(n) {
                this.ValidatePageNumber(n, this.model.StatisticalDataPager) && (this.model.WalletStatisticalDataCondition.PageNumber = n - 1,
                this.QueryStatisticalData(this.model.WalletStatisticalDataCondition))
            }
            ,
            t.prototype.GetUpdateMemberSNInfoLogContent = function(t, i) {
                var r = [], u;
                return t.DistrictID = i.DistrictID = 0,
                this.logSvc.FieldAdapter(this.model.MemberBaseInfoField, this.logSvc.LogField),
                u = this.diff.diffOwnProperties(t, i),
                r = this.logSvc.GetMemberInfoOperationLogContent(u),
                t.MemberStatus === 3 && i.MemberStatus === 1 && r.push({
                    FieldName: "IsDeposit",
                    FieldDisplayName: n.Helpers.ChangeLanguage("聯動") + "：" + n.Helpers.ChangeLanguage("存款"),
                    BeforeValue: "false",
                    BeforeName: n.Helpers.ChangeLanguage("關閉"),
                    AfterValue: "true",
                    AfterName: n.Helpers.ChangeLanguage("開啟")
                }),
                r
            }
            ,
            t.$name = "EditMemberInfoManageCtrl",
            t.$inject = ["$filter", "EditMemberInfoManageSvc", "appConfig", "NgTableParams", "XPagerSvc", "$q", "LogSvc", "ObjectDiff", "blockUI", "$timeout"],
            t
        }();
        t.EditMemberInfoManageCtrl = i
    }
    )(t = n.Controllers || (n.Controllers = {}))
}(OBSApp || (OBSApp = {}));
OBSApp.RegisterAngular.RegisterController(OBSApp.Controllers.EditMemberInfoManageCtrl.$name, OBSApp.Controllers.EditMemberInfoManageCtrl),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n() {}
            return n
        }();
        n.LoginResetPWD = t
    }
    )(t = n.Models || (n.Models = {}))
}(OBSApp || (OBSApp = {})),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n(n) {
                this.dataProvider = n
            }
            return n.prototype.UpdateBackendAccountPWD = function(n) {
                var r = this.dataProvider.CreateDeferred(), u = "", t, i;
                return location.hostname.indexOf("localhost") !== -1 ? location.pathname !== "/" && (u = "..") : (t = location.pathname,
                i = location.href,
                t.charAt(t.length - 1) === "/" && (t = t.substring(0, t.length - 1)),
                u = t.split("/").length > 2 ? ".." : i.charAt(i.length - 1) === "#" ? i.substring(0, i.length - 1) : i),
                this.dataProvider.Get(u + "/api/BackendAuthority/UpdateBackendAccountPWD", HttpMethodEnum.Post, n).then(function(n) {
                    r.resolve(n.Data)
                }).catch(function(n) {
                    r.reject(n)
                }),
                r.promise
            }
            ,
            n.$name = "LogoutSvc",
            n.$inject = ["DataProvider"],
            n
        }();
        n.LogoutService = t
    }
    )(t = n.Services || (n.Services = {}))
}(OBSApp || (OBSApp = {}));
OBSApp.RegisterAngular.RegisterService(OBSApp.Services.LogoutService.$name, OBSApp.Services.LogoutService),
function(n) {
    var t;
    (function(t) {
        var i = function() {
            function t(n, t, i, r, u) {
                this.logoutSvc = n;
                this.adapter = t;
                this.timeout = i;
                this.messageBus = r;
                this.appContextSvc = u;
                this.InitializeAdapter();
                this.HandleLoginStatus()
            }
            return t.prototype.InitializeAdapter = function() {
                var t = this;
                this.adapter.Init({
                    HubName: "signOutHub",
                    HubUrl: n.GlobalJsConfig.Config.SignalRNFSvcHost,
                    QueryString: "l=2&aid=" + jQuery("#hfAID").val(),
                    IsLogging: n.GlobalJsConfig.Config.SignalRNFSvcIsDebug
                });
                this.adapter.BackendSignOut.SignOutSvcCallback.BackendSignOutAck(function(i) {
                    t.timeout(function() {
                        if (i) {
                            t.ClearAmountRangeList();
                            var r = "";
                            i.Data == NotifySignOutTypeEnum.ChangeRole && (r = n.Helpers.ChangeLanguage("你的帳號權限已有調整") + "，" + n.Helpers.ChangeLanguage("請重新登入"));
                            parent.window.location.href = r != "" ? $(parent.document).find("#linkLogout").attr("href") + "&Message=" + encodeURIComponent(r) : $(parent.document).find("#linkLogout").attr("href")
                        }
                    })
                });
                this.adapter.Connect().done(function() {}).fail(function() {})
            }
            ,
            t.prototype.RegisterValidation = function() {
                var n = this;
                jQuery.validator.addMethod("ckAccountPWD", function(n) {
                    return /^(?=.*\d)(?=.*[a-zA-Z])[\dA-Za-z]{6,20}$/.test(n)
                });
                jQuery.validator.addMethod("ckConfirmPWD", function(t) {
                    return t === n.resetModel.PWD
                })
            }
            ,
            t.prototype.HandleLoginStatus = function() {
                this.messageBus.On(n.ConstDefinition.MessageBusEventName.OnCheckNeddKickLoginStatus, function(t, i) {
                    i !== 1001 && n.Helpers.AlertSwitch({
                        Error: {
                            Code: i,
                            Message: "未授權"
                        }
                    })
                });
                this.appContextSvc.SetAccountID($("#hfLID").val());
                this.appContextSvc.StartCheckInterval()
            }
            ,
            t.prototype.ResetPWD = function() {
                this.resetModel = new n.Models.LoginResetPWD
            }
            ,
            t.prototype.UpdateLogInAccountPWD = function() {
                var t = this;
                this.logoutSvc.UpdateBackendAccountPWD(this.resetModel).then(function() {
                    n.Helpers.Alert("更新成功", SweetAlertTypeEnum.success, !1, "", null, function() {
                        t.resetModel.PWD = t.resetModel.confirmPWD = "";
                        jQuery.fancybox.close();
                        t.BackendSignOut()
                    })
                }).catch(function(t) {
                    n.Helpers.AlertSwitch(t, EventAlertEnum.Update_Fail)
                })
            }
            ,
            t.prototype.BackendSignOut = function() {
                var n = this;
                this.adapter.IsConnect() && this.adapter.Server.SignOutSvc.BackendSignOut().done(function() {
                    n.ClearAmountRangeList();
                    parent.window.location.href = $(parent.document).find("#linkLogin").val()
                }).fail(function() {
                    n.ClearAmountRangeList();
                    parent.window.location.href = $(parent.document).find("#linkLogin").val()
                })
            }
            ,
            t.prototype.ClearAmountRangeList = function() {
                localStorage.removeItem("withdrawalLogAmountRangeList");
                localStorage.removeItem("merchantWithdrawalAccountBookAmountRangeList")
            }
            ,
            t.prototype.ModalCancel = function() {
                jQuery.fancybox.close()
            }
            ,
            t.$name = "LogoutCtrl",
            t.$inject = ["LogoutSvc", "SignalRAdapter", "$timeout", "messageBus", "AppContextSvc"],
            t
        }();
        t.LogoutController = i
    }
    )(t = n.Controllers || (n.Controllers = {}))
}(OBSApp || (OBSApp = {}));
OBSApp.RegisterAngular.RegisterController(OBSApp.Controllers.LogoutController.$name, OBSApp.Controllers.LogoutController)

 (function(t) {
        var i = function() {
            function t(n, t, i, r, u) {
                this.logoutSvc = n;
                this.adapter = t;
                this.timeout = i;
                this.messageBus = r;
                this.appContextSvc = u;
                this.InitializeAdapter();
                this.HandleLoginStatus()
            }
            return t.prototype.InitializeAdapter = function() {
                var t = this;
                this.adapter.Init({
                    HubName: "signOutHub",
                    HubUrl: n.GlobalJsConfig.Config.SignalRNFSvcHost,
                    QueryString: "l=2&aid=" + jQuery("#hfAID").val(),
                    IsLogging: n.GlobalJsConfig.Config.SignalRNFSvcIsDebug
                });
                this.adapter.BackendSignOut.SignOutSvcCallback.BackendSignOutAck(function(i) {
                    t.timeout(function() {
                        if (i) {
                            t.ClearAmountRangeList();
                            var r = "";
                            i.Data == NotifySignOutTypeEnum.ChangeRole && (r = n.Helpers.ChangeLanguage("你的帳號權限已有調整") + "，" + n.Helpers.ChangeLanguage("請重新登入"));
                            parent.window.location.href = r != "" ? $(parent.document).find("#linkLogout").attr("href") + "&Message=" + encodeURIComponent(r) : $(parent.document).find("#linkLogout").attr("href")
                        }
                    })
                });
                this.adapter.Connect().done(function() {}).fail(function() {})
            }
            ,
            t.$name = "LogoutCtrl",
            t.$inject = ["LogoutSvc", "SignalRAdapter", "$timeout", "messageBus", "AppContextSvc"],
            t
        }();
        t.LogoutController = i
    }