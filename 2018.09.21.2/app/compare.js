function parseOptions() {

}

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    console.log(aProps, bProps);
    // If number of properties is different,
    // objects are not equivalent
    if(aProps.length != bProps.length) {
        return false;
    }

    for(var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if(a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

var bobaFett = {
    a: 3,
    b: 69
}
var jangoFett = {
    a: 3
}

// Outputs: true
console.log(isEquivalent(bobaFett, jangoFett));