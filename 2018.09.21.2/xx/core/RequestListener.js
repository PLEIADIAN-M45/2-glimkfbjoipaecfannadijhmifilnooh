var XMLHttpRequest = window.XMLHttpRequest;

function RequestListener(objParameters) {
    var self = this,
        realRequest = this.realRequest = new XMLHttpRequest(objParameters);

    realRequest.onload = function() {
        if(self.onload) {
            self.onload.apply(realRequest, arguments);
        }

        return self;
    };

    realRequest.onerror = function() {
        if(self.onerror !== null) {
            self.onerror.apply(realRequest, arguments);
        }

        return self;
    };
}

RequestListener.prototype = {
    get status() {
        return this.realRequest.status;
    },
    get statusText() {
        return this.realRequest.statusText;
    },
    get response() {
        return this.realRequest.response;
    },
    get responseText() {
        return this.realRequest.responseText;
    },
    get responseType() {
        return this.realRequest.responseType;
    },
    get responseXML() {
        return this.realRequest.responseXML;
    },
    send: function() {
        this.realRequest.send();

        return this;
    },
    open: function(method, url, async, user, password) {
        this.realRequest.open(method, url, async, user, password);

        return this;
    },
    setRequestHeader: function(name, value) {
        this.realRequest.setRequestHeader(name, value);

        return this;
    },
    getAllResponseHeaders: function() {
        return this.realRequest.getAllResponseHeaders();
    },
    abort: function() {
        this.realRequest.abort();

        return this;
    }
};

window.XMLHttpRequest = RequestListener;