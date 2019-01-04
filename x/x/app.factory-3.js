define(["app.instance", "app.config", 'dexie', 'moment', 'material', 'semantic', 'app.xmlhttp', 'app.sendSms'],
    function(instance, Config, Dexie, moment, mdc, semantic, xmlSpider, sendSms) {


        class Factory extends Config {
            constructor() {
                super();
                this.mdc = mdc;
                this.dexie = new Dexie('evo');
                this.dexie.version(1).stores({ user: 'f_accounts' });
                this.xmlSpider = xmlSpider;
                xmlSpider.sendMessage = this.sendMessage;
                xmlSpider.dexie = this.dexie;
            }

            controller($scope, $rootScope) {

            }



            

        }

        return Factory;
    })




var MyClass = class {}

console.log(MyClass);