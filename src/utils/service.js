//二次封装axios实例 请求拦截器 响应拦截器
import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth.js"
const service=axios.create({
    baseURL:"http://localhost:8080",
    timeout:5000
})

//请求拦截器  除去登录请求外每次请求都要加上token  有两个参数，第一个参数是发起请求前的处理函数，第二个参数是请求错误时的处理函数，和响应拦截器的请求错误时的处理是一样的
service.interceptors.request.use((config)=>{
    //判断是否是登录操作，如果不是则在请求头上加上token 直接取token如果有值则不是登录请求
    //加token可以在参数中，也可以在请求头中，具体的要和后端商量好，一般加在请求头中的多
    /*  1 加在请求参数中 属性名要和后端商量好
    config.data.token=getToken() */
    //2 加在请求头中
    if(getToken()){
        config.headers.token=getToken()
    }
    return config;//请求拦截器必须要返回config，否则不能继续往下进行
},()=>{
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})


//响应拦截器  判断请求是否成功
//有两个参数，第一个参数是请求成功时的处理函数，第二个我是请求失败根本没跑通时的处理函数
service.interceptors.response.use((res)=>{
    // console.log("响应拦截器",res.data)
    const result=res.data
    if(result.success){
        return result
    }else{
        //跑通了，但是请求参数错误，返回的是请求错误的提示信息 并且要抛出异常且在使用请求时catch 
        Message({
            type:"error",
            message:result.message || "请求错误"
            //以防万一，后端没有给出请求错误时的信息，我们自己加一个提示信息
        })
        return Promise.reject(new Error(result.message||"请求错误"))
        //将错误抛出去，这样在封装后的axios即service的catch中可以捕获到 然后在组件中使用catch()捕获一下错误。
    }
},()=>{
    //请求根本没跑通
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})

export default service