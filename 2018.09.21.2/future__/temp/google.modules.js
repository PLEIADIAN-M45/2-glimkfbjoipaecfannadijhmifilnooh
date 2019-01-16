function getSheetByName(e) {
    var spreadsheet = SpreadsheetApp.openById(e.spreadsheet)
    var sheet = spreadsheet.getSheetByName(e.sheet);
    var value = sheet.getSheetValues(e.range[0], e.range[1], e.range[2], e.range[3]);
    var values = value.filter(function(arr) { return arr[0] }).map(function(arr) {
        arr[0] = Number(arr[0]) || arr[0].trim();
        return arr;
    })
    //var values = value.map(function(arr) { return arr[0] }).filter(function(str) { return str })
    var result = JSON.stringify(values);
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

var modules = {
    mobile: function(e) {
        return getSheetByName({
            spreadsheet: "1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20",
            sheet: "停權手機",
            range: [1, 1, -1, 1]
        })
    },
    banker: function(e) {
        return getSheetByName({
            spreadsheet: "1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20",
            sheet: "BlackList",
            range: [1, 1, -1, 1]
        })
    },
    locate: function(e) {
        return getSheetByName({
            spreadsheet: "1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20",
            sheet: "不開通的IP",
            range: [1, 1, -1, 1]
        })
    },
    author: function(e) {
        return getSheetByName({
            spreadsheet: "1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20",
            sheet: "举报账本同户名表格",
            range: [3, 1, -1, 4]
        })
    },
    danger: function(e) {
        return getSheetByName({
            spreadsheet: "1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI",
            sheet: "danger",
            range: [1, 1, -1, 1]
        })
    },
    notice: function(e) {
        return getSheetByName({
            spreadsheet: "1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI",
            sheet: "notice",
            range: [1, 1, -1, 1]
        })
    },
    region: function(e) {
        return getSheetByName({
            spreadsheet: "1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI",
            sheet: "region",
            range: [1, 1, -1, 1]
        })
    },
    sms: function(e) {
        return getSheetByName({
            spreadsheet: "1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI",
            sheet: "sms",
            range: [1, 1, -1, 2]
        })
    },
    gb2260: function(e) {
        return getSheetByName({
            spreadsheet: "1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI",
            sheet: "gb2260",
            range: [1, 1, -1, 2]
        })
    },


    GMA: function(e) {
        var sheets = SpreadsheetApp.openById("1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI").getSheets();
        var results = sheets.map(function(sheet, index) {
            var name = sheet.getName();
            var values = sheet.getDataRange().getValues();
            var value = JSON.stringify(values);
            var blob = Utilities.newBlob(encodeURI(value));
            var encoded = Utilities.base64EncodeWebSafe(blob.getBytes());
            return [name, encoded];
        });
        var result = JSON.stringify(results);
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
    },

    GMB: function(e) {
        var sheets = SpreadsheetApp.openById("1GxH9j5_IpUxL0ElXAfpx1HaxLIIIetrmN-JG5tRi_20").getSheets();
        var results = sheets.map(function(sheet, index) {
            //var name = sheet.getName();
            var sheetId = sheet.getSheetId();

            var name = {
                "0": "banker",
                "1752935424": "locate",
                "547176525": "mobile",
                "1854920738": "author"
            } [sheetId];


            var values = sheet.getDataRange().getValues();
            var value = JSON.stringify(values);
            // var result = JSON.stringify(values);
            // return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);

            console.log(values)
            //console.log(value)

            var blob = Utilities.newBlob(encodeURI(value));
            var encoded = Utilities.base64EncodeWebSafe(blob.getBytes());

            return [name, encoded];
        });

        var result = JSON.stringify(results);
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
    }
}