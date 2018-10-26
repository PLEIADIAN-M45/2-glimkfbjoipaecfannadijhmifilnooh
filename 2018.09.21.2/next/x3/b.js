//Inside b.js:
define(function(require, exports, module) {
    console.log(module);

    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of "a"'s properties until after "b" returns a value.
    var a = require("a");
    console.log(a);

    exports.foo = function() {
        return a.bar();
    };
});


requirejs(['b'], function(b) {
    console.log(b);
    var c = b.foo()
    console.log(c);
})