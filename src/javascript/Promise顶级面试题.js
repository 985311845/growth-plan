// Promise.resolve()
//     .then(() => {
//         console.log(0);
//         return Promise.resolve(4)
//     })
//     .then((res) => {
//         console.log(res)
//     })

// Promise.resolve()
//     .then(() => {
//         console.log(1)
//     })
//     .then(() => {
//         console.log(2)
//     })
//     .then(() => {
//         console.log(3)
//     })
//     .then(() => {
//         console.log(5)
//     })
//     .then(() => {
//         console.log(6)
//     })

setTimeout(() => {
    console.log('宏任务0')
}, 0)
Promise.resolve().then(() => {
    console.log('微任务1');
    setTimeout(() => {
        console.log('宏任务3')
    }, 0)
})
setTimeout(() => {
    console.log('宏任务1')
}, 0)
Promise.resolve().then(() => {
    console.log('微任务2');
    return Promise.resolve().then(() => {
        console.log('微任务3');
        setTimeout(() => {
            console.log('宏任务4')
        }, 0)
    })

}).then(() => {
    console.log('微任务4')
})
setTimeout(() => {
    console.log('宏任务2')
}, 0)