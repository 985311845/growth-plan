// function argumentsObj() {
//     // console.dir(arguments)
//     for (const item of arguments) {
//         console.log(item)
//     }
// }
// argumentsObj('张三', '李四', '王五')
// console.log([] == [])
// let a;
// console.log(a === undefined)
// async function f1() {
//     console.log(1);
//     await f2()
//     console.log(await bbb());
//     console.log(2);
//     setTimeout(() => {
//         console.log('定时器1')
//     }, 0);
// }
// async function f2() {
//     console.log('f2')
//     setTimeout(() => {
//         console.log('定时器')
//     }, 0);
// }
// f1()
// console.log(3)
// async function bbb() {
//     return Promise.resolve(0)
// }
// function test(){
//     let arr =[3,2,1]
//     // 或是使用arr.map(async item=>{}) 结果都是相同
//     arr.forEach(async item=>{
//       const res = fetch(item)    
//       console.log("end")
//     })
//     console.log('xxxx')
//   }
  
//   function fetch(x){
//     return new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//         console.log(x)
//         resolve(x)
//       }, 1000 * x)
//     })
//   }
//   test()
