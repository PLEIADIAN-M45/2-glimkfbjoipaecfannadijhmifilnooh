if(e.parameter.command == "google:apiScripts:m88") {
    var user = JSON.parse(e.parameter.params);
    user.permit[0] = Number(user.permit[0]);
    user.permit[1] = Number(user.permit[1]);
    user.status[0] = Number(user.status[0]);
    user.status[1] = Number(user.status[1]);
    var status = {
        "ku711": ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"],
        "wa111": ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"]
    } [user.host];
    var deposit = {
        'wa111': ["否", "是"],
        'ku711': ["否", "是"]
    } [user.host];
    var model = {
        dscr: '開通',
        //spreadSheets: '1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA',
        spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
        sheetName: '開通表',
        contents: [
            status[user.status[0]] + '轉' + status[user.status[1]],
            format(user.timing[0]),
            format(user.timing[1]),
            timeDiff(user.timing[0], user.timing[1], 'day'),
            user.channel,
            format(now),
            user.operator,
            user.account.toUpperCase(),
            deposit[user.permit[1]],
            user.banker[0].value,
            user.banker[0].prov,
            user.banker[0].city,
            user.mobile.value,
            user.mobile.prov,
            user.mobile.city,
            user.idcard.value,
            user.idcard.prov,
            user.idcard.city,
            user.region.length,
        ].concat(user.region)
    }
    var spreadsheet = SpreadsheetApp.openById(model.spreadSheets);
    var sheet = spreadsheet.getSheetByName(model.sheetName);
    console.log(model.contents);
    sheet.appendRow(model.contents);
    return 1
}

if(e.parameter.command == "google:apiScripts:m22") {
    var user = JSON.parse(e.parameter.params);
    user.permit[0] = Number(user.permit[0]);
    user.permit[1] = Number(user.permit[1]);
    user.status[0] = Number(user.status[0]);
    user.status[1] = Number(user.status[1]);
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
        //spreadSheets: '1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag',
        spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
        sheetName: '停權表',
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
            format(user.attach),
            user.banker[0].value,
            user.banker[0].prov,
            user.banker[0].city,
            user.mobile.value,
            user.mobile.prov,
            user.mobile.city,
            user.idcard.value,
            user.idcard.prov,
            user.idcard.city,
            user.region.length,
        ].concat(user.region)
    }

    var spreadsheet = SpreadsheetApp.openById(model.spreadSheets);
    var sheet = spreadsheet.getSheetByName(model.sheetName);
    sheet.appendRow(model.contents);
    return 1
}





if(e.parameter.command == "google:apiScripts:m88") {
    var user = JSON.parse(e.parameter.params);
    var status = {
        "ku711": ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"],
        "wa111": ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"]
    } [user.host];
    var permit = {
        'wa111': ["否", "是"],
        'ku711': ["否", "是"]
    } [user.host];
    var model = {
        dscr: '開通',
        //spreadSheets: '1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA',
        spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
        sheetName: '開通表',
        contents: [
            status[user.status[0]] + '轉' + status[user.status[1]],
            user.timing[0],
            user.timing[1],
            user.timing[2],
            user.channel,
            format(now),
            user.operator,
            user.account.toUpperCase(),
            permit[user.permit[1]],
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
    console.log(model.contents);
    sheet.appendRow(model.contents);
    return 1
}




/*
停權表
禮金表
*/