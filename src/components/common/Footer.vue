<template>
    <div class="footer-wrap">
        <div class="footer">
            <p class="introduce">plxc的社团管理系统</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

    .footer-wrap {
        background-color:#ffffff ;
        position: fixed;
        left: 0;
        right: 0;
        bottom:0;
        height: 70px;
    }

    .footer-wrap .footer {
        width: 1024px;
        margin: 0 auto;
        height: 70px;
    }
    .introduce{
        margin: 10px;
    }
    .footer-wrap .footer p{
        line-height: 16px;
    }

    @media screen and (max-width: 600px){
        .footer-wrap {
            padding: 2px 15px;
        }
    }
</style>
