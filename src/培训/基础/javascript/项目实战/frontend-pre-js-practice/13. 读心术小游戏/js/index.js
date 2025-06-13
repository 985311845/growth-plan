function $(selector) {
    return document.querySelector(selector);
};

function $$(selector) {
    return document.querySelectorAll(selector);
};

var board = $('.board');
var panel = $('.panel');
var initImg = $('#initImg');
var resultImg = $('#resultImg');
var dictionary = $('.dictionary');
var isGameOver = false;
// 表格布局20*5
// 产生随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// 产生一个随机数，记录9的倍数的数字对应的图片
var nine;

function createItem() {
    dictionary.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 100; i++) {
        var div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';

        var span = document.createElement('span');
        span.className = 'number'
        span.innerText = i;
        var random = getRandom(0, 15);
        var img = document.createElement('img');
        if (i % 9 === 0) {
            img.src = `../images/values/${nine}.png`
        } else {
            img.src = `../images/values/${random}.png`
        }
        div.appendChild(span);
        div.appendChild(img);
        fragment.appendChild(div);
    };
    dictionary.appendChild(fragment);
};

function init() {
    nine = getRandom(0, 15);
    // 创建右边的各种图案
    createItem();
    console.log('diaouyong');

};
function transitionendHandle() {
    resultImg.src = `../images/values/${nine}.png`;
    resultImg.style.opacity = 1;
    initImg.style.opacity = 0;
    isGameOver = true;
}
function bindEvent() {
    panel.onclick = function () {
        if (isGameOver) {
            if (window.confirm('是否再玩一次？')) {
                init();
                resultImg.style.opacity = 0;
                initImg.style.opacity = 1;
                panel.setAttribute('style', '');
                isGameOver = false;
                panel.removeEventListener('transitionend', transitionendHandle)
            }
        } else {
            panel.style.transform = 'rotate(1800deg)';
            panel.style.transition = 'all 2s';

            panel.addEventListener('transitionend', transitionendHandle);
        }
    }
}
function main() {
    init();
    bindEvent();
};
main();