const fs = require('fs')

// 数据提纯 
fs.readFile('./goods.json', 'utf-8', function (err, data){

    let newData = JSON.parse(data);
    let pushData = []
    let i = 0;
    newData.RECORDS.map(function (value, index){
        if( value.IMAGE1 != null){
            i++
            pushData(value.NAME)
        }
    })
    console.log(i);

    fs.writeFile('./newGoods.json', JSON.stringify(pushData), function (err){
        if(err)console.log('写入文件失败')
        else console.log('写入文件成功')
    })
})