async function waitAndMaybeReject() {
    // 等待1秒
    await new Promise(r => setTimeout(r, 1000));

    const isHeads = Boolean(Math.round(Math.random()));

    if(isHeads) {
        return 'yay';
    } else {
        throw Error('Boo!');
    }
}

async function foo() {
    try {
        // 等待 waitAndMaybeReject() 函数的结果
        // 把 fulfilled value 赋值给 fulfilledValue:
        const fulfilledValue = await waitAndMaybeReject();
        // 如果 waitAndMaybeReject() 失败，抛出异常:
        return fulfilledValue;
    } catch (e) {
        return 'caught';
    }
}

var c = foo()
console.log(c);



//console.log(Promise);
var sendMessage = async function(x) {
    //console.log(x);
    return await new Promise(function(resolve, reject) {
        //console.log(sendMessage2);
        resolve(33)
    })
}


var sendMessage2 = async function(x) {

    return await sendMessage(x)
}




//Promise.resolve(4).then((x) => { return x })