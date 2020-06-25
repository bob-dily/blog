const {User} = require('../../model/user');
module.exports = async(req,res)=>{
    //标识 当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    //接收客户端传来的当前页码
    let page = req.query.page || 1;
    //每页显示的条数
    let pagesize = 2;
    //查询用户数据总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count/pagesize);

    //页码对应的开始位置
    let start = (page-1)*pagesize;
    
    //查询用户信息
    let users = await User.find({}).limit(pagesize).skip(start);
    //渲染用户列表模板
    res.render('admin/user',{
        users:users,
        page:page,
        total:total
    });
}