var $ = function (selector) {
  return document.querySelector(selector);
};
var $$ = function (selector) {
  return document.querySelectorAll(selector);
}

var leftImg = $('.left-img');
var mask = $('.mask');
var imglist = $('.img-list');
var rightImg = $('.right-img');
var leftImgWidth = leftImg.offsetWidth;
var leftImgHeight = leftImg.offsetHeight;
var maskWidth = mask.offsetWidth;
var maskHeight = mask.offsetHeight;
var imgs = {
  small: ['imgA_1.jpg', 'imgB_1.jpg', 'imgC_1.jpg'],
  middle: ['imgA_2.jpg', 'imgB_2.jpg', 'imgC_2.jpg'],
  large: ['imgA_3.jpg', 'imgB_3.jpg', 'imgC_3.jpg']
}
// 初始化小图
var str = "";
for (var i = 0; i < imgs.small.length; i++) {
  str += "<li style='background-image: url(./images/" + imgs.small[i] + ");'></li>"
};
imglist.innerHTML = str;
var lists = $$('.img-list li');
lists[0].style.border = '2px solid #000';

for (var i = 0; i < lists.length; i++) {
  lists[i].addEventListener('click', handleClick.bind(lists[i], i))
};

function handleClick(i) {
  for (var j = 0; j < lists.length; j++) {
    lists[j].style.border = '2px solid transparent';
  };
  lists[i].style.borderColor = '#000';
  leftImg.style.backgroundImage = "url(./images/" + imgs.middle[i] + ")";
  rightImg.style.backgroundImage = "url(./images/" + imgs.large[i] + ")";
}

// 鼠标移入事件
function mouseenter() {
  this.addEventListener('mousemove', mousemove);
  mask.style.opacity = 1;
  rightImg.style.opacity = 1;
}
// 鼠标移出事件
function mouseleave() {
  mask.style.opacity = 0;
  rightImg.style.opacity = 0;
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
  mask.style.top = top + 'px';
  mask.style.left = left + 'px';
  rightImg.style.backgroundPositionX = -left + 'px';
  rightImg.style.backgroundPositionY = -top + 'px';
};

leftImg.addEventListener('mouseenter', mouseenter);
leftImg.addEventListener('mouseleave', mouseleave)