var obj = {
    name: 'abc',
    age: 123,
    card: ['vise', 'erer'],
    wifi: {
        name: 'bcd',
        son: {
            name: 'aaa'
        }
    }
};
function deepClone(origin) {
    var target = (origin instanceof Array) ? [] : {};

    if (typeof (origin) === 'object' && origin !== null) {
        for (var key in origin) {
            if (typeof (origin[key]) === 'object' && origin[key] !== null) {
                target[key] = deepClone(origin[key])
            } else {
                target[key] = origin[key]
            }
        }
        return target;
    } else {
        return origin;
    }

};

const colneObj = deepClone(obj);

// console.log(colneObj);
colneObj.card[1] = '张三';
colneObj.wifi.name = '李四';
colneObj.wifi.son.name = '王五';

console.log(obj);
console.log(colneObj);



