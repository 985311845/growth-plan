//window.foo || window.foo = 'bar';
//(window.foo || window.foo) = 'bar';
// 以上均会报错
// window.foo || window.foo和(window.foo || window.foo)最终的结果都是返回undefined值(基础类型的值);
// 疑问？
// 那为什么直接写： undefined = 'bar'，不会报错？
// 因为直接写 undefined = 'bar' 此时的 undefined相当于是一个未声明的变量，在node中， undefined允许作为变量名；
// 而window.foo || window.foo 和 (window.foo || widnow.foo)是表达式，表达式返回的是值，undefined 值不能被赋值



// 好比
undefined = "bar";//全局变量 undefined
console.log(undefined);