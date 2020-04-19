console.log('测试NodeJs中是否先清空某阶段宏任务队列所有任务，之后再处理为任务：', '\n');
setTimeout(()=>{
  console.log('timer1')
  Promise.resolve().then(() => console.log('promise1.0'));
  Promise.resolve().then(() => console.log('promise1.1'));
  Promise.resolve().then(() => console.log('promise1.2'));
}, 0);

setTimeout(()=>{
  console.log('timer2')
  Promise.resolve().then(function() {
      console.log('promise2')
  })
}, 0);


/**
 * 结论： nodejs和浏览器行为一致
 * 在执行一个阶段的一个宏任务之后，会去查看微任务队列中是否有任务，有则清空整个微任务队列
 * 然后继续执行下一个宏任务
 */

 console.log('\n', '测试setTimeout的默认最小延时:', '\n');
 const prevTime = Date.now();
 setTimeout(() => {
  console.log(Date.now() - prevTime);
 }, 0);
 