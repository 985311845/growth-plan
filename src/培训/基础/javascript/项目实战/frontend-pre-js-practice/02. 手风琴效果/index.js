var itemHeight = 30;
var titles = document.querySelectorAll('.menu h2');

for (var i = 0; i < titles.length; i++) {
  titles[i].onclick = function () {
    // 先关闭所有子菜单
    var beforeOpend = document.querySelector('.submenu[status=opened]');
    if (beforeOpend) {
      closeMenu(beforeOpend);
    }

    // 获取相邻兄弟元素
    var submenu = this.nextElementSibling;
    toggleSubmenu(submenu)
  }
};

// 打开子菜单
function openSubmenu(subMenu) {
  var status = subMenu.getAttribute('status');
  if (status && status !== 'closed') {
    return;
  }
  subMenu.setAttribute('status', 'playing')
  createAnimation({
    from: 0,
    to: subMenu.children.length * itemHeight,
    totalMS: 500,
    duration: 15,
    onmove: function (from) {
      subMenu.style.height = from + 'px';
    },
    onend: function () {
      subMenu.setAttribute('status', 'opened')
    }
  });
}

// 收起子菜单
function closeMenu(subMenu) {
  var status = subMenu.getAttribute('status');
  if (status && status !== 'opened') {
    return;
  }

  subMenu.setAttribute('status', 'playing')

  createAnimation({
    from: subMenu.children.length * itemHeight,
    to: 0,
    totalMS: 500,
    duration: 15,
    onmove: function (from) {
      subMenu.style.height = from + 'px';
    },
    onend: function () {
      subMenu.setAttribute('status', 'closed')
    }
  });
}

function toggleSubmenu(subMenu) {
  var status = subMenu.getAttribute('status');
  if (status && status === 'playing') {
    // 动画进行中
    return;
  } else if (status === 'opened') {
    closeMenu(subMenu);
  } else {
    openSubmenu(subMenu)
  }
}