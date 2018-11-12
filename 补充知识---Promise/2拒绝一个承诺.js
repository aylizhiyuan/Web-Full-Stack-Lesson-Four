/**
 * Created by hama on 2017/3/28.
 */
var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject(new Error('rejected'));
    },3000)
})
function onReject(error){
    console.log(error.message);
}
promise.then(null,onReject);