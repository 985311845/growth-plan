function createPager(nowPageNum, countPage, showPage, container) {
    container.innerHTML = "";
    var pager = document.createElement('div');
    pager.className = 'pager';
    // 创建按钮
    function createLink(text, newPage, className = '') {
        var a = document.createElement('a');
        a.innerHTML = text;
        a.style.fontSize = '14px';
        a.className = className;
        pager.appendChild(a);
        a.onclick = function () {
            if (newPage < 1 || newPage > countPage) {
                return;
            }
            createPager(newPage, countPage, showPage, container)
        }
    };
    createLink('首页', 1, '');
    createLink('上一页', nowPageNum - 1, '');
    // 10个按钮中的最小值
    var min = Math.floor(nowPageNum - showPage / 2);
    if (min < 1) {
        min = 1;
    };
    // 10个按钮中的最大值
    var max = min + showPage - 1;
    if (max > countPage) {
        max = countPage;
    };
    for (var i = min; i <= max; i++) {
        if (i === nowPageNum) {
            createLink(i, i, 'active');
        } else {
            createLink(i, i, '');
        }
    }
    createLink('下一页', nowPageNum + 1, '');
    createLink('尾页', countPage, '');
    var span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.padding = '4px 10px';
    span.style.fontSize = '14px';
    span.innerHTML = nowPageNum + '/' + countPage;
    pager.appendChild(span);
    container.appendChild(pager);
};