function getMyLocalIP999(mCallback) {
    var all_ip = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
        window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
        iceServers: []
    });

    pc.createDataChannel('');

    pc.onicecandidate = function(e) {

        if (!e.candidate) {
            mCallback(all_ip);
            return;
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (all_ip.indexOf(ip) == -1)
            all_ip.push(ip);
    };
    pc.createOffer(function(sdp) {
        pc.setLocalDescription(sdp);
    }, function onerror() {});
}

/*
getMyLocalIP(function(ip_array) {
    document.body.textContent = 'My Local IP addresses:\n ' + ip_array.join('\n ');
});
*/

var getMyLocalIP = new Promise((resolve, reject) => {

    console.log(info)
    var all_ip = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
        window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
        iceServers: []
    });

    pc.createDataChannel('');

    pc.onicecandidate = function(e) {

        if (!e.candidate) {
            console.log(all_ip);
            resolve(all_ip);
            return;
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (all_ip.indexOf(ip) == -1)
            all_ip.push(ip);
    };
    pc.createOffer(function(sdp) {
        pc.setLocalDescription(sdp);
    }, function onerror() {});
});






/*

https://www.html5rocks.com/en/tutorials/webrtc/basics/

*/