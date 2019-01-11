define([], function() {

    return async function({ apis, $getUser, $putUser, $scope, $sendMessage, $apply, $extensionId }) {


        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

        await apis.getUser();

        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard, ...$scope.user.banker].map((obj) => {

            obj.region = obj.region || {};

            with(obj) {
                if (caller == "locate") {
                    obj.protocol = apis.protocol;
                    console.log(apis.protocol);
                    $scope.user.region = apis.protocol.map((x) => { return x.IPLocation; })
                } else {
                    obj.sites = [
                        { channel: "26", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "35", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "17", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "16", server: "ku711", index: 1, caller, value, [caller]: value }
                    ];
                }
            }
            return obj;
        });


        function extend(res) {
            //console.log(res);
            //this.active = false;
            angular.extend(this, res, { active: false });
            $scope.$apply();
        }

        apis.region = function region(e) {
            if (this.active == undefined || e) {
                this.active = true;
                apis.sendMessage(this).then(extend.bind(this));
            }
        }

        apis.member = function member(e) {
            return
            //if (this.caller == "author" && this.channel == "26") {} else { return };
            if (this.value == undefined || this.value.includes("*")) { return };
            this.active = true;
            apis.sendMessage(this).then(extend.bind(this));
        }

        $scope.openMemberModify = function({ origin, server }) {
            console.log(this);
            var redirectUrl = {
                wa111: `${origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`,
                ku711: `${origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}`
            }[server];
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
                setTimeout(($id) => {
                    $($id).popup({ html: $($id).find("aside").html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" });
                }, 500, "#" + $childScope.$id);
            };
        }

        $scope.showSemanticModal = function(s) {
            $scope.list_RemittanceName = s.list_RemittanceName;
            $('.ui.modal').modal('show');
        }

        $scope.switcher = function(s, e) {
            s.on = !s.on;
        }

        $scope.createIFrame = function(_src) {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo($projElement);
            $('<iframe>', { id: 'sameBrowserList', src: _src, frameborder: 0, width: '100%' }).load(addScrollHeightEventListener).appendTo($projElement);
        }


        //$scope.apis = apis;
        $scope.$apply();



        console.log($scope.user);

    }
});






/*
if($scope.user.banker && $scope.user.banker.length > 0) {
    $scope.user.banker.forEach((self, i, arr) => {
        Object.defineProperty(self, "region", { writable: false });
    });
}*/


/*
          apis.sendMessage(this).then((res) => {
              this.active = false;
              angular.extend(this, res)
          }).then($apply)*/