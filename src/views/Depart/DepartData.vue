 <template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input v-model="params.search1"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="params.search2"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="params.search3"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="mt" :gutter="24" v-show="show">
                        <el-col :span="8">
                            <el-input v-model="params.search4"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="params.search5"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="params.search6"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                    <el-button type="text" size="mini" @click="expand" class="el-dropdown-link">
                        {{show?"收起":"展开"}}
                        <i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                    </el-button>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="num" label="编号id"></el-table-column>
                <el-table-column prop="shortname" label="简称"></el-table-column>
                <el-table-column prop="permit" label="道路许可证" width="200"></el-table-column>
                <el-table-column prop="linkman" label="联系人/电话" width="180"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="time" label="注册时间"></el-table-column>
                <el-table-column prop="name" label="承运商名称" width="180"></el-table-column>
                <el-table-column prop="code" label="信用代码" width="100">
                    <template slot-scope="scope">{{scope.row.code?"有":"无"}}</template>
                </el-table-column>
                <el-table-column prop="address" label="注册地址"></el-table-column>
                <el-table-column prop="report" label="是否上报">
                    <template slot-scope="scope">{{scope.row.report?"是":"否"}}</template>
                </el-table-column>
                <el-table-column prop="credit" label="信用分"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template>
                        <el-button size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
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
                class="mt tc"
            ></el-pagination>
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
            show: false,
            params: {
                search1: '',
                search2: '',
                search3: '',
                search4: '',
                search5: '',
                search6: '',
            },
            pageData: {
                page: 1,
                pageSize: 10,
            },
            total: 0,
            loading:false,
        }
    },
    methods: {
        expand() {
            this.show = !this.show
        },
        async getTableData() {
            this.loading=true
            let res = await post('/departData', { ...this.params, ...this.pageData })
            this.tableData = res.data.list
            this.total = res.data.total
            this.loading=false
        },
        handleSizeChange(size) {
            this.pageData.pageSize = size
            this.getTableData()
        },
        handleCurrentChange(page) {
            this.pageData.page = page
            this.getTableData()
        },
        search() {
            this.getTableData()
        },
    },
    created() {
        this.getTableData()
    },
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    font-size: 20px;
}
.el-icon-arrow-down,
.el-icon-arrow-up {
    font-size: 20px;
}
</style>
