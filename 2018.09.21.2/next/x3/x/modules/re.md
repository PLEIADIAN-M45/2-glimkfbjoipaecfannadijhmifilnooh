AMD
AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范
由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出。

requireJS定义了一个函数 define，它是全局变量，用来定义模块

define(id?, dependencies?, factory);

id：可选参数，用来定义模块的标识，如果没有提供该参数，脚本文件名（去掉拓展名）
dependencies：是一个当前模块依赖的模块名称数组
factory：工厂方法，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值
在页面上使用require函数加载模块

require([dependencies], function(){});

require()函数接受两个参数

第一个参数是一个数组，表示所依赖的模块
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

作者：yang走向前端
链接：https://www.jianshu.com/p/7fcaa4a75ac1
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。


CMD
CMD 即Common Module Definition通用模块定义，CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同

作者：yang走向前端
链接：https://www.jianshu.com/p/7fcaa4a75ac1
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

define(id?, deps?, factory)

因为CMD推崇
一个文件一个模块，所以经常就用文件名作为模块id
CMD推崇依赖就近，所以一般不在define的参数中写依赖，在factory中写

factory有三个参数:
function(require, exports, module)

作者：yang走向前端
链接：https://www.jianshu.com/p/7fcaa4a75ac1
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。