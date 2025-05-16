(function () {
  // 完成横幅区的图片切换
  // 横幅区数据
  var datas = [
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
      link: 'https://www.mi.com/mi11le-5g-ne',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/xiaomipad5',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
    },
  ];
  var defaultIndex = 0;
  var bannerCover = document.querySelector('.banner-cover');
  var img = document.querySelector('.banner-cover>img');
  var bannerDots = document.querySelector('.banner-dots');
  function init() {
    for (var i = 0; i < datas.length; i++) {
      var span = document.createElement('span');
      span.className = 'fl';
      bannerDots.appendChild(span);
      (function (i) {
        span.addEventListener('click', function () {
          change(i)
        })
      })(i);
    }
    change(defaultIndex);
  };
  function change(index) {
    bannerCover.href = datas[index].link;
    img.src = datas[index].img;
    var fl = document.querySelectorAll('.banner-dots .fl');
    // for (var i = 0; i < fl.length; i++) {
    //   fl[i].classList.remove('banner-dots-selected');
    // }
    // 或者
    var selected = bannerDots.querySelector('.banner-dots-selected');
    if (selected) {
      selected.className = 'fl';
    }
    var current = fl[index];
    current.classList.add('banner-dots-selected');
  };
  // 向前翻
  function toPrev() {
    if (defaultIndex === 0) {
      defaultIndex = datas.length - 1;
    } else {
      defaultIndex--;
    }
    change(defaultIndex);
  }
  // 向后翻
  function toNext() {
    if (defaultIndex === datas.length - 1) {
      defaultIndex = 0;
    } else {
      defaultIndex++;
    }
    change(defaultIndex);
  };
  document.querySelector('.banner-pointer-left').onclick = function () {
    toPrev();
  }
  document.querySelector('.banner-pointer-right').onclick = function () {
    toNext();
  }
  init();

  // 自动播放
  var timer = null;

  function start() {
    if (timer) return;
    timer = setInterval(() => {
      toNext();
    }, 1500);
  };

  function stop() {
    clearInterval(timer);
    timer = null;
  }
  bannerCover.addEventListener('mouseenter', function () {
    stop();
  });
  bannerCover.addEventListener('mouseleave', function () {
    start();
  })
})();


