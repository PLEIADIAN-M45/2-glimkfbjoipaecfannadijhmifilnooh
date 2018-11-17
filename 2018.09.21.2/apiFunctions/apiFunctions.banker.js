apiFunctions.banker = function() {
    var region = this.region;
    return Promise.resolve({ region });

}


/*
return Promise.resolve({ region: this.region });
var obj = {};
Object.defineProperty(obj, 'region', {
    value: this.region,
    writable: false
});
console.log(obj);
*/