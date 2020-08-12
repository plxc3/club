/**
 * 图片验证码的api
 */

import request from "../utils/request"

export default {
    /**
     * 获取图片验证码
     */
    getImg(){
        return request({
            url:"/center/code/getImgCode",
            method:"get"
        })
    },
    /**
     * 验证码校验
     */
    checkImgCode(code){
        console.log("code"+code)
        return request({
            url:"/center/code/checkImgCode",
            method:"post",
            data:code
        })
    }
}
