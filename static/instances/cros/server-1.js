const Koa = require('koa2');
const path = require('path');
const koaStatic = require('koa-static')

const app = new Koa();
app.use(koaStatic(
  path.join(__dirname, './static')
));

app.listen(8081);
