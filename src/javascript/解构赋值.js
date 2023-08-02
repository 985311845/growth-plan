// let person = {
//     job: {
//         title: 'Software engineer'
//     }
// };
// let personCopy = {};
// // foo在源对象上是undefined
// ({
//     foo: {
//         bar: personCopy.bar
//     }
// } = person);
// // TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.
// // job在目标对象上是undefined
// ({
//     job: {
//         title: personCopy.job.title
//     }
// } = person);
//   // TypeError: Cannot set property 'title' of undefined

let obj = {
    play: {}
};
obj.play.name = 'conput'