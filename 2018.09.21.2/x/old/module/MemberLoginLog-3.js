function saveFile(jsonString) {
    fs.root.getFile('log.txt', { create: true }, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
            };
            fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };
            //var bb = new Blob([JSON.stringify(d)], { type: "text/plain" });
            var bb = new Blob([jsonString], { type: "text/plain" });
            console.log(bb);
            fileWriter.write(bb);
        });
    })
}

function readFile() {
    fs.root.getFile('log.txt', {}, function(fileEntry) {
        console.log(fileEntry);
        fileEntry.file(function(file) {
            console.log(file);
            var reader = new FileReader();
            reader.onloadend = function(e) {
                console.log(this.result);
            };
            reader.readAsText(file);
        });
    })
}

function merge(arr1, arr2) {
    var activeSubjectsArr = [];
    for (let i in arr1) {
        if (arr1[i].outerText && arr2[i].outerText) {
            activeSubjectsArr.push([arr1[i].outerText.trim(), arr2[i].outerText.trim()])
        }
    }
    //console.log(activeSubjectsArr);
    return activeSubjectsArr;
}

function getOuterText(x) {
    return x.outerText
}

function getSiteNumber(x) {
    return x.outerText.split('-')[0]
}

function getAllIPAddress222() {
    var column1 = [...document.querySelectorAll("ul:not([class])>li:nth-of-type(8)")]; //IPs
    var column2 = [...document.querySelectorAll("ul:not([class])>li:nth-of-type(10)")]; //IPs-Location
    var column3 = merge(column1, column2);
    var collection = new Map(column3);
    evo.IPCollection = collection;
    return [...collection];
}

function checkIPAddress() {
    console.log(evo.IPAddress);
}

//  114110wjc 一机多登比较多页的

function getAllIPAddress333(myApp, me) {

    function process(arrar) {
        var collection = new Map(arrar.sort());
        evo.user.region = [...collection];
        var obj = [...collection].map(function([locate, province]) { return { locate, province } })
        return obj;
    }

    if (evo.siteNumber == '16') {
        return new Promise(function(resolve, reject) {
            var _arr = [];
            myApp.$scope.$watch('ctrl.model.ResultList', function(result, oldValue) {
                if (result) {
                    for (let x of result) {
                        if (x.AccountID == evo.user.accountId) {
                            _arr.push([x.IPAddress, x.IPLocation])
                        }
                    }
                    var obj = process(_arr)
                    return resolve(obj);
                }
            });
        })
    } else {
        return new Promise(function(resolve, reject) {
            var region = [...document.querySelectorAll("ul:not([class])>li:nth-of-type(10)")]; //IPs-Location
            region = region.map((x) => x.outerText).filter((c) => c);
            evo.user.region = region
            console.log(region);
        })
    }
}

function getAllIPAddress(myApp, me) {

    function process(arrar) {
        var collection = new Map(arrar.sort());
        //console.log(collection);
        //evo.user.regions = [...collection];
        var obj = [...collection].map(function([locate, province]) {
            return { locate, province }
        })
        evo.user.regions = obj;
        return obj;
    }

    if (evo.siteNumber == '16') {
        return new Promise(function(resolve, reject) {
            var _arr = [];
            myApp.$scope.$watch('ctrl.model.ResultList', function(result, oldValue) {
                if (result) {
                    //console.log(result);
                    for (let x of result) {
                        if (x.AccountID == evo.user.accountId) {
                            _arr.push([x.IPAddress, x.IPLocation])
                        }
                    }
                    console.log(_arr);
                    process(_arr)
                    evo.user.region = _arr;
                    return resolve(_arr);
                }
            });
        })
    } else {
        return new Promise(function(resolve, reject) {
            var _arr = [];
            $('ul').each(function(index, ul) {
                if (ul.children.length > 10) {
                    var channel = ul.children[0].outerText.split('-')[0];
                    var userId = ul.children[2].outerText.trim();
                    var uniqueId = userId + '-' + channel;
                    var locate = ul.children[7].outerText.trim();
                    var province = ul.children[9].outerText.trim();
                    if (uniqueId == evo.user.uniqueId) {
                        _arr.push([locate, province])
                    }
                }
            })
            process(_arr)
            evo.user.region = _arr;
            return resolve(_arr);
        })
    }
}

function getMyDB() {
    console.log(db.GetMemberList.toArray());
    db.GetMemberList.toArray()
        .then(function(d) {
            console.log(d);
            var jsonString = JSON.stringify(d)
            saveFile(jsonString)
        })
}

function getMemberBlacklist(row, site) {
    if (row.IsBlackList == true || row.f_blacklist == 17) {
        row.color = 'black';
        //row.icon = 'snapchat ghost';
    }
}

function getMemberWarning(row) {
    if (row.list_Accounts) {
        if (row.color !== 'black') {
            row.color = 'pink';
        }
    }
}

function getMemberAccount(row, s) {
    row._accounts = row.f_accounts || row.AccountID;
    if (s.port == evo.siteNumber) {
        if (row._accounts == evo.memberInfo.accountId) {
            row.color = 'blue'
        }
    }
}


function sensitive_check(me, scope) {
    if (me.method == 'GetMemberList' || me.method == undefined) { return }
    if (me.method == 'mobile' || me.method == 'locate' || me.method == 'banker' || me.method == 'idcard') {
        var string = [me.result.province, me.result.city, me.result.country].join();
        //console.log(me);
        //console.log(string);
        me.danger = string.match(evo.regexp.sensitive.area) ? true : false;
        if (string == ",,") { me.danger = true; }
        console.log("[归属地检查]", me.method, me.danger);
        /*
        var result = me.result;
        if (result) {
            if (result.status == 0) {
                result.text = result.statusText;
                result.meta = result.status;
            } else {
                result.meta = result.meta;
                var arr = Object.values(result);
                me.danger = (arr.toString().match(evo.regexp.sensitive.area)) ? true : false;
                result.text = [result.province, result.city, result.country].join(' ').trim();
            }
        }
        */
    }


    if (me.value.includes('*')) { return }

    if (me.method == 'locate') {
        var match = evo.sensitive.protocol.find(function(x) {
            var cv = x[0].trim();
            return cv == me.value;
        });
        if (match) {
            //console.log(match);
            me.danger = true;
            me.note = '(IP黑名单)'
        }

        console.log("[黑名单检查]", me.method, me.danger);

    }

    if (me.method == 'banker') {

        var match = me.value.match(evo.regexp.blacklist);
        if (match) {
            console.log(match) //
            me.danger = true;
            me.note = '(银行卡黑名单)'
        }

        console.log("[黑名单检查]", me.method, me.danger);


    }
    if (me.method == 'author') {
        var accusation = evo.accusation
        //me.value = '李晓龙';
        var string = me.value;

        var flag = accusation.some(function(arr, index) {
            if (string == arr[0]) {
                me.result = {}
                me.result.meta = arr[1] + '-' + arr[2];
                me.result.text = arr[3];
                me.danger = true;
                return true
            }
        })

        //console.log(string, flag);
        if (flag == false) {
            me.result = {}
            me.result.text = '通过投诉名单检查'
            me.danger = false;
            me.result.meta = ''
        }

        console.log("[黑名单检查]", me.method, me.danger);

    }
}

function getUnique(me) {
    return CryptoJS.MD5(me.method + me.port + me.header + me.page).toString();
}