# HTML & CSS

[toc]

## 术语

1. web
互联网
2. w3c
万维网联盟，非盈利性组织：w3.org，为互联网提供各种标准。
3. XML
可扩展的标记语言，用于定义文档结构的。

## 什么是HTML？
HTML是w3c定义的语言标准：HTML适用于描述页面结构的语言。

MDN：Mozilla Development Network，Mozilla开发者社区。

## 什么是css？
css是w3定义的语言标准：css适用于描述页面展示的语言。

css决定了页面长什么样子。

## 执行HTML CSS
HTML、CSS -> 浏览器内核 -> 页面

浏览器：shell（外壳）、core（内核：JS执行引擎、渲染引擎）。

IE：Trident
Firfox：Gecko
Chrome：Webkit、Blink
Safari：Webkit
Opera：Presto、Blink

## 版本和兼容性

HTML、CSS3

HTML5: 2014年

CSS3: 目前还没有制定完成。

XHTML: 可以认为是HTML的一种版本，完全符合XML的规范。

# 开发环境准备

## 显示文件扩展名

大部分文件，他的文件名：名称.扩展名（后缀）。

扩展名决定了文件被什么应用程序打开。

## 安装浏览器

IE

Opera

Firefox

Safari

Chrome【推荐】

将chrome设置为默认浏览器。

## 安装编辑器
windows记事本
Sublime
Atom
Dreamweaver
VSCode 【推荐】

# 第一个网页

Emmet插件：自动生成HTML文档结构。

## 注释

注释为代码的阅读者提供帮助，注释不参与运行

在html中注释使用如下格式书写
```html
<!-- 注释内容 -->
```

## 元素

> 其他的叫法：标签、标记

```html
<a href="http://www.baidu.com">百度一下</a>
```

整体：element（元素）

元素 = 起始标记（begin tag） + 结束标记（end tag） + 元素内容 + 元素属性

属性 = 属性名 + 属性值

属性分类：
+ 局部属性：某些元素的特有属性
+ 全局属性：所有元素通用

```html
<mate charset="UTF-8">
```

有些元素是没有结束标记的，这样的元素叫做：**空元素**

空元素的两种写法：

```html
<mate charset="UTF-8">
```
```html
<mate charset="UTF-8" />
```

## 元素的嵌套

元素不能相互嵌套

```html
<div>
    <p>
    </div>
</p>
```

父元素、子元素、祖先元素、后代元素、兄弟元素（拥有同一个父元素的两个元素）

## 标准的文档结构

HTML：页面、HTML文档。

```html
<!DOCTYPE html>
```

文档声明，告诉浏览器，当前文档使用的HTML标准是HTML5。

不写文档声明，将导致浏览器进入怪异渲染模式。

```html
<html lang="en">
</html>
```

根元素，一个页面最多只能一个，并且该元素是所有其他元素的父元素或祖先元素。

HTML5中没有强制于要求书写该元素。

lang属性：language，全局属性，表示该元素内部使用的文字是使用哪种自然语言书写而成的。（比如：有语音阅读功能，浏览器会根据这个属性来选择用设什么语言来阅读这篇文章）。

```html
<head>

</head>
```

文档头，文档头内部的内容不会显示到页面上。

```html
<meta>
```

文档的元数据：附加信息。

charset：指定网页内容编码。

计算机中，低压电（0~2 V）0，高压电（2~5 V）1，表示2，使用10。

计算机中，只能存储数字

文字和数字进行对应

比如：a —— 97，A —— 64

很像一个字典，如果各个国家都有自己的字典，那就没法统一了。

因此诞生了一本统一字典：该字典叫做字符编码表。

袁 —— GB2312 —— 10000 —— GBK —— ？？，造成乱码。

UTF-8 是 Unicode 编码的一个版本（万国码）。

```html
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

如果使用的是IE浏览器，建议使用edge浏览器的内核
