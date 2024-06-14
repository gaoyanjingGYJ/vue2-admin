<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-input v-model="params.name" placeholder="请输入客户名称"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="params.time" placeholder="请输入创建时间"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="params.billStatus" placeholder="请输入账单状态"></el-input>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="id" label="对账单号"></el-table-column>
                <el-table-column prop="time" label="账单时间"></el-table-column>
                <el-table-column prop="name" label="付款对象"></el-table-column>
                <el-table-column prop="billStatus" label="账单状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.billStatus==1">未对账</span>
                        <span v-else-if="scope.row.billStatus==2">核对中</span>
                        <span v-else>已对账</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payStatus" label="开票状态">
                    <template slot-scope="scope">{{scope.row.payStatus?"已开票":"未开票"}}</template>
                </el-table-column>
                <el-table-column prop="expend" label="总支出金额"></el-table-column>
                <el-table-column prop="errorStatus" label="异常状态">
                    <template slot-scope="scope">{{scope.row.errorStatus?"是":'否'}}</template>
                </el-table-column>
                <el-table-column prop="time2" label="创建时间"></el-table-column>
                <el-table-column prop="operator" label="创建人"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button :type="scope.row.billStatus==3&&scope.row.payStatus==1?"">已确认/el-button> -->
                            <el-button type="success" v-if="scope.row.billStatus==3&&scope.row.payStatus==1">已确认</el-button>
                            <!-- <el-button type="primary" v-else-if="scope.row.billStatus==1&&scope.row.payStatus==0">取消对账</el-button> -->
                            <el-button type="primary" v-else-if="scope.row.billStatus==3&&scope.row.payStatus==0">开票</el-button>

                            <el-button type="danger" v-else>取消对账</el-button>



                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb.vue'
import { post } from '@/utils/http'
export default {
    components: { BreadCrumb },
    data() {
        return {
            tableData: [],
            params: {
                name: '',
                time: '',
                billStatus: '',
                page: 1,
                pageSize: 10,
            },
            total: 0,
            loading: false,
        }
    },
    methods: {
        async getTableData() {
            this.loading = true
            const { data } = await post('/financeCustomer', this.params)
            this.tableData = data.list
            this.total = data.total
            this.loading = false
        },
        search(){
            this.getTableData()
        }
    },
    created() {
        this.getTableData()
    },
}
</script>

<style lang="less" scoped>
</style>