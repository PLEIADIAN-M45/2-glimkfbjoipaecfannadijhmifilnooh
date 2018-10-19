define(['myApp'], function(myApp) {


    function createIFrame() {
        return new Promise(function(resolve, reject) {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo(myApp.$target);
            $('<iframe>', { id: 'sameBrowserList', src: getFrameUrl(), frameborder: 0, width: '100%', }).appendTo(myApp.$target);
            resolve('createIFrame')
        })
    }

    async function checkSensitiveWords() {
        var callee = arguments.callee.name;
        return new Promise(function(resolve, reject) {
            window.HTMLTableCellElements.each(function(index, el) {
                var str = el.outerText.trim();
                if (evo.siteNumber == '16') {
                    el.classList.remove('w10');
                    el.classList.remove('w20');
                    $(el).find('br').remove();
                    if (str == '正常户') { el.classList.add('normal'); }
                }
                if (str.match(evo.regexp.sensitive.full)) { el.classList.add('danger'); }
            });
            resolve([callee, HTMLTableCellElements])
        })
    }

    function addSiteNumberToAccountId() {
        var callee = arguments.callee.name;
        var accountIdCollection = getAccountIdCollection();
        var siteNumberCollection = getSiteNumberCollection();
        accountIdCollection.each(function(index, element) {
            if (element.textContent.trim()) {
                var accountId = element.textContent.trim();
                var siteNumber = '-' + siteNumberCollection[index];
                var uniqueId = accountId + siteNumber;
                if (uniqueId == evo.uniqueId) { element.classList.add('self'); }
                if (evo.siteNumber != '16') {
                    element.setAttribute('data-content', accountId);
                    element.textContent = null;
                    $('<b>').text(accountId).addClass('pointer').attr('data-content', accountId).popup({ on: 'click' }).click(function() {
                        evo.copyText = accountId;
                        document.execCommand("copy");
                    }).appendTo(element);

                    $('<b>').text(siteNumber).addClass('pointer').attr('data-content', accountId + siteNumber).popup({ on: 'click' }).click(function() {
                        evo.copyText = accountId + siteNumber;
                        document.execCommand("copy");
                    }).appendTo(element);
                }
            }
        });
    }

    if (evo.params.method == 'CookieID' || evo.filename == 'IGetMemberInfo') {
        //https://bk.ku711.net/Member/MemberInfoManage/MemberLoginLog?AccountId=laoj521
        //https://bk.ku711.net/member/MemberInfoManage/MemberLoginLog


        $scope.defineProperties({
                components: ['MemberLoginLog'],
                stylesheet: ['cards', 'MemberLoginLog']
            })
            .then(getUser)
            .then(dispatchMyEvent)
            .then(bootstrap)
            .then(createIFrame)
        /*.then(scrollHeightListener)
        .then(getHTMLTableCells)
        .then(checkSensitiveWords)
        .then(addSiteNumberToAccountId)
        .then(createIFrame)
        .catch(errorHandler)*/
    }

    if (evo.params.method == 'DeviceNo' || evo.filename == 'sameBrowserList') {
        dispatchMyEvent()
    }
/*

無使用插件開通>>shengcai2-16 
使用插件開通>> lmj565970-16

*/




})





function forTest() {
    if (evo.test) {
        $('#divCookie,#topDiv').hide()
        // console.log(111111111);
        //evo.user.mobile.value = '13619511304'
        //evo.user.idcard.value = '640122199512052415'
        evo.user.author.value = '张凯'
        evo.user.author.value = '王杰'
        evo.user.account = '1870497282'
        //evo.user.mobile.value = '13968546174'
        evo.user.mobile.value = '13968546174'
        evo.user.mobile.value = '17805182900'
        //evo.user.account = 'WANG7790'
        //evo.user.locate.value = '116.20.62.156'
        evo.user.idcard.value = '320684199901017199'
        evo.user.banker[0].value = '6212264301022817389'
        // showAll()
        //evo.user.banker[0].value = '6217002170019265562'
        //evo.user.banker[0].value = '6217002170019999999'
    }
}

/*.then((res) => { return extend(me, res); }).then((res) => { this.regionTestFunction(me) });*/



//var dataset = [author, locate, mobile, idcard, ...banker].map(sheetsTestFunction).map(regionTestFunction);

/*var params3 = {
    banker: 'f_BankAccount',
    mobile: 'txtPhoto',
    idcard: 'txtIdCard',
    author: 'f_RemittanceName'
}[property];*/