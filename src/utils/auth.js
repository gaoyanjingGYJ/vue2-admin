// 关于token操作 取token 存token 删数据
//存token
export function setToken(token){
    sessionStorage.setItem("token",token)
}
//取token
export function getToken(){
    return sessionStorage.getItem("token")
}
//删token 退出登录时存储的数据都可以全部删除了
export function removeToken(){
    sessionStorage.clear()
}
