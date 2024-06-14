<template>
    <div>
        <el-row :gutter="24" class="mb">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="title">销售记录</div>
                    <div style="height: 240px" ref="analysis"></div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <div slot="header" class="title">当月指标</div>
                    <div style="height: 240px" ref="percent"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { get } from "@/utils/http";
export default {
    // 使用mounted函数不适用created函数，这是因为涉及到了DOM操作，created是只创建了，没有挂载，mounted是挂载到了页面上
    mounted() {
        this.drawLine();
        this.drawPie()
    },
    methods: {
        //绘制折线图
        async drawLine() {
            //1 准备一个容器 需要基于DOM元素，不使用原生JS的document.getElementByID()，而是使用ref
            var myChart = echarts.init(this.$refs.analysis);
            let { data } = await get("/line");
            //需要data对象的属性名和属性值 对象不能使用for of循环，使用for in循环分别拿到key和value
            let keys = [];
            let values = [];
            for (let key in data) {
                keys.push(key);
                values.push(data[key]);
            }
            //2 图表配置项
            const option = {
                tooltip:{//提示框 鼠标划过悬浮
                    trigger:"axis",
                    //使用formatter更改显示内容
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false, //设置点落在边上，而默认的在中间
                    data: keys,
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: values,
                        type: "line",
                        smooth: true, //折线变为平滑曲线
                        //设置曲线下面的渐变色
                        areaStyle: {
                            color: {
                                // 从上到下，从左到右，从0到1
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#4f88ff", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "white", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        itemStyle: {
                            //折线和拐点的颜色
                            color: "#f48383",
                        },
                        lineStyle: {
                            //折线的颜色
                            color: "#5ea0f1",
                        },
                    },
                ],
            };
            //3 使用函数，生成图表(setOption)
            myChart.setOption(option);
        },
        //绘制饼图
        async drawPie() {
            var myChart = echarts.init(this.$refs.percent);
           let {data}=await get("/pie")
            const option = {
                tooltip: {//提示框
                    trigger: "item",
                },
                series: [
                    {
                        name: "Target",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize:16,
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data,
                        color:["#c13530","#2f4554","#61a0a8","#d48265","#91c8ae"]//更改饼图的颜色
                    },
                ],
            };
            myChart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
.title {
    text-align: center;
}
</style>