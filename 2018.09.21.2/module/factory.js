define([], function() {
    function injectStylesheet() {
        if (!this.stylesheet) { return false };
        this.stylesheet.map((str) => { return require.toUrl('./module/css/@.css').replace('@', str); }).map((src) => {
            $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
        });
    }

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
    }

    function toText(res) { return res.text() }

})