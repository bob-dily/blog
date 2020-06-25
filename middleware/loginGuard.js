const {User} = require('../model/user');
const guard = async(req,res,next)=>{
    // 用户登录状态，放行,未登录则重定向
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        const email = req.session.email;
        let user = await User.findOne({email});
        // console.log(req.session.email);
        res.locals.userInfo = user;
        //已经登录的普通用户
        if(req.session.role == 'normal'){
            return res.redirect('/home/');
        }
        //用户是登录状态，放行
        next();
    }
}

module.exports = guard;