function ajax(method, url, _options) {
  const toString = (val) => Object.prototype.toString.call(val)
  const isUndefined = (val) => typeof val === 'undefined';
  const isRealObject = (val) => toString(val) === '[object Object]';
  const isString = (val) => typeof val === 'string';
  const toHump = (_str) => {
    let str = _str.toLowerCase();
    str = str.replace(/(_\w)/g, ($0) => {
      return $0.slice(1).toUpperCase();
    });
    return str;
  };
  const options = isRealObject(_options) ? _options : {};
  const xmlhttp = new XMLHttpRequest();
  if (options.headers && isRealObject(options.headers)) {
    Object.entries(options.headers).forEach((header, val) => {
      if (headerName) {
        xmlhttp.setRequestHeader(header, val);
      }
    });
  }
  xmlhttp.open(
    method, url,
    isUndefined(options.async) ? true : options.async,
    isUndefined(options.user) ? null : options.user,
    isUndefined(options.password) ? null : options.password
  );
  xmlhttp.send(options.body);
  xmlhttp.onreadystatechange = function() {
    const readyStateTextArr = ['UNSENT', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE'];
    for (const READY_STATE_TEXT of readyStateTextArr) {
      if (xmlhttp.readyState === XMLHttpRequest[READY_STATE_TEXT]) {
        const fnName = toHump(READY_STATE_TEXT);
        }
        options[fnName] && options[fnName](xmlhttp.response, xmlhttp);
      }
    }
  }
}
