var STORAGESIZE = 5 * 1024 * 1024;
var STORAGEINFO = {
    PERSISTENT: window.navigator.webkitPersistentStorage,
    TEMPORARY: window.navigator.webkitTemporaryStorage
}
var fs = new function() {
    this.requestQuota = function() {}
    this.createFileSystem = function(_STORAGETYPE) {
        STORAGETYPE = window[_STORAGETYPE];
        STORAGE = STORAGEINFO[_STORAGETYPE];
        STORAGE.requestQuota(STORAGESIZE, fs.requestFileSystem, _ERRORHANDLER)
    }
    this.requestFileSystem = function(GRANTEDBYTES) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(STORAGETYPE, GRANTEDBYTES, CB.requestFileSystem, _ERRORHANDLER);
    }
    this.queryUsageAndQuota = function() {
        STORAGE.queryUsageAndQuota(CB.queryUsageAndQuota, _ERRORHANDLER)
    }
    this.createDirectory = function() {
        var dirName_ = moment().format('YYYYMMDD');
        fs.root.getDirectory(dirName_, { create: true }, function(dirEntry) {
            fs.readEntries(fs.root)
        }, errorHandler);
    }

    this.removeRecursively = function() {
        fs.root.removeRecursively(function() {
            fs.root.getParent(fs.readEntries)
        }, errorHandler);
    }

    this.getParent = function() {
        fs.root.getParent(fs.readEntries)
    }

    this.uploadfiles = function(files) {
        var length = files.length;
        for (var i = 0, file; file = files[i]; ++i) {
            (function(f) {
                fs.root.getFile(file.name, { create: true, exclusive: false }, function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function(e) { if (--length == 0) { fs.readEntries(fs.root) } }
                        fileWriter.write(f); // Note: write() can take a File or Blob object.
                    }, errorHandler);
                }, errorHandler);
            })(file);
        }
    }

    this.getFile = function(fileName) {
        fs.root.getFile(fileName, {}, function(fileEntry) {
            fileEntry.file(function(file) {
                console.log(file)
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    console.log(this.result)
                    chrome.tabs.create({ url: this.result })
                    localStorage[fileName] = this.result;

                };
                //reader.readAsArrayBuffer(file)
                //reader.readAsBinaryString(file)
                //reader.readAsDataURL(file)
                reader.readAsText(file);
            })
        })

    }

    this.createWriter = function(dataUrl) {
        var fileName = 'pic' + moment().format('HHmmss') + '.png';
        console.log(fileName)
        fs.root.getFile(fileName, { create: true, exclusive: true }, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                //dataUrl = dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
                //console.log(dataUrl)
                chrome.tabs.create({ url: dataUrl })
                var bb = new Blob([dataUrl], { type: "image/png" });
                console.log(bb)
                fileWriter.onwriteend = function(e) {
                    //console.log(e)
                    fs.getFile(fileName)

                }
                fileWriter.write(bb); // Note: write() can take a File or Blob object.
            }, errorHandler);
        }, errorHandler);
    }

    this.GETDIRECTORY = function(path, option) {
        FS.ROOT.getDirectory(path, { create: false }, function(dirEntry) {
            console.log(dirEntry)
        }, errorHandler);
    }
    this.file = function(fileEntry, scope) {
        fileEntry.file(function(d) {
            //console.log(d)
            scope.file = d
        })
    }

    this.readEntries = function(directoryEntry) {
        //console.log(directoryEntry)
        if (directoryEntry.isDirectory) {
            fs.root = directoryEntry;
            fs.queryUsageAndQuota();
            var reader = directoryEntry.createReader();
            reader.readEntries(function(entries) {
                //console.log(entries)
                fs.entries = entries;
            }, errorHandler);
        }
    }
}
var CB = new function() {
    this.createFileSystem = function() {}
    this.requestFileSystem = function(DOMFileSystem_) {
        DOMFileSystem = DOMFileSystem_;
        //console.log(DOMFileSystem)
        fs.readEntries(DOMFileSystem.root);
        //fs.createDirectory()
    }
    this.queryUsageAndQuota = function(USEDBYTES, GRANTEDBYTES) {
        fs.usage = {
            used: USEDBYTES,
            granted: GRANTEDBYTES,
            percentage: USEDBYTES / GRANTEDBYTES
        }
        //console.log(fs.usage)
    }
}
function _ERRORHANDLER(a) {
    console.log(a)
}

function errorHandler(a) {
    console.log(a)
}


window.fs = fs;
fs.createFileSystem('TEMPORARY')