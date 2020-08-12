<template>
<div class="ClubList">
    <el-input  placeholder="请输入内容" style="width: 800px" v-model="search"> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
    <el-row>
        <el-col :span="5" v-for="club in clubs" class="card" :key="club.title">
            <el-card :body-style="{ padding: '0px' }" >
                <img src="https://plxc.oss-cn-chengdu.aliyuncs.com/2020/08/05/d18d743262a240f9aab6c2529a192364图片1.png" class="image">
               <div class="description">
                  <h3>{{club.title}}</h3>
                   <p>{{club.description|snippet}}</p>
               </div>
                <el-button round size="mini" style="margin: 20px;float: left"  @click="getMore">详情</el-button>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        name: "ClubList",
        data() {
            return {
                clubList:[{
                    description:`漫研社- - -前身为漫研兴趣小组，于 2015 年在黄岭校区成立属
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
                                    漫研社交流群 2：827435268`,
                    title:"漫研社"
                },
                    {
                        description:`漫研社- - -前身为漫研兴趣小组，于 2015 年在黄岭校区成立属
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
                                    漫研社交流群 2：827435268`,
                        title:"足球社"
                    },
                    {
                        title:"科研社团",
                        description:"1"
                    }
                ],
                search:""
            };
        },
        //局部过滤器,内部为函数，使用时会返回value值
        filters:{
            snippet(value){
                return value.slice(0,88)+"..."
            }
        },
        methods:{
            getMore(){
                this.$store.commit("headerHide")
                this.$router.push({path:"/club-info"})

            },
        },
        computed:{
            clubs:function () {
                return this.clubList.filter((item)=>item.title.match(this.search))
            }
        },
    }
</script>

<style scoped>
    .card{
        width: 300px;
        margin: 20px 20px 0 20px;
        overflow: hidden;
    }
    .card img{
        height: 150px;
    }
    .card h3{
        text-align: left;
        text-indent: 20px;
    }
    .description p{
        margin: 0 auto;
        width: 280px;
        text-indent: 25px;
        text-align: center;
    }
    /*响应式布局*/
    @media screen and (max-width: 600px){
        .ClubList{
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0;
            margin: 78px auto;
        }
    }
    @media screen and (min-width: 1196px){
        .ClubList{
            width: 1024px;
            margin: 78px auto;
        }
    }
</style>
