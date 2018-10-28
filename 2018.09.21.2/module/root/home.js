define(['host'], function(module) {
    evo.connect();
    evo.assign(localStorage, module);
});