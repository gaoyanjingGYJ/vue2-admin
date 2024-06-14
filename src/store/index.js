import Vue from 'vue'
import Vuex from 'vuex'
import {get} from "@/utils/http"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {//共享的数据
        row: {},//初始值为空对象
        isFromDetail:false,
        thisValue:"",
        role:""
    },
    mutations: { //定义一些修改state中数据的方法 想要修改state中的数据只能通过提交mutations
        setRow(state,payload){
            state.row=payload
        },
        clearRow(state){
            state.row={}
        },
        changeIsFromDetail(state,payload){
            state.isFromDetail=payload
        },
        changeThisValue(state,payload){
            state.thisValue=payload
        },
        setRole(state,payload){
            state.role=payload
        }
    },
    actions: {
        async getRole({commit}){
            let {role}=await get("/getRole")
            commit("setRole",role)
        }
    },
    /* getters: {
      //类似计算属性
    },
    
    modules: {
    }*/

})
