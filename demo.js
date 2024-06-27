//  立即执行函数中使用递归方法实现阶乘
var num = (function (n) {
  //if找出口
  if (n == 1 || n == 0) {
    return 1;
  }
  //arguments.callee指向函数自身引用，立即执行函数没有方法名时可以使用
  return n * argumengs.callee(n - 1);
}(100))



//常规方法实现递归阶乘
function f(n) {
  if (n == 1 || n == 0) {
    return 1;
  }
  return n * f(n - 1);
}
console.log(f(0));


//  闭包
//  -------------------------------------------------------------------------
function add() {
  var num = 0;
  function a() {
    console.log(++num);
  }
  return a
}
var myAdd = add();
myAdd();

// 闭包解决方法，套上立即执行函数
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    (function (a) {
      arr[i] = function () {
        document.write(a + " ")
      }
    })(i)
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();
}


//  调用.charCodeAt()方法实现统计字符串字节长度
//  -------------------------------------------------------------------------
var str = "jafwejgioa你好啊";
function length(str) {
  count = str.length;
  for (var i = 0; i < count; i++) {
    if (str.charCodeAt(i) > 255) {
      count++;
    }
  }
  console.log(count);
}
length(str);


//  完美的继承方式：圣杯模式
//  -------------------------------------------------------------------------
function inherit(target, origin) {
  //创建一个中间构造函数，用以解决子prototype与父prototype相同导致的-
  //-修改子属性lastName会直接修改父属性lastName
  function F() { };
  F.prototype = origin.prototype;
  target.prototype = new F();
  //将继承父属性的子对象的constructor重新指向为子构造函数而不是父构造函数
  target.prototype.constructor = target;
  //设置一个超类用于方便找到真正继承的构造函数
  target.prototype.uber = origin.prototype;
}
//为父构造函数的prototype设置一个属性
Father.prototype.lastName = "父名字";
//创建父构造函数，子构造函数将继承其属性
function Father() { };
//创建子构造函数
function Son() { };
//需先调用封装好的函数将prototype重新进行指向
inherit(Son, Father);
//创建子对象
var son = new Son();
//创建父对象
var father = new Father();


//  对象的遍历方法 for in
//-------------------------------------------------------------------------
var obj = {
  name: "he",
  sex: "male",
  __proto__: {
    a: "自己修改隐式proto"
  }
}
//遍历对象时只能用for in循环来遍历
for (var prop in obj) {
  //.hasOwnProperty()方法是用来判断这个属性是属于自己的属性还是继承的，返回布尔值
  if (obj.hasOwnProperty(prop)) {
    //其实一直以来调用对象的属性使用obj.name时系统都会隐式调用obj['name']来执行
    //为什么这里不用obj['prop']字符串的形式写，因为prop是一个变量
    //prop就是表示每次遍历时obj时对每个obj中的属性定义的一个变量，prop名字是自己取的
    //会返回属性值对的值
    console.log(obj[prop])
  }
}

//in和instanceof用法示例(in基本不用)
function B() {
}
var A = new B();
//判断此属性是否存在于A对象中，属性用引号包裹，不管是自己有还是原型上有，返回布尔值
console.log('__proto__' in A);
//判断A的原型链上有没有B的原型
console.log(A instanceof B);


//  用原生js实现类似jquery的链式写法
//  -------------------------------------------------------------------------

var obj = {
  drink: function () {
    console.log("drink");
    return this;
  },
  smoke: function () {
    console.log("smoke");
    return this;
  }
}
obj.drink().smoke();


//    递归思想实现对象深拷贝
//    -------------------------------------------------------------------------
//    源对象
var obj = {
  name: "origin",
  sex: "male",
  card: ["weixin", "alipay"],
  wife: {
    name: "wife",
    son: {
      name: "son"
    }
  }
}
var obj1 = {};
function deepClone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    array = "[object Array]";
  //遍历对象
  for (var prop in origin) {
    //1.判断对象的属性是否时自身上的属性
    if (origin.hasOwnProperty(prop)) {
      //2.判断源对象的属性的typeof是否是object
      if (origin[prop] !== "null"
        && typeof (origin[prop]) == "object") {
        //3.如果是数组则创建空数组，否则创建空对象
        // if(toStr.call(origin[prop]) == array){
        //     target[prop] = [];
        // }else{
        //     target[prop] = {};
        // }
        //简化：用三步运算符实现这个if else
        target[prop]
          = toStr.call(origin[prop]) == array ? [] : {};
        //4.调用自身实现递归
        deepClone(origin[prop], target[prop]);
        //如果不是object则是原始值直接拷贝
      } else {
        target[prop] = origin[prop];
      }
    }
  }
  return target;
}


// 实现数组自带的push方法
// -------------------------------------------------------------------------
var arr = [];
Array.prototype.push = function () {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
  }
  return this.length;
}


// 数组中sort()方法
// -------------------------------------------------------------------------
//   sort()方法中系统提供一个接口可以自己写方法进行排序
// 直接在sort()中写入方法即可，系统会自调用无数次直至排序完成
// 接口规则：1.传入两个参数
// 2.看返回值
// --1）返回值为负数不动位置
// --2）返回值为正数调换位置
// --3）返回值为0不动位置
// 两个参数的比较是按照冒泡排序来取用的：
// 第一位和第二位比较，第一位和第三位比较，...第一位比较完后，开始第二位和第三位比较，...依次类推，这就是冒泡排序
var arr = [1, 21, 18, 27, 5, 0, 16];
arr.sort(
  function (a, b) {
    // //实现升序
    // if(a > b){
    //     return 1;
    // }else{
    //     return -1;
    // }
    //简化版-升序
    return a - b;
    //降序 return b - a;
  }
)

// 拓展：数组中sort()方法按照字符串的字节长度进行升序
// -------------------------------------------------------------------------
var arr = ["a你好", "anghaeiugh", "helloworld", "你好啊", "你好世界", "啦啦啦啦啦啦", "jfajoi1634的"];
//传进来的str是数组arr中的某一个数据，而不是整个数组传进来
function reBetys(str) {
  var num = str.length
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      num++;
    }
  }
  return num;
}
arr.sort(
  function (a, b) {
    return reBetys(a) - reBetys(b);
  }
)


// 类数组
// -------------------------------------------------------------------------
var obj = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 2,//决定push的位置
  name: "he",
  sex: "male",
  push: Array.prototype.push,
  //加上splice方法后这个对象就长得跟数组一样了
  splice: Array.prototype.splice
}
obj.push("ddd");
obj.push("eee");
console.log(obj);
//push方法就是根据197行代码实现的，调用push方法会根据length值添加对应位；
//既有对象的特性，也有数组的，可以实现更强大的存储功能


// 数组去重
// -------------------------------------------------------------------------
//   利用对象的特性：对象中不会有名字重复的属性
// 将数组的每个值都放进对象里，实现去重
var array = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 5, 6, 5, 7, 7];
Array.prototype.unique = function (target) {
  var obj = {},
    arr = [],
    length = this.length;//this.length,因为是谁调用的this就会指向谁
  for (var i = 0; i < length; i++) {
    //this[i]，传进来的数组调用指向该数组，即array[i],取到array中第i位的值
    if (!obj[this[i]]) {
      //给对象添加属性名为数组值的属性
      obj[this[i]] = '值';
      //push至新数组中
      arr.push(this[i]);
    }
  }
  return arr;
}
//因为是直接在数组原型上写的方法，需要这样调用
array.unique();


// 打印出一个字符串中第一个出现的不重复的字符
// -------------------------------------------------------------------------
var str = "qqwwaaaaqqwwbvdsvevasngkjadsgjksvnma";
String.prototype.unique = function (target) {
  var temple = {},
    array = this.split(""),
    length = this.length;
  for (var i = 0; i < length; i++) {
    if (!temple[this[i]]) {
      temple[this[i]] = this[i];
    } else (
      delete temple[this[i]]
    )
  }
  var prop = [];
  var j = 0;
  for (prop[j++] in temple) {
    // if(temple.hasOwnProperty(prop)){      
    // }
  }
  return prop[0];
}


// 封装函数，获取某个元素的style属性的属性值
// -------------------------------------------------------------------------
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    //IE
    return elem.currenStyle[prop];
  }
}
//调用
//getStyle(div,"width");


// 封装函数，实现兼容性更好的事件监听
// -------------------------------------------------------------------------
// 参数（元素，事件类型，处理函数）
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, function () {
      //IE的attachEvent方法this指向是指向window，需要用call()改变成调用函数
      handle.call(elem);
    })
  }
  else {
    elem['on' + type] = handle;
  }
}


// 事件委托
// ------------------------------------------------------------------------- 

var ul = document.getElementsByTagName("ul")[0];
ul.onclick = function (e) {
  //获取事件对象，window.event用于兼容IE
  var e = e || window.event;
  //获取事件源对象，兼容火狐和IE
  var taget = e.target || e.srcElement;
  console.log(taget.innerText);
}


// demo: 拖拽方块
// -------------------------------------------------------------------------
结合两个封装好的函数来实现
var div = document.getElementsByTagName("div")[0];
function drag(elem) {
  var disX,
    disY;
  //调用创建事件监听函数------326行
  addEvent(elem, "mousedown", function (e) {
    var e = e || window.event;
    //调用获取元素某个属性的值方法---312行
    disX = e.pageX - parseInt(getStyle(elem, "left"));
    disY = e.pageY - parseInt(getStyle(elem, "top"));
    addEvent(document, "mousemove", move);
    addEvent(document, "mouseup", remove);
  })
  function move(e) {
    var e = e || window.event;
    elem.style.left = e.pageX - disX + "px";
    elem.style.top = e.pageY - disY + "px";
  }
  function remove(e) {
    var e = e || window.event;
    document.removeEventListener("mousemove", move, false);
  }
}
drag(div);

var input = document.getElementsByTagName('input')[0];
input.onblur = function () {
  console.log(this.value);
}


// 按需加载，异步加载--通过创建script标签实现
// -------------------------------------------------------------------------
//创建script标签并加入src属性链接需要加载的js
function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = "text/javascript";

  //window.onload和script.onreadystatechange是用来判断链接的js是否加载完毕的 
  if (script.readyState) {
    //兼容IE
    script.onreadystatechange = function () {
      if (script.readyState == "complete" || script.readyState == "loaded") {
        callback();
        //完善的写法
        //obj[callback]();
      }
    }
  } else {
    window.onload = function () {
      callback();
      //完善的写法
      //obj[callback]();
    }
  }
  //后加载js，防止事件未绑定js就加载完了
  script.src = url;
  //appendChild将script标签插入页面中后，对应的js才会开始执行
  document.head.appendChild(script);
}
// 调用方法test
//loadScript("test.js", test)这样会因为test未定义而报错，所以需要用函数表达式
loadScript("test.js", function () { test() });
//使用更加完善的,更改方法内的调用，并且需要加载过来的js配合写成对象形式
loadScript("test.js", "test")


// Ajax创建XMLHttpRequest对象
// -------------------------------------------------------------------------

function getXMLHttpRequest() {
  //创建一个XMLHttpRequest或ActiveObjext对象
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest;
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}
window.onload = function () {
  //页面加载完毕调用
  var toAjax = document.getElementById("toAjax");
  toAjax.onclick = function () {
    var xhr = getXMLHttpRequest();
    //监控状态变化
    xhr.onreadystatechange = function () {
      var content = document.getElementById("content");
      //加载成功
      if (xhr.readyState == 4) {
        //服务器请求成功
        if (xhr.status == 200) {
          var data = eval("(" + xhr.responseText + ")")
          content.innerHTML = "姓名:" + data.name + "，年龄:" + data.age + "岁，现在正在" + data.handle;
          //服务器请求失败
        } else if (xhr.status == 404) {
          content.innerText = xhr.status + " not found...";
        }
        // //加载中
      } // }else if(xhr.readyState == 1){
      //         var loding = document.getElementById("loding");
      //         content.innerHTML = loding.innerHTML;
    }

    //建立服务器连接
    xhr.open("get", this.href + "?d=" + new Date().getTime());
    //发送请求头，post方式需要，get不需要
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //发送服务器请求
    xhr.send(null);
    //取消a标签的默认跳转
    return false;
  }
}


//cookie
//-------------------------------------------------------------------------
//写入cookie
//javascript一次只能写入一个键值对的数据
function setCookie(name, value, time) {
  var myDate = new Date();
  //设置过期时间
  var timeout = myDate.getTime() + time * 24 * 3600 * 1000;
  myDate.setDate(timeout);
  //存储cookie,encodeURI()方法用于将值转换为URI格式
  document.cookie = name + "=" + encodeURI(value) + "; expires" + myDate.toGMTString();
}
//获取cookie中指定变量
function getCookie(name) {
  //split()方法此处用于将字符串分割为键值对的数组
  var data = document.cookie.split("; ");
  for (var i = 0; i < data.length; i++) {
    //此处循环将每个键值对以“=”分割为键和值
    var dataArr = data[i].split("=");
    if (name = dataArr[0]) {
      return decodeURI(dataArr[1]);
    }
  }
  return "cookie中无此变量，请重试其他变量。"
}
//删除cookie中的指定变量
function delCookie(name) {
  var myDate = new Date();
  var timeout = myDate.getTime() - 1;
  myDate.setTime(timeout);
  document.cookie = name + "= ' '; expires=" + myDate.toGMTString();
}
//获取当前时间特定天数前后的时间(年月日)
//---------------------------------------------------------------------------
//  参数说明（天数(number||string)，前或后(string)）
// 天数不传默认3天，类型不传默认后
function getDate(day, type) {
  let DayTime = new Number()
  if (type == 'before') {
    DayTime = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * (Number(day) || 3)))
  } else {
    DayTime = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * (Number(day) || 3)))
  }
  let myDate = DayTime.getFullYear() + '-' + (DayTime.getMonth() + 1) + '-' + DayTime.getDate()
  return myDate
}
//将一维数组数据转换成树形结构
//---------------------------------------------------------------------------
function handleTreeData(arr){
  return arr.reduce((prev,next)=>{
    let parent = arr.find(item=>item.node_no === next.node_no_super);
    if(parent){
      (parent.children || (parent.children = [])).push(next)
    }else{
      prev.push(next)
    }
    return prev;
  },[])
}
















//打印时间
var firstTime = new Date().getTime();
var div = document.createElement('div');

document.body.appendChild(div);
div.style.backgroundColor = "#0f0";
div.style.padding = "20px";
setInterval(function () {
  div.innerHTML = new Date();
}, 1000)