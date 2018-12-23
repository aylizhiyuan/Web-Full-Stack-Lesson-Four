let MyPromise = require('./Promise');
let p1 = new MyPromise(function(resolve,reject){
    setTimeout(function(){
        let num = Math.random();
        if(num <5){
            resolve(num);
        }else{
            reject("失败");
        }
    })
})
//值的穿透 p1的then穿透到p2里面了
let p2 = p1.then();
p2.then(function(data){
    console.log(data);
},function(reason){
    console.log(reason);
})