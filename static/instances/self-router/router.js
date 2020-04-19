class Router {
  constructor() {
    this.routes = {};
    this._bindPopState();
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(_path, cb) {
    const path = _path.trim();
    if (path && typeof cb === 'function') {
      this.routes[path] = cb;
    }
  }

  go(path) {
    const cb = this.routes[path];
    if (cb) {
      history.pushState({ path }, null, path);
      cb();
    }
  }

  _bindPopState() {
    window.addEventListener('popState', function(e) {
      const path = e.state?.path;
      if (path && this.routes[path]) {
        this.routes[path]();
      }
    });
  }
}