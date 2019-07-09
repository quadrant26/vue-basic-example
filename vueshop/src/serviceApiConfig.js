const BASEURL = 'https://www.easy-mock.com/mock/5d1dcefabaa6bf73722f7ec9/vueshop/'
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL+ 'user/register' // 用户注册接口
}


module.exports = URL;
