// let arr = [1,3,5,7,9];
// let iterator = arr[Symbol.iterator]();
// console.log(iterator)
// console.log(iterator.next())
// import tableData from '@/api/tableData';

// async function getTableData() {
//     let res = await tableData();
//     if (res?.code === 200) {
//         next(res.data)
//     }
// }

// function* generratorFn() {
//     let res = yield getTableData();
//     let formData = yield getFormData();
// }
// let gener = generratorFn();
// gener.next();


// function fn1() {
//     console.log('f1')
//     return 'axios'
// }
// function fn2(res) {
//     console.log(res);
// }
// function* generatorFn() {
//     let f1 = yield fn1();
//     yield fn2(f1)
// }
// let g = generatorFn();
// let { value, done } = g.next();
// // g.next();
// // console.log(value)
// g.next(value)

