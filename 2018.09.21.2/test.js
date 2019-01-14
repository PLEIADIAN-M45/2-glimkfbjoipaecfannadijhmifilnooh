//var file = document.getElementById('avatar').files[0];
//console.log(file);


console.log(fs);

/*
var dataUrl = 'data:' + contentType + ';base64,' + b64Data;

window.location = dataUrl;
*/



//data:application/octet-stream;base64
//data:video/webm;base64,

var reader = new FileReader();
reader.onloadend = function(e) {

    console.log(this)
    //console.log(this.result)

    var dataUrl = this.result.replace('data:application/octet-stream;base64,', '');
    //console.log(dataUrl);



    //var blob = new Blob([dataUrl], { type: "application/octet-stream" });
    var blob = new Blob([dataUrl], { type: "video/webm" });
    //console.log(blob);
    var blobUrl = URL.createObjectURL(blob);


    $("#video2").attr("src", blobUrl)


    //reader.readAsDataURL(blob)

    //console.log(blobUrl);

    //chrome.tabs.create({ url: this.result })
    //localStorage[fileName] = this.result;

};
document.querySelector('#avatar').onchange = function(e) {

    var files = this.files;

    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function(fs) {
        // Duplicate each file the user selected to the app's fs.


        for(var i = 0, file; file = files[i]; ++i) {

            console.log(file);

            //reader.readAsText(file);
            //reader.readAsArrayBuffer(file)
            //reader.readAsBinaryString(file)
            reader.readAsDataURL(file)

            // Capture current iteration's file in local scope for the getFile() callback.
            /*(function(f) {
                console.log(file);
                fs.root.getFile(file.name, { create: true, exclusive: true }, function(fileEntry) {
                    console.log(fileEntry);
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.write(f); // Note: write() can take a File or Blob object.
                    }, errorHandler);
                }, errorHandler);
            })(file);*/

        }



    }, errorHandler);

};

var errorHandler = function() {

}