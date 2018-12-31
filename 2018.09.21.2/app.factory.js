define(["app.config", 'dexie', 'moment', 'material', 'semantic', 'app.xmlhttp', 'app.sendSms'],
    function(Config, Dexie, moment, mdc, semantic, xmlSpider, sendSms) {

        class Factory extends Config {

            constructor() {
                super();
                console.log(this.ctrlId);
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