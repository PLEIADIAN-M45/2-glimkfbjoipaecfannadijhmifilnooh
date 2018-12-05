//console.log(12, 23);


console.log(require.toUrl("."));


require.config({
    "packages": ["cart", "store"]
});



require(["cart"], function(c) {

});


/*
require(["store"], function(c) {

})
require(["store/util"], function(c) {

})*/