function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 500;//动画执行总时间
  var duration = options.duration || 15;//每次执行动画时间
  var times = totalMS / duration; //需要执行的次数
  var dis = (to - from) / times;//每次运动的长度
  var curTimes = 0;// 动画当前执行到第几次
  var timerId = setInterval(() => {
    curTimes++;
    from += dis;
    if (curTimes >= times) {
      from = to;
      clearInterval(timerId);
      timerId = null;
      options.onend && options.onend();
    };
    options.onmove && options.onmove(from);
  }, duration);
}