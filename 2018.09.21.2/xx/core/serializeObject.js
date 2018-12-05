define(['jquery'], function($) {
    
    jQuery.fn.extend({
        
        sObject() { //element to object
            var obj = {};
            $(this).map(function() {
                var name = this.name.split('$').pop().replace(/\d+_?/g, '');
                switch (this.localName) {
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
        },

        serializeObject2: function() {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }
    });




    /*
    function runMAP([prop, value]) {
        var prop = prop.split('$').pop();
        if (ctrlMAP.hasOwnProperty(prop)) { eval(ctrlMAP[prop] + "='" + value + "'") }
    }

    function forEach(entries) { entries.forEach(runMAP) }

    function assign(args) { return Object.assign({}, ...args); }

    function extend(obj) {
        var { account, channel, host, origin, operator } = evo;
        return Object.assign(user, { account, channel, host, origin, operator })
    }*/



    //$(ctl00_ContentPlaceHolder1_rb_sfjsxx_no).check()





    //console.log($('input').serializeArray());





    //setUser()
    //console.log($('form').serializeArray());
    //console.log($('select').serializeObject());



    /*;
    (function($) {
        $.fn.serializeObject = function() {
            "use strict";

            var result = {};
            var extend = function(i, element) {
                var node = result[element.name];

                // If node with same name exists already, need to convert it to an array as it
                // is a multi-value field (i.e., checkboxes)

                if ('undefined' !== typeof node && node !== null) {
                    if ($.isArray(node)) {
                        node.push(element.value);
                    } else {
                        result[element.name] = [node, element.value];
                    }
                } else {
                    result[element.name] = element.value;
                }
            };

            $.each(this.serializeArray(), extend);
            return result;
        };
    })(jQuery);*/


})