# HTML & CSS {ignore}

[toc]

## HTML：超文本标记语言(Hyper Text Markup Language)

### 语义化

#### 什么是语义化

1. 每个HTML元素都有具体的含义

2. 所有元素与展示效果无关

> 元素展示到页面中的效果，应由CSS决定；

> 因为浏览器带有默认CSS样式，所以每个元素有一些默认样式；

> **选择什么元素，取决于内容的含义而不是需要显示的效果；**

#### 为什么要语义化？

1. 为了搜索引擎优化（SEO）

> 每隔一段时间搜索引擎会从整个互联网中拉取页面源代码，使用语义化可以让搜索引擎更加理解这个网页，然后使搜索结果更加靠前；

2. 为了让浏览器理解网页

> 阅读模式的去除无关功能，语音模式字符阅读时的轻重音

### 路径

#### 绝对路径
`协议名://主机名:端口号/路径`
`schema://host:port/path`
> 当跳转目标协议相同时可省略协议名;

#### 相对路径
`./`表示当前文件所在目录
`../`表示当前文件的上一级目录
> 开头的./可以省略

### HTML实体
`保留字符`
`实体字符：HTML Entity`
> 用于在页面中显示一些特殊符号;
#### 使用方式
1. &单词;
2. &#数字;


### 文本元素

HTML5元素周期表

#### \<h1>
`标题元素：head`

```html
<h1>1级标题</h1>
<h2>2级标题</h2>
<h3>3级标题</h3>
<h4>4级标题</h4>
<h5>5级标题</h5>
<h6>6级标题</h6>
```

#### \<p>
`段落元素：paragraphs` 

> 拓展：lorem:乱数假文，没有任何实际含义的段落;

#### \<span>
`无语义元素，行盒，仅用于设置CSS样式`

> 以前：某些元素在显示时会独占一行(块级元素)，有些元素不会(行内元素);

> 现今HTML5已弃用此说法(为了语义化，元素代表含义而与显示无关);

#### \<pre>
`无语义，预格式化文本元素: pre`

> 空白折叠：在源代码中的连续空白字符(空格、换行、制表符)，在页面显示时会折叠为一个空格;

> 在pre元素中的内容，显示时会按照源代码中的格式显示；

> 通常用于在网页中显示一些源代码，使用时还可以在最外层包裹一个\<code>元素；

> pre本质，有默认CSS属性，`white-space:pre;`

### a元素

`超链接： <a></a>`

#### 属性

##### 1. href
  `hyper reference`通常表示跳转地址；

###### 普通链接
```html
<a href="https://www.baidu.com"></a>
```
###### 锚点链接
```html
<a href="#">回到顶部</a>
<a href="#chapter1"></a>
<p id="chapter1">锚点1</p>
```
###### 功能链接
`点击后触发某个功能`

- 执行js代码
```html
<!-- <a href="javascript:js代码"></a> -->
<a href="javascript:alert('执行代码片段')">执行</a>
```
- 发送邮件
```html
<!-- 
<a href="mailto:邮箱地址"></a>
需要使用移动端，或者pc端安装邮件发送软件，exchange
-->
<a href="mailto:hejwchn@gmail.com">发送邮件</a>
```

- 拨打电话
```html
<!-- 
<a href="tel:手机号"></a>
需要使用移动端，或者pc端安装拨号软件，exchange
-->
<a href="tel:13260421617">拨打电话</a>
```

##### 2. target
`打开窗口的位置`

默认值：_self
```html
<a href="" target="_self">默认在原窗口打开</a>
<a href="" target="_blank">在新窗口中打开</a>
```

### 图片元素
`<img>`
`image的缩写，空元素`
#### 属性
##### 1. src
`source,填写图片路径`

##### 2. alt
`当图片资源失效时，使用该属性的值替代该图片`

#### 与\<map>元素配合使用
`一张图片中点击某块区域跳转至不同页面`
```html
<a href="" target="_blank">
    <img usemap="#map" src="" alt="图片">
</a>
<map>
    <!--
        shape:区域形状（circle圆形、rect矩形、poly不规则多边形）
        coords:坐标地址（圆形：x坐标,y坐标,半径
                       矩形：左上角x坐标,左上角y坐标,右下角x坐标,右下角y坐标
                       多边形：每个点的xy坐标
                        ）
        以图片左上角为坐标原点，往下y增加，往右x增加
        href:点击该区域链接至的地址
    -->
    <area shape="circle" coords="120,120,10" href="" taget="_blank">
    <area shape="rect" coords="323,282,395,320" href="" taget="_blank">
    <area shape="poly" coords="601,371,645,312,678,338,645,392" href="" taget="_blank">
</map>
```

#### 与\<figure>元素搭配使用
`HTML5语义化`
`指代、定义；通常用于将图片，图片标题，图片描述包裹起来`
```html
<figure>
    <a href="" target="_blank">
        <img usemap="#map" src="" alt="图片">
    </a>
    <!--<figcaption>用于将标题包裹-->
    <figcaption>
        <h2>图片标题</h2>
    </figcaption>
    <p>这是图片的描述</p>
</figure>
```

### 多媒体元素
#### \<video>&\<audio>

##### 属性

`controls` `autoplay` `muted` `loop`
```html
<!--
    controls:显示控件
    autoplay:自动播放
    muted:静音播放
    loop:循环播放
-->
<audio controls autoplay src="">
<video>
```

### 列表元素

#### 有序列表
> `ol` : ordered list
> `li` : list item
```html
<ol>
    <li></li>
    <li></li>
</ol>
```
##### 属性
`type`
```html
<ol type="1">数字排序</ol>
<ol type="i">小写罗马数字排序</ol>
<ol type="I">大写罗马数字排序</ol>
<ol type="a">小写英文字母排序</ol>
<ol type="A">大写英文字母排序</ol>
```
`reversed`
```html
<ol reversed>倒序</ol>
```

#### 无序列表
`常用于网页中的菜单，新闻列表`
> `ul` : unordered list
> `li` : list item

```html
<ul>
    <li></li>
</ul>
```

#### 定义列表
`常用于一些术语的定义 `
> `dl` : definition list
> `dt` : definition title
> `dd` : definition description
```html
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
</dl>
```

### 容器元素
#### \<div>
`该元素代表一块区域，内部用于放置其他元素，无语义`
### 语义化容器元素
#### \<header>
`表示页头，也可用于表示文章头部`
#### \<nav>
`通常用于表示页面导航`
#### \<article>
`通常用于表示整篇文章内容`
#### \<section>
`通常用于表示文章的章节`
#### \<footer>
`表示页脚，也可用于表示文章尾部`
#### \<aside>
`通常用于表示侧边栏`

### 元素包含关系
`以前：块级元素可以包含行级元素，行级元素不可包含块级元素，a元素除外`
`现在：元素的包含关系由元素的内容类别决定`
总结 :
1. 容器元素中可以包含任何元素
2. a元素中几乎可以包含任何元素
3. 某些元素有固定的子元素（ul&ol>li、dl>dt+dd）
4. 标题元素和段落元素不能相互嵌套，并且不能包含容器元素



## CSS：层叠样式表(Cascading Style Sheets)

### 添加样式
`css规则 = 选择器 + 声明块`
### 选择器
1. 内部样式表
`直接在<style>元素内书写`
2. 内联样式表
`在元素上书写`
```html
<div style="color:red;background-color:black;"></div>
```
3. 外部样式表
```html
<link rel="stylesheet" href="">
```

#### ID选择器
```html
#id{

}
```
#### 元素选择器
```css
div{

}
```
#### 类选择器
```css
.className{

}
```
#### 水平垂直居中
```css
/* 父元素使用 */
.in{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* 垂直排列 */
}
```
```html
<!-- 或父子一块使用 -->
<div style="display:flex; align-items: center">
  <van-checkbox style="margin: auto">
  </van-checkbox>
</div>
```
#### 文字过长显示省略号
```css
.style{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

