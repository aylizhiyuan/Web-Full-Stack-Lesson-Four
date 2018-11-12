/**
 * Created by hama on 2017/3/29.
 */
//ES5中规范了一些快捷方式，使创建和使用承诺更快更容易
//第一个是.catch

//如果只是简单的想处理错误的
promise.then(null,function(err){
    console.log('there is an error')
})
//你可以简单的这么处理:
promise.catch(function(err){
    console.log('there is an error')
})

//第二和第三个是promise.reslove,promise.reject
var promise = new Promise(function(resolve,reject){
    resolve('scret value');
})
var promise = Promise.resolve('secret value');

var promise = new Promise(function(resolve,reject){
    reject(new Error('secret value'));
})
var promise = Promise.reject(new Error('secret value'));


//示例代码
var message;
var promise;

function randomBytes(n) {
    return (Math.random() * Math.pow(256, n) | 0).toString(16);
}

message =
    'A fatal exception ' + randomBytes(1) + ' has occurred at ' +
    randomBytes(2) + ':' + randomBytes(4) + '. Your system\nwill be ' +
    'terminated in 3 seconds.';

promise = Promise.reject(new Error(message));

promise.catch(function (err) {
    var i = 3;

    process.stderr.write(err.message);

    setTimeout(function boom() {
        process.stderr.write('\rwill be terminated in ' + (--i) + ' seconds.');
        if (!i) {
            process.stderr.write('\n..... . . . boom . . . .....\n');
        } else {
            setTimeout(boom, 1000);
        }
    }, 1000);
});