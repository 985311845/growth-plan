function fn(a, b, c, d, e) {
    console.log(arguments.length)
};
fn(1, 2, 3);

function fn1(a, b) {
    a = 2;
    console.log(arguments[0]); // 2
    arguments[1] = 5;
    console.log(b); // 5

    //虽然形参和实参是同时改变的，但是arguments中的实参列表跟形参不是一个东西，只是有映射关系
};
fn1(1, 2);

function fn2(a, b) {
    b = 100;
    console.log(arguments[1]) // undefined
};
fn2(1);