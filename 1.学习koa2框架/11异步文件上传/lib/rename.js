//作者：lzy,功能：改名
//定义一个模块，用来修改文件的名称
module.exports = function (files){
    let num = Math.floor(Math.random() * 100 + 1);
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let min = now.getMinutes();
    let second = now.getSeconds();
    let filename = num + '' + year + month + day + hour + min + second + '.' + files.name.split('.')[1];
    return filename;
}