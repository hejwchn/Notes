# ES6
[toc]
## 编程思想
#### 面向过程编程
    分析出解决问题的所需要的步骤，然后用函数把步骤逐步实现，
    使用时再逐步调用。
                    代表性语言：c语言
    例子：大象装冰箱
    1.打开冰箱门
    2.大象装进去
    3.关闭冰箱门
#### 面向对象编程
    将事物分为一个个对象，由对象间分工合作；
    以对象的功能划分问题，而不是步骤；
    每一个对象都是功能中心，具有明确的分工；
    优点：代码灵活、可复用、易维护、易开发；

    例子：大象装冰箱
    1.找出对象，写出功能
        大象对象：进去
        冰箱对象：打开、关闭
    2.使用对象的功能
##### 面向对象编程三大特征
`继承` `封装` `多态`

## 对象与类

#### 对象
    是一组无序的相关属性和方法的集合；
    属性：事物的特征；
    方法：事物的行为；

#### 类
    ES6新增的概念，使用 `class` 关键字来声明一个类，
    再用这个类来实例化对象；
    类抽象类对象的公共部分，泛指一大类，例如动物、植物；
    对象则特指某一个，通过实例化可以创建一个对象，例如猫，狗；

##### 创建类
```js
class Person{
    //属性和方法
}
//创建实例（对象）
var person = new Person()
```

##### 构造方法 & 类方法
    constructor()方法是类的构造函数（默认方法），用于传递参数，
    返回实例对象，在通过new关键字生成对象实例时会自动调用，
    若没有显示的定义，类内部会自动生成创建一个constructor();
```js
class Person{
    constructor(name, age){
        this.name = name
        this.age = age
    }
    say(){
        //实现一个类方法
    }
}
var person = new person('he', '24')
//构造出来的类方法可继承至实例对象
person.say()
```

#### 继承
    子类可以继承父类的一些方法和属性；
```js
class Father{
    constructor(name){
        this.name = name
    }
    say(){

    }
}
//子类Son继承父类Father
class Son extends Father{

}
//实例化子类,子类可调用父类方法
var son = new Son('he')
son.say()
```

##### super关键字
    用于访问和调用父类的构造函数和普通函数；
    
    注意：
    1. ES6中没有变量提升，即必须先定义类，才能通过类实例化对象；
    2. 类里的公有属性和方法都需要通过this调用；
    3. 类中的this指向：constructor()中指向实例对象，方法中指向这个方法的调用者

```js
class Father{
    constructor(firstname){
        this.firstname = firstname
    }
    say(){

    }
}
//子类Son继承父类Father
class Son extends Father{
    constructor(firstname, lastname){
        //在子类constructor中使用super，this不能放在super之前
        //super调用父类构造函数
        super(firstname)
        this.lastname = lastname
    }
    say(){
        //super调用父类普通函数
        super.say()
    }
}
//实例化子类,子类可调用父类方法
var son = new Son('he', 'jw')
son.say()
```

## ES6中新增方法
    注意包括数组方法，字符串方法，对象方法

#### 数组方法
##### forEach()
    遍历数组
```js
var arr = [a,b,c,d]
//value:值，index:索引，array:数组本身
arr.forEach(function(value, index, array){
    console.log(index, value)
    //输出
    //1 a
    //2 b
    //3 c
    //4 d
})
```
##### filter()
    创建一个新的数组，新数组中元素是通过检查原数组中符合条件的所有元素，用于筛选数组
```js
var arr = [apple,blue,cat,dog]
var resultArr = arr.filter(function(value, index, array){
    //return一个布尔值,为true时符合条件放入新数组resultArr
    //筛选条件：值长度为3
    return value.length === 3
})
```
```js
//拓展：ES5中做法
for(var i = 0; i < arr.length; i++){
    if(arr[i].length === 3){
        resultArr.push(arr[i])
    }
}
```
##### some()
    判断数组中是否有满足条件的元素,会返回布尔值（有即真）
```js
var arr = [apple,blue,cat,dog]
var resultArr = arr.some(function(value, index, array){
    //筛选条件：arr数组中是否有值为“blue”的元素
    return value === 'blue'//true
})
```
```js
//拓展：ES5中做法
var flag = false
for(var i = 0; i < arr.length; i++){
    if(arr[i] === 'blue'){
        return flag = true
    }
}
```
##### every()
    判断数组中所有元素是否都满足条件,会返回布尔值（全满足即真）
```js
var arr = [apple,blue,cat,dog]
var resultArr = arr.some(function(value, index, array){
    //筛选条件：值长度为3～5之间
    return value.length >= 3 && value.length <= 5//true
})
```
##### sort()
    数组排序，【代码查看demo的200行】
```js
// sort()方法中系统提供一个接口可以自己写方法进行排序
// 直接在sort()中写入方法即可，系统会自调用无数次直至排序完成
//     接口规则：1.传入两个参数
//             2.看返回值
//                 --1）返回值为负数不动位置
//                 --2）返回值为正数调换位置
//                 --3）返回值为0不动位置
// 两个参数的比较是按照冒泡排序来取用的：
//   第一位和第二位比较，第一位和第三位比较，...第一位比较完后，
//   开始第二位和第三位比较，...依次类推，这就是冒泡排序
       var arr = [1,21,18,27,5,0,16];
       arr.sort(
           function(a, b) {
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
```
#### 字符串方法
##### trim()
    去除字符串两端空白字符，返回一个新数组
```js
var str = "aaa  "
var result = str.trim()//'aaa'
```
#### 对象方法
##### Object.keys()
    获取对象自身的所有属性,输出一个属性名集合的数组
##### Object.values()
    获取对象自身的所有值,输出一个值集合的数组
```js
var obj = {id: 1, name: 'he', sex: '男'}
console.log(Object.keys(obj))//['id', 'name', 'sex']
console.log(Object.values(obj))//[1, 'he', '男']
```
##### Object.defineProperty()
    定义对象中新属性，或者修改原属性
```js
//具体查看此方法去MDN
var obj = {}
//参数：对象，属性名，属性描述符
Object.defineProperty(obj, 'name', {
    //有多个属性描述符
    value: 111
    writable: false, //不可修改，即后续修改‘name’属性在严格模式下会报错
})
console.log(obj.name)//111
```

## this
    指向问题就是，在一个方法中，this代表什么；
    调用方式不同决定了this指向不同，一般指向调用者
#### this调用方式与指向
##### 普通函数调用
```js
//指向window
function func(){
    console.log(this)
}
```
##### 定时器函数调用
```js
//指向window
```
##### 构造函数调用
```js
//指向实例对象，即此例person
class Person{
    constructor(name){
        this.name = name
        console.log(this)
    }
}
//new后会开始执行构造函数
var person = new Person('名字')
```
##### 对象方法调用
```js
//指向该方法所属对象
var obj = {
    func : function(){
        console.log(this)
    }
}
obj.func()
```
##### 事件绑定函数调用
```html
<button onclick= func(this)>点击</button>
```
```js
//指向绑定事件对象，即<button>
function func(e){
    console.log(e)
}
```

## 严格模式
    JavaScript除了提供正常模式外，还提供了严格模式，严格模式是采用
    具有限制性的JavaScript变体的一种方式（对正常的Javascript语义
    做了一些规范；消除了语法中的不合理、不严谨，减少了怪异行为；消除
    了代码运行的一些不安全之处，保证代码安全运行；提高编译器效率，
    增加运行速度），即在严格的条件下运行js代码；
    IE中只有10以上版本支持严格模式，旧版本会忽略；

#### 开启严格模式
    严格模式可以应用到整个脚本或者个别的函数中,因此在使用时,可以将
    严格模式分为脚本开启严格模式和函数开启严格模式两种情况。

##### 为脚本开启严格模式
    为脚本开启严格模式,需要在所有语句之前放一个特定的语句
`'use strict'`
##### 为函数开启严格模式
    为某个函数开启严格模式,需要在函数体所有语句之前放语句
`'use strict'`

#### 严格模式中的变化
1. 变量必须先声明才能使用
2. 禁止删除变量（delete方式）
3. 全局作用域中的函数，this指向undefined
4. 一个函数内不能有不能有重复的行参名

## 高阶函数
    高阶函数是对其他函数进行操作的函数，
    它接收函数做为参数（即回调函数），或将函数作为返回值（即闭包）




## 箭头函数
```js
//ES5
var fn = function(){

}
//ES6
var fn = ()=>{}
```


#### 箭头函数与普通函数区别
1. 箭头函数没有独立的 this、arguments 和 super 绑定，并且不可被用作方法。
2. 箭头函数不能用作构造函数。使用 new 调用它们会引发 TypeError。它们也无法访问 new.target 关键字。
3. 箭头函数不能在其主体中使用 yield，也不能作为生成器函数创建