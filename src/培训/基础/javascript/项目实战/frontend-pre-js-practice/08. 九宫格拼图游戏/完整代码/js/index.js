// 每个 div 小方块正确的 postion 位置
var rightPosition = [
  { index: 1, x: 0, y: 0, left: 0, top: 0 },
  { index: 2, x: -200, y: 0, left: 200, top: 0 },
  { index: 3, x: -400, y: 0, left: 400, top: 0 },
  { index: 4, x: 0, y: -200, left: 0, top: 200 },
  { index: 5, x: -200, y: -200, left: 200, top: 200 },
  { index: 6, x: -400, y: -200, left: 400, top: 200 },
  { index: 7, x: 0, y: -400, left: 0, top: 400 },
  { index: 8, x: -200, y: -400, left: 200, top: 400 },
  { index: 9, x: -400, y: -400, left: 400, top: 400 },
];

function $(selector) {
  return document.querySelector(selector)
};
function $$(selector) {
  return document.querySelectorAll(selector);
}
var clonePosition = [];
var isOver = true;
var width = 0;
// 容器
var game = $('.game');

// 初始化
function init() {
  game.innetHTML = "";
  for (var i = 0; i < 8; i++) {
    game.innerHTML += `
      <div class="item"
        style="
        top:${rightPosition[i].top}px;
        left:${rightPosition[i].left}px;
        background-position:${rightPosition[i].x}px ${rightPosition[i].y}px"
      >
        <div class="cardNo" style="opacity:0">${i + 1}</div>
      </div>
    `
  };
  width = $('.game>div').offsetWidth;
  // 初始化完成之后，过一秒，打乱顺序
  setTimeout(setItemPosition, 5000);
};
// 打乱数组
function shuffle(arr) {
  // 打乱
  for (var i = arr.length - 1; i >= 0; i--) {
    // 生成随机数
    var random = Math.floor(Math.random() * (i + 1));
    var current = arr[i];
    arr[i] = arr[random];
    arr[random] = current;
  };
  return arr;
};
// 乱序之后设置每个盒子的位置
function setItemPosition() {
  // 深克隆
  clonePosition = JSON.parse(JSON.stringify(rightPosition));
  // 得到乱序之后的位置信息
  clonePosition = shuffle(clonePosition);
  var divs = $$('.item');
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.top = clonePosition[i].top + 'px';
    divs[i].style.left = clonePosition[i].left + 'px';
  };
  // divs只有8个clonePosition的长度有9个，所以clonePosition得最后一项是空白
  // 准备就绪:游戏开始
  isOver = false;
};
function bindEvent() {
  game.onclick = function (e) {
    if (e.target.className === 'cardNo' && !isOver) {
      var node = e.target.parentNode;
      var left = parseFloat(node.style.left);
      var top = parseFloat(node.style.top);
      // 计算四周的位置
      var direction = [
        { top: top - width, left },//上
        { top: top, left: left + width },//又
        { top: top + width, left },//下
        { top: top, left: left - width },//上
      ];
      // 为什么是最后一项为空白项？
      // 因为只有8个盒子，就算打乱顺序了，那也是打乱顺序之后的clonePosition前8项对应了盒子的位置
      // 第9项是没有对应的盒子的
      var hasItem = direction.filter(item => {
        return (
          item.top === clonePosition[clonePosition.length - 1].top &&
          item.left === clonePosition[clonePosition.length - 1].left
        )
      });
      // 当前点击项的的index
      var index = clonePosition.findIndex(item => item.top === top && item.left === left);
      // 当前点击的项对应的位置
      var currentItem = clonePosition[index];

      if (hasItem.length) {
        // 如果hasItem中有值的话，说明周围有位置
        // 直接把当前项移动到该位置，并且需要交换clonePosition中这两项的位置
        node.style.top = hasItem[0].top + 'px';
        node.style.left = hasItem[0].left + 'px';

        clonePosition[index] = clonePosition[clonePosition.length - 1];
        clonePosition[clonePosition.length - 1] = currentItem;


        // 判断游戏是否结束:判断更新后的每一项是否与原始数据的每一项的top和left相等
        isOver = true;
        for (var i = 0; i < clonePosition.length; i++) {
          if (clonePosition[i].top === rightPosition[i].top && clonePosition[i].top === rightPosition[i].top) {
            continue;
          } else {
            isOver = false;
          }
        };

        // 跳出循环之后，根据isOver判断游戏是否结束
        if (isOver) {
          node.ontransitionend = function () {
            window.alert('游戏结束');
            node.ontransitionend = null;
          }
        }
      }
    }
  }
};
function main() {
  init();
  bindEvent();
};
main();