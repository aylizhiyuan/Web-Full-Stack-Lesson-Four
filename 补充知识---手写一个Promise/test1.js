//Promise的链式调用
let Promise = require('./promise1');
let p1 = new Promise(function(resolve,reject){
  //resolve(100); //同步的情况
  setTimeout(function(){
    resolve(100);//异步的情况
  },1000);
});


//首先如果then里面什么都不传，那么必须让值有能力穿透到下一个Promise中去
/*let p2 = p1.then();
//相当于
//let p2 = p1.then(function(value){return value});
p2.then(function(value){
  console.log(value);//这里面的这个value值应该是从P1里面穿透过来的值
})*/






//这里考虑的是then里面返回一个Promise，then就可以进行链式调用了，then里面的这个promise需要通过返回结果再次调用
//then方法来实现。
let p2 = p1.then(function(data){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(data+100);
        },1000);
      }));
    },1000);
  });
});
p2.then(function(data){
  console.log('p2成功',data);
},function(err){
  console.log('p2失败',err);
});
/**
 * 1.自己真正实现一个 PromiseA 并通过 所有的单元测试
 * 2.自己添加all race reject resolve
 *
 **/
