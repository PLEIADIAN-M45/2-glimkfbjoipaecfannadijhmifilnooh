InspectedWindowLoadMonitor

injectInjector

editPayload

injectFunction

intercept 攔截，截住

wakeApplication

var config = {
  blockReroute: {},
  requestHeaders: {},
  responseHeaders: {},
  interceptPost: {},
  monitorPostMessage: {},
  monitorXSS: {},
  monitorMixedContent: {}};
// Keeps track of which options are enabled for a given functionality
// Structure is subconf.type.option.tabId = true|false
var subconf = {};


 if (info.requestBody && info.requestBody.raw) {
      info.requestBody.raw = info.requestBody.raw.map(function(part) {
        if (part.bytes) {
          part.bytes = [].slice.call(
              new Uint8Array(part.bytes.slice(0, 500e3)));
        }
        return part;
      });
    }
