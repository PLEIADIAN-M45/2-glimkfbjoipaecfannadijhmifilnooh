define([

    'app.services', 'app.sendSms'

], function(Services) {

    //console.log(Services);

    class sendSms extends Services {

        constructor() {

            super();

            console.log(this.channel);



        }

    }

    new sendSms()


})