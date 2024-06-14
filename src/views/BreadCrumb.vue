<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">
                {{ item }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadList: [],
        };
    },
    created() {
        this.getBreadCrumb();
    },
    //监听一下路由，像parmas更改了路由没有更改页面的情况
    watch: {
        $route() {
            this.getBreadCrumb();
        },
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || [];
        },
    },
};
</script>

<style lang="less" scoped>
</style>