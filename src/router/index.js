import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import { Message } from 'element-ui';
import cookie from 'js-cookie'

const routes=[
    {
        path:"",
        redirect:"/Main"
    },
    {
        path:"/Main",
        meta:{title:"Main"},
        component: resolve => require(['../components/main/Main'], resolve)
    },
    {
        //社团信息展示
        path:"/club-info",
        meta:{title:"ClubInfo"},
        component: resolve => require(['../components/club/ClubInfo'], resolve)
    },
    {
        //登录后的卡片选择界面
        path:"/manage-card/",
        meta:{title:"ManageCard"},
        component: resolve => require(['../components/Login/ManageCard'], resolve)
    },
    {
        //首页card
        path:"/card",
        meta:{title:"Card"},
        component: resolve => require(['../components/main/Card'], resolve)
    },
    {
        //登录页面
        path:"/loginpage",
        meta:{title:"Login"},
        component: resolve => require(['../components/Login/Login'], resolve)
    },
    {
        //注册页面
        path:"/register",
        meta:{title:"Register"},
        component: resolve => require(['../components/Login/Register'], resolve)
    },
    {
        //个人档案页面
        path:"/userprofile",
        meta:{title:"UserProfile"},
        component: resolve => require(['../components/user/UserProfile'], resolve)
    },
    {
        //社团列表页面
        path:"/clublist",
        meta:{title:"ClubList"},
        component: resolve => require(['../components/club/ClubList'], resolve)
    }
]

const router=new VueRouter({
    routes:routes
})

/**
 * 防止输入url跳转登录才能显示的界面调用全局导航守卫进行验证
 */
router.beforeEach((to, from, next) => {

    if ( to.path=='' ||  to.path=='/loginpage' || to.path=='/register'|| to.path=="/Main"||to.path=="/clublist") {
        next();
        console.log(next)
    } else {// 每次页面跳转执行，token或openId錯誤，均提示跳转到首页
        let token = cookie.get('token')
        console.log(token)
        if (token === null || token === '' || token === undefined) {
            Message({
                type:'error',
                message:"没有登录请登录"
            })
            setTimeout(function () {
                next('/loginpage');
            },1000)
        }else{
            next();
        }
    }
});
export default router
