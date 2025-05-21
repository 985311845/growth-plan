(function () {
  var checkAll = document.querySelector('.checkAll');
  var checks = document.querySelectorAll('tbody input');
  var head = document.querySelectorAll('thead th');
  var tbody = document.querySelector('tbody');
  var rows = tbody.querySelectorAll('tr')
  var init = function () {
    initEvents()
  };
  var initEvents = function () {
    checkAll.addEventListener('click', onCheckAll);
    for (var i = 0; i < checks.length; i++) {
      checks[i].addEventListener('click', onCheck)
    }
    for (var i = 0; i < head.length; i++) {
      (function (i) {
        head[i].addEventListener('click', headClick.bind(head[i], i))
      })(i)
    }
  };
  var onCheckAll = function () {
    e.stopPropagation();
    const checked = this.checked;
    for (var i = 0; i < checks.length; i++) {
      checks[i].checked = checked;
    }
  }
  var onCheck = function (e) {
    e.stopPropagation();
    var checksList = Array.from(checks).map(item => item.checked);
    checkAll.checked = checksList.every(item => item === true);
  }
  var headClick = function (i) {
    if (i === 0) {
      return;
    };
    var arr = Array.from(rows).sort((a, b) => {
      if (i === 2 || i === 4) {
        return a.querySelectorAll('td')[i].innerText.localeCompare(b.querySelectorAll('td')[i].innerText, 'zh');
      }
      return a.querySelectorAll('td')[i].innerText - b.querySelectorAll('td')[i].innerText;
    });

    arr.forEach(node => {
      tbody.appendChild(node)
    })
  }
  init();
})()