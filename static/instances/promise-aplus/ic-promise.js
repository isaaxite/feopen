const PENDING = Symbol.for("pending");
const RESOLVED = Symbol.for("resolved");
const REJECTED = Symbol.for("rejected");
const isFunction = (val) => typeof val === 'function';

function IcPromise(fn) {
  let self = this;
  self.currentStatus = PENDING;
  self.value = void 0;
  self.resolvedCallbacks = [];
  self.rejectedCallbacks = [];

  self.resolve = function(value) {
    if (value instanceof IcPromise) {
      return value.then(self.resolve, self.reject);
    }
    setTimeout(() => {
      if (self.currentStatus === PENDING) {
        self.currentStatus = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach((cb) => cb());
      }
    });
  };
  self.reject = function(reason) {
    setTimeout(() => {
      if (self.currentStatus === PENDING) {
        self.currentStatus = REJECTED;
        self.value = reason;
        self.rejectedCallbacks.forEach((cb) => cb());
      }
    });
  };
  try {
    fn(self.resolve, self.reject);
  } catch (error) {
    self.reject(error);
  }
}

IcPromise.prototype.then = function(_onResolved, _onRejected) {
  let self = this;
  let promise2;
  const onResolved = isFunction(_onResolved) ? _onResolved : (v) => v;
  const onRejected = isFunction(_onRejected) ? _onRejected : (e) => { throw e; };

  switch (self.currentStatus) {
    case RESOLVED:
      promise2 = new IcPromise(function(resolve, reject) {
        setTimeout(() => {
          try {
            const result = onResolved(self.value);
            resolutionProcedure(promise2, result, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      });
      break;
    case REJECTED:
      promise2 = new IcPromise(function(resolve, reject) {
        setTimeout(() => {
          try {
            const result = onRejected(self.value);
            resolutionProcedure(promise2, result, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      });
      break;
    case PENDING:
      promise2 = new IcPromise(function(resolve, reject) {
        self.resolvedCallbacks.push(function() {
          setTimeout(() => {
            try {
              const result = onResolved(self.value);
              resolutionProcedure(promise2, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        self.rejectedCallbacks.push(function() {
          setTimeout(() => {
            try {
              const result = onRejected(self.value);
              resolutionProcedure(promise2, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      });
      break;
    default:
      promise2 = new IcPromise((resolve, reject) => reject(new Error()));
  }
  return promise2;
};

function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('error'));
  }

  if (x instanceof IcPromise) {
    return x.currentStatus === PENDING
      ? x.then(function(value) {
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject)
      : x.then(resolve, reject);
  }

  // 1. x是Object, x.then是function
  // 2. x是function，x,then是function
  if (
    x !== null
    && (typeof x === 'object' || typeof x === 'function')
  ) {
    let called = false;
    const onceInvoke = (cb) => {
      if (called) { return; }
      called = true;
      cb();
    };
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(x, (val) => {
          onceInvoke(() => resolutionProcedure(promise2, val, resolve, reject));
        }, (e) => {
          onceInvoke(() => reject(e));
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      onceInvoke(() => reject(error));
    }
  } else {
    resolve(x);
  }
}

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
