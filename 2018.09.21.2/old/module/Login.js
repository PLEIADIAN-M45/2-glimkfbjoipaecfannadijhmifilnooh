define(['extension'], function() {
    var constructor = {
        wa111: function() {
            $('#form-username').val(this.username)
            $('#form-password').val(this.password)
            $('#form-securitycode').val(this.security).focus();
            if (evo.searchParams.get('msg') === null &&
                evo.searchParams.get('ReturnUrl').match(/Aspx/)) {
                $('#btnLogin').click();
            }
        },
        ku711: function() {
            $('#AccountID').val(this.username);
            $('#AccountPwd').val(this.password).focus();
            if (evo.referrer === '') {
                $('#btnSignIn').click();
            }
        },
        company: function(config) {
            $('#txtUsername').val(this.username);
            $('#txtPassword').val(this.password).focus();
            if (document.referrer === '') {
                $('#LogButton').click();
            }
        },
        lottery: function(config) {
            $('#txbAccount').val(this.username);
            $('#txbPassword').val(this.password).focus();
            if (document.referrer === '') {
                $('#btnLogin').click();
            }
        }
    }
    async function exec() {
        var c = await extension.localStorage.getItem('config')
        var config = c[evo.host];
        constructor[evo.host].call(config);
    }
    exec();
});