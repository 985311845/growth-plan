// 当窗口尺寸变化后，调用layout函数
function debounce(fn, duration) {
    var timer;
    return function () {
        var _this = this;
        clearTimeout(timer);
        var args = Array.prototype.slice.call(arguments);
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, duration);
    }
};

var _layout = debounce(layout, 1000);

window.addEventListener('resize', _layout);
