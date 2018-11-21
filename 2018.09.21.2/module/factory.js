define([], function() {

    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if (name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    }


    function _sname(elem) {
        if (elem.name) { return elem.name.split("$").pop(); }
        if (elem.id) { return elem.id.split("_").pop(); }
    }

    function _model(elem) {
        switch (elem.localName) {
            case 'input':
                return elem.value;
            case 'select':
                return {
                    value: elem.value,
                    text: elem.selectedOptions[0].label
                }
                //return elem.selectedOptions[0].label;
            case 'button':
                return elem.title;
            case 'span':
                return elem.outerText;
        }
    }




    var factory = {};

    [
        function injectStylesheet() {
            if (!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return require.toUrl('./module/css/@.css').replace('@', str); }).map((src) => {
                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        },
        function injectComponents() {
            if (!this.components) { return false };
            this.components.map((str) => { return require.toUrl('./module/html/@.html').replace('@', str); }).map((src) => {
                fetch(src).then(responseType.text).then((html) => {
                    var template = angular.element(html);
                    this.$projElement.append(template);
                    this.$compile(template)(this.$scope);
                    this.$scope.$apply();
                });
            });
        },
        function toText(res) { return res.text() },
        function assign() { Object.assign(this, ...arguments) },
        function parseToModel(arr) { return arr.map((elem) => { return [elem.sname, elem.model]; }).serialize(); },
        function parseToCtrl(arr) { return arr.map((elem) => { return [elem.sname, elem]; }).serialize(); },
        function trim(value) { return value.toString().trim() }
    ].forEach((x) => { factory[x.name] = x; });





    var elems = ["span", "input", "select", "button"].map((el) => {
        return Array.from(document.querySelectorAll(el))
    }).flat().filter((elem) => { return elem.name || elem.id }).filter((elem) => {
        elem.sname = _sname(elem);
        elem.model = _model(elem);
        return !elem.id.startsWith('_');
    });

    factory.ctrl = factory.parseToCtrl(elems);
    factory.model = factory.parseToModel(elems);


    window.localStorage.__proto__.assign = factory.assign;

    //console.log(localStorage.__proto__);



    return factory;
})


/*
function elems() {
    return ["span", "input", "select", "button"].map((el) => {
        return Array.from(document.querySelectorAll(el))
    }).flat().filter((elem) => { return elem.name || elem.id }).filter((elem) => { return !elem.id.startsWith('_') })
},
*/
//HTMLInputElement.prototype.val = function() { return this.value }
//HTMLInputElement.prototype.abbr = function() { return this.value }
//[HTMLInputElement, HTMLSpanElement, HTMLButtonElement, HTMLSelectElement].forEach(function(el, index) { el.prototype.abbr = });
//var model = parseToModel(elements)
//console.log(model);
//console.log(this.$scope);
/*$scope.ctrl = elements.toCtrls();
$scope.elems = elements.toCtrls();
$scope.model = elements.toModel();*/

function xxx() {

    Array.prototype.toModel = function() {
        var obj = {};
        this.forEach((elem) => {
            if (elem.name || elem.id) {
                var name = elem.name || elem.id;
                switch (elem.localName) {
                    case "select":
                        /*obj[pop(name)] = Array.from(elem.children).map((x) => {return [x.value, x.label];}).toObj();*/
                        obj[pop(name)] = {};
                        obj[pop(name)].value = elem.value;
                        obj[pop(name)].text = elem.selectedOptions[0].label.trim();
                        break;
                    case "input":
                        obj[pop(name)] = elem.value;
                        break;
                    case "span":
                        obj[pop(name)] = elem.outerText.trim();
                        break;
                }
            }
        });
        return obj;
    }

    Array.prototype.toCtrls = function() {
        var obj = {};
        this.forEach((elem) => {
            if (elem.name || elem.id) {
                var name = elem.name || elem.id;
                obj[pop(name)] = elem;
            }
        })
        return obj;
    }
}