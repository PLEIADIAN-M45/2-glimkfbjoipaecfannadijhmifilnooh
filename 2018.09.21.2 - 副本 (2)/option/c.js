{
    "sites": {
        "lottery": [
            { "port": "15107", "country": "cn" },
            { "port": "15109", "country": "cn" },
            { "port": "15112", "country": "cn" },
            { "port": "15106", "country": "tw" },
            { "port": "15108", "country": "tw" },
            { "port": "15110", "country": "vn" }
        ],
        "company": [
            { "port": "6226", "country": "cn" },
            { "port": "6235", "country": "cn" },
            { "port": "6217", "country": "cn" },
            { "port": "6221", "country": "tw" },
            { "port": "6202", "country": "tw" },
            { "port": "6205", "country": "vn" }
        ],
        "wa111": [
            { "port": "6326", "country": "cn" },
            { "port": "6335", "country": "cn" },
            { "port": "6317", "country": "cn" },
            { "port": "6321", "country": "tw" },
            { "port": "6302", "country": "tw" },
            { "port": "6305", "country": "vn" }
        ],
        "ku711": [
            { "port": "", "country": "cn" }
        ]
    },
    "servers": {
        "lottery": [
            { "label": "http://161.202.184.9:" }
        ],
        "company": [
            { "label": "http://119.81.201.133:" }
        ],
        "wa111": [
            { "label": "http://q51.tp33.net:" },
            { "label": "http://host.wa111.net" },
            { "label": "http://admin.wa111.net" },
            { "label": "http://admin-2.wa111.net" }
        ],
        "ku711": [
            { "label": "https://lg.ku711.net" }
        ]
    },
    "pages": {
        "lottery": "/layout/Login.aspx",
        "company": "/company/net/page/Login/CommonLogin/Login.aspx",
        "wa111": "/Aspx/Index.aspx",
        "ku711": "/Authorize/SignIn"
    }
}

{ "page": "/layout/Login.aspx" }, { "page": "/company/net/page/Login/CommonLogin/Login.aspx" }, { "page": "/Aspx/Index.aspx" }, { "page": "/Authorize/SignIn" }


{ "sites": { "lottery": [{ "port": "15107", "country": "cn" }, { "port": "15109", "country": "cn" }, { "port": "15112", "country": "cn" }, { "port": "15106", "country": "tw" }, { "port": "15108", "country": "tw" }, { "port": "15110", "country": "vn" }], "company": [{ "port": "6226", "country": "cn" }, { "port": "6235", "country": "cn" }, { "port": "6217", "country": "cn" }, { "port": "6221", "country": "tw" }, { "port": "6202", "country": "tw" }, { "port": "6205", "country": "vn" }], "wa111": [{ "port": "6326", "country": "cn" }, { "port": "6335", "country": "cn" }, { "port": "6317", "country": "cn" }, { "port": "6321", "country": "tw" }, { "port": "6302", "country": "tw" }, { "port": "6305", "country": "vn" }], "ku711": [{ "port": "", "country": "cn" }] }, "servers": { "lottery": [{ "label": "http://161.202.184.9:" }], "company": [{ "label": "http://119.81.201.133:" }], "wa111": [{ "label": "http://q51.tp33.net:" }, { "label": "http://host.wa111.net" }, { "label": "http://admin.wa111.net" }, { "label": "http://admin-2.wa111.net" }], "ku711": [{ "label": "https://lg.ku711.net" }] }, "pages": { "lottery": "/layout/Login.aspx", "company": "/company/net/page/Login/CommonLogin/Login.aspx", "wa111": "/Aspx/Index.aspx", "ku711": "/Authorize/SignIn" } }
var result = JSON.stringify(results);

var blob = Utilities.newBlob(result);
var encoded = Utilities.base64EncodeWebSafe(blob.getBytes());
return ContentService.createTextOutput(btoa(encoded));
/*
lottery
company
wa111
ku711
*/
[
    ["type", "site", "port", "country"],
    ["sites", "lottery", 15107, "cn"],

    ["", "", 15109, "cn"],
    ["", "", 15112, "cn"],
    ["", "", 15106, "tw"],
    ["", "", 15108, "tw"],
    ["", "", 15110, "vn"],
    ["", "company", 6226, "cn"],
    ["", "", 6235, "cn"],
    ["", "", 6217, "cn"],
    ["", "", 6221, "tw"],
    ["", "", 6202, "tw"],
    ["", "", 6205, "vn"],
    ["", "wa111", 6326, "cn"],
    ["", "", 6335, "cn"],
    ["", "", 6317, "cn"],
    ["", "", 6321, "tw"],
    ["", "", 6302, "tw"],
    ["", "", 6305, "vn"]
]

new Uint8Array([
    ["type", "site", "port", "country"]
])






Uint8Array
TextDecoder

var arr = [
    ["type", "site", "port", "country"],
    ["sites", "lottery", 15107, "cn"],
    ["中文", "中文", 15109, "cn"]
];

var str = JSON.stringify(arr);
var encoded = encodeURI(str);
var decoded = decodeURI(encoded);
console.log(encoded, decoded);



console.log(str);
console.log(encodeURI(str));

encodeURI(str)

var encoded = btoa(str);
var decoded = atob(encoded);

console.log(encoded, decoded);


var modules = {
    GMA: function(e) {
        var sheets = SpreadsheetApp.openById("1_PPpDH6LxEfklCymd7367wvNnlCp2MuoeQuFAhrL2wI").getSheets();
        var results = sheets.map(function(sheet, index) {
            var name = sheet.getName();
            var values = encodeURI(sheet.getDataRange().getValues());
            var value = JSON.stringify(values);
            var blob = Utilities.newBlob(value);
            var encoded = Utilities.base64EncodeWebSafe(blob.getBytes());
            return [name, encoded];
        });
        var result = JSON.stringify(results);
        return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
    }
}