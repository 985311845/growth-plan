var $ = function (selector) {
  return document.querySelector(selector);
};

var leftImg = $('.left-img');
var mask = $('.mask');
var leftImgWidth = leftImg.offsetWidth;
var leftImgHeight = leftImg.offsetHeight;
var maskWidth = mask.offsetWidth;
var maskHeight = mask.offsetHeight;

// 鼠标移入事件
function mouseenter() {
  this.addEventListener('mousemove', mousemove);
  mask.style.opacity = 1;
}
// 鼠标移出事件
function mouseleave() {
  mask.style.opacity = 0;
  this.removeEventListener('mousemove', mousemove);
}
// 鼠标移动事件
function mousemove(e) {
  var poorW = leftImgWidth - maskWidth;
  var poorH = leftImgHeight - maskHeight;
  // 获取鼠标的x、y坐标
  var x = e.clientX, y = e.clientY;
  // 计算偏移量
  var left = x - leftImg.offsetLeft - mask.offsetWidth / 2;
  var top = y - leftImg.offsetTop - mask.offsetHeight / 2;
  console.log(left, '---', top)

  if (left <= 0) {
    left = 0;
  }
  if (left >= poorW) {
    left = poorW
  }
  if (top <= 0) {
    top = 0;
  }
  if (top >= poorH) {
    top = poorH
  }
  console.log(left, '-----', top)
  mask.style.top = top + 'px';
  mask.style.left = left + 'px';
}

leftImg.addEventListener('mouseenter', mouseenter);
leftImg.addEventListener('mouseleave', mouseleave)