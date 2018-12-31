define([], function() {

    const mixinClass = (base, ...mixins) => {
        const mixinProps = (target, source) => {
            Object.getOwnPropertyNames(source).forEach(prop => {
                if (/^constructor$/.test(prop)) { return; }
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
        };

        let Ctor;
        if (base && typeof base === 'function') {
            Ctor = class extends base {
                constructor(...props) {
                    super(...props);
                }
            };
            mixins.forEach(source => {
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