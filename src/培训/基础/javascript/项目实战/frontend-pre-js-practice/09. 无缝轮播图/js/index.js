(function () {
  var urls = [
    './img/Wallpaper1.jpg',
    './img/Wallpaper2.jpg',
    './img/Wallpaper3.jpg',
    './img/Wallpaper4.jpg',
    './img/Wallpaper5.jpg',
  ]; //记录了要显示的所有轮播图的图片路径

  function $(selector) {
    return document.querySelector(selector);
  };
  function $$(selector) {
    return document.querySelectorAll(selector)
  };

  // 总体盒子
  var container = $('.carousel-container');
  // 轮播列表
  var carouselList = $('.carousel-list');
  // 指示器
  var indicator = $('.indicator');
  // 左箭头
  var arrowLeft = $('.arrow-left');
  // 右箭头
  var arrowRight = $('.arrow-right');
  // 列表项的宽度
  var itemWidth = 0;
  // 动画持续时间
  var totalMS = 600;
  // 每一帧动画时间
  var duration = 10;
  // 当前是第几张：默认显示第一张
  var currentIndex = 0;
  // 动画进行中
  var playing = false;
  // 初始化函数
  function init() {
    // 创建img元素，因为需要在列表后面创建一个跟第一个item一模一样的img，所以封装成函数，便于调用
    function _createImg(i) {
      var img = document.createElement('img');
      img.src = urls[i];
      img.classList.add('carousel-item');
      carouselList.appendChild(img);;
    };
    // 向列表中添加img和指示器
    for (var i = 0; i < urls.length; i++) {
      // 添加img
      _createImg(i);
      // 添加指示器
      var div = document.createElement('div');
      div.classList.add('indicator-item');
      indicator.appendChild(div);
    };
    // 在列表末尾加一个与第一个img一模一样的img
    _createImg(0);

    // 所有元素创建完成之后，计算列表的宽度
    itemWidth = $('.carousel-item').getBoundingClientRect().width;
    carouselList.style.width = carouselList.children.length + '00%';
    // 初始化指示器选中样式
    setActive(0);
  };
  // 设置指示器选中样式
  function setActive(index) {
    // 先清除之前的选中样式
    for (var i = 0; i < indicator.children.length; i++) {
      indicator.children[i].classList.remove('active')
    }
    index = index % urls.length;
    indicator.children[index].classList.add('active');
  };
  // 初始化页面样式
  init();

  // 移动
  /**
   * 
   * @param {*} index 移动到index位置
   */
  function moveTo(index, onend) {
    if (playing || index === currentIndex) {
      return;
    }
    playing = true;
    // 移动之前的位置:用parseFloat是去电单位px
    var from = parseFloat(carouselList.style.marginLeft) || 0;
    // 需要移动到的位置
    var to = -index * itemWidth;
    createAnimation({
      from,
      to,
      totalMS,
      onmove: function (from) {
        carouselList.style.marginLeft = from + 'px';
      },
      onend: function () {
        // 动画执行完成之后，当前项currentIndex需要index同步
        onend && onend();
        playing = false;
      }
    });
    currentIndex = index;
    setActive(currentIndex);
  };
  // 切换到下一张：需要知道当前是第几张，就需要一个全局变量
  function next() {
    var newIndex = currentIndex + 1;
    var onend;
    if (newIndex === carouselList.children.length - 1) {
      onend = function () {
        carouselList.style.marginLeft = 0;
        currentIndex = 0;
      }
    }
    moveTo(newIndex, onend);
  }
  // 切换到上一张
  function prev() {
    var newIndex = currentIndex - 1;
    if (newIndex < 0) {
      var maxIndex = carouselList.children.length - 1;
      carouselList.style.marginLeft = -maxIndex * itemWidth + 'px';
      newIndex = maxIndex - 1;//切换到最后一张之后，再移动一张
    };
    moveTo(newIndex);
    // 一下写法如果初始的时候，默认就是下标为0，调用prev会有bug
    // var onend;
    // if (newIndex === 0) {
    //   onend = function () {
    //     var maxIndex = carouselList.children.length - 1;
    //     carouselList.style.marginLeft = -maxIndex * itemWidth + 'px';
    //     currentIndex = carouselList.children.length - 1;
    //   }
    // }
    // moveTo(newIndex, onend)
  }

  arrowRight.onclick = next;
  arrowLeft.onclick = prev;

  var duration = 2000; // 自动切换的间隔
  var timerId;
  function autoStart() {
    if (timerId) {
      // 已经有自动切换在进行了
      return;
    }
    timerId = setInterval(next, duration);
  };
  autoStart();

  function autoStop() {
    clearInterval(timerId);
    timerId = null;
  };
  // 设置指示器的选中样式
  function setActive(index) {
    for (var i = 0; i < indicator.children.length; i++) {
      indicator.children[i].classList.remove('active');
    }
    if (index > 4) {
      index = 0;
    }
    indicator.children[index].classList.add('active')
  }

  container.onmouseenter = autoStop;
  container.onmouseleave = autoStart;

  for (var i = 0; i < indicator.children.length; i++) {
    (function (i) {
      indicator.children[i].addEventListener('mouseenter', handleHover.bind(indicator[i], i));
    })(i);
  };

  function handleHover(i) {
    moveTo(i);
    setActive(i);
  }
})();