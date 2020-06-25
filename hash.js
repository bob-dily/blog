//导入bcrypt模块
const bcrypt = require('bcrypt');

async function run(){
    //生成随机字符串
    // genSalt方法接受一个数字作为参数
    // 数值越大，生成的随机字符串越复杂
    //默认值是10
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密
    const result = await bcrypt.hash('123456',salt);
    console.log(result);
}

run();
