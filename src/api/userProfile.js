import request from '../utils/request'

export default {
    updateAvatar(avatar){
        return request({
            url:"/center/user-profile/updateAvatar",
            method:"post",
            data:avatar
        })
    }
}
