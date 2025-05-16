// 当窗口尺寸变化后，调用layout函数
function debounce(fn, duration) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, duration);
    }
};

var _layout = debounce(layout, 1000);

window.addEventListener('resize', _layout);
