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

**怪异模式 vs 标准模式的典型差异：**

| 差异点 | 标准模式 | 怪异模式 |
|--------|---------|---------|
| **盒模型** | `width` = content 宽度 | `width` = content + padding + border（IE 旧 bug）|
| **行内元素宽高** | 不可设宽高 | 可以设置 `width` / `height` |
| **`margin: 0 auto` 居中** | 正常生效 | 可能失效 |
| **百分比高度计算** | 需父级有明确高度 | 可能异常计算 |

> 一句话：怪异模式下，浏览器会用上世纪的老规则渲染你的现代 CSS，导致莫名失效。

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

**`Hans` 与 `Hant` 的区别：**

| 后缀 | 含义 | 适用场景 |
|------|------|---------|
| `Hans` | 简体汉字（Simplified） | 中国大陆简体中文页面 |
| `Hant` | 繁体汉字（Traditional） | 港澳台繁体中文页面 |

> **常见场景写法：**
> - 大陆简体：`lang="zh-CN"` 或 `lang="zh-cmn-Hans"`
> - 香港繁体（粤语）：`lang="zh-Hant-HK"`
> - 台湾繁体（国语）：`lang="zh-Hant-TW"`
>
> ⚠️ 不要把 `Hans`（简体）用在香港/台湾繁体页面上，否则屏幕阅读器会按简体规则发音。

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

**⚠️ 前后端编码不一致的乱码问题：**

如果后端数据库使用 GBK，前端页面使用 UTF-8，数据交互时会出现**编解码不一致**，中文甚至外文都可能显示为乱码（如 Mojibake）。

**解决办法：**
1. **全链路统一 UTF-8**：数据库、表、连接字符集、后端服务、前端页面全部设为 UTF-8。
2. **数据库连接显式指定字符集**：
   ```
   jdbc:mysql://localhost/db?useUnicode=true&characterEncoding=UTF-8
   ```
3. **后端响应头声明编码**：
   ```
   Content-Type: text/html; charset=utf-8
   ```

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

**`float` 对行内元素的影响：**
- 给 `span` 等行内元素设置 `float: left` 后，元素会**生成块级框（block box）**，此时可以直接设置 `width` / `height`。
- 注意：不是变成 `inline-block`，而是变成 `block`（表现上类似）。

**HTML5 内容类别（Content Categories）速查：**

| 类别 | 说明 | 典型元素 |
|------|------|---------|
| **Flow content** | 流内容，大多数在 body 中使用的元素 | `div`、`p`、`a`、`span` |
| **Phrasing content** | 短语内容，文本级元素 | `span`、`a`、`strong`、`em`、`img` |
| **Interactive content** | 可与用户交互的元素 | `a`、`button`、`input`、`label` |
| **Sectioning content** | 划分文档结构的元素 | `article`、`aside`、`nav`、`section` |
| **Heading content** | 标题类元素 | `h1~h6`、`hgroup` |
| **Embedded content** | 引入外部资源 | `img`、`video`、`audio`、`iframe` |

> **互斥规则**：`a` 不能嵌套 `a`（Interactive content 不能互相嵌套）；`header` 不能放在 `header` 或 `footer` 里。

### 2.3 空格与换行的处理

- HTML 会将**连续的空格、制表符、换行**合并为**一个空格**显示。
- **空格和换行的语法含义是英文单词分隔符**。因此连续的英文字母/数字如果没有空格分隔，会被视为一个整体（单词），**不会在中间自动换行**，可能撑破容器。
- 中文文字没有空格也能正常换行。
- 需要保留原始空格和换行格式时，可使用：
  - `&nbsp;`（不间断空格）
  - `<pre>` 标签
  - CSS `white-space: pre` / `pre-wrap`

**⚠️ 行内/行内块元素之间的空白间隙：**

```html
<span>hello</span>
<span>world</span>
```

两个 `span` 之间的换行符会被浏览器解析为**空白文本节点**，渲染出来会带有间隙（宽度约 `0.25em ~ 0.5em`，取决于字体大小）。

**消除办法：**
1. 写成一行：`<span>hello</span><span>world</span>`
2. 父元素 `font-size: 0`，子元素单独恢复字号
3. 使用 `display: flex`（推荐）

---

## 三、常用标签详解

### 3.1 `<a>` 标签（超链接 + 锚点）

> **补充：`<a>` 不能嵌套 `<a>`**
>
> HTML 规范禁止 `a` 嵌套 `a`。浏览器遇到这种结构会在解析阶段**强行拆分 DOM**，将内层 `a` 提升为外层 `a` 的兄弟节点。实际得到的 DOM 结构往往不是你写的那样。

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

**SPA（单页应用）中的锚点冲突：**

前端框架使用 **Hash 模式路由**时，`#section1` 会被前端路由拦截或冲突。

**解决方案：**
1. 路由改用 **History 模式**（需服务端配置 fallback，防止刷新 404）
2. 使用 JS 平滑滚动代替 hash 跳转：
   ```js
   document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
   ```
3. Vue Router 配置 `scrollBehavior` 处理 hash 跳转

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

**`<img>` 的 `alt` 属性写法差异：**

| 写法 | 屏幕阅读器行为 | SEO |
|------|---------------|-----|
| `alt="描述文字"` | 朗读描述 | 有价值 |
| `alt=""`（空字符串） | **忽略此图**（装饰性图片） | 不传递权重，但不会惩罚 |
| **不写 `alt` 属性** | 可能朗读文件名（如 `IMG_2024.jpg`） | 体验差，质量评分低 |

> 装饰性图片（分割线、占位符）推荐写空 `alt=""`，而非省略不写。

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

> ⚠️ **协议相对 URL 现在不推荐**：
> 1. 如果 CDN 没配 HTTPS，HTTPS 页面加载会失败
> 2. 本地 `file://` 打开时，会变成 `file://cdn.example.com`，直接 404
> 3. CSP（Content Security Policy）难以控制
> 4. **现代推荐显式写 `https://`**

#### 相对路径格式

| 写法 | 含义 |
|------|------|
| `./file.html` | 当前目录下的文件（`./` 可省略） |
| `../file.html` | 上一级目录 |
| `../../file.html` | 上两级目录 |

**根路径（`/` 开头）的坑：**

| 写法 | 含义 | 何时 404 |
|------|------|---------|
| `images/logo.png` | **相对当前 HTML 文件**的路径 | 当前文件层级变了就 404 |
| `/images/logo.png` | **站点根目录**开始的绝对路径 | **本地直接打开文件（file 协议）时**，因为根目录是磁盘根，不是你的项目文件夹 |

> 经典踩坑：代码部署到服务器正常，但双击本地 HTML 文件打开时图片/CSS 404——往往就是用了 `/` 开头的路径。

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

---

## 八、面试深挖补充（易错 + 工程化）

### 8.1 超长英文/URL 自动换行

连续的英文字母/数字如果没有空格分隔，会被视为一个整体（单词），**不会在中间自动换行**，可能撑破容器。

**CSS 解决方案对比：**

| 属性 | 行为 | 适用场景 |
|------|------|---------|
| `overflow-wrap: break-word` | 先尝试正常换行，**只有溢出时才断开单词** | **推荐**，最优雅 |
| `word-break: break-all` | 任意字符处都强制断行 | 暴力方案，可能把正常单词劈开 |
| `hyphens: auto` | 在正确音节位置加连字符断词 | 英文排版最优雅，需设置正确的 `lang` |

```css
.long-text {
  overflow-wrap: break-word;  /* 推荐 */
}
```

> `overflow-wrap` 以前叫 `word-wrap`，两者是别名关系。

### 8.2 邮件模板（EDM）的特殊写法

邮件客户端（尤其是 Windows Outlook）对 CSS 支持极差，**不能用现代 HTML5 写法**。

| 现代网页 | 邮件模板 EDM |
|---------|-------------|
| `div` + flex/grid 布局 | **`<table>` 表格布局**（Outlook 只认这个）|
| 外部/内部 CSS | **全部 `style` 内联**（`<style>` 标签常被过滤）|
| `margin` 简写 | Outlook 支持极差，多用 `cellpadding` / `cellspacing` |
| `border-radius`、`box-shadow` | 部分客户端不支持，需做降级 |
| 语义化标签（`header`、`main`） | **全部用 `table`、`tr`、`td`** |
| JS | **完全不能用** |
| `background-image` | 默认不加载，重要信息不能放图里 |

> **为什么？** Windows Outlook 使用的是 Word 的 HTML 渲染引擎，CSS 支持停留在 2000 年代。
