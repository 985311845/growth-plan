function Priorityqueue() {
  this.items = [];
  // 实现一个类，保存优先级序号和值
  function Priority(element, priority) {
    this.element = element;
    this.priority = priority;
  };
  // 实现插入方法
  Priorityqueue.prototype.enqueue = function (element, priority) {
    let queueElement = new Priority(element, priority);
    if (this.items.length === 0) {
      this.items.push(queueElement)
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement)
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }
  Priorityqueue.prototype.dequeue = function () {
    return this.items.unshift();
  };

  Priorityqueue.prototype.front = function () {
    return this.items[0]
  }

  Priorityqueue.prototype.isEmpty = function () {
    return this.items.length == 0
  }

  Priorityqueue.prototype.size = function () {
    return this.items.length
  }

  Priorityqueue.prototype.toString = function () {
    return this.items.join('')
  }
}

// 测试代码
let pq = new Priorityqueue();

pq.enqueue('aaa', 111)
pq.enqueue('bbb', 222)
pq.enqueue('ccc', 100)
pq.enqueue('ddd', 150)

console.log(pq.items)