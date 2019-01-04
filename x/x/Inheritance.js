// ES6 get and set
class Person {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name.toUpperCase();
    }

    set name(newName) {
        this._name = newName; // validation could be checked here such as only allowing non numerical values
    }

    walk() {
        console.log(this._name + ' is walking.');
    }
}


let bob = new Person('Bob');
console.log(bob.name); // Outputs 'BOB'

// ES5 Prototype inheritance
function Programmer(name, programmingLanguage) {
    this.name = name;
    this.programmingLanguage = programmingLanguage;
}

Programmer.prototype = Object.create(Person.prototype);
Programmer.prototype.constructor = Programmer;

Programmer.prototype.writeCode = function() {
    console.log(this.name + ' is coding in ' + this.programmingLanguage + '.');
}

var cory = new Programmer('Cory', 'JavaScript');
cory.walk(); // Outputs 'Cory is walking.'
cory.writeCode(); // Outputs 'Cory is coding in JavaScript.'