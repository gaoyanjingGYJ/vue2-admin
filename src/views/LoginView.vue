<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达物流后台管理系统</h2>
                </div>
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名：" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="password">
                            <el-input v-model.trim="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="btn" @click="login" :loading="loading">登录</el-button>
                            <!-- 登录按钮要做整体表单的校验 使用element-ui的validate函数 -->
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
// import axios from "axios"
// import service from "@/utils/service"
import { post } from '@/utils/http.js'
import { setToken } from '@/utils/auth.js'
import {mapMutations} from "vuex"
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { pattern: /^\w{4,8}$/, message: '用户名要求是4-8位数字字母组合', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { pattern: /^\d{6}$/, message: '密码要求是6位纯数字', trigger: 'blur' },
                ],
            },
            loading: false,
        }
    },
    methods: {
        ...mapMutations(['setRole']),
        /* 登录按钮做整体表单校验，validate()第一个参数是是否校验成功，第二个参数是未校验成功的字段
           点击登录按钮后，向后台发送请求，使用mock插件模拟数据生成接口
            封装axios：二次封装axios实例，封装get和post请求，响应拦截器判断请求是否成功若失败给出消息提示（包括请求成功、请求跑通了但请求参数有误、请求没跑通），将请求返回的token和昵称数据永久存储(想要永久存储只有本地存储和数据库存储两种办法)，请求拦截器除去登录请求外每次请求都需要加上token表明身份，点击登录按钮在请求结果返回之前不能重复点击。
         */
        login() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    
                    //做登录逻辑
                    /*   //一点也不封装axios
                    axios({method:"post",url:"http://localhost:8080/login",data:this.ruleForm})
                    .then((res)=>{console.log("res",res)}) */
                    /*   //只是将axios实例二次封装了一下，没有封装get和post方法 
                    service({method:"post",url:"/login",data:this.ruleForm})
                    .then((res)=>{console.log("res",res)}) */

                    //点击登录按钮之后，在请求返回结果之前都不能重复点击，直到请求结果返回。
                    this.loading = true
                    //注意这里的this.ruleForm对象的属性名，必须和后端的属性名要一致。
                    post('/login', this.ruleForm)
                        .then((res) => {
                            this.loading = false
                            setToken(res.token)
                            sessionStorage.setItem('nickname', res.nickname)
                            // console.log("role",res.role)
                            this.setRole(res.role)
                            this.$router.push('/')
                        })
                        .catch((err) => {
                            //在登录失败时也应该要设置禁用状态的切换。
                            this.loading = false
                            console.log(err)
                        })
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.box-card {
    width: 500px;
    margin-top: 200px;
    h2 {
        text-align: center;
    }
    .btn {
        width: 100%;
    }
}
</style>