/*
https://dmitripavlutin.com/catch-the-xmlhttp-request-in-plain-javascript/
*/

var open = window.XMLHttpRequest.prototype.open,  
  send = window.XMLHttpRequest.prototype.send;

function openReplacement(method, url, async, user, password) {  
  this._url = url;
  return open.apply(this, arguments);
}

function sendReplacement(data) {  
  if(this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
  /**
   * PLACE HERE YOUR CODE WHEN REQUEST IS SENT  
   */
  this.onreadystatechange = onReadyStateChangeReplacement;
  return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {  
  /**
   * PLACE HERE YOUR CODE FOR READYSTATECHANGE
   */
  if(this._onreadystatechange) {
    return this._onreadystatechange.apply(this, arguments);
  }
}

window.XMLHttpRequest.prototype.open = openReplacement;  
window.XMLHttpRequest.prototype.send = sendReplacement;