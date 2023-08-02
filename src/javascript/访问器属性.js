// const obj = {
//     name: 'zhangsan',
//     age: 22,
//     sex: 1
// }
// const clone = Object.defineProperties(obj, {
//     _name: {
//         configurable: false,
//         enumerable: true,
//         get() {
//             return this.name
//         },
//         set(newVal) {
//             this.name = newVal;
//             console.log('访问器属性被调用')
//         }
//     }
// });
// // console.log(clone._name)
// // clone._name = 'lisi';
// // console.log(obj.name)
// for (let item in clone) {
//     console.log(item + '---访问器属性')
// }


// const obj2 = {
//     name: {
//         '_define-Getter_'() {
//             console.log('访问器属性被调用');
//             return 'zhangsan'
//         }
//     }
// }
// console.log(obj2.name)

// const property = 'name';

// const obj3 = {
//     [property]: 'zhangsan'
// };

// console.log(obj3.name)

// const dest = {
//     set a(value) {
//         console.log('设置value-' + value)
//     }
// }
// const src = {
//     get a() {
//         console.log('访问器属性被调用')
//         return 'aaa'
//     }
// }
// console.log(src.a)
console.log(Object('1234') instanceof String);