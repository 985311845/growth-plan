[toc]

# 2 、HTML中的JavaScript

### 本章内容

+ 使用\<script>元素
+ 行内脚本与外部脚本的比较
+ 文档模式对JavaScript有什么影响
+ 确保JavaScript不可用时的用户体验

### 2.1 \<script>元素

将JavaScript插入HTML的主要方法是使用\<script>元素。由网景公司创造出来。

+ async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作。比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
+ charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的价值。
+ crossorigin：可选。配置相关请求的CORS（跨域资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
+ defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
+ integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI,Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容，不是左右浏览器都支持这个属性。
+ language：废弃。
+ src：可选。表示包含要执行的代码的外部文件。
+ type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

> 注意：页面在解释JavaScript文件的时候，页面会被阻塞（阻塞时间也包含下载文件的时间）。外部的JavaScript文件的扩展名是 .js 。这不是必须得，因为浏览器不会检查所包含JavaScript文件的扩展名。这就为使用服务器端脚本语言动态生成JavaScript代码，或者在浏览器中将JavaScript扩展语言（如TypeScript，或React的JSX）转译为JavaScript提供了可能性。不过要注意，服务器经常会根据文件扩展来确定响应的正确MIME类型。如果不打算使用．js扩展名，一定要确保服务器能返回正确的MIME类型。

script 标签的src属性是通过get请求来获取 JavaScript 文件的，不受浏览器的同源策略影响。

动态创建的 script 标签加载的JavaScript文件默认是 async 的，但不是所有浏览器都支持 async 属性，所以需要创建动态 script 的时候，可以明确的将其设置为同步加载：

```javascript
    let script = document.createElement('script');
    script.src = 'gibberish.js';
    script.async = false;
    document.head.appendChild(script);
```

以这种方式获取的资源对浏览器的<font color='red'>预加载器</font>是不可见的。这会严重影响他们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们：

```html
<link rel='preload' href='xxx.js'>
```

# 3、语言基础

+ 语法
+ 数据类型
+ 流程控制语句
+ 理解函数

## 3.1 语法

ECMAScript语法很大程度上借鉴了C语言和类C语言。

### 3.1.1 区分大小写

首先要知道的是，ECMAScript中的一切都是要区分大小写的。无论函数、变量、或是操作符都区分大小写

### 3.1.2 标识符

所谓<b>标识符</b>，就是变量、函数、属性、或者函数参数的名称。标识符可以由一或多个下列字符组成：

+ 第一个字符必须是一个字母、下划线、或美元符号；
+ 剩下的其他字符可以是字母、下划线、美元符或者数字；

开启严格模式：

```javascript
"use strict"
```

## 3.2 关键字与保留字

>关键字和保留字不能作为标识符，但是可以作为对象的属性（不推荐）。

## 3.3 变量

ECMAScript 变量是松散类型的，意思是变量可以用于保存任何类型的数据。每个变量只不过是一个用于保存任意值的命名占位符。有 3 个关键字可用来声明变量：var、let、const，其中 var 可以在任何ECMAScript 版本中使用，let 和 const 只能在 ECMAScript 第六版及以上版本中使用。

### 3.1.1 var 关键字

var 定义的关键字如果不初始化的情况下，变量会保存一个特殊值undefined。

>注意 虽然可以通过省略var操作符定义全局变量，但不推荐这么做。在局部作用域中定义的全局变量很难维护，也会造成困惑。这是因为不能一下子断定省略var是不是有意而为之。在严格模式下，如果像这样给未声明的变量赋值，则会导致抛出ReferenceError。

1. 使用 var 声明的变量会自动提升到作用域的顶部
2. 使用 let 声明的变量范围是块作用域，而 var 声明的是函数作用域，<b>块作用域</b>是<b>函数作用域</b>的<b color='red'>子集</b>。let 不允许同一个块作用域中出现冗余声明。

> 对声明冗余报错不会因混用let和var而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变量在相关作用域如何存在。

```javascript
var name;
let name; // SyntaxError
let age;
var age; // SyntaxError
```

#### 1.暂时性死区

对声明冗余报错不会因混用let和var而受影响。这两个关键字声明的并不是不同类型的变量，它们只是指出变量在相关作用域如何存在。

```javascript
    // name会被提升
    console.log(name); // undefined
    var name = 'Matt';
    // age不会被提升
    console.log(age); // ReferenceError:age没有定义
    let age = 26;
```

在let声明之前的执行瞬间被称为“暂时性死区”。

#### 2.全局声明

与var关键字不同，使用let在全局作用域中声明的变量不会成为window对象的属性（var声明的变量则会）。

```javascript
    var name = 'Matt';
    console.log(window.name); // 'Matt'
    let age = 26;
    console.log(window.age);   // undefined
```

## 3.4 数据类型



+ 原始类型（简单类型）：Number、String、Boolean、Undefined、Null、Symbol。
+ 引用类型（复杂类型）：Object，Object是一种无序键-值对的集合。

### 3.4.1、typeof 操作符

对一个只使用 typeof 会返回下列字符串之一：

+ "undefined" 表示值未定义；
+ " boolean" 表示值为布尔值；
+ "string" 表示值为字符串；
+ "number" 表示值为数值；
+ "object" 表示值为对象（而不是函数）或 null；
+ "function" 表示值为函数；
+ "symbol" 表示值为符号；

typeof 是一个操作符，不是一个函数，所以不需要参数，但可以使用参数：

```javascript
    let message = "some string";
    console.log(typeof message);     // "string"
    console.log(typeof(message));    // "string"
    console.log(typeof 95);           // "number"
```

注意typeof在某些情况下返回的结果可能会让人费解，但技术上讲还是正确的。比如，调用typeof null返回的是"object"。这是因为特殊值null被认为是一个对空对象的引用。

### 3.4.2、Undefined类型

对未声明的变量，只能执行一个有用的操作，就是对它调用typeof(返回值是 undefined)。（对未声明的变量调用delete也不会报错，但这个操作没什么用，实际上在严格模式下会抛出错误。）

### 3.4.3、Null类型

null值表示一个空对象指针，这也是给typeof传一个null会返回"object"的原因。

undefined值是由null值派生而来的，因此ECMA-262将它们定义为表面上相等，如下面的例子所示：

```javascript
console.log(undefined == null); //true
console.log(undefined === nul); // false
```

### 3.4.4、Boolean类型

| 数据类型  | 转为true的值           | 转为false的值 |
| --------- | ---------------------- | ------------- |
| Boolean   | true                   | false         |
| String    | 非空字符串             | ""()空字符串  |
| Number    | 非零数值（包括无穷值） | 0，NaN        |
| Object    | 任意对象               | null          |
| Undefined | N/A（不存在）          | undefined     |

### 3.4.5、Number 类型

使用八进制和十六进制格式创建的数值在所有<font color="red">数学操作中</font>都被视为<font color="red">十进制数值</font>。

存储浮点值使用的内存空间是存储整数值的两倍，所以ECMAScript总是想方设法把值转换为整数。在小数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小数点后面跟着0（如1.0），那它也会被转换为整数。

ECMAScript可以表示的最小数值保存在Number.MIN_VALUE中，这个值在多数浏览器中是5e-324；可以表示的最大数值保存在Number.MAX_VALUE中，这个值在多数浏览器中是1.797693134862315 7e+308。

任何涉及NaN的操作始终返回NaN（如NaN/10），在连续多步计算时这可能是个问题。其次，NaN不等于包括NaN在内的任何值。

```javascript
console.log(NaN == NaN); // false
```

把一个值传给isNaN()后，该函数会尝试把它转换为数值。某些非数值的值可以直接转换成数值，如字符串"10"或布尔值。任何不能转换为数值的值都会导致这个函数返回true。

Number()、parseInt()、parseFloat() 函数可用于任何数据类型。
Number() 函数转换规则如下：
+ 布尔值，true 转成 1，false 转成 0。
+ 数值直接返回。
+ null 返回 0.
+ undefined 返回 NaN。
+ 字符串 取出字符串中的数字部分忽略前面的 0，如果是 16进制 则转成相应的 10进制，空字符返回 0，无法转换的返回 NaN。
+ 对象调用 valueOf 方法，如果结果是 NaN 则调用 toString 方法，在按照字符串转换。

> 注意：一元 + 操作符与 Number() 函数遵循相同的转换规则。

parseInt() 可以接收第二个参数，表示底数(要转换的数是多少进制的)，返回值是 10进制。

parseFloat没有第二个参数。

### 3.4.6、String 类型

String（字符串）数据类型表示零或多个16位Unicode字符序列。

##### 1.字符字面量

字符串数据类型包含一些字符字面量:

| 字面量 | 含义 |
| ------ | ----- |
| \n | 换行 |
| \t | 制表 |
| \b | 退格 |
| \r | 回车 |
| \f | 换页 |
| \\ | 反斜杠 |
| \' | 单引号 |
| \" | 双引号 |
| \xnn | 以十六进制编码 nn 表示的字符（其中 n 是十六进制数字 0-F），例如\x41 等于 A |
| \unnnn | 以十六进制编码 nnnn 表示的 Unicode 字符（其中 n 是十六进制数字 0-F），例如\u03a3 等于希腊字母 "Σ"

字符串长度可以使用 length 属性获取
> 注意：如果字符串中包含双字节字符，那么length属性返回的值可能不是准确的字符数。第5章将具体讨论如何解决这个问题。

##### 2.字符串的特点

ECMAScript中的字符串是不可变的。

##### 3.转换为字符串

有两种方式把一个值转换成字符串。首先是使用几乎所有值的都有的 toString() 方法。这个方法唯一的用途就是返回当前值的字符串等价物。

```javascript
let age = 11;
let ageAsString = age.toString(); //字符串 "11"

let found = true;
let foundAsString = found.toString(); //字符串 "true"
```

字符串的 toString() 方法返回字符串本身的一个副本。<font color="orange">null和undefined没有 toString() 方法</font>。

多数情况下 toString() 方法不接收任何参数。不过，在对数值调用这个方法的时候，toString() 可接收一个参数，表示底数。

```javascript
let num = 10;
console.log(num.toString(10)); // 10
console.log(num.toString(2)); // 1010
```

如果不确定一个值是不是 null 或者 undefined ，可以使用 String() 转型函数：规则如下：

+ 如果值有 toString() 方法，则调用该方法（以10为底）。
+ 如果值是 null ，则返回 "null"。
+ 如果值是 undefined ，则返回 "undefined"。

> 注意：用加号操作符给一个值加上一个空字符串""也可以将其转换为字符串。

##### 4.模板字面量

ECMAScript 6新增了使用模板字面量定义字符串的能力。与使用单引号或双引号不同，模板字面量保留换行字符，可以跨行定义字符串。

##### 5.字符串插值

模板字面量最常用的一个特性是支持字符串插值，也就是可以在一个连续定义中插入一个或多个值。字符串插值通过在<font color="orange"> ${} </font>中使用一个JavaScript表达式实现。

所有插入的值都会使用toString()强制转型为字符串，而且任何JavaScript表达式都可以用于插值。

```javascript
let foo = { toString: ()=>'Word' };
console.log(`Hello ${ foo }!`); // Hello Word
```

##### 6.模板字面量标签函数

模板字面量也支持定义标签函数​，而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。

```javascript
let a = 6;
let b = 9;
function simpleTag(strings, ...expressions) {
    console.log(strings);
    console.log(expressions);
    return 'foobar';
}
let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
let taggedResult = simpleTag`${a}+${b}=${a+b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(untaggedResult);    // "6 + 9 = 15"
console.log(taggedResult);      // "foobar"
```

##### 7.原始字符串

使用模板字面量也可以直接获取原始的模板字面量内容（如换行符或Unicode字符）​，而不是被转换后的字符表示。为此，可以使用默认的String.raw标签函数。

另外，也可以通过标签函数的第一个参数，即字符串数组的．raw属性取得每个字符串的原始内容：
```javascript
function printRaw(strings) {
  console.log('Actual characters:');
  for (const string of strings) {
    console.log(string);
  }
  console.log('Escaped characters; ');
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}
printRaw`\u00A9${ 'and' }\n`;
// Actual characters:
// ©
//（换行符）
// Escaped characters:
// \u00A9
// \n
```
### 3.4.7、Symbol类型

Symbol（符号）是ECMAScript 6新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。

##### 1.符号的基本使用

```javascript
let sym = Symbol();
console.log(typeof sym);
```

调用 Symbol() 函数时，也可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码。但，这个字符串参数与符号定义或标识完全无关：

```javascript
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(genericSymbol == otherGenericSymbol);   // false
console.log(fooSymbol == otherFooSymbol);             // false
```

符号不能用 new 来调用，如果你确实想使用符号包装对象，可以借用Object()函数：

```javascript
let mySymbol = Symbol();
let myWrappedSymbol = Object(mySymbol);
console.log(typeof myWrappedSymbol); //'object'
```

##### 2.使用全局符号注册表

全局注册表中的符号必须使用字符串键来创建，因此作为参数传给Symbol.for()的任何值都会被转换为字符串。此外，注册表中使用的键同时也会被用作符号描述。

```javascript
let emptyGlobalSymbol = Symbol.for();
console.log(emptyGlobalSymbol);     // Symbol(undefined)
```

使用Symbol.keyFor()来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，则返回undefined。
```javascript
// 创建全局符号
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s));    // foo
// 创建普通符号
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2));   // undefined
```

如果传给Symbol.keyFor()的不是符号，则该方法抛出TypeError。

##### 3.使用符号作为属性

凡是可以使用字符串或数值作为属性的地方，都可以使用符号。<font color="red">对象字面量只能在计算属性语法中使用符号作为属性</font>

```javascript
let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');
let o = {
  [s1]: 'foo val'
};
// 这样也可以：o[s1] = 'foo val';
console.log(o);
// {Symbol(foo): foo val}
Object.defineProperty(o, s2, {value: 'bar val'});
console.log(o);
// {Symbol(foo): foo val, Symbol(bar): bar val}
Object.defineProperties(o, {
  [s3]: {value: 'baz val'},
  [s4]: {value: 'qux val'}
});
console.log(o);
// {Symbol(foo): foo val, Symbol(bar): bar val,
//   Symbol(baz): baz val, Symbol(qux): qux val}
```

##### 4.常用内置符号

所有内置符号属性都是不可写、不可枚举、不可配置的。

> 注意：在提到ECMAScript规范时，经常会引用符号在规范中的名称，前缀为@@。比如，@@iterator指的就是Symbol.iterator。

##### 5.Symbol.asyncIterator

由for-await-of语句使用”。换句话说，这个符号表示实现异步迭代器API的函数。

```javascript
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while (this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}
async function asyncCount() {
    let emitter = new Emitter(5);
    for await (const x of emitter) {
        console.log(x);
    }
}
asyncCount();
// 0
// 1
// 2
// 3
// 4
```

##### 6.Symbol.iterator

由 `for-of `语句使用。这个函数会`返回一个`实现迭代器API的`对象`。很多时候，返回的对象是实现该API的Generator。

技术上，这个由Symbol.iterator函数生成的对象应该通过其next()方法陆续返回值。可以通过显式地调用next()方法返回，也可以隐式地通过生成器函数返回。

```javascript
class myIterator {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    };

    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let index = 0;
        const length = keys.length;
        const _that = this;
        return {
            next() {
                if (index < length - 1) {
                    return { value: _that[keys[index++]], done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
};
const personal = new myIterator('张三','20','男');

for(let item of personal){
    console.log(item);
};
// 张三
// 20
// 男
```

##### 7.Symbol.hasInstance

该方法决定一个构造器对象是否认可一个对象是它的实例。由instanceof操作符使用”。

这个属性定义在`Function`的原型上，因此默认在所有的函数和类上都可以使用

```javascript
function Foo(){};
let f =new Foo();
console.log(f instanceof Foo); //true

console.log(Foo[Symbol.Instance](f)) // true
```

##### 8.Symbol.isConcatSpreadable

这个符号作为一个属性表示“一个布尔值，如果是true，则意味着对象应该用Array.prototype.concat()打平其数组元素”。

数组对象默认情况下会被打平到已有的数组，false或假值会导致整个对象被追加到数组末尾。类数组对象默认情况下会被追加到数组末尾，true或真值会导致这个类数组对象被打平到数组实例。其他不是类数组对象的对象在Symbol.isConcatSpreadable被设置为true的情况下将被忽略。

```javascript
let initial = ['foo'];
let array = ['bar'];

console.log(array[Symbol.isConcatSpreadable]);   // undefined

console.log(initial.concat(array));                // ['foo', 'bar']

array[Symbol.isConcatSpreadable] = false;

console.log(initial.concat(array));                // ['foo', Array(1)]

let arrayLikeObject = { length: 1, 0: 'baz' };

console.log(arrayLikeObject[Symbol.isConcatSpreadable]);   // undefined

console.log(initial.concat(arrayLikeObject));                // ['foo', {...}]

arrayLikeObject[Symbol.isConcatSpreadable] = true;

console.log(initial.concat(arrayLikeObject));                // ['foo', 'baz']

let otherObject = new Set().add('qux');

console.log(otherObject[Symbol.isConcatSpreadable]);   // undefined

console.log(initial.concat(otherObject));                // ['foo', Set(1)]

otherObject[Symbol.isConcatSpreadable] = true;

console.log(initial.concat(otherObject));                // ['foo']
```

##### 9.Symbol.match

这个符号作为一个属性表示“一个正则表达式方法，该方法用正则表达式去匹配字符串。由String.prototype.match()方法使用”。

正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个String方法的有效参数。

`Symbol.match`函数接收一个参数，就是调用match()方法的字符串实例。返回的值没有限制。

```javascript
    console.log(RegExp.prototype[Symbol.match]);
    // f [Symbol.match]() { [native code] }
    console.log('foobar'.match(/bar/));
    // ["bar", index: 3, input: "foobar", groups: undefined]
```

##### 10.Symbol.replace

这个符号作为一个属性表示“一个正则表达式方法，该方法替换一个字符串中匹配的子串。由String.prototype.replace()方法使用”。

Symbol.replace函数接收两个参数，即调用replace()方法的字符串实例和替换字符串。

```javascript
class FooReplacer {
	static[Symbol.replace](target, replacement){
        returntarget.split('foo').join(replacement);
     }
}
console.log('barfoobaz'.replace(FooReplacer, 'qux'));  // "barquxbaz"
    
class StringReplacer {
	constructor(str) {
        this.str = str;
      }
      [Symbol.replace](target, replacement){
        returntarget.split(this.str).join(replacement);
      }
}
console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux'));// "barquxbaz"
```

##### 11.Symbol.search

这个符号作为一个属性表示“一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由`String.prototype.search()`方法使用”。

`Symbol.search`函数接收一个参数，就是调用`search()`方法的字符串实例。

##### 12.Symbol.species

这个符号作为一个属性表示“一个函数值，该函数作为创建派生对象的构造函数”。这个属性在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法。用Symbol.species定义静态的获取器（getter）方法，可以覆盖新创建实例的原型定义

```javascript
class Bar extends Array {}
class Baz extends Array {
	staticget[Symbol.species](){
    	return Array;
	}
}
let bar = new Bar();
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar);    // true
bar = bar.concat('bar');
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar);    // true
let baz = new Baz();
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz);    // true
baz = baz.concat('baz');
console.log(baz instanceof Array); // true
console.log(bazinstanceofBaz);   //false
```

##### 13.Symbol.split

这个符号作为一个属性表示“一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由String.prototype.split()方法使用”。

Symbol.split函数接收一个参数，就是调用split()方法的字符串实例。

```javascript
class FooSplitter {
    static[Symbol.split](target){
        return target.split('foo');
    }
}
console.log('barfoobaz'.split(FooSplitter));// ["bar", "baz"]
class StringSplitter {
    constructor(str) {
        this.str = str;
    }
    [Symbol.split](target){
        return target.split(this.str);
    }
}
console.log('barfoobaz'.split(new StringSplitter('foo')));// ["bar", "baz"]
```

##### 14.Symbol.toPrimitive

这个符号作为一个属性表示“一个方法，该方法将对象转换为相应的原始值。由ToPrimitive抽象操作使用”。

```javascript
class Foo {}
let foo = new Foo();
console.log(3 + foo);         // "3[object Object]"
console.log(3- foo);         // NaN
console.log(String(foo));    // "[object Object]"
class Bar {
    constructor() {
        this[Symbol.toPrimitive]=function(hint){
            switch(hint){
                case 'number':
                    return 3;
                case 'string':
                    return'stringbar';
                case 'default':
                default:
                    return 'defaultbar';
            }
        }
    }
}
let bar = new Bar();
console.log(3 + bar);      // "3defaultbar"
console.log(3 - bar);      // 0
console.log(String(bar)); // "string bar"
```

##### 15.Symbol.toStringTag

这个符号作为一个属性表示“一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法Object.prototype.toString()使用”。

通过toString()方法获取对象标识时，会检索由Symbol.toStringTag指定的实例标识符，默认为"Object"。内置类型已经指定了这个值，但自定义类实例还需要明确定义:

```javascript
let s = new Set();
console.log(s);                            // Set(0) {}
console.log(s.toString());              // [object Set]
console.log(s[Symbol.toStringTag]);   // Set
class Foo {}
let foo = new Foo();
console.log(foo);                            // Foo {}
console.log(foo.toString());              // [object Object]
console.log(foo[Symbol.toStringTag]);   // undefined
class Bar {
    constructor() {
        this[Symbol.toStringTag] = 'Bar';
    }
}
let bar = new Bar();
console.log(bar);                            // Bar {}
console.log(bar.toString());              // [object Bar]
console.log(bar[Symbol.toStringTag]);   // Bar
```

##### 16.Symbol.unscopables

这个符号作为一个属性表示“一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中排除”。设置这个符号并让其映射对应属性的键值为true，就可以阻止该属性出现在with环境绑定中，如下例所示：

```javascript
let o = { foo: 'bar' };
with(o){
    console.log(foo); // bar
}
o[Symbol.unscopables] = {
    foo: true
};
with(0){
    console.log(foo); //ReferenceError
}
```

> <b>注意：不推荐使用with，因此也不推荐使用`Symbol.unscopables`</b>。

### 3.4.8、Object类型

ECMAScript 要求在给构造函数提供参数时使用括号。如果没有参数，那么括号可以省略（不推荐）：

```javascript
let o = new Object;  // 合法，但不推荐
```

`Object`本身并不是很有用，但理解与它相关的概念非常重要。ECMAScript 中的`Object`也是派生其他对象的基类。`Object`类型的所有属性和方法在派生类的对象上同样存在。

每个`Object`实例都有如下方法：

+ constructor：用于创建当前对象的函数。在前面的例子中这个属性的值就是`Object()`函数.。
+ hsaOwnProperty(propertyName)：用于判断当前对象实例（不是原型）上是否存在给定的属性、要检索的属性名必须是字符串。
+ isPrototypeOf(object)：用于判断当前对象是否为另一个对象的原型。
+ propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用`for-in`语句枚举。
+ toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
+ toString()：返回对象的字符串表示。
+ valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与`toString()`的返回值相同。

## 3.5、操作符

操作符应用在对象上时，通常会调用`valueOf()`和/或`toString()`方法来取得可以计算的值。

### 3.5.1、一元操作符

之操作一个值的操作符叫`一元操作符`

##### 1.递增/递减操作符

<font color="red">无论使用<b>`前缀递增`</b>还是<b>`前缀递减`</b>操作符，<b>变量的值都会在语句被求值之前改变</b></font>（在计算机科学中，这通常被称为具有<b>副作用</b>）。

后缀版递增和递减在语句被求值后才发生。

### 3.5.2、位操作符

1. 负值：转成二进制   ====》  反码   ====》    结果加一。

2. 按位非：转二进制 ====》  反码  ====》 结果减一。

3. 按位与：全是`1`结果才是`1`。

4. 按位或：全是`0`才是`0`

5. 按位异或：全是`0`或全是`1`返回`0`,一个`0`一个`1`返回`1`。
6. 左移会以0填充这些空位，让结果是完整的32位数值

| 第一个数的位 | 第二个数的位 |
| ------------ | ------------ |
| 1            | 1            |
| 1            | 0            |
| 0            | 1            |
| 0            | 0            |

### 3.5.3、布尔操作符

##### 1.逻辑非

可应用给ECMAScript中的任何值，这个操作符始终返回布尔值，现将其转成布尔值，然后再取反。

| 返回结果为 false          | 返回结果为 true |
| ------------------------- | --------------- |
| 对象                      | 空字符串        |
| 非空字符串                | 0               |
| 非 0 数值（包括Infinity） | null            |
|                           | NaN             |
|                           | undefined       |

逻辑非操作符也可以用于将任意值转换为布尔值。同时使用两个叹号（!!）,相当于调用了转型函数`Boolean()`

##### 2.逻辑与

| 第一个操作数 | 第二个操作数 | 结果  |
| ------------ | ------------ | ----- |
| true         | true         | true  |
| true         | false        | false |
| false        | true         | false |
| false        | false        | false |

**逻辑与返回结果是：操作数本身，而非布尔值。**

##### 3.逻辑或

| 第一个操作数 | 第二个操作数 | 结果  |
| ------------ | ------------ | ----- |
| true         | true         | true  |
| true         | false        | true  |
| false        | true         | true  |
| false        | false        | false |

**逻辑或返回结果是：操作数本身，而非布尔值。**

### 3.5.4、乘性操作符

ECMAScript 定义了 3 个乘性操作符：乘法、除法、取模。

##### 1.乘法操作符

+ 如果有任意操作数为NaN，则返回 NaN。
+ 如果是Infinity 乘以 0，则返回 NaN。
+ 如果是Infinity乘以非 0 的有限数值，则根据第二个操作数的符号返回 Infinity 或 -Infinity。
+ 如果是 Infinity 乘以 Infinity，则返回 Infinity。
+ 如果有不是数值的操作符，则先调用 `Number()`将其转换为数值，然后再应用上述规则。

##### 2.除法操作符

+ 如果有任一操作数是NaN，则返回NaN。
+ 如果是Infinity除以Infinity，则返回NaN。
+ 如果是0除以0，则返回NaN。
+ 如果是非0的有限值除以0，则根据第一个操作数的符号返回Infinity或-Infinity。
+ 如果是Infinity除以任何数值，则根据第二个操作数的符号返回Infinity或-Infinity。
+ 如果有不是数值的操作数，则先在后台用Number()函数将其转换为数值，然后再应用上述规则。

##### 3.取模操作符

+ 如果被除数是无限值，除数是有限值，则返回NaN。
+ 如果被除数是有限值，除数是0，则返回NaN。
+ 如果是Infinity除以Infinity，则返回NaN。
+ 如果被除数是有限值，除数是无限值，则返回被除数。
+ 如果被除数是0，除数不是0，则返回0。
+ 如果有不是数值的操作数，则先在后台用Number()函数将其转换为数值，然后再应用上述规则。

### 3.5.5、指数操作符

ECMAScript 7新增了指数操作符，Math.pow()现在有了自己的操作符＊＊，结果是一样的：

```javascript
console.log(Math.pow(3, 2);     // 9
console.log(3 ＊＊ 2);              // 9
console.log(Math.pow(16, 0.5); // 4
console.log(16＊＊ 0.5);           // 4
```

不仅如此，指数操作符也有自己的指数赋值操作符＊＊=，该操作符执行指数运算和结果的赋值操作：

```javascript
let squared = 3;
squared **= 2;
console.log(squared); // 9
let sqrt = 16;
sqrt **= 0.5;
console.log(sqrt); // 4
```

### 3.5.6、加性操作符

##### 1.加法操作符

+ 如果有任一操作数是NaN，则返回NaN。
+ 如果是Infinity加Infinity，则返回Infinity。
+ 如果是-Infinity加-Infinity，则返回-Infinity。
+ 如果是Infinity加-Infinity，则返回NaN。
+ 如果是+0加+0，则返回+0。
+ 如果是-0加+0，则返回+0。
+ 如果是-0加-0，则返回-0。

如果有任一操作数是对象、数值或布尔值，则调用它们的toString()方法以获取字符串，然后再应用前面的关于字符串的规则。对于undefined和null，则调用String()函数，分别获取"undefined"和"null"。

##### 2.减法操作符

+ 如果是Infinity减Infinity，则返回NaN。
+ 如果是-Infinity减-Infinity，则返回NaN。
+ 如果是Infinity减-Infinity，则返回Infinity。
+  如果是-Infinity减Infinity，则返回-Infinity。
+ 如果是+0减+0，则返回+0。
+ 如果是+0减-0，则返回-0。
+ 如果是-0减-0，则返回+0。

> 注意：undefined 调用 Number() 函数返回值是 NaN，null 调用 Number() 函数返回值是 0。

### 3.5.7、关系操作符

大于（>）、小于（<）、大于等于（>=）、小于等于（<=）、等于（==）（===）。

+ 如果操作数都是数值，则执行数值比较。
+ 如果操作数都是字符串，则逐个比较字符串中对应字符的编码（ASCII码）。
+ 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。
+ 如果有任一操作数是布尔值，则将其转换为数值再执行比较。
+ 如果有任一操作数是对象，则调用其valueOf()方法，取得结果后再根据前面的规则执行比较。如果没有valueOf()操作符，则调用toString()方法，取得结果后再根据前面的规则执行比较。
+ 这里有一个规则，即任何关系操作符在涉及比较NaN时都返回false。

```javascript
let result = "a" < 3; // 因为"a"会转换为NaN，所以结果是false
```

### 3.5.8、相等操作符

##### 1.等于和不等于

+ 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false转换为0, true转换为1。
+ 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
+ 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法取得其原始值，再根据前面的规则进行比较。

在进行比较时，这两个操作符会遵循如下规则：

+ null和undefined相等。
+ null和undefined不能转换为其他类型的值再进行比较。
+ 如果有任一操作数是NaN，则相等操作符返回false，不相等操作符返回true。记住：即使两个操作数都是NaN，相等操作符也返回false，因为按照规则，NaN不等于NaN。
+ 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true。否则，两者不相等。

##### 2.全等和不全等

> 由于相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。这样有助于在代码中保持数据类型的完整性。

### 3.5.9、条件操作符

```javascript
let max = (num1 > num2) ? num1 : num2;
```

### 3.5.10、赋值操作符

| 意义             | 符号 |
| ---------------- | ---- |
| 乘后赋值         | *=   |
| 除后赋值         | /=   |
| 取模后赋值       | %=   |
| 加后赋值         | +=   |
| 减后赋值         | -=   |
| 左移后赋值       | <<=  |
| 右移后赋值       | >>=  |
| 无符号右移后赋值 | >>>= |

这些操作符仅仅是简写语法，不会提升性能。

### 3.5.11、逗号操作符

使用逗号操作符来辅助赋值。在赋值时使用逗号操作符分隔值，最终会返回表达式中最后一个值：

```javascript
let num = (5, 1, 4, 8, 0); // num的值为0
```

## 3.6、语句

ECMAScript 描述了一些语句（也称为流控制语句）。

##### 3.6.1、if 语句

`if`语句的条件是布尔值（不是必须的），如果不是布尔值，会强行转换成布尔值。

##### 3.6.2、do-while 语句

do-while语句是一种后测试循环语句，即循环体中的代码执行后才会对退出条件进行求值。换句话说，循环体内的代码至少执行一次。

```javascript
let i = 0;
do {
    i += 2;
} while (i < 10);
```

> 注意：后测试循环经常用于这种情形：循环体内代码在退出前至少要执行一次。

##### 3.6.3、while 语句

while语句是一种先测试循环语句，即先检测退出条件，再执行循环体内的代码。因此，while循环体内的代码有可能不会执行。

```javascript
let i = 0;
while (i < 10) {
    i += 2;
}
```

##### 3.6.3、for 语句

以上代码在循环开始前定义了变量i的初始值为0。然后求值条件表达式，如果求值结果为true（i <count），则执行循环体。因此循环体也可能不会被执行。如果循环体被执行了，则循环后表达式也会执行，以便递增变量i。for循环跟下面的while循环是一样的：

```javascript
let count = 10;
let i = 0;
while (i < count) {
    console.log(i);
    i++;
}
```

```javascript
for (; ; ) { // 无穷循环
    doSomething();
}
```

如果只包含条件表达式，那么for循环实际上就变成了while循环：

```javascript
let count = 10;
let i = 0;
for (; i < count; ) {
    console.log(i);
    i++;
}
```

##### 3.6.5、for-in 语句

`for-in` 语句用于枚举对象中的**非符号**键属性。

ECMAScript 中对象的属性是无序的，因此 `for-in`语句不能保证返回对象属性的顺序（因浏览器而异）。

> 如果 `for-in` 循环要迭代的变量是 `null` 或 `undefined`，则不执行循环体。

##### 3.6.6、for-of 语句

用于遍历可迭代对象的元素。

> `for-of` 循环会按照可迭代对象的 `next()` 方法产生值的顺序迭代元素。如果尝试迭代的变量不支持迭代，则 `for-of` 会抛出错误。
>
> ES2018对for-of语句进行了扩展，增加了for-await-of循环，以支持生成期约（promise）的异步可迭代对象。

##### 3.6.7、标签语句

标签语句用于给语句加标签，语法如下：

```javascript
label: statement
```

下面是一个例子：

```javascript
start: for(let i = 0; i < count; i++){
    console.log(i);
}
```

在这个例子中，`start` 是一个标签，可以在后面通过`break` 或 `continue` 语句引用。标签语句的典型应用场景是嵌套循环。

##### 3.6.8、break 和 continue 语句

break语句用于立即退出循环，强制执行循环后的下一条语句。而continue语句也用于立即退出循环，但会再次从循环顶部开始执行。

break和continue都可以与标签语句一起使用，返回代码中特定的位置。这通常是在嵌套循环中

```javascript
let num = 0;
outermost:
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (i == 5 && j == 5) {
            break outermost;
        }
        num++;
    }
}
console.log(num); // 55
```

##### 3.6.9、with 语句

`with` 语句的用途是将代码作用域设置为特定的对象。

**严格模式不允许使用with语句，否则会抛出错误**。

> 警告 由于 `with` 语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用 `with` 语句。

##### 3.6.10、switch 语句

break关键字会导致代码执行跳出 `switch` 语句。`continue` 虽然与 `break` 类似，但是 `continue` 不能用在`switch` 中，除非外层还有循环语句。

条件的值不需要是常量，也可以是变量或表达式。

> 注意 `switch` 语句在比较每个条件的值时会使用全等操作符。

### 3.7 函数

除了`return`语句之外没有任何特殊声明表明该函数有返回值。

只要碰到`return`语句，函数就会立即停止执行并退出。因此，`return`语句后面的代码不会被执行。

`return`语句也可以不带返回值。这时候，函数会立即停止执行并返回 `undefined`。这种用法最常用于提前终止函数执行，并不是为了返回值。不指定返回值的函数实际上会返回特殊值undefined。

+ 函数不能以eval或arguments作为名称。
+ 函数的参数不能叫eval或arguments。
+ 两个命名参数不能拥有同一个名称。

## 4、变量、作用域 与 内存

JavaScript变量是松散类型的，而且变量不过就是特定时间点一个特定值的名称而已。

### 4.1 原始值 与 引用值

保存原始值的变量是**按值访问**，我们操作的就是保存在变量中的实际值。

引用值是保存在内存中的对象，与其他语言不同，javascript 不允许直接访问内存位置，因此不能直接操作对象躲在的内存空间。在操作对象时，实际上操作的是该对象的 `引用` ，而非实际对象的本身，为此，保存引用值的变量是**按引用**访问的。

##### 4.1.1 、动态属性

对于引用值而言，可以随时添加、修改和删除其属性和方法。

原始值不能有属性，尽管尝试给原始值添加属性不会报错。只有引用值可以动态添加后面可以使用的属性。

##### 4.1.2、复制值

除了存储方式不同，原始值和引用值在通过变量复制时也有所不同。在通过变量把原始值赋值到另一个变量时，原始值会被复制到新变量的位置（两个完全独立的栈内存，互不影响）。

在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象，因此一个对象上面的变化会在另一个对象上反映出来。

##### 4.1.3、传递参数

ECMAScript 中所有**函数的参数**都是**按值传递**。

证明对象也是按值传递：

```javascript
function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
let person = new Object();
setName(person);
console.log(person.name);   // "Nicholas"
```

> **注意** ECMAScript 中函数的参数就是局部变量。

##### 4.1.4、确定类型

+ typeof操作符最适合用来判断一个变量是否为原始类型。

+ ECMAScript提供了instanceof操作符，用来确定对象类型。

+ 如果用instanceof检测原始值，则始终会返回false，因为原始值不是对象。

> **注意** typeof操作符在用于检测函数时也会返回"function"。ECMA-262规定，任何实现内部[[Call]]方法的对象都应该在typeof检测时返回"function"。

### 4.2、执行上下文与作用域

变量或函数的上下文决定了他们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的**变量对象**，而这个上下文中定义的所有变量和函数都存在于这个对象上。

全局上下文是最外层的上下文。根据ECMAScript实现的宿主环境，表示全局上下文的对象可能不一样。在浏览器中，全局上下文就是我们常说的 `window` 对象,因此通过 `var` 声明的全局变量和函数都是 `window` 对象的属性和方法。使用 `let` 和 `const` 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数（全局上下文在应用程序退出之前才会被销毁，比如关闭网页或退出浏览器）。

每个函数调用都有自己的上下文。当代码执行流进函数时，函数的上下文被推到一个上下文栈上。在函数执行完毕后，上下文栈会弹出该函数上下文，将控制权返回给之前的执行上下文。ECMAScript程序的执行流就是通过这个上下文栈进行控制的。

上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**。这个作用域链决定了各级上下文的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。**如果上下文是函数，则其活动对象用作变量对象。活动对象最初只有一个定义变量：arguments。**（全局上下文中没有这个变量）。作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。

上下文之间的连接是线性的、有序的。每个上下文都可以到上一级上下文中去搜索变量和函数，但任何上下文都不能到下一级上下文中去搜索

> **注意** 函数参数被认为是当前上下文中的变量，因此也跟上下文中的其他变量遵循相同的访问规则。

##### 4.2.1、作用域链增强

+ try/catch 语句的 catch块
+ with 语句

```javascript
function buildUrl(){
    let qs = "?debug=true";
    with(location){
        let url = href + qs;
    }
    return url;
}
```

`with` 语句中使用 `var` 声明的变量 `url` 会成为函数上下文的一部分，可以作为函数的值被返回；但像这里使用 `let` 声明的变量 `url`，因为被限制在块级作用域（稍后介绍），所以在 `with` 块之外没有定义。

##### 4.2.2、变量声明

+ var 声明
+ let 声明
+ const 声明

###### 1.使用var的函数作用域声明

在使用var声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函数的局部上下文。在with语句中，最接近的上下文也是函数上下文。

var声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”。

###### 2.使用 let 的块级作用域声明

+ 块级作用域由最近的一对包含花括号 `{}` 界定。
+ `let` 与 `var` 的另一个不同之处是在同一作用域内不能声明两次

严格来讲，`let` 在JavaScript运行时中也会被提升，但由于“暂时性死区”（temporal dead zone）的缘故，实际上不能在声明之前使用let变量。因此，从写JavaScript代码的角度说，let的提升跟var是不一样的。

###### 3.使用 const 的常量声明

使用const声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。

const声明只应用到顶级原语或者对象。换句话说，赋值为对象的const变量不能再被重新赋值为其他引用值，但对象的键则不受限制。

由于const声明暗示变量的值是单一类型且不可修改，JavaScript运行时编译器可以将其所有实例都替换成实际的值，而不会通过查询表进行变量查找。谷歌的V8引擎就执行这种优化。

### 4.3、垃圾回收

