

## 选择器嵌套和&符号

<font color='red'>& 符号的作用相当于拼接的意思，就是把 & 符号后面的选择器或者字符串拼接到上一级选择器上</font>

```scss
.content {
    width: 1200px;
    margin: 0 auto;

    a {
        color: #333;

        &::hover {
            text-decoration: underline;
            color: #f00;
        }
    }

    .top {
        border: 1px solid #f0f0f0;

        &-left {
            float: left;
            width: 200px;
        }
    }
}
// 转成css之后就是
.content {
  width: 1200px;
  margin: 0 auto;
}
.content a {
  color: #333;
}
.content a::hover {
  text-decoration: underline;
  color: #f00;
}
.content .top {
  border: 1px solid #f0f0f0;
}
.content .top-left {
  float: left;
  width: 200px;
}
```

## 相同属性前缀单独提取出来（简称属性嵌套）

<font color='red'>相同属性的前缀可以单独提取出来</font>

```scss
// 相同属性的前缀可以单独提取出来
.content {
    a {
        font-size: 16px;
        font-weight: 600;
        font-family: 'Courier New', Courier, monospace;
    }
}

// 可写成一下形式
.content {
    a {
        // 属性嵌套的时候，属性后面的冒号，与大括号之间必须有空格，比如：font: {}
        font: {
            size: 16px;
            weight: 600;
            family: 'Courier New', Courier, monospace;
        }
    }
}
```

## 继承-占位符选择器 %foo 必须通过 @extend来使用

<font color='orange'>有时，需要定义一套样式并不是给某个元素使用，而是通过@extend指令使用，尤其是在制作Sass库的时候，希望Sass能够忽略用不到的样式</font>

```scss
.button%base{
    display:inline-block;
    margin-bottom:0;
    font-weight:normal;
    text-align:center;
}
.btn-default {
    @extend %base;
    color:#333;
    background-color:#fff;
    border-color:#ccc;
}
.btn-success {
    @extend %base;
    color: #333;
    background-color: #fff;
    border-color: #f00;
}
// 编译之后的css
.button.btn-success, .button.btn-default {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
}

.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.btn-success {
  color: #333;
  background-color: #fff;
  border-color: #f00;
}
```

## Sass的注释

1. Sass的单行注释不会被编译到css文件里面（使用双斜线表示单行注释）
2. Sass的多行注释会被编译到css文件里面（使用/* */表示多行注释）

## Sass和css中的变量

#### css变量

```css
// 在css中定义变量的方式：使用两个横杆来声明变量（--）
// :root是一个伪类，表示文档根元素，除了IE7及更早版本不支持之外，其他主流浏览器基本都支持
// 变量的作用域：只能在变量声明的选择器以及子元素中使用该变量
// :root中声明的变量可以再全局中使用
:root {
    --color: #f0f0f0;
}
// body中声明的变量只能在body或其子元素中使用
body {
    --border-color: #f2f2f2;
}
// 比如在 .header中生命的变量只能在header选择器里面使用或者在header的后代选择其中使用
.header {
    --background-color: #f8f8f8;
}

// 变量的使用
p {
    color: var(--color);
    border-color: var(--border-color);
}
.header {
    background-color: var(--background-color);
}
```

#### Sass变量

Sass中的变量使用 <font color='red'>$</font> 符号来声明,变量定义规则如下：

1. 变量以美元符号（$）开头，后面跟变量名
2. 变量名是不以数字开头的可包含字母、数字、下划线、横线
3. 写法同css一样，即变量个值之间用 （:）冒号分隔
4. 变量必须先定义后使用

#### Sass变量值的类型

支持6种主要的数据类型

+ 数字：纯数字、百分号、css部分单位（px、pt、in....）
+ 字符串，有引号字符串与无引号字符串，"foo"、"bar"、baz
+ 颜色，blue、#f2f2f2、rgba()
+ 布尔值
+ 空值，null
+ 数组，用空格或者逗号分隔，1.5rem 1em 0 2em
+ maps，相当于javascript中的Object，（key：value）



```scss
$color: #f00;
$border-color: #f2f2f2;
$border-width: 1px;
.content {
    color:$color;
}
```

变量的作用域：局部变量、全局变量

```scss
// 全局变量
$color: red;  //直接再全局环境下定义
.content {
    $font-size: 12px !global;  //局部变量中加上 !global 标识
    font-size: $font-size;
}
p {
    font-size: $font-size;
}
//
```

默认值

```scss
$color: #333 !default;  // 使用  !default 表示默认值
$color: #333;
p {
	color: $color; // 如果已经声明且赋值了，就用已经赋值的值，如果为声明或者未赋值，就用默认值
}
```

## Sass的引入

sass拓展了@import的功能，允许其导入scss文件。被导入的文件将合并编译到一个css文件中，另外，被导入的文件中所包含的变量或者混合指令（mixin）都可以在导入的文件中使用。

#### 例如

public.scss

```scss
$font-base-color: #333;
```

在index.scss里面使用

```scss
@import 'public.scss';
// 或者
@import 'public';
$color: #666;
.content {
    border-color: $color;
    color: $font-base-color;
}
```

#### 注意：跟我们普通的css里面的@import的区别，如下几种方式都将作为普通css语句，不会导入任何scss文件

1. 文件拓展名是 .css;
2. 文件名以 http(s)://开头；
3. 文件名是 url();
4. @import 包含media queries(媒体查询)；

```scss
@import "public.css";
@import url(public);
@import "http://xxxx.com";
@import 'landscape' screen and (orientation:landscape);
```

## Sass局部文件

局部文件需要以下划线开头，在开发中作为模块来写。局部文件不会被编译成css文件，只是在主文件中引用而已。

## Sass混入

基础混入

```scss
@mixin name {
    display: flex;
    justify-content: center;
    align-items: center;
}
.content {
    @include name;
}
```

选择器嵌套混入

```scss
@mixin name {
    .header{
        display: flex;
    	justify-content: center;
    	align-items: center;
    }
}
.content {
    @include name;
}
```

带参数

```scss
//如果只有一个参数的话，直接传值就行
@mixin name($top,$right,$bottom,$left) {
    padding-top: $top;
    padding-right: $right;
    padding-bottom: $bottom;
    padding-left: $left;
}
// 指定默认值
@mixin name($top:0,$right:0,$bottom:0,$left:0) {
    padding-top: $top;
    padding-right: $right;
    padding-bottom: $bottom;
    padding-left: $left;
}
.content {
    @include name($top:10px,$right:20px,$bottom:30px,$left:40px)
}
// 或者
.content {
    @include name(10px,20px,30px,40px);//这样的话就需要按照顺序一一对应
}
```

高级用法：剩余参数

```scss
@mixin linear-gradient($direction,$gradients...){
    background-color: nth($gradients,1);
    background-image: linear-gradient($direction,$gradients);
}
.content{
    @include linear-gradient(to right,#f00,orange,yellow);
}
```

#### 总结

+ mixin是可以重复使用的一组css声明；
+ mixin有助于减少重复的代码，只需声明一次就可以在文件中使用；
+ 混合指令可以包含所有的css规则，绝大部分scss规则，甚至通过参数功能引入变量，输出多样化的样式；
+ 使用参数是建议加上默认值；

## Sass中的运算符

sass中的运算符包括 +、-、*、/、%、 ==、!=、>、<、>=、<=、and（并且）、or（或者）、not（取反）；

```scss
$theme: 8;
.content {
    @if $theme >= 5 {
        background-color: red;
    }
    @else {
        background-color: blue;
    }
}
```

以下三种情况/号将被视为除法运算

+ 如果值或值的一部分，是变量或者是函数的返回值
+ 如果值被圆括号包裹
+ 如果值是算数表达式的一部分

```scss
$width: 1000px;
div {
  font: 16px/30px Arial,Helvetica,sans-serif; //不运算
  width: ($width/2); // 使用变量与括号
  z-index: round(10)/2; //使用了函数
  height: (500px/2); // 使用了括号
  margin-left:5px + 8px/2px; //使用了+表达式
}
```

总结

+ % 与 单位不能一起运算
+ 纯数字与百分号或单位运算时会自动转换成相应的百分号与单位值

## Sass插值语法

插值语法可用在：选择器、属性名、注释.....

```scss
$font-size: 12px;
$line-height: 30px;
// 属性值
p {
    font: #{$font-size}/#{$line-height} Helvetica;
}
//选择器和属性名
$class-name: danger;
$attr: color;
// 选择带有danget类的a标签
a.#{$class-name} {
    border-#{$attr}: #f00;
}

// 注释使用插值语法
$author: "插值语法的使用";
/*
此章节的内容是：#{$author}
*/
    
```

## Sass常见函数的使用

#### color（颜色函数）

```scss
p {
    height: 30px;
}
.p0 {
    background-color: #5c7a29;
}
.p1 {
    /*
    让颜色变亮
    lighten($color,$amount)
    $amount取值在0%---100%之间
    */
    background-color: lighten(#5c7a29,30%);
}
.p1 {
    /*
    让颜色变暗，通常使用color.scale()代替该方法
    darken($color,$amount)
    $amount取值在0%---100%之间
    */
    background-color: danken(#5c7a29,15%);
}
.p3 {
    // 降低颜色透明度，通常使用color.scale()代替该方法
    // background-color: opacify(#5c7a29,0.5)
    background-color: opacify(rgba(#5c7a29,0.1),0.5);// 两个小数相加不能超多1，超过1会变成原本色
}
```

#### String（字符串函数）

scss有很多处理字符串的函数，比如向字符串添加英豪的quote()、获取字符串长度的string-length()、将内容插入字符串给定位置的string-insert()。

```scss
p {
    &::after {
        content: quote(插入内容); //不能写成content: 插入内容
    }
    background-color: unquote($string:"#f00");
    z-index: str-length('scss学习')
}
```

#### List函数

List函数操作List，length()返回列表长度，nth()返回列表中的特定项，join()将两个列表链接在一起，append()在列表末尾添加一个值。

```scss
p {
    z-index: length(12px);//1
    z-index: length(12px 5px 8px);//3
    z-index: index(a b c d, c);//3
    padding: append(10px 20px 30px);//10px 20px 30px
    color: nth($list: red blue green,$n: 2)//blue
}
```

#### Map函数

Map函数操作Map，map-get()根据键值获取map中对应的值，map-merge()将两个map合并成一个map，map-values()获取map中的所有值

```scss
$font-sizes: ("small": 12px,"normal": 18px,"large": 24px);
$padding: (top: 10px, right: 20px, bottom: 10px, left: 30px);
p {
    font-size: map-get($font-sizes,"normal");//18px
    @if map-has-key($padding,"right"){
        padding-right: map-get($padding,"right")
    }
    &::after {
        content: map-keys($font-sizes) + " " + map-values($padding) + "";
    }
}
```

#### selector选择器函数

选择符相关函数可对css选择进行一些对应的操作，例如：selector-append()可以把一个选择符加到另一个选择符，selector-unify()将两组选择器合成一个复合选择器。

```scss
.header {
    background-color: #000;
    content: selector-append(".a",".b",".c")+'';//content内容必须是字符串，非字符串是不合法的
    content: selector-unify("a",".disabled")+'';
}
```

转成css之后

```css
.header {
    background-color: #000;
    content: ".a.b.c";
    content: "a.disabled";
}
```

#### 自检函数

自检相关函数，例如：feature-exists()检查当前sass版本是否存在某个特性，variable-exists()检查当前作用域中是否存在某个变量，mixin-exists()检查某个mixin是否存在。

```scss
$color: #f00;
@mixin padding($left: 0, $top: 0, $right: 0, $bottom: 0) {
    padding: $top $right $bottom $left;
}

.content {
    @if variable-exists(color) {
        color: $color;
    }
    @else {
        content: "$color不存在";
    }
    @if mixin-exists(padding) {
        @include padding($left: 10px, $right: 10px);
    }
}
```

自检函数通常在代码的调试上使用。

#### Sass流程控制指令@if @for @each @while

##### @if控制指令

@if() 函数允许你根据条件进行分支，并仅返回两种可能结果中的一种。

```scss
.content {
    //第一种情况
    @if() {}
    // 第二种情况
    @if() {}
    @else{}
    // 第三种情况
    @if() {}
    @else if() {}
    @else {}
}
```

##### @for指令

@for指令可以在限定的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：

+ <font color="red">@for $val from <start> through <end></font>
+ <font color="red">@for $val from <start> to <end></font>

区别在于<font color="red">through</font>与<font color="red">to</font>的含义：

- 当使用 through 时，条件范围包含 <start> 与 <end>。
- 当使用 to 时，条件范围只包含 <start> 的值不包含 <end> 的值。
- 另外，$var可以是任何变量，比如：$i；<start> 和 <end> 必须是整数值。

```scss
@for $i from 1 to 4 {
    .p#{$i} {
        width: 10px * $i;
        height: 30px;
        background-color: #f00;
    }
}
@for $index from 1 through 3 {
    .p#{$index} {
        width: 10px * $index;
        height: 30px;
        background-color: #f00;
    }
}
```

##### each指令

@each指令的格式是 $var in <list>，$var为变量名，而<list>是一连串的值，也就是值列表。

```scss
p {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin 10px;
}
.p0 {
    background-color: #f00;
}
.p1 {
    background-color: #0f0
}
.p2 {
    background-color: #00f;
}
.p3 {
    background-color: turquoise;
}
// 使用each
$colorList: #f00 #0f0 #00f turquoise;
@each $color in $colorList {
    // 取出列表值对应的下标
    $index:  index($colorList,$color);
    .p#{$index - 1} {
        background-color: $color;
    }
}
```

##### @while指令

@while指令重复输出格式，直到表达式返回结果为false。这样可以实现必 @for 更复杂的循环。

用sass实现bootstrap中的css的这么一段代码

Https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.css

```scss
.col-sm-12 {
    width: 100%;
}
.col-sm-11 {
    width: 91.6666667%
}
.col-sm-10 {
    width: 83.33333333%
}
.col-sm-9 {
    width: 75%;
}
.col-sm-8 {
    width: 66.66666666%;
}
// 改进
$column: 12;
@while $column > 0 {
    .col-sm-#{$column} {
        width: $column / 12 *100%;
        width: $column / 12 * 100 + %;//回标红
        width: $column / 12 * 100#{'%'};
        width: unquote($string: $column / 12 * 100 + '%');
    }
    $column: $column - 1;
}
```

#### @function自定义函数

##### 函数作用

把一些比较复杂或经常用的内容进行抽离（封装），以便重复使用

##### 函数的定义与使用

```scss
// 函数的定义
@function function-name([$param1,$param2,...]) {
    ...
    @return $value;
}
```

提示：函数名 function-name 与 function_name是相同，不区分下划线与断线

##### @return

它只允许在函数体中使用，并且每个 @function 必须以 @return 结束。当遇到 @return 时，它回立即结束函数，并返回其结果。

##### 函数的使用

```scss
@function row-cols-width($column) {
    @return percentage(1 / $column); //percentage把小数转换成百分比
};
@for $i from 1 through 6 {
    .row-cols-#{$i}>* {
        width: row-cols-width($i);
    }
}
```

```scss
/**
*定义线性渐变
*@param $direction 方向
*@param $gradients 颜色过度的值列表
*/
@function background-linear-gradient($direction, $start-color, $end-color: #f00) {
    @return linear-gradient($direction, $start-color, $end-color);
}
// 正常传参
body {
    background-image: background-linear-gradient(to right, blue, green);
}
// 省略默认值
body {
    background-image: background-linear-gradient(to right, blue);
}
// 按照key传参
body {
    background-image: background-linear-gradient($start-color: red, $direction: to right);
}
// 剩余参数
@function background-linear-gradient($direction, $gradient...) {
    @return linear-gradient($direction, $gradient...);
}
body {
    background-image:background-linear-gradient(to right, red, green, blue);
}
$widths: 50px,40px,80px;
.top {
    width: min($widths...)
}
```

#### 混入（mixin） 和函数 （function）的区别

+ 混入 mixin 主要是通过传递参数的方式输出多样化的样式，为了可以实现代码的复用。
+ 函数的功能主要是通过传递参数后，经过函数内部的逻辑处理之后，最后得到 return 输出的值。

## 三元条件函数 if 的使用

如何使用

```scss
if($condition, $if-true, $if-false);
```

判断$condition,如果条件成立，则返回 $if-true，如果条件不成立，则返回 $if-false 的结果。

```scss
$theme: 'light';
.content {
    @if $theme == 'light' {
        color: #000;
    }
    @else {
        color: #fff;
    }
}
.content {
    color: if($theme == 'light', #000, #fff)
}
```

#### @use 的使用

##### 作用

从其sass样式表加载mixin、function和变量，并将来自多个样式变的css组合在一起，@use 加载的样式表被称为 ”模块“，多次引入只包含一次。@use 也可以看做是对 @import的增强

语法

```scss
@use '<url>' [as alias|namespace];
```

##### 加载普通scss、css

use下面的 _common.scss

```scss
$font-size: 14px !default;
//变量前面加 _ 或者 - 表示私有成员
$_font-size: 14px !default;
$-font-size: 14px !default;
* {
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;
}
@function column-width($col, $total) {
    @return percentage($col / $total);
}
@mixin bgColor($bg-color: #f2f2f2) {
    background-color: $bg-color;
}
```

use下面的about.css

```css
h1 {
    font-size: 24px;
}
```

主文件中引入这两个文件

```scss
@use 'user/common.scss';
@use 'css/about.css';
// 后缀可以省略
@use 'user/common' as a;
@use 'css/about';

// 更改默认值
@use 'user/common.scss' with($font-size: 30px);

body {
    font-size: common.$font-size;
    @include a.bgColor(#f00);
}
```

##### @use使用总结

- @use 引入同一个文件多次，不会重复引入，而 @import 会重复引入。
- @use 引入的文件都是一个模块，默认以文件名作为模块名，可以通过 as alias 取别名。
- @use 引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问，而 @import 变量会被覆盖。
- @use 方式可以通过 @use 'xxx' as * 来取消命名空间，建议不要这么做。
- @use 模块内可以通过 $- 或者 $_ 来定义私有成员，也就是说 - 或者 _ 开头的 变量、函数、混入不会被引入。
- @use 模块内变量可以通过 !default 定义默认值，引入时可以通过 with(...) 的方式修改默认值。
- 可定义 -index.scss 或者 _index.scss 来合并多个scss文件，它 @use 默认加载文件（默认会找到引入文件夹下的index文件）。

#### @forward 使用

##### 作用

通过 @forward 加载一个模块的成员，并将这些成员当做自己的成员对外暴露，类似于es6的export... ,通常用于跨多个文件组织sass库。

##### 转发、合并SCSS

转发：创建forward/_common.scss

```scss
$font-size: 14px !default;
* {
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;
}
@function column-width($col, $total) {
    @return percentage($col / $total);
}
@mixin bgColor($bg-color: #f2f2f2) {
    background-color: $bg-color;
}
```

创建启动合并bootstrap.scss

```scss
@forward 'uses/common';
```

使用

```scss
@use 'bootstrap';
```

#### @at-root 使用

##### 作用

@at-root 可以使被嵌套的选择器或属性跳出嵌套

##### 语法

```scss
@at-root <selector> {
    ...
}
```

普通嵌套

```scss
.parent {
    font-size: 12px;
    .child {
        font-size: 14px;
        .son {
            font-size: 16px;
        }
    }
}
```

作用某个选择器使其跳出嵌套

```scss
.parent {
    font-size: 12px;
    @at-root .child {
        font-size: 14px;
        @at-root .son{
            font-size: 14px;
        }
    }
}

.parent {
    font-size: 12px;
    @at-root {
        .child-1 {
            font-size: 14px;
        }
        .child-2 {
            font-size: 16px;
        }
        .child-3 {
            font-size: 18px;
        }
    }
}
```

#### @at-root (without: ...) 和 @at-root(with: ...) 的使用

默认@at-root 只会跳出选择器嵌套，而不能跳出@media或@support，如果要跳出这两种，则需使用@at-root(without: media)，@at-root(without: support)。
这个语法的关键词有四个：

1. a11(表示所有)
2. rule(表示常规css,默认值)
3. media(表示support)
4. support(表示support)

```scss
@media screen {
    .parant {
        font-size: 12px;
        @at-root (without: media) {
            .child {
                font-size: 14px;
                .son {
                    font-size: 16px;
                }
            }
        }
    }
}

@supports (display: flex) {
    .parant {
        font-size: 12px;
        @at-root (without: supports) {
            .child {
                font-size: 14px;
                .son {
                    font-size: 16px;
                }
            }
        }
    }
}
```



