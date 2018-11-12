/**
 * Created by hama on 2017/3/28.
 */

var promise = new Promise(function(resolve,reject){
    resolve('PROMISE VALUE');
})
promise.then(console.log);
console.log('MAIN PROGRAM');