//我们来模拟一个requrie方法
let fs = require('fs');

//commonJS
function req(moduleName){
    //content就是我们的文件内容
    let content = fs.readFileSync(moduleName,'utf-8');
    //最后一个参数是函数的内容体
    let fn = new Function('exports','module','require','__dirname','__filename',content + '\n return module.exports');
    let module = {
        exports:{}
    }
    return fn(module.exports,module,req,__dirname,__filename);
}
//let str = require('./a.js');
let str = req('./a.js');
console.log(str);

//等于在这里定义了一个函数
/*function(exports,module,require,__dirname,__filename){
    module.exports = 'hello world';
    return module.exports
}*/




