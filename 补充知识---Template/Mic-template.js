/**
 * Created by hama on 2017/2/22.
 */
//模板引擎的作用，其实就是将JS获取到的数据放到HTML中
//使用一种特殊的写法，例如<% %> 模板引擎解析这些特殊的定制标签，并将它正常解析
//模板引擎为什么这么重要？其实说白了，任何一个MVVM的框架最基本的功能其实就是模板引擎了
//关于模板引擎的历史我们先不去考究，先从一个最简单的模板引擎的例子入手


var TemplateEngine = function(tpl,data){
    //magic here
    //第一步，拿到数据后，要想办法将tpl里面的<% %>数据替换成data里面的数据
    var re = /<%([^%>]+)?%>/g;
    /*var match = re.exec(tpl);*/
    var code = 'var r=[];\n';
    //加入对于关键字的支持
    var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var cursor = 0;
    var add = function(line,js){
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    //使用while循环，得到所有的匹配项
    while(match = re.exec(tpl)){
        //console.log(match);
        //然后通过替换，将<% name %> 替换成data里面的数据 name
        /*tpl = tpl.replace(match[0],data[match[1]]);*/
        //为了能让<% %>去真正支持JS语法
        //那么<% %>这里面的东西都是字符串，怎么把它变成可执行的代码呢？
        //这里借助于new Function('arg','console.log(arg + 1)')来搞定
        //然后就变成了 字符串 + 函数 +　函数 + 字符串这种了
        //最后把他们放到一个数组里面，拼接一下结束.
        //目标: 收集模板不同的代码行，生成函数
        //console.log(tpl.slice(cursor,match.index))
        //将<p>Hello,my name is装到数组里面去
        //第二次将 I\'m 放到数组里面
        add(tpl.slice(cursor,match.index));
        //然后将this.name装到数组里面去
        //第二次将this.profile.name放到数组里面
        add(match[1],true);
        //直接从模板的下一个地方开始.
        cursor = match.index + match[0].length;
        //第二次遇到<% this.profile.name %>
    }
    //把最后的 years old.</p>加上去
    add(tpl.substr(cursor,tpl.length - cursor));
    code += 'return r.join("");';
    //console.log(code);
    //return tpl;
    //直接返回一个code字符串的函数
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
/*var template = "<p>Hello,my name is <% this.name %> I\'m <% this.profile.age %> years old.</p>";*/
var template = 'My skills:' + '<%for(var index in this.skills) {%>' + '<a href="#"><%this.skills[index]%></a>' + '<%}%>';
console.log(TemplateEngine(template,{
    name:"lizhiyuan",
    profile:{
        age:29
    }
}))