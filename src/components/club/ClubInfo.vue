<template>
    <div class="main">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <el-container>
            <el-aside width="600px" class="aside">
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
                    <p>{{club.description}}</p>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "ClubInfo",
        data(){
            return {
                club:{
                    clubName:"漫研社社团",
                    description:   `漫研社- - -前身为漫研兴趣小组，于 2015 年在黄岭校区成立属
                                    于文化艺术类社团。我社在这三年间发展迅速，成立以来多次受邀参
                                    加校内活动，并于 2016 年在全校社团文化节中勇夺风采社团第一；
                                    2017 年正式成为外语协会旗下的二级社团，业务指导部门及指导老
                                    师为外语学院--黄浩老师。社团成员广泛分布于汇东校区、宜宾校区，
                                    共计 500 余人（2018 年新学期开学招新人数）。
                                    漫研社团宗旨是希望为喜欢 ACG 文化（Animation、Comic、
                                    Game 的缩写，是动画、漫画、游戏的总称）的同学们建立一个交
                                    流分享的平台，并通过社员的创造力想象力营造独特的、具有川轻化
                                    学子风采的 ACG 文化氛围，以丰富同学们的大学生活。社团以理事
                                    会为领导，分设 7 个职能部门，分别是后勤部、宣传部、财务部、外
                                    联部、文娱部、期刊部、策划部；各部门相互协作，完成了一次次的
                                    精彩的活动。
                                    漫研社是一个具有极强的包容性和多元性的社团，十分期待
                                    并热烈欢迎各位加入～
                                    漫研社交流群 1：827435268
                                    漫研社交流群 2：827435268`
                },
                circleUrl: "https://plxc.oss-cn-chengdu.aliyuncs.com/2020/08/05/d18d743262a240f9aab6c2529a192364图片1.png",
            }
        }
        ,
        methods: {
            goBack() {
                console.log('go back');
                this.$router.push({path: "/clublist"})
            }
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
        width: 320px;
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
