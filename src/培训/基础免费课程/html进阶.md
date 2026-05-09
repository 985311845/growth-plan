# iframe元素

框架页

iframe是可替换元素

通常用于在网页中嵌入另一个页面

```html
<!DOCTYPE html>
<html lang="cmn-hans">
    <head>
        <meta charset="utf-8">
        <title>iframe</title>
    </head>
    <body>
        <a hraf="https://www.baidu.com">百度</a>
        <a hraf="https://www.douyu.com" target="myframe">斗鱼</a>
        <a hraf="https://www.taobao.com">淘宝</a>
        
        <iframe name="myframe" src="https://www.baidu.com">
        </iframe>
    </body>
</html>
```

一般别人的网站的视屏不允许你使用他的视屏，也就是他不支持下载MP4

格式的视频，此时就需要使用iframe

举个栗子：

拿bilibili上的视屏

![视屏引用](E:\growth-plan\src\assets\bilibili.png)

```html
<!DOCTYPE html>
<html lang="cmn-hans">
    <head>
        <meta charset="utf-8">
        <title>引用外部视屏资源</title>
    </head>
    <body>
        <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115545609339536&bvid=BV1SKCTBCE2u&cid=33989200671&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
    </body>
</html>
```

# 在页面中使用flash

 object

```html
<object data="./example.swf" type="application/x-shockwave-flash">
		<!-- 参数：比如画面质量 -->
        <param name="quality" value="high">
</object>
```

embed

```html
<embed quality="high" src="./example.swf" type="application/x-shockwave-flash">
```

兼容写法

```html
<object data="./example.swf" type="application/x-shockwave-flash">
	<!-- 参数：比如画面质量 -->
    <param name="quality" value="high">
    <embed quality="high" src="./example.swf" 				type="application/x-shockwave-flash">
</object>
```



他们都是可替换元素

MIME：多用途互联网邮件扩展类型

# 表单元素

一系列数据，主要用于收集用户数据
## input元素
主要做输入
- type：输入框类型（text、password、date、button、checkbox、radio、search、number）
- value：输入框值
- placeholder：显示提示的文本，文本框没有内容时显示

也可以做按钮

- type：reset、submit、button

## select元素
下拉列表选择框
通常和option元素配合使用
分组optgroup元素
```html
<select>
	<optgroup label="才艺主播">
        <option>AA</option>
    </optgroup>
    <optgroup label="游戏主播">
        <option>BB</option>
        <option>CC</option>
    </optgroup>
</select>
		
```

## textarea元素

文本域

cols：列数

rows：行数

## button

按钮元素，如果要使用最大兼容，可以使用input，但是绝大部分浏览器是兼容button

- type：reset、submit、button，默认值是submit

## 表单状态

readonly：boolean属性，表示是否只读，不会改变表单显示样式

disabled：boolean属性，表示是否禁用，会改变表单显示样式

## 配合表单元素的其他元素

### <font color="red">label</font>

普通元素，通常配合单选/多选框使用

label元素里面是不允许出现div的

显示关联：

```html
请选择性别：
<input id="radMail" name="gender" type="redio"/>
<label for="radMail">男</label>
```

隐式关联：

```html
<label>
    <input id="radMail" name="gender" type="redio"/>
    男
</label>
```

### datalist

数据列表：有兼容性问题

该元素本身不会显示在页面上，配合文本框使用

```html
<input type="text" placeholder="请输入常用的浏览器" list="userAgent" />
<datalist id="userAgent">
  <option value="trident">IE浏览器</option>
  <option value="gecko">fire fox</option>
  <option value="webkit/blink">Google Chrome</option>
  <option value="webkit">Safari</option>
  <option value="presto">Opera</option>
</datalist>

```

### form元素

通常情况下，会将整个表单元素，放置form元素的内部，作用是当提交表单时，会将form元素内部的表单内容以合适的方式提交到服务器

### fieldset

表单分组

```html
<div>
        <fieldset>
            <legend>账号信息</legend>
            <p>
                用户名：<input type="text">
            </p>
            <p>
                密码： <input type="password">
            </p>
        </fieldset>
        <fieldset>
            <legend>基本信息</legend>
            <p>
                用户姓名：<input type="text">
            </p>
            <p>
                用户性别： <input type="text">
            </p>
        </fieldset>
    </div>
```

### legend

分组标题

# 美化表单样式

伪类选择器：

focus：聚焦样式，按键盘tab键切换聚焦元素

tabindex：设置聚焦顺序

```html
<p>
   <a tabindex="2" href="https://www.baidu.com">lorem</a>
</p>
<p>
    <input tabindex="1" type="text">
</p>
<p>
   	<button tabindex="3">
        提交
    </button>
</p>
```

```html
<p>
  <a tabindex="2" href="www.baidu.com">lerom</a>
</p>
<p>
  <input tabindex="1" type="text">
</p>
<p>
  <button tabindex='3'>提交</button>
</p>
```

```css
input:focus{
  outline: 1px solid red;
  outline-offset: -1px;
}
```

checked：单选或多选框被选中的伪类，一般用来设置label标签的样式，例如：

```css
input:checked+label{/*修改选中之后的label的样式*/}
```

resize：css属性，用于设置textarea那个方向允许拖动，both默认值：两个方向都能调整尺寸，none：两个方向都不允许，horizontal：水平方向可以调整，vertical：垂直方向可以调整

# 表格

前台：面相用户

后台：面相管理员

表格不再适用于网页布局？表格的渲染速度过慢，浏览器需要把整个表格数据全部读完才会渲染

table 表格

caotion 表格标题

thead 表头

tbody 表格主题

tfoot 表尾

```html
<table>
        <caption>这是表头</caption>
        <thead>
            <tr>
                <th>列1</th>
                <th>列2</th>
                <th>列3</th>
            </tr>
            <tr>
                <th>列1.1</th>
                <th>列2.2</th>
                <th>列3.3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>lorem2</td>
                <td>lorem2</td>
                <td>lorem2</td>
            </tr>
            <tr>
                <td>lorem2</td>
                <td>lorem2</td>
                <td>lorem2</td>
            </tr>
            <tr>
                <td>lorem2</td>
                <td>lorem2</td>
                <td>lorem2</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Lorem, ipsum.</td>
                <td>Ex, delectus.</td>
                <td>Pariatur, fugiat.</td>
            </tr>
        </tfoot>
    </table>
```

```css
table{
    width: 100%;
    /*边框折叠方式*/
    border-collapse: separate;/*边框分离*/
    /*border-collapse: collapse;*//*边框折叠*/
}
tr,
td{
    border: 1px solid;
}
```

border-collapse：设置边框的折叠方式，必须写在table上

colspan：合并列，跨列

rowspan：合并行，跨行

span的英文就是跨越的意思

# 补充其他元素

- abbr：缩写
- time：提供给浏览器或搜索引擎阅读的
- b：以前是一个无语义元素，主要用于加粗字体，现在用于强调语义
- q：一小段引用文本，会自动加双引号
- blockquote：引用一大段文本
- br：文本换行
- hr：分割线
- meta：给浏览器看的元信息，搜索引擎优化（SEO）

```html
<!--网站作者邮箱-->
<meta name="author" content="888888@qq.com">
<!--网站作者邮箱-->
<meta name="description" content="网站说明">
```

- link：链接外部资源（css、图标）
  - rel属性：链接的资源与当前网页的联系（stylesheet、icon） 
