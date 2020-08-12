

import request from "../utils/request"

export default {
    //用户登录
    loginSubmit(user){
        return request({
            url:"/center/user/login",
            method:"post",
            data:user
        })
    },
    //根据token获取用户信息
    userLoginInfo(){
        return request(
            {
                url:"/center/user/auth/getUserInfo/",
                method: "get",
            }
        )
    },
    //获取短信验证码
    getcodeByMsm(phone){
        return request({
            url:"/oss/msm/send/"+phone,
            method:"get"
        })
    },
    //根据邮件获取验证码
    getcodeByEmail(emial){
        return request({
            url:"/oss/msm/sendEmail/"+emial,
            method:"get"
        })
    },
    //用户注册
    register(user){
        return request({
            url:"/center/user/register",
            method:"post",
            data:user
        })
    },
    //用户注销
    loginOut(){
        return request({
            url:"/center/user/loginout",
            method:"get"
        })
    }

}
