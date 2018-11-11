var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" };

var apiFunctions = {};

apiFunctions.banker = function() { return Promise.resolve(this.region); }
apiFunctions.author = function() { var region = {}; return Promise.resolve({ region }); }