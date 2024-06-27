# 浏览器相关知识&javascript基础

[toc]

```js
//用于声明文档类型，即标准模式；如果没有这段代码，就会变成混杂/怪异模式
<!DOCTYPE html>
```

## 浏览器组成

1. shell

2. ##### 内核

    - js引擎
    - 渲染引擎（语法规则和渲染）
    - 其他模块

##### 主流浏览器及其内核

    IE      使用trident内核
    
    Chrome  之前使用webkit内核
            现在使用blink内核
    
    Firefox 使用Gecko内核
    
    Opera   使用presto内核
    
    Safari  使用webkit内核

## javascript组成

1. ECMAScript
2. DOM
3. BOM

##### js特性

1. 解释性语言（翻译一行执行一行，执行速度稍微慢但可跨平台）（扩展—c和c++是编译性语言，执行速度稍快，不可跨平台）
2. 单线程

##### js执行队列

- 轮转时间片
    将多个任务拆分为足够小的时间片进行执行，而不是执行完一个任务后再执行下一任务，所以可以在页面类似于同时显示不同任务的效果，实际上js仍是单线程

##### js异步加载

***由于正常的页面是由上至下执行的，当遇到js时就会等到js加载执行完毕后再继续向下执行，会卡顿，并且当js加载错误时整个页面都会出错，所以为了能提前把需要的js加载就要用到异步加载了***

1. defer
    - dom解析完毕后执行，IE9以下独有，可以在标签内直接写js
2. async
    - js加载完后立即执行，只能加载外部脚本
3. 创建script标签实现异步加载—按需加载
    - 结合demo的392行代码查看

##### js数据类型

1. ###### 原始值（栈数据stack）
    - Number
    - String

    ```js
    //都可以查询对应位置的字符;
    str.charAt(i) & str[i];
    //查询对应字符的字节长度
    str.charCodeAt(i);
    ```

    - Boolean
    - undefined
    - null

2. ###### 引用值（堆数据heap）
    - Array
    - Object
    - function
    - Date
    - RegExp

***

##### this指向

1. 函数预编译过程，`this —> windows`
2. 全局作用域里，`this —> windows`
3. `call/apply`可以改变函数运行时`this`指向
4. `obj.function()`，`function()`里的`this`指向`obj`

##### 预编译

`在函数执行前一刻完成`
`函数声明整体提升,变量和声明提升,赋值不提升`
`未声明的变量会直接成为全局变量挂载在window对象上，亦相当于Go对象`

##### JS文件执行过程

1. 创建GO对象（**全局对象[global Object]**）
2. 声明变量并赋值为undefined
3. 声明函数并赋值为函数体
4. 逐条执行代码
5. 碰到函数调用，开始执行以下步骤
6. 创建AO对象（**AO对象[Activation Object]**）
7. 声明行参和声明变量，并赋值为undefined
8. 行参赋值为实参
9. 声明函数，并赋值为函数体（没有等号的）
10. 逐条执行代码

##### 作用域链

1. 每个函数在声明即被定义时都会生成一条隐式作用域链`.[[scope]]`
2. 作用域链中链接着上下文环境的作用域即全局定义的函数`test()`在定义时`.[[scope]]`中会存储着`全局作用域GO`
3. `test()`函数在被执行时会在原有作用域链的最开始`[0]`上链接一个test当前执行生成的作用域，在`test()`函数执行完后会切断与自身生成的执行时作用域的链接，即销毁；若后续再次执行时又会重新生成新的自身作用域链接至`.[[scope]]`上;
   *一个函数的作用域链会有三个`状态`：*
    - **定义阶段(defined)**：直接使用上级的作用域链；
    - **执行阶段(doing)**：在定义状态上生成一个新的自身作用域链接至此作用域链上，且放至最开始位置；
    - **销毁阶段**：断开执行阶段生成的作用域的链接；

`一个函数里的子函数所使用的父作用域其实就是父函数的作用域，并不是重新复制父函数的作用域，而是使用链接的方式将父函数的作用域链接至自身上`

##### 闭包

`定义：有权访问另一个函数作用域中变量的函数`
`产生：当内部函数被保存至外部时，将会生成闭包。`
`危害：闭包会导致原有作用域链不被释放，造成内存泄漏`

1. `原有作用域链不被释放`：假设有`a()`和`b()`两个函数，`b()`函数是`a()`函数的子函数，当在`a()`函数中`return b`时，再在`a`外部全局调用`b()`时，因为在`a()`函数中未实现对`b()`的调用，但是在调用`a()`时已经定义了`b()`的作用域链，即定义`b()`的作用域链时就链接着`a()`的作用域，当`a()`执行销毁阶段时断开了自身创建的作用域，但是在`b()`函数上却会一直链接着`a()`执行时生成的作用域

```js
function a(){
    var aa = "a";
    var b = function (){
        var aa = "b";
        console.log("我是b函数");
    }
    return b;
}

a();
```

2. `内存泄漏`：可以理解为因为原有作用域链不被释放导致内存被占用，可用内存会变小，即相当于内存被泄漏了

###### 闭包的作用

1. 实现公有变量
    - 函数累加器，不依赖外部变量且能反复执行
2. 可以做缓存(存储结构)
3. 实现封装，属性私有化
4. 模块化开发，防止污染全局变量

###### 闭包解决方法

`有且仅有一种方式，在返回的函数上套上一个立即执行函数`

##### 立即执行函数

`此类函数没有声明，在一次执行过后即释放(无法再次调用)。适合做初始化工作`

```js
//只有函数表达式才能实现立即执行函数(可以在括号内加上实参)
(function () {}());
(function () {})();
//不会立即执行,这是在函数表达式后加上的括号
function () {}();
```

```js
//拓展:什么是表达式
//表达式定义:有加减乘除括号的就是表达式
var test=function () {};

(function () {});

+ function () {};
```

```js
//拓展:什么是函数声明
function () {};
```

***

##### 对象

###### 对象属性增删改查

```js
var obj = {
    one : 1,
    two : 2,
    three : 3
} 
//增
obj.new = "值";
//删
delete obj.one;
//改
obj.two = "新值";
//查
obj.three;
```

###### 对象创建方法

1. `var obj = {}`
   `对象字面量/对象直接量方法(plainObject)`
2. `构造函数`方式创建
    - 系统自带的构造函数:
    `new Object();`
    - 自定义构造函数:

```js
    //创建一个构造函数Person(){}
    function Person(){
        this.name = "构造函数",
        this.age = 18,
        this.handle = function(){
            console.log("这是一个方法")
        }
    }
    //创建对象，继承构造函数Person()
    var person = new Person();
```

```js
//构造函数的本质:
//调用 new Person()时，构造函数内部会自行创建一个this对象;
//再自行return这个this，创建构造函数时添加的属性值对就会放进this这个对象里
1.在函数体最前面隐式的加上this.{}
2.执行this.xxx = xxx;
3.隐式的返回this
```

##### 原型

`原型是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先通过该构造函数产生的对象，可以继承该原型的属性和方法，原型也是对象`
`Object.prototype`      —原型链的终端
`obj.constructor`         —指向构造出obj的构造函数
`Object.create(对象)`  —指定一个对象成为该函数的原型

```js
//取代原有原型Object.prototype
//当使用Object.create(null)构造一个对象时，该对象是没有原型的
Object.create(null);
//即除了Object.create(null)构造出的对象都是有原型的
Object.create(Array);
```

`构造函数创建出来的对象是通过系统隐式创建出来的__proto__链接至原型链的终端Object.prototype的`

##### call() & apply() & bind()

`改变函数的this指向`

```js
.call(对象,参数，参数, …) 
.apply(对象,[参数，参数, …])
//传参方式不同，apply传参是数组形式
.bind()
//var fun = handle.bind(xin);
//bind()方法有返回值，所以需要用新函数接收
//这个返回值也只是将this指向改变了的函数
//bind()方法不执行函数，只会将this永久指向新的对象xin

var obj = {
    name : "obj",
    age : 1,
    handle:function(){
        console.log("姓名:" + this.name + "|年龄:" + this.age)
    }
}
var xin = {
    name : "new",
    age : 2
}
//返回 姓名:new|年龄:2
obj.handle.call(xin);
obj.handle.apply(xin);
```

##### 对象的枚举

`for in循环`
`结合demo.html的94行代码查看`
`对象只能用for in循环进行遍历`

```js
var obj = {
        name : "he",
        sex : "male",
        __proto__ : {
            a : "自己修改隐式proto"
        }
    }
    //遍历对象时只能用for in循环来遍历
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
        //其实一直以来调用对象的属性使用obj.name时系统都会隐式调用obj['name']来执行
        //为什么这里不用obj['prop']字符串的形式写，因为prop是一个变量
        //prop就是表示每次遍历时obj时对每个obj中的属性定义的一个变量，prop名字是自己取的
        //会返回属性值对的值
        console.log(obj[prop])      
        }
    }
```

```js
//hasOwnProperty()用来判断这个属性是否属于自己的属性，返回布尔值
obj.hasOwnProperty("某个属性");
//in用来判断这个属性是否存在与自身或原型链上，返回布尔值
//属性记得加引号
'name' in obj;
//instanceof判断对象A的原型链上有没有对象B的原型，返回布尔值
//官方文档：A对象是不是由B构造函数构造出来的
console.log(A instanceof B);
```

```js
//拓展：识别一个变量a是数组还是对象
1.a.constructor;
2.a instanceof Object;  &  a instanceof Array;
3.Object.prototype.toString.call(a);
```

##### 类数组

`具有数组和对象的属性，本质上是一个对象`
`例:方法里面的传参就是类数组，如果打印typeof(arguments)返回的就是对象`
***类数组构成方法***：

1. 属性要为索引（数字）属性
2. 必须要有length属性
3. 最好加上数组的push方法
结合demo的245行查看

```js
var obj = {
        "0" : "a",
        "1" : "b",
        "2" : "c",
        length : 2,//决定push的位置
        name : "he",
        sex : "male",
        push : Array.prototype.push,
        //加上splice方法后这个对象就长得跟数组一样了
        splice : Array.prototype.splice
    }
       obj.push("ddd");
       obj.push("eee");
       console.log(obj);
       //push方法就是根据188行代码实现的，调用push方法会根据length值添加对应位；
       //既有对象的特性，也有数组的，可以实现更强大的存储功能
```

***

## DOM

`Document Object Module`

1. 操作html的元素
`获取元素,这些方法除了getElementById返回的都是类数组`

```js
document.getElementsByTagName('')[];
document.getElementById('');
document.getElementsByClassName('')[];
document.getElementsByName('')[];
```

2. 操作css
`获取css，括号内写css选择器，但这两个方法不用，因为这两个方法不是实时的，如果先用此方法选择了元素，后续再通过document.create()创建后的元素是不会被document.querySelector选中的；`

```js
document.querySelector('');
document.querySelectorAll('');
```

##### 遍历节点树

`会返回所有节点（文本、注释、元素）`

`.parentNode;`获取父节点
`.childNodes;`获取所有子节点
`.firstChild;`第一个子节点
`.lastChild;`最后一个子节点
`.nextSibling;`后一个兄弟节点
`.previousSibling;`前一个兄弟节点

##### 遍历元素节点树

`只返回元素节点`
`.parentElement;`获取父节点
`.children;`获取所有子节点
`.firstElementChild;`第一个子节点
`.lastElementChild;`最后一个子节点
`.nextElementSibling;`后一个兄弟节点
`.previousElementSibling;`前一个兄弟节点

##### 节点操作

```js
//1. 创建节点
document.createElement(‘标签名’);//创建一个元素节点
document.createTextNode(‘文本’);//创建一个文本节点
document.createComment(‘注释’);//创建一个注释节点
document.createDocumentFragment();//创建一个文档碎片

//2. 插入节点
//将创建的元素放入body中，也可以放到其他节点中
document.body.appendChild(变量名);
.insertBefore(a,b);//插入a中在b之前

//3. 删除节点
a.removeChild(b);//将a节点中的b节点剪切
a.remove();//将a节点删除
//4. 更换节点
a.replaceChild(b,c);//将a节点中的c节点替换位b节点
```

##### 节点类型

`1元素、2属性、3文本、8注释、9document、11DocumentFragment(文档碎片)`
1. 节点的属性

```js
.nodeName;//节点的标签名（只读）
.nodeValue;//文本和注释节点的内容
.nodeType;//返回对应节点类型的数字表示
.attributes;//该节点的属性集合

//Element(元素)节点的属性
.innerHTML=‘’;//更改元素内的内容
.innerText=‘’;//更改元素内的文本
```

2. 节点的方法

```js
.hasChildNodes();//判断该节点内是否有节点

//Element(元素)节点的方法
.setAttribute( ‘属性名’,’属性值’);//设置元素的属性和值
.getAttribute(‘属性名’);//获取元素的某个属性的属性值
```

##### 读写元素的css属性

`.style`
元素.style.属性名 = "";
通过更改元素的style属性的值来改变样式；有-变成小驼峰

`window.getComputedStyle(ele,null);`
查询元素的样式，只读；IE8及以下不兼容，第二个参数是伪元素

`.currenStyle;`
div.currenStyle.元素;
查询只读，IE独有

##### Date()

`日期对象`

```js
var myDate = new Date();
Date();//日期对象,返回当前日期时间时区
myDate.getDate();//返回一个月的某一天（1～31）
myDate.getDay();//返回一星期的某一天（0～6）
myDate.getFullYear();//返回年份
myDate.getMouth();//返回月份（0～11）
myDate.getHours();//返回小时（0～23）
myDate.getMinutes();//返回分钟（0～59）
myDate.getSeconds();//返回秒钟（0～59）
myDate.getMilliseconds();//返回毫秒（0～999）
myDate.getTime();//返回1970.01.01至今的毫秒数
```

##### 定时器

```js
//每隔1000毫秒循环执行一次function；
//会返回一个唯一标识数字可接收后用于清除
setInterval(function,1000);
//清除定时器，括号内放定时器名字
clearInterval();

//过1000毫秒执行function后不再执行
setTimeout(function,1000);
//清除定时器
clearTimeout();
//放function的参数可以用此形式，setInterval(“console.log(‘a’)”,1000);
```

##### 事件

`交互核心`

###### 添加事件交互

1. 句柄方式
`一个元素只能给一个事件类型绑定一个处理函数`

```js
//点击事件
div.onclick = function() {};
```

2. 事件监听
`一个元素可以给一个事件类型绑定多个处理函数`

```js
//IE9以下不兼容
div.addEventListener(‘事件类型’, 处理函数, false);
//用于IE，IE独有
//处理函数指向是window，需要使用call()改变至调用元素，结合demo的327行查看
div.attachEvent(‘on’+’事件类型’，处理函数);
```

###### 解除事件绑定

```js
div.removeEventListener(‘事件类型’, 处理函数, false);
div.detachEvent(‘on’+’事件类型’，处理函数);  
//如果是直接绑定不用事件监听直接将div.事件类型= null;
//处理函数写要移除的函数名
//处理函数不能是匿名函数，否则无法解除
```

###### 事件类型

* 鼠标事件
`click`(点击)、
`mousedown`(左键按下)、
`mousemove`(鼠标移动)、
`mouseup`(左键抬起)、
`contextmenu`(右键事件，用于取消右键显示菜单功能)、
`mouseover`(旧：鼠标移入)、
`mouseout`(旧：鼠标移出)、
`mouseenter`(新：鼠标移入)、
`mouseleave`(新：鼠标移出)
>只能用mousedown和mouseup来区分左右键及滚轮（用返回鼠标事件里的button属性区分，0为左键、1为滚轮、2为右键）
* 键盘事件
`keydown`(键盘按下)、
`keypress`(键盘按下)、
`keyup`(键盘抬起)
>keydown和keypress的区别：down相应所有键，press只相应有ASCII码的键通过事件对象的charCode判断
* 文本操作事件
`input`(输入—变化了就触发)、
`change`(改变-聚焦和失焦有改变才触发)、
`focus`(聚焦)、
`blur`(失去焦点)
* 窗体操作类事件（window上的事件）
`scroll`(滚动条滚动)、
`load`(页面加载完毕)

###### 事件捕获&事件冒泡
*`先捕获后冒泡`
*`一个元素的一个事件类型只能执行一种事件模式，即捕获或冒泡，若同时绑定则会先捕获后冒泡`
*`通过更改addEventListener()方法的第三个参数为true开启事件捕获，IE中没有事件捕获`
*`事件冒泡会一直存在，其中focus，blur，change，submit，reset，select等事件类型没有冒泡`
*事件冒泡*：结构上存在嵌套，自`子元素向父元素冒泡`
*事件捕获*：结构上存在嵌套，自`父元素向被执行子元素捕获`停止

###### 取消事件冒泡

```js
//先给处理函数传一个e参数，然后在处理函数里直接调用即可
e.stopPropagation();//IE9以下不支持
e.cancelBubble = true;
```

###### 阻止默认事件
`表单提交、a标签跳转、右键菜单等`

```js
//先给处理函数传一个e参数，然后在处理函数里直接调用即可
return false;
//使用句柄方式(即不使用事件监听)绑定的事件可以直接在处理函数内使用
e.preventDefault();//IE9以下不支持
e.returnValue = false;
//拓展：在a标签中这样写也能直接取消其默认事件
`<a src = “javascript:void()”></a>`
```

###### 事件委托
`在父元素上绑定事件通过事件冒泡机制解决某些功能，例如点击不同的<li>出现的其内容;`
`原理：在ul上绑定事件，点击<li>通过事件冒泡触发父元素<ul>上的事件，并获取到事件源对象（即点击的<li>）`

```js
//做IE的兼容问题,IE的事件对象是window.event
 var 参数 = event || window.event;
//获取事件源对象的方法：
e.target;//兼容火狐
e.srcElement;//兼容IE
//结合demo的345行查看
var ul = document.getElementsByTagName("ul")[0];
    ul.onclick = function (e){
        //获取事件对象，window.event用于兼容IE
        var e = e || window.event;
        //获取事件源对象，兼容火狐和IE
        var target = e.target || e.srcElement;
        console.log(target.innerText);
        }
```

## BOM

1. 查看滚动条位置数值

```js
//IE8及以下不兼容
window.pageXOffset;
window.pageYOffset;
//兼容IE8及以下
//1方法有值那2方法就没有值
//使用方法：将两方法返回的值相加就是所求的值
1.
document.body.scrollLeft;
document.body.scrollTop;
2.
document.documentElement.scrollLeft:
document.documentElement.scrollTop;
```

2. 查看浏览器可视窗口大小

```js
//IE8及以下不兼容
window.innerWidth;
window.innerHeight;
//适用于怪异模式下的任意浏览器
document.body.clientHeight;
document.body.clientWidth;
//适用于标准模式的任意浏览器
document.documentElement.clientHeight;
document.documentElement.clientWidth;
```

3. 判断当前文档使用的模式

```js
//如果返回CSS1Compat则是正常模式，BackCompat则是怪异模式
document.compatMode;
```

4. 查看元素尺寸

```js
//基本不用
.getBoundingClientRect();
//可用以下替代
.offsetWidth;
.offsetHeight;

.offsetLeft;
.offsetTop;
```

5. 查看元素最近有定位的父级元素
`.offsetParent;`
6. 改变滚动条位置

```js
//两个方法没有任何区别，让滚动条至xy的坐标
window.scroll(x,y);
window.scrollTo(x,y);
//让滚动条在原位置上加上xy的值
window.scrollBy(x,y);
```
## ajax（Asynchronous JavaScript and XML）
  - 429行代码
  - 允许浏览器与服务器通信而无需刷新当前页面的技术
  - `XMLHttpRequest`：该对象是对Javascript的一个扩展，可以使网页与服务器进行通信，是创建Ajax应用的最佳选择，实际上`通常把ajax当成XMLHttpRequest对象的代名词`
  1. XMLHttpRequest对象的方法

    - open("method", "url")
    建立对服务器的调用
    - send(content)
    向服务器发送请求
    - setRequestHeader("header", "value")
    
    - abort()
    - getAllResponseHeaders()
    - getResponseHeader("header")

## Cookie
  - 478行代码
  1. 获取Cookie:`document.cookie;`
  2. 添加Cookie:`document.cookie = "键 = 值“`
    注：JavaScript中的Cookie一次只能插入一个键值对


## 函数防抖与函数节流
`用途基本一致，只是实现方式不同`
`不希望事件短时间内反复调用，例如百度输入框快速输入，不希望每一次输入一个字符就开始调用ajax请求；或者下拉滚动条持续调用函数显示回到顶部按钮，而是在一个时间段后调用`
### 函数防抖
`在固定时间内反复触发，只有最后一次才会执行`
`删除前一个`

```js
//拉动滚动条
//小于300毫秒内的拖动时间都会清除函数调用
function debounce(callback, delay){
    var fn = null;
    return function(){
        clearTimeout(fn);
        //清除定时器
        fn = setTimeout(callback, delay);
    }
}
window.onscroll = debounce(function(){
    console.log("调用了1次");
}, 300);
```

### 函数节流
`固定时间内只能执行一次`
`不执行下一个`
```js
//拉动滚动条
function throttle(callback, duration){
    var lastTime = new Date().getTime();
    return function(){
        var nowTime = new Date().getTime();
        if(nowTime - lastTime > 500){
            callback();
            lastTime = nowTime;
        }
    }
}
window.onscroll = throttle(function(){
    console.log("调用了1次");
},500);
```

## 柯里化
`一个数学概念，多参变单参`
```js
//一个普通函数求值
function fn(a,b,c){
    return a*b*c;
}
fn(1,2,3);
fn(1,3,4);
fn(1,5,8);
//柯里化
function fn(a){
    return function(b){
        return function(c){
            return a*b*c;
        }
    }
}
var ft = fn(1);
ft(2,3);
ft(3,4);
ft(5,8);
```

## 正则
`判断是否为汉字`
```js
//汉字为true，否为false
var pattern = new RegExp("[\u4E00-\u9FA5]+")
pattern.test(item.vital_signs_values)
```
`判断是否为纯数字`
```js
var pattern = new RegExp(/^\d+$/)
pattern.test(item.vital_signs_values)
```
## 回到顶部
```js
//是给滚动的父元素设置，也就是设置了overflow：auto的元素
document.getElementsByClassName('equi_container')[0].scrollTop = 0
```
## 一维转二维数组
`对象数组根据同一code进行转换`
```js
var arrayTwo = Object.values(arrayFirst.reduce((res, item) => {
  res[item.code] ? res[item.code].push(item) : res[item.code] = [item];
  return res;
}, {}));
console.log(arrayTwo)
```
## 二维转一维数组
```js
var array = Array.prototype.concat.apply([], arr)
console.log(array)
```
## 实现sleep
```js
  const sleep = time => new Promise(resolve => setTimeout(resolve,time))
  //调用
  //方法1: async await
  async test(){
    console.log(1)
    await sleep(2000)
    console.log(2) //2s后打印
  }
  //方法2: .then()
  console.log(1)
  sleep(2000).then(_ => {
    console.log(2) //2s后打印
  })
```

