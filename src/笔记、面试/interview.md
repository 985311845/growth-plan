# CSS篇

1. 什么是BFC，怎样让一个元素变成BFC

   ```css
   //BFC:块格式化上下文，指一个独立的渲染区域，区域内的元素无论怎样都不影响区域外元素
   //如何触发BFC
   // float 的值不是 none
   // position 的值不是 static 或者 relative
   // overflow 的值不是 visible
   // display 的值是 inline-block table-cell flex table-caption inline-flex...
   
   ```

2. margin重合及解决方案

   外边距重叠只发生在普通流文档的上下外边距之间，只有块元素会发生外边距重叠，行内块和行内元素不会发生外边距重叠

   >情况1：相邻元素的margin-bottom与margin-top，只显示两者中大的margin
   >
   >解决方案：在后一个元素上加上float，或者这其中一个兄弟套上div设置border

   >情况2：父级和第一个/最后一个子元素的margin合并
   >
   >解决方案：给父元素触发BFC、给父元素添加边框、给父级或子集设置inline-block、给父元素添加padding

   >情况3：空的块级元素，自身的margin-top和margin-bottom发生的重叠。
   >
   >解决档案：我们可以通过为其设置border、padding或者高度来解决这个问题

   >情况4：高度为auto的父元素的margin-bottom和子元素的margin-bottom发生重叠
   >
   >解决方案：父元素设置border-bottom、padding-bottom来分隔它们，也可以为父元素设置一个高度，max-height和min-height也能解决这个问题

3. 外边距重叠怎么算

   + 全部都为正值，取最大者；
   + 不全是正值，则都取绝对值，然后用正值减去最大值；
   + 没有正值，则都取绝对值，然后用0减去最大值。

4. CSS优先级和权重怎么算

   !important > 行内样式 > id选择器 > class选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 为元素选择器 > 通配符

5. CSS盒模型

   + 便准盒模型：margin + border + padding + content     `box-sizing: border-box`
   + IE盒模型：margin + content(包含border、padding、content)     `box-sizing: content-box`

6. 下列那种方法可以实现匹配包含给定文本的元素

   ```
   A. text()
   B. contains()
   C. input()
   D. attr()
   
   text()是jQuery中的方法，可是设置或返回被选元素的文本内容
   ：contains(text)选择器，选取包含指定字符串的元素，字符串也可以是文本
   :input()选择器，选取表单元素
   attr(name,value)属性操作，设置或返回被选元素的属性和属性值
   ```

   

# javascript篇

## 按位运算符

<font color="red">注意：都是在补码的基础上进行运算的（正数的原码、反码、补码都是一样，所以可以直接计算，负数需要转换以下）</font>

原码：转成二进制，短除法

反码：符号位不变，其它位取反

补码：反码基础上加1

1. 按位与（&）：跟 且(&&)类似，比如：a & b, a、b同时为真（也就是1）的时候才是真（1）
    ```javascript
    7 & 6  //得到的值就是6
    // 7——>    00000111
    // 6——>    00000110   &
    //结果就是  00000110  2**2+2**1
    ```
    
2. 按位或（|）：跟 且(||)类似，比如：a | b, a、b其中一个为真（也就是1）的时候就是真（1）
    ```javascript
    7 | 6  //得到的值就是7
    // 7——>    00000111
    // 6——>    00000110   &
    //结果就是  00000111  2**2+2**1+2**0
    
    -7 | 6  //得到的是-1
    //注意：-7的运算是需要用-7的补码运算，6的补码就是原码，所以得到-1
    ```
    
3. 按位取反（~）
    ```javascript
    //正数按位取反：正数原码反码补码都一样，转成二进制=》按位取反=》反码=》补码。
    //负数按位取反：转成二进制=》反码=》补码=》按位取反。
    ```
    
4. 按位左移（<<）

    `转成二进制，然后左移，低位补0`

5. 按位右移（>>）

    `负数：先转成二进制=》反码（符号位不变，其它位取反）=》补码（反码基础上加1）=》然后右移，高位补符号位=》反码=》补码`

    `正数：转二进制=》原码、反码、补码都一样=》直接移`

6. 无符号右移（>>>）

    `转二进制=》右移（高位补0）`

## 数据类型

1. 基本数据类型：string、number、boolean、null、undefined、NaN、symbol、bigInt。

2. 引用数据类型：Object、Array、Function、Set、Map

3. 判断数据类型的方法有哪些？各自的优缺点是什么？

   `1. typeof 优点：对基本数据类型的判断较为准确。缺点：无法精准判断引用数据类型，而却判断null的时候位Object` 

   `2. instanceof 优点：对引用数据类型的判断较为准确，无法对基本类型做出判断（基本类型的包装类除外）`

   `3. Object.prototype.toString.call() 优点：无论什么数据类型都可以判断，返回格式为[Object xxx]。缺点：Object.ptototype.toString()本身也可能被修改`

   `4. obj.constructor 优点：基本数据类型和引用数据类型都可以判断。缺点：无法判断null和undefined，而且constructor是可以修改的，会导致结果不准确`

4. 数据类型之间的隐式转换？

5. Object.keys与for...in有什么区别

   Object.keys不会遍历继承的属性，for...in会遍历继承的属性

6. 什么是匿名函数

   没有名字的函数就是匿名函数，匿名函数用完就会释放，一般用作回调函数、匿名函数的自调用

7. 浅拷贝

   ```
   Object.assign()
   Array.prootype.slice()
   扩展运算符
   ```

8. 深拷贝

   ```javascript
   // 1. JSON.parse(JSON.stringify(obj))
   // 2. 递归
   function cloneObject(obj){
       if(typeof obj !== 'object' || obj === null){
           return obj;
       }else{
           let newObj = Array.isArray(obj)?[]:{};
           for(let key in obj){
               if(typeof obj[key] === 'object'){
                   newObj[key] = cloneObject(obj[key])
               }else{
                   newObj[key] = obj[key]
               }
           }
           return newObj;
       }
   }
   ```

   

9. JSON.parse(JDON.stringify(obj))深拷贝有什么缺点

   + 如果obj里面有时间对象，则 JSON.sringify 后再JSON.parse 的结果，时间将只是字符串的形式，而不是对象的形式
   + 如果obj 里面有RegExp、Error对象，则序列化的结果将只得到空对象
   + 如果obj 里有函数、undefined，则序列化的结果会把函数和undefined丢失
   + 如果obj 里有NaN、Infinity、-infinity，则序列化的结果会变成null
   + JSON.stringify 只能序列化对象的可枚举自有属性，如果obj 的对象是有构造函数生成的，则使用JSON.stringify深拷贝后会丢弃对象的constructor
   + 如果对象中存在循环引用的情况，也无法真确的深拷贝
   
10. 做项目中遇到什么难以解决的问题

    + 动态路由，有些模块需要用到vue的动态路由，但是在vue中添加动态路由的时候，需要进行权限的校验

    + 请求拦截器中拦截了get请求参数为空字符、undefined、null值

    + 数据可视化的时候，屏幕分辨率的适配问题，使用flexible.js，VScode中的插件px to rem

    + elementui不分页排序的时候，合计行不参与排序

      ```
      解决方案
      先删除合计行，然后排序好了之后，在数据列表末尾插入合计行。问题：取消排序后，会闪烁以下，因为el-table默认有排序。需要保存排序之前的数据，取消排序的时候，把排序之前的数据赋值给table
      ```

      