# 安装

<font color='orange'>Vue支持所有兼容EcmaScript5的浏览器</font>

<font color="orange">Vue遵循[语义化版本控制](https://semver.org/lang/zh-CN/ '语义化版本控制')</font>

<font color="orange">[每个版本的更新日志](https://github.com/vuejs/vue/releases)</font>

### 安装方式

1. 直接下载并用`<script>`标签引入，<font color="red">Vue会被注册为一个全局变量</font>

   `开发版本：https://v2.cn.vuejs.org/js/vue.js 包含完整的警告和调试模式`

   `生产版本：https://v2.cn.vuejs.org/js/vue.min.js 删除了警告，代码进行了压缩`

2. CDN加速器引入

   对于制作原型或学习可以这样使用最新版本：

   `<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>`

   对于生产环境，推荐链接到一个明确的版本号和构建文件

   `<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14"></script>`

3. ES6模块化引入

   ```javascript
   <script type="module">
     import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.esm.browser.js'
   </script>
   ```

4. 在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 模块打包器配合使用。同时 Vue 也提供配套工具来开发[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)。

   ```
   # 最新稳定版
   $ npm install vue
   ```

5. 命令行工具（CLI）

   Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI 的文档](https://cli.vuejs.org/)。

   >CLI 工具需要用户对 Node.js 和相关构建工具有一定程度的了解。

### <font color="#42b983">#</font>术语

+ 完整版：同时包含编译器和运行时的版本。
+ 编译器：用来将模板字符串编译成为javascript渲染函数的代码。
+ 运行时：用来创建Vue实例、渲染并处理虚拟 DOM 等的代码，基本就是除了编译器之外的所有。

### <font color="#42b983">#</font>运行时+编译器 VS 只包含运行时

如果你需要在客户端编译模板（比如传入一个字符串 <font color="#d63200">`template`选项</font>，或挂在到一个 DOM 上以其内部的HTML作为模板），就需要加上编译器

```vue
// 需要编译器
new Vue({
	template:`<div>{{hi}}</div>`
})

// 不需要要编译器
new Vue({
	render(h){
		return h('div',this.hi)
	}
})
```

>当使用`vue-loader`或`vueify`的时候，*.vue文件内部的模板在构建时预编译成 Javascript。在最终打好的包里是不需要编译器的。运行时比完整版体积要小大约 30%。如果任然需要加完整版，则需要在打包工具里配置一个别名：

webpack

```javascript
module.exports = {
    resolve:{
        alias:{
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    }
}
```

# 介绍

>Vue的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM.

### 处理用户输入

为了让用户和你的应用进行交互，我们可以用 `v-on` 指令添加一个**事件监听器**，通过它调用在 Vue 实例中定义的方法：

```vue
<div id="app">
    <p>
        {{message}}
    </p>
    <button v-on:click="reverseMessage">反转消息</button>
</div>

<script>
	var app = new Vue({
        el:'#app',
        data:{
            message:'Hello Word'
        },
        methods:{
            reverseMessage(){
                this.message = this.message.split('').reverse(),join('');
            }
        }
    })
</script>
```

### 组件化应用构建

>组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：![Component Tree](https://v2.cn.vuejs.org/images/components.png)

在Vue里，一个组件本质上就是一个拥有预定义选项的Vue实例。在Vue中注册组件很简单：

```vue
// 定义名为todo-item的新组件
Vue.component('todo-item',{
template:'<li>这是个代办项</li>'
});
var app = new Vue({});
```

现在可以用它来构建另一个组件模板：

```vue
<div id="app">
    <ol>
    	<!--创建一个todo-item组件实例-->
    	<todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id">			</todo-item>
	</ol>
</div>


<script>
	Vue.component({
        props:['todo'],
        template:'<li>{{todo.text}}</li>'
    });
    var app = new Vue({
        el:'#app',
        data:{
           groceryList:[
               { id: 0, text: '蔬菜' },
      		   { id: 1, text: '奶酪' },
      		   { id: 2, text: '随便其它什么人吃的东西' }
           ] 
        }
    });
</script>
```

