define([], function() {
    //"wa111/logs.ext"
    return async function({ $scope, $getUser, $putUser, $setUser, $sendMessage }) {


        function apply() {
            //$digest or $apply
            if (!$scope.$$phase) { $scope.$apply(); }
        };

        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
        $scope.$watch('user', $scope.$putUser, true);
        $scope.user = await $getUser();
        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard].concat($scope.user.banker).map((x) => {
            if (x.callee == "locate") { return x };
            var params = { command: "apiFunctions.member", callee: x.callee, [x.callee]: x.value, index: 1 };
            x.sites = [{ channel: "26", host: "wa111", ...params }, { channel: "35", host: "wa111", ...params }, { channel: "17", host: "wa111", ...params }, { channel: "16", host: "ku711", ...params }]
            return x;
        });
        //console.log($scope.list);
        $scope.apiFunctions = function() {}
        $scope.apiFunctions.region = function(e) {
            //if (this.callee == "banker") { return };
            if (this.callee !== "author") { return };
            //if (this.region && !e) { return };
            /*--------------------------------------------------------------*/
            angular.extend(this, { command: "apiFunctions." + this.callee, region: { active: true } });
            $sendMessage(this).then((res) => {
                console.log(res);
                angular.copy(res, this.region);
            }).then(apply);
        }
        $scope.apiFunctions.member = function($childScope, e) {
            return
            angular.extend(this, { command: "apiFunctions.member", active: true, rows: null });
            $sendMessage(this).then((res) => { angular.copy(res, this); }).then(apply);
        }
        $scope.openMemberModify = function({ origin, host }) {
            var redirectUrl = { wa111: `${origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`, ku711: `${origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}` } [host];
            window.open(redirectUrl, "_blank");
            console.log(redirectUrl);
        }
        $scope.changeColor = function($childScope) {
            var $sequel = $scope.user.sequel;
            if (this.list_Accounts && this.list_Accounts.length) { $childScope.color = "pink"; };
            if (this.f_blacklist == 17 || this.IsBlackList == true) { $childScope.color = "black" };
            if (this.f_id == $sequel || this.MNO == $sequel) { $childScope.color = "brown" };
        };
        $scope.setPopup = function($childScope) {
            if (this.list_Accounts && this.list_Accounts.length) {
                setTimeout(($id) => { $($id).popup({ html: $($id).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" }); }, 500, "#" + $childScope.$id);
            };
        }
        $scope.showSemanticModal = function(s) {
            $rootScope.list_RemittanceName = s.list_RemittanceName;
            $('.ui.modal').modal('show');
        }
        $scope.getProtocolSet = function() {
            //delete this.sites;
            let cells = $('#divCookie > ul:not(.TrHead):not(.TrHead2)').filter((i, { firstElementChild, children }) => {
                return firstElementChild.outerText && children.length > 10;
            }).toArray().filter(({ children }) => {
                with($scope.user) { return children[0].outerText.split("-")[0] == channel && children[2].outerText.trim() == account; }
            });
            this.rows = cells.map(({ children }) => { //检查黑名单 海南                
                return { IPAddress: children[7].outerText.trim(), IPLocation: children[9].outerText.trim() };
            });
        }



        /***************************************/
        //$('#divCookie').hide();
        $scope.user.author.value = "王杰";
        $scope.user.author.value = "陈林";
        /***************************************/
        $scope.$apply();
        return
    }
});



//apply();
//console.log(this);