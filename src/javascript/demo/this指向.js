const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  FULFILLED_CALLBACK_LIST = []
  REJECTED_CALLBACK_LIST = []
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }
  get status() {
    return this.status;
  }
  set status(newStatus) {
    this.status = newStatus;
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value)
        })
      };
        break;
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback => {
          callback(this.reason)
        })
      }
        break;
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      const promiseFinish = (promise, self) => {
        promise.then(value => {
          self.value = value;
          self.status = FULFILLED;
        }, reason => {
          self.reason = reason;
          self.status = REJECTED;
        })
      }
      value instanceof Promise ? promiseFinish(value, this) : (this.value = value, this.status = FULFILLED)
    }
  }
  reject(reason) {
    if (this.status = PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }
  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : value => value;
    const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => { throw reason };

    let promise2 = new promise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject)

          } catch (e) {
            reject(e)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      switch (this.status) {
        case FULFILLED: fulfilledMicrotask();
          break;
        case REJECTED: rejectedMicrotask();
          break;
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
        }
      }
    })
    return promise2;
  }
  isFunction(param) {
    return typeof param === 'function';
  }
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
  }

}

new Promise((resolve, reject) => {

})