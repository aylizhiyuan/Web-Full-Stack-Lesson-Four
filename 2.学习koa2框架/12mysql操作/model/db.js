const mysql = require('mysql');
const pool = mysql.createPool({
    host:'localhost',//数据库主机地址
    port:3306,//端口号
    user:'root',//用户名
    password:'lizhiyuan', //密码
    database:'student'//数据库名称
})
module.exports = function(sql){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,collection){
            if(err){
               reject(err);
            }else{
                collection.query(sql,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
            }
        })
    })
}
