##### 查看滚动条滚动的距离

> 1. `window.pageXOffset` X轴滚动条滚动的像素
> 2. `window.pageYOffset` Y轴滚动条滚动的像素
>
> 以上 `IE8` 及 `IE8` 一下不兼容
>
> `docuemnt.(body/documentElement).(scrollLeft/scrollTop)`
>
> 兼容性比较混乱，用时取两个值相加，因为不可能存在两个同时有值
>
> 封装兼容方法，求滚动条滚动距离 `getScrollOffset`
>
> ```javascript
> function getScrollOffset(){
>     if(window.pageXOffset){
>         return {
>             x: window.pageXOffset,
>             y: window.pageYOffset
>         }
>     }else{
>         return {
>             x: document.body.scrollLeft + document.documentElement.scrollLeft,
>             y: document.body.scrollTop + document.documentElement.scrollTop
>         }
>     }
> }
> ```

##### 查看可视区窗口的尺寸

>`window.innerWidth`、`window.innerHeight` `IE8` 及 `IE8` 以下不兼容 
>
>`document.documentElement.clientWidth`、`document.documentElement.clientHeight` 标准模式下任意浏览器都兼容
>
>`document.body.clientWidth`、`document.body.clientHeight` 适用于怪异模式下的浏览器
>
>封装兼容方法，返回浏览器视口尺寸 `getViewportOffset`
>
>```javascript
>function getViewportOffset(){
>    if(window.innerWidth){
>        return {
>            x: window.innerWidth,
>            y： window.innerHeight
>        }
>    }else{
>        if(document.compatMode === "BackCompat"){
>            //怪异模式
>            return {
>                x: document.body.clientWidth,
>                y: document.body.clientHeight
>            }
>        }else{
>            //标准模式
>            return {
>                x: document.documentElement.clientWidth,
>                y: document.documentElement.clientHeight
>            }
>        }
>    }
>}
>```
>
>

```javascript
<!DOCTYPE html>   <!-- 如果把这一行删了，浏览器就会以怪异模式（也叫混杂模式）渲染HTML页面，加上就是标准模式 -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
```

##### 查看元素几何尺寸

>`domEle.getBoundingClientRect()` 兼容性好
>
>返回值：对象（包含元素左、右两个边离浏览器左边的距离，上下两个边离浏览器上边的距离，和元素自身的宽高；left、right、top、bottom、width、height）
>
>width和height在老版本IE中没有实现，且返回的结果并不是实时的
>
>
>
>`dom.offsetWidth`、`dom.offsetHeight`也可以求出元素的宽高，且是实时的
>
>以上所求宽高都是包含padding、border、content的

##### 查看元素位置

> `dom.offsetLeft`、`dom.offsetTop` 对于无定位的父级元素，返回相对文档的坐标。对于有定位的父级元素，返回相对于最近的有定位的父级元素的坐标。
>
> `dom.offsetParent` 返回最近的有定位的父级元素，如无，返回 `body`，`body.offsetParent` 返回 `null`

求元素相对于文档的坐标 `getElementPosition`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div,
        p,
        span,
        strong {
            display: block;
            border: 1px solid blick;
        }
        div {
            position:relative;
            border:1px solid red;
            margin-left: 20px;
            margin-top:20px;
            width: 250px;
            height: 250px;
            background-color: pink;
        }
        p {
           position:relative;
           margin-left: 20px;
            margin-top:20px;
            width: 200px;
            height: 200px;
            background-color: aqua; 
        }
        span {
            width: 100px;
            height: 100px;
            background-color: pink;
            margin-left: 20px;
            margin-top: 20px;
        }
        strong {
            position: relative;
            margin-left: 20px;
            margin-top: 20px;
            width: 50px;
            height: 50px;
            background-color: aqua;
        }
    </style>
</head>
<body>
    <div>
        <!-- <p> -->
        <span>
            <strong></strong>
        </span>
        <!-- </p> -->
    </div>
    <script>
        Element.prototype.getElementPosition = function () {
            // debugger;
            var that = this; //保存当前正在计算的元素

            var offset = { x: 0, y: 0 }; //初始化位置

            // 先计算目标元素的位置
            offset.x = that.offsetLeft;
            offset.y = that.offsetTop

            // 返回有定位的父元素的位置，并且累加
            function retParentEOffset(p) {
                var x, y;
                //if (p.style['border-width'] !== '') { //或者下面这种写法也行
                if(p.style.borderWidth !== '')
                    //var borderWidth = p.style['border-width'].slice(0, -2) * 1;
                    //也可以使用parseInt来取出数字部分
                    var borderWidth = parseInt(p.style.borderWidth);
                    x = p.offsetLeft + borderWidth;
                    y = p.offsetTop + borderWidth;
                } else {
                    x = p.offsetLeft;
                    y = p.offsetTop;
                }
                offset.x = offset.x + x;
                offset.y = offset.y + y;
            }

            var parentE = that.parentElement; //目标元素的父元素
            // console.log(parentE.style.position === '')
            // debugger
            while (parentE) {
                //dom.style.prop 只能读写行间（内联）样式表，因此以上写法不生效（因为是内部样式表）
                if (parentE.style.position !== '') {
                    retParentEOffset(parentE);
                }
                parentE = parentE.parentElement;
            }
            return offset;
        }
        var dv = document.getElementsByTagName('strong')[0];
        var position_d = dv.getElementPosition();
        console.log(position_d)
    </script>
</body>

</html>
```

##### 让滚动条滚动

> window 上有三个方法
>
> `scroll()、scrollTo()、scrollBy()`
>
> 这三个方法功能类似，用法都是将x、y坐标传入。即实现让滚动条滚动到当前位置。
>
> 区别：`scrollBy()` 会在之前的数据基础之上做累加，`scroll()` 和 `scrollTo` 没有任何差别。

eg：利用 `scrollBy` 做快速阅读功能

##### 脚本化`CSS`

> ###### 读写元素`css`属性
>
> `document.style.pop` 
>
> 想通过脚本写入样式，只有通过 `style` 属性，没有其他可以写入的方法
>
> 1. 可读写<font color=red>行间</font>样式，没有兼容性问题，碰到`float`这样的保留字属性，前面应加`css`，比如 `float`---->`cssFloat`，虽然前面不加`css`，目前也没问题，但是`w3c`标准是建议加的。
> 2. 复合属性建议拆解(比如：border 是分为 `borderWidth`、`borderColor`、`borderStyle`)，组合单子变小驼峰式写法。
> 3. 写入的值必须是字符串格式。
>
> ###### 查询计算样式
>
> `window.getComputedStyle(ele, null)`
>
> 获取的是显示样式，比如行间样式 `width` 是100，内部样式 `width` 是200，外部样式 `width`是300加了 !important
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
>     <head>
>         <meta charset="UTF-8">
>     	<meta name="viewport" content="width=device-width, initial-scale=1.0">
>     	<title>Document</title>
>         <style>
>             div{
>                 width:200px !important;
>                 height:200px;
>             }
>         </style>
>     </head>
>     <body>
>         <div style="width:100px;height:100px;">
>             
>         </div>
>     </body>
>     
>     <script>
>     	var dv = document.getElementsByTagName('div')[0];
>         console.log(dv.style.width);//100：只能获行内样式，没有设置的话，返回的就是空字符串
>         console.log(window.getCompotedStyle(dv,null)).width;//200：获取显示样式，获取的属性没有设置值的话就是默认值，而不是空字符串
>     </script>
> </html>
> ```
>
> 
>
> 1. 计算样式只读
> 2. 返回的计算样式的值都是绝对值，没有相对单位（比如：em、%、rem、auto）
> 3. `IE8` 及 `IE8` 以下不兼容
> 4. 第二个参数表示伪元素，比如：`::after`、`::before`、`::hover`，可以获取伪元素的样式表
>
> `IE8` 及 `IE8` 以下写法
>
> `ele.currentStyle`
>
> 1. 计算样式，只读
> 2. 返回的计算样式的值不是经过转换的绝对值
> 3. IE 独有的属性

`eg`：封装兼容方法 `getStyle(ele,prop)`

```javascript
Element.prototype.getStyle = function(prop){
    return this.currentStyle ? this.currentStyle[prop] : window.getComputedStyle(this,null)[prop]
}
```

任务：手写轮播图

##### 事件

> ###### 如何绑定事件
>
> 1. `ele.onxxx = function(){}`
>
>    1. 兼容性很好，但是同一个元素的同一个事件上只能绑定一个处理程序
>    2. 基本等同于写在HTML行间上，也叫句柄方式
>    3. 程序的 `this` 指向`dom`本身
>
> 2. `obj.addEventListener(type, fn, false)`
>
>    1. `IE9`以下不兼容，可以为一个事件绑定多个处理程序，但是同一个函数引用只能绑定一次
>
>    ```javascript
>    div.addEventListener('click', text, false);
>    div.addEventListener('click', text, false);
>    function test(){
>        console.log('a')
>    }
>    //只打印一个a
>    ```
>
>    2. 程序的 `this` 指向`dom`本身
>
>    1. 按照绑定的顺序执行
>
> 3. `obj.attachEvent('on'+type,fn)`
>
>    1. `IE` 独有，一个事件同样可以绑定多个处理程序，允许同一个处理函数重复绑定
>
>    ```javascript
>    div.attachEvent(onclick,text);
>    div.attachEvent(onclick,text);
>    function text(){
>        console.log('a')
>    }
>    //会打印两个a
>    ```
>
>    2. 程序 `this` 指向 `window`

封装 `addEvent` 方法，兼容代码

```javascript
function addEvent(ele, type, hanlde){
    if(ele.addEventListener){
        ele.addEventListener(type, handle, false);
    }else if(ele.attachEvent){
        ele.attachEvent(("on" + type, function(){
            handle.call(ele)
        }))
    }else{
        ele["on" + type] = handle;
    }
}
```

##### 解除事件处理程序

> 1. `ele.onclick = false/null`
>
> 2. `ele.removeListener(type, fn, false)`
> 3. `ele.detachEvent('on' + type, fn)`
>
> 若绑定匿名函数则无法解除

##### 事件处理模型--------事件冒泡、捕获

> 事件冒泡：
>
> + 结构上（非视觉上）嵌套关系的元素，会存在事件冒泡的功能，即同一事件，自子元素冒泡向父元素。
>
> 事件捕获：
>
> + 嵌套关系的元素，会存在事件冒泡的功能，即同一事件，自父元素捕获至子元素（事件源元素）。
> + IE 没有捕获事件
>
> 触发顺序：
>
> + 先捕获，后冒泡
> + focus、blur、change、submit、reset、select 等事件不冒泡。

`addEventListener(type, fn, boolean)` 第三个参数代表此事件使用冒泡模型还是捕获模型，冒泡模型是从目标元素向父元素冒泡执行，捕获模型是从父元素向目标元素捕获执行，执行顺序不一样，目前就谷歌浏览器才有捕获模型。

注意：老版本谷歌中，目标对象的函数执行，就叫函数执行，不叫捕获也不叫冒泡，执行顺序与捕获和冒泡模型无关，与定义的监听顺序有关，先定义先执行，后定义后执行

先写捕获，后写冒泡

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wapper {
            width: 300px;
            height: 300px;
            background-color: lightgreen;
        }

        .content {
            width: 200px;
            height: 200px;
            background-color: lightcoral;
        }

        .box {
            width: 100px;
            height: 100px;
            background-color: lightskyblue;
        }
    </style>
</head>

<body>
    <div class="wapper">
        <div class="content">
            <div class="box"></div>
        </div>
    </div>

    <script>
        var wapper = document.getElementsByClassName('wapper')[0];
        var content = document.getElementsByClassName('content')[0];
        var box = document.getElementsByClassName('box')[0];
        // 捕获模型
        wapper.addEventListener('click', function () {
            console.log('wapper捕获')
        }, true);
        content.addEventListener('click', function () {
            console.log('content捕获')
        }, true);
        box.addEventListener('click', function () {
            console.log('box捕获')
        }, true);
        // 冒泡模型
        wapper.addEventListener('click', function () {
            console.log('wapper冒泡')
        }, false);
        content.addEventListener('click', function () {
            console.log('content冒泡')
        }, false);
        box.addEventListener('click', function () {
            console.log('box冒泡')
        }, false);
    </script>
</body>

</html>
```

![捕获模型](E:\高级工程师\javascript基础\img\event_modle.png)

先写冒泡，后写捕获

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wapper {
            width: 300px;
            height: 300px;
            background-color: lightgreen;
        }

        .content {
            width: 200px;
            height: 200px;
            background-color: lightcoral;
        }

        .box {
            width: 100px;
            height: 100px;
            background-color: lightskyblue;
        }
    </style>
</head>

<body>
    <div class="wapper">
        <div class="content">
            <div class="box"></div>
        </div>
    </div>

    <script>
        var wapper = document.getElementsByClassName('wapper')[0];
        var content = document.getElementsByClassName('content')[0];
        var box = document.getElementsByClassName('box')[0];
        
        // 冒泡模型
        wapper.addEventListener('click', function () {
            console.log('wapper冒泡')
        }, false);
        content.addEventListener('click', function () {
            console.log('content冒泡')
        }, false);
        box.addEventListener('click', function () {
            console.log('box冒泡')
        }, false);

        // 捕获模型
        wapper.addEventListener('click', function () {
            console.log('wapper捕获')
        }, true);
        content.addEventListener('click', function () {
            console.log('content捕获')
        }, true);
        box.addEventListener('click', function () {
            console.log('box捕获')
        }, true);
    </script>
</body>

</html>
```

![捕获模型](E:\高级工程师\javascript基础\img\event_modle.png)

##### 取消冒泡和阻止默认事件

> ###### 取消冒泡：
>
> 1. `W3C`标准 `event.stopPropagation()`，但不支持 `IE9` 以下版本。
> 2. IE 独有 `event.cancelBubble = true`。新谷歌也实现了此属性
>
> 封装取消冒泡函数
>
> ```javascript
> function stopBubble(event){
>     if(event.stopPropagation){
>         event.stopPropagation();
>     }else{
>         event.cancelBubble = true;
>     }
> }
> ```
>
> ###### 阻止默认事件
>
> 1. 默认事件：表单提交、a标签跳转、右键菜单等
> 2. return false; 以对象属性的方式注册的事件才生效（句柄）
> 3. `event.preventDefault()`，`W3C`标准，`IE9 `以下不兼容
> 4. `event.returnValue = false;` 兼容 `IE`
>
> 封装阻止默认事件的方法
>
> ```javascript
> function cancelHandler(e){
>     if(e.preventDefault){
>         e.preventDefault();
>     }else {
>         e.returnValue = false;
>     }
> }
> ```
>

##### 事件对象

> `event || window.event`
>
> 1. 事件源对象
>    1. `event.target` 火狐只有这个
>    2. `event.srcElement` IE只有这个
>    3. Chrome这两个都有
> 2. 除了IE 之外的浏览器，其他浏览器都会把事件对象当做参数传递给处理函数，IE 的事件对象则是在 `window.event` 上

```javascript
ele.onclick = function (e) {
    var event = e || window.event;
    var target = e.target || e.srcElement;
}
```

##### 事件委托

如果有3000亿个`li`标签？或者最开始有10和`li`标签，动态想`ul`中再加10个`li`标签，怎样给`li`绑定单击事件，且输出`li`中的内容？

```html
<!DOCTYPE html>
<html lang="en">
<!--事件委托-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        .
        .
        .
    </ul>

    <script>
        var ul = document.getElementsByTagName('ul')[0];
        ul.onclick = function(e){
            if(e.target.nodeName === 'li'){
                console.log(e.target.innerHTML)
            }
        }
    </script>
</body>

</html>
```

##### 事件分类

1. 鼠标事件
   1. `click`、`mousedown`、`mouseup`、`mouseover`、`mouseout`、`mouseenter`、`mouseleave`、`mousemove`、`contextmenu`

拖动

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
    <div style="width: 100px; height: 100px; background-color: pink; position: absolute; top: 0; left: 0;"></div>

    <script>
        const div = document.getElementsByTagName('div')[0];

        div.onmousedown = function (e) {
            const event = e || window.event;
            // 鼠标按下的时候，离盒子左边的距离
            const disX = event.pageX - parseInt(div.style.left);
            // 鼠标按下的时候，离盒子上边的距离
            const disY = event.pageY - parseInt(div.style.top);

            div.onmousemove = function (e) {
                const event = e || window.event;
                // 移动盒子
                div.style.left = event.pageX - disX + 'px';
                div.style.top = event.pageY - disY + 'px';
            }

            div.onmouseup = function () {
                div.onmousemove = null;
            }

        }
    </script>
</body>

</html>
```

以上代码会有问题，当数遍移动速度特别快的时候，鼠标会抛到盒子外面，这样`onmousemove`就监听不到了，那么为什么鼠标会跑到盒子外面去呢？因数鼠标移动事件是系统的监听（屏幕的帧屏系统），可能就是每一秒数遍允许挪动100下，但是每一秒对事件的监听达不到100次。可能10毫秒监听一次，但是你1毫秒就挪出去了。

解决方案：div 换成 document

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
    <div style="width: 100px; height: 100px; background-color: pink; position: absolute; top: 0; left: 0;"></div>

    <script>
        const div = document.getElementsByTagName('div')[0];

        div.onmousedown = function (e) {
            const event = e || window.event;
            // 鼠标按下的时候，离盒子左边的距离
            const disX = event.pageX - parseInt(div.style.left);
            // 鼠标按下的时候，离盒子上边的距离
            const disY = event.pageY - parseInt(div.style.top);

            document.onmousemove = function (e) {
                const event = e || window.event;
                // 移动盒子
                div.style.left = event.pageX - disX + 'px';
                div.style.top = event.pageY - disY + 'px';
            }

            document.onmouseup = function () {
                div.onmousemove = null;
            }

        }
    </script>
</body>

</html>
```

IE独有的一个牛逼的事件

> `ele.setCapture();` 会把任何地方发生的任何事件都绑定当自己身上来
>
> `ele.releaseCapture();` 取消`setCapture`方法的绑定

>只有 `mousedown` 和 `mouseup` 才能有获取是左键还是右键触发的。
>
>事件对象 `e` 有一个属性 `button` ,值为 `0` 表示左键，`2` 表示右键，`1` 表示中间键

##### 键盘事件

> `keydown`、`keyup`、`keypress`
>
> 顺序：`keydown` > `keypress` > `keyup`
>
> `keydown` 和 `keypress` 的区别
>
> 1. `keydown` 可以响应任何键盘事件，`keypress` 只能响应字符类按键的键盘事件
> 2. `keypress`返回ASCII码，可以转换成响应的字符

##### 文本类操作事件

> `input`、`change` 、`focus`、`blur`

##### 窗体操作类（window上的事件）

> `scroll`、`load`
>
> load：需要等到文档全部解析完成、`renderTree` 构建完成、DOM的文字，图片等全部下载完成，整个页面就绪了之后，load才会执行。
>
> 所以不建议使用load，直接把 `javascript` 放在 `body` 的最后面执行，页面只需要把 `dom` 解析完成就可以执行，执行效率比 `load` 高得多。
