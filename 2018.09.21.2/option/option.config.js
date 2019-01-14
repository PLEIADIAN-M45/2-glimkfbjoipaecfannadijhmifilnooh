var _encode = "JTdCJTIyZGFzaGJvYXJkcyUyMjolNUIlN0IlMjJuYW1lJTIyOiUyMmxvdHRlcnklMjIsJTIyY25hbWUlMjI6JTIyJUU1JUJEJUE5JUU3JUE1JUE4JUU3JUFCJUFGJTIyLCUyMmNvbG9yJTIyOiUyMnBpbmslMjIlN0QsJTdCJTIybmFtZSUyMjolMjJjb21wYW55JTIyLCUyMmNuYW1lJTIyOiUyMiVFNSU4NSVBQyVFNSU4RiVCOCVFNyVBQiVBRiUyMiwlMjJjb2xvciUyMjolMjJ0ZWFsJTIyJTdELCU3QiUyMm5hbWUlMjI6JTIya3U3MTElMjIsJTIyY25hbWUlMjI6JTIyS1U3MTElMjIsJTIyY29sb3IlMjI6JTIyb2xpdmUlMjIlN0QsJTdCJTIybmFtZSUyMjolMjJ3YTExMSUyMiwlMjJjbmFtZSUyMjolMjIlRTUlODIlQTglRTUlODAlQkMlRTclQUIlQUYlMjIsJTIyY29sb3IlMjI6JTIyYmx1ZSUyMiU3RCU1RCwlMjJzaXRlcyUyMjolN0IlMjJsb3R0ZXJ5JTIyOiU1QiU3QiUyMnBvcnQlMjI6JTIyMTUxMDclMjIsJTIyY291bnRyeSUyMjolMjJjbiUyMiU3RCwlN0IlMjJwb3J0JTIyOiUyMjE1MTA5JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjIxNTExMiUyMiwlMjJjb3VudHJ5JTIyOiUyMmNuJTIyJTdELCU3QiUyMnBvcnQlMjI6JTIyMTUxMDYlMjIsJTIyY291bnRyeSUyMjolMjJ0dyUyMiU3RCwlN0IlMjJwb3J0JTIyOiUyMjE1MTA4JTIyLCUyMmNvdW50cnklMjI6JTIydHclMjIlN0QsJTdCJTIycG9ydCUyMjolMjIxNTExMCUyMiwlMjJjb3VudHJ5JTIyOiUyMnZuJTIyJTdEJTVELCUyMmNvbXBhbnklMjI6JTVCJTdCJTIycG9ydCUyMjolMjI2MjI2JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MjM1JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MjE3JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MjIxJTIyLCUyMmNvdW50cnklMjI6JTIydHclMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MjAyJTIyLCUyMmNvdW50cnklMjI6JTIydHclMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MjA1JTIyLCUyMmNvdW50cnklMjI6JTIydm4lMjIlN0QlNUQsJTIyd2ExMTElMjI6JTVCJTdCJTIycG9ydCUyMjolMjI2MzI2JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MzM1JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MzE3JTIyLCUyMmNvdW50cnklMjI6JTIyY24lMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MzIxJTIyLCUyMmNvdW50cnklMjI6JTIydHclMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MzAyJTIyLCUyMmNvdW50cnklMjI6JTIydHclMjIlN0QsJTdCJTIycG9ydCUyMjolMjI2MzA1JTIyLCUyMmNvdW50cnklMjI6JTIydm4lMjIlN0QlNUQsJTIya3U3MTElMjI6JTVCJTdCJTIycG9ydCUyMjolMjIlMjIsJTIyY291bnRyeSUyMjolMjJjbiUyMiU3RCU1RCU3RCwlMjJzZXJ2ZXJzJTIyOiU3QiUyMmxvdHRlcnklMjI6JTVCJTdCJTIybGFiZWwlMjI6JTIyaHR0cDovLzE2MS4yMDIuMTg0Ljk6JTIyJTdEJTVELCUyMmNvbXBhbnklMjI6JTVCJTdCJTIybGFiZWwlMjI6JTIyaHR0cDovLzExOS44MS4yMDEuMTMzOiUyMiU3RCU1RCwlMjJ3YTExMSUyMjolNUIlN0IlMjJsYWJlbCUyMjolMjJodHRwOi8vcTUxLnRwMzMubmV0OiUyMiU3RCwlN0IlMjJsYWJlbCUyMjolMjJodHRwOi8vaG9zdC53YTExMS5uZXQlMjIlN0QsJTdCJTIybGFiZWwlMjI6JTIyaHR0cDovL2FkbWluLndhMTExLm5ldCUyMiU3RCwlN0IlMjJsYWJlbCUyMjolMjJodHRwOi8vYWRtaW4tMi53YTExMS5uZXQlMjIlN0QlNUQsJTIya3U3MTElMjI6JTVCJTdCJTIybGFiZWwlMjI6JTIyaHR0cHM6Ly9sZy5rdTcxMS5uZXQlMjIlN0QsJTdCJTIybGFiZWwlMjI6JTIyaHR0cHM6Ly9sZzIua3U3MTEubmV0JTIyJTdELCU3QiUyMmxhYmVsJTIyOiUyMmh0dHBzOi8vbGczLmt1NzExLm5ldCUyMiU3RCU1RCU3RCwlMjJwYWdlcyUyMjolN0IlMjJsb3R0ZXJ5JTIyOiUyMi9sYXlvdXQvTG9naW4uYXNweCUyMiwlMjJjb21wYW55JTIyOiUyMi9jb21wYW55L25ldC9wYWdlL0xvZ2luL0NvbW1vbkxvZ2luL0xvZ2luLmFzcHglMjIsJTIyd2ExMTElMjI6JTIyL0FzcHgvSW5kZXguYXNweCUyMiwlMjJrdTcxMSUyMjolMjIvQXV0aG9yaXplL1NpZ25JbiUyMiU3RCwlMjJjb3VudHJpZXMlMjI6JTdCJTIyY24lMjI6JTIyJUU0JUI4JUFEJUU1JTlCJUJEJTIyLCUyMnR3JTIyOiUyMiVFNSU4RiVCMCVFNiVCOSVCRSUyMiwlMjJ2biUyMjolMjIlRTglQjYlOEElRTUlOEQlOTclMjIlN0QlN0Q=";
var initial = angular.fromJson(decodeURI(atob(_encode)))

console.log(initial);



var __initial__ = {
    "dashboards": [{
        "name": "lottery",
        "cname": "彩票端",
        "color": "pink"
    }, {
        "name": "company",
        "cname": "公司端",
        "color": "teal"
    }, {
        "name": "ku711",
        "cname": "KU711",
        "color": "olive"
    }, {
        "name": "wa111",
        "cname": "储值端",
        "color": "blue"
    }],
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
            { "label": "http://host$.wa111.net" },
            { "label": "http://admin.wa111.net" },
            { "label": "http://admin-2.wa111.net" }
        ],
        "ku711": [
            { "label": "https://lg.ku711.net" },
            { "label": "https://lg2.ku711.net" },
            { "label": "https://lg3.ku711.net" },
        ]
    },
    "pages": {
        "lottery": "/layout/Login.aspx",
        "company": "/company/net/page/Login/CommonLogin/Login.aspx",
        "wa111": "/Aspx/Index.aspx",
        "ku711": "/Authorize/SignIn"
    },
    "countries": {
        "cn": "中国",
        "tw": "台湾",
        "vn": "越南"
    }
}


//console.log(angular.toJson(initial));
var str = encodeURI(angular.toJson(__initial__))
//console.log(str);
//console.log(btoa(str));