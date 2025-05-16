// function test() {
//     var num = 100;
//     function a() {
//         num++;
//         console.log(num);
//     }
//     function b() {
//         num--;
//         console.log(num);
//     }
//     return [a, b];
// }

// var myArr = test();
// myArr[0]();
// myArr[1]();

// const domArr = document.querySelectorAll('.box');

// for (var i = 0; i < domArr.length; i++) {
//     domArr[i].onclick = function () {
//         console.log(i)
//     }
// }

// function fn(){
//     function test(){
//         var b = 'this is test';
//         console.log(a);
//     }
//     var a = 123;
//     return test;
// };

// const f = fn();
// f();


// 一个函数执行两次，产生的AO是不是同一个AO
// function f1(){
//     var a = '123';
//     console.log(a);
//     return function(){
//         console.log(a);
//         a = 'change'
//     };
// }
// const f1T = f1();

// f1T();

// f1();


var num = (function () {
    var a = 123;
    return function () { 
        console.log(a);
        a++;
    }
}());
num();
num();

