define([], function() {

    return function() {

    	console.log(this);
    	/*console.log(this.extensionId);
    	console.log(this.$host);*/

    	console.log(this.hostname);


    	



/*
        this.ctrl.username.value = "18c894";
        this.ctrl.password.value = "18c894";
        this.ctrl.securitycode.value = "867194B0-009B-4FA6-B72A-161FCEC11A57"
        document.forms[0].submit();*/
    }




    /*
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
    */
});


/*define([], function() {
    return function() {
        
    }
});*/