var modules = {
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
            }[sheetId];

            var values = sheet.getDataRange().getValues();
            var value = JSON.stringify(values);
            var blob = Utilities.newBlob(encodeURI(value));
            var encoded = Utilities.base64EncodeWebSafe(blob.getBytes());

            return [name, encoded];
        });
        var result = JSON.stringify(results);
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
    }
}