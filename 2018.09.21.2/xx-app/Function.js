//https://javascript.info/new-function



function myalert(a, b) {
    console.log(1234);
    alert(a)
}


let sum = new Function('a', 'b', 'myalert');

sum()



//new Function ([arg1[, arg2[, ...argN]],] functionBody)

/*
let sum = new Function('a', 'b', 'return a + b');

alert(sum(1, 2)); // 3

let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
*/