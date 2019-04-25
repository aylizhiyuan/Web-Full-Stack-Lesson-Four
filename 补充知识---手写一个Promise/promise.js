function Promise(task){
    //先将this保存一下
    let that = this;
    that.status = 'pending'; //默认状态为pending状态
    that.value = undefined; //此变量里面放着promise的结果
    //存放着所有成功的回调
    that.onResolveCallbacks = [];
    //存放所有失败的回调函数
    that.onRejectedCallbacks = [];
    function resolve(value){
        if(that.status == 'pending'){
            that.status = 'fulfilled';
            that.value = value;
            that.onRejectedCallbacks.forEach(item=>item(that.value));
        } 
    }
    function reject(reason){
        //如果当前的状态是初始状态，则转化为失败的状态
        if(that.status == 'pending'){
            that.status = 'rejected';
            that.value = reason;
            that.onRejectedCallbacks.forEach(item=>item(that.value)); 
        } 
    }
    //如果在Promise执行过程中有了异常的代码，我们希望可以捕获这个异常
    //并且调用reject
    try {
        //task是我们的异步任务
        task(resolve,reject);
    }catch(e){
        reject(e);
    }
}
//成功的回调以及失败的回调
//then里面的函数必须要等待resolve,reject状态发生
Promise.prototype.then = function(onFullfiled,onReject){
    let that = this;
    //判断状态变化，主要是为了兼容如果任务不是异步的，是同步的，而状态就会首先发生变化，这时候就需要立即执行then里面的函数了
    if(that.status == 'fulfilled'){
        onFullfiled(that.value);
    }
    //而这个也是为了兼容，如果任务是同步代码的话，则立即让这个then函数执行
    if(that.status == 'rejected'){
        onReject(that.value);
    }
    //如果是异步任务的话，则会先将异步的任务保存在数组里面，这样的话，异步任务结束后，会调用resolve方法
    if(that.status == 'pending'){
        that.onResolveCallbacks.push(onFullfiled);
        that.onRejectedCallbacks.push(onReject);
    }
}
module.exports = Promise
//实现了一个最简单的promise,不支持链式调用，不支持其他的方法，只是简单的
//实现reject,resolve,then方法