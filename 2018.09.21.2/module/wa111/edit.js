define(['apiFunction'], function(apiFunction) {

    return async function() {

        this.apiFunction = new apiFunction(this);

        this.setUser = function() {

            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };

            return Promise.all([

                this.apiFunction.getUserState.call(this.user, this.model),
                this.apiFunction.getUserModel.call(this.user, this.model),
                this.apiFunction.getPhoneDate.call(this.user, this),
                this.apiFunction.getSystemLog.call(this.user, this),
                this.apiFunction.getUserStore.call(this.user, this)

            ]).then(this.putUser.bind(this));
        };

        this.user = await this.getUser() || await this.setUser(this);

        //console.log(this.user);
    }


});