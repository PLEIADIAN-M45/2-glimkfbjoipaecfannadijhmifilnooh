var _audience = "526046340833-nuocr7rmgg2qlguen430mqci8h10u559.apps.googleusercontent.com";

var spreadsheet = {
    a: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20'),
    b: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY')
}

function getValues(sheetName) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName(sheetName);
    var range = sheet.getDataRange();
    var values = range.getValues();
    //var result = JSON.stringify(values)
    //var value = aes.encrypt(result);
    return values
}

function getSheets() {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheets = spreadsheet.getSheets()
    //console.log(sheets)
    for (i in sheets) {
        //console.log(sheets[i].getName())
        //console.log(sheets[i].getSheetId())
        var sheetName = CryptoJS.MD5(sheets[i].getName())
        console.log(sheetName.toString())
    }
}


function getSheetById(spreadsheet, id) {
    //var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheets = spreadsheet.getSheets();
    for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].getSheetId() == id) {
            return sheets[i];
        }
    }
    return;
}

function doTrim(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('举报账本同户名表格');
    var range = sheet.getDataRange();
    for (var i = 1; i < range.getLastRow(); i++) {
        var cell = range.getCell(i, 1);
        var value = cell.getValue().trim();
        cell.setValue(value);
    }
}


function format(str) {

    return moment(str).format('YYYY/MM/DD HH:mm:ss')

    var time = new Date(str)


    var formattedDate = Utilities.formatDate(time, "GMT+8", "yyyy/MM/dd HH:mm:ss");
    console.log(formattedDate)

    console.log(moment(str).format('YYYY/MM/DD HH:mm:ss'))

    //var formattedDate = Utilities.formatDate(time, "GMT+8", "MM-dd-yyyy HH:mm:ss");
    return formattedDate;
}

function timeDiff(t1, t2, unit) {
    t1 = moment(t1)
    t2 = moment(t2)
    return t2.diff(t1, unit, true);
}
//console.log(url)
//console.log(OAuthToken)
//Logger.log(Session.getActiveUserLocale());
//var email = Session.getEffectiveUser().getEmail();
/* var timeZone = AdWordsApp.currentAccount().getTimeZone();
   var noonString = Utilities.formatDate(now, timeZone,
       'YYYY/MM/dd HH:mm:ss')
   var noon = new Date(noonString);*/

function doGet(e) {

    console.log("++++++++++++++++++++");
    var url = ScriptApp.getService().getUrl();
    var OAuthToken = ScriptApp.getOAuthToken()

    var now = new Date();


    console.log(e.parameter);
    console.log(e.parameter.unique);
    console.log(e.parameter.agency);
    console.log(e.parameter.account);
    console.log("---------------------------");


    var commands = e.parameter.commands;
    if (commands) { return modules[commands](e); }

    if (e.parameter.command == "google:scripts") {
        console.log("++++++++++++++++++++");
        console.log(e.parameter.command);
        return google_scripts(e);
    }


    if (e.parameter.command == "google:scripts:authorize") {
        var user = JSON.parse(e.parameter.params);
        console.log(user)
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

    if (e.parameter.command == "google:apiScripts:m22") {
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

    if (e.parameter.command == "evo.statistics.m3") {
        var user = JSON.parse(e.parameter.params);
        //console.log(e.parameter.model)
        console.log(user.f_id);
        console.log(user.operator);
        console.log(user.region)
        //.concat(user.region)
        var model = {
            dscr: '禮金',
            spreadSheets: '1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0',
            sheetName: '999',
            contents: [
                format(now),
                user.f_id,
                format(user.f_time),
                format(user.f_AuditTime),
                timeDiff(user.f_time, user.f_AuditTime, 'day'),
                user.f_AdminName,
                user.channel,
                user.account.toUpperCase(),
                { "15": "首存", "16": "二存" } [user.f_type],
                user.f_unfreezeWater,
                user.f_Money,
                { "0": "否", "1": "是", } [user.f_Audit],
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
                format(user.attach),
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



    if (e.parameter.command == "evo.statistics.m88") {

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
            dscr: '開通',
            spreadSheets: '1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA',
            sheetName: '999',
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
    if (e.parameter.command == "evo.statistics.m4") {
        var user = JSON.parse(e.parameter.params);
        var model = {
            dscr: '禮金',
            spreadSheets: '1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0',
            sheetName: '999',
            contents: [
                format(now),
                user.BonusNumber,
                format(user.CreateTime),
                format(user.AdjustTime),
                timeDiff(user.CreateTime, user.AdjustTime, 'day'),
                user.Creator,
                user.channel,
                user.account.toUpperCase(),
                { "1": "首存", "2": "二存" } [user.BonusType],
                user.Amount,
                user.BonusPoint,
                { "1": "处理中", "2": "是", "3": "否" } [user.DealType],
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


    if (e.parameter.audience == _audience && e.parameter.command == "evo.statistics.m1") {

        var user = JSON.parse(e.parameter.params);

        // var log = JSON.parse(user.log);
        console.log(e.parameter.model)
        console.log(user)


        var status = {
            'wa111': ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"],
            'ku711': ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"]
        } [user.host];

        var deposit = {
            'wa111': ["否", "是"],
            'ku711': ["否", "是"]
        } [user.host];



        var model = {
            "m1": {
                dscr: '開通',
                spreadSheets: '1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA',
                sheetName: '111',
                contents: [
                    user.log[0]['status_descr'],
                    user.log[1]['time'],
                    user.log[0]['time'],
                    timeDiff(user.log[1]['time'], user.log[0]['time'], 'day'),
                    user.channel,
                    format(now),
                    user.operator,
                    user.account.toUpperCase(),
                    user.log[0].result,
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
            },
            "m3": {
                dscr: '禮金',
                spreadSheets: '1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0',
                sheetName: '111',
                contents: [
                    user.f_id,
                    user.operator,
                    user.channel
                ].concat(user.region)
            }
        } [e.parameter.model];


        console.log(console.log(e.parameter.model));

        if (e.parameter.test) { model.sheetName = '999' }

        model.sheetName = '999'

        /*
         model.contents= model.contents.map(function(x) {
             if (x) { return x } else { return '' }
         })
        */
        //console.log(e.parameter)

        var spreadsheet = SpreadsheetApp.openById(model.spreadSheets);
        var sheet = spreadsheet.getSheetByName(model.sheetName);
        console.log(model.contents);
        sheet.appendRow(model.contents);

        //console.log( format1('2018/10/04 17:25:21'))


        return
    }




    if (e.parameter.audience == _audience && e.parameter.spreadsheet && e.parameter.sheet) {
        var spreadsheet = SpreadsheetApp.openById(e.parameter.spreadsheet);
        var sheet = spreadsheet.getSheetByName(e.parameter.sheet);
        var range = sheet.getDataRange();
        var values = range.getValues();
        var result = JSON.stringify(values);
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
        //return ContentService.createTextOutput(values);
    }





    if (e.parameter.audience == _audience && e.parameter.sheets) {
        var sheets = JSON.parse(e.parameter.sheets);
        var obj = {};
        for (var i in sheets) {
            var name = sheets[i];
            obj[name] = myFunction2(name);
        }
        var values = JSON.stringify(obj);
        values = aes.encrypt(values);
        //values = JSON.stringify({ sheets: values });
        //console.log(values)
        return ContentService.createTextOutput(values);
        //return ContentService.createTextOutput(values).setMimeType(ContentService.MimeType.JSON);
    }

    if (e.parameter.audience == _audience && e.parameter.settings) {
        var values = JSON.stringify(settings.dashboards);
        values = aes.encrypt(values);
        return ContentService.createTextOutput(values).setMimeType(ContentService.MimeType.JSON);
    }

    if (e.parameter.audience == _audience && e.parameter.gid) {
        if (e.parameter.gid) {
            var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
            var sheet = getSheetById(spreadsheet, e.parameter.gid)
            var range = sheet.getDataRange();
            var values = range.getValues()

            values.shift();

            console.log(values)
            console.log(values.length)

            values = JSON.stringify(values)
            var result = aes.encrypt(values);

            // console.log(sheet)

            return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
        }
    }

    if (e.parameter.audience == _audience && e.parameter.code) {
        switch (e.parameter.code) {
            case '18b43c6a536a8fe1362f7a3887936be6':
                var value = JSON.stringify(settings.sms);
                value = aes.encrypt(value);
                return ContentService.createTextOutput(value)
                    .setMimeType(ContentService.MimeType.JSON);
                break;
            case '7bdc8a923ea34af94c5d36604d0fb3dc':

                var sensitive = {
                    REGION: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('area').getDataRange().getValues(),
                    warn: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('warn').getDataRange().getValues(),
                    word: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('word').getDataRange().getValues(),
                    //idcard: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('GB/T2260-201805').getDataRange().getValues(),
                    AUTHOR: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('举报账本同户名表格').getDataRange().getValues(),
                    BANKAC: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('BlackList').getDataRange().getValues(),
                    LOCATE: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('不開通的IP').getDataRange().getValues()
                }
                sensitive.AUTHOR.shift();
                var values = JSON.stringify(sensitive)
                var result = aes.encrypt(values);
                return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
                break;
                //                var sensitive = {
                //                    area: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('area').getDataRange().getValues(),
                //                    warn: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('warn').getDataRange().getValues(),
                //                    word: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('word').getDataRange().getValues(),
                //                    //idcard: SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY').getSheetByName('GB/T2260-201805').getDataRange().getValues(),
                //                    author: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('举报账本同户名表格').getDataRange().getValues(),
                //                    bkcard: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('BlackList').getDataRange().getValues(),
                //                    locate: SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20').getSheetByName('不開通的IP').getDataRange().getValues()
                //                }
                //                sensitive.author.shift();
                //                var values = JSON.stringify(sensitive)
                //                var result = aes.encrypt(values);
                //                return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
                //                break;
            case '1922942353':
                var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
                //var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY/edit#gid=1922942353');
                //var sheet =  spreadsheet.getActiveSheet()
                var sheet = spreadsheet.getSheetByName('GB/T2260-201805');
                var range = sheet.getDataRange();
                var GB2260 = JSON.stringify(range.getValues())
                Logger.log(GB2260)
                return ContentService.createTextOutput(GB2260)
                    .setMimeType(ContentService.MimeType.JSON);

                break;
            case '154a7214fc9db4ec2c06361aba5397d7':
                var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
                var sheet = spreadsheet.getSheetByName('GB/T2260-201805');
                var range = sheet.getDataRange();
                var GB2260 = JSON.stringify({ 'GB2260': range.getValues() })
                Logger.log(GB2260)
                return ContentService.createTextOutput(GB2260)
                    .setMimeType(ContentService.MimeType.JSON);

                break;

            case '7bdc8a923ea34af94c5d36604d0fb3dc':
                var sensitive = {}
                sensitive.bkcard = getValues('BlackList');
                sensitive.author = getValues('举报账本同户名表格');
                sensitive.area = settings.sensitive.area;
                sensitive.word = settings.sensitive.word;
                sensitive.warn = settings.sensitive.warn;
                //sensitive.warn = getValues('warn');
                var result = JSON.stringify(sensitive);
                var value = aes.encrypt(result);
                var _sensitive = JSON.stringify({ 'sensitive': value })
                Logger.log(_sensitive)
                return ContentService.createTextOutput(_sensitive)
                    .setMimeType(ContentService.MimeType.JSON);

                break;

            case '2e5d8aa3dfa8ef34ca5131d20f9dad51':
                settings.blacklist = getValues('blacklist')
                settings.accusation = getValues('举报账本同户名表格')
                var result = JSON.stringify(settings);
                var value = aes.encrypt(result);
                //return ContentService.createTextOutput(value);
                break;
            case 'a0bc9791616492b14e330a7e0ef35512':
                var value = getValues('blacklist')
                break;
            case 'e8a3fc6a3e609e9a3cdc3c77463458ae':
                var value = getValues('举报账本同户名表格')
                break;
        }
        return ContentService.createTextOutput(value);
    }

    if (e.parameter.audience == _audience && e.parameter.fn) {
        switch (e.parameter.fn) {
            case 'getSettings':
                var result = getSettings(e)
                break;
            case 'getBlackList':
                var result = getBlackList(e)
                break;
            case 'getBlackList2':
                var result = getBlackList2(e)
                break;
            case 'getDangerIP':
                var result = getDangerIP(e)
                break;
            case 'getAccusation':
                var result = getAccusation(e)
                break;
            case 'getDashboards':
                var result = getDashboards(e)
                break;
            case 'getMessages':
                var result = getMessages(e)
                break;
            case 'getBlackPhone':
                var result = getBlackPhone(e);
                break;

            case 'getSensitive':
                var result = getSensitive(e)
                break;
            case 'getWarn':
                var result = getWarn(e)
                break;
            case '2e5d8aa3dfa8ef34ca5131d20f9dad51':
                //                //settings.id = e.parameter.id;
                //                //settings.email = e.parameter.email;
                //var aes2 = new AES(e.parameter);
                var value = JSON.stringify(settings);
                //var result = aes2.encrypt(value);
                //var result = settings;
                return ContentService.createTextOutput(value)
                    .setMimeType(ContentService.MimeType.JSON);
                break;
        }

        var value = aes.encrypt(JSON.stringify(result));
        return ContentService.createTextOutput(value);
    }

}

function getSensitive(e) {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var values = {
        word: spreadsheet.getSheetByName('word').getDataRange().getValues(),
        area: spreadsheet.getSheetByName('area').getDataRange().getValues(),
        warn: spreadsheet.getSheetByName('warn').getDataRange().getValues()
    }
    Logger.log(values.warn)
    var sensitive = { word: [], area: [], warn: [] }
    for (i in values.word) { sensitive.word.push(values.word[i][0]) }
    for (i in values.area) { sensitive.area.push(values.area[i][0]) }
    for (i in values.warn) {
        sensitive.warn.push(values.warn[i][0]);
        sensitive.warn.push(values.warn[i][1])
    }

    return sensitive;
}


function getAccusation(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('举报账本同户名表格');
    var range = sheet.getDataRange();
    var values = range.getValues();
    values.splice(0, 2);
    /*var sms = {};
    for (i in values) {
        sms[values[i][0]] = values[i][1]
    }*/
    return values;
}


function getWarn(e) {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheet = spreadsheet.getSheetByName('warn');
    var range = sheet.getDataRange();
    var values = range.getValues();
    /*var sms = {};
    for (i in values) {
        sms[values[i][0]] = values[i][1]
    }*/
    return values;
}

function getMessages(e) {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheet = spreadsheet.getSheetByName('sms');
    var range = sheet.getDataRange();
    var values = range.getValues();

    var sms = {};
    for (i in values) {
        sms[values[i][0]] = values[i][1]
    }
    return sms;
}

function getSetting(e) {
    var value = JSON.stringify(settings.dashboards)

    return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);

}




function getDashboards(e) {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheet = spreadsheet.getSheetByName('dashboards');
    var range = sheet.getDataRange();
    var values = range.getValues();
    var dashboards = JSON.parse(values)
    return dashboards;
}

function getSettings(e) {
    var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var values = {
        word: spreadsheet.getSheetByName('word').getDataRange().getValues(),
        area: spreadsheet.getSheetByName('area').getDataRange().getValues(),
        sms: spreadsheet.getSheetByName('sms').getDataRange().getValues()
        //dashboards: spreadsheet.getSheetByName('dashboards').getDataRange().getValues(),
    }
    var sms = {};
    for (i in values.sms) {
        sms[values.sms[i][0]] = values.sms[i][1]
    }
    var sensitive = { word: [], area: [] }
    for (i in values.word) { sensitive.word.push(values.word[i][0]) }
    for (i in values.area) { sensitive.area.push(values.area[i][0]) }
    //var dashboards = JSON.parse(values.dashboards[0])
    return {
        sms: sms,
        sensitive: sensitive
    }
}


function getDangerIP(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('不開通的IP');
    var range = sheet.getDataRange();
    var values = range.getValues();
    Logger.log(values)
    return values;
    /*
    var result = []
    for (i in values) {
        result.push(values[i][0])
    }
    return { blacklist: result };
    */
}

function getBlackPhone(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('停權手機');
    var range = sheet.getRange("A:A");
    var values = range.getValues();
    var result = values.filter(function(x) { console.log(x[0]); return x[0].toString().trim(); });
    return result;
}

function getBlackList(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('BlackList');
    var range = sheet.getRange("A:A");
    var values = range.getValues();
    values = values.filter(function(x) {
        x[0] = x[0].toString().replace('\t', '').replace('\r', '').replace('\n', '').trim();
        return x[0]
    });
    return values;
}

function getBlackList2(e) {
    var spreadsheet = SpreadsheetApp.openById('1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20');
    var sheet = spreadsheet.getSheetByName('BlackList');

    var range = sheet.getRange("A:A");
    var values = range.getValues();
    Logger.log(values)

    values = values.filter(function(x) {
        x[0] = x[0].toString().replace('\t', '').replace('\r', '').replace('\n', '').trim()
        return x[0]
    })

    return values;
    /*
    var result = []
    for (i in values) {
        result.push(values[i][0])
    }
    return { blacklist: result };
    */
}


function myFunction23() {
    var spreadsheet = SpreadsheetApp.openById(my.author.spreadsheets);
    var sheets = spreadsheet.getSheets();
    var sheet;
    for (var i in sheets) {
        if (sheets[i].getSheetId() == my.author.gid) {
            //console.log(sheets[i].getSheetId());
            sheet = sheets[i]
        }
    }

    var range = sheet.getDataRange();
    var values = range.getValues();
    console.log(values);


}


function doPost(e) {
    console.log(e.parameter)
    var params = JSON.parse(e.parameter.params);
    var spreadsheet = SpreadsheetApp.openById(params.spreadSheets);
    var sheet = spreadsheet.getSheetByName(params.sheetName);
    sheet.appendRow(params.rowContents);
}


function doPost333(e) {
    console.log(e.parameter)
    var d = JSON.parse(e.parameter.data);
    console.log(d)
    /*var spreadsheet = SpreadsheetApp.openById('1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY');
    var sheet = spreadsheet.getSheetByName('sheet1');*/
    var spreadsheet = SpreadsheetApp.openById('1p3Xc8mwh78fJqkHDzRxN6x5Yyzdg1lwand3_c-S1uMY');
    var sheet = spreadsheet.getSheetByName('111');
    console.log(sheet)
    sheet.appendRow(d);
}