# webpack打包优化（拆包）

1. 理解module、boundle、chunk的概念

   + module：我们使用import引入的每一个文件就是module

   + boundle：我们使用npm run bulild打包后，生成的每一个js文件

   + chunk：顾名思义就是代码块的意思，代码块的概念：比如 index1.js 文件里面引入了 index2.js 文件，index2.js文件引入了 index3.js文件......这样就形成了一个依赖，index1.js 文件把这些依赖全部加在一起，就形成了一个代码块chunk。

     产生chunk的方式主要有3种：

     1. 在entry中配置的入口，会产生一个chunk。多个入口就会产生多个chunk

        ```javascript
        module.exports = {
            entry:{
                main1:'./index.js',
                main2:'./index2.js'
            }
        }
        ```

        此时会产生两个chunk。

     2. 通过splitChunk来分割出来的chunk。在配置optimization.splitChunks时会产生新的chunk。

     3. 动态加载时，产生chunk：

        ```javascript
        function fun(){
            import './index2.js'
        }
        ```

     <font color="green">通常情况下，一个chunk会对应一个bound（一对一关系）</font>

### <font color="orange">背景：打包出来的boundle文件体积非常大（拆包）</font>

<font color="blue">optimization的中文意思是最优化、最佳化，就是优化的意思</font>。

```javascript
module.exports = {
    optimization:{
        splitChunks:{
            chunks:'async',   //有三个值async(只能从动态引入的文件里面进行chunk分割)、all、initial(只能从入口文件进行chunk分割)
            
            minSize:20000, //分割的chunk最小的体积为0字节，如果一个chunk的体积小于0字节，那么就不能对这个chunk进行分割
            
            minRemainingSize:0, //分割后的chunk不能小于0字节   可以对此进行修改，太小会增加请求的次数，得不偿失
            
            minChunks:1, //要被分割成chunk的module最少被一个chunk引用(默认配置)
            
            maxAsyncRequests:5, //被分割的chunk最大的动态引入不能超过5(默认值)个
            
            maxInitialRequests:3, //入口文件的chunk不能分割成3(默认值)个chunk以上
            
            enforceSizeThreshold:50000, //如果体积为大于50000字节，忽略所有的条件并且进行分割
            
            cacheGroups:{   //里面的对象名可以随意给
                
                defaultVendors:{
                    
                    test:/[\\/]node_module[\\/]/, //满足正则表达式时，才会进行分割
                    
                    priority:-10, // 优先级，数值越大，优先级越高
                    
                    reuseExistingChunk:true //当多个chunk引用了同一个module时，这个module只会打包为一次，成为共享的
                },
                default:{
                    minChunks:2,
                    priority:-20,
                    reuseExistingChunk:true
                }
            }
        }
    }
}
//optimization里面还有一个runtimeChunk:false 
/*
比如index.js里面引入了index2.js文件   我只修改index2.js的文件，  打包的时候，index.js对应的bundle名称会发生改变,（index2.js打包处理的boundle修改了，index.js引入的文件名也会作对应的修改）
index.js没有修改，打包的时候，对应的bundle文件名就不应该修改，而只应修改index2.js文件，要达到这个目的，设置为true时，修改index2.js的文件，  打包的时候，index.js对应的bundle文件名就不会发生改变（实际上会产生一个runtime.js文件，里面保存着相关引用信息）(缓存，作用：当已经发榜后，再修改了里面的index2.js，再发榜，用户就不用再次加载index1.js对应产生的bundle文件了，提高了访问效率)
*/
```

<font color="orange">注意：里面的配置全部都是为cacheGroups里面的每一个对象进行服务的，也就是说，我在外面写了，就不用在cacheGroups里面的每一个对象一一配置外面配置了的属性，但是可以在cacheGroups里面的每一个对象里重新配置外面的属性，进行覆盖</font>

