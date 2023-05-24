function Queue() {
  this.items = [];
};
Queue.prototype.enqueue = function (element) {
  return this.items.push(element)
}

// Queue.prototype.pop = function (element) {
//   return this.items.pop(element)
// }
Queue.prototype.dequeue = function () {
  return this.items.unshift();
};

Queue.prototype.front = function () {
  return this.items[0]
}

Queue.prototype.isEmpty = function () {
  return this.items.length == 0
}

Queue.prototype.size = function () {
  return this.items.length
}

Queue.prototype.toString = function () {
  return this.items.join('')
}

// 击鼓传花面试题
let arr = ['Jon', 'Tom', 'Jry', 'Mary', 'Jusn', 'Temial'];

function QueueGarm(nameList, num) {
  // 创建一个队列结构
  let queue = new Queue();
  nameList.forEach(item => queue.enqueue(item));

  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue()
  }
  return queue.items[0]
}

console.log(QueueGarm(arr, 9))
