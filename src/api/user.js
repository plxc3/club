import request from "../utils/request"

export default {
    loginSubmit(user){
        return request({
            url:"/msm/user/login/",
            method:"post",
            data:user
        })
    },
    //根据token获取用户信息
    userLoginInfo(){
        return request(
            {
                url:"/msm/user/auth/getUserInfo/",
                method: "get"
            }
        )
    }
}
