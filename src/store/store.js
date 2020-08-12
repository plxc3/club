import Vue from 'vue';
import Vuex from 'vuex';

import createVuexAlong from "vuex-along";

//使用插件
Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        headerNav:true,
        userId:"mor"
    },
    mutations:{
        headerShow(state){
            state.headerNav=true
        },
        headerHide(state){
            state.headerNav=false
        },
        getUserId(state,userId){
            state.userId=userId
        },
        deleteUserId(state){
            state.userId=''
        }
    },
    plugins: [
        createVuexAlong({
            name: "hello-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
            local: {
                list: ["ma"],
                isFilter: true // 过滤模块 ma 数据， 将其他的存入 localStorage
            },
            session: {
                list: ["count", "ma.a1"] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
            }
        })
    ]
})

export default store;
