<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input v-model="params.waybillNo" placeholder="请输入运单号"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="params.name" placeholder="请输入客户名称"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="getTableData">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @input="getTableData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(120)</el-radio-button>
                <el-radio-button label="3">运输中(70)</el-radio-button>
                <el-radio-button label="4">已完成(100)</el-radio-button>
                <el-radio-button label="5">运单异常(10)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号" width="80" fixed></el-table-column>
                <el-table-column prop="date" label="下单时间" width="100"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="150"></el-table-column>
                <el-table-column prop="count" label="件数" width="80"></el-table-column>
                <el-table-column prop="start" label="起始地" width="180"></el-table-column>
                <el-table-column prop="end" label="目的地" width="180"></el-table-column>
                <el-table-column prop="price" label="运费" width="100"></el-table-column>
                <el-table-column prop="needRecive" label="是否需要接货" width="120">
                    <template slot-scope="scope">{{scope.row.needRecive==1?"是":"否"}}</template>
                </el-table-column>
                <el-table-column prop="plateNumber" label="车牌号" width="100"></el-table-column>
                <el-table-column prop="driver" label="司机" width="100"></el-table-column>
                <el-table-column prop="tel" label="司机电话" width="180"></el-table-column>
                <el-table-column prop="percent" label="运输进度" width="180">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button type="danger" size="mini">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="mt"
                style="text-align:center;"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb.vue'
import { post } from '@/utils/http'
import moment from 'moment'
import {mapState,mapMutations} from "vuex"
export default {
    components: { BreadCrumb },
    data() {
        return {
            loading: false,
            tableData: [], //表格数据
            total: 0,
            params: {
                waybillNo: '',
                name: '',
                status: 1, //运单状态，默认是“全部运单”，label给程序员看，里面的内容才是给用户看的
            },
            date: [],
            pageData: {
                page: 1,
                pageSize: 10,
            },
            
        }
    },
    created() {
        this.getTableData()
    },
    computed:{
        ...mapState(['isFromDetail'])
    },
    methods: {
        ...mapMutations(['changeThisValue']),
        async getTableData() {
            this.loading = true
            let startDate = this.date.length ? moment(this.date[0]).format('YYYY-MM-DD') : ''
            let endDate = this.date.length ? moment(this.date[1]).format('YYYY-MM-DD') : ''
            const res = await post('/waybillList', { ...this.pageData, ...this.params, startDate, endDate })
            this.tableData = res.data.list
            this.loading = false
            this.total = res.data.total
        },
        reset() {
            this.params = {}
            this.params.status = 1
            this.date = []
        },
        handleSizeChange(size) {
            this.pageData.pageSize = size
            this.getTableData()
        },
        handleCurrentChange(page) {
            this.pageData.page = page
            this.getTableData()
        },
        detail(no) {
            this.$router.push('/waybill/list/detail?no=' + no)
        },
        clearCache() {
            let vnode = this.$vnode
            let parentVnode = vnode && vnode.parent
            if (parentVnode && parentVnode.componentInstance && parentVnode.componentInstance.cache) {
                var key = vnode.key == null ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '') : vnode.key
                var cache = parentVnode.componentInstance.cache
                var keys = parentVnode.componentInstance.keys
                if (cache[key]) {
                    this.$destroy() // remove key
                    if (keys.length) {
                        var index = keys.indexOf(key)
                        if (index > -1) {
                            keys.splice(index, 1)
                        }
                    }
                    cache[key] = null
                }
            }
        },
    },
  
    beforeRouteLeave(to, from, next) {
        if (to.path == '/waybill/list/detail') {
            from.meta.keepAlive = true
            // console.log(this)
            this.changeThisValue(this)
        } else {
            this.clearCache()
        }
        next()
    },

  /*   activated() {
        // 如果标记值在详情页中是直接从详情页去到了其他页面，则再次进入列表页时数据是被缓存了的，需要重新加载一次数据，原来的缓存并没有清除，而是重新加载了数据
        if(!this.isFromDetail){
            this.getTableData()
        }
    }, */
    deactivated() {
        console.log('组件失活了')
    },
}
</script>

<style lang="less" scoped>
</style>