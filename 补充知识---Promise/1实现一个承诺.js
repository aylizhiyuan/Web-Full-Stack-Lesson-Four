/**
 * Created by hama on 2017/3/28.
 */
//创建一个承诺
// 承诺中有两个状态，一个是履行承诺，一个是拒绝履行承诺
var promise = new Promise(function(resolve,reject){
    //三秒后履行承诺
    setTimeout(function(){
        resolve('yes');
    },3000)
})
//然后通过then方法来调用承诺,承诺的参数会在此时在内部传递，在then方法中
//接收到该承诺的东西.
promise.then(console.log);