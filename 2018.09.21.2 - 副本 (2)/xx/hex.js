/*
https://zh.wikipedia.org/wiki/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6


*/

// 將「十進制數字」 轉為十六進制
var num = 255;
num.toString(16); 

//將「十六進制數字」 轉為十進制
var hexNum = "FF";
parseInt(hexNum, 16); // 將十六進制轉為10進制
/*
"ff"
0xff = 255

*/



/*將「文字」轉為16進制*/

"a".charCodeAt(0)
"a".charCodeAt(0).toString(16);


=> 97

/*將16進制轉回文字*/
String.fromCharCode(97)
String.fromCharCode(65, 66, 67);  // returns "ABC"
String.fromCharCode(0x2014)       // returns "—"
String.fromCharCode(0x12014)      // also returns "—"; the digit 1 is truncated and ignored



/*
https://www.w3resource.com/javascript-exercises/javascript-string-exercise-27.php

*/

//DEC	OCT	HEX	BIN	Symbol	HTML Number	HTML Name	Description

//64	100	40	01000000	@	&#64;	 	At symbol


"@".charCodeAt(0) 
//得到 64(十進位)

String.fromCharCode(64)



"@".charCodeAt(0).toString(16);
//得到 "40" (十六進位)