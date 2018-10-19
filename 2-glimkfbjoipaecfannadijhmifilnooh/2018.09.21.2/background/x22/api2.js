 function GetMemberList(selShow) {
     $.ajax({
         url: 'http://host26.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=            &txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=1&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=1&hidevalue_RecordCount=0&type=getAllUser&_=1539094990277',
         method: 'get',
         dataType: 'json'
     }).then((d) => {
         console.log(d);
     })
 }