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

// 获取商品详情信息接口
router.post('/getDetailGoodsInfo', async (ctx) => {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID: goodsId}).exec().then( async (result) => {
        ctx.body = { code: 200, message: result}
    }).catch( error => {
        console.log( error)
        ctx.body = { code: 500, message: error}
    })
})

// 读取类别 *** 大类
router.get('/getCategoryList', async (ctx) => {
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = { code: 200, message: result}
    }catch(error){
        ctx.body = { code: 500, message: error}
    }
})

// 读取类别 *** 小类
router.post('/getCategorySubList', async (ctx) => {
    try{
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
        ctx.body = { code: 200, message: result}
    }catch(error){
        ctx.body = { code: 500, message: error}
    }
})

// 根据商品分类获取列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try{
        let categorySubId = ctx.request.body.categorySubId // 子类别ID
        let page = ctx.request.body.page // 当前页数
        let num = 10 // 每页显示数量
        let start = (page - 1)*num //开始数量

        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
        ctx.body = { code: 200, message: result}
    }catch(error){
        ctx.body = { code: 500, message: error}
    }
})

module.exports = router