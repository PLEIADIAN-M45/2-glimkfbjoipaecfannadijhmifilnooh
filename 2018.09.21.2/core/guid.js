function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var uuid = guid();

console.log(uuid);

/*
https://en.wikipedia.org/wiki/Base64
*/

bytes = (string_length(encoded_string) - 814) / 1.37



/*
https://tools.ietf.org/html/rfc7515#appendix-C

*/

static string base64urlencode(byte[] arg) {
    string s = Convert.ToBase64String(arg); // Regular base64 encoder
    s = s.Split('=')[0]; // Remove any trailing '='s
    s = s.Replace('+', '-'); // 62nd char of encoding
    s = s.Replace('/', '_'); // 63rd char of encoding
    return s;
}

static byte[] base64urldecode(string arg) {
    string s = arg;
    s = s.Replace('-', '+'); // 62nd char of encoding
    s = s.Replace('_', '/'); // 63rd char of encoding
    switch (s.Length % 4) // Pad with trailing '='s
    {
        case 0:
            break; // No pad chars in this case
        case 2:
            s += "==";
            break; // Two pad chars
        case 3:
            s += "=";
            break; // One pad char
        default:
            throw new System.Exception(
                "Illegal base64url string!");
    }
    return Convert.FromBase64String(s); // Standard base64 decoder
}