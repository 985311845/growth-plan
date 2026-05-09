[toc]

作者：姬成

## 1.HTML解析流程



```mermaid
flowchart TD
    A[开始解析HTML] --> B{遇到CSS?}
    B -- 是 --> C[异步下载CSS<br>继续解析DOM]
    B -- 否 --> D[继续解析DOM]
    C --> E{DOM和CSSOM<br>是否都准备好部分内容?}
    D --> E
    E -- 是 --> F[渲染已准备好的部分内容]
    E -- 否 --> G[等待必要资源]
    F --> H[继续解析后续HTML]
    G --> H
    H --> I{解析完成?}
    I -- 否 --> B
    I -- 是 --> J[最终渲染完成]
```

## 3.浏览器及其内核

| 浏览器        | 内核                          |
| ------------- | ----------------------------- |
| IE            | Trident（单词是三叉戟的意思） |
| Google Chrome | webkit / blink                |
| safari        | webkit                        |
| Firefox       | gecko                         |
| Opera         | presto                        |

webkit最开始是有chrome和safari一起研发的，后来因为版权问题，chrome从webkit中剥离了自己的核心技术自己单独研发，所以有了blink

## 4.权重

| 选择器                            | 权重（256进制，实操IE7.0版本测出来的） |
| --------------------------------- | -------------------------------------- |
| !important                        | Infinity                               |
| 行间样式                          | 1000                                   |
| id                                | 100                                    |
| class \| 属性选择器 \| 伪类选择器 | 10                                     |
| 标签选择器 \| 伪元素              | 1                                      |
| 通配符 *                          | 0                                      |

浏览器内部原理，选择器是从右向左找（树梢向着树干找），因为快

选择器类型：

1. 父子选择器
2. 并列选择器
3. 分组选择器

## 5.CSS属性和属性值



1. 浏览器默认基准字体大小是 16px（基准字体大小，可以在浏览器设置里面设置基准字体大小）
2. px 是相对单位，在同一台机器上就是绝对单位。（每英寸垂直方向能切割多少个像素点就是分辨率，像素点越大，屏幕分辨率越垃圾）
3. 字体大小设置的是字体的高度
4. <strong>标签的font-weight属性值默认是blod
5. font-weight设置500及500以下，没有变化，是因为，即使你设置了字体的font-weight，那也得看浏览器的这个字体包中支不支持你设置的字体的weight，比如你设置了font-weight为300，但是该字体包的最小weight为500，就算你设置了300也没用，显示的还是500
6. 互联网用的最多的通用字体是arial
7. 为中文而设计的字体是 cursive 字体，比较好看
8. css只有块注释，没有行注释
9. 首行缩进 text-indent，只能用于block或者inline-block元素
10. padding 为3个值的时候，上、左右、下
11. 给 inline 元素设置padding，会有bug，左、右padding没有问题，但是上、下边的padding有问题，其他元素跟看不见该元素的上下padding一样，可以padding不占位置

## 6.元素性质

##### 行级元素

1. 内容决定元素所占位置
2. 不可以通过css改变宽高
3. 凡是带有inline的元素都有文字特性（inline、inline-block）

##### 块级元素

1. 独占一行
2. 可以通过css改变宽高

##### 行级块元素

1. 内容决定大小
2. 可以通过css改变宽高

## 7.压缩代码

压缩代码分为两个步骤

1. 把代码中较长的单词，缩短为1个字母
2. 去空格，去回车  

## 8.盒模型

1. 标准盒模型 margin + border +  padding + content
2. IE盒模型 margin +border + content（padding + content）

## 9.定位（层模型）

0. margin 和 position 是可以叠加使用的
1. 绝对定位：absolute，脱离文档流，不保留原来的位置。相对最近的有定位的父级元素定位，如果所有父级元素都没有定位，就相对文档定位。
2. 相对定位：relative，<del>也脱离文档流</del>，但是保留原来的位置。相对于自己原来的位置定位的。
3. 固定定位：fixed
4. 值为百分比的话，相对于谁定位，就是谁的百分比

## 10.两栏布局

```html
<html>
    <head>
        <meta charset="utf-8">
        <title>DOcument</title>
        <style>
            * {
                margin: 0;
                padding:0;
            }
            
            .right {
                position:absolute;
                right:0;
                width: 100px;
                height: 100px;
                background-color: #fcc;
                opacity: 0.5;
            }
            
            .left {
                margin-right: 100px;
                height: 100px;
                background-color: #123;
            }
        </style>
    </head>
    <body>
        <div class="right"></div>
        <div class="left"></div>
    </body>
</html>
```

为什么right和left的顺序要反着写，如果不反着写的话，可以给right加上一个 top: 0;

## 11.margin合并（父子元素）

垂直方向的margin，父子会取大的那一个margin

解决办法是：

1. 在父元素加上border-top：1px solid red, 不可取。
2. 让父元素触发BFC（块级格式化上下文，block format context）。

## 12.如何触发一个盒子的BFC

1. position为absolute
2. display为inline-block
3. float为left/right
4. overflow为hidden

## 13.margin合并（兄弟元素）

块元素的上下margin也会合并

1. 使用BFC解决，添加一个父元素（是某一个元素的父元素），触发父元素的BFC
2. 一般不解决，不能因为解决bug，而去随意的修改html（结构），结构一动，可能引起一系列问题

## 14.body的margin合并

根据CSS规范，如果html元素没有设置背景色，那么body的背景色会覆盖整个画布（即整个视口）。而如果html元素设置了背景色，那么body的背景色就只覆盖body的内容区域。

```html
<body>
    <div class="warp"></div>
</body>
```

```css
body {
    background-color: red;
}

.warp {
    background-color: white;
    margin-top: 100px;
}
```

## 15.float（浮动模型）

1. float：right的时候。元素会倒序，比如left的时候为123，那么right的时候就是321，但是如果元素比较多的时候，1,2,3,4,5,6,7,8,9，right的时候就是：第一行321、第二行654、第三行987
2. 浮动的基础上可以叠加margin
3. 浮动元素产生了浮动流，所有产生了浮动流元素，后面的元素中，只有块级元素看不到他们（包括父级元素是块级元素也看不到它们，这样就可以解释父元素的高度没有被撑开），产生了BFC的元素（包括使用float产生的BFC，也就是浮动元素可以看到浮动流）和文本类属性的元素（带有inline的）以及文本都能看到浮动元素
4. 让最后一个元素（必须是块级元素）清除浮动（clear: both）可以清除浮动流
5. 浮动元素不会占据父元素的100%，而是由子元素撑开的（即使float元素会自动变成block，宽度也不是100%，也是撑开）
6. 浮动元素会使元素的display变为bloak，但是属性与inline-block很像
7. 浮动元素溢出部分会显示在块盒的上面（z-index），显示在行盒的下面（z-index）

![图解](data:image/png;base64,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)

```html
<div class="clearfix">
  <div class="first">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
</div>
</div>
<div class="two">
    <!--把span元素换成div，ul的溢出部分就会显示在div的上面-->
  <span class="child">hfjdshjakhfhjkdsh</span>
</div>
```

```css
.first{
  width: 100px;
  height: 100px;
  background-color: pink;
  float: left;
  /* opacity: 0.1; */
  height: 100px;
  /* overflow: hidden; */
}
.two {
  width: 100px;
  height: 100px;
  background-color: lightblue;
}
.two .child {
    background-color:white;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
```



## 16.伪元素

<del>伪元素其实一直都存在（），我们只是通过选择器去选择它，然后操作他的样式</del>

伪元素的content属性必须写，哪怕属性值是空字符串

伪元素默认是 inline 元素

## 17.float和position的特点

凡是 设置了position：absolute 或 float：left 、right的元素，打内部把元素转换成block，虽然它是block，但是宽高都是根绝内容撑开的，不会与父元素的宽一样

## 18.文字溢出处理

单行文本

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

多行文本没有更好的办法，至少css2没有更好的办法

## 19.图片代替文字

当网速不好的情况下，放弃下载css和javascript，只下载html，这种情况下，怎样展示文字

```html
<html>
    <head>
        <meta charset="utf-8">
        <title>Document</title>
    </head>
    <body>
        <a href="http://www.taobao.com">淘宝网</a>
    </body>
</html>
```

方法一

```css
a {
    display: inline-block;
    text-decoration: none;
    color: #424242;
    width: 190px;
    height: 90px;
    border: 1px solid black;
    background-image: url(img);
    background-size:190px 90px;
    
    text-indent: 200px; //首行缩进，把文字移出去
    white-space: nowrap;
    overflow: hidden;
}
```

方法二：padding可以展示背景图片

```css
a {
    display: inline-block;
    text-decoration: none;
    color: #424242;
    width: 190px;
    height: 0;
    padding-top: 90px;
    border: 1px solid black;
    background-image: url(img);
    background-size:190px 90px;
    overflow: hidden;
}
```

## 其他注意点

1. <del>行级元素只能嵌套行级元素，块级元素可以嵌套任何元素(在HTML5中不适用了，比如p标签不能嵌套ul标签)</del>
2. p里面不能套块级元素，如果嵌套了，会跟下面一样

```html
<p>
	<div><div>
</p>
```

会变成一下这样

```html
<p></p>
<div><div>
<p></p>
```

3. a 标签里面不能套 a 标签
4. 一旦一个文本类元素里面包含了文字，那么外面的文字就会与元素里面的文字底对齐

以下的样式是文字与 span 的底对齐

```html
<span></span>呵呵
```

```css
span {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: pink;
}
```

以下的样式是，文字与 span 元素里面的文字底对齐

```html
<span>123</span>呵呵
```

```css
span {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: pink;
}
```

5. 调整文字类元素的对齐线

```css
vertical-align: middle;
```

6. 伪元素是两个冒号，写一个冒号也不报错，系统会自动给你加一个





作者：袁进

## style

1. style 写在 head 标签中，主要是想优先加载css文件，先加载html没有样式的话会很丑
2. 为什么推荐使用外部样式表
   1. 解决重复样式多次书写，便于维护
   2. **有利于浏览器缓存**（把样式卸载一个文件里面，缓存之后不需要重新加载）、从而提高页面的响应速度
   3. 有利于代码分离

## 常见的元素声明

font-family：必须在客户端安装了（存在了）该字体，才会生效，所以一般都会设置多个字体，如果第一个字体客户端没有，那就显示第二个字体，依次往后类推。如果客户端是很老很老的电脑，最后在字体加上一个sans- serif（表示如果前面的字体都不存在的话，那计算机随便选一个‘非衬线字体’，每台电脑出厂时都有一个非衬线字体）

text-decoration：给文字加上、中、下 线

text-indent：文字首行缩进，只有块级元素才生效

line-height：多行文本的话，可以设置纯数字（1.5 而不是 1.5em），表示相当于当前元素的字体大小。只用于block元素。只对inline子元素元素有效，对inline-block和block的子元素都无效。子元素为inline-block的时候，基线对齐，但是如果inline-block里面又有inline元素，inline-block会跑到最上面，inline-block里面的inline会居中

![图示](data:image/png;base64,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)

```html
<div class="main">
  <div class="content">
      <!--如果有span,蓝色块会跑上去-->
    <!-- <span>lorem</span> -->
  </div>
</div>
```

```css
.main{
  width: 300px;
  height: 300px;
  line-height: 300px;
  background-color: pink;
}
.main .content{
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: lightblue;
}
```



width：如果是绝对定位元素，宽度为百分比，那么参照最近的定位元素

letter-space：文字间隙

## 选择器

1. 属性选择器：选择包含某个属性的选择器（[attr]、[attr=value]、[attr~=value]、[attr|=value]、[attr^=value]、[attr$=value]、[attr*=value]、ol[type="B" s]、ol[type="c" i]）i是忽略大小写、s是区分大小写

2. 伪类选择器：选中某些元素的某种状态（:hover、:active、:link、visited），如果这四个伪类都要写的话，**必须按照顺序 link、visited、hover、active来写（爱恨法则），link和visited只有a元素才可以使用，因为最开始是link，然后是hover，再是active(鼠标按下)**
3. 伪元素选择器：选中某个伪元素（::before、::after）
4.  相邻兄弟元素选择器 +
5. 后面出现的所有兄弟元素 ~
6. 分组选择器是语法糖，编译后还是会被分开

## <font color="red">层叠（权重计算）</font>

声明冲突：同一个样式多次应用到了同一个元素

层叠：解决声明冲突的过程，浏览器自动处理

一、比较重要性

> 作者样式表：开发者书写的样式

1) 作者样式表中的 !important 样式
2) 作者样式表中的普通样式
3) 浏览器默认样式表

二、比较特殊性

看选择器

总体规则：选择器选中的范围越窄，越特殊

具体规则：通过选择器计算出一个4位数

1. 千位：如果是内联样式，记1，否则记0
2. 百位：等于选择器中所有id选择器的数量
3. 十位：等于选择器中所有类选择器、属性选择器、伪类选择器的数量
4. 个位：等于选择器中所有元素选择器、伪元素选择器的数量

三、比较源次序

代码书写靠后的覆盖靠前的

常用的重置样式表：normalize.css、reset.css、meyer.css

## 继承

子元素会继承父元素的某些css属性

通常，跟文字相关的属性是可以继承的

## <font color="red">属性值的计算过程</font>

页面的渲染过程是一个元素一个元素依次渲染的，顺序按照页面文档的树形目录结构进行

渲染每一个元素的前提条件：该元素的所有css属性必须有值

一个元素，从所有属性都没有值，到所有属性都有值，这个计算过程，叫做属性值计算过程

1. 确定声明值：参考样式表（作者样式表、浏览器默认样式表）中没有长途的声明，作为css属性值
2. 层叠样式冲突：对样式表有冲突的声明使用层叠规则，确定css属性
3. 使用继承：对仍然没有值的属性，若可以继承，则继承父元素的值（强制继承使用 inherit）
4. 使用默认值：对任然没有值的属性，使用默认值

## 两个特殊的css取值

- inherit 继承
- initial 默认值
- normal 正常

## 盒模型

盒子类型：

1. 块盒：display等于block的元素
2. 行盒：display等于inline的元素

盒子的组成部分

无论是行盒、还是块盒，都由以下几个部分组成，从内到外分别是

块盒：

1. 内容content
   1. width、height，设置的是盒子内容的高度
   2. 内容部分通常叫做整个盒子的**内容盒 content-box**
2. 填充（内边距）padding
   1. 盒子边框单盒子内容的距离
   2. padding-top、padding-right、padding-bottom、padding-left
   3. 简写：padding：上 右 下 左
   4. 填充区 + 内容区 = **填充盒 padding-box**
3. 边框border
   1. 边框 =  边框宽度 + 边框样式  + 边框颜色
   2. 边框样式：border-width：上 右 下 左
   3. 边框样式：border-style：上 右 下 左
   4. 边框颜色：border-color：上 右 下 左
   5. 边框 + 填充区 + 内容区 = **边框盒 border-box**
   6. 外边框：outline，外边框是不占用尺寸的
4. 外边距margin
   1. 边框到其他盒子的距离
   2. margin-top、 margin-right、margin-bottom、margin-left
   3. 速写属性：margin：上 右 下 左

盒子边框的颜色如果不设置的话，那么边框的颜色就是文字的颜色

## 盒模型应用

默认情况下：background是包含边框的，但是可以通过background-clip

### 短词规则

word-break，会影响文字在什么位置被截断

normal：普通。CJK字符（文字位置截断），非CJK字符（单词位置截断）

break-all：截断所有，所有字符都在文字处截断

keep-all：保持所有，所有文字都在单词之间截断（空格单词分隔符）

## 行盒盒模型

常见的行盒：包含具体内容的元素一般为行盒

span、em、i、video、strong、img、audio...

padding：水平方向正常，但是垂直方向能显示，只影响背景，不占据空间

border：水平方向正常，但是垂直方向只只能显示边框，但是不会占据空间

**margin：水平方向正常，但是垂直方法完全无效**

line-height：可以影响高度，但是背景不会跟着高度变化，背景还是跟内容一样高

## 行块盒

1. 不独占一行
2. 盒模型中的所有尺寸都有效

## 可替换元素 和 非可替换元素

大部分元素，页面上显示的结果，取决于元素内容，称为**非可替换元素**

少部分元素，页面上显示的结果，取决于元素属性，称为**可替换元素**

可替换元素：img、video、audio、iframe

绝大部分可替换元素为行盒

可替换元素类似于行块盒，盒模型中所有尺寸都有效

可替换元素里面的样式一般是不允许修改的，比如图片，图片的内容样式一般是不允许修改的，不能把黑人变成白人，表单元素一般都是可替换元素

## 常规流

盒模型：规定单个盒子的规则

视觉格式化模型（布局规则）：页面中的多个盒子排列规则

视觉格式化模型，大体上将页面中盒子的排列分为三种当时

1. 常规流
2. 浮动流
3. 定位

### 常规流布局

常规流、文档流、普通文档流、常规文档流都是指一个东西，就是常规流

所有元素，默认情况下，都属于常规流布局

总体规则：块盒独占一行，行盒水平依次排列

包含块（containing block）：每个盒子都有它的包含块，包含块决定了盒子的排列区域

绝大部分情况下：盒子的包含块为其父元素的内容盒

**块盒**

1. 每个块盒的总宽度，必须刚好等于包含块的宽度

宽度的默认值是auto：将剩余空间吸收掉

margin的取值也可以是auto，默认值是0

当margin为auto并且宽度也是auto，那么宽度的auto占绝对优势，会占满包含盒的内容盒

若宽度、边框、内边距、外边距计算后，仍然有剩余空间，该剩余空间被margin-right全部吸收

在常规流中，块盒在其包含块中居中，可以定宽，然后左右margin设置为auto

2. 每个块盒在垂直方向上的auto

margin为auto其实就是0

3. 百分比取值

padding、width、margin

以上所有百分比，相对于包含块的内容宽度，跟高度没有任何关系

高度百分比：

1. 包含块的高度是取决于子元素的高度，子元素高度设置百分比无效，相当于auto
2. 包含块的高度不取决于子元素的高度，子元素高度设置百分比是相对于父元素的高度

4. 上下外边距合并

两个常规流块盒的上下外边距会合并

## 浮动

 应用场景

- 文字环绕

- 横向排列

默认值：none

1. 浮动元素的包含块，和常规流一样，为父元素的内容盒

盒子尺寸

1. 宽度为auto时，表示适应内容宽度
2. 高度为auto时，与常规流一致，适应内容高度
3. margin为auto，为0
4. 边框、内边距、百分比与常规流一样

盒子排列

1. 左浮动盒子靠左靠上排列

2. 右浮动盒子靠右靠上排列

3. 在包含快中排列时，会避开常规流的块盒子

4. 常规流块盒在排列时，无视浮动盒子

5. ```html
   <div class="wrap">
     <div class="conventional"></div>
     <div class="content">1</div>
     <div class="content">2</div>
     <div class="content">3</div>
     <div class="content">4</div>
     <div class="content">5</div>
     <div class="content">6</div>
     <div class="content">7</div>
     <div class="content">8</div>
     <div class="content">9</div>
     <div class="content">10</div>
      <!--<div class="conventional"></div>-->
   </div>
   <style>
       .conventional{
     		height: 50px;
     		background-color: pink
   	}
   	.content {
     		width: 100px;
     		height: 100px;
     		background-color: gainsboro;
     		float: left;
   	}
   </style>
   ```

6. 如果文字没有在行盒中，浏览器会自动生成一个行盒包裹文字，该行盒为匿名行盒

7. 高度坍塌的根源：常规流盒子 的自动高度，在计算时，不会考虑浮动盒子

8. 清除浮动：该元素必须出现在前面所有浮动元素的下方（必须是块盒

9. 浮动盒子里面不会发生margin合并

```html
<div class="wrap">
  <div class="left">测试：</div>
  <div class="right">
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
    <div class="item">aaa</div>
  </div>
</div>
```

```css
.left {
  float: left;
}
.right {
  float: left;
  /* width: 600px; */  /*如果没有这个定宽，right盒子会换行，因为宽度太宽了，left的这一行显示不下*/
}
.right .item {
  float: left;
  width: 80px;
  height: 30px;
  background-color: pink;
  margin: 5px 10px;
}
```

![示例](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0MAAADHCAIAAABUax/rAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAM60lEQVR4nO3df2yV9aHH8edYxNFWu6akYIEiZXiFm10EUTRgZBiJjhgSXJaBBKdIVBqS6siYLm5sLgGjS/hDozMZBozGRIEEJVYhzJli3KwwYaZAbmKqQGkVKKVdEU577h+9cViO7Nuf8j28Xn/BeTiH53z+eudpz3lSmUwmAQAgQpd81ycAAEAvKTkAgFgpOQCAWCk5AIBYKTkAgFgpOQCAWCk5AIBYKTkAgFgNOfeh1ra2zw81HG9u6ezs/C5OCQCA/3fJJZcUf/+KMaOuLCwoOPdoqts9Hlrb2vZ8sn/c2NGlw0vy8vIG8TwBAOiuo6Oj6cujn9Yf/J///q9zY657ydUd+N/vF11x5YjSwT1JAAC+VUNjU/OJlolX/6Db491/T+54c0vp8JJBPDEAAP6D0uElx5tbzn28e8l1dnb6oSoAwAUlLy8v6wcYfHYVACBWA15yp06damxsPHPmzED/RwAAF5vsJVdbW7t06dKDBw+e55l79+69+eab9+7dmyRJW1vb3XffvWLFinOLbdu2bRUVFUuXLp00aVJ9fX2/njwAwEUte8nl5+d//PHHFRUVTzzxxKhRo1Jnueeeew4dOvTWW2+dOHGivr7+9OnTSZIUFBQsXLjwueeeq6yszHr57YEHHpg+ffqSJUtOnDgx8G8KAOCikL3kJk2atHPnzlWrVp04cSKVSm3ZsiWTyWQymcWLFydJsmvXrgcffPD48eNnP2Xu3LkbNmx44403Pvzww7MfLy4uLiwsHDp06OOPPz5t2rRUKjXA7wgA4GKR5R4PXS699NLHHnusoaHhtddeO3ny5KxZs+64447zv9b8+fNvv/32Z555ZsaMGd0OTZs2resPxcXFK1euTJLk6NGjd955Z11d3dtvv33DDTf0x3sBALi4ZLkmd+bMmZdeeun8vyTX7d83NjY2NDQcOXIkk8lUVlYePkt1dfWwYcPWr1/f9dfKysquZzU1Ne3fv7+5uXn37t39+o4AAC4WWUqusbFx06ZN5eXly5cvb2nJ8h103ezZs6eioqKsrKysrOzZZ58tLCy88iwTJkwoKirKy8vr+mthYWHXs6655podO3a88847XT+xBQCgp7KU3OjRozdt2rR9+/avvvqq2728srruuuva2toOHz5cXl6eJElra+usWbO+/oTEfffdN3To0HOv8KVSqcmTJ992223Dhg3rv7cDAHARyf6Jh1QqNXv27BdeeKGoqKinr1hQULBx48bq6uqysrLq6up169aVlpYeOnSoP84WAIB/+9ZvBm5tbX311Vfb29t7+oqpVKqkpGT48OF5eXnDhw8fMWJEUVHR4cOH0+l0n88WAIB/+9aSq6mpWbx48bvvvpskSSaT6ejoGD16dC/+g4KCgquuuqq+vv7kyZN9O1UAAL4h+7eQpNPp9evXT5069dZbbz1w4EA6nf7ss88qKiqWLVuWJMlll122YMGCrL/f1tzcvGzZsilTpkydOrWzs3Pbtm1vvvnm+PHjN2/efOTIkZUrV06ZMuWhhx7qqsM9e/Y0NTXNnDnTr8oBAPRC9mty+/btq66uXrRo0dixY1evXr179+6hQ4dWVVUdPHhw+vTp11577Zo1a4qLi89+Snt7++nTp9esWbNx48aampr777//0KFDTz755Jdffjlx4sTW1taamppjx459/dGHffv2zZ49e86cORs2bBiUdwoAkGuyXJPLZDLPP/98QUHB3Llz29vbn3rqqZdffnnr1q1JksybNy9JkrvuuqvbU9Lp9Lp165qamlavXr1o0aKqqqoFCxZs3rx57NixqVSqtbX1pptuevjhh9Pp9NffOVJSUjJ27NjOzs4pU6YMyjsFAMg1WUounU6PGzeuqqqqvLx8xYoVO3fu3Llz59VXX50kydq1a7ds2TJ+/Pg5c+Z88cUXM2bMGDNmTJIkQ4YMuffee+fPnz916tQkSV5//fWzX7CwsPDpp5+eN2/exIkTb7nllq4HS0tLd+3aNVhvEwAgB6W6fWNczQe1M2+c9t2dDwAAWWSNtG/97CoAABc4JQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAEKss93j4D/5aOyAncsG6pQ/fk2yrcLYKZ6twtgpnq3C2CmergeeaHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKx6U3ItbW2/ffFPo37y49Ss61Ozrv/pqkePHDval0M5zFbhbBXOVuFsFc5W4WwVzlYDrTclt+X9917Z/vYfl1V9/trW5x95dON7O/7w0p8zmUyvD+UwW4WzVThbhbNVOFuFs1U4Ww20VLddaj6onXnjee8a9s17qKU7On72u8fqGxveefqZ4suv6PuhC07/3W/OVudjq3C2CmercLYKZ6twtupXWSNtSK9frrX9X7X76/6yu/ajA3Wdmcyp06f7eCiH2SqcrcLZKpytwtkqnK3C2Wrg9Oanq8daWhb8/tdFc3+06sUXRhSXjCkd2cdDOcxW4WwVzlbhbBXOVuFsFc5WA63H1+TSHR2Va5/8+75P9m14fcLoMUmS/K3un/WNDb0+lMNsFc5W4WwVzlbhbBXOVuFsNQh6fE3ui+bj73+yZ+YPr+0aN5PJpDs6+nIoh9kqnK3C2SqcrcLZKpytwtlqEPS45C7Pzx83suzdf3y0Y9eHdfWf3vWbX76yvbovh3KYrcLZKpytwtkqnK3C2SqcrQZBj0uucFj+2uW/yL/se7c+smzykoXlI0b+auHP+3Ioh9kqnK3C2SqcrcLZKpytwtlqEPT1W0hyX/99+jr32SqcrcLZKpytwtkqnK3CfRffQuJuXQAAsVJyAACxUnIAALFScgAAsVJyAACxUnIAALFScgAAsVJyAACxUnIAALFScgAAser53boAABh07tYFAJBTlBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArIb0+Bl/rR2QE7lg3dKHO17YKpytwtkqnK3C2SqcrcLZauC5JgcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABCr3pRcS1vbb1/806if/Dg16/rUrOt/uurRI8eO9uVQDrNVOFuFs1U4W4WzVThbhbPVQOtNyW15/71Xtr/9x2VVn7+29flHHt343o4/vPTnTCbT60M5zFbhbBXOVuFsFc5W4WwVzlYDLdVtl5oPamfeeN67hn3zHmrpjo6f/e6x+saGd55+pvjyK/p+6ILTf/ebs9X52CqcrcLZKpytwtkqnK36VdZIG9Lrl2tt/1ft/rq/7K796EBdZyZz6vTpPh7KYbYKZ6twtgpnq3C2CmercLYaOL356eqxlpYFv/910dwfrXrxhRHFJWNKR/bxUA6zVThbhbNVOFuFs1U4W4Wz1UDr8TW5dEdH5don/77vk30bXp8wekySJH+r+2d9Y0OvD+UwW4WzVThbhbNVOFuFs1U4Ww2CHl+T+6L5+Puf7Jn5w2u7xs1kMumOjr4cymG2CmercLYKZ6twtgpnq3C2GgQ9LrnL8/PHjSx79x8f7dj1YV39p3f95pevbK/uy6EcZqtwtgpnq3C2CmercLYKZ6tB0OOSKxyWv3b5L/Iv+96tjyybvGRh+YiRv1r4874cymG2CmercLYKZ6twtgpnq3C2GgR9/RaS3Nd/n77OfbYKZ6twtgpnq3C2CmercN/Ft5C4WxcAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKx6frcuAAAGnbt1AQDkFCUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABArJQcAECslBwAQKyUHABCr/wOPlbx3iYIgGQAAAABJRU5ErkJggg==)

## 定位

手动控制元素在包含块中的精准位置

相对定位

margin与reactive的区别：margin也属于盒子模型的一部分，块盒模型会自动占满包容和的内容区（width），如果设置了margin，那么盒子的width会变小，因为margin也需要空间，也说与盒子模型，但是reactive不会

左右冲突一左边为准，上下冲突一上面为准

绝对定位

1.宽度为auto，适应内容

2.包含块变化：找祖先元素中第一个定位元素，该元素的填充盒为其包含块 。若找不到，则他的包含块就是整个网页（初始包含块）

固定定位

其他情况和绝对定位一样

包含块不同：固定为视口（浏览器的可视窗口）

视口与整个网页的区别：视口就是浏览器的可见区域，整个网页是整个html，整个网页的宽高可能比视口的宽高大，此时会出现滚动条

定位下的居中

某个方向居中：

1.定宽（高）

2.将左右（上下）距离（left、right、top、bottom）设置为0

3.将左右（上下）margin设置为0

绝对定位和固定定位中，margin为auto时，会自动吸收剩余空间

多个定位元素重叠时

堆叠上下文：暂时不讲

设置z-index，通常情况下，这个值越大，越靠近用户

只有定位元素设置z-index有效

z-index可以是负数，如果是负数，则遇到常规流、浮动流，会被覆盖

绝对定位、固定定位一定是块盒，宽高根据内容撑开

绝对定位、固定定位元素一定不是浮动，绝对定位、固定定位优先级高于浮动

绝对定位、固定定位没有外边距合并

## 透明

rgba：红 绿 蓝 alpha(阿尔法透明通道0~1)

hex：#红 绿 蓝 透(0~ff)

## 更多伪类选择器

1. first-child：选中第一个子元素

```html
<!DOCTYPE html>
<html lang="cmn-hans">
    <head>
        <meta charset="utf-8">
    <title></title>
    <style type="css/stylesheet">
        a:first-child {
            color:red;
        }
    </style>
    </head>
    <body>
        <div>
            <nav>
                <p>
                    选中a元素，并且a元素必须是第一个子元素，
                    该示例没有满足条件的元素
                </p>
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
            </nav>
        </div>
    </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="cmn-hans">
    <head>
        <meta charset="utf-8">
    <title></title>
    <style type="css/stylesheet">
        a:first-child {
            color:red;
        }
    </style>
    </head>
    <body>
        <div>
            <nav>
                <a href="">此元素满足条件</a>
                <a href=""></a>
                <a href=""></a>
            </nav>
        </div>
    </body>
</html>
```

这样才可以选中第一个a元素

1. last-child：选择最后一个子元素
2. nth-child：选中指定位置的子元素，与first-child和last-child相似（必须是某个元素，且必须是第几个，even偶数，odd奇数）
3. nth-of-type：选中指定的元素中第几个子元素
4. first-of-type：选中子元素中第一个自定类型的元素

```html
<!DOCTYPE html>
<html lang="cmn-hans">
    <head>
        <meta charset="utf-8">
    <title></title>
    <style type="css/stylesheet">
        a:first-of-type {
            color:red;
        }
    </style>
    </head>
    <body>
        <div>
            <nav>
                <p>选中的是子元素中第一个a元素</p>
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
            </nav>
        </div>
    </body>
</html>
```



## 更多伪元素选择器

1. first-letter：选择元素中的第一个字母或文字
2. first-line：选择元素中第一行文字
3. selection：选中被用户框选的文字
4. placeholder：选中placeholder的文字

## 更多的样式

鼠标

cursor：使用图片最为光标的时候，图片一般为.ico或者.cur结尾，auto表示如果浏览器不支持的话，就是用默认的，类似于font-fimily

```css
cursor: url("./imgs/target.ico"), auto;
```

背景

img元素是html的概念

背景图属于css的概念

1.当图片属于网页内容时，必须使用img元素

2.当图片仅用于美化页面时，使用背景

设计的css属性

1. background-image

2. background-repeat

3. background-size

   1. 预设值：contain、cover，类似于object-fit
   2. 数值或百分比

4. background-position

   1. 预设值：center、top、left、right、bottom分别设置横纵向的位置
   2. 百分比或数字：可以为负数

5. background-attachment

   1. 通常用它控制背景图是否固定，当body中的文字特别多的时候，出现滚动条，滚动滚动条的时候，背景图被翻上去了，设置background-attachment: fixed;有点像固定定位一样

   ```css
   body {
       background-image: url("imgs/main_bg.jpg");
       background-repeat: no-repeat;
      	background-size: 100%;
       background-attachment: fixed;
   }
   ```

6. 背景色与背景图可以混在一起用，背景图会在背景色的上面

7. 符合写法

   background: url no-repeat position/size attachment color

