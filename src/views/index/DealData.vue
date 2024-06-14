<template>
    <div>
 <!-- gutter表示列之间的间隔 -->
        <el-row :gutter="24" class="mb">
            <el-col :span="6">
                <el-card class="profit font-color" shadow="always">
                    <div class="fl" v-if="dealList[0]">
                        <p>盈利</p>
                        <!-- 在这里如果直接使用dealList[0].rate是会报错的，这是因为异步请求获取数据时，由于数据是异步获取的，所以一开始dealList是空数组，[0]是没有rate属性的 undefined.rate ,可以加上v-if判断dealList[0]是否存在-->
                        <p style="font-weight: bold; margin: 8px 0">
                            {{ dealList[0].num }}
                        </p>
                        <p>
                            <span>{{ dealList[0].rate }}  </span>
                            <span style="font-size: 12px">与上月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="order font-color" shadow="always">
                    <div class="fl" v-if="dealList[1]">
                        <p>订单量</p>
                        <p style="font-weight: bold; margin: 8px 0">
                            {{ dealList[1].num }}
                        </p>
                        <p>
                            <span>{{ dealList[1].rate }}  </span>
                            <span style="font-size: 12px">与上月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-money ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="trade font-color" shadow="always">
                    <div class="fl" v-if="dealList[2]">
                        <p>成交吨数</p>
                        <p style="font-weight: bold; margin: 8px 0">
                            {{ dealList[2].num }}
                        </p>
                        <p>
                            <span>{{ dealList[2].rate }}  </span>
                            <span style="font-size: 12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-date ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
             <el-col :span="6">
                <el-card class="new-user font-color" shadow="always">
                    <div class="fl" v-if="dealList[3]">
                        <p>新用户</p>
                        <p style="font-weight: bold; margin: 8px 0">
                            {{ dealList[3].num }}
                        </p>
                        <p>
                            <span>{{ dealList[3].rate }}  </span>
                            <span style="font-size: 12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-user ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
 import { get } from "@/utils/http";
export default {
    data() {
        return {
            dealList: [],
        };
    },
    created() {
        this.getDeal();
    },
    methods: {
        // 获取交易数据 本月及累计进件和放款数据
        getDeal() {
            get("/deal").then(({ data }) => {
                this.dealList = data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.font-color {
    color: #fff;
}
.profit {
    background-color: #488aff;
}
.ico {
    float: right;
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
}
.order {
    background-color: #f36076;
}
.trade{
    background-color: #4d5bff;
}
.new-user{
    background-color: #fe9e37;
}
</style>