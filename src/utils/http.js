//封装get post请求
import service from "./service";
export function get(url,params){
    const config={
        method:"get",
        url,
        //不一定所有的请求都有参数params
    }
    if(params){
        config.params=params
    }
    return service(config)
    //返回的是promise axios().then()
    //调用的时候直接get().then()
}
export function post(url,data){
    const config={
        method:"post",
        url,
    }
    if(data){
        config.data=data
    }
    return service(config)
}