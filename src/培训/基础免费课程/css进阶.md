# @规则

@import "路径"：在css文件中导入另一个css文件

@charset "utf-8"：告诉浏览器，该css文件，使用的字符编码集是utf-8，该指令必须写在css文件的最上面，否则会报错

# web字体和图标

## web字体

解决用户电脑上没有安装相应字体的时候，强制让用户下载该字体

（从我们的网站上下载该字体，临时安装、关闭浏览器就没了）

制作一个新字体：字体一般用.ttf文件，但是为了兼容不同的客户端，使用多个字体：.ttf\.woff等等

```css
@font-face{
    font-family: "good night";
    src:url("./font/晚安体.ttf")
    src:url("./font/晚安体.woff")
}
/*使用字体*/
p {
    font-family: "good night"
}
```

## 字体图标

国内做的做好的是：iconfont.cn（阿里巴巴矢量图标库） 

# 块级格式化上下文

Block Formatting Context 简称 BFC

BFC渲染区域：

这个区域由某个HTML元素创建，以下元素会在其内部创建BFC区域（部分）：

- 根元素：意味着html元素创建的BFC区与，覆盖了网页中所有元素
- 浮动和绝对定位元素/固定定位
- overflow不等于visible的块盒
- 浮动元素
- display等于inline-block

同一个和bfc中的子元素才会出现外边距合并，不同的bfc中的元素外边距是不会合并的（创建bfc的元素，不会和它的子元素进行外边距合并）

# 布局

## 多栏布局

```html
<div class="main">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

```css
.main {
    width: 90%;
    height: 50px;
    background-color: lightblue;
    margin: 0 auto;
    background-clip: content-box;
}
.main .left {
    width: 250px;
    height: 50px;
    background-color: lightcoral;
    float: left;
}
.main .right {
    overflow: hidden;
    height: 50px;
    background-color: lightpink;
}
```

```html
<body>
    <div class="right"></div>
    <div class="left"></div>
</body>
```

```css
.right {
    width: 300px;
    height: 50px;
    background-color: pink;
    float: right;
}
.left {
    height: 50px;
    background-color: lightblue;
    margin-right: 300px;
}
```

传统的等高布局

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .clearfix::after {
            content: "";
            display: block;
            clear: both;
        }

        * {
            margin: 0;
            padding: 0;
        }

        .main {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
        }

        .main .left {
            width: 300px;
            height: 10000px;
            margin-bottom: -9990px;
            background-color: pink;
            float: left;
        }

        .main .right {
            margin-left: 300px;
            background-color: lightblue;
        }
    </style>
</head>

<body>
    <div class="main clearfix">
        <div class="left"></div>
        <div class="right">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, ut? Quos et consequuntur delectus natus
            earum saepe deleniti aut, odit laboriosam sint asperiores rem tempore accusantium, veniam aperiam laborum
            consectetur.
            Maxime deserunt voluptatibus perferendis placeat doloremque a corrupti illum in omnis expedita
            necessitatibus sint ad nulla dolorum recusandae beatae assumenda voluptas debitis illo, veniam similique
            earum eaque rerum. A, dolorum?
            Minima vero reprehenderit quibusdam est tempora natus rem laudantium, architecto accusantium labore fuga
            vitae dicta nobis voluptatibus perferendis nulla! Ratione, blanditiis a? Provident blanditiis velit nihil
            esse vitae! Incidunt, distinctio.
            Velit, non modi in culpa eveniet ratione nihil consectetur numquam, aperiam mollitia nulla ea dolores illum
            animi error a quaerat eligendi consequatur iusto recusandae inventore placeat, totam possimus asperiores?
            Architecto.
            Quo illo reprehenderit enim consectetur ipsum dolor magnam neque amet voluptates, nihil quaerat rerum modi
            quisquam harum qui itaque veniam nesciunt, officia culpa! A ipsum asperiores commodi? Omnis, officia iure.
            Similique dolores a laudantium qui illum dolore incidunt sit dolor illo dolorem aliquid saepe dicta eveniet
            neque cum nisi iure modi, doloribus error itaque mollitia repellat. Maxime quae omnis beatae.
            Tempora beatae doloremque voluptate optio deserunt placeat laborum reiciendis ipsam tempore dolore
            architecto sit odio, incidunt minima! Molestiae, voluptas eligendi ipsum consequuntur cum hic fugiat ab
            voluptate tenetur magnam labore?
            Eligendi illo aut autem eos asperiores, ipsum deserunt aspernatur impedit error atque corrupti.
            Reprehenderit aliquid eos repellendus numquam culpa modi nobis magni. Culpa sequi numquam ipsa cupiditate
            similique quasi sapiente!
            Quod, aspernatur ut delectus harum cumque est neque voluptas quidem ratione tenetur. Ad eos veritatis
            explicabo. Corporis a cum unde et sit, iure fugiat. Nulla, quas? Ullam molestiae laborum obcaecati?
            Velit, dolor. Minima ratione illo, accusantium earum reiciendis aut fugiat deserunt autem explicabo,
            inventore minus aperiam distinctio numquam unde. Temporibus cupiditate magni blanditiis molestias quae
            autem, tempora corporis amet dicta!
            Eos, earum distinctio! Omnis aliquam, vel earum laboriosam at excepturi aliquid recusandae. Eligendi sit
            deserunt vitae molestias natus unde, officiis autem minus architecto ipsa reprehenderit blanditiis. Atque
            accusamus veritatis minus?
            Nemo placeat itaque minima beatae libero asperiores voluptatibus dolorum natus consectetur, eveniet repellat
            at ullam quasi amet cupiditate sunt? Exercitationem molestias nulla placeat minus facere debitis incidunt
            adipisci, labore excepturi?
            Delectus, velit sequi, magnam, vitae culpa magni voluptates itaque libero nisi deserunt aliquid natus rem.
            Ex molestias debitis in impedit laborum! Quisquam, vitae expedita a eum voluptas quam incidunt doloremque.
            Modi accusamus quaerat nesciunt voluptatem repellendus nihil repellat, magnam officiis rerum ab ipsum velit
            laboriosam ad. Blanditiis expedita ab vitae fugiat beatae. Pariatur possimus, dicta perspiciatis ullam
            libero molestias quisquam!
            Adipisci voluptates reprehenderit nihil a nulla soluta aspernatur, architecto error ut totam explicabo quam
            iste dolorem unde, odit temporibus, aliquid quia non ipsam similique nesciunt deleniti. Accusantium odit sit
            eos.
            Eum perferendis magnam eos in sunt. Earum, saepe. Nisi beatae, saepe perferendis eius reprehenderit velit
            esse nesciunt. Illum iure commodi nulla eius, dignissimos magnam sint magni rem nemo. Pariatur, placeat.
            Veritatis vero, dolorem pariatur commodi harum possimus laborum temporibus! Odit debitis unde molestiae
            harum ullam perspiciatis nemo sed accusamus expedita voluptatum? Repudiandae quos hic neque aliquid
            deleniti, sit mollitia possimus.
            Nulla sapiente cupiditate dicta culpa aliquam quo. Fugit illum hic doloribus et voluptas rerum laborum
            dolorum magnam blanditiis provident magni velit odit quam commodi, nulla iste, quis similique, accusamus
            quia?
            Quis neque, repellendus asperiores enim repellat libero quasi iure perferendis laboriosam debitis earum
            ducimus consectetur sunt magnam praesentium possimus voluptatem dolor labore provident aperiam! Facilis rem
            voluptates quis est explicabo?
            Odio vero eaque, atque similique ratione rerum nisi amet, accusantium, voluptates nam omnis non dignissimos
            cumque pariatur quod eveniet optio enim voluptatem! Dolorem perspiciatis repellat ea aspernatur, quis fuga
            minus!
            Reprehenderit vitae in fuga nesciunt? Neque, maxime. A harum esse qui, rem, veniam architecto iusto quasi
            omnis unde amet placeat fugit suscipit. Minus, accusamus suscipit reiciendis enim debitis nulla vero!
            Eaque alias debitis, quam magnam eum odio quia eos adipisci. Repellendus delectus in expedita rem dolorem,
            impedit consectetur eveniet cumque. Id pariatur eligendi error autem sit! Vitae quas ut facere.
            Porro quos et quae mollitia in, laudantium nostrum pariatur natus! Vitae nulla mollitia ullam ut quo eaque
            eligendi eveniet doloribus aspernatur nihil odio consequatur sit facilis omnis, incidunt placeat suscipit.
            Quaerat rerum quasi excepturi veniam. Consequuntur non at amet quisquam tempora impedit expedita fuga eum
            aperiam dignissimos, enim doloribus veniam. Nam similique est doloribus illum dolore quam quibusdam
            dignissimos magnam!
            Necessitatibus hic dolorum ea, explicabo atque in et laborum expedita ipsa repellendus asperiores neque,
            consectetur ut, perferendis esse aliquid. Corporis sint dicta quod aliquid et eligendi cumque ab magni
            autem?
            Molestiae sequi distinctio alias architecto recusandae laudantium ratione mollitia ducimus impedit nihil
            omnis ullam nemo quo quidem iusto nesciunt excepturi, placeat amet doloribus incidunt laboriosam. Possimus a
            vel atque quasi.
            Minima sint hic, asperiores quam sit rem itaque. Aliquam rem aspernatur saepe ipsa quod excepturi, aperiam
            quo quam reprehenderit animi quis natus non molestias praesentium voluptas, facere nam fuga recusandae!
            Veritatis, quis expedita earum eius nam accusamus, placeat repudiandae sint voluptas cum, architecto quod.
            Pariatur, modi? Non explicabo adipisci animi vero cum impedit totam officiis ab vel voluptatem! Error,
            quaerat.
            Distinctio nesciunt rem est nisi quia quibusdam, iure aliquid, ex eaque atque veniam ullam, repellendus
            dolorem voluptas illum inventore accusantium. Earum alias, accusantium officiis sapiente obcaecati explicabo
            quis tempore distinctio.
            A consequuntur amet odit est nihil maiores facere. Dignissimos, hic nihil veniam est quae ipsam deserunt
            recusandae alias praesentium cum ut sequi itaque ad soluta facere, distinctio suscipit, ullam debitis.
        </div>
    </div>
</body>

</html>
```

# 行高

先计算像素值，再继承

```html
<div class="container">
  <p class="p1">
      hfjdhkjshajhfkhdjkhsahjhfjdhshafgfdsgfdsgfd
    	hdjshajkhfkhfdsaljk
    </p>
  <p class="p2">  									   fhjkdsahjkhfjklhdskalkjjfgfdsgfdsgfdsgfdsg			
  sgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfdsgfds
    ggfdsgfdhdhkshahkfdkjhskjahkjhfjkhdjshajk
    </p>
</div>

```

```css
.container {
  line-height: 2em;
}
.p1 {
  font-size: 40px;
}
.p2 {
  font-size: 14px;
}

```

先计算container的font-size的值为16px（基准字体大小），再继承container的line-height

有单位的话是先计算，再继承

没有单位的话是先继承，再计算

# body背景

**画布 canvas **

不是html5里面的canvas

特点：

1. 最小宽度为视口宽度
2. 最小高度为视口高度

**HTML元素的背景**

覆盖画布

**BODY元素的背景**

如果HTML元素有背景，body元素正常，背景覆盖变样盒

如果HTML元素没有背景，body元素的背景覆盖背景

**关于画布背景图**

1. 背景图的宽度百分比，相对于视口
2. 背景图高度百分比，相对于html元素
3. 背景图的横向位置百分比、预设值都是相对于视口
4. 背景图的纵向位置百分比、预设值都是相对于文档高度

# 行盒的垂直对齐

## 多个行盒垂直方向上的对齐

vertical-align

## 图片的地步白边

图片的父元素是一个块盒，块盒的高度自动，图片底部和父元素底边之间往往会出现空白

1. 设置父元素的font-size为0
2. 将图片设置为块盒（行块盒都不行）

# 参考线-深入理解字体

## 文字

通过文字自作软件做出来的，比如：fontforge

制作文字时，会有几根参考线，不同的文字类型，参考线是不一样的。同一种文字类型，参考线是一样的

## font-size

字体大小，设置的是文字的相对大小

文字的相对大小：金属框尺寸和文字尺寸之间的相对大小，1000、2048、1024，金属框为1000的时候，字体多大，金属框为2048的时候，字体多大

  文字顶线到底线的距离，是文字的实际大小（content-area，内容区），**行盒背景覆盖content-area**

## 行高

顶线向上延伸的空间，和底线向下延伸的空间，两个空间相等，该空间叫做gap，gap默认情况下，是字体设计者决定的

top到bottom之间的距离叫做virtual-area（虚拟区）

行高就是virtual-area

line-height：normal；默认值，使用文字默认的gap

>  文字一定出现在一行的最中间-----是错误的

> content-area一定出现在virtual-area的最中间----是正确的

## vertical-align

决定参考线：font-size、font-family、line-height

一个元素如果子元素出现了行盒，该元素内部也会产生参考线

baseline：该元素的基线与父元素的基线对齐

super：该元素的基线与父元素的上基线对齐

sub：该元素的基线与父元素的下基线对齐

text-top：该元素的virtual-area的顶边，对齐父元素文本的text-top

text-bottom：该元素的virtual-area的底边，对齐父元素 的text-bottom

top：该元素的virtual-area的顶边，对齐父元素的顶边（该行中的最高顶边）

bottom：该元素的virtual-area的底边，对齐父元素的底边（该行中的最低底边）

middle：该元素的中线（content-area的一半），与父元素的X字母高度一半的位置对齐

行盒组合起来，可以形成多行，每一行的区域叫做line-box，line-box的顶边是该行内所有行盒最高顶边，line-box的底边是该行内所有行盒最低底边

实际，一个元素的实际占用高度，高度的计算通过line-box

行盒：inline-box

行框：line-box，每一行都有一个行框

数值：相对于基线的偏移量，向上为正数，向下为负数

百分比：相对于基线的偏移量，百分比相对于自身virtual-area的高度

line-box是承载文字内容的必要条件，以下情况不生成行框：

- 某元素内部没有任何行盒
- 某元素字体大小为0

## 可替换元素和行块盒的基线

图片：基线位置位于图片的下外边距

解决白边：font-size：0、diaplay：block

表单元素：基线位置在内容的底边

行块盒：

1. 行块盒最后一行有line-box，用最后一行的基线作为整个行块盒的基线。
2. 如果行块盒内部没有行盒，则使用下外边距作为基线。

# 堆叠上下文

堆叠上下文（stack context），他是一块区域，这块区域由某个元素创建，他规定了该区域中的内容在Z轴上的排列先后顺序

##  创建堆叠上下文的元素

1. html元素
2. 设置了z-index（非auto）数值的定位元素

##  同一个堆叠上下文中元素在Z轴上的排列

从后到前的排列顺序：

1. 创建堆叠上下文的元素的背景和边框
2. 堆叠级别（z-index）为负值的堆叠上下文
3. 常规流非定位的块盒
4. 非定位的浮动盒
5. 常规流非定位行盒
6. 任何z-index 是 auto 的定位子元素，以及 z-index 是 0 的堆叠上下文
7. 堆叠级别为正值的堆叠上下文

```html
<!DOCTYPE html>
<html lang="cmn-hans">
<head>
    <meta charset="utf-8">
    <title>堆叠上小文</title>
    <style>
        html {
            background-color: lightblue;
        }
        .container {
            width: 300px;
            height: 300px;
            background-color: lightcoral;
            margin-left: 100px;
            margin-top: -20px;
        }
        .item {
            width: 200px;
            height: 200px;
            background-color: lightgoldenrodyellow;
            margin-left: -60px;
            position: relative;
            z-index: -1;
        }
        .float {
            float: left;
            width: 100px;
            height: 100px;
            background-color: lightgrey;
            margin-top: -180px;
            margin-left: 50px;
        }
        .inlineBox {
            width: 150px;
            height: 150px;
            background-color: lightskyblue;
            margin-top: -300px;
        }
        .pauto {
            width: 150px;
            height: 150px;
            background-color: lightsteelblue;
            position: relative;
            z-index: 0;
            margin-top: -290px;
            margin-left: 130px;
        }
        .ppositive {
            width: 120px;
            height: 120px;
            background-color: rgb(2, 107, 243);
            position: relative;
            z-index: 1;
            margin-top: -140px;
            margin-left: 140px;
        }
    </style>
</head>
<body>
    <span class="inlineBox">fhdshajkhfkhdkjls</span>
    <div class="container">
        <div class="item"></div>
    </div>
    <div class="float"></div>
    <div class="pauto"></div>
    <div class="ppositive"></div>
</body>
</html>
```



每个堆叠上下文独立于其他堆叠上下文，它们之间不能相互穿插

# svg

可缩放矢量图

- 该图片使用代码书写而成
- 缩放不会失真
- 内容轻量

## 怎么使用

svg可以嵌入浏览器，也可以单独成为一个文件

xml语言，svg使用该语言定义

## 书写svg代码

矩形：rect

圆形：circle

椭圆：ellipse

线条：line

折线：polyline

多边形：polygon

路径：path

M：moveto

L：lineto

H：horizontal lineto

V：vertical lineto

C：curveto

S：smooth curveto

Q：quadratic Belzier curve

T：smooth quadratic Belzier curveto

A：elliptical Arc

Z：closepath



A：

半径1   

半径2  

顺时针旋转角度

  小弧（0）大弧（1）

 顺时针（1）逆时针（0） 

结束点左边

```svg
<svg style="background: grayl" width="500" height="1000" xmlns=""></svg>
```

```svg
<svg
  style="background: #ccc"
  width="500"
  height="1000"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- <rect
    width="100"
    height="100"
    x="100"
    y="100"
    fill="red"
    stroke="#000"
    stroke-width="5"
  ></rect>
  <circle
    cx="200"
    cy="400"
    r="50"
    fill="#008c8c"
    stroke="#000"
    stroke-width="5"
  ></circle>
  <ellipse rx="80" ry="30" cx="200" cy="500" fill="red"></ellipse>
  <line x1="10" y1="10" x2="20" y2="20" stroke="#000" stroke-width="3"></line>
  <polyline
    points="300,100,350,100,350,150,400,150,400,200"
    fill="transparent"
    stroke="#000"
    stroke-width="5"
  ></polyline>
  <polygon
    points="300,300,400,400,300,500"
    fill="none"
    stroke="#000"
    stroke-width="5"
  ></polygon>
  <path d="M150 600 L300 600 L300 800 L150 800 Z" fill="none" stroke="#000"
    stroke-width="5"></path> -->
    <!--扇形-->
  <path d="M0 150 A150 150 0 0 1 150 0 L150 0 150 150 Z" fill="none" style="stroke:#000;stroke-width:3"></path>
</svg>

```

画一个八卦

```svg
<svg
  style="background: #ccc"
  width="500"
  height="500"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="250" cy="250" r="250" fill="#eee" stroke="#eee"></circle>
  <path
    d="M250 0 A125 125 0 1 0 250 250 A125 125 0 1 1 250 500 A250 250 0 0 1 250 0"
    fill="#000"
    stroke="#000"
  ></path>
  <path
    d="M250 0 A125 125 0 1 0 250 250 A125 125 0 1 1 250 500 A250 250 0 0 0 250 0"
    fill="#fff"
    stroke="#000"
  ></path>
  <circle cx="250" cy="125" r="50" fill="#000"></circle>
  <circle cx="250" cy="375" r="50" fill="#fff"></circle>
</svg>

```

# 数据链接

 data url

## 如何书写

数据链接：将目标文件的数据直接书写到路径的位置，如base64格式的img

语法：data:MIME,数据

```html
<link rel="stylesheet" href="data:text/css,h1{color:blue}"/>
```

## 意义：

优点：

1.减少了浏览器中的请求

2.有利于动态生成数据

缺点：

1.增加了页面内容，增加了资源体积，导致了传输内容增加，从而增加了单个文件的传输时间

2.不利于浏览器的缓存，浏览器通常会缓存css、js、img文件

3.会增加原资源的体积到原来的4/3

应用场景：

1.当请求单个图片体积较小，并且该图片因为各种原因，不适合制作雪碧图，可以使用数据连接

2.图片由其他代码动态生成，并且图片较小，可以使用数据连接

3.凡是可以书写url的地方都可以写数据连接

## base64

一种编码方式

通常用于将一些2进制数据，用一个可书写的字符串表示

```html
<link rel="stylesheet" href="data:text/css;base64,aDN7Y29sb3I6cmVkO30=">
```

# 浏览器兼容性

## 厂商前缀

> 比如：box-sizing，谷歌旧版本中使用-webkit-box-sizing：border-box

不是标准的属性（该浏览器独有的属性），或者标准没有正式发布

IE：-ms-

Chrome、safari：-webkit-

opera：-o-

firefox：-moz-

```html
<div></div>
```

```css
div {
    border:1px solid;
    width: 200px;
    height: 200px;
    padding: 50px;
    box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
```

浏览器特有的样式：

1.谷歌浏览器的滚动条样式，只有谷歌浏览器支持

```css
div:-webkit-scrollbar{
    /**滚动条的整体样式**/
}
div::-webkit-scrollbar-thumb{
    /**滑块样式**/
}
div::-webkit-scrollbar-track{
    /**轨道样式**/
}
div::-webkit-scrollbar-button{
    /**两端的按钮样式**/
}
```

实际上，在开发中使用自定义的滚动条，往往是使用div+css+js实现的

2.多个背景图中选一个作为背景

```css
div {
    width:500px;
    height:500px;
    background-image:image-set(url() 1x,url() 2x)
}
```

1x\2x表示一个像素有多少个显像单元

## css hack

根据不同的浏览器（主要针对IE）设置不同的样式和元素

1.样式

IE中，css的特殊符号

*属性，兼容IE5、IE6、IE7

```css
div {
    *background: red;
}
```

_属性，兼容IE5~IE6

```css
div {
    _background: red;
}
```

属性值\9，兼容IE5~IE10

```css
div {
    background: oringe\9;
}
```

属性值\0，兼容IE8~IE10

```css
div {
    background: yellow\0;
}
```

属性值\9\0，兼容IE9~IE10

```css
div {
    background: yellow\9\0;
}
```

> IE5、6、7的外边距bug，浮动元素的做外边距翻倍

```css
margin-left: 30px;
*margin-left: 15px;
```

2.条件判断

```html
<!--[if IE]>
	<p>
		这是IE浏览器
	</p>
<![endif]-->
<!--[if !(IE)]><-->
<p>
    这是其他浏览器
</p>
<!--<![endif]-->
```

有些html元素IE识别不了

## 渐进增强 和 优雅降级

两种解决兼容性问题的思路，会影响代码的书写风格

- 渐进增强：先适应大部分浏览器，然后针对新版本浏览器加入新的样式（书写代码时，先尽量避免书写有兼容性的代码，完成之后，再逐步加入新标准中的代码）
- 优雅降级：先制作完整的功能，然后正对低版本浏览器进行特殊处理（书写代码时，先不用特别在意兼容性，完成整个功能之后，再针对低版本浏览器处理样式）

## caniuse

查找css兼容性

[caniuse.com](https://caniuse.com/)

# 居中总结

居中：盒子在其包含块居中

## 行盒（行块盒）水平居中

行盒一定是常规流，浮动、定位会自动block

直接设置行盒（行块盒）父元素text-align：center

## 常规流块盒水平居中

定宽，设置左右margin为auto

## 绝对定位元素的水平居中

定宽：设置左右的坐标为0，将左右margin设置为auto

> 实际上，固定定位是绝对定位的特殊情况，所以跟绝对定位的居中方式是一样的

## 浮动元素

没有更好的办法，只能一点一点调，直到看上去居中

## 单行文本的垂直居中

设置line-height为元素的高度

## 行块盒或块盒内，多上文本的垂直居中

没有完美方案，设置 padding，达到类似垂直居中，缺点就是盒子的高度不能确定

## 绝对定位的垂直居中

定高：设置上下的坐标为0，将上下margin设置为auto

# 样式补充

## display：list-item

设置为该属性值的盒子，本质上任然是一个块盒，但同事给盒子会附带另一个盒子，元素本省的盒子叫主盒子，附带的盒子为次盒子，主盒子和次盒子水平排列，ul>li的diaplay就是list-item

设计的css：

1.```list-style-type```：设置次盒子的类型

2.```list-style-position```：设置次盒子相对于主盒子的位置

3.```list-style```：速写属性

**清空次盒子**

```list-style: none;```

## 图片失效时的宽高问题

如果img元素的图片链接无效，img元素的特性和普通行盒一样，无法设置宽高

## 行盒中包含行块盒或可替换元素

行盒的高度与它内部的行块盒或可替换元素的高度无关，只跟字体大小有关系

## text-align：justify

除最后一行外，分散对齐

如果最后一行也要分散对齐

```css
p{
    width:200px;
    height:200px;
    text-align:justify;
}
p::affter{
    content:"";
    display:inline-block;
    width: 100%;
}
```

## direction he writing-mode

开始 start -> 结束 end

左 left -> 右 end

开始和结束时相对的，不同国家有不同习惯

左右时绝对的

direction设置的是开始到结束的方向

```css
p {
    direction: rtl;
}
```

writing-mode：设置文字书写方向

```css
p {
    /**垂直书写，从右向左**/
    writing-mode: vertical-rl;
}
```

## utf-8

```css
p::after{
    content:"\x80E1\x67AB"
}
```

