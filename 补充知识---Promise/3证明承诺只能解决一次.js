/**
 * Created by hama on 2017/3/28.
 */
var promise = new Promise(function(resolve,reject){
    resolve('i fired');
    reject(new Error('i did not fire'));
})
function OnReject(error){
    console.log(error.message);
}
promise.then(console.log,onReject);