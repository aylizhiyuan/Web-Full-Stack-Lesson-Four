1. q

Q是一个在Javascript中实现promise的模块

1.1 q的基本用法

var Q = require('q');
var fs = require('fs');
function read(filename) {
    var deferred = Q.defer();
    fs.readFile(filename,'utf8', function (err, data) {
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

read('1.txt1').then(function(data){
    console.log(data);
},function(error){
    console.error(error);
});

1.2 q的简单实现

module.exports = {
    defer(){
        var _success,_error;
        return {
            resolve(data){
                _success(data);
            },
            reject(err){
                _error(err);
            },
            promise:{
                then(success,error){
                    _success = success;
                    _error = error;
                }
            }
        }
    }
}

1.3 q的实现

var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (var i = 0, ii = pending.length; i < ii; i++) {
                    var callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        },
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value);
                }
            }
        }
    };
};

2. bluebird

实现 promise 标准的库是功能最全，速度最快的一个库

2.1 bluebird经典使用

var Promise = require('./bluebird');

var readFile = Promise.promisify(require("fs").readFile);
readFile("1.txt", "utf8").then(function(contents) {
    console.log(contents);
})

var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("1.txt", "utf8").then(function (contents) {
    console.log(contents);
})

2.2 bluebird简单实现

module.exports = {
    promisify(fn){
        return function () {
            var args = Array.from(arguments);
            return new Promise(function (resolve, reject) {
                fn.apply(null, args.concat(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arguments[1])
                    }
                }));
            })
        }
    },
    promisifyAll(obj){
        for(var attr in obj){
            if(obj.hasOwnProperty(attr) && typeof obj[attr] =='function'){
                obj[attr+'Async'] = this.promisify(obj[attr]);
            }
        }
        return obj;
    }
}

3. 动画

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>move</title>
    <style>
        .square{
            width:40px;
            height:40px;
            border-radius: 50%;
        }
        .square1{
            background-color: red;
        }
        .square2{
            background-color: yellow;
        }
        .square3{
            background-color: blue;
        }
    </style>
</head>
<body>
<div class="square square1" style="margin-left: 0"></div>
<div class="square square2" style="margin-left: 0"></div>
<div class="square square3" style="margin-left: 0"></div>
</body>
<script>
  var square1 = document.querySelector('.square1');
  var square2 = document.querySelector('.square2');
  var square3 = document.querySelector('.square3');

  /*function move(element,target,resolve){
    let timer = setInterval(function(){
      var marginLeft = parseInt(element.style.marginLeft, 10);
      if(marginLeft == target){
        resolve();
      }else{
        element.style.marginLeft = ++marginLeft+'px';
      }
    },13);
  }*/
  function move(element,target,resolve){
    let current = 0;
    let timer = setInterval(function(){
      element.style.transform=`translateX(${++current}px)`;
      if(current>target){
        clearInterval(timer);
        resolve();
      };
    },13);
  }
  function animate(element,target){
    return new Promise(function(resolve,reject){
      move(element,target,resolve);
    });
  }
  animate(square1,100)
    .then(function(){
      return animate(square2,100);
    })
    .then(function(){
      return animate(square3,100);
    });
</script>
</html>

4. co

4.1 co初体验

let fs = require('fs');
function getNumber(){
  return new Promise(function (resolve,reject) {
    setTimeout(function(){
      let number = Math.random();
      if(number >.5){
        resolve(number);
      }else{
        reject('数字太小');
      }
    },1000);
  });
}
function *read(){
  let a = yield getNumber();
  console.log(a);
  let b = yield 'b';
  console.log(b);
  let c = yield getNumber();
  console.log(c);
}

function co(gen){
  return new Promise(function(resolve,reject){
    let g = gen();
    function next(lastValue){
      let {done,value} = g.next(lastValue);
      if(done){
         resolve(lastValue);
      }else{
        if(value instanceof Promise){
          value.then(next,function(val){
            reject(val);
          });
        }else{
          next(value);
        }
      }
    }
    next();
  });
}
co(read).then(function(data){
  console.log(data);
},function(reason){
  console.log(reason);
});

4.2 co连续读文件

let fs = require('fs');
function readFile(filename){
  return new Promise(function (resolve,reject) {
    fs.readFile(filename,'utf8',function(err,data){
      if(err)
        reject(err);
      else
        resolve(data);
    })
  });
}
function *read(){
  let a = yield readFile('./1.txt');
  console.log(a);
  let b = yield readFile('./2.txt');
  console.log(b);
}

function co(gen){
  let g = gen();
  function next(val){
    let {done,value} = g.next(val);
    if(!done){
      value.then(next);
    }
  }
  next();
}


5. Promise/A+完整实现

function Promise(executor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () { // 异步执行所有的回调函数
      if (self.status == 'pending') {
        self.value = value;
        self.status = 'resolved';
        self.onResolvedCallbacks.forEach(item => item(value));
      }
    });

  }

  function reject(value) {
    setTimeout(function () {
      if (self.status == 'pending') {
        self.value = value;
        self.status = 'rejected';
        self.onRejectedCallbacks.forEach(item => item(value));
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let then, called;

  if (x != null && ((typeof x == 'object' || typeof x == 'function'))) {
    try {
      then = x.then;
      if (typeof then == 'function') {
        then.call(x, function (y) {
          if (called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, function (r) {
          if (called)return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called)return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (value) {
    return value
  };
  onRejected = typeof onRejected == 'function' ? onRejected : function (value) {
    throw value
  };
  let promise2;
  if (self.status == 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

    });
  }
  if (self.status == 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  if (self.status == 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function (value) {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(function (value) {
        try {
          let x = onRejected(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  return promise2;
}
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        result[i] = data;
        if (++count == promises.length) {
          resolve(result);
        }
      }, function (err) {
        reject(err);
      });
    }
  });
}

Promise.deferred = Promise.defer = function () {
  var defer = {};
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  })
  return defer;
}
/**
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */
try {
  module.exports = Promise
} catch (e) {
}