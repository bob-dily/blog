//创建用户集合
//引入moongoose模块
const mongoose = require('mongoose');
//导入bcrypt模块
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    // 0启用，1禁用
    state:{
        type:Number,
        default:0
    }

});

//创建用户集合
const User = mongoose.model('User',userSchema);

async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456',salt);
    const user = await User.create({
        username:'zhengyang',
        email:'12345@qq.com',
        password: pass,
        role:'admin',
        state:0
    });

}

//验证用户信息
const validateUser = user=>{
        //定义对象验证规则
        const schema = {
            username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
            email:Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
            password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不正确')),
            role:Joi.string().valid('normal','admin').required().error(new Error('角色类型非法')),
            state:Joi.number().valid(0,1).required().error(new Error('状态值放非法'))
        };
        //实施验证
        return  Joi.validate(user,schema);
};

//将用户集合作为模块成员导出
module.exports = {
    // 效果等同于User:User
    User,
    validateUser
}