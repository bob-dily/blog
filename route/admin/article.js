//将文章集合的构造函数导入到当前文件中
const {Article} = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req,res)=>{
    //接收客户端传来的页码
    const page = req.query.page;
    //标识 当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //page方法指定当前页
    //size每页显示的条数
    //display客户端要显示的页码数量
    //exec向数据库中发送查询请求
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    // res.send(articles);
    
    res.render('admin/article.art',{
        articles:articles
    });
}