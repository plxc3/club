<template>
  <div class="main">
      <!--走马灯-->
      <Carousel></Carousel>
      <!--分割线-->
      <div class="title" @click="moreCard">社团风采>></div>
      <el-divider class="line"></el-divider>
    <!--Card-->
     <div class="card-view">
         <Card></Card>
     </div>
      <!--分割线-->
      <div class="title">社团更多>></div>
      <el-divider class="line"></el-divider>
      <div class="card-view">
          <Card></Card>
      </div>
  </div>
</template>

<script>
    import Carousel from "./Carousel"
    import Card from "./Card"
    export default {
        name: "Main",
        components:{
            Carousel,
            Card
        },
        data() {
            return {
                currentDate: new Date()
            };
        },
        methods:{
            moreCard(){
                this.$router.push({path:"/card"})
            }

        }
    }
</script>

<style scoped>
    .main{
        overflow: hidden;
        background-color: #fff;
    }
    .title{
        float:left;
        font-family: '微软雅黑';
        font-weight: 900;
        margin-top: 10px;
    }
    .title {
        text-decoration: none;
        color: #1e90ff;
        cursor: pointer;
    }
    .line{
        margin-top: 40px;
        height: 2px;
    }

    .card-view{
        left: 0;
        right: 0;
        height: 250px;
        overflow: hidden;
    }
    /*响应式布局*/
    @media screen and (max-width: 600px){
        .main{
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0;
            margin: 0px auto;
        }
    }
    @media screen and (min-width: 1196px){
        .main{
            width: 1024px;
            margin-top: 78px;
        }
    }
</style>
