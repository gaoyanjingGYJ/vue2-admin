<template>
    <div>
        <!-- 这个组件实现的是递归方法实现一个菜单项使用submenu还是menu-item，递归自己调用自己，当是submenu时再调用自己的组件，判断使用submenu还是menu-item，直到使用的是menu-item作为退出的条件 -->
        <!-- 在这个组件中需要用到NavLeft.vue组件的menuData数据，属于父-子传值，使用props接收 -->
        <!-- 函数递归自己调用自己是调用的函数名，而组件的递归使用的是自己的name  -->
        <!-- submenu和menu-item使用index作为唯一标识，其值可以是任意的唯一内容，在这个项目中可以是name也可以是url，但我们选择的是url，这是因为之后我们要使用router-link做点击路由跳转，而在element-ui中menu有一个router属性，表示是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转，这样就不用手动开启router-link了 -->
        <el-submenu v-if="menu.children" :index="menu.url" class="menu-width">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </template>
            <!-- 在这里是进行递归实现 还是需要进行v-for循环，就像是最外层的一样，递归只是对一项实现，需要对每一项都实现 -->
            <nav-menu
                v-for="(item, index) in menu.children"
                :key="index"
                :menu="item"
            ></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" class="menu-width">
            <i :class="menu.icon"></i>
            <!-- 插槽的名字要和element-ui的一样，决定了显示的位置 -->
            <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: "NavMenu", //name只有在组件自己递归调用自己的时候才有意义
    // 父-子传值使用props接收 注意：属性名要父组件和子组件的名字相同
    props: {
        menu: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="less" scoped>
.menu-width{width:200px;}
</style>