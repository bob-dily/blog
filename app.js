//引用express框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块，用来处理post请求
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入art-tempalte模板引擎
const template = require('art-template');
//导入dateformat模块
const dateFormat = require('dateformat');
//导入morgan模块
const morgan = require('morgan');
//导入config模块
const config = require('config');


//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理Post请求参数
app.use(bodyParser.urlencoded({extended: false}));
//配置session
app.use(session({
    //是否每次请求都重新设置session cookie
    resave:false,
    //未登录时不保存cookie
    saveUninitialized:true,
    cookie:{
        maxAge:24*60*60*1000
    },
    secret:'secret key'
}));
// require('./model/user');

//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//默认模板后缀
app.set('view engine','art');
//当渲染.art模板时所使用的模板引擎
app.engine('art',require('express-art-template'));

//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));


//获取系统环境变量 返回值是对象
if(process.env.NODE_ENV == 'development'){
    //当前是开发环境
    console.log('当前是开发环境')
    //在开发环境中 将客户端发送到服务端的请求打印到控制台
    app.use(morgan('dev'))
}else{
    console.log('当前是生产环境')
    app.use(morgan('dev'))
}
// console.log(process.env.NODE_ENV)

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断登录状态
app.use('/admin',require('./middleware/loginGuard'));
//判断用户登录状态
app.use('/home',require('./middleware/homeGuard'));

//为路由匹配路径
app.use('/home',home);
app.use('/admin',admin);

app.use((err,req,res,next)=>{
    //将字符串对象转换为对象类型
    //JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' +result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('网站服务器启动成功！');