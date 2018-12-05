if(e.parameter.command == "google:scripts") {
    return google_scripts(e);
}

function google_scripts(e) {
    function format(str) { return moment(str).format('YYYY-MM-DD HH:mm:ss') };
    var user = JSON.parse(e.parameter.params);
    var status = { "ku711": ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"], "wa111": ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"] } [user.host];
    var permit = { 'wa111': ["否", "是"], 'ku711': ["否", "是"] } [user.host];
    switch (e.parameter.module) {
        case "authorize":
            var model = {
                spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
                sheetName: '開通表',
                contents: [
                    status[user.status[0]] + '轉' + status[user.status[1]],
                    user.timing[0],
                    user.timing[1],
                    user.timing[2],
                    user.channel,
                    format(user.timespan),
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
            break;
        case "suspended":
            var model = {
                spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
                sheetName: '停權表',
                contents: [
                    status[user.status[0]] + '轉' + status[user.status[1]],
                    user.channel,
                    null,
                    null,
                    null,
                    format(user.timespan),
                    user.operator,
                    null,
                    user.account.toUpperCase(),
                    user.agency,
                    user.author.value,
                    user.attach,
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
            break;
        case "bonus:wa111":
            var model = {
                spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
                sheetName: '禮金表',
                contents: [
                    format(user.timespan),
                    user.bonus.f_id,
                    format(user.bonus.f_time),
                    format(user.bonus.f_AuditTime),
                    timeDiff(user.bonus.f_time, user.bonus.f_AuditTime, 'day'),
                    user.operator,
                    user.channel,
                    user.account.toUpperCase(),
                    { "0": "否", "1": "是" } [user.bonus.f_Audit],
                    { "15": "首存", "16": "二存" } [user.bonus.f_type],
                    user.bonus.f_unfreezeWater,
                    user.bonus.f_Money,
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
            break;
        case "bonus:ku711":
            var model = {
                spreadSheets: '1u6mWXOnChJGlvls0LTKZG18ufAAHNvdgJUWWUydD3Cg',
                sheetName: '禮金表',
                contents: [
                    format(user.timespan),
                    user.bonus.BonusNumber,
                    format(user.bonus.CreateTime),
                    format(user.bonus.AdjustTime),
                    timeDiff(user.bonus.CreateTime, user.bonus.AdjustTime, 'day'),
                    user.operator,
                    user.channel,
                    user.account.toUpperCase(),
                    { "1": "处理中", "2": "是", "3": "否" } [user.bonus.DealType],
                    { "1": "首存", "2": "二存" } [user.bonus.BonusType],
                    user.bonus.Amount,
                    user.bonus.BonusPoint,
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
            break;
    }
    var spreadsheet = SpreadsheetApp.openById(model.spreadSheets);
    var sheet = spreadsheet.getSheetByName(model.sheetName);
    sheet.appendRow(model.contents);
    return ContentService.createTextOutput(1);
}