<template>
<!--Header 导航栏-->
<div class="Nav" v-show="$store.state.headerNav">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             active-text-color="#000"
             background-color="#ffffff"
             text-color="#000"
    >
        <el-menu-item index="1" @click="goMain">首页</el-menu-item>
        <el-menu-item index="2" @click="goClubList">查看社团</el-menu-item>
        <el-menu-item index="3" @click="login" v-if="!loginInfo.userId">登陆/注册</el-menu-item>
        <el-menu-item index="3" v-if="loginInfo.userId" @click="goManageCard">个人页面</el-menu-item>
        <el-menu-item index="4" v-if="loginInfo.userId" @click="loginOut">登出</el-menu-item>
        <div v-show="loginInfo" class="avatar" v-if="loginInfo.userId">
            <el-upload
                    class="avatar-uploader"
                    action="http://121.89.177.244:8888/oss/fileoss/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <!--通过img标签进行回显示-->
                <el-avatar :src="loginInfo.avatar"></el-avatar>
                <!--<img :src="course" alt="">-->
            </el-upload>
        </div>
    </el-menu>
</div>
</template>

<script>
    import cookie from "js-cookie"
    import userProfileApi from '../../api/userProfile'
    import userApi from '../../api/user'
    export default {
        name: "Header",
        data() {
            return {
                activeIndex:'1',
                loginInfo:{

                }
            };
        },
        methods: {
            login(){
                this.$router.push({path:'/loginpage'})
            },
            goMain(){
                this.$router.push({path:'/Main'})
            },
            /**
             * 获取登陆信息
             */
            getLoginInfo(){
                if(cookie.get("userLoginInfo")){
                    let str=cookie.get("userLoginInfo")
                    //把字符串转换成json对象
                    this.loginInfo=JSON.parse(str)
                    console.log(this.loginInfo)
                }
            },
        /**
         * 登出
         */
        loginOut(){
            userApi.loginOut()
                .then(res=>{
                    this.loginInfo={}
                    cookie.set("token",'', )
                    cookie.set("userId",'', )
                    cookie.set("userLoginInfo",'')
                    this.$store.dispatch("deleteUserId")
                    this.$router.push({path:"/Main"})
                    this.$message(res.msg)
                })
        },
            /**
             *
             */
            goManageCard(){
                this.$router.push({path:"/manage-card"})
            },
            /**
             * 社团展示页面跳转
             */
            goClubList(){
                this.$router.push({path:"/clublist"})
            },

            /**
             * 图片移除
             * */
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /**
             * 上传成功后的回调函数
             */
            handleAvatarSuccess(res){
                console.log(res)
                this.loginInfo.avatar=res.data.url
                userProfileApi.updateAvatar(this.loginInfo)
                    .then(()=>{
                        this.$message({
                            type:"success",
                            message:"修改成功"
                        })
                        cookie.set("userLoginInfo",this.loginInfo)
                    })
            },
        },
        created(){
            this.getLoginInfo()
        }

    }
</script>

<style scoped>
    .Nav{
        left: 0;
        right: 0;
        top:0;
    }
    .el-menu-demo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar{
       margin-left: 100px;
    }
</style>
