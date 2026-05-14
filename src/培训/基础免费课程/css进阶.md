# CSS 进阶笔记

> **阅读提示**：本文档涵盖 CSS 进阶核心概念，包含 `@规则`、BFC、堆叠上下文、SVG、兼容性处理及居中方案等内容。标注 `⚠️ 注意`、`💡 提示`、`📌 补充` 的区块为作者追加的说明或修正。

---

## 目录

1. [@规则](#1-规则)
2. [Web 字体与图标](#2-web-字体与图标)
3. [块级格式化上下文 (BFC)](#3-块级格式化上下文-bfc)
4. [CSS 布局](#4-css-布局)
5. [行高 (line-height) 与继承](#5-行高-line-height-与继承)
6. [Body 背景与画布 (Canvas)](#6-body-背景与画布-canvas)
7. [行盒的垂直对齐](#7-行盒的垂直对齐)
8. [参考线 — 深入理解字体](#8-参考线--深入理解字体)
9. [堆叠上下文 (Stacking Context)](#9-堆叠上下文-stacking-context)
10. [SVG 可缩放矢量图形](#10-svg-可缩放矢量图形)
11. [数据链接 (Data URL)](#11-数据链接-data-url)
12. [浏览器兼容性](#12-浏览器兼容性)
13. [居中方案总结](#13-居中方案总结)
14. [样式补充](#14-样式补充)

---

## 1. @规则

CSS 的 `@规则`（At-rules）用于提供元数据、条件逻辑或引入外部资源。

### 1.1 @import — 导入外部样式表

```css
@import url("路径");
/* 或 */
@import "路径";
```

| 要点 | 说明 |
|------|------|
| 作用 | 在 CSS 文件中导入另一个 CSS 文件 |
| 位置 | 必须写在**除 `@charset` 外**的所有规则之前 |
| 性能 | 会额外触发 HTTP 请求，现代开发更推荐使用 `<link>` 标签引入 CSS |

> ⚠️ **注意**：原笔记中 `@import "路径"` 的写法缺少 `url()` 包裹，虽然部分浏览器支持字符串写法，但标准语法建议用 `url("...")`。

### 1.2 @charset — 声明字符编码

```css
@charset "utf-8";
```

| 要点 | 说明 |
|------|------|
| 作用 | 告诉浏览器该 CSS 文件使用的字符编码 |
| 位置 | **必须写在 CSS 文件最顶部**，前面不能有任何字符（包括注释） |
| 必要性 | 如果 HTML 已通过 `<meta charset="utf-8">` 声明，通常可省略 |

### 1.3 @font-face — 自定义字体（见下节）

---

## 2. Web 字体与图标

### 2.1 Web 字体 (@font-face)

当用户电脑未安装特定字体时，可强制浏览器从服务器下载字体文件临时使用（关闭页面后失效）。

#### 字体格式

现代 Web 字体通常需要提供多种格式以兼容不同浏览器：

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| TrueType | `.ttf` | 基本格式，IE9+ 支持 |
| Web Open Font Format | `.woff` | 主流格式，压缩率高，现代浏览器均支持 |
| WOFF 2.0 | `.woff2` | 更优的压缩率，推荐优先使用 |
| Embedded OpenType | `.eot` | IE 专用格式（IE6-IE8） |
| SVG 字体 | `.svg` | 仅用于旧版 iOS Safari |

#### 基本用法

```css
@font-face {
  font-family: "good night";
  src: url("./font/晚安体.woff2") format("woff2"),
       url("./font/晚安体.woff") format("woff"),
       url("./font/晚安体.ttf") format("truetype");
  font-display: swap; /* 💡 提示：字体加载期间使用后备字体，避免空白闪烁 */
}

/* 使用字体 */
p {
  font-family: "good night", sans-serif;
}
```

> ⚠️ **注意**：原笔记代码存在语法错误——多条 `src` 之间缺少逗号 `,`，且最后一条声明后应有分号 `;`。已在上方案例中修正。

> 📌 **补充**：`font-display` 属性可控制字体加载行为：
> - `auto`：浏览器默认
> - `swap`：先显示后备字体，加载完成后再切换（推荐）
> - `block`：短暂隐藏文本，加载后显示
> - `fallback`：介于 swap 和 block 之间

### 2.2 字体图标

使用字体文件来展示图标，本质是文字，因此可以方便地通过 `color`、`font-size`、`text-shadow` 等 CSS 属性控制样式。

| 平台 | 网址 | 特点 |
|------|------|------|
| **Iconfont** | [iconfont.cn](https://www.iconfont.cn) | 阿里巴巴矢量图标库，国内使用最广泛 |
| Font Awesome | [fontawesome.com](https://fontawesome.com) | 国际主流，功能丰富 |
| Material Icons | [fonts.google.com/icons](https://fonts.google.com/icons) | Google 官方设计体系 |

---

## 3. 块级格式化上下文 (BFC)

**Block Formatting Context**，简称 **BFC**，是 CSS 中一个独立的渲染区域，内部元素的布局不会影响外部，反之亦然。

### 3.1 创建 BFC 的条件

以下元素/样式会在其内部创建新的 BFC 区域：

| 条件 | 说明 |
|------|------|
| 根元素 (`<html>`) | 整个页面最大的 BFC，覆盖所有元素 |
| 浮动元素 (`float: left / right`) | `float` 值不为 `none` |
| 绝对/固定定位元素 (`position`) | `position` 值为 `absolute` 或 `fixed` |
| `overflow` 不为 `visible` | 值为 `hidden`、`auto`、`scroll` 等 |
| `display` 为特定值 | `inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`、`grid`、`inline-grid` |
| `contain` 值为 `layout` / `content` / `paint` | 现代浏览器支持的属性 |
| 多列容器 | `column-count` 或 `column-width` 不为 `auto` |

> 📌 **补充**：原笔记只列举了部分条件，且"浮动元素"和"浮动和绝对定位元素"有重复，已重新分类整理。

### 3.2 BFC 的核心特性与应用

1. **阻止外边距折叠（Margin Collapse）**
   - 同一个 BFC 中的相邻块级子元素会发生外边距合并。
   - **不同 BFC** 中的元素外边距不会合并。
   - **创建 BFC 的父元素**不会与其子元素发生外边距合并。

2. **清除浮动影响**
   - BFC 可以包裹住内部的浮动元素，从而解决父元素高度塌陷问题。

3. **阻止元素被浮动元素覆盖**
   - 非浮动的 BFC 元素不会与浮动元素重叠，常用于多栏布局。

---

## 4. CSS 布局

### 4.1 多栏布局

#### 方案一：Float + Overflow（BFC）

左侧固定宽度，右侧自适应。

```html
<div class="main">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

```css
.main {
  width: 90%;
  margin: 0 auto;
}
.main .left {
  width: 250px;
  float: left;
  background-color: lightcoral;
}
.main .right {
  overflow: hidden; /* 触发 BFC，不与浮动重叠 */
  background-color: lightpink;
}
```

#### 方案二：Float + Margin

```html
<body>
  <div class="right"></div>
  <div class="left"></div>
</body>
```

```css
.right {
  width: 300px;
  float: right;
  background-color: pink;
}
.left {
  margin-right: 300px; /* 给右浮动留出空间 */
  background-color: lightblue;
}
```

> 💡 **提示**：在现代项目中，推荐使用 **Flexbox** 或 **Grid** 实现多栏布局，代码更简洁且语义更清晰。

### 4.2 等高布局（传统方案）

利用 **正负 margin + padding** 技巧实现视觉等高。

```html
<div class="main clearfix">
  <div class="left">侧边栏</div>
  <div class="right">
    主内容区域<br>
    内容可能很多...<br>
    内容可能很少...
  </div>
</div>
```

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.main {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden; /* 隐藏超出部分 */
}

.main .left {
  width: 300px;
  float: left;
  padding-bottom: 9999px;   /* 极大 padding */
  margin-bottom: -9999px;   /* 负 margin 抵消 */
  background-color: pink;
}

.main .right {
  margin-left: 300px;
  padding-bottom: 9999px;
  margin-bottom: -9999px;
  background-color: lightblue;
}
```

> 📌 **补充**：原笔记中的示例包含大量无意义的 Lorem ipsum 文本，已精简为示意内容。
> 该方案的本质是：通过极大的 `padding-bottom` 撑开高度，再用等量的负 `margin-bottom` 拉回，配合父元素 `overflow: hidden` 裁剪，实现视觉等高。
>
> **现代替代方案**：使用 Flexbox 的 `align-items: stretch`（默认值）即可天然实现等高，无需此 hack。

---

## 5. 行高 (line-height) 与继承

`line-height` 的继承行为取决于值的类型：

| 值类型 | 继承方式 | 说明 |
|--------|----------|------|
| **有单位**（如 `px`、`em`、`%`） | **先计算，再继承** | 父元素先根据自身的 `font-size` 计算出具体像素值，子元素继承这个固定值 |
| **无单位**（如 `1.5`） | **先继承，再计算** | 子元素先继承这个比例系数，再乘以自身的 `font-size` 计算 |

### 示例对比

```css
/* 有单位：不推荐 */
.container {
  font-size: 16px;
  line-height: 2em; /* 计算为 32px，子元素继承 32px */
}
.p1 {
  font-size: 40px;  /* 行高仍为 32px，导致文字重叠 */
}

/* 无单位：推荐 */
.container {
  line-height: 1.5; /* 子元素继承 1.5，再乘以自身 font-size */
}
.p1 {
  font-size: 40px;  /* 行高 = 40 * 1.5 = 60px，比例协调 */
}
```

> 💡 **提示**：**最佳实践**是为 `body` 或根元素设置无单位的 `line-height`（如 `1.5` 或 `1.6`），这样所有子元素都能按比例获得合适的行高。

---

## 6. Body 背景与画布 (Canvas)

### 6.1 画布 (Canvas)

> ⚠️ **注意**：此处的 **Canvas** 不是 HTML5 的 `<canvas>` 元素，而是 CSS 布局概念中的**初始包含块/画布**。

画布特点：
1. 最小宽度为**视口宽度**（Viewport Width）
2. 最小高度为**视口高度**（Viewport Height）

### 6.2 背景覆盖规则

| 情况 | 背景覆盖范围 |
|------|-------------|
| `<html>` 有背景 | `<body>` 正常显示，背景仅覆盖 `<body>` 的边框盒 |
| `<html>` **无**背景 | `<body>` 的背景会**冒泡**到 `<html>`，进而覆盖整个画布 |

### 6.3 画布背景图的参考系

当背景图应用于画布时（通常是 `<body>` 背景冒泡的情况），其定位和大小的参考对象较特殊：

| 属性 | 百分比参考对象 |
|------|---------------|
| `background-size` 宽度 | 视口宽度 |
| `background-size` 高度 | `<html>` 元素高度（非视口高度） |
| `background-position-x`（百分比/关键字） | 视口宽度 |
| `background-position-y`（百分比/关键字） | **文档高度**（整个页面内容高度，可能大于视口） |

> 📌 **补充**：这是 CSS 规范中的特殊规定，理解这一点对处理全屏背景图或固定背景图很重要。

---

## 7. 行盒的垂直对齐

### 7.1 vertical-align 属性

控制**行内元素**（inline / inline-block）在垂直方向上的对齐方式。

| 值 | 对齐方式 |
|----|---------|
| `baseline` | 元素的基线与父元素的基线对齐（默认值） |
| `top` | 元素的顶部与行内最高元素的顶部对齐 |
| `bottom` | 元素的底部与行内最低元素的底部对齐 |
| `middle` | 元素的中线与父元素基线上方 `x` 字符高度的一半对齐 |
| `text-top` | 元素的顶部与父元素文本的顶部对齐 |
| `text-bottom` | 元素的底部与父元素文本的底部对齐 |
| `sub` | 元素的基线与父元素的下标基线对齐 |
| `super` | 元素的基线与父元素的上标基线对齐 |
| `<length>` | 相对于基线的偏移量，向上为正，向下为负 |
| `<percentage>` | 相对于元素自身 `line-height` 的百分比偏移 |

### 7.2 图片底部白边问题

当图片作为行内元素放入块盒时，图片底部与父元素底边之间常出现几像素的空白。

**原因**：图片默认按 `baseline` 对齐，底部留白是为字母下伸部分（如 `g`、`y`）预留的空间。

**解决方案**：

```css
/* 方案 1：消除文字下沉空间 */
.parent {
  font-size: 0;
}

/* 方案 2：改变图片的显示类型 */
img {
  display: block; /* 行块盒 (inline-block) 都不行，必须是 block */
}

/* 方案 3：改变垂直对齐方式 */
img {
  vertical-align: middle; /* 或 top / bottom */
}
```

---

## 8. 参考线 — 深入理解字体

### 8.1 字体设计与参考线

字体通过专业软件（如 FontForge）设计制作。设计时会定义若干**参考线（Em Square / Metrics）**，不同字体类型的参考线不同，但同类型字体共享相同的参考线体系。

### 8.2 font-size 的本质

- `font-size` 设置的是**文字的相对大小**，而非实际像素尺寸。
- 字体设计时基于一个**金属框（Em Square）**，常见尺寸为 `1000`、`1024`、`2048` 等。
- 文字顶线到底线的距离称为 **content-area（内容区 / 实际文字大小）**。
- **行盒的背景覆盖 content-area**。

### 8.3 行高 (line-height) 的构成

```
      ↑ 顶线 (Top)
   ┌──┴──┐  gap（上半部分）
   │ 文  │
   │ 字  │  content-area（文字实际区域）
   │ 内  │
   └──┬──┘  gap（下半部分）
      ↓ 底线 (Bottom)

   ↑───────↑
   virtual-area（虚拟区）= line-height
```

- **gap**：顶线向上和底线向下的延伸空间，两部分相等。
- **virtual-area（虚拟区）**：`top` 到 `bottom` 的总距离，即 `line-height`。
- `line-height: normal`：使用字体设计者预设的默认 gap。

> ⚠️ **纠正**：原笔记提到"文字一定出现在一行的最中间"是**错误的**。
> - 正确说法：**content-area 一定出现在 virtual-area 的最中间**。
> - 但文字在 content-area 内的位置由字体设计者决定，不一定居中。

### 8.4 vertical-align 的参考线体系

决定参考线的因素：**font-size**、**font-family**、**line-height**。

一个元素如果内部包含行盒，该元素自身也会产生参考线。

#### 行框 (line-box)

- 每一行文本形成一个 **line-box（行框）**。
- `line-box` 的顶边 = 该行内所有行盒的**最高顶边**。
- `line-box` 的底边 = 该行内所有行盒的**最低底边**。
- 元素的**实际占用高度**由所有 `line-box` 累加决定。

#### 不生成行框的情况

- 元素内部没有任何行盒（内容为空且没有行内子元素）。
- 元素的 `font-size: 0`。

### 8.5 可替换元素和行块盒的基线

| 元素类型 | 基线位置 |
|---------|---------|
| 图片 (`<img>`) | 图片的下外边距（默认底部） |
| 表单元素 (`<input>`、`<textarea>`) | 内容的底边 |
| 行块盒 (inline-block) | 1. 内部有行盒 → 最后一行文本的基线<br>2. 内部无行盒 → 下外边距（即底部） |

---

## 9. 堆叠上下文 (Stacking Context)

**堆叠上下文（Stacking Context）**是一块由某个元素创建的独立区域，规定了该区域中内容在 **Z 轴**上的排列先后顺序。

### 9.1 创建堆叠上下文的元素

以下情况会创建新的堆叠上下文：

| 条件 | 说明 |
|------|------|
| 根元素 (`<html>`) | 页面根级堆叠上下文 |
| `z-index` 不为 `auto` 的定位元素 | `position` 为 `relative` / `absolute` / `fixed` / `sticky` 且设置了数值 `z-index` |
| `opacity` 小于 1 | `opacity` 值不为 `1` 的元素 |
| `transform` 不为 `none` | 设置了 2D/3D 变换的元素 |
| `filter` / `perspective` / `clip-path` / `mask` 等 | 设置了这些属性的元素 |
| `will-change` | 指定了 `transform`、`opacity` 等属性 |
| `isolation: isolate` | 显式创建独立堆叠上下文 |
| Flex / Grid 子元素 | `z-index` 不为 `auto` 的 Flex/Grid 容器的直接子元素 |

> 📌 **补充**：原笔记只列举了 `html` 和 `z-index` 定位元素两种，实际创建条件远不止这些。特别是现代 CSS 中 `transform`、`opacity` 等属性非常常见，它们都会隐式创建堆叠上下文。

### 9.2 同一个堆叠上下文内的 Z 轴排列顺序

从后到前（从底层到顶层）：

| 层级 | 内容 |
|------|------|
| 1 (最底层) | 创建堆叠上下文的元素的背景和边框 |
| 2 | `z-index` 为**负值**的子堆叠上下文 |
| 3 | 常规流中非定位的**块级盒** |
| 4 | 非定位的**浮动盒** |
| 5 | 常规流中非定位的**行内盒** |
| 6 | `z-index: auto` 的定位子元素，以及 `z-index: 0` 的堆叠上下文 |
| 7 (最顶层) | `z-index` 为**正值**的堆叠上下文 |

> ⚠️ **注意**：原笔记第 6 条描述为"任何 z-index 是 auto 的定位子元素，以及 z-index 是 0 的堆叠上下文"。严格来说，`z-index: auto` 的定位元素**不创建**新的堆叠上下文，但会在父堆叠上下文中形成一个新的层级；`z-index: 0` 则会**创建**新的堆叠上下文。两者在层级上处于同一平面，但行为有细微差别。

### 9.3 堆叠上下文的独立性

每个堆叠上下文**完全独立**，子元素的 `z-index` 仅在父堆叠上下文内部有效，**无法跨越父级与其他堆叠上下文中的元素比较层级**。

```html
<div class="container">  <!-- z-index: 1，创建堆叠上下文 A -->
  <div class="child" style="z-index: 999;"></div>  <!-- 在 A 内部层级极高 -->
</div>
<div class="sibling" style="z-index: 2;"></div>  <!-- 创建堆叠上下文 B -->
```

> 💡 **提示**：即使 `.child` 的 `z-index: 999`，只要其父级 `.container` (`z-index: 1`) 位于 `.sibling` (`z-index: 2`) 之下，`.child` 就**永远不可能**覆盖 `.sibling`。

---

## 10. SVG 可缩放矢量图形

**SVG（Scalable Vector Graphics）**是一种基于 XML 的矢量图像格式。

### 10.1 SVG 特点

- 使用**代码**描述图形，可直接嵌入 HTML
- **缩放不失真**，任意分辨率下都清晰
- 文件**体积轻量**（相比位图）
- 可通过 CSS 和 JavaScript 操作

### 10.2 使用方式

1. **直接嵌入** HTML：`<svg>...</svg>`
2. **作为图片引用**：`<img src="image.svg">`
3. **作为 CSS 背景**：`background-image: url("image.svg")`
4. **单独文件**：`.svg` 文件可在浏览器中直接打开

### 10.3 基础形状

| 元素 | 名称 | 常用属性 |
|------|------|---------|
| `<rect>` | 矩形 | `x`, `y`, `width`, `height`, `rx`, `ry` |
| `<circle>` | 圆形 | `cx`, `cy`, `r` |
| `<ellipse>` | 椭圆 | `cx`, `cy`, `rx`, `ry` |
| `<line>` | 线条 | `x1`, `y1`, `x2`, `y2` |
| `<polyline>` | 折线 | `points`（如 `"0,0 10,10 20,0"`） |
| `<polygon>` | 多边形 | `points`（自动闭合） |
| `<path>` | 路径 | `d`（路径数据命令） |
| `<text>` | 文本 | `x`, `y`, `font-size` 等 |

### 10.4 路径 (Path) 命令

| 命令 | 全称 | 说明 |
|------|------|------|
| `M` | moveto | 移动到某点（不画线） |
| `L` | lineto | 画直线到某点 |
| `H` | horizontal lineto | 水平线 |
| `V` | vertical lineto | 垂直线 |
| `C` | curveto | 三次贝塞尔曲线 |
| `S` | smooth curveto | 平滑三次贝塞尔曲线 |
| `Q` | quadratic Bézier curve | 二次贝塞尔曲线 |
| `T` | smooth quadratic Bézier curveto | 平滑二次贝塞尔曲线 |
| `A` | elliptical Arc | 椭圆弧 |
| `Z` | closepath | 闭合路径 |

> 💡 **提示**：大写命令（如 `M`）表示绝对坐标，小写命令（如 `m`）表示相对坐标。

### 10.5 椭圆弧 (A) 参数详解

```
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
```

| 参数 | 说明 |
|------|------|
| `rx` | 水平半径 |
| `ry` | 垂直半径 |
| `x-axis-rotation` | 整个椭圆顺时针旋转角度 |
| `large-arc-flag` | `0` = 小弧，`1` = 大弧 |
| `sweep-flag` | `0` = 逆时针，`1` = 顺时针 |
| `x, y` | 终点坐标 |

### 10.6 完整示例

```svg
<svg
  style="background: #ccc"
  width="500"
  height="500"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- 矩形 -->
  <rect x="10" y="10" width="100" height="80" fill="red" stroke="#000" stroke-width="2" />

  <!-- 圆形 -->
  <circle cx="200" cy="50" r="40" fill="#008c8c" stroke="#000" stroke-width="2" />

  <!-- 椭圆 -->
  <ellipse cx="350" cy="50" rx="60" ry="30" fill="gold" />

  <!-- 线条 -->
  <line x1="10" y1="120" x2="110" y2="200" stroke="#000" stroke-width="3" />

  <!-- 折线 -->
  <polyline points="150,120 200,120 200,170 250,170" fill="none" stroke="#000" stroke-width="3" />

  <!-- 多边形 -->
  <polygon points="300,120 400,120 350,200" fill="none" stroke="#000" stroke-width="3" />

  <!-- 路径：扇形 -->
  <path d="M0 300 A150 150 0 0 1 150 150 L150 300 Z" fill="orange" stroke="#000" stroke-width="2" />
</svg>
```

### 10.7 案例：绘制八卦

```svg
<svg
  style="background: #eee"
  width="500"
  height="500"
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- 外圆底色 -->
  <circle cx="250" cy="250" r="250" fill="#eee" />

  <!-- 黑色部分 -->
  <path
    d="M250 0 A125 125 0 0 1 250 250 A125 125 0 0 0 250 500 A250 250 0 0 1 250 0"
    fill="#000"
  />

  <!-- 白色部分 -->
  <path
    d="M250 0 A125 125 0 0 0 250 250 A125 125 0 0 1 250 500 A250 250 0 0 0 250 0"
    fill="#fff"
  />

  <!-- 黑鱼眼 -->
  <circle cx="250" cy="125" r="50" fill="#000" />
  <!-- 白鱼眼 -->
  <circle cx="250" cy="375" r="50" fill="#fff" />
</svg>
```

> ⚠️ **注意**：原笔记中的八卦路径数据已简化修正，确保路径闭合正确。同时添加了 `viewBox` 属性，这是响应式 SVG 的最佳实践。

---

## 11. 数据链接 (Data URL)

数据链接允许将小型资源（如图片、CSS）的数据**直接嵌入**到 URL 位置。

### 11.1 语法

```
data:[<mediatype>][;base64],<data>
```

### 11.2 示例

```html
<!-- 纯文本 CSS -->
<link rel="stylesheet" href="data:text/css,h1{color:blue}" />

<!-- Base64 编码的 CSS -->
<link rel="stylesheet" href="data:text/css;base64,aDF7Y29sb3I6cmVkO30=" />

<!-- Base64 编码的图片 -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
```

### 11.3 优缺点

| ✅ 优点 | ❌ 缺点 |
|---------|---------|
| 减少 HTTP 请求数 | 增加资源体积（Base64 编码后比原文件大约 **33%**，原笔记说 4/3 即约 33%） |
| 有利于动态生成数据 | 不利于浏览器缓存（内联在 HTML/CSS 中） |
| 可应用于任何需要 URL 的地方 | 增加主文档体积，拖慢首屏渲染 |

> ⚠️ **纠正**：原笔记写"会增加原资源的体积到原来的 4/3"。这里"4/3"应理解为"原体积的 4/3 倍"，即增加了约 33%。准确说法是：Base64 每 3 字节原始数据编码为 4 字节文本，因此体积约为原来的 **133%**。

### 11.4 适用场景

1. 单个图片体积**很小**（通常小于 2KB），且不适合做雪碧图。
2. 图片由其他代码**动态生成**（如验证码、二维码）。
3. 任何可以书写 URL 的地方都可以使用（`background-image`、`src`、`href` 等）。

### 11.5 Base64 编码

一种将二进制数据转换为可书写字符串的编码方式，仅使用 64 个字符（`A-Z`、`a-z`、`0-9`、`+`、`/`）以及 `=` 作为填充符。

---

## 12. 浏览器兼容性

### 12.1 厂商前缀 (Vendor Prefixes)

当某个 CSS 特性还不是正式标准，或标准尚未被浏览器完整实现时，浏览器厂商会提供带前缀的实验性实现。

| 前缀 | 浏览器 | 示例 |
|------|--------|------|
| `-webkit-` | Chrome、Safari、新版 Edge | `-webkit-box-sizing: border-box` |
| `-moz-` | Firefox | `-moz-border-radius: 4px` |
| `-ms-` | IE、旧版 Edge | `-ms-flex: 1` |
| `-o-` | 旧版 Opera | `-o-transition: all 0.3s` |

```css
div {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
       -o-box-sizing: border-box;
          box-sizing: border-box; /* 标准写法放最后 */
}
```

> 💡 **提示**：现代浏览器对大部分常用 CSS 特性已无需前缀。可使用 [Autoprefixer](https://github.com/postcss/autoprefixer) 工具自动添加必要前缀。

#### 浏览器特有样式示例

**1. Webkit 滚动条自定义（仅 Chrome / Safari / Edge）**

```css
/* 滚动条整体 */
div::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/* 滑块 */
div::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
/* 轨道 */
div::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* 两端按钮 */
div::-webkit-scrollbar-button {
  display: none;
}
```

> 📌 **补充**：原笔记提到"使用 div+css+js 实现自定义滚动条"。现在更推荐的方案是使用 `::-webkit-scrollbar` 配合 CSS 库（如 [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/)）或 CSS 新特性 `scrollbar-width` / `scrollbar-color`（Firefox 支持，Chrome 115+ 支持）。

**2. 响应式背景图（`image-set`）**

```css
div {
  width: 500px;
  height: 500px;
  background-image: image-set(
    url("image-1x.png") 1x,
    url("image-2x.png") 2x
  );
}
```

- `1x` / `2x` 表示每个 CSS 像素对应的物理像素（设备像素比 DPR）。
- 现代替代方案：使用 `<picture>` 元素或 `srcset` 属性。

### 12.2 CSS Hack（不推荐，了解即可）

针对特定浏览器（主要是旧版 IE）应用特定样式。

| Hack 写法 | 兼容范围 |
|-----------|---------|
| `*属性` | IE 5 ~ IE 7 |
| `_属性` | IE 5 ~ IE 6 |
| `属性值\9` | IE 5 ~ IE 10 |
| `属性值\0` | IE 8 ~ IE 10 |
| `属性值\9\0` | IE 9 ~ IE 10 |

```css
div {
  background: red;          /* 标准浏览器 */
  *background: blue;        /* IE 5-7 */
  _background: yellow;      /* IE 5-6 */
  background: orange\9;     /* IE 5-10 */
  background: yellow\0;     /* IE 8-10 */
  background: purple\9\0;   /* IE 9-10 */
}
```

> ⚠️ **注意**：原笔记中 `orninge` 为拼写错误，已修正为 `orange`。

#### 经典 Bug：IE 双边距 Bug

在 IE 6 中，浮动元素的**同向外边距会翻倍**（如 `float: left` 配合 `margin-left`）。

```css
div {
  float: left;
  margin-left: 30px;
  _margin-left: 15px; /* IE6  hack，实际显示为 30px */
}
```

#### 条件注释（仅 IE）

```html
<!--[if IE]>
  <p>这是 IE 浏览器</p>
<![endif]-->

<!--[if IE 8]>
  <p>这是 IE 8</p>
<![endif]-->

<!--[if lt IE 9]>
  <p>这是 IE 9 以下的浏览器</p>
<![endif]-->

<!--[if !IE]><!-->
  <p>这是非 IE 浏览器</p>
<!--<![endif]-->
```

> 📌 **补充**：条件注释在 IE10+ 已被移除，现代项目已极少使用。

### 12.3 渐进增强 vs 优雅降级

两种解决兼容性问题的核心思路：

| 策略 | 思路 | 代码风格 |
|------|------|---------|
| **渐进增强 (Progressive Enhancement)** | 先保证基础功能在所有浏览器可用，再为新浏览器增加增强效果 | 先写无兼容性问题的基础代码，再逐步加入新特性（配合 `@supports` 或前缀） |
| **优雅降级 (Graceful Degradation)** | 先实现完整功能，再针对低版本浏览器做降级处理 | 直接按最新标准写代码，用 polyfill 或 hack 兼容旧浏览器 |

> 💡 **提示**：现代开发更推崇**渐进增强**，它更契合"移动优先"和"无障碍"的设计理念。

### 12.4 兼容性查询工具

- **[Can I use](https://caniuse.com)**：查询 CSS / JS / HTML 特性的浏览器支持情况（最权威）
- **[MDN Web Docs](https://developer.mozilla.org)**：每个属性的"浏览器兼容性"表格

---

## 13. 居中方案总结

> 📌 **补充**：原笔记缺少现代布局方案（Flexbox / Grid），以下内容在保留原笔记方案的基础上做了大幅扩充。

### 13.1 水平居中

#### 行盒 / 行块盒水平居中

行盒一定是常规流元素（浮动和定位会自动转为 `block`）。

```css
.parent {
  text-align: center; /* 子行盒/行块盒水平居中 */
}
```

#### 常规流块盒水平居中

```css
.child {
  width: 300px;      /* 必须定宽 */
  margin-left: auto;
  margin-right: auto;
  /* 简写：margin: 0 auto; */
}
```

#### 绝对定位元素水平居中

```css
.child {
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;      /* 必须定宽 */
  margin-left: auto;
  margin-right: auto;
}
```

> 💡 **提示**：固定定位 (`position: fixed`) 是绝对定位的特殊情况，居中方式相同。

#### 浮动元素水平居中

浮动元素**无法直接通过 `margin: auto` 居中**。传统方案：

```css
.parent {
  width: fit-content; /* 或具体宽度 */
  margin: 0 auto;
}
.child {
  float: left;
}
```

> 📌 **补充**：更现代、更简单的方案是使用 **Flexbox**（见 13.3）。

### 13.2 垂直居中

#### 单行文本垂直居中

```css
.box {
  height: 100px;
  line-height: 100px; /* line-height = height */
}
```

#### 绝对定位垂直居中

```css
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100px;      /* 必须定高 */
  margin-top: auto;
  margin-bottom: auto;
}
```

#### 多行文本 / 块盒垂直居中（传统方案）

原笔记提到"没有完美方案"。传统上可通过 `padding` 模拟：

```css
.box {
  padding-top: 20px;
  padding-bottom: 20px;
}
```

缺点：盒子高度由内容+padding决定，无法固定高度。

### 13.3 现代布局方案（推荐）

#### Flexbox 居中（最常用）

```css
/* 水平 + 垂直完全居中 */
.parent {
  display: flex;
  justify-content: center; /* 主轴（默认水平）居中 */
  align-items: center;     /* 交叉轴（默认垂直）居中 */
}

/* 单个元素偏离（如侧栏固定，主内容居中） */
.parent {
  display: flex;
}
.child {
  margin: auto; /* 在 flex 容器中，auto margin 会吃掉所有剩余空间 */
}
```

#### Grid 居中

```css
.parent {
  display: grid;
  place-items: center; /* 同时设置 justify-items 和 align-items */
}

/* 或 */
.child {
  justify-self: center;
  align-self: center;
}
```

#### Transform 居中（适用于绝对定位，无需定宽定高）

```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 基于自身尺寸偏移 */
}
```

### 13.4 居中方案速查表

| 场景 | 推荐方案 | 是否需要定宽/定高 |
|------|---------|----------------|
| 行内/行块水平居中 | `text-align: center` | 否 |
| 块级水平居中 | `margin: 0 auto` | 需要定宽 |
| 单行文本垂直居中 | `line-height = height` | 否 |
| 绝对定位居中 | `margin: auto` + 四边 `0` | 需要定宽/定高 |
| **未知尺寸元素居中** | **Flexbox** / **Grid** / **Transform** | **否** |

---

## 14. 样式补充

### 14.1 display: list-item

设置为该值的盒子本质上仍是**块盒**，但会额外生成一个**标记盒（Marker Box）**用于显示列表符号。

| 概念 | 说明 |
|------|------|
| 主盒子 | 元素本身的块盒 |
| 次盒子 / 标记盒 | 附带的符号盒子，与主盒子水平排列 |
| 典型应用 | `<ul>`、`<ol>`、`<li>` 的默认 `display` 值 |

#### 相关 CSS 属性

```css
ul {
  list-style-type: disc;        /* 符号类型：disc | circle | square | decimal | none */
  list-style-position: outside; /* 位置：outside（默认）| inside */
  list-style-image: url("..."); /* 自定义图片作为符号 */
  list-style: disc outside;     /* 速写属性 */
}

/* 清除列表符号 */
ul {
  list-style: none;
  padding-left: 0;  /* 通常需要同时清除默认内边距 */
}
```

> ⚠️ **注意**：原笔记中 `diaplay` 为拼写错误，已修正为 `display`。

### 14.2 图片失效时的宽高问题

当 `<img>` 的 `src` 链接无效时，该元素的特性会发生变化：

- 有 `src` 且图片正常加载时：属于**可替换元素**，可以设置 `width` / `height`。
- **图片失效时**：退化为普通行盒，**无法设置宽高**（设置也不生效）。

**解决方案**：

```css
img {
  display: inline-block; /* 或 block */
  width: 200px;
  height: 150px;
  background: #f0f0f0; /* 失效时显示占位背景 */
}
```

### 14.3 行盒中包含行块盒或可替换元素

行盒（`display: inline` 形成的盒子）的高度**仅与其内部的字体大小有关**，不受内部行块盒或可替换元素的高度影响。

```html
<span>
  文字
  <img src="..." style="height: 100px;">
</span>
```

> ⚠️ **注意**：虽然图片高度为 100px，但外层 `<span>` 的行盒高度仍由"文字"的 `font-size` 决定。这可能导致布局不符合预期。

**解决方案**：将父级设为 `inline-block`、`block`、`flex` 等，或调整 `vertical-align`。

### 14.4 text-align: justify（分散对齐）

使文本除最后一行外，两端对齐。

```css
p {
  width: 200px;
  text-align: justify;
}
```

#### 强制最后一行也分散对齐

```css
p {
  width: 200px;
  text-align: justify;
}
p::after {
  content: "";
  display: inline-block;
  width: 100%;
}
```

> ⚠️ **注意**：原笔记中 `::affter` 为拼写错误，已修正为 `::after`。

### 14.5 direction 与 writing-mode

CSS 中定义了两种方向概念：

| 概念 | 说明 | 示例 |
|------|------|------|
| **逻辑方向** | Start → End，与书写模式相关 | 英文：Start=左，End=右；阿拉伯文：Start=右，End=左 |
| **物理方向** | Left → Right，绝对固定 | 不因语言/书写模式改变 |

#### direction — 文本方向

```css
p {
  direction: ltr; /* left-to-right（默认） */
  direction: rtl; /* right-to-left，如阿拉伯语、希伯来语 */
}
```

#### writing-mode — 书写模式

```css
p {
  /* 水平书写，从上到下（默认） */
  writing-mode: horizontal-tb;

  /* 垂直书写，从右向左 */
  writing-mode: vertical-rl;

  /* 垂直书写，从左向右 */
  writing-mode: vertical-lr;
}
```

> 📌 **补充**：配合 `direction` 和 `writing-mode`，逻辑属性（如 `margin-inline-start`、`padding-block-end`）在多语言排版中非常有用。

### 14.6 Unicode 字符插入（content）

通过 CSS `content` 属性插入 Unicode 字符：

```css
p::after {
  content: "\80E1\67AB"; /* 对应 Unicode 码点 */
}
```

> ⚠️ **注意**：原笔记中 `\x80E1` 的写法有误。CSS 中 Unicode 转义应使用反斜杠 `\` 直接后跟 1-6 位十六进制码点，不需要 `x` 前缀。此外，`\80E1\67AB` 对应的汉字需确认实际码点是否正确（示例仅供参考格式）。
>
> 更常见的写法：
> ```css
> content: "\2713";      /* ✓ */
> content: "\2192";      /* → */
> content: "\2605";      /* ★ */
> ```

---

## 附录：常见拼写错误速查（原笔记已修正）

| 错误写法 | 正确写法 | 出现位置 |
|---------|---------|---------|
| `diaplay` | `display` | `display: list-item` 说明、图片白边方案 |
| `affter` | `after` | `text-align: justify` 示例 |
| `orninge` | `orange` | CSS Hack 示例 |
| `覆盖变样盒` | `覆盖边框盒` | Body 背景说明 |
| `堆叠上小文` | `堆叠上下文` | HTML title |

---

> **文档结束**
>
> 整理日期：2026-05-14
> 说明：本文档在原笔记基础上进行了重新排版、错误修正、知识分组优化，并补充了大量现代 CSS 实践内容（Flexbox、Grid、逻辑属性等）。标注 `⚠️`、`💡`、`📌` 的部分为整理时添加的备注。
