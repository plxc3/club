import request from "../utils/request"

export default {
    //查询前几条banner信息
    getListBanner(){
        return request({
            url:"/center/banner-list/getBanners",
            method:"get"
            }
        )
    }
}
