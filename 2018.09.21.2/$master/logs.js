define([], function() {

    return async function({ apis, $server, $router, $getUser, $putUser, $scope, $sendMessage, $apply, $extensionId }) {

        $scope.iFrameId = "sameBrowserList";
        $scope.view = "body";


        $scope.createIFrame = function() {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo($scope.view);
            $("<iframe>", { src: $scope.iFrameSrc, id: $scope.iFrameId, frameborder: 0, width: '100%' }).appendTo($scope.view);
        }

        $scope.scrollHeightListener = function() {
            window.addEventListener('message', function(e) {
                if(e.data && e.data.id === $scope.iFrameId) {
                    console.log(e.data);
                    document.getElementById(e.data.id).style.height = e.data.scrollHeight + 'px'
                }
            }, false);
        }


        $scope.scrollHeightPoster = function() {
            console.log(document.body.scrollHeight + 50);
            window.parent.postMessage({
                id: $scope.iFrameId,
                scrollHeight: document.body.scrollHeight + 50
            }, '*');
        }

        apis.createElement = function createElement(value, content, name) {
            return $('<b>').text(value.toUpperCase()).addClass('pointer').addClass(name)
                .popup({ on: 'click' }).click(apis.copy).attr('data-content', content.toUpperCase())[0];
        };

        apis.checkSensitiveWords = function checkSensitiveWords(children) {
            [...children].map((el) => {
                apis.global.region.find((str) => { if(el.outerText.includes(str)) { el.classList.add('danger') } });
                apis.global.danger.find((str) => { if(el.outerText.includes(str)) { el.classList.add('danger') } });
                apis.global.author.find((str) => { if(el.outerText.includes(str)) { el.classList.add('danger') } });
                apis.global.locate.find((str) => { if(el.outerText.includes(str)) { el.classList.add('danger') } });
            })
        };


        //apis.global.notice.push(["打水套利"])

        $scope.checkSensitiveUserWarn = function checkSensitiveWords() {
            apis.global.notice.map(([str]) => {
                if(this.f_remarks.includes(str)) {
                    this.f_remarks = this.f_remarks.replace(str, '<em>' + str + '</em>');
                    this.sort = 0;
                }
            });
        }



        if($router.$params.method == "CookieID" || location.pathname == "/IGetMemberInfo.aspx") {
            apis.$injectComponents($router.$components);
            apis.$injectStylesheet($router.$stylesheet);
            await apis.getUser();
            $scope.QueryInputModel();
            $scope.scrollHeightListener();
            $scope.start();
            $scope.createIFrame();
        }

        if(location.pathname == "/sameBrowserList.aspx") {
            apis.$injectStylesheet($router.$stylesheet);
            $scope.start();

            $scope.scrollHeightPoster();



            return;
        }

        if($router.$params.method == "DeviceNo") {
            apis.$injectStylesheet($router.$stylesheet);
            $scope.QueryInputModel();
            $scope.start();
            $scope.document = document;

            $scope.$watch("document.body.scrollHeight", function(nv, ov) {
                $scope.scrollHeightPoster();
            })
            return;
        }



        /*----------------------------------------------*/
        $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
        $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
        $scope.list = [$scope.user.author, $scope.user.locate, $scope.user.mobile, $scope.user.idcard, ...$scope.user.banker]
        $scope.sites = $scope.list.map((obj) => {
            with(obj) {
                //$scope.sites[value] =
                if(caller == 'locate') {
                    return []
                } else {
                    return [
                        { channel: "26", server: "wa111", index: 1, caller, value, [caller]: value },
                        { channel: "35", server: "wa111", index: 1, caller, value, [caller]: value },
                        { channel: "17", server: "wa111", index: 1, caller, value, [caller]: value },
                        { channel: "16", server: "ku711", index: 1, caller, value, [caller]: value }
                    ]
                }
            }
        });



        console.log($scope.sites);

        apis.region = function region(childScope, e) {
            if(this.value) {} else { return };
            if(childScope.active == undefined || e) {
                childScope.active = true;
                $scope.sendMessage(this).then((result) => {
                    angular.extend(this, result);
                    childScope.active = false;
                    childScope.apply();
                });
            }
        }

        apis.member = function member(childScope, e) {
            if(!this.value || this.value.includes("*")) { return };
            childScope.active = true;
            $scope.sendMessage(this).then((result) => {
                if(result && result.rows) { angular.extend(this, result); } else { childScope.error = true; }
                childScope.active = false;
                childScope.apply();
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
            if(this.list_Accounts && this.list_Accounts.length) { $childScope.color = "pink"; };
            if(this.f_blacklist == 17 || this.IsBlackList == true) { $childScope.color = "black" };
            if(this.f_id == $sequel || this.MNO == $sequel) { $childScope.color = "brown" };
        };

        $scope.setPopup = function($childScope) {
            if(this.list_Accounts && this.list_Accounts.length) {
                setTimeout(($id) => {
                    $($id).popup({ html: $($id).find("aside").html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" });
                }, 500, "#" + $childScope.$id);
            };
        }

        $scope.showSemanticModal = function(s) {
            $scope.list_RemittanceName = s.list_RemittanceName;
            $('.ui.modal').modal('show');
        }



        $scope.transition = function(scope) {
            $('.extra.grid').toggle()
            //$('.extra.grid').transition('slide down');
        }


        $scope.setPermit = function setPermit(frameId) {
            $scope.sendMessage({ frameId })
        }




        $scope.$apply();
    }
});