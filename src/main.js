import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import store from './store/store'

//引入路由文件
import router from './router/index'

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
    router:router,
    store
}).$mount('#app')
