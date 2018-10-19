const resolvedProm = Promise.resolve(33);

let thenProm = resolvedProm.then((value) => {
    console.log("this gets called after the end of the main stack. the value received and returned is: " + value);
    return value;
});
// instantly logging the value of thenProm
console.log(thenProm);

// using setTimeout we can postpone the execution of a function to the moment the stack is empty
setTimeout(() => {
    console.log(thenProm);
});


let promise = new Promise((resolve, reject) => {
    if ( /* asynchronous code execution is successful */ ) {
        resolve( /* result */ );
    } else {
        reject( /* error */ );
    }
});

promise.then((result) => {
        console.log(result);
    },
    (error) => {
        console.log(error);
    });
// you could handle the errors by passing it in .catch instead of .then as well
promise.catch((error) => { console.log(error); });


Promise.all( /* arrayOfPromises */ ).then((values) => {
    //values is array of resolved promise values from arrayOfPromises
}, (error) => {
    //if any of the promises in arrayOfPromises fails we reach here
});

const makeRequest = async() => {
    console.log(await getJSON())
    return "done"
}

makeRequest()

const makeRequest = () => {
    try {
        getJSON()
            .then(result => {
                // this parse may fail
                const data = JSON.parse(result)
                console.log(data)
            })
        // uncomment this block to handle asynchronous errors
        // .catch((err) => {
        //   console.log(err)
        // })
    } catch (err) {
        console.log(err)
    }
}

const makeRequest = async() => {
    try {
        // this parse may fail
        const data = JSON.parse(await getJSON())
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

const makeRequest = () => {
    return getJSON()
        .then(data => {
            if (data.needsAnotherRequest) {
                return makeAnotherRequest(data)
                    .then(moreData => {
                        console.log(moreData)
                        return moreData
                    })
            } else {
                console.log(data)
                return data
            }
        })
}

const makeRequest = () => {
    return callAPromise()
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => {
            throw new Error("oops");
        })
}

makeRequest()
    .catch(err => {
        console.log(err);
        // output
        // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
    })

const makeRequest = async() => {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    throw new Error("oops");
}

makeRequest()
    .catch(err => {
        console.log(err);
        // output
        // Error: oops at makeRequest (index.js:7:9)
    })
const ajaxRequest = (param, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => { // a listener which executes when the xhr request succeeds
        callback(JSON.parse(xhr.responseText));
    });
    xhr.addEventListener('error', () => { // a listener which executes when the xhr request fails
        callback({ error: xhr.statusText });
    })
    xhr.open('GET', `https://httpbin.org/get?param=${param}`);
    xhr.send();
}

let superPromises = []; // an array to hold promises of ajax request for all superHeroes.
superHeroes.forEach((superHero) => {
    superPromises.push(new Promise((resolve, reject) => {
        ajaxRequest(superHero, (response) => {
            if (!response.error) { // if response is not error
                console.log(response.args);
                resolve();
            } else {
                reject();
            }
        });
    }));
});


Promise.all(superPromises).then(() => { // execute when all promises are fulfilled
    completedFetchingData();
}, () => {
    failedFetchingData();
});

const someAsyncFn = async(param) => {
    const result = await someOtherAsyncFn(param);
    return result;
}

const ajaxRequestWithPromise = (param) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => { // a listener which executes when the xhr request succeeds
            resolve(JSON.parse(xhr.responseText));
        });
        xhr.addEventListener('error', () => { // a listener which executes when the xhr request fails
            reject(new Error(xhr.statusText));
        })
        xhr.open('GET', `https://httpbin.org/get?param=${param}`);
        xhr.send();
    });
}

const request = async() => { // async function always returns a promise
    for (let i = 0; i < superHeroes.length; i++) {
        const response = await ajaxRequestWithPromise(superHeroes[i]); // await can be only used inside async functions
        console.log(response.args);
    }
    completedFetchingData();
}

request().catch((error) => { failedFetchingData(); }); // catch rejected promise