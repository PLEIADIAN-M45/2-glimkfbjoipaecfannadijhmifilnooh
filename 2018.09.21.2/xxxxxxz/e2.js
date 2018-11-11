<aside>
    <div class="ui vertical labeled icon menu inverted" ng-class="{ 'danger': user.isblack }">
        <a class="item">{{user.author.value}}</a>
        <a class="item">{{user.status}}/{{user.deposit}}</a>
        <a class="item" ng-click="openLoginLog(user)" style="margin-bottom: 50px;"><i class="bolt icon"></i><b>一机多登</b></a>
        <a class="item" ng-click="openDeposit(user)" ng-if="user.status==3"><i class="handshake outline icon"></i><b>开通</b></a>
        <a class="item" ng-click="sendsms.send(3)" ng-show="sendsms.status==3"><i class="envelope outline icon"></i><b>简讯<br>开通</b></a>
        <a class="item" ng-click="sendsms.send(3)" ng-show="sendsms.status==3 && user.status==1"><i class="envelope outline icon"></i><b>简讯<br>开通</b></a>
        <a class="item" ng-click="sendsms.send(0)" ng-show="sendsms.status==0"><i class="envelope outline icon"></i><b>简讯<br>开通</b></a>
    </div>
</aside>
<!--  <a class="item" ng-click="openDeposit(user)" ng-if="user.status==3"><i class="handshake icon"></i><b>开通</b></a> -->
<!-- <a class="item" ng-click="sendsms.send(3)" ng-show="sendsms.status==3 && user.status==1"><i class="mail icon"></i><b>简讯<br>开通</b></a>
        <a class="item" ng-click="sendsms.send(3)" ng-show="sendsms.status==3 && user.status==3"><i class="mail icon"></i><b>简讯<br>开通</b></a> -->
<!-- <a class="item" ng-click="sendsms.send(3)" ng-show="sendsms.status==3 && user.status==3"><i class="green envelope open outline icon"></i><b>简讯<br>开通</b></a> -->
<!--
            -{{sendsms.status}}
            <a class="item" ng-click="__stop()" ng-if="user.isBlack==true"><i class="bug icon"></i><b>黑名单</b></a>
    <br><br><b ng-bind="user.account+'-'+user.channel"></b>
    {{user.account}}-{{user.channel}}
<a class="item" ng-click="sendsms.send()" ng-show="sendsms.status==2"><i class="mail icon"></i><b>静止简讯</b></a>
 <a class="item" ng-click="sendsms.send(user)" ng-show="sendsms.status=='1'||sendsms.status=='1' "><i class="mail icon"></i><b>简讯-{{sendsms.status}}</b></a> -->
<style type="text/css">
.ui.inverted.menu.danger {
    background-color: #d2115a !important;
}


.w140 {
    display: inline-block;
    min-width: 150px !important;
}

.m {
    display: inline-block;
    margin-right: 20px;
    font-weight: bold;
}

.ui.labeled.icon.menu {
    position: fixed !important;
    top: 0px !important;
    right: 0px !important;
    z-index: 99999 !important;
}

.ui.popup,
.ui.popup::before {
    background-color: #333 !important;
    color: #fff !important;
}

.ui.popup>.content {
    text-align: left;
    font-family: Roboto, Microsoft Yahei;
    font-weight: bold;
}

.success {
    color: green !important;
}

.isBlack,
.error {
    color: red;
}

.mdl-dialog {
    width: 350px;
}

.mdl-dialog__title {
    line-height: 1.28571em !important;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-family: Roboto, Microsoft JhengHei;
}

.mdl-dialog__content {
    font-family: Roboto, Microsoft JhengHei !important;
}

.material-icons {
    margin-right: 10px;
    line-height: inherit !important;
}

._mobile {
    font-family: Roboto;
    font-weight: bold;
}


































































/*
._message {
    font-family: Roboto, Microsoft JhengHei;
    line-height: 25px;
}*/
</style>