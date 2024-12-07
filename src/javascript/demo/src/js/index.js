let txt = "10*10";
function handleVeal(fn) {
    const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
console.log(handleVeal(txt));