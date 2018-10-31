window.extend = function() { return Object.assign(this, ...arguments); }

document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});


var $$ = {}

function $serializeObject(selector) {
    var obj = {};
    $(selector).map(function() {
        var _name_ = this.name || this.id;
        var name = _name_.split('$').pop().replace(/\d+_?/g, '');
        switch (this.localName) {
            case 'span':
                var value = this.textContent;
                break;
            case 'select':
                var value = (this.value) ? this.selectedOptions[0].label : '';
                break;
            default:
                var value = this.value;
        }
        if (obj[name] == undefined) {
            obj[name] = value;
        } else {
            if (!obj[name].push) { obj[name] = [obj[name]]; }
            obj[name].push(value);
        }
    })
    return obj;
}


//console.log(...new FormData(aspnetForm).entries());
/*
serializeObject
serializeArray
serialize
console.log($.param({ a: 3, b: 4 }));

*/

Array.prototype.toObj = function(key, value) {
    var object = {};
    this.map((x) => { object[x[key]] = x[value]; });
    return object;
}

Array.prototype.separate = function() {
    return '(' + this.join('|') + ')';
}

Array.prototype.hyphen = function() {
    return this.join('-');
}

Array.prototype.serialize = function() {
    var obj = {};
    this.map(([longname, value], index) => {
        var name = longname.replace('ctl00$ContentPlaceHolder1$', '');
        Object.defineProperty(obj, name, { value, writable: true });
    });
    return obj;
}



Array.prototype.toPath = function() {
    return this.join('/');
}


Array.prototype.counts = function(elem) {
    return this.filter((a) => { return a == elem }).length;
}


Array.prototype.has = function(elem) {
    return (this.find((a) => { return a == elem })) ? true : false;
}


//var arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
//console.log(arr.counts(5));
//console.log(arr.has(5));





/*

var counts = {};
for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}

console.log(counts[5], counts[2], counts[9], counts[4]);
*/