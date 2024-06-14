<template>
    <div>
        <div class="fr">
            <!-- 通过@command点击菜单项触发的事件回调 默认参数command属性 通过判断command的值来判断点击的是哪一项 -->
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您，{{ info }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="fr date">
            <p>今天是您在阿里的第<span class="tips">{{days}}</span>天</p>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import { removeToken } from "@/utils/auth";
import { get } from "@/utils/http";
export default {
    data() {
        return {
            info: sessionStorage.getItem("nickname"),
            time: "",
        };
    },
    methods: {
        handleCommand(command) {
            if (command == "c") {
                //退出登录 删除数据并返回登录页
                removeToken();
                this.$router.push("/login");
            }
        },
        workTime() {
            get("/entry").then((res) => {
                this.time = res.time;
            });
        },
    },
    computed:{
        //计算属性计算入职了几天
        days(){
            let now=new Date()
            // 由于this.time初始值是"" 在请求期间会出现短暂的NaN，通过下面的改善
            let target=this.time?new Date(this.time):new Date()
            return Math.floor((now-target)/1000/60/60/24)
        }
    },
    created() {
        //获取入职时间
        this.workTime()
    },
};
</script>

<style lang="less" scoped>
.date {
    margin-right: 50px;
    .tips {
        font-size: 24px;
        color: #5696ff;
    }
}
</style>