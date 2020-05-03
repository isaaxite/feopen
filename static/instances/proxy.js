
console.log('实践proxy对引用类型数据的监听：');
const originArr = [1];
let arr = new Proxy(originArr, {
  get(target, key, receiver) {
    if (target.propertyIsEnumerable(key)) {
      console.log(`get:${key}`);
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    if (!target.hasOwnProperty(key)) {
      // 新增操作
      console.log(`new ${key} => ${value}`);
    } else if (target.propertyIsEnumerable(key)) {
      // 更新操作
      console.log(`update ${key} => ${value}`);
    }
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key, receiver) {
    if (target.propertyIsEnumerable(key)) {
      console.log(`delete ${key}`);
    }
    return Reflect.deleteProperty(target, key, receiver);
  }
});

arr[0];
arr[0] = 1;
arr.push(2);
delete arr[1];
arr.pop();
console.log(arr);
arr = [];

console.log('\n', '测试proxy对原型链的访问1：');
const proto = {
  name: 'issac'
};
const originObj = { age: 26 };
// originObj.prototype = Object.create(proto);
Object.setPrototypeOf(originObj, proto);
const obj = new Proxy(originObj, {
  get(target, key, receiver) {
    console.log(`key: ${key}, value: ${target[key]}`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(`key: ${key}, value: ${value}`);
    Reflect.set(target, key, value, receiver);
  }
});

console.log(obj.name);
console.log(obj.age);


console.log('\n', '测试proxy对原型链的访问：');
let originA = {};
let originB = { parent: 1 };

const getter = (target, key, receiver) => {
  console.log('get value:', key, target)
  return Reflect.get(target, key, receiver)
}
const setter = (target, key, receiver) => {
  console.log('set value:', key, value, target)
  return Reflect.set(target, key, value, receiver)
}

const proxyB = new Proxy(originB, {
  get: getter,
  set: setter
});
Object.setPrototypeOf(originA, proxyB);

const proxyData = new Proxy(originA, {
  get: getter,
  set: setter
});

console.log(proxyData.parent)

console.log('\n', '测试set层级的监听');
const originC = {
  a: 1,
  b: {
    b1: 2.1,
    b2: 2.2
  }
};

const proxyC = new Proxy(originC, {
  set(target, key, value, receiver) {
    console.log(`set ${key} => ${value}`);
    return Reflect.set(target, key, value, receiver);
  }
});

proxyC.b.b1 = 2.11;
proxyC.a = 1.1;

// console.log(`测试proxy对基本类型数据的拦截`);

// let originName = 'isaac';
// let proxyName = new Proxy(originName, {
//   get(target, key, receiver) {
//     console.log(`get: key: ${key}, target: ${target}`);
//     return Reflect.get(target, key, receiver);
//   },
//   set(target, key, value, receiver) {
//     console.log(`set: key: ${key}, value: ${value}`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });
// proxyName;
// proxyName = 'frank';