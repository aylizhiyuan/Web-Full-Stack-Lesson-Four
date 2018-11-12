/**
 * Created by hama on 2017/3/29.
 */
function iterate (num) {
    console.log(num);
    return ++num;
};

function alwaysThrows () {
    throw new Error("OH NOES");
};

Promise.resolve(iterate(1))
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(alwaysThrows)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(null, console.log);
//只要报错，代码就停止运行.