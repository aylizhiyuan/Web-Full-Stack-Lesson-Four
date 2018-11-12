/**
 * Created by hama on 2017/4/20.
 */
//暴露变量
 var name = 'lizhiyuan';
//暴露函数
function callname(){
    console.log(name);
}
//暴露对象
var obj = {};
//最后在文件的底部，将需要暴露的东西集中在一个对象上
export {name,callname,obj}

//默认输出的格式
//只能定义一次
/*export default class {}*/



