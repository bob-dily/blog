const {User} = require('../model/user');
const homeguard = async(req,res,next)=>{
    // 用户登录状态，放行,未登录则重定向
    if(req.session.username){
        const email = req.session.email;
        let user = await User.findOne({email});
        res.locals.userInfo = user;
        next();
    }
}

module.exports = homeguard;