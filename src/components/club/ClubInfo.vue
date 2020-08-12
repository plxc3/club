<template>
    <div class="main">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <el-container>
            <el-aside width="400px" class="aside">
                <el-image
                    src="https://plxc.oss-cn-chengdu.aliyuncs.com/2020/08/05/0f1ebf6383c44ef8b7bf77cacd1e7c20招新海报1.png"
                    style="height: 800px;"
                 >
                </el-image>
            </el-aside>
            <el-main>
               <div class="">
                   <el-col :span="12">
                       <div class="demo-basic--circle">
                           <div class="block"><el-avatar :size="80" :src="circleUrl"></el-avatar></div>
                       </div>
                   </el-col>
               </div>
                <div class="article">
                    <h1>{{club.clubName}}</h1>
                    <p v-html="club.description"></p>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "ClubInfo",
        components: {
        },
        data(){
            return {
                url:"http://localhost:9002/web/verify/img",
                flag:true,
                club:{
                    clubName:"漫研社社团",
                    description:   `<ol>
<li style="text-align: left;"><img src="http://shp.qpic.cn/ishow/2735032409/1585014368_84828260_11705_sProdImgNo_2.jpg/0" alt="npono" width="533" height="400" /></li>
<li style="text-align: left;">this is good</li>
</ol>`
                },
                circleUrl: "https://plxc.oss-cn-chengdu.aliyuncs.com/2020/08/05/d18d743262a240f9aab6c2529a192364图片1.png",
            }
        }
        ,
        methods: {
            goBack() {
                console.log('go back');
                this.$store.commit("headerShow")
                this.$router.push({path: "/clublist"})
            },
        }
    }
</script>

<style scoped>
    .el-aside {
        color: #333;
        text-align: center;
    }


    .el-main {
        background-color: #fff;
        color: #333;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .article p{

        text-indent: 30px;
        font-family: '宋体';
    }

    @media screen and (max-width: 600px) {
        .main {
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0px;
            margin: 0 auto;
        }
        .el-main{
            display: none;
        }
    }

    @media screen and (min-width: 1196px) {
        .main {
            width: 1024px;
            margin: 0 auto;
        }
    }

</style>
