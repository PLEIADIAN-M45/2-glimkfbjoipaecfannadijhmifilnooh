define([], function() {

    return function() {
        console.log(this);
        return {
            host     : this.host,
            origin   : this.origin,
            unique   : this.unique,
            channel  : this.channel,
            account  : this.account,
            operator : this.operator
        }
    }


})