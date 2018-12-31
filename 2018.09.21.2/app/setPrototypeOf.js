class A {
    constructor() {
        abc: 635
    }
    hello() {
        console.log('hello');
    }

    static goodbye() {
        console.log('bye');

    }

}

class B {
    constructor() {

    }
}



Object.setPrototypeOf(B.prototype, A.prototype)
Object.setPrototypeOf(B, A)


var C = new B()

console.log(C);

C.hello()
B.goodbye()