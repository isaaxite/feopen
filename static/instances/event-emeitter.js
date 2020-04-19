function EventEmeitter() {
  this.eventMap = new Map();
  this.eventMaxCount = 10;
}

EventEmeitter.prototype.on = function(eventName, callback) {
  this._addEvent(eventName, callback);
};

EventEmeitter.prototype.trigger = function(eventName, ...rest) {
  const eventQueue = this.eventMap.get(eventName);
  if (!eventQueue) {
    return console.warn('event queue is empty!');
  }
  for (const item of eventQueue) {
    if (item.restCount) {
      item.callback.apply(this, rest);
      item.restCount -= 1;
    }
  }
  this._clear(eventName);
};

EventEmeitter.prototype.once = function(eventName, callback) {
  this._addEvent(eventName, callback, 1);
};

EventEmeitter.prototype.off = function(eventName, cbRef) {
  let eventQueue = this.eventMap.get(eventName);
  if (cbRef) {
    for (let i = 0; i < eventQueue.length; i += 1) {
      if (cbRef === eventQueue[i].callback) {
        eventQueue.splice(i, 1);
        break;
      }
    }
  } else {
    eventQueue.length = 0;
  }
};

EventEmeitter.prototype._addEvent = function(eventName, callback, restCount = Infinity) {
  let eventQueue = this.eventMap.get(eventName);
  if (!eventQueue) {
    eventQueue = new Array();
  }
  eventQueue.push({ callback, restCount });
  this.eventMap.set(eventName, eventQueue);
};

EventEmeitter.prototype._clear = function(eventName) {
  let eventQueue = this.eventMap.get(eventName);
  if (!eventQueue) {
    return ;
  }
  eventQueue = eventQueue.filter((item) => item.restCount > 1);
  this.eventMap.set(eventName, eventQueue);
}




let event = new EventEmeitter();

const fn = (...rest) => {
  console.log(rest);
};
event.on('number', fn);

event.once('number', (...rest) => {
  console.log(...rest);
});

setTimeout(() => {
  event.trigger('number', 1, 2);
  event.off('number');

  setTimeout(() => {
    event.trigger('number', 1, 2);
  }, 3 * 1000);
}, 3 * 1000);