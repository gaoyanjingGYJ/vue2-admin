<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入订单号或者客户名称" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="btn">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="select.length==0?true:false" @click="operate(1)">审核</el-button>
                    <el-button :disabled="select.length==0?true:false" @click="operate(2)">修改</el-button>
                    <el-button :disabled="select.length==0?true:false" @click="operate(3)">作废</el-button>
                    <!-- select.length==0=false未选中 不能使用 disabled=true -->
                    <!-- 1代表审核 2代表修改 3代表作废操作  这些操作需要发送请求，传的参数有该行数据要操作的数据和做的是什么操作-->
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="50" label="编号"></el-table-column>
                <el-table-column prop="id" label="订单号" fixed width="100"></el-table-column>
                <el-table-column prop="status" label="订单状态" width="100">
                    <!-- 后端返回来的数据需要加工再显示 通过scpoe.row可以拿到该行的数据 -->
                    <template slot-scope="scope">
                        <!-- 进行状态判断，在模板F中不能使用if else，可以考虑使用v-if v-else -->
                        <span v-if="scope.row.status == '1'">待审核</span>
                        <span v-else-if="scope.row.status == '2'">已审核</span>
                        <span v-else-if="scope.row.status == '3'">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间" width="150"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="150"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="100"></el-table-column>
                <el-table-column prop="count" label="件数" width="100"></el-table-column>
                <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                <el-table-column prop="price" label="运费" width="100"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="100"></el-table-column>
                <el-table-column prop="pay" label="是否支付" width="100">
                    <template slot-scope="scope">{{ scope.row.pay == 1 ? '已支付' : '未支付' }}</template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="remove(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="text-align:center"
                class="mt"
            ></el-pagination>
        </el-card>
        <orders-model :visible="visible" @close="visible=false" @reload="getTableData" :row="row" @clearRow="clearRow"></orders-model>
        <!-- visible父->子 row父->子 -->
    </div>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'
import { post } from '@/utils/http'
import OrdersModel from './OrdersModel.vue'
// import { mapMutations } from 'vuex'
export default {
    components: { OrdersModel },
    mixins: [breadCrumb],
    data() {
        return {
            params: {
                page: 1,
                pageSize: 10,
                keyword: '', //输入框的双向绑定 向后端传入的参数
            },
            tableData: [],
            loading: false,
            total: 0,
            select: [],
            visible: false,
            row: {},
        }
    },
    created() {
        this.getTableData()
    },
    methods: {
        async getTableData() {
            this.loading = true
            const { data } = await post('/orderList', this.params)
            this.tableData = data.list
            this.loading = false
            this.total = data.total
        },
        handleCurrentChange(page) {
            this.params.page = page
            this.getTableData()
        },
        handleSizeChange(pageSize) {
            // 当页面大小发生改变时，先修改data中的params.pageSize,再向后端发送请求，携带参数第几页和每页数据条数
            // 至于想要修改data中的params.pageSize，在页面中这些值发生改变时需要先拿到这些值，才能更改。回调参数就是每页条数
            this.params.pageSize = pageSize
            this.getTableData()
        },
        handleSelectionChange(sel) {
            this.select = sel
        },
        operate(num) {
            // 使用map循环拿到数组中的id项，map循环在原数组的基础上做操作，不改变数组的项数，返回一个全新的数组
            const id = this.select.map((item) => item.id)
            if (num == 1) {
                this.$message({
                    type: 'success',
                    message: '订单号为：' + id + ' 审核成功',
                })
                this.getTableData()
            } else if (num == 2) {
                this.$message({
                    type: 'success',
                    message: '订单号为：' + id + ' 修改成功',
                })
                this.getTableData()
            } else {
                this.$message({
                    type: 'success',
                    message: '订单号为：' + id + ' 作废成功',
                })
                this.getTableData()
            }
        },
        remove(id) {
            // 点击删除按钮之后向后端发送请求，传订单号作为参数，后端在数据库中执行删除操作，并给用户删除成功的提示，之后还需要再发送一次请求刷新页面  该接口没写
            /* post('/deletes', {id}).then(() => {
                this.$message({
                    type: 'success',
                    message: '订单号为：' + id + ' 删除成功',
                })
                this.getTableData()
            }) */
            this.$message({
                type: 'success',
                message: '订单号为：' + id + ' 删除成功',
            })
            this.getTableData()
        },
        // ...mapMutations(['setRow']),
        edit(row) {
            //编辑按钮：点击编辑按钮显示对话框，并将父组件的数据传到子组件中去，在弹窗中要显示该行的内容，就是把该行的内容赋给子组件双向绑定的变量
            // 父->子传参可以使用props，也可以使用vuex
            //1 vuex方法
            /* this.setRow(row) //把该行数据的内容放在vuex的共享数据中，在子组件中可以通过this.$store.state.row拿到该共享数据*/
            //2 props 父->子使用props其实更简单一些
            this.row = row
            this.visible = true //点击编辑后显示弹窗
        },
        clearRow(){
            this.row={}
        }
    },
}
</script>

<style lang="less" scoped>
.btn {
    text-align: right;
}
</style>