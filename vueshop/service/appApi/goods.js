const Koa = require('Koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map( (value, index) => {
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then( ()=> {
                saveCount++
                console.log('插入成功'+saveCount)
            }).catch( (error) => {
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入 Goods 数据"
})

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map( (value, index) => {
            console.log(value)
            let category = new Category(value)
            category.save().then( ()=> {
                saveCount++
                console.log('插入成功'+saveCount)
            }).catch( (error) => {
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入 category 数据"
})

router.get('/insertAllCategorySub', async( ctx)=>{
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map( (value, index) => {
            console.log(value)
            let categorySub = new CategorySub(value)
            categorySub.save().then( () => {
                saveCount ++
                console.log('插入成功' + saveCount)
            }).catch( error => {
                console.log( error )
            })
        })
    })

    ctx.body = "开始插入 category-sub 数据...."
})

module.exports = router