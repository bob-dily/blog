const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req,res,next)=>{
    //接收客户端发送的请求参数
    const {username,email,role,state,password} = req.body;
    //要修改的用户ID
    const id = req.query.id;

    let user = await User.findOne({_id:id});
    
    const isValid = await bcrypt.compare(password,user.password);
    //密码比对成功
    if(isValid){
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        });
        //重定向页面到用户列表
        res.redirect('/admin/user');
    }else{
        let obj = {path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息修改',id:id};
        next(JSON.stringify(obj));
    }
}