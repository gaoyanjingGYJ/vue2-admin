<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
                <el-footer>
                    <bottom-foot></bottom-foot>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft'
import TopHeader from '@/components/TopHeader.vue'
import BottomFoot from '@/components/BottomFoot.vue'
export default {
    data() {
        return {}
    },
    components: { NavLeft, TopHeader, BottomFoot },
}
</script>
        

<style lang="less" scoped>
.header {
    background-color: #fff;
    line-height: 60px;
    box-shadow: 0 2px 2px rgba(0, 21, 41, 0.3);
}
// 更改侧边栏的高度：使用height:100%;不起作用这是因为对于父级是body的使用height:100%;不起作用。
//可以使用另一个单位vh 表示把视口分为100等份，占其中的几份
.aside {
    background-color: #001529;
    height: 100vh;
}
.main {
    height: 80vh;
    background-color: #e9eef3;
}
</style>