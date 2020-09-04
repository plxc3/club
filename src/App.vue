<template>
  <div id="app" v-cloak>
   <Header></Header>
    <router-view class="main" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
  name: 'app',
  components: {
      Footer,
      Header
  }
}
</script>

<style>
    [v-cloak]{
        display: none;
    }
    #app{
        background-color: #eee;
    }
  .main {
    color: #333;
    text-align: center;
    margin: 70px auto;
    min-height: 550px;
  }
  @media screen and (max-width: 600px){
    .main{
      width: 95%;
      padding: 3px;
      position: relative;
      top: 0;
      bottom: 0;
    }
  }
  @media screen and (min-width: 1196px){
    .main{
      width: 1200px;
    }
  }
</style>
