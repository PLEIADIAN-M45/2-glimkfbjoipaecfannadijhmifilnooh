var CHK = {
    author: function(value) {
        console.log(value);
        console.log(localStorage.author);
        console.log(decoder(localStorage.author));

        var cc = decoder(localStorage.author).find(([name]) => {
            return name == value
        })
        console.log(cc);

    }
}

apiFunctions.author = function() {
    //console.log(this);

    //console.log(search);

    console.log(var1, var2);

    CHK.author(this.value)


    //return search.author.compare2(this.author.value)

    //console.log(search);

    //var region = {};
    //return Promise.resolve(region);
}

//apiFunctions.author.