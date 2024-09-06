# 2 、HTML中的JavaScript

### 本章内容

+ 使用<script>元素
+ 行内脚本与外部脚本的比较
+ 文档模式对JavaScript有什么影响
+ 确保JavaScript不可用时的用户体验

### 2.1 <script>元素

将JavaScript插入HTML的主要方法是使用<script>元素。由网景公司创造出来。

+ async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作。比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
+ charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的价值。
+ crossorigin：可选。配置相关请求的CORS（跨域资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
+ defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
+ integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI,Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。
+ language：废弃。
+ src：可选。表示包含要执行的代码的外部文件。
+ type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

