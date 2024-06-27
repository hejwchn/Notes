# Vue2

[toc]

### 监听 watch
>  会在实例化时调用 $watch()，被监听数据变化时调用其对应方法
> 使用：数据变化时需要做异步或消耗较大性能时
> 类型：{ [key: string]: string | Function | Object | Array }
```js
// 参数
// 1. val（变化前的值）
// 2. oldval（变化后的值）

// 使用
data: {
    a: 1,
    b: 2,
    c: 3,
    d: {
      e: 4
    },
    f: {
      g: {
        h: 5,
        i: 6
      }
    }
  }
//----------------------------------------------------------------
// 一、键:方法
a: function (val, oldVal) { /* ... */ }
// 常简写为
a(){ /* ... */ }
//----------------------------------------------------------------
// 二、键:方法名（methods中写的方法）
b: 'someMethod'
//----------------------------------------------------------------
// 三、键:数组（逐一调用）
c: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
      }
    ]
//----------------------------------------------------------------
// 四、字符串:方法（用于监控对象中的某个属性,字符串需要使用单引号）
'd.e': function (val, oldVal) { /* ... */ }
//----------------------------------------------------------------
// 五、immediate属性，监听开始就会立即调用
d: {
      handler: 'someMethod',
      immediate: true
    }
//----------------------------------------------------------------
// 六、deep属性，只要对象中的某个属性变化就会触发
f: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    }
```
### Vue.set() / this.$set()
> 向一个响应式对象中添加属性，并确保新属性也是响应式，触发视图更新

```js
// 参数
// 1.target（对象或数组）
// 2.propertyName/index（属性名或下标）
// 3.value（值）

// 返回值（设置的值）
this.$set(obj, name, 'world')
```
### Object.values()
> 返回一个对象‘自身’的所有可枚举属性值的数组

```js
// 参数
// 1.obj（对象）

// 返回值（数组）
Object.values(obj);
```
### Object.keys(target)
> 获取对象中的所有key值

```js
// 参数
// 1.target（目标对象）

// 返回值（数组）
Object.keys(obj).length === 0;
//判断obj对象中有没有值
```
### Object.assign()
> 将所有可枚举属性的值从一个或多个源对象分配到目标对象

```js
// 参数
// 1.target（目标对象）
// 2.source（源对象）

// 返回值（目标对象）
Object.assign(target, source);
```
### this.$options.data()
> 存储着初始化前的data数据
```js

// 用于重置data数据
Object.assign(this.$data,this.$options.data()); 
//重置某些属性
this.record_data = this.$options.data.call(this).record_data
```
### 对象各个值求和
```js
//对象各个值求和
eval(Object.values(obj).join("+"))
//首先使用Object.values将对象值转换为数组，然后利用eval函数求和
```
### 数组去重
```js
//数组去重
Array.from(new Set(arr))
//生成一个新数组
//---数组是一个对象类型的去重
//方法1:
    deduplicationPatient(data){
      let obj = {}
      data.forEach(item => obj[item.patient_id + item.visit_id] = item)
      let arr = []
      for (const key in obj) {
        arr.push(obj[key])
      }
      return arr
    },
//方法2: //先将数组中的对象转换为字符串，然后去重完后再转换为对象
  Array.from(new Set(arr.map(t => JSON.stringify(t)))).map(s => JSON.parse(s))
```
### 判断字符串是否包含某些字符
```js
let str = '张三12314'
//返回字符首次出现的index值，若没有则返回-1
str.indexOf('搜索的值');
//返回字符首次出现的index值，若没有则返回-1，可检索与正则相匹配的字符
str.search('搜索的值');
str.search(RegExp(/3/));
//如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp
//如果不传参，会返回一个包含空字符串的数组
str.match('1')
//返回==>  ['1', index: 2, input: '张三1214', groups: undefined]
```
### 如何在filters中使用data数据
```js
// 在全局声明一个变量_that,在 beforeCreate的钩子函数中将vue实例赋值给全局变量_that，然后filters中即可通过_that获取data中数据
```
### 路由跳转后再返回如何保持第一页面的数据
```html
<-- 路由出口文件修改为以下 -->
<keep-alive>
   <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />
```
```js
//在需要缓存的路由（即保持数据的页面）添加meta对象
{
  path: '/Load',
  name: 'Load',
  component: Load,
  meta:{
   keepAlive:true
  }
}
```
### 数据代理--通过一个对象代理另一个对象中属性的操作
#### 基础：Object.defineProperty()
```js
//原生
let obj = {
    x: 100
  }
let obj2 = {
    y: 200
  }

Object.defineProperty(obj2, 'x', {
  enumerable:true,  //控制属性是否可以枚举, 默认值是false
  writable:true,  //控制属性是否可以被修改, 默认值是false
  configurable:true,  //控制属性是否可以被删除, 默认是false
  //当读取obj2的x属性时，get函数(getter)就会被调用
  get() {
    return obj.x;
  },
  //当修改obj2的x属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value) {
    obj.x = value
  }
})

//数据代理在vue的data中的应用

//意义：如果vue中没做数据代理{{name}}就得写成{{_data.name}}，令编码更加方便，这就是数据代理在Vue中的实际应用意义

//数据代理生成过程
//1.当我们声明vue实例对象之后，即vm
//2.vm中会生成各种配置对象options，其中options包含了_data
//3.由于底层代码的支持会自动给_data中每个数据，在_data的外部(即同级)添加对应新的元素(即数据代理)，同时每个name、address中都会有setter、getter函数
vm {
  ......
  _data:{ __ob__: Observer },  //这里面存着name与address的值
  ......
  name: '尚硅谷',
  address: '上海',
  ......
  get name: f proxyGetter,
  set name: f proxySetter,
  get address: f proxyGetter,
  set address: f proxySetter,  //这个就是添加的getter与setter方法
  ......
}
//总结
//1.Vue中的数据代理：通过vm对象代理data对象中属性的操作(读/写)。
//2.Vue中数据代理的好处：更加方便的操作data中的数据
//3.基本原理：
// (1)通过Object.defineProperty()把data对象中所有属性添加到vm上；
// (2)为每一个添加到vm上的属性，都指定一个getter/setter；
// (3)在getter/setter内部去操作(读/写)data中对应的属性。

//数据代理在计算属性computed中的应用
//计算属性定义：要用的属性不存在，要通过已有属性计算得来。
//计算属性原理：底层借助了Object.defineproperty()提供的getter和setter。
//计算属性中的 get函数什么时候执行？ ❶初次读取时会执行一次❷当依赖的数据发生变化时会被再次调用。
//计算属性的优势：与methods实现相比，内部有 缓存机制(复用)，效率更高，调试更方便。

{{fullName}}  //这里fullName多次复用了, fullName直接调用缓存的info的值, 这个就是缓存机制/
{{fullName}}
{{fullName}}

computed:{
  fullName:{
    //get作用：当有人读取fullName时,get就会被调用,且返回值就作为fullName的值
    //get什么时候被调用? ❶初次读取fristName时 ❷所依赖的数据发生改变时
    get(){return this.info = 2},
    set(){},  //set什么时候调用? 当fullName被修改时调用, 不是必须写
  }
  //如果不用写set(),直接简写
  fullName:{return this.info = 2}
}
```
### Vue2在css中使用data变量
```js
// data中定义
data{
  return{
    height: 100px
  }
},
// computed中定义
computed: {
    cssVars() {
      return {
        "--height": this.height
      };
    }
  },
```
```css
/* css中定义 */
.transfer {
  height: var(--height);
}
```
```html
<!-- html标签中使用 -->
<div class="transfer" :style="cssVars"></div>
```
### js获取class中的属性
```js
var oDiv = document.getElementById('div1');   
function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
getStyle(oDiv, 'width')
```
### 解决使用el-table使用fixed后高度错乱的问题
```js
// ELtable为<el-table>标签的ref
  this.$nextTick(() => {
    this.$refs["ELtable"].doLayout();
  });
```
### el-table行合并（要合并的数据必须是连续的）
```js
// data定义
spanArr: [],
pos: new Number()
// methods
//表格数据处理 类型[]
getSpanArr(data) {　
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      this.spanArr.push(1);
      this.pos = 0
    } else {
      // 判断当前元素与上一个元素是否相同
    if (data[i].name === data[i - 1].name) {
        this.spanArr[this.pos] += 1;
        this.spanArr.push(0);
      } else {
        this.spanArr.push(1);
        this.pos = i;
      }
    }
  }
},
//table调用
cellMerge({ row, column, rowIndex, columnIndex }) {
  if (columnIndex === 0) {
    //合并第一列
    const _row = this.spanArr[rowIndex];
    const _col = _row > 0 ? 1 : 0;
    return {
      rowspan: _row,
      colspan: _col
    }
  }
},
//el-table使用参数
:span-method="cellMerge"
```
### element-ui table点击行选中checkbox
```js
//1.table上加上  @row-click="handleClickTableRow"

//2.单选框的checkbox那列加上  @selection-change="handleSelectionChange"

//3.table加上ref
methods: {
  handleClickTableRow(row, event, column) {
    this.$refs.fileTable.toggleRowSelection(row);
  },
  handleSelectionChange(rows) {
    this.multipleSelection = rows;
  },
},
```
### 父子组件中属性双向绑定（.sync实现）
<!-- 子组件 -->
```js
//‘update:属性名’ update为关键，属性名即为父组件传入子组件后子组件定义的名称
//在子组件中需要的业务中触发
this.$emit('update:title', '触发了')
```
<!-- 父组件 -->
```html
<!-- 带有 .sync 修饰符的 v-bind 不能和表达式一起使用（如: v-bind:title.sync=“doc.title + ‘!’” 是无效的）。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model -->
<!-- :为v-bind绑定，.sync为关键，.sync前的参数名为子组件中的prop即update后的参数名，=后的参数即为父组件data定义的属性 -->
<son :title.sync='fatherTitle'> </son>
```

### v-for中value绑定对象
```html
<!-- 使用value-key绑定对象中的某个参数作为key值，此时value中即可绑定对象-->
    <el-select
      v-model="selectObj"
      value-key="user_id" 
    >
      <el-option
        v-for="user in AllUserList"
        :label="`user.name"
        :value="user"
        :key="user.user_id"
      >
      </el-option>
    </el-select>
```