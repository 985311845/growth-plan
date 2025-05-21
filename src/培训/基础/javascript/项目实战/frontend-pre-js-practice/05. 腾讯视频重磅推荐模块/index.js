var topNav = document.querySelector('.top-nav');
var imgs = document.querySelector('.imgs');
var sideBar = document.querySelector('.side-bar');
var links = sideBar.querySelectorAll('a');

var timer = null;
for (var i = 0; i < data.length; i++) {
  createLink(data[i]);
  createImg(data[i]);
};

function createLink(item) {
  var a = document.createElement('a');
  a.setAttribute('class', 'nav link');
  a.setAttribute('href', '#');
  a.setAttribute('title', item.title);
  a.innerHTML = "<span>" + item.title + "</span>" + item.desc;
  sideBar.appendChild(a);
};

function createImg(item) {
  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.style.backgroundColor = item.bg;
  a.style.backgroundImage = "url(" + item.img + ")";
  imgs.appendChild(a);
};

var currentImg;
var currentA;
var index = 0;
// 初始化
function init() {
  currentImg = document.querySelectorAll('.imgs a')[index];
  currentA = sideBar.querySelectorAll('.link')[index];
  currentImg.className = 'active';
  currentA.className = 'active link';
}

init();

var links = sideBar.querySelectorAll('.link');

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('mouseenter', mouseenter.bind(links[i], i));
  links[i].addEventListener('mouseleave', mouseleave.bind(links[i], i))
}

// 自动播放
function move() {
  currentImg.setAttribute('class', '');
  currentA.setAttribute('class', 'nav link');
  currentImg = document.querySelectorAll('.imgs a')[index];
  currentA = sideBar.querySelectorAll('.link')[index];
  currentImg.className = 'active';
  currentA.className = 'active link';
  index++;
  if (index >= data.length) {
    index = 0;
  };
};
timer = setInterval(move, 1000);

function mouseenter(i) {
  index = i;
  move();
  clearInterval(timer);
  timer = null;
};

function mouseleave(i) {
  index = i;
  timer = setInterval(move, 1000);
};
