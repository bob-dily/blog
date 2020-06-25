//导入用户集合构造函数
const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
const login = async(req,res)=>{
    //接收请求参数
    const {email,password} = req.body;
    // if(email.trim().length == 0 || password.trim().length == 0){
    //     return res.status(400).send('<h4>邮件地址或密码错误</h4>');
    // }
    if(email.trim().length == 0 || password.trim().length == 0){
        return res.status(400).render('admin/error',{msg:'邮件地址或密码错误'});
    }
    //根据邮箱地址查询用户信息
    //查询到了用户 user变量的值为对象类型
    let user = await User.findOne({email});
    if(user){
        //将客户端传来的密码和用户信息中的密码进行比对
        //true比对成功
        let isValid = await bcrypt.compare(password,user.password);
        if(isValid){
            //登录成功
            //将用户名存储在请求对象中
            // req.session = user;
            req.session.username = user.username;
            req.session.role = user.role;
            req.session.email = user.email;
            // res.send('登录成功')
            // req.app.locals.userInfo = user;

            // res.locals.userInfo = user;
            //对用户角色判断
            if(user.role == 'admin'){
                //重定向到用户列表页面
                res.redirect('/admin/user');
            }else{
                res.redirect('/home/');
            }
            
        }else{
            res.status(400).render('admin/error',{msg:'邮箱或密码错误'});
        }
    }else{
        //没有查询到用户
        res.status(400).render('admin/error',{msg:'邮箱或密码错误'});
    }
}

module.exports = login;