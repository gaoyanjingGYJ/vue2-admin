<template>
    <div>
        <el-card>
            <el-row :gutter="24">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input placeholder="请输入用户昵称" v-model="params.nick"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入客户ID" v-model="params.id"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入联系电话" v-model="params.tel"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" class="mt" v-show="show">
                        <el-col :span="8">
                            <el-input placeholder="请输入所属公司" v-model="params.company"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入主营业务" v-model="params.business"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入认证状态" v-model="params.authentication"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                    <el-button type="text" @click="expand">
                        <span>
                            {{show?"收起":"展开"}}
                            <i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                        </span>
                    </el-button>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-button type="primary">添加客户</el-button>
                    <el-button type="primary">批量导入</el-button>
                    <el-button type="primary">导入模板下载</el-button>
                    <el-button type="primary">导出客户</el-button>
                    <el-button type="warning">分配</el-button>
                    <el-button type="warning">查看地图</el-button>
                    <el-button type="warning" icon="el-icon-plus">新增</el-button>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button icon="el-icon-edit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="nick" label="用户昵称"></el-table-column>
                <el-table-column prop="company" label="所属公司"></el-table-column>
                <el-table-column prop="business" label="主营业务"></el-table-column>
                <el-table-column prop="account" label="账户余额"></el-table-column>
                <el-table-column prop="authentication" label="认证状态">
                    <template slot-scope="scope">{{scope.row.authentication?"已认证":"未认证"}}</template>
                </el-table-column>
                <el-table-column prop="mile" label="运输里程数"></el-table-column>
                <el-table-column prop="name" label="联系人"></el-table-column>
                <el-table-column prop="tel" label="联系电话">
                    <!-- <template slot-scope="scope">
                        {{scope.row.tel.toString().subString(0,3)+"****"+scope.row.tel.toString().subString(7,11)}}
                    </template>-->
                </el-table-column>
                <el-table-column prop="address" label="公司地址"></el-table-column>
                <el-table-column prop="credit" label="银行卡号" width="200"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button type="primary">详情</el-button>
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
                class="tc mt"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import { post } from '@/utils/http'
export default {
    data() {
        return {
            loading: false,
            params: {
                nick: '',
                id: '',
                tel: '',
                company: '',
                business: '',
                authentication: '',
            },
            pageData: {
                page: 1,
                pageSize: 10,
            },
            show: false,
            total: 0,
            tableData: [],
        }
    },
    methods: {
        expand() {
            this.show = !this.show
        },
        async getTableData() {
            this.loading = true
            const { data } = await post('/customer', { ...this.params, ...this.pageData })
            //对电话号码进行隐私处理
            let d = data.list
            for (let i = 0; i < d.length; i++) {
                d[i].tel = d[i].tel.substring(0, 3) + '****' + d[i].tel.substring(7, 11)
            }
            this.tableData = data.list
            this.total = data.total
            this.loading = false
        },
        search() {
            this.getTableData()
        },
        handleSizeChange(size){
            this.pageData.pageSize=size
            this.getTableData()
        },
        handleCurrentChange(page){
            this.pageData.page=page
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