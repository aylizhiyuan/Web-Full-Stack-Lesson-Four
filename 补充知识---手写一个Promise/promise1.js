//实现链式调用的Promise
//构造函数的参数是一个异步任务
function Promise(task) {
    let that = this;//缓存this
    //默认状态为pending
    that.status = 'pending';
    //此变量里放着此promise的结果
    that.value = undefined;
    //存放的着所有成功的回调函数
    that.onResolvedCallbacks = [];
    //存放着所有的失败的回调函数
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成成功态

    function resolve(value) {
      //这个是为了解决你resolve的时候如果这个参数是一个Promise
      if(value instanceof Promise){
        return value.then(resolve,reject);
      }
      if (that.status == 'pending') {
        that.status = 'fulfilled';
        that.value = value;
        that.onResolvedCallbacks.forEach(item=>item(that.value));
      }
    }
  
    //调用此方法可以把当前的promise变成失败态
    function reject(reason) {
      //如果当前状态是初始态，则转成失败态
      if (that.status == 'pending') {
        that.status = 'rejected';
        that.value = reason;
        that.onRejectedCallbacks.forEach(item=>item(that.value));
      }
    }
  
    //立即执行传入的任务
    try {
      task(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  //这是在Promise2中处理不同的返回值的情况,x可以理解为要传递给它的一个东西
  //1.
  function resolvePromise(promise2,x,resolve,reject){
    let then;
    //如果x就是promise2
    if(promise2 === x){
      //直接调用promise2.reject方法
      return reject(new TypeError('循环引用'));
    }
    //在then中return一个promise的情况
    if(x instanceof Promise){
      //如果这个内部的Promise状态是pending的话，必须要等待这个promise状态变化后执行promise2
      if(x.status == 'pending'){
        x.then(function(y){
          //这里是担心resolve里面依然是一个promise，就继续调用
          resolvePromise(promise2,y,resolve,reject);
        },reject);
      }else if(x.status == 'fulfilled'){
        //如果内部promise成功了，调用resolve传递内部的value值
        //等待于在promise2中直接resolve
        resolve(x.value);
      }else if(x.status == 'rejected'){
        //如果内部的promise失败了，调用reject传递内部的value值
        //等于在promise2中直接reject
        reject(x.value);
      }
    }else if(x!=null && (typeof x == 'object' || typeof x == 'function')){
      try{
        then = x.then;
        if(typeof then == 'function'){
         then.call(x,function(y){
           resolvePromise(promise2,y,resolve,reject)
         },reject);
        }
      }catch(e){
        reject(e);
      };
    }else{
      //x是一个普通的值（number,string,boolean类型的值，直接resolve掉）
      resolve(x);
    }
  }
  //onFulfilled成功的回调，onReject失败的回调
  Promise.prototype.then = function (onFulfilled, onReject) {
    //如果then中的两个方法什么都没有写，代表什么都没做，那么我们就自己搞一个函数,这个函数的作用就是将传递过来的值返回
    //为了then的值得穿透
    onFulfilled = typeof onFulfilled == 'function'?onFulfilled:function(value){return value};
    onReject = typeof onReject=='function'?onReject:function(reason){
      throw reason;
    }
    let that = this;

    //这个是then返回的新的Promise
    let promise2;

    //同步任务成功的情况，直接执行
    if(that.status == 'fulfilled'){
      promise2 = new Promise(function(resolve,reject){
        let x = onFulfilled(that.value); //获取第一个then的返回值，并且执行了这个成功回调函数
        resolvePromise(promise2,x,resolve,reject);//解析Promise的过程
      });
    }
    //同步任务失败的情况，直接执行
    if(that.status == 'rejected'){
      promise2 = new Promise(function(resolve,reject){
        let x = onReject(that.value); //这句话只是为了获取第一个then的返回值，执行失败回调函数
        resolvePromise(promise2,x,resolve,reject);
      });
    }
    //异步任务的情况
    if(that.status == 'pending'){
      promise2 = new Promise(function(resolve,reject){
        //解释一下，这里不能直接将函数仍数组里面，而是要给它加上一些逻辑
        //所以，这里又封装了一个函数
        that.onResolvedCallbacks.push(function(){
          let x = onFulfilled(that.value); //这句话只是为了获取第一个then中的返回值，加入成功队列
          resolvePromise(promise2,x,resolve,reject);
        });
        that.onRejectedCallbacks.push(function(){
          let x = onReject(that.value);//得到第一个then里面的返回值而已，加入失败队列
          resolvePromise(promise2,x,resolve,reject);
        });
      });
    }
    return promise2;//返回这个promise2是为了让then支持链式调用
  }
  module.exports = Promise;