/**
 * Created by hama on 2017/4/20.
 */
//import命令接收一个大括号
//里面指定要从模块中导入的变量名
//变量名必须与被导入模块对外接口的名字相同
import {name,obj,callname}  from './1';
//整体加载
import * as module from './1';

//加载默认输出
/*import myClass from './1';*/

//加载常量
import * as constans from './const';
console.log(constans.A);
console.log(constans.B);
console.log(constans.C);










