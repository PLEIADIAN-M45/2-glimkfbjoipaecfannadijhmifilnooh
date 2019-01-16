var apis = Object.create({});

apis.localStorage = window.localStorage;
apis.sessionStorage = window.sessionStorage;

apis.getUser = async function(params) {
    console.log("::getUser", params);
    return dexie.user.get(params)
};

apis.putUser = function(params) {
    console.log("::putUser", params);;
    return dexie.user.put(params);
};

apis.delUser = function(params) {
    console.log(":::delUser", params);
    return dexie.user.delete(params.unique);
};


apis.setPermit = function(params, sender) {
    console.log(params);
    apis.ports[params.frameId].postMessage({ setPermit: true })
    return Promise.resolve(params.frameId)
};


apis.sender = function(params, sender) {
    //console.log(sender);
    return Promise.resolve(sender)
};

apis.getGlobal = function(params, sender) {
    console.warn("......getGlobal");
    return Promise.resolve(apis.global)
};