const Koa = require('Koa')
const app = new Koa()

// 连接数据库
const { connect } = require('./database/init.js')

;(async ()=>{
    await connect();
})()

app.use(async(ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, ()=>{
    console.log('[Server] starting at port 3000')
})