define([], function() {

    console.log(1);
    
    if (!HTMLElement.hasOwnProperty("sname")) {}
    if (!HTMLElement.hasOwnProperty("model")) {}


    HTMLElement.prototype.show = function() {
        //console.log(this);
        this.style.display = "initial";
    }

    HTMLElement.prototype.hide = function() {
        // console.log(this);
        this.style.display = "none";
    }


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

    Array.prototype.slash = function() { return this.join(String.fromCharCode(47)) }
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




function $serialize({ href, url, postData }) {
    var obj = {};
    if (href) { if (href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (url) { if (url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}

function json(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }

function $tryJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

function $isJson(d) { try { JSON.parse(d); } catch (ex) { return false; } return true; }

function $hostname() { if (location.port) { return { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port]; } else { return location.hostname.split('.')[1]; } }

function $lastPath({ url }) { return url.split('?')[0].split('/').pop().replace(/\.\w+/, ''); }

function $mimeType({ responseText }) { return $isJson(responseText) ? "json" : "text"; }

function $dataRows({ respData }) { try { return respData.rows || respData.Data.Data; } catch (ex) {} };

function trim(value) { return value.toString().trim() };

function s(a) { console.log(a); }

document.oncopy = function(e) {
    var copyText = e.target.dataset.content;
    if (window.getSelection().type === "Caret") {
        e.preventDefault();
        if (e.clipboardData) { e.clipboardData.setData("text/plain", copyText); } else if (window.clipboardData) { window.clipboardData.setData("Text", copyText); }
    }
};


















/*
define([], function() {

});
*/



//console.log(HTMLElement.prototype.sname);
//console.log(HTMLElement.prototype.model);
//define(['angular', 'Dexie', 'moment', 'material', 'semantic', 'Robot'], function(angular, Dexie, moment, mdc, semantic, Robot) {



//console.log(11, 22);




/*
 Array.prototype.serialize = function() {
     var obj = {};
     this.forEach(([name, value]) => { if (name && value) { obj[name.trim()] = value.trim() } });
     return obj;
 }

*/

/*
 Array.prototype.serialize = function() {
     try {
         var obj = {};
         this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
         return obj;
     } catch (ex) {}
 };
*/