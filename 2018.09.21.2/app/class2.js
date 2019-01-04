class Employee {
    constructor(firstName, familyName) {
        this._firstName = firstName;
        this._familyName = familyName;
    }

    getFullName() {
        return `${this._firstName} ${this._familyName}`;
    }
}

class Manager {
    constructor(firstName, familyName) {
        this._firstName = firstName;
        this._familyName = familyName;
        this._managedEmployees = [];
    }

    getFullName() {
        return `${this._firstName} ${this._familyName}`;
    }

    addEmployee(employee) {
        this._managedEmployees.push(employee);
    }
}






class Manager extends Employee {
    constructor(firstName, familyName) {
        super(firstName, familyName);
        this._managedEmployees = [];
    }

    addEmployee(employee) {
        this._managedEmployees.push(employee);
    }
}

class Rectangle {
    set width(w) {
        this._width = w;
    }

    get width() {
        return this._width;
    }

    set height(h) {
        this._height = h;
    }

    get height() {
        return this._height;
    }
}

// A function that operates on an instance of Rectangle
function f(rectangle) {
    rectangle.width = 5;
    rectangle.height = 4;

    // Verify expected result
    if (rectangle.width * rectangle.height !== 20) {
        throw new Error("Expected the rectangle's area (width * height) to be 20");
    }
}

// A square IS-A rectangle... right?
class Square extends Rectangle {
    set width(w) {
        super.width = w;

        // Maintain square-ness
        super.height = w;
    }

    set height(h) {
        super.height = h;

        // Maintain square-ness
        super.width = h;
    }
}

// But can a rectangle be substituted by a square?
f(new Square()); // error
A square may be a rectangle mathematically, but a square doesn’ t work like a rectangle behaviorally.

This rule that any use of a superclass instance should be substitutable by a subclass instance is called the Liskov Substitution Principle, and it’ s an important part of object - oriented class design.

Beware Overuse
It’ s easy to find commonality everywhere, and the prospect of having a class that offers complete functionality can be alluring, even
for experienced developers.But there are disadvantages to inheritance too.Recall that we ensure valid state by manipulating data only through a small and fixed set of functions.But when we inherit, we increase the list of functions that can directly manipulate the data, and those additional functions are then also responsible
for maintaining valid state.If too many functions can directly manipulate the data, that data becomes nearly as bad as global variables.Too much inheritance creates monolithic classes that dilute encapsulation, are harder to make correct, and harder to reuse.Instead, prefer to design minimal classes that embody just one concept.

Let’ s revisit the code duplication problem.Could we solve it without inheritance ? An alternative approach is to connect objects through references to represent a part– whole relationship.We call this composition.

Here’ s a version of the manager– employee relationship using composition rather than inheritance:

    class Employee {
        constructor(firstName, familyName) {
            this._firstName = firstName;
            this._familyName = familyName;
        }

        getFullName() {
            return `${this._firstName} ${this._familyName}`;
        }
    }

class Group {
    constructor(manager /* : Employee */ ) {
        this._manager = manager;
        this._managedEmployees = [];
    }

    addEmployee(employee) {
        this._managedEmployees.push(employee);
    }
}
Here, a manager isn’ t a separate class.Instead, a manager is an ordinary Employee instance that a Group instance holds a reference to.If inheritance models the IS - A relationship, then composition models the HAS - A relationship.That is, a group“ has a” manager.

If either inheritance or composition can reasonably express our program concepts and relationships, then prefer composition.

Inherit to Substitute Subclasses
Inheritance also allows different subclasses to be used interchangeably through the interface provided by a common superclass.A

function that expects a superclass instance as an argument can also be passed a subclass instance without the

function having to know about any of the subclasses.Substituting classes that have a common superclass is often called polymorphism:

    // This will be our common superclass
    class Cache {
        get(key, defaultValue) {
            const value = this._doGet(key);
            if (value === undefined || value === null) {
                return defaultValue;
            }

            return value;
        }

        set(key, value) {
            if (key === undefined || key === null) {
                throw new Error('Invalid argument');
            }

            this._doSet(key, value);
        }

        // Must be overridden
        // _doGet()
        // _doSet()
    }

// Subclasses define no new public methods
// The public interface is defined entirely in the superclass
class ArrayCache extends Cache {
    _doGet() {
        // ...
    }

    _doSet() {
        // ...
    }
}

class LocalStorageCache extends Cache {
    _doGet() {
        // ...
    }

    _doSet() {
        // ...
    }
}

// Functions can polymorphically operate on any cache by interacting through the superclass interface
function compute(cache) {
    const cached = cache.get('result');
    if (!cached) {
        const result = // ...
            cache.set('result', result);
    }

    // ...
}

compute(new ArrayCache()); // use array cache through superclass interface
compute(new LocalStorageCache()); // use local storage cache through superclass interface

/*More than Sugar
JavaScript’ s class syntax is often said to be syntactic sugar, and in a lot of ways it is, but there are also real differences— things we can do with ES6 classes that we couldn’ t do inES5.

        Static Properties Are Inherited
    ES5 didn’ t
let us create true inheritance between constructor functions.Object.create could create an ordinary object but not a

function object.We faked inheritance of static properties by manually copying them.Now with ES6 classes, we get a real prototype link between a subclass constructor

function and the superclass constructor:
*/
// ES5
function B() {}
B.f = function() {};

function D() {}
D.prototype = Object.create(B.prototype);

D.f(); // error
// ES6
class B {
    static f() {}
}

class D extends B {}

D.f(); // ok
/*
Built - in Constructors Can Be Subclassed
Some objects are“ exotic” and don’ t behave like ordinary objects.Arrays,
    for example, adjust their length property to be greater than the largest integer index.In ES5, when we tried to subclass Array, the new operator would allocate an ordinary object
for our subclass, not the exotic object of our superclass:
*/
// ES5
function D() {
    Array.apply(this, arguments);
}
D.prototype = Object.create(Array.prototype);

var d = new D();
d[0] = 42;
/*
d.length; // 0 - bad, no array exotic behavior
ES6 classes fixed this by changing when and by whom objects are allocated.In ES5, objects were allocated before invoking the subclass constructor, and the subclass would pass that object to the superclass constructor.Now with ES6 classes, objects are allocated before invoking the superclass constructor, and the superclass makes that object available to the subclass constructor.This lets Array allocate an exotic object even when we invoke new on our subclass.


Report Advertisement
// ES6
class D extends Array {}

let d = new D();
d[0] = 42;
*/
/*

d.length; // 1 - good, array exotic behavior
Miscellaneous
There’ s a small assortment of other, probably less significant differences.Class constructors can’ t be
function -called.This protects against forgetting to invoke constructors with new.Also, a class constructor’ s prototype property can’ t be reassigned.This may help JavaScript engines optimize class objects.And
finally, class methods don’ t have a prototype property.This may save memory by eliminating unnecessary objects.

Using New Features in Imaginative Ways
Many of the features described here and in other SitePoint articles are new to JavaScript, and the community is experimenting right now to use those features in new and imaginative ways.

Multiple Inheritance with Proxies
One such experiment uses proxies, a new feature to JavaScript
for implementing multiple inheritance.JavaScript’ s prototype chain allows only single inheritance.Objects can delegate to only one other object.Proxies give us a way to delegate property accesses to multiple other objects:
*/
const transmitter = {
    transmit() {}
};

const receiver = {
    receive() {}
};

// Create a proxy object that intercepts property accesses and forwards to each parent,
// returning the first defined value it finds
const inheritsFromMultiple = new Proxy([transmitter, receiver], {
    get: function(proxyTarget, propertyKey) {
        const foundParent = proxyTarget.find(parent => parent[propertyKey] !== undefined);
        return foundParent && foundParent[propertyKey];
    }
});

inheritsFromMultiple.transmit(); // works
inheritsFromMultiple.receive(); // works

/*
Can we expand this to work with ES6 classes ? A class’ s prototype could be a proxy that forwards property access to multiple other prototypes.The JavaScript community is working on this right now.Can you figure it out ? Join the discussion and share your ideas.

Multiple Inheritance with Class Factories
Another approach the JavaScript community has been experimenting with is generating classes on demand that extend a variable superclass.Each class still has only a single parent, but we can chain those parents in interesting ways:
*/
function makeTransmitterClass(Superclass = Object) {
    return class Transmitter extends Superclass {
        transmit() {}
    };
}

function makeReceiverClass(Superclass = Object) {
    return class Receiver extends Superclass
    receive() {}
};




class InheritsFromMultiple extends makeTransmitterClass(makeReceiverClass()) {}

const inheritsFromMultiple = new InheritsFromMultiple();


inheritsFromMultiple.transmit(); // works
inheritsFromMultiple.receive(); // works