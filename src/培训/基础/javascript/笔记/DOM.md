##### DOM

> `document` 代表整个文档
>
> `getElementsById()` 元素 id ，在 IE8 一下的浏览器，不区分 id 大小写，而且也返回匹配 name 属性的元素。（比如：`document.getElementsById('main')` 会匹配 id 属性为 main 的元素，没有 id 的话也会匹配 name 属性为 main 的元素）。
>
> `getElementsByTagName()` 标签名，类数组
>
> `getelementsByName()` 需注意，只有部分标签 name 可生效（表单、表单元素、img、iframe）
>
> `getElementsByClassName()` 类名，ie8 及一下版本的 ie 浏览器没有，可以多个 class 一起
>
> `querySelector()` css 选择器，在 ie7 和 ie7 一下的版本中没有，不是实时的，相当于是选择之后产生的一个副本，选择了之后，后面删除了，但是 `querySelector()` 选择的元素还在
>
> `querySelectorAll()` css 选择器，在 ie7 和 ie7 一下的版本中没有，不是实时的

##### 遍历节点树

>parentNode 父节点（最顶端的parentNode为#document）
>
>childNodes 子节点们
>
>firstChild 第一个子节点
>
>lastChild 最后一个子节点
>
>nextSibling 最后一个兄弟节点
>
>previousSibling 前一个兄弟节点

##### 节点类型

> 1. 元素节点-----1
> 2. 属性节点----2
> 3. 文本节点----3
> 4. 注释节点----8
> 5. document----9
> 6. documentFragment----11
>
> 调用 `nodeType` 返回对应的数

##### 基于`元素节点`树的遍历

> parentElement 返回当前元素的父元素节点（IE 不兼容）
>
> children 只返回当前元素的元素子节点
>
> node.childElementCount === node.children.length 当前元素节点的子元素节点个数
>
> firstElementChild 返回的是第一个元素节点（IE 不兼容）
>
> lastElementChild 返回的是最后一个元素节点（IE 不兼容）
>
> nextElementSibling/previousElementSibling 返回后一个/前一个兄弟元素节点

##### 节点的四个属性

> nodeName: 元素的标签名，以大写形式表示，只读
>
> nodeValue: Text(文本) 节点或 Comment(注释) 节点的文本内容，可读写。（只有文本节点和注释节点有这个属性）
>
> nodeType: 该节点的类型，只读（返回值为 1，2，3，8，9，11）
>
> attributes: Element 节点的属性集合

##### 节点的一个方法

> Node.hasChildNodes();

封装一个方法，不能用 children，返回左右直接子元素

```javascript
function retElementChild(node){
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    };
    var child = node.childNodes;
    var len = child.length;
    for(var i = 0; i < len; i++){
        if(child[i].nodeType === 1){
            temp.push(child[i]);
        }
    }
}
```

> document ======》 HTMLDocument.prototype =======》Document.prototype  继承关系
>
> ​     对象			      构造函数		原型				构造函数			原型

DOM继承树

![DOM继承树](.\img\DOM-Tree.png)

>1. getElementById 方法定义在 Document.prototype 上，即 Element 上不能使用。
>2. getElementsByName 方法定义在HTMLDocument.prototype 上，即非 html 中的 document 不能使用（xml document、Element）。
>3. getElementsByTagName 方法定义在Document.prototype 和 Element.prototype 上。
>4. HTMLDocument.prototype 定义了一些常用的属性，body、head 分别指代 HTML 文档中的 <body>、<head> 标签。（document.body、document.head）
>5. Document.prototype 上定义了documentElement属性，指代文档的根元素，在HTML文档中，它总是指代 <html> 元素。
>6. getElementsByClassName、querySelector、querySelectorAll 在Document.prototype、Element.prototype 类中均有定义。

生成节点树

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生成节点树</title>
</head>

<body>
    <div>
        <p>
            <span></span>
        </p>
        <strong>

        </strong>
        <div>
            <p>
                <i>
                    <a></a>
                </i>
            </p>
        </div>
    </div>
    <script>
        // 获取节点的nodeName
        function retNodeName(node) {
            return node.nodeName;
        }

        function retNodeTree(node) {
            // 初始化一个节点树
            const nodeTree = {
                length: 0,
            };
            Object.defineProperties(nodeTree, {
                push: {
                    value: Array.prototype.push,
                    enumerable: false
                },
                splice: {
                    value: Array.prototype.splice,
                    enumerable: false
                }
            })
            // 找到文档中的所有子节点
            const nodes = node.childNodes;
            // 判断document中有没有你子节点
            // debugger;
            if (nodes.length > 0) {
                // 有子节点的话，遍历所有节点
                for (let i = 0; i < nodes.length; i++) {
                    // 找到元素节点
                    if (nodes[i].nodeType === 1) {
                        const nodeName = retNodeName(nodes[i]);
                        // nodeTree.push(nodeName);
                        // 将元素节点添加到nodeTree中
                        if (nodes[i].children.length > 0) {
                            // 有子节点
                            nodeTree.push({ nodeName: nodeName, childrens: retNodeTree(nodes[i]) });
                        } else {
                            // 没有子节点
                            nodeTree.push(nodeName);
                        }
                    }
                };
            }
            return nodeTree;
        };
        const node = document.body;
        const nodeTree = retNodeTree(node);
        console.log(nodeTree)
    </script>
</body>

</html>
```

返回元素的子元素节点

```javascript
Element.prototype.myChildren = function(){
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for(var i = 0; i < len; i++){
        if(child[i].nodeType == 1){
            arr.push(child[i])
        }
    }
    return arr;
}
```

返回第 n 个兄弟元素

```javascript
function retSibling(e, n){ //当前元素，第 n 个
    while(e && n){
        if(n > 0){
            e = e.nextElementSibling;
            n --;
        }else{
            e = e.previousElementSibling;
            n ++;
        }
    };
    return e;
}

function retSibling(e, n){ //当前元素，第 n 个
    while(e && n){
        if(n > 0){
            if(e.nextElementSibling){
                e = e.nextElementSibling;
            }else{
                for(e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
            }
            n --;
        }else{
            if(e.previousElementSibling){
                e = e.previousElementSibling;
            }else{
                for(e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling;);
                 n ++;
            }
        }
    };
    return e;
}
```

> 增：
>
> 1. document.createElement().
> 2. document.createTextNode().
> 3. document.createComment().
> 4. document.createDocumentFragment().
>
> 插：
>
> 1. parentNode.appendChild().   已有的部分插入到另一部分里面，那就是剪切操作
>
> ```javascript
> var div = docuemnt.getElementByTagName('div')[0];
> var span = document.getElementByTagName('span')[0];
> var p = document.createElement('p');
> var i = document.createElement('i');
> div.appendChild(span); 
> div.appendChild(p);
> p.appendChild(i);
> var text = document.createTextNode('hello word');
> span.appendChild(text);
> 
> ```

![图解](.\img\node-eg.png)

```javascript
var div = docuemnt.getElementByTagName('div')[0];
var span = document.getElementByTagName('span')[0];
var p = document.createElement('p');
var i = document.createElement('i');
div.appendChild(span); 
div.appendChild(p);
p.appendChild(i);
var text = document.createTextNode('hello word');
span.appendChild(text);

i.appendChild(text);//上面例子中，span 标签中的 text 元素消失了，是因为被剪切到了 i 元素中
```

![图解2](.\img\node-eg2.png)

> 1. parentNode.insertBefore(a, b).//父级调用
>
> ```javascript
> var div = docuemnt.getElementByTagName('div')[0];
> var span = document.getElementByTagName('span')[0];
> var strong = document.createElement('strong');
> var i = document.createElement('i');
> div.insertBefore(strong,span); //在div里面插入，把strong元素插入到span元素的前面
> ```
>
> 
>
> 删：
>
> 1. parent.removeChild(node).//有返回值，返回值就是被删除的元素，相当于剪切出，跟数组中的 pop 或 shift一样。
> 2. child.remove().//没有返回值，彻底删除
>
> 替换：
>
> parent.replaceChild(new, origin).

##### DOM基本操作

> Element 节点的一些属性
>
> 1. innerHTML
> 2. innerText（老版本火狐不兼容）/textContent（老版本IE不好使）
>
> Element 节点的一些方法
>
> 1. ele.setAttribute(key,value)
> 2. ele.getAttribute(key)

自己封装 insertAfter 方法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <p>
            <span></span>
        </p>
        <div></div>
        <span></span>
        <p></p>
    </div>
    <script>
        Element.prototype.insertAfter = function (ele, target) {
            var next = target.nextElementSibling;
            if (!next) {
                this.appendChild(ele);
            } else {
                this.insertBefore(ele, next);
            }
        }
        const dv = document.getElementsByTagName("div")[0];
        const p = dv.getElementsByTagName("p")[document.getElementsByTagName("p").length - 2];
        const s = document.createElement('strong');

        dv.insertAfter(s, p);
    </script>
</body>

</html>
```

##### 渲染树

> domTree + cssTree = randerTree
>
> domTree：深度优先（即会沿着一个枝找到头），dom节点的删除，添加，宽高变化，位置变化，display：none变成了display:block、offsetWidth、offsetHeight都是触发 `重排(reflow)`
>
> cssTree：颜色改变，背景图片改变、文字大小只会触发 `重绘(repaint)`

##### `script` 标签

> defer 异步下载，推迟执行

异步加载

demo.js

```javascript
function test(){
    console.log('a');
}
```



main.js

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "demo.js"; //这句执行完，系统就会下载地址里面的js文件

document.head.appendChild(script);// 只有把标签插入到页面中去，地址文件中的js代码才会执行

test();// test is not defined，因为文件是异步下载的，执行到只一句的时候，可能还没下载完。

setTimeout(function(){
    test();// 可以执行
},2000);
```

Chrome main.js

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'demo.js';

script.onload = function(){
    test();
};
document.head.appendCHild(script);
```

IE main.js

```javascript
var script = document.createElement('script');
script.type = 'test/javascript';
script.src = 'demo.js';
script.onreadystatechange = function(){
    if(script.readyState == 'complete' || script.readyState == 'loaded'){
        text();
    }
}
```

兼容性封装

```javascript
var script = document.createElement('script');
script.type = 'test/javascript';
script.src = 'demo.js';

if(script.readyState){
    script.onreadystatechange = function(){
        if(script.readyState == 'complete' || script.readyState == 'loaded'){
        	text();
    	}
    }
}else{
    script.onload = function(){
        test();
    }
};
document.head.appendChild(script);
```

最终写法：为什么要把 `script.src = 'demo.js'` 放在最后？

解析：因为如果网速飞快，特别快，刚执行完`script.src = 'demo.js'`，文件就已经被下载完成了，那么此时的状态就已经是 `complete` ，那么下面的监听函数就不会执行了，因为在绑定监听函数之前已经是最终状态了。

```javascript
var script = document.createElement('script');
script.type = 'test/javascript';

if(script.readyState){
    script.onreadystatechange = function(){
        if(script.readyState == 'complete' || script.readyState == 'loaded'){
        	text();
    	}
    }
}else{
    script.onload = function(){
        test();
    }
};

script.src = 'demo.js';
document.head.appendChild(script);
```

封装成函数：

```javascript
function loadScript(url, callback){
    var script = document.createElement('script');
script.type = 'text/javascript';
if(script.readyState){
    script.onreadystatechange = function(){
        if(script.readyState == 'complete' || script.readyState == 'loaded'){
        	callback();
    	}
    }
}else{
    script.onload = function(){
        callback();
    }
};
script.src = url;
document.head.appendChild(script);
}
```

使用 `loadScript`

```javascript
loadScript('demo.js', demo); //不能这么写，因为测试的demo会被当成变量，报错：demo is not defined

// 正确使用方法
loadScript('demo.js', function() { test(); }); // 传一个匿名函数过去，执行匿名函数的时候，匿名函数又把test执行了
```

##### javascript时间线

>1. 创建Document对象，开始解析web页面。解析HTML元素和他们的文本内容后添加Element对象和Text节点到文档中，这个阶段document.readyState=loading'.
>2. 遇到link外部css，创建线程加载，并继续解析文档。
>3. 遇到script外部js，并且没有设置async、defer，浏览器加载，并阻塞，等待js加载完成并执行该脚本，然后继续解析文档。
>4. 遇到script外部js，并且设置有async、defer，浏览器创建线程加载，并继续解析文档。对于async属性的脚本，脚本加载完成后立即执行，defer会推迟执行。（异步禁止使用document.write())
>5. 遇到img等，先正常解析dom结构，然后浏览器异步加载src，并继续解析文档。
>6. 当文档解析完成，document.readyState='interactive'。
>7. 文档解析完成后，所有设置有defer的脚本会按照顺序执行。（注意与async的不同，但同样禁止使用document.write())。
>8. document对象触发DOMContentLoaded事件，这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段（就是文档解析完成，解析后面还有执行的过程）。
>9. 当所有async的脚本加载完成并执行后、img等加载完成后，document.readyState='complete’，window对象触发load事件。
>10. 从此，以异步响应方式处理用户输入、网络事件等。
