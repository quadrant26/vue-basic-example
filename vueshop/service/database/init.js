const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"

const glob = require('glob')
const {resolve} = require('path')

exports.initSchemas = () =>{
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require);
}

exports.connect = ()=>{
    // 链接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0

    return new Promise( (resolve, reject)=>{
        // 添加数据库监听事件
        mongoose.connection.on('disconnected', (err)=>{
            // 进行重连
            console.log("*****数据库链接断开*****");
            if ( maxConnectTimes < 3){
                maxConnectTimes ++;
                mongoose.connect(db);
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请认为修理.....')
            }
            
        })

        // 数据库出错
        mongoose.connection.on('error', err=>{
            console.log("*****数据库错误******")
            if ( maxConnectTimes < 3){
                maxConnectTimes ++;
                mongoose.connect(db);
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请认为修理.....')
            }
        })

        mongoose.connection.once('open', ()=>{
            console.log("[SUCCESS] MongoDB connected successfully!")
            resolve()
        })
    })
}