// 让便签可被拖动，但不能超出视口
var x, y, eX, eY, eW, eH, dW, dY;
var moveBar = document.querySelector('.move-bar');
var note = document.querySelector('.note');

moveBar.addEventListener('mousedown', mousedown);

// 鼠标按下事件
function mousedown(e) {
    // 获取鼠标按下的坐标
    x = e.clientX;
    y = e.clientY;
    // 获取元素的位置坐标
    var rect = moveBar.getBoundingClientRect();
    // 元素的左上角坐标
    eX = rect.left;
    eY = rect.top;

    dW = document.documentElement.clientWidth;
    dH = document.documentElement.clientHeight;
    eW = note.clientWidth;
    eH = note.clientHeight;

    window.addEventListener('mousemove', mousemove);

    window.addEventListener('mouseup', mouseup);
};


// 鼠标移动事件
function mousemove(e) {
    console.log('调用')
    // 获取鼠标移动的时候的坐标
    var rX = e.clientX, rY = e.clientY;
    // 移动的距离
    var disX = rX - x, disY = rY - y;
    // 计算元素的距离
    var left = eX + disX, top = eY + disY;


    if (left < 0) {
        left = 0
    }
    if (top < 0) {
        top = 0;
    }
    var poorW = dW - eW;
    var poorH = dH - eH;
    if (left > poorW) {
        left = poorW;
    }
    if (top > poorH) {
        top = poorH;
    }
    note.style.left = left + 'px';
    note.style.top = top + 'px';


}

// 鼠标抬起事件
function mouseup() {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
}