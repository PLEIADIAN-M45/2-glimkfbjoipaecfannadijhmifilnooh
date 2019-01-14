define([], function() {

    return async function({ apis, $server, $router, $getUser, $putUser, $scope, $sendMessage, $apply, $extensionId }) {

        $scope.iFrameId = "sameBrowserList";
        $scope.view = "body";

        $scope.createIFrame = function() {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo($scope.view);
            $("<iframe>", { src: $scope.iFrameSrc, id: $scope.iFrameId, frameborder: 0, width: '100%' }).appendTo($scope.view);
        }
        $scope.scrollHeightPoster = function() {
            window.parent.postMessage({
                id: $scope.iFrameId,
                scrollHeight: document.body.scrollHeight + 50
            }, '*');
        }
        $scope.scrollHeightListener = function() {
            window.addEventListener('message', function(e) {
                if (e.data && e.data.id === $scope.iFrameId) {
                    console.log(e.data);
                    console.log(e.data.scrollHeight);
                    document.getElementById(e.data.id).style.height = e.data.scrollHeight + 'px'
                }
            }, false);
        }
        apis.createElement = function createElement(value, content, name) {
            return $('<b>').text(value.toUpperCase()).addClass('pointer').addClass(name)
                .popup({ on: 'click' }).click(apis.copy).attr('data-content', content.toUpperCase())[0];
        };
        apis.checkSensitiveWords = function checkSensitiveWords(children) {
            [...children].map((el) => {
                apis.global.region.find((str) => { if (el.outerText.includes(str)) { el.classList.add('danger') } });
                apis.global.danger.find((str) => { if (el.outerText.includes(str)) { el.classList.add('danger') } });
                apis.global.author.find((str) => { if (el.outerText.includes(str)) { el.classList.add('danger') } });
                //apis.global.locate.find((str) => { if(el.outerText.includes(str)) { el.classList.add('danger') } });
            })
        };

        //if($router.$params.method == "CookieID") {}
        if ($router.$params.method == "CookieID" || location.pathname == "/IGetMemberInfo.aspx") {
            await apis.getUser();
            $scope.scrollHeightListener();
            $scope.QueryInputModel();
            $scope.start();
            //$scope.createIFrame();
        }

        if (location.pathname == "/sameBrowserList.aspx") {
            //$scope.QueryInputModel();
            $scope.start();
            // $scope.scrollHeightPoster();
            return;
        }

        if ($router.$params.method == "DeviceNo") {
            $scope.QueryInputModel();
            return;
        }

        /*----------------------------------------------*/
        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard, ...$scope.user.banker].map((obj) => {
            obj.region = obj.region || {};
            with(obj) {
                if (caller == "locate") {} else {
                    obj.sites = [
                        { channel: "26", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "35", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "17", server: "wa111", index: 1, caller, value, [caller]: value }, { channel: "16", server: "ku711", index: 1, caller, value, [caller]: value }
                    ];
                }
            }
            return obj;
        });


        apis.region = function region(scope, e) {
            //if (this.active == undefined || e) {//}
            scope.active = true;
            apis.sendMessage(this).then((res) => {
                angular.extend(this, res);
                scope.active = false;
                scope.$apply();
            });
        }

        apis.member = function member(scope) {
            //if(this.caller == "author" && this.channel == "16") {} else { return };
            if (this.value == undefined || this.value.includes("*")) { return };
            scope.active = true;
            apis.sendMessage(this).then((res) => {
                angular.extend(this, res);
                scope.active = false;
                scope.$apply();
            })
        }

        $scope.openMemberModify = function({ origin, server }) {
            var redirectUrl = {
                wa111: `${origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`,
                ku711: `${origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}`
            } [server];

            window.open(redirectUrl, "_blank");
            //console.log(redirectUrl);
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


        $scope.$apply();
    }
});