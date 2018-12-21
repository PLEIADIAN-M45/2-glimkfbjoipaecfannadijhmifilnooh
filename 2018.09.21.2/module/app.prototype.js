define([], function() {


    if (!HTMLElement.hasOwnProperty("sname")) {}
    if (!HTMLElement.hasOwnProperty("model")) {}

    Object.defineProperty(HTMLElement.prototype, "sname", {
        get: function() {
            if (this.name) { return this.name.split("$").pop(); } else if (this.id) { return this.id.replace('ctl00_ContentPlaceHolder1_', ''); }
        }
    });

    Object.defineProperty(HTMLElement.prototype, "model", {
        get: function() {
            switch (this.localName) {
                case 'input':
                    return trim(this.value);
                case 'select':
                    if (this.selectedOptions[0]) {
                        return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
                    } else {
                        return { value: trim(this.value) }
                    }
                case 'button':
                    return trim(this.title);
                case 'span':
                    return trim(this.outerText);
            }
        }
    });

    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };
    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if (name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    }


})