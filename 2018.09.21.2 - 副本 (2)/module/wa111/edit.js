define(["apiFunction"], function(apiFunction) {
    //console.log(xmlSpider);
    return async function() {
        this.setUser = function() {
            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };
            return Promise.all([
                apiFunction.getUserState.call(this.user),
                apiFunction.getUserModel.call(this.user),
                apiFunction.getPhoneDate.call(this.user),
                apiFunction.getSystemLog.call(this.user),
                apiFunction.getUserStore.call(this.user)
            ]).then(this.putUser.bind(this));
        };
        this.user = await this.getUser() || await this.setUser(this);
        this.$apply();
        console.log(this.user);
    }
});




//this.user = await this.setUser(this);
//apiFunction.getUserState.call(this.user);