const Koa = require('Koa')
const app = new Koa()

// 连接数据库
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')

;(async ()=>{
    await connect();
    // 载入 schema
    initSchemas()
    const User = mongoose.model('User')
    // let oneUser = new User({userName: 'kang', password: '123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    
    let users = await User.findOne({}).exec()
    console.log('-----------------------')
    console.log(users)
    console.log('-----------------------')
})()

app.use(async(ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, ()=>{
    console.log('[Server] starting at port 3000')
})