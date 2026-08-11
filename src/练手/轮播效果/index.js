// 静态数据
var imgList = [1, 2, 3, 4];
var warp = document.querySelector('.warp')
var list = document.querySelector('.list');
var indicator = document.querySelector('.indicator');
// 第一步：动态创建列表
for (var i = 0; i <= imgList.length - 1; i++) {
    var li = document.createElement('li');
    li.classList.add('item');
    li.classList.add(`bg${i + 1}`);
    li.innerText = `${i + 1}`;
    list.appendChild(li);

    var div = document.createElement('div');
    div.classList.add('indicatorItem');
    indicator.appendChild(div)
};

// 克隆第一个
list.appendChild(list.children[0].cloneNode(true));

var length = list.children.length;

// 第二步：设置列表宽度
// 获取li的宽度
var itemWidth = getComputedStyle(list.children[0]).width.slice(0, -2);
list.style.width = itemWidth * length + 'px';

// 第三步：让列表动起来
var curIndex = 0;
var duration = 2000; //滚动时间间隔
// 左移动
function moveLeft() {
    var from = curIndex * itemWidth;
    curIndex++;
    var to = curIndex * itemWidth;
    var duration = 10; //多久滚动一下
    var totalDuration = 320; // 滚动完成需要的时间
    var num = totalDuration / duration; // 滚动的次数
    var l = itemWidth / num;// 每次滚动的距离
    var timerId = setInterval(() => {
        from += l;
        if (from >= to) {
            clearInterval(timerId);
            if (curIndex === length - 1) {
                curIndex = 0;
            }
            indicator.children[curIndex].classList.add('active')
        }
        list.style.marginLeft = -from + 'px';
    }, duration);
}
// 右移动
function moveRight() {
    // 获取li当前的marginleft
    var from = getComputedStyle(list).marginLeft.slice(0, -2) * 1
    var to = from + itemWidth;

    var duration = 10; //多久滚动一下
    var totalDuration = 320; // 滚动完成需要的时间
    var num = totalDuration / duration; // 滚动的次数
    var l = itemWidth / num;// 每次滚动的距离
    var timerId = setInterval(() => {
        from -= l;
        if (from <= to) {
            clearInterval(timerId);
            if (curIndex === length - 1) {
                curIndex = 0;
            }
            indicator.children[curIndex].classList.add('active')
        }
        list.style.marginLeft = from + 'px';
    }, duration);
}

var timerId = setInterval(moveLeft, duration);

// 鼠标移入暂停播放
warp.addEventListener('mouseover', function () {
    clearInterval(timerId)
});
// 鼠标移出继续播放
warp.addEventListener('mouseout', function () {
    timerId = setInterval(moveLeft, duration);
});

var arrowLeft = document.querySelector('.arrowLeft');

arrowLeft.addEventListener('click', function () {
    moveLeft();
})

var arrowRight = document.querySelector('.arrowRight');

arrowRight.addEventListener('click', function () {
    moveRight();
})