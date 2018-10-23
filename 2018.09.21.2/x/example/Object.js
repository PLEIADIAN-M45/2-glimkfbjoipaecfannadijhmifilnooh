const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }



properties.reduce(function(object, property) {
    //console.log(i++, object, property);
    if (object[property] == undefined) {
        object[property] = {}
    }
    // console.log(object, property);

    //console.log(object);
    /*if (object[property]) {
    } else {
        object[property] = []
    }
    */

    return object[property];
}, ctrl)

//console.log(property);

//evo.ctrl[key] = el;