// 让小球向右下运动，遇到边缘后反弹
var ball = document.querySelector('.ball');
// 每次移动的距离
var disX = 10, disY = 10;
// 获取可视区的宽高
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
// 获取元素的宽高
var eW = ball.clientWidth;
var eH = ball.clientHeight;

var maxW = w - eW;
var maxH = h - eH;

// 产生随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// 产生随机颜色
function changeBg() {
    var r = getRandom(0, 255);
    var g = getRandom(0, 255);
    var b = getRandom(0, 255);
    ball.style.background = `rgb(${r},${g},${b})`
}
var timer = null;
// 继续

var continueAniBtn = document.querySelector('.continueAni');
var pauseAniBtn = document.querySelector('.pauseAni');


function continueAni() {
    if (timer) return;
    timer = setInterval(function () {
        // 获取元素的位置
        var rect = ball.getBoundingClientRect();
        var x = rect.left, y = rect.top;
        var left = x + disX, top = y + disY;
        if (left < 0) {
            left = 0;
            disX = -disX
            changeBg();
        }
        if (top < 0) {
            top = 0;
            disY = -disY
            changeBg();
        }
        if (left > maxW) {
            left = maxW;
            disX = -disX;
            changeBg();
        }
        if (top > maxH) {
            top = maxH;
            disY = -disY;
            changeBg();
        }
        ball.style.left = x + disX + 'px';
        ball.style.top = y + disY + 'px';
    }, 20);
}

function pauseAni() {
    clearInterval(timer);
    timer = null;
}
continueAni();

continueAniBtn.addEventListener('click', continueAni);

pauseAniBtn.addEventListener('click', pauseAni);