apis.port.postMessage('sender');
apis.port.onMessage.addListener(function(sender) {
    console.log(sender);
    if(sender == 'setPermit') { $scope.setPermit() }
    if(sender.frameId) { $scope.user.frameId = sender.frameId; }
});


console.log(window.opener);
if(window.opener == null) {} else { return }




1. window.open("http://localhost:8080/login?cid='username'&pwd='password'", "mywindow")

2. window.open("http://localhost:8080/login", "mywindow")
mywindow.getElementById('cid').value = 'MyUsername'
mywindow.getElementById('pwd').value = 'mypassword'


function openWin() {
    var strValue = document.getElementById('txtboxId').value;
    var url = "http://mywebpage.com?parameter=" + strValue;
    myWindow = window.open(url, '', 'width=800,height=200,scrollbars=1');
    myWindow.focus();
}