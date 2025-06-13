var imgWidth = 220;
var divContainer = document.querySelector('.container');

// 计算列和间隙
function getCal() {
    // 容器宽度
    var containerWidth = divContainer.clientWidth;
    // 列数
    var columns = Math.floor(containerWidth / imgWidth);
    // 间隙的宽度:(容器宽度 - 图片宽度的总和)/间隙的个数
    var spaceWidth = (containerWidth - columns * imgWidth) / (columns + 1);

    return {
        columns,
        spaceWidth
    };
};
// 获取最小值
function getMin(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return min;
}
// 设置每个图片的位置
function setPosition() {
    // 获取列数和间隙宽度
    var { columns, spaceWidth } = getCal();
    // 初始化每列的位置:初始位置全都是0，数组的长度就是有几列
    var arr = new Array(columns);
    arr.fill(0);

    // 遍历元素列表进行重排
    for (var i = 0; i < divContainer.children.length; i++) {
        // 当前元素
        var current = divContainer.children[i];
        // 获取数组中的最小值
        var min = getMin(arr);
        // 获取最小只所在的列
        var index = arr.indexOf(min);
        // 计算当前元素的横纵坐标
        var x = index * imgWidth + (index + 1) * spaceWidth;
        var y = min;
        // console.log(x, '----', y)
        current.style.top = y + 'px';
        current.style.left = x + 'px';
        // 把最小的那个值加上当前图片的高度
        arr[index] += current.clientHeight + spaceWidth;
    }
};

// 创建图片
function createImg() {
    for (var i = 0; i <= 40; i++) {
        var src = `../img/${i}.jpg`;
        var img = document.createElement('img');
        img.src = src;
        img.style.width = imgWidth;

        divContainer.appendChild(img);
        // 图片加载完成之后执行重排
        // img.onload = setPosition;
        window.onload = setPosition;
    }
};

var timerId = null;

function bindEvent() {
    window.onresize = function () {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(() => {
            setPosition();
        }, 500);
    }
};

function main() {
    createImg();
    bindEvent();
};

main();