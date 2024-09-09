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







