define([], function() {


    function createClassExtending(superclass) {
        return class AwesomeClass extends superclass {
            // you class body here as usual
        }
    }


    //class {}
    const mixinClass = function() {

        //console.log(arguments);
        //var base;
        //class base {}

        var target = {}

        Array.from(arguments).forEach((Source) => {


            //console.log(x);
            //var source = new Source();
            Object.getOwnPropertyNames(source).forEach(prop => {
                //console.log(prop);
                // if (/^constructor$/.test(prop)) { return; }
                //Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })

            //Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));


            //console.log(c);


            /*
            var curr = class extends x {
                constructor(...props) {
                    super(...props);
                }
            };

            console.log(curr);
            */

            /*
            var base1 = class extends x {
                constructor(...props) {
                    super(...props);
                }
            };
            */

        })

        //console.log(base);
        return target



        /*
        console.log(base);
        console.log(mixins);

        let classB = class extends base {
            constructor(...props) {
                super(...props);
            }
        };
        */






    }


    return mixinClass;



    const mixinClass2 = (base, ...mixins) => {
        console.log(mixins);

        const mixinProps = (target, source) => {
            Object.getOwnPropertyNames(source).forEach(prop => {
                if (/^constructor$/.test(prop)) { return; }
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
        };

        let Ctor;
        console.log(typeof base === 'function');
        if (base && typeof base === 'function') {
            Ctor = class extends base {
                constructor(...props) {
                    super(...props);
                }
            };
            mixins.forEach(source => {
                console.log(source.prototype);
                mixinProps(Ctor.prototype, source.prototype);
            });
        } else {
            Ctor = class {};
        }
        return Ctor;
    };

    return mixinClass;
})



/*
class A {
    constructor() {
        this.name = "RYAN"
    }
    methodA() {}
    get abc() {
        return 3156
    }
}
class B {
    methodB() {}
}

class C extends mixinClass(A, B) {
    methodA() { console.log('methodA in C'); }
    methodC() {}
}

let c = new C();
console.log(c);
c.methodA()*/

    class App extends mixinClass(Router, Config) {
        constructor() {
            super(12345);
            // console.log(this.ctrlId);
        }
    }


    return App

var superclass;


function createClassExtending() {

    return class AwesomeClass extends superclass {
        // you class body here as usual
    }
}



return



function createClassExtending(superclass) {
    return class AwesomeClass extends superclass {
        // you class body here as usual
    }
}
var A = createClassExtending(Router)
var B = createClassExtending(A)


//class A extends Router {}