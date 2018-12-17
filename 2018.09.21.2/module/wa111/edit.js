define([], function() {



    return async function() {

        this.setUser = function() {

            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };

            return Promise.all([


                this.apiFunction.getUserState.call(this.user, this.model),

                this.apiFunction.getUserModel.call(this.user, this.model),

                /*apiFunction.getPhoneDate.call(this.user),
                apiFunction.getSystemLog.call(this.user),*/
                
                this.apiFunction.getUserStore.call(this.user, this)


            ]).then(this.putUser.bind(this));
        };

        //this.user = await this.getUser() || await this.setUser(this);
        this.user = await this.setUser(this);


        console.log(this.user);
    }
});