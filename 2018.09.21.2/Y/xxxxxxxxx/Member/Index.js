 var siteNumber = "16";
 var siteName = "KU711"
 var operator = myApp.$scope.ctrl.resetModel.AccountID.toUpperCase();
 evo.sendMessage({ command: 'RequestVerificationToken', value: evo.token });