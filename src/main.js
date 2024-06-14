import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  "./common/reset.css"
import "./common/rule.css"
import "./mock/mock.js"
import "@/router/guard"
import ElementUI from "element-ui";//1 引入element-ui框架
import 'element-ui/lib/theme-chalk/index.css';//2 引入样式文件
Vue.use(ElementUI);//3 注册
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
