const BASEURL = 'https://www.easy-mock.com/mock/5d1dcefabaa6bf73722f7ec9/vueshop/'
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL+ 'user/register', // 用户注册接口
    login: LOCALURL+ 'user/login', // 用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
    getCategoryList: LOCALURL+'goods/getCategoryList', // 获取商品类别
    getCategorySubList: LOCALURL+'goods/getCategorySubList', // 获取商品子类别
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', // 得到响应商品信息
}


module.exports = URL;
