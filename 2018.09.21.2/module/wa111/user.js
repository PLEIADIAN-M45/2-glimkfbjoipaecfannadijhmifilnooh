//define(['App'], function($scope) {
define(['factory'], function(factory) {

    //console.log(factory);

    return class user extends factory {

        constructor() {

            console.log(this);

        }

        getUser() {

        }

        setUser() {

        }


        putUser() {

        }

    }


    //console.log(OBSApp);

    /*return class user extends App {
        constructor() {

        }
    }*/

    /* return class user extends App {
         constructor() {

         }

     }*/


    //console.log($scope);
})

//$scope.setUser = function() {
//console.log(this);

/*
this.user = {
    unique: this.unique,
    host: this.host,
    origin: this.origin,
    operator: this.operator,
    channel: this.channel,
    account: this.account
}
return Promise.all([
    apiFunction.getUserModel.call(this.user),
    apiFunction.getPhoneDate.call(this.user),
    apiFunction.getSystemLog.call(this.user),
    apiFunction.getUserStore.call(this.user)
]).then(s);
//.then(putUser);*/
//}



/*

class user extends factory {
    constructor() {
        super();
        console.log(this.account);
        console.log(this.unique);

    }

    setUser() {

    }



}



new User()*/