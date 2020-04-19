const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const RESOLVED = 'fulfilled';

function IcPromise(callback) {
  const self = this;
  self.value = void 0;
  self.curState = PENDING;
  self.resolvedCallbackQueue = [];
  self.rejectedCallbackQueue = [];
  self.resolve = function(val) {
    if (val instanceof IcPromise) {
      return val.then(self.resolve, self.reject);
    }
    setTimeout(() => {
      if (self.curState === PENDING) {
        self.curState = RESOLVED;
        self.value = val;
        self.resolvedCallbackQueue.forEach((cb) => cb());
      }
    });
  }
  self.reject = function(val) {
    setTimeout(() => {
      if (self.curState === PENDING) {
        self.curState = REJECTED;
        self.value = val;
        self.rejectedCallbackQueue.forEach((cb) => cb());
      }
    });
  }

  try {
    callback(self.resolve, self.reject); 
  } catch (error) {
    self.reject(error);
  }
}

IcPromise.prototype.then = function (onResolved, onRejected) {
  let promise2;
  let self = this;
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r; };

  switch(self.currentState) {
    case RESOLVED:
      promise2 = new MyPromise(thenableGenerator(self.value, onResolved, promise2));
      break;
    case REJECTED:
      promise2 = new MyPromise(thenableGenerator(self.value, onRejected, promise2));
      break;
    case PENDING:
      promise2 = new MyPromise(function (resolve, reject) {
        self.resolvedCallbacks.push(function () {
          // 考虑到可能会有报错，所以使用 try/catch 包裹
          try {
            var x = onResolved(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });
  
        self.rejectedCallbacks.push(function () {
          try {
            var x = onRejected(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });
      });
      break;
    default:
      // TODO
  }
  return promise2;
};

function thenableGenerator(value, callback, promiseIns) {
  return function(resolve, reject) {
    setTimeout(() => {
      try {
        const result = callback(value);
        resolutionProcedure(promiseIns, result, resolve, reject);
      } catch (reason) {
        reject(reason);
      }
    });
  }
}

function resolutionProcedure(promiseIns, thenableRes, resolve, reject) {
  let called = false;
  const isBaseType = (_val) => !(_val instanceof Object);
  const isFunction = (_val) => typeof _val === 'function';
  const onceInvoke = (callback) => {
    if (called) { return; }
    called = true;
    callback();
  };

  if (promiseIns === thenableRes) {
    return reject(new TypeError('Error'));
  }
  if (thenableRes instanceof IcPromise) {
    if (thenableRes.curState === PENDING) {
      thenableRes.then((val) => {
        resolutionProcedure(promiseIns, val, resolve, reject);
      }, reject);
    } else {
      thenableRes.then(resolve, reject);
    }
  }

  if (
    thenableRes !== null
    &&(typeof thenableRes === "object" || typeof thenableRes === "function")
  ) {
    let then = thenableRes.then;
    if (!isFunction(then)) {
      return resolve(thenableRes);
    }
    try {
      then.call(thenableRes, (_val) => {
        onceInvoke(() => resolutionProcedure(promiseIns, _val, resolve, reject));
      }, (_err) => {
        onceInvoke(() => reject(_err));
      }); 
    } catch (error) {
      onceInvoke(() => reject(error));
    }
  } else {
    resolve(thenableRes);
  }
}

// const Promise = require('./otherPromiseA+');
const Promise = IcPromise;
const resolved = value => new Promise((resolve) => resolve(value));
const rejected = reason => new Promise((resolve, reject) => reject(reason));
const deferred = () => {
  let promise, resolve, reject
  promise = new Promise(($resolve, $reject) => {
    resolve = $resolve
    reject = $reject
  })
  return { promise, resolve, reject }
}

module.exports = { resolved, rejected, deferred };
