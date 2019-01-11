var db = new Dexie("MyAppDB");

db.version(1).stores({
    folders: "++id,&path",
    files: "++id,filename,extension,folderId"
});


// Folder class
function Folder(path, description) {
    console.log(path, description);
    this.path = path;
    this.description = description;
}

Folder.prototype.save = function() {
    console.log(this);
    return db.folders.put(this);
}

/// File class
function File(filename, extention, parentFolderId) {
    this.filename = filename;
    this.extention = extention;
    this.folderId = parentFolderId;
}

File.prototype.save = function() {
    return db.files.put(this);
}

db.folders.mapToClass(Folder);
db.files.mapToClass(File);



function User(unique, path, description) {
    //console.log(path, description);
    this.unique = unique;
    this.path = path;
    this.description = description;
}

User.prototype.save = function() {
    console.log(this);
    return store.user.put(this);
}


store.user.mapToClass(User);

var user = new User("F61539-26", "host26", "background")
user.save();

console.log(user);

/*
var f = new Folder("D:/host26", "ewfefwefewfwefe")
f.save()
console.log(f);
console.log(db);
*/