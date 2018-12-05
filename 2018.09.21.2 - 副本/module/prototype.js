 Object.defineProperty(HTMLElement.prototype, "sname", {
     get: function() {
         if(this.name) { return this.name.split("$").pop(); } else if(this.id) { return this.id.replace('ctl00_ContentPlaceHolder1_', ''); }
     }
 })

 Object.defineProperty(HTMLElement.prototype, "model", {
     get: function() {
         switch (this.localName) {
             case 'input':
                 return trim(this.value);
             case 'select':
                 return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
             case 'button':
                 return trim(this.title);
             case 'span':
                 return trim(this.outerText);
         }
     }
 })

 Array.prototype.serialize = function() {
     try {
         var obj = {};
         this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
         return obj;
     } catch (ex) {}
 };

 Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
 Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };

 function trim(value) { return value.toString().trim() };

 function s(a) { console.log(a); }