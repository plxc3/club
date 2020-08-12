<template>
 <div class="main">
     <el-carousel :interval="10000" type="card" height="600px" :autoplay="false">
         <el-carousel-item v-for="item in cardlist" :key="item.title" >
             <div class="main">
                 <div class="card">
                     <div class="sliderText" v-rainbow>
                         <h1>{{item.title}}</h1>
                     </div>
                     <div class="content">
                         <p>
                             Contentfbhjsdjkfhdsjhfjdshfjhsdjfhs
                             djfhjdshjfhdsjhfkjdshfjshjfhdsjfhjdshf
                             jdshfjshfkshdfjkhsdjkfhsdjkhf
                         </p>

                         <!--TODO-->
                         <el-button plain class="plainButton" @click="goNext(item.id)">点击进入</el-button>

                     </div>
                 </div>
             </div>
         </el-carousel-item>
     </el-carousel>
 </div>
</template>

<script>
    import cookie from 'js-cookie'
    export default {
        name: 'swiper-example-3d-cube',
        data(){
            return{
                cardlist:[
                    {
                        id:'1',
                        title:"普通用户界面",
                        description:""
                    },
                    {
                        id:"2",
                        title:"社团管理界面",
                        description:""
                    },
                    {
                        id:'3',
                        title:"个人档案",
                        description:""
                    },
                ],
                userId:''
            }
        },
        //局部鈎子函數,v-"",内部已对象形式存在
        directives:{
            'rainbow':{
                bind(el){
                    el.style.background="#"+Math.random().toString(16).slice(2,8);
                }
            },
        },
        methods:{
            goNext(id){
               if(id==='1'){
                   this.$store.commit("headerHide")
                   this.$router.push({path:"/pagerperson"})
               }
                if(id==='3'){
                    this.$router.push({path:"/userprofile"})
                }
            }
        },
        created(){
            if(cookie.get("userId")){
                this.userId=cookie.get("userId")
            }
        }
    }
</script>

<style scoped>
    body{
        margin:0;
        padding: 0;
        font-family: sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #383838;
    }
    .card{
        position: relative;
        background-color: #fff;
        height: 500px;
        width: 400px;
        margin: 0 auto;
    }
    .card .content{
        width: 400px;
        padding: 30px;
        box-sizing: border-box;
    }
    .card .content .plainButton{

        margin: 10px 0 0;
        padding: 10px 20px;
        font-weight: 600;
    }
    .card .sliderText{
        position: relative;
        width:100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
    }
    .card .sliderText h1{
        color: white;
        font-weight: 600;
    }
    /**/

    /**/

    @media screen and (max-width: 600px){

    }
    @media screen and (min-width: 1196px){
        .main{
            margin-top: 20px;
        }

    }


</style>
