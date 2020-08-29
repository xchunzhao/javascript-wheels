/**
 *
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

/**
 * 1、构造函数 new Promise((resolve, reject) => {})
 * 2、then方法(返回一个Promise) new Promise((resolve, reject) => {}).then(resolve => {}, reject => {})
 * 3、then方法支持缺省参数 new Promise((resolve, reject) => {}).then()
 * 4、Promise链式调用 new Promise().then().then()
 */

enum STATUS {
  // pending
  PENDING,
  //fulfilled
  FULFILLED,
  //rejected
  REJECTED
}

// new MyPromise((resolve, reject) => {})

function MyPromise(executor) {
  let self = this;

  // 内部状态
  self.status = STATUS.PENDING;
  self.value = null;
  self.error = null;
  // 成功的回调函数
  self.onFulFilledCallback = [];
  // 失败的回调函数
  self.onRejectedCallback = [];

  const resolve = value => {
    if (self.status === STATUS.PENDING) {
      // 改变状态
      self.status = STATUS.FULFILLED;
      // 设置value
      self.value = value;
      // 调用onFulFilled
      self.onFulFilledCallback.forEach(callback => callback(self.value));
    }
  };

  const reject = error => {
    if (self.status === STATUS.PENDING) {
      // 改变状态
      self.status = STATUS.REJECTED;
      // 设置error
      self.error = error;
      // 调用onRejected
      self.onRejectedCallback.forEach(callback => callback(self.error));
    }
  };

  executor(resolve, reject);
}

function resolvePromise(promise2, thenCallbackResult, resolve, reject) {
  /**
   * 
   * let p = new MyPromise((resolve, reject) => {
      resolve(1)
    })
    
    let p1 = p.then(value => {
      return p1
    })

    //then的返回值不能跟then回调返回值相等
  *
  */
  // 防止循环引用
  if (thenCallbackResult === promise2) {
    reject(new TypeError("Chaining cycle"));
  }
  if (
    (thenCallbackResult && typeof thenCallbackResult === "object") ||
    typeof thenCallbackResult === "function"
  ) {
    let used; //PromiseA+2.3.3.3.3 只能调用一次
    try {
      let then = thenCallbackResult.then;
      if (typeof then === "function") {
        //thenCallback里面可能返回promise
        //PromiseA+2.3.3
        then.call(
          thenCallbackResult,
          y => {
            //PromiseA+2.3.3.1
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            //PromiseA+2.3.3.2
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        //PromiseA+2.3.3.4
        if (used) return;
        used = true;
        resolve(thenCallbackResult);
      }
    } catch (e) {
      //PromiseA+ 2.3.3.2
      if (used) return;
      used = true;
      reject(e);
    }
  }
}

// 实现then方法 then返回一个新的promise
// promise.then()
MyPromise.prototype.then = function(onFulFilled, onRejected) {
  onFulFilled =
    typeof onFulFilled === "function" ? onFulFilled : value => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };
  let self = this;
  const bridgePromise = new Promise((resolve, reject) => {
    if (self.status === STATUS.PENDING) {
      //暂时用setTimeout模拟微任务
      // 注册回调函数
      self.onFulFilledCallback.push(() => {
        setTimeout(() => {
          try {
            const result = onFulFilled(self.value);
            // result可能是个promise,不能直接resolve
            resolvePromise(bridgePromise, result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      self.onRejectedCallback.push(() => {
        setTimeout(() => {
          try {
            const result = onRejected(self.error);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return bridgePromise;
};
