<template>
    <el-row class="cardList">
        <el-col :span="5"  v-for="(o, index) in 56" :key="o" :offset="index > 0 ? 0 : 0" class="card" >
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="demo-image__preview">
                    <el-image
                            src="http://shp.qpic.cn/ishow/2735032409/1585014368_84828260_11705_sProdImgNo_2.jpg/0"
                            >
                    </el-image>
                </div>
                <div style="padding: 0px;">
                    <span>好吃的汉堡</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Card",
        data(){
            return{
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .card{
        width: 300px;
        margin: 0 20px 0 20px;
    }

    /*响应式布局*/
    @media screen and (max-width: 600px){
        .cardList{
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0;
            margin: 0px auto;
        }
    }
    @media screen and (min-width: 1196px){
        .cardList{
            width: 1024px;
            margin: 0px auto;
        }
    }

</style>
