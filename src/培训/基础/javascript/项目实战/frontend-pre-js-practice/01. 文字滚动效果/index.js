(function () {
    var list = document.querySelector('.list');

    function cloneFirstItem() {
        var firstItem = list.children[0];
        var newItem = firstItem.cloneNode(true);
        list.appendChild(newItem);
    };

    cloneFirstItem();

    var duration = 1500;
    var itemHeight = 30;
    var curIndex = 0;

    setInterval(moveNext, duration);

    function createAnimation(options) {
        var from = options.from;
        var to = options.to;
        var totalMS = options.totalMS || 1500;//动画执行总时间
        var duration = options.duration || 15;//每次执行动画时间
        var times = totalMS / duration; //需要执行的次数
        var dis = (to - from) / times;//每次运动的长度
        var curTimes = 0;// 动画当前执行到第几次
        var timerId = setInterval(() => {
            // debugger
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
    };

    function moveNext() {
        var from = curIndex * itemHeight;
        curIndex++;
        var to = curIndex * itemHeight;

        createAnimation({
            from: from,//从哪里
            to: to,//变到哪里
            totalMS: 500,//动画执行时间
            duration: 10,//每隔多少毫秒执行一次
            onmove: function (from) {
                list.scrollTop = from;
            },
            onend: function () {
                if (curIndex === list.children.length - 1) {
                    from = 0;
                    curIndex = 0;
                }
            }
        });
    }


    // function moveNext() {
    //     var from = curIndex * itemHeight;
    //     curIndex++;
    //     var to = curIndex * itemHeight;
    //     var totalDuration = 500;//变化的总时间
    //     var duration = 10;//变化的时间间隔
    //     var times = totalDuration / duration;//变化的次数
    //     var dis = (to - from) / times;

    //     var timerId = setInterval(() => {
    //         from += dis;
    //         if (from >= to) {
    //             clearInterval(timerId);
    //             timerId = null;

    //             if (curIndex === list.children.length - 1) {
    //                 from = 0;
    //                 curIndex = 0;
    //             }
    //         }
    //         list.scrollTop = from;
    //     }, duration);
    // }
})()