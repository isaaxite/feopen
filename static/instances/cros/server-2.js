const Koa = require('koa2');
const koaBody = require('koa-body'); //解析上传文件的插件
const router = require('koa-router')();

const app = new Koa();

//CORS middleware
const cros = function(ctx, next) {
  // ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8081');
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'csrf-token');
  ctx.set('Access-Control-Expose-Headers', 'csrf-token,Origin');
  ctx.set('csrf-token', 'asdsadasdsadsad');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // console.log(ctx.headers);
  next();
}

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(cros);

router.get('/api/cors', (ctx) => {
  ctx.cookies.set({
    cors: 'isaac test cors',
    cors1: 'isaac test cors1',
  });
  ctx.cookies.set('cors1', 'cors1');
  ctx.body = {
    message: 'this is cors'
  };
});

router.post('/api/print-cookie', (ctx) => {
  ctx.body = ctx.cookies.get('cors1');
});
app.use(router.routes());
app.listen(8082);
