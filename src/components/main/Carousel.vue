<template>
<div class="Carousel">
    <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
            <a href="https://element.eleme.cn/#/zh-CN/component/carousel"><img :src="item.imageUrl" alt=""></a>
        </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
    import bannerApi from "../../api/banner"
    export default {
        name: "Carousel",
        data(){
            return{
                bannerList:[]
            }
        },
        methods:{
            getBannerList(){
                bannerApi.getListBanner()
                    .then(res=>{
                        console.log(res)
                        this.bannerList=res.data.bannerList
                    })
            }
        },
        created(){
            this.getBannerList()
        }
    }
</script>
<style scoped>

</style>
