# 2 、HTML中的JavaScript

### 本章内容

+ 使用<script>元素
+ 行内脚本与外部脚本的比较
+ 文档模式对JavaScript有什么影响
+ 确保JavaScript不可用时的用户体验

### 2.1 <script>元素

将JavaScript插入HTML的主要方法是使用<script>元素。由网景公司创造出来。

+ async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作。比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
+ charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的价值。
+ crossorigin：可选。配置相关请求的CORS（跨域资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
+ defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
+ integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI,Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容，不是左右浏览器都支持这个属性。
+ language：废弃。
+ src：可选。表示包含要执行的代码的外部文件。
+ type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

> 注意：页面在解释JavaScript文件的时候，页面会被阻塞（阻塞时间也包含下载文件的时间）。外部的JavaScript文件的扩展名是 .js 。这不是必须得，因为浏览器不会检查所包含JavaScript文件的扩展名。这就为使用服务器端脚本语言动态生成JavaScript代码，或者在浏览器中将JavaScript扩展语言（如TypeScript，或React的JSX）转译为JavaScript提供了可能性。不过要注意，服务器经常会根据文件扩展来确定响应的正确MIME类型。如果不打算使用．js扩展名，一定要确保服务器能返回正确的MIME类型。

script 标签的src属性是通过get请求来获取 JavaScript 文件的，不受浏览器的同源策略影响。

动态创建的 script 标签加载的JavaScript文件默认是 async 的，但不是所有浏览器都支持 async 属性，所以需要创建动态 script 的时候，可以明确的将其设置为同步加载：

```javascript
    let script = document.createElement('script');
    script.src = 'gibberish.js';
    script.async = false;
    document.head.appendChild(script);
```

以这种方式获取的资源对浏览器的<font color='red'>预加载器</font>是不可见的。这会严重影响他们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们：

```html
<link rel='preload' href='xxx.js'>
```

# 3、语言基础

+ 语法
+ 数据类型
+ 流程控制语句
+ 理解函数

## 3.1 语法

ECMAScript语法很大程度上借鉴了C语言和类C语言。

### 3.1.1 区分大小写

首先要知道的是，ECMAScript中的一切都是要区分大小写的。无论函数、变量、或是操作符都区分大小写

### 3.1.2 标识符

所谓<b>标识符</b>，就是变量、函数、属性、或者函数参数的名称。标识符可以由一或多个下列字符组成：

+ 第一个字符必须是一个字母、下划线、或美元符号；
+ 剩下的其他字符可以是字母、下划线、美元符或者数字；

开启严格模式：

```javascript
"use strict"
```

## 3.2 关键字与保留字

>关键字和保留字不能作为标识符，但是可以作为对象的属性（不推荐）。

## 3.3 变量

ECMAScript 变量是松散类型的，意思是变量可以用于保存任何类型的数据。每个变量只不过是一个用于保存任意值的命名占位符。有 3 个关键字可用来声明变量：var、let、const，其中 var 可以在任何ECMAScript 版本中使用，let 和 const 只能在 ECMAScript 第六版及以上版本中使用。

### 3.1.1 var 关键字

var 定义的关键字如果不初始化的情况下，变量会保存一个特殊值undefined。

>注意 虽然可以通过省略var操作符定义全局变量，但不推荐这么做。在局部作用域中定义的全局变量很难维护，也会造成困惑。这是因为不能一下子断定省略var是不是有意而为之。在严格模式下，如果像这样给未声明的变量赋值，则会导致抛出ReferenceError。

1. 使用 var 声明的变量会自动提升到作用域的顶部
2. 使用 let 声明的变量范围是块作用域，而 var 声明的是函数作用域，<b>块作用域</b>是<b>函数作用域</b>的<b color='red'>子集</b>。let 不允许同一个块作用域中出现冗余声明。

> 对声明冗余报错不会因混用let和var而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变量在相关作用域如何存在。

```javascript
var name;
let name; // SyntaxError
let age;
var age; // SyntaxError
```

#### 1.暂时性死区

对声明冗余报错不会因混用let和var而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变量在相关作用域如何存在。

```javascript
    // name会被提升
    console.log(name); // undefined
    var name = 'Matt';
    // age不会被提升
    console.log(age); // ReferenceError:age没有定义
    let age = 26;
```

在let声明之前的执行瞬间被称为“暂时性死区”。

#### 2.全局声明

与var关键字不同，使用let在全局作用域中声明的变量不会成为window对象的属性（var声明的变量则会）。

```javascript
    var name = 'Matt';
    console.log(window.name); // 'Matt'
    let age = 26;
    console.log(window.age);   // undefined
```

## 3.4 数据类型



+ 原始类型（简单类型）：Number、String、Boolean、Undefined、Null、Symbol。
+ 引用类型（复杂类型）：Object，Object是一种无序键-值对的集合。

### 3.4.1 typeof 操作符

对一个只使用 typeof 会返回下列字符串之一：

+ "undefined" 表示值未定义；
+ " boolean" 表示值为布尔值；
+ "string" 表示值为字符串；
+ "number" 表示值为数值；
+ "object" 表示值为对象（而不是函数）或 null；
+ "function" 表示值为函数；
+ "symbol" 表示值为符号；

typeof 是一个操作符，不是一个函数，所以不需要参数，但可以使用参数：

```javascript
    let message = "some string";
    console.log(typeof message);     // "string"
    console.log(typeof(message));    // "string"
    console.log(typeof 95);           // "number"
```

注意typeof在某些情况下返回的结果可能会让人费解，但技术上讲还是正确的。比如，调用typeof null返回的是"object"。这是因为特殊值null被认为是一个对空对象的引用。

#### Undefined类型

对未声明的变量，只能执行一个有用的操作，就是对它调用typeof(返回值是 undefined)。（对未声明的变量调用delete也不会报错，但这个操作没什么用，实际上在严格模式下会抛出错误。）

#### Null类型

null值表示一个空对象指针，这也是给typeof传一个null会返回"object"的原因。

undefined值是由null值派生而来的，因此ECMA-262将它们定义为表面上相等，如下面的例子所示：

```javascript
console.log(undefined == null); //true
console.log(undefined === nul); // false
```

#### Boolean类型

| 数据类型  | 转为true的值           | 转为false的值 |
| --------- | ---------------------- | ------------- |
| Boolean   | true                   | false         |
| String    | 非空字符串             | ""()空字符串  |
| Number    | 非零数值（包括无穷值） | 0，NaN        |
| Object    | 任意对象               | null          |
| Undefined | N/A（不存在）          | undefined     |

#### Number 类型

使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值。

存储浮点值使用的内存空间是存储整数值的两倍，所以ECMAScript总是想方设法把值转换为整数。在小数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小数点后面跟着0（如1.0），那它也会被转换为整数。

ECMAScript可以表示的最小数值保存在Number.MIN_VALUE中，这个值在多数浏览器中是5e-324；可以表示的最大数值保存在Number.MAX_VALUE中，这个值在多数浏览器中是1.797693134862315 7e+308。

#### NaN 类型

任何涉及NaN的操作始终返回NaN（如NaN/10），在连续多步计算时这可能是个问题。其次，NaN不等于包括NaN在内的任何值。

```javascript
console.log(NaN == NaN); // false
```

把一个值传给isNaN()后，该函数会尝试把它转换为数值。某些非数值的值可以直接转换成数值，如字符串"10"或布尔值。任何不能转换为数值的值都会导致这个函数返回true。

