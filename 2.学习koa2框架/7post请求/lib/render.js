//定义一个模块，这个模块主要的功能是读取文件里面的内容，并且将结果返回.
//引用一个模块用的是require关键字。
//定义一个模块，使用的是module.exports关键字
//这个模块要么是个数组、对象或者是函数
const fs = require('fs');
module.exports = function(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}