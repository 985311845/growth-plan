class myIterator {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    };

    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let index = 0;
        const length = keys.length;
        const _that = this;
        return {
            next() {
                if (index < length - 1) {
                    return { value: _that[keys[index++]], done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
};
const personal = new myIterator('张三', '20', '男');

// console.log(personal.next());
for (const item of personal) {
    console.log(item);
}

class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while (this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}
async function asyncCount() {
    let emitter = new Emitter(5);
    for await (const x of emitter) {
        console.log(x);
    }
}
asyncCount();
// 0
// 1
// 2
// 3
// 4