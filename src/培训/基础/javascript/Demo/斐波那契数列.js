// 方法一：
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
};
var result = fibonacci(10);

console.log(result);

// 方法二：
var n = parseInt(window.prompt("input"));

var first = 1, second = 1, third;

if (n > 2) {
    for (var i = 0; i < n - 2; i++) {
        third = first + second;
        first = second;
        second = third
    }
    document.write(third);
} else {
    document.write(1);
}