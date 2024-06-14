//导航守卫 
//判断是否登录了，没登录：去登录页放行，去其他页面强制去登录页；已经登录：判断要去哪个页面，去登陆页不让去强制去主页，去其他页面放行
//通过是否有token来判断是否登录了
import router from "./index"
import { getToken } from "@/utils/auth"
import asyncRouterMap from "./asyncRouterMap"
import store from "@/store"

router.beforeEach(async(to, from, next) => {
    // console.log(to,from)
    const hasToken = getToken()
    if (hasToken) {
        //在有token的情况下，发送请求获取role，并将role存在vuex中，派发actions
       await store.dispatch("getRole")//该步是异步的，返回的是promise
        //已经登陆了，判断要去的是否是登录页
        if (to.path == "/login") {
            next("/")
        } else {
            if (to.name == null) {
                //筛选出角色所拥有的权限
                let a=asyncRouterMap.filter(item=>item.meta.auth.includes(store.state.role))
                for (let i = 0; i < a.length; i++) {
                    router.addRoute(a[i])
                }
                next({ ...to, replace: true })
            } else {
                next()
            }
        }
    } else {
        //没有登录的情况，如果要去登录页放行，去其他页面强制转到登录页
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }
})