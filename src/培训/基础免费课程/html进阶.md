# HTML 进阶笔记

---

## 一、iframe 元素

### 1.1 基本概念

- `iframe` 是**可替换元素**
- 通常用于在网页中**嵌入另一个页面**

### 1.2 基础用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>iframe 示例</title>
</head>
<body>
    <!-- 点击链接时，会在 name="myframe" 的 iframe 中打开目标页面 -->
    <a href="https://www.baidu.com">百度</a>
    <a href="https://www.douyu.com" target="myframe">斗鱼</a>
    <a href="https://www.taobao.com">淘宝</a>

    <iframe name="myframe" src="https://www.baidu.com"></iframe>
</body>
</html>
```

> **关键点**：通过给 `a` 标签设置 `target="iframe的name值"`，可以实现点击链接在指定 iframe 中切换页面。

### 1.3 实际应用：嵌入外部视频

一般别人的网站的视频不允许直接下载 MP4 格式，此时就可以使用 `iframe` 来嵌入。

**示例：嵌入 B 站视频**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>引用外部视频资源</title>
</head>
<body>
    <iframe 
        src="//player.bilibili.com/player.html?isOutside=true&aid=115545609339536&bvid=BV1SKCTBCE2u&cid=33989200671&p=1" 
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        allowfullscreen="true">
    </iframe>
</body>
</html>
```

---

## 二、在页面中使用 Flash（已淘汰，了解即可）

> ⚠️ Flash 技术已被现代浏览器淘汰，此节仅作历史了解。

### 2.1 object 方式

```html
<object data="./example.swf" type="application/x-shockwave-flash">
    <!-- 参数：比如画面质量 -->
    <param name="quality" value="high">
</object>
```

### 2.2 embed 方式

```html
<embed quality="high" src="./example.swf" type="application/x-shockwave-flash">
```

### 2.3 兼容写法

```html
<object data="./example.swf" type="application/x-shockwave-flash">
    <!-- 参数：比如画面质量 -->
    <param name="quality" value="high">
    <embed quality="high" src="./example.swf" type="application/x-shockwave-flash">
</object>
```

> `object` 和 `embed` 都是**可替换元素**。  
> `MIME`：多用途互联网邮件扩展类型（用于标识文件格式）。

---

## 三、表单元素

> 表单主要用于**收集用户数据**。

### 3.1 input 元素

`input` 是最常用的表单输入元素。

| 属性 | 说明 |
|------|------|
| `type` | 输入框类型：`text`、`password`、`date`、`button`、`checkbox`、`radio`、`search`、`number` 等 |
| `value` | 输入框的默认值 |
| `placeholder` | 提示文本，输入框为空时显示 |

**input 也可以做按钮：**

| type 值 | 作用 |
|---------|------|
| `reset` | 重置表单 |
| `submit` | 提交表单 |
| `button` | 普通按钮 |

### 3.2 select 元素（下拉列表）

通常和 `option` 配合使用，可用 `optgroup` 进行分组。

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

### 3.3 textarea 元素（文本域）

| 属性 | 说明 |
|------|------|
| `cols` | 列数 |
| `rows` | 行数 |

### 3.4 button 元素

- `type` 可选值：`reset`、`submit`、`button`
- **默认值是 `submit`**
- 如果要使用最大兼容性，可以用 `input` 代替，但现代浏览器基本都已兼容 `button`

### 3.5 表单状态

| 属性 | 说明 | 样式影响 |
|------|------|----------|
| `readonly` | 只读（布尔属性） | ❌ 不会改变显示样式 |
| `disabled` | 禁用（布尔属性） | ✅ 会改变显示样式（通常变灰） |

### 3.6 配合表单的其他元素

#### ① label 元素

- 普通元素，通常配合单选/多选框使用
- `label` 元素里面**不允许出现 `div`**

**方式一：显式关联（推荐）**

```html
请选择性别：
<input id="radMale" name="gender" type="radio"/>
<label for="radMale">男</label>
```

**方式二：隐式关联**

```html
<label>
    <input id="radMale" name="gender" type="radio"/>
    男
</label>
```

> **注意**：代码中的 `type="redio"` 是错误写法，正确为 `type="radio"`。

#### ② datalist 元素

- 数据列表，**有兼容性问题**
- 该元素本身不会显示在页面上，需配合文本框使用

```html
<input type="text" placeholder="请输入常用的浏览器" list="userAgent" />
<datalist id="userAgent">
    <option value="trident">IE浏览器</option>
    <option value="gecko">Firefox</option>
    <option value="webkit/blink">Google Chrome</option>
    <option value="webkit">Safari</option>
    <option value="presto">Opera</option>
</datalist>
```

#### ③ form 元素

- 通常将整个表单内容放置在 `form` 元素内部
- 作用：提交表单时，会将 `form` 内部的表单内容以合适的方式提交到服务器

#### ④ fieldset & legend

| 元素 | 作用 |
|------|------|
| `fieldset` | 表单分组 |
| `legend` | 分组标题 |

```html
<div>
    <fieldset>
        <legend>账号信息</legend>
        <p>用户名：<input type="text"></p>
        <p>密码： <input type="password"></p>
    </fieldset>
    <fieldset>
        <legend>基本信息</legend>
        <p>用户姓名：<input type="text"></p>
        <p>用户性别： <input type="text"></p>
    </fieldset>
</div>
```

---

## 四、美化表单样式

### 4.1 focus 伪类（聚焦样式）

- 按键盘 `Tab` 键可切换聚焦元素
- 可用 `tabindex` 属性设置聚焦顺序

```html
<p>
    <a tabindex="2" href="https://www.baidu.com">链接</a>
</p>
<p>
    <input tabindex="1" type="text">
</p>
<p>
    <button tabindex="3">提交</button>
</p>
```

```css
input:focus {
    outline: 1px solid red;
    outline-offset: -1px;
}
```

### 4.2 checked 伪类

用于单选或多选框被选中时的样式，一般配合 `label` 使用：

```css
input:checked + label {
    /* 修改选中之后的 label 样式 */
    color: red;
}
```

### 4.3 resize 属性

用于设置 `textarea` 允许拖动的方向：

| 值 | 说明 |
|----|------|
| `both` | 默认值，两个方向都能调整 |
| `none` | 两个方向都不允许调整 |
| `horizontal` | 只允许水平方向调整 |
| `vertical` | 只允许垂直方向调整 |

---

## 五、表格

### 5.1 基本认识

| 类型 | 说明 |
|------|------|
| 前台 | 面向用户 |
| 后台 | 面向管理员 |

> **为什么表格不再适用于网页布局？**  
> 表格的渲染速度过慢，浏览器需要把整个表格数据全部读取完后才会渲染。

### 5.2 表格结构元素

| 元素 | 作用 |
|------|------|
| `table` | 表格容器 |
| `caption` | 表格标题 |
| `thead` | 表头 |
| `tbody` | 表格主体 |
| `tfoot` | 表尾 |

```html
<table>
    <caption>这是表格标题</caption>
    <thead>
        <tr>
            <th>列1</th>
            <th>列2</th>
            <th>列3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
            <td>数据3</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>底部1</td>
            <td>底部2</td>
            <td>底部3</td>
        </tr>
    </tfoot>
</table>
```

### 5.3 表格样式

```css
table {
    width: 100%;
    /* 边框折叠方式 */
    border-collapse: separate;  /* 边框分离（默认） */
    /* border-collapse: collapse; */  /* 边框合并 */
}
tr, td {
    border: 1px solid;
}
```

> `border-collapse` 必须写在 `table` 上。

### 5.4 单元格合并

| 属性 | 作用 | 说明 |
|------|------|------|
| `colspan` | 合并列 | 跨列合并 |
| `rowspan` | 合并行 | 跨行合并 |

> `span` 的英文含义就是"跨越"。

---

## 六、其他补充元素

| 元素 | 说明 |
|------|------|
| `abbr` | 缩写 |
| `time` | 提供给浏览器或搜索引擎阅读的时间信息 |
| `b` | 以前是无语义元素（用于加粗），现在用于强调语义 |
| `q` | 一小段引用文本，浏览器会自动添加双引号 |
| `blockquote` | 引用一大段文本（块级引用） |
| `br` | 文本换行 |
| `hr` | 分割线 |
| `meta` | 给浏览器看的元信息，用于搜索引擎优化（SEO） |
| `link` | 链接外部资源（CSS、图标等） |

### 6.1 meta 元素示例

```html
<!-- 网站作者 -->
<meta name="author" content="888888@qq.com">
<!-- 网站描述（SEO 重要） -->
<meta name="description" content="这是一个示例网站">
```

### 6.2 link 元素

| 属性 | 说明 |
|------|------|
| `rel` | 链接资源与当前网页的关系，如 `stylesheet`（样式表）、`icon`（网站图标） |

---
