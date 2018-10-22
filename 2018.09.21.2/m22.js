if (e.parameter.command == "evo.statistics.m22") {

    var user = JSON.parse(e.parameter.params);
    user.permit[0] = Number(user.permit[0])
    user.permit[1] = Number(user.permit[1])
    var status = {
        "ku711": ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"],
        "wa111": ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"]
    } [user.host];

    var deposit = {
        'wa111': ["否", "是"],
        'ku711': ["否", "是"]
    } [user.host];

    var model = {
        dscr: '停權',
        spreadSheets: '1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag',
        sheetName: '999',
        contents: [
            status[user.status[0]] + '轉' + status[user.status[1]],
            user.channel,
            null,
            null,
            null,
            format(now),
            user.operator,
            null,
            user.account.toUpperCase(),
            user.agency,
            user.author.value,
            user.joindate,
            user.banker[0].value,
            user.banker[0].region.prov,
            user.banker[0].region.city,
            user.mobile.value,
            user.mobile.region.prov,
            user.mobile.region.city,
            user.idcard.value,
            user.idcard.region.prov,
            user.idcard.region.city,
            user.region.length,
        ].concat(user.region)
    }

    var spreadsheet = SpreadsheetApp.openById(model.spreadSheets);
    var sheet = spreadsheet.getSheetByName(model.sheetName);
    sheet.appendRow(model.contents);
    return 1
}


var Contents = [
    str,
    null,
    null,
    null,
    null,
    evo.getTime(),
    evo.user.operator,
    null,
    evo.user.uniqueId,
    evo.user.agency,

    evo.user.author.value,
    evo.user.joindate,

    evo.user.banker[0].value,
    evo.user.banker[0].province,
    evo.user.banker[0].city,

    evo.user.mobile.value,
    evo.user.mobile.province,
    evo.user.mobile.city,

    evo.user.idcard.value,
    evo.user.idcard.province,
    evo.user.idcard.city,

    evo.user.region.length,
    //...evo.user.region
    ...new Set(province)
]