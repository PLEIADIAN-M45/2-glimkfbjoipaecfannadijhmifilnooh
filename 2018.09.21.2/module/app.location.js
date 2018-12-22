define([], function() {
    return {
        origin: location.origin,
        searchParams: new URLSearchParams(location.search),
        pathname: location.pathname,
        port: location.port,
        path: location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(),
        host: (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1],
    }
})







/*
define({
    port: location.port
})
*/