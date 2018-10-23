define([evo.router], function(module) {
    evo.assign(localStorage, module);
    chrome.runtime.connect(evo.extensionId, { name: module.channel })
});