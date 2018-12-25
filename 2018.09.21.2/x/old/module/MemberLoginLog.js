define(['myApp', 'material', 'cryptojs/md5', 'cryptojs/ripemd160', 'common', 'semantic',
    'fs', 'encrypt', evo.extend,
    'MemberLoginLog-1',
    'MemberLoginLog-2',
    'MemberLoginLog-3'
], function(myApp, mdc) {

    function hideColumns() {
        $('ul.TrHead>li').each(function(i, li) {
            li.textContent += '-' + (i + 1)
        })
        if (evo.filename == 'sameBrowserList') {
            $('#divCookie>ul>li:nth-child(7)').hide()
            $('#divCookie>ul>li:nth-child(13)').hide()
            $('#divCookie>ul>li:nth-child(17)').hide()
            $('#divCookie>ul>li:nth-child(18)').hide()
            $('#divCookie>ul>li:nth-child(15)').css('width', '28%').css('text-align', 'left')
        }
        if (evo.filename == 'IGetMemberInfo') {}
    }


    function createIFrame() {
        return new Promise(function(resolve, reject) {
            $('<div>')
                .addClass('ui horizontal divider')
                .text('AND').appendTo(myApp.$target);
            $('<iframe>', {
                id: 'sameBrowserList',
                src: getFrameUrl(),
                frameborder: 0,
                width: '100%',
            }).appendTo(myApp.$target);
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
                    if (str == '正常户') {
                        el.classList.add('normal');
                    }
                }
                if (str.match(evo.regexp.sensitive.full)) {
                    el.classList.add('danger');
                }
            })
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
                if (uniqueId == evo.uniqueId) {
                    element.classList.add('self');
                }
                if (evo.siteNumber != '16') {
                    element.setAttribute('data-content', accountId);
                    element.textContent = null;
                    $('<b>')
                        .text(accountId)
                        .addClass('pointer')
                        .attr('data-content', accountId)
                        .popup({
                            on: 'click'
                        })
                        .click(function() {
                            evo.copyText = accountId;
                            document.execCommand("copy");
                        }).appendTo(element)

                    $('<b>')
                        .text(siteNumber)
                        .addClass('pointer')
                        .attr('data-content', accountId + siteNumber)
                        .popup({
                            on: 'click'
                        })
                        .click(function() {
                            evo.copyText = accountId + siteNumber;
                            document.execCommand("copy");
                        }).appendTo(element);
                }
            }
        })
        return [callee, []];
    }





    class APIFunctions {

        constructor(_method) {
            this.method = _method;
        }
        get exec() {
            return this[this.method];
        }

        get IGetMemberInfo() {

            evo.components = ['MemberLoginLog'];
            evo.stylesheet = ['cards', 'MemberLoginLog'];


            switch (evo.host) {
                case "wa111":

                    evo.account = evo.params.member;
                    evo.uniqueId = evo.account + '-' + evo.siteNumber;

                    start()
                        .then(getUser)
                        //.then(getAllIPAddress)
                        .then(requireStylesheet)
                        .then(requireComponents)
                        .then(bootstrap)
                        .then(scrollHeightListener)
                        .then(dispatchMyEvent)
                        .then(getHTMLTableCells)
                        .then(checkSensitiveWords)
                        .then(addSiteNumberToAccountId)
                        .then(createIFrame)
                        .catch(errorHandler)

                    break;
                case "ku711":

                    evo.account = evo.params.accounts;

                    evo.uniqueId = evo.account + '-' + evo.siteNumber;

                   // console.log(evo.uniqueId);

                    // console.log(evo.uniqueId);
                    start()
                        //.then(getAllIPAddress)
                        //.then(function(a) { console.log(a); })
                        //.then(queryMemberInfo)
                        .then(getUser)
                        //.then(getAllIPAddress)
                        .then(requireStylesheet)
                        .then(requireComponents)
                        .then(bootstrap)
                        .then(scrollHeightListener)
                        .then(dispatchMyEvent)
                        .then(getHTMLTableCells)
                        .then(checkSensitiveWords)
                        .then(addSiteNumberToAccountId)
                        .then(createIFrame)
                        .catch(errorHandler)
                    break;
            }
        }

        get SameBrowserList() {
            evo.stylesheet = ['MemberLoginLog'];
            start()
                .then(requireStylesheet)
                .then(dispatchMyEvent)
                .then(getHTMLTableCells)
                .then(scrollHeightPoster)
                .then(checkSensitiveWords)
                .then(addSiteNumberToAccountId)
                .catch(errorHandler);
        }
        get WebMemberInfo() {
            evo.stylesheet = ['MemberLoginLog'];
            start()
                .then(requireStylesheet)
                .catch(errorHandler);
        }
    }
    /******************************************************************/

    // evo.uniqueId = evo.account + '-' + evo.siteNumber;

    //console.log(evo.host);

    var accountId = evo.params.member || evo.params.accounts;
    var siteNumber = evo.siteNumber;

    if (evo.siteNumber == '16') {
        var method = evo.params.method;
        switch (method) {
            case "CookieID":
                method = "IGetMemberInfo";
                break;
            case "DeviceNo":
                method = "SameBrowserList";
                break;
        }
    } else {
        var method = evo.filename;
        switch (method) {
            case "IGetMemberInfo":
                method = "IGetMemberInfo";
                break;
            case "sameBrowserList":
                method = "SameBrowserList";
                break;
            default:
                method = "WebMemberInfo";
                break;
        }
    }

    //console.log(evo.uniqueId, method);

    new APIFunctions(method).exec;

    /* if (evo.uniqueId && method) {
     } else {
         throw new Error('not defined uniqueId.')
     }*/
})