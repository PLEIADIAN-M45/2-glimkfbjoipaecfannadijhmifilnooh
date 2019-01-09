define([], function() {

    return async function({ apis, $getUser, $putUser, $scope, $sendMessage, $apply }) {

        await apis.getUser();
        /*********************/
        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard].concat($scope.user.banker).map((x) => {
            x.caller = x.callee;
            if (x.callee == "locate") { return x };
            var params = { command: "apiFunctions.member", callee: x.callee, [x.callee]: x.value, index: 1 };
            x.sites = x.sites || [
                { channel: "26", server: "wa111", ...params },
                { channel: "35", server: "wa111", ...params },
                { channel: "17", server: "wa111", ...params },
                { channel: "16", server: "ku711", ...params }
            ]
            return x;
        });


        apis.region = function region(e) {
            //if (this.active == undefined || e) {} else { return };
            this.active = true;
            apis.sendMessage(this).then((region) => {
                this.region = region;
                this.active = false;
                console.log(this);
            }).then($apply)
        }

        //console.log(res);
        //angular.copy(res, this);
        //console.log($scope.list);
        $scope.apiFunctions = function() {}
        $scope.apiFunctions.region = function(e) {


            /*this.command = "new Service(#)";
            $sendMessage(this).then((res) => {
                if(res) { this.region = res }
            }).then($apply);
        */
        }

        $scope.apiFunctions.member = function($childScope, e) {
            return
            //if (this.on) {} else { return }
            /*if(this.callee !== "author") { return } else {
                this.author = "王杰";
            }
            if (this.channel !== "16") { return }
                */

            //console.log(this[this.callee]);

            this.value = this[this.callee];

            if (this.value.includes("*")) { return }
            angular.extend(this, { command: "api.member(#)", active: true });
            //console.log(this);
            $sendMessage(this).then((res) => {
                //console.log(res);
                if (res) { Object.assign(this, res) }
            }).then($apply);
        }

        $scope.openMemberModify = function({ origin, server }) {
            console.log(this);
            var redirectUrl = {
                wa111: `${origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`,
                ku711: `${origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}`
            } [server];
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
            $scope.list_RemittanceName = s.list_RemittanceName;
            $('.ui.modal').modal('show');
        }

        $scope.switcher = function(s, e) {
            s.on = !s.on;
        }



        console.log($scope.user);

        apis.watch('user', 'putUser');
        //$scope.apis = apis;        
        $scope.$apply();


    }
})