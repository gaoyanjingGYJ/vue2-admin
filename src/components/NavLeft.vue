<template>
    <div>
        <h1 class="title">邦达货运管理系统</h1>
        <el-menu :router="true" background-color="#001529" text-color="#fff" :unique-opened="true">
            <!-- 如果里面还有子菜单项使用el-submenu，如果没有子菜单项了就是用el-menu-item -->
            <!-- 难点：动态渲染菜单项 需要确定要使用的是submenu还是menu-item，使用v-if和v-else如果还有children项则用submenu否则用menu-item，在该层的submenu中下一层是哦也能够submenu还是menu-item也是同样的判断，这样逐层嵌套下去，这样的作法类似于递归，因此可以使用递归的思想来解决这个问题-->
            <!-- 再新建一个组件文件MenusVue.vue，在新建的文件中使用递归的思想实现一个菜单项的逐层嵌套，然后再对每一个菜单项都使用这种方法来实现 注意：递归组件实现的是一个菜单项的逐层嵌套，确定了要使用submenu还是menu-item，并且要使用几次 -->
            <!-- 这里要需要使用v-for循环即使因为上面说的递归实现的是一个菜单项，需要对所有这里是7个菜单项都做同样的操作 -->
            <!-- 由于新建的组件MenusVue.vue需要使用该组件的menuData数据，需要将数据传递过去，属于父-子传值，使用props-->
            <menus-vue v-for="(item,index) in menuData" :key="index" :menu="item"></menus-vue>

        </el-menu>
    </div>
</template>

<script>
import {get} from "@/utils/http"
import MenusVue from "./MenusVue.vue"
export default {
    data() {
        return {
           menuData:[],
        }
    },
    created(){
        this.getMenu()
    },
    methods:{
        //获取菜单内容 使用async await函数 解构赋值
        async getMenu(){
            let {data}=await get("/menu")
            this.menuData=data
            
        },
    },
    components:{MenusVue}
};
</script>

<style lang="less" scoped>
.title{
    color: #fff;
    text-align: center;
    line-height: 50px;
}
</style>