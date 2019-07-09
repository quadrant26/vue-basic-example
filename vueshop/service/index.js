const Koa = require('Koa')
const app = new Koa()

// 连接数据库
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')

// 导入 koa-bodyParser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 配置跨域
const cors = require('koa2-cors')
app.use(cors())

// 引入router
const Router = require('koa-router')
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async ()=>{
    await connect();
    // 载入 schema
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName: 'kang2', password: '123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    
    // let users = await User.findOne({}).exec()
    // console.log('-----------------------')
    // console.log(users)
    // console.log('-----------------------')
})()

app.use(async(ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, ()=>{
    console.log('[Server] starting at port 3000')
})