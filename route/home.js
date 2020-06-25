//引用express框架
const express = require('express');
//创建博客展示页面路由
const home = express.Router();

//博客首页
home.get('/',require('./home/index'));

//博客文章详情页面
home.get('/article',require('./home/article'));

//创建评论功能路由
home.post('/comment',require('./home/comment'));

// //实现退出功能
// home.get('/logout',require('./admin/logout'));


//将路由对象作为模块成员导出
module.exports = home;