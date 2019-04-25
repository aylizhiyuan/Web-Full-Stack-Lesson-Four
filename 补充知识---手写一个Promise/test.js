let Promise = require('./promise')
let p1 = new Promise(function(resolve,reject){
    //这个任务也可以是同步的
    //resolve(5);
    setTimeout(function(){
       let num = Math.random();//生成一个随机数
       if(num > .5){
           resolve('成功了');
       }else{
           reject('失败了');
       }
    },2000)
})
console.log(p1); //Promise是一个构造函数，那么调用new关键字，相当于将这个构造函数进行了实例化
//并且在下面调用了这个公共方法then来根据resove,reject执行后续的操作
p1.then(function(value){
    console.log(value);
},function(reason){
    console.log(reason);
})

//注意的一点是：这个then是不支持链式调用的，你可以选择多次调用then方法，但是，你没有办法进行链式操作
p1.then(function(value){
    console.log(value);
},function(reason){
    console.log(reason);
})