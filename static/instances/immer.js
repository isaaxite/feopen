// const produce = require('immer').produce;
import Immer from 'immer';
const { produce } = Immer;

let currentState = {
  p: {
    x: [2],
  },
};
console.log(currentState);

let o1 = produce(currentState, draft => {
  draft.p.x = 1;
});
console.log(o1);

const o2 = fn(currentState); // currentState 被修改了
console.log(o2)
function fn(o) {
  return produce(o, draft => {
    draft.p1 = 1;
  })
};

const o4 = produce(currentState, draft => {
  draft.p.x.push(1);
});
console.log(o4);
console.log(currentState);
