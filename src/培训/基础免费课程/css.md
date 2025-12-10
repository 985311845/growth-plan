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
11. 给 inline 元素设置padding，会有bug，左、右padding没有问题，但是上、下边的padding有问题，其他元素跟看不见该元素的上下padding一样，可以说等于没有上下padding

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
2. 相对定位：relative，也脱离文档流，但是保留原来的位置。相对于自己原来的位置定位的。
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

## 11.margin塌陷（父子元素）

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

1. 使用BFC解决，添加一个父元素（可以是公共的父元素，也可以是某一个元素的父元素），触发父元素的BFC
2. 一般不解决，不能因为解决bug，而去随意的修改html（结构），结构一动，可能引起一系列问题

## 14.float（浮动模型）

1. float：right的时候。元素会倒序，比如left的时候为123，那么right的时候就是321，但是如果元素比较多的时候，1,2,3,4,5,6,7,8,9，right的时候就是：第一行321、第二行654、第三行987
2. 浮动的基础上可以叠加margin
3. 浮动元素产生了浮动流，所有产生了浮动流元素，只有块级元素看不到他们（包括父级元素是块级元素也看不到可门，这样就可以解释父元素的高度没有被撑开），产生了BFC的元素（包括使用float产生的BFC，也就是浮动元素可以看到浮动流）和文本类属性的元素（带有inline的）以及文本都能看到浮动元素
4. 让最后一个元素（必须是块级元素）清除浮动（clear: both）可以清除浮动流
5. 浮动元素不会占据父元素的100%，而是由子元素撑开的（即使float元素会自动变成block，宽度也不是100%，也是撑开）

## 15.伪元素

<del>伪元素其实一直都存在（），我们只是通过选择器去选择它，然后操作他的样式</del>

伪元素的content属性必须写，哪怕属性值是空字符串

伪元素默认是 inline 元素

## 16.float和position的特点

凡是 设置了position：absolute 或 float：left 、right的元素，打内部把元素转换成block，虽然它是block，但是宽高都是根绝内容撑开的

## 17.文字溢出处理

单行文本

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

多行文本没有更好的办法，至少css2没有更好的办法

## 18.图片代替文字

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
   2. 有利于浏览器缓存（把样式卸载一个文件里面，缓存之后不需要重新加载）、从而提高页面的响应速度
   3. 有利于代码分离

## 常见的元素声明

font-family：必须在客户端安装了（存在了）该字体，才会生效，所以一般都会设置多个字体，如果第一个字体客户端没有，那就显示第二个字体，依次往后类推。如果客户端是很老很老的电脑，最后在字体加上一个sans- serif（表示如果前面的字体都不存在的话，那计算机随便选一个‘非衬线字体’，每台电脑出厂时都有一个非衬线字体）

text-decoration：给文字加上、中、下 线

text-indent：文字首行缩进，只有块级元素才生效

lin-height：多行文本的话，可以设置纯数字（1.5 而不是 1.5em），表示相当于当前元素的字体大小，值对inline元素有效，对inline-block和block都无效，inline-block的时候，基线对齐，但是如果inline-block里面又有inline元素，inline-block会跑到最上面，inline-block里面的inline会居中

width：如果是绝对定位元素，宽度为百分比，那么参照最近的定位元素

letter-space：文字间隙

## 选择器

1. 属性选择器：选择包含某个属性的选择器（[attr]、[attr=value]、[attr~=value]、[attr|=value]、[attr^=value]、[attr$=value]、[attr*=value]、ol[type="B" s]、ol[type="c" i]）i是忽略大小写、s是区分大小写

2. 伪类选择器：选中某些元素的某种状态（:hover、:active、:link、visited），如果这四个伪类都要写的话，**必须按照顺序 link、visited、hover、active来写，link和visited只有a元素才可以使用，因为最开始是link，然后是hover，再是active(鼠标按下)**
3. 伪元素选择器：选中某个伪元素（::before、::after）
4.  相邻兄弟元素选择器 +
5. 后面出现的所有兄弟元素 ~
6. 分组选择器是语法糖

## 层叠（权重计算）

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

## 属性值的计算过程

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
4. 外边距margin
   1. 边框到其他盒子的距离
   2. margin-top、 margin-right、margin-bottom、margin-left
   3. 速写属性：margin：上 右 下 左

盒子边框的颜色如果不设置的话，那么边框的颜色就是文字的颜色
