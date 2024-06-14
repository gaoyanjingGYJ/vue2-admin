<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item v-for="(item,index) in logList" :key="index" :timestamp="item.date" placement="top">
                           <el-card>
                                <h4>{{item.operation}}</h4>
                                <p>{{item.name}} 操作于 {{item.time}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="12">
                <calendar-vue></calendar-vue>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {get} from "@/utils/http"
import CalendarVue from './CalendarVue.vue';
export default {
    data(){
        return {
            logList:[]
        }
    },
    created(){
        this.getLog()
    },
    methods:{
        //获取操作日志
        getLog(){
            get("/log").then(({data})=>{
                this.logList=data
            })
        }
    },
    components:{
        CalendarVue
    }
};
</script>

<style lang="less" scoped>
</style>