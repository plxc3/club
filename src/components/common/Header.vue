<template>
<!--Header 导航栏-->
<div class="Nav">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             active-text-color="#000"
             background-color="#ffffff"
             text-color="#000"
    >
        <el-menu-item index="1" @click="goMain">首页</el-menu-item>
        <el-menu-item index="2" @click="goClubList">查看社团</el-menu-item>
        <el-menu-item index="3" @click="login" v-if="!loginInfo.id">登陆/注册</el-menu-item>
        <el-menu-item index="3" v-if="loginInfo.id" @click="goManageCard">个人页面</el-menu-item>
        <el-menu-item index="4" v-if="loginInfo.id" @click="loginOut">登出</el-menu-item>
        <div v-show="loginInfo" class="avatar" v-if="loginInfo.id">
            <el-avatar :src="loginInfo.avatar"></el-avatar>
        </div>
    </el-menu>
</div>
</template>

<script>
    import cookie from "js-cookie"
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1',
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
                    this.activeIndex='3'
                    this.$router.push({path:"/manage-card"})
                    console.log(this.loginInfo)
                }
            },
        /**
         * 登出
         */
        loginOut(){
            this.loginInfo={}
            cookie.set("token",'', {domain: 'localhost'})
            cookie.set("userId",'', {domain: 'localhost'})
            cookie.set("userLoginInfo",'', {domain: 'localhost'})
            this.$router.push({path:"/Main"})
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
            }
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
