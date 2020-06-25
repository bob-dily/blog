//引入joi模块
const Joi = require('joi');

//定义对象验证规则
const schema = {
    username:Joi.string().min(2).max(10).required().error(new Error('username属性没有通过验证')),
    birth:Joi.number().min(1900).max(2020).error(new Error('birth属性验证未通过'))
};

//验证
async function run(){
    try{
        await Joi.validate({username:'ac',birth:2020},schema);
    }catch(ex){
        console.log(ex.message);
        return; 
    }
    console.log('验证通过');
}
run();