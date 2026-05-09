# HTML 基础笔记

> 第 N 次刷基础视频整理，结构更清晰，方便快速回顾。

---

## 一、HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 1.1 文档声明 `<!DOCTYPE html>`

- **作用**：告诉浏览器当前文档使用 HTML5 标准解析。
- **不写会怎样**：浏览器会进入**怪异渲染模式（Quirks Mode）**，导致页面样式不一致。

### 1.2 `<html>` 根元素

```html
<html lang="zh-CN">
```

| 属性 | 说明 |
|------|------|
| `lang` | 告诉搜索引擎/辅助技术该页面的主要语言，属于 **SEO** 优化的一部分 |

- 一个页面只能有一个 `<html>` 根标签。
- HTML5 中即使不写 `<html>` 标签也符合标准，但**建议始终写上**。
- 推荐写法：`lang="zh-CN"` 或 `lang="zh-cmn-Hans"`（简体中文）。

### 1.3 `<head>` 文档头

里面的内容是给**浏览器**看的，用户不可见。

#### `<meta>` 元数据

可以理解为网页的"附加信息"。

```html
<meta charset="UTF-8">
<meta name="keywords" content="服装">
<meta name="description" content="这是一个你穿了就不想脱的衣服">
```

| 属性 | 作用 |
|------|------|
| `charset` | 指定网页字符编码 |
| `keywords` | 关键词，供搜索引擎参考 |
| `description` | 页面描述，搜索结果中显示的摘要 |

**常见字符编码：**

| 编码 | 说明 |
|------|------|
| `GB2312` | 只支持简体中文 |
| `GBK` | 支持简繁体中文 |
| `Unicode` | 万国码 |
| `UTF-8` | Unicode 的变长编码，**最常用**，推荐 |

#### 兼容性设置（IE）

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

- 告诉 IE 浏览器使用**最高版本的文档模式**渲染。
- 避免 IE 以旧版本的兼容模式运行，确保页面以最优方式显示。

#### `<title>` 标题

```html
<title>淘宝网，淘！</title>
```

- 显示在浏览器标签页上。
- 搜索引擎结果中的标题来源，对 SEO 很重要。

### 1.4 `<body>` 文档体

里面的内容是给**用户**看的。

- 默认情况下，`body` 有 `margin: 8px` 的外边距（不同浏览器可能略有差异）。

---

## 二、元素与属性

### 2.1 属性分类

| 类型 | 说明 | 示例 |
|------|------|------|
| **全局属性** | 所有元素都能用 | `id`、`class`、`style`、`title`、`data-*`、`hidden` |
| **局部属性** | 特定标签才有 | `img` 的 `src`、`a` 的 `href`、`input` 的 `type` |

### 2.2 元素显示类型

| 类型 | 特点 | 典型元素 |
|------|------|---------|
| **块级元素**（`block`） | 独占一行，可以通过 CSS 设置宽高 | `div`、`p`、`h1~h6`、`ul` |
| **行内元素**（`inline`） | 不独占一行，**默认情况**下不能通过 `width`/`height` 设置宽高 | `span`、`a`、`strong`、`em` |
| **行内块元素**（`inline-block`） | 不独占一行，但可以设置宽高 | `img`、`input`、`button`、`iframe` |

> **说明**：
> - 行内元素**不是绝对不可设置宽高**。通过 CSS 修改 `display` 属性（如改为 `inline-block` 或 `block`）后，完全可以设置宽高。
> - `img`、`input` 等属于**可替换元素（replaced element）**，天生就具备类似 `inline-block` 的特性。
> - HTML5 中不再严格区分块级/行内，取而代之的是**内容类别（Content Categories）**的概念。

### 2.3 空格与换行的处理

- HTML 会将**连续的空格、制表符、换行**合并为**一个空格**显示。
- 连续的英文字母/数字如果没有空格分隔，会被视为一个整体（单词），**不会在中间自动换行**，可能撑破容器。
- 中文文字没有空格也能正常换行。
- 需要保留原始空格和换行格式时，可使用：
  - `&nbsp;`（不间断空格）
  - `<pre>` 标签
  - CSS `white-space: pre` / `pre-wrap`

---

## 三、常用标签详解

### 3.1 `<a>` 标签（超链接 + 锚点）

#### 普通链接

```html
<a href="https://www.example.com">点击跳转</a>
```

#### 锚点跳转（页面内）

```html
<!-- 锚点链接 -->
<a href="#section1">跳到章节1</a>
<a href="#section2">跳到章节2</a>

<!-- 目标位置 -->
<div id="section1">
    <h2>章节1</h2>
    <p>内容...</p>
</div>
<div id="section2">
    <h2>章节2</h2>
    <p>内容...</p>
</div>
```

> **小技巧**：即使不写 `<a>` 标签，只要有 `id`，直接在地址栏后面拼 `#idName` 也能跳转。

#### 跨页面锚点

```html
<a href="other-page.html#section3">跳转到另一个页面的章节3</a>
```

### 3.2 `<img>` 与 `<map>`（图片热区）

```html
<img usemap="#solarMap" src="solar-system.webp" alt="太阳系">

<map name="solarMap">
    <area shape="circle" coords="345,145,50"
          href="https://baike.baidu.com/item/木星"
          alt="木星" target="_blank">
</map>
```

> **注意**：不建议把带 `usemap` 的 `<img>` 嵌套在 `<a>` 标签内，否则热区点击和超链接跳转可能产生冲突。

| `<area>` 属性 | 说明 |
|-------------|------|
| `shape` | 热区形状：`rect`（矩形）、`circle`（圆形）、`poly`（多边形） |
| `coords` | 坐标，根据形状不同格式不同 |
| `href` | 点击热区后跳转的链接 |
| `alt` | 替代文本 |

---

## 四、元素的包含关系

1. **容器元素**（如 `div`）中可以包含几乎所有元素。
2. **`<a>` 元素**几乎可以包含任何元素（HTML5 中甚至能包裹块级元素）。
3. **某些元素有固定的子元素要求**：
   - `ul` / `ol` 只能直接包含 `li`
   - `select` 只能直接包含 `option` / `optgroup`
   - `table` 有固定的子元素顺序（`thead`、`tbody`、`tfoot`、`tr` 等）
4. **标题元素**（`h1~h6`）和**段落元素**（`p`）不能相互嵌套，也不能包含块级容器元素。

---

## 五、资源与路径

### 5.1 资源分类

| 类型 | 说明 |
|------|------|
| **站内资源** | 当前网站自己的资源 |
| **站外资源** | 其他网站的资源（如 CDN、第三方图片） |

### 5.2 路径分类

| 类型 | 适用场景 | 示例 |
|------|---------|------|
| **绝对路径** | 站外资源，或站内从根目录开始 | `https://cdn.example.com/img.png` |
| **相对路径** | 站内资源，推荐 | `./images/logo.png`、`../css/style.css` |

#### 绝对路径格式

```
协议名://主机名:端口/path
schema://host:port/path
```

- **协议名**：`http`、`https`、`file`（本地双击打开时）
- **主机名**：域名 或 IP 地址
- **端口号**：HTTP 默认 `80`，HTTPS 默认 `443`，默认端口可省略
- **省略协议**：当资源协议与当前页面相同时，可省略 `http:` 或 `https:`（即**协议相对 URL**）

#### 相对路径格式

| 写法 | 含义 |
|------|------|
| `./file.html` | 当前目录下的文件（`./` 可省略） |
| `../file.html` | 上一级目录 |
| `../../file.html` | 上两级目录 |

---

## 六、VS Code 快捷键（HTML 相关）

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + Enter` | 无论光标在哪，下方插入新行 |
| `Ctrl + Shift + Enter` | 上方插入新行 |
| `h$*6>{$级标题}` + `Tab` | Emmet 快速生成 6 级标题 |
| `lorem` + `Tab` | 生成乱数假文（占位文本） |

---

## 七、易错点速查

| 问题 | 正确做法 |
|------|---------|
| 不写 `<!DOCTYPE html>` | 浏览器进入怪异模式，样式可能错乱 |
| `lang` 属性写错 | 推荐 `lang="zh-CN"` |
| 忘记写 `charset="UTF-8"` | 中文可能出现乱码 |
| 相对路径写错 | 注意 `./` 和 `../` 的区别，`./` 可省略 |
| 空格被合并 | 正常行为，需保留用 `&nbsp;`、`<pre>` 或 CSS `white-space` |
| 行内元素设置宽高无效 | 默认特性，改为 `display: inline-block` 或 `display: block` 即可 |
