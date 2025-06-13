function $(selector) {
    return document.querySelector(selector)
};
function $$(selector) {
    return document.querySelectorAll(selector);
};

var divContainer = $('.container');
var chessboard = $('.chessboard');
var isWhite = true;
var chessArr = [];
var isGameOver = false;

// 初始化棋盘
function initChessboard() {
    var content = '';
    for (var i = 0; i <= 14; i++) {
        var row = '<tr>';
        for (var j = 0; j <= 14; j++) {
            row += `<td data-rowIndex="${i}" data-columnIndex="${j}"></td>`
        };
        row += '</tr>';
        content += row;
    };
    chessboard.innerHTML = content;
};

// 创建棋子
function createChess(chessPoint) {
    var clone = JSON.parse(JSON.stringify(chessPoint));
    // 每次点击的时候，检查该位置是否有棋子
    var has = chessArr.some(item => item.x === clone.x && item.y === clone.y);
    if (has) return;
    chessArr.push(clone);
    // 创建棋子
    var div = document.createElement('div');
    div.className = `chess ${clone.color}`;
    div.setAttribute('data-rowindex', chessPoint.y);
    div.setAttribute('data-columnindex', chessPoint.x);
    // 找到点击的td
    var td;
    if (clone.x < 15 && clone.y < 15) {
        td = $(`td[data-rowindex='${clone.y}'][data-columnindex='${clone.x}']`);
    }
    if (clone.x < 15 && clone.y === 15) {
        td = $(`td[data-rowindex='14'][data-columnindex='${clone.x}']`);
        div.style.top = '50%';
    }
    if (clone.x === 15 && clone.y < 15) {
        td = $(`td[data-rowindex='${clone.y}'][data-columnindex='14']`);
        div.style.left = '50%';
    }
    if (clone.x === 15 && clone.y === 15) {
        td = $(`td[data-rowindex='14'][data-columnindex='14']`);
        div.style.top = '50%';
        div.style.left = '50%';
    }
    td.appendChild(div);
};

// 判断是否完成一局游戏
function check() {
    for (var i = 0; i < chessArr.length; i++) {
        var curChess = chessArr[i];
        var chess1, chess2, chess3, chess4;
        // 横向
        chess1 = chessArr.find(item => {
            return item.y === curChess.y && item.x === curChess.x + 1 && item.color === curChess.color;
        });
        chess2 = chessArr.find(item => {
            return item.y === curChess.y && item.x === curChess.x + 2 && item.color === curChess.color;
        });
        chess3 = chessArr.find(item => {
            return item.y === curChess.y && item.x === curChess.x + 3 && item.color === curChess.color;
        });
        chess4 = chessArr.find(item => {
            return item.y === curChess.y && item.x === curChess.x + 4 && item.color === curChess.color;
        });
        if (chess1 && chess2 && chess3 && chess4) {
            end(curChess, chess1, chess2, chess3, chess4);
        };
        // 纵向
        chess1 = chessArr.find(item => {
            return item.y === curChess.y + 1 && item.x === curChess.x && item.color === curChess.color;
        });
        chess2 = chessArr.find(item => {
            return item.y === curChess.y + 2 && item.x === curChess.x && item.color === curChess.color;
        });
        chess3 = chessArr.find(item => {
            return item.y === curChess.y + 3 && item.x === curChess.x && item.color === curChess.color;
        });
        chess4 = chessArr.find(item => {
            return item.y === curChess.y + 4 && item.x === curChess.x && item.color === curChess.color;
        });
        if (chess1 && chess2 && chess3 && chess4) {
            end(curChess, chess1, chess2, chess3, chess4);
        };
        // 向右斜
        chess1 = chessArr.find(item => {
            return item.y === curChess.y + 1 && item.x === curChess.x + 1 && item.color === curChess.color;
        });
        chess2 = chessArr.find(item => {
            return item.y === curChess.y + 2 && item.x === curChess.x + 2 && item.color === curChess.color;
        });
        chess3 = chessArr.find(item => {
            return item.y === curChess.y + 3 && item.x === curChess.x + 3 && item.color === curChess.color;
        });
        chess4 = chessArr.find(item => {
            return item.y === curChess.y + 4 && item.x === curChess.x + 4 && item.color === curChess.color;
        });
        if (chess1 && chess2 && chess3 && chess4) {
            end(curChess, chess1, chess2, chess3, chess4);
        };
        // 向左斜
        chess1 = chessArr.find(item => {
            return item.y === curChess.y + 1 && item.x === curChess.x - 1 && item.color === curChess.color;
        });
        chess2 = chessArr.find(item => {
            return item.y === curChess.y + 2 && item.x === curChess.x - 2 && item.color === curChess.color;
        });
        chess3 = chessArr.find(item => {
            return item.y === curChess.y + 3 && item.x === curChess.x - 3 && item.color === curChess.color;
        });
        chess4 = chessArr.find(item => {
            return item.y === curChess.y + 4 && item.x === curChess.x - 4 && item.color === curChess.color;
        });
        if (chess1 && chess2 && chess3 && chess4) {
            end(curChess, chess1, chess2, chess3, chess4);
        };
    }
}

// 结束后的处理
function end() {
    if (!isGameOver) {
        isGameOver = true;
        // 给获胜棋子标上颜色
        for (var i = 0; i < arguments.length; i++) {
            $(`.chess[data-rowindex='${arguments[i].y}'][data-columnindex='${arguments[i].x}']`).classList.add('win');
        }
        // 给所有棋子标上数字，方便复盘
        for (var i = 0; i < chessArr.length; i++) {
            $(`.chess[data-rowindex='${chessArr[i].y}'][data-columnindex='${chessArr[i].x}']`).innerHTML = i;
        }
    };
    // Promise.resolve().then(() => {
    //     if (window.confirm('是否要重新开始一局？')) {
    //         // 进行一些初始化操作
    //         chessArr = []; // 重置棋子的数组
    //         initChessboard(); // 重新绘制棋盘
    //         isGameOver = false;

    //     }
    // })
}

// 事件绑定
function bindEvent() {
    chessboard.onclick = function (e) {
        if (!isGameOver) {
            if (e.target.nodeName === 'TD') {
                // 目标对象
                var targetInfo = Object.assign({}, e.target.dataset);
                // 目标对象宽度
                var width = e.target.clientWidth / 2;
                //  棋子对象信息
                var chessPoint = {
                    x: e.offsetX > width ? parseInt(targetInfo.columnindex) + 1 : parseInt(targetInfo.columnindex),
                    y: e.offsetY > width ? parseInt(targetInfo.rowindex) + 1 : parseInt(targetInfo.rowindex),
                    color: isWhite ? 'white' : 'black'
                };
                createChess(chessPoint);
                isWhite = !isWhite;
                // 判断是否结束
                check();
            }
        }
    }
};

function main() {
    initChessboard();
    bindEvent();
};
main();


