window.extend = function() { return Object.assign(this, ...arguments); }

document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});