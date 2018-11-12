/**
 * Created by hama on 2017/4/19.
 */
var express = require('express');
var app = express();
//引入数据库操作
var mongo = require('./model/db');
app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('index',{
        title:'首页'
    })
})
//注册的逻辑
app.get('/reg',function(req,res){
    //接收一下用户传递过来的信息
    var username = req.query.username;
    var password = req.query.password;
    var user = {
        username:username,
        password:password
    }
    mongo.open(function(err,db){
        if(err){
            console.log(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongo.close();
                console.log(err);
            }
            collection.insert(user,{safe:true},function(err){
                mongo.close();
                console.log(err);
            })
        })
    })
    //插入成功之后返回东西
    return res.status(200).json({message:'注册成功'}).end();
})
//查询用户名是否被占用
app.get('/checkUsername',function(req,res){
    //接收一下用户名
    var username = req.query.username;
    //看看用户名在数据库中是否被占用
    mongo.open(function(err,db){
        if(err){
            return console.log(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongo.close();
                return console.log(err);
            }
            collection.findOne({"username":username},function(err,doc){
                mongo.close();
                if(err){
                    return console.log(err);
                }
                //有这个用户名
                console.log(doc);
                if(doc){
                    return res.status(200).json({message:'用户名被占用'});
                }
                return res.status(200).json({message:''});
            })
        })
    })
})
app.listen(3000,function(){
    console.log('node is OK');
})