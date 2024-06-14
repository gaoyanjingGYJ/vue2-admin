<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt info">
            <el-row :gutter="10">
                <el-col :span="12">
                    <span>运单编号:YGC20170110000001</span>
                    <span>创建时间:2022-06-24</span>
                    <span>审核员:张三丰</span>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button type="primary" size="mini" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="未发货"></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt product-detail">
            <h1>基础信息</h1>
            <el-row>
                <el-col :span="6">
                    <p>客户名称:诺来科技有限公司</p>
                    <p>货物名称:口罩</p>
                    <p>数量:8(吨)</p>
                </el-col>
                <el-col :span="6">
                    <p>是否是易燃易爆物品:否</p>
                    <p>结算方式:现付</p>
                    <p>运费:12000元</p>
                </el-col>
                <el-col :span="6">
                    <p>发货单据:暂未上传</p>
                    <p>接货单据:暂未上传</p>
                    <p>所属业务员:苏澄海</p>
                </el-col>
                <el-col :span="6">
                    <p>客户下单时间:2000-08-22</p>
                    <p>是否需要接货:否</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>运输信息</h1>
            <el-row>
                <el-col :span="6">
                    <p>车牌号:京A12345</p>
                    <p>司机姓名:王五</p>
                </el-col>
                <el-col :span="6">
                    <p>司机电话:18888888888</p>
                    <p>司机地址:北京市朝阳区</p>
                </el-col>
                <el-col :span="6">
                    <p>司机身份证号:257896522111202547</p>
                    <p>所属公司:天津运输公司</p>
                </el-col>
                <el-col :span="6">
                    <p>预计运输时间:8天</p>
                    <p>违约金:5000</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>经办人员信息</h1>
            <el-row>
                <el-col :span="6">
                    <p>业务员:张三</p>
                </el-col>
                <el-col :span="6">
                    <p>审核员:李四</p>
                </el-col>
                <el-col :span="6">
                    <p>制单员:王五</p>
                </el-col>
                <el-col :span="6">
                    <p>备注:无备注</p>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb.vue'
import { mapMutations,mapState } from 'vuex'
export default {
    components: { BreadCrumb },
    computed:{
        ...mapState(['thisValue']),
    },
   /*  beforeRouteLeave(to, from, next) {
        // 如果去的是列表页，加一个标记
        if (to.path == '/waybill/list') {
            this.changeIsFromDetail(true)
        } else {
            this.changeIsFromDetail(false)
        }
        next()
    }, */
    beforeRouteLeave(to,from,next){
        if(to.path!='/waybill/list'){
            this.clearCache()
        }
        next()
    },

    methods: {
        ...mapMutations(['changeIsFromDetail']),
        back() {
            this.$router.push('/waybill/list')
        },
         clearCache() {
            let th=this.thisValue
            let vnode = th.$vnode
            let parentVnode = vnode && vnode.parent
            if (parentVnode && parentVnode.componentInstance && parentVnode.componentInstance.cache) {
                var key = vnode.key == null ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '') : vnode.key
                var cache = parentVnode.componentInstance.cache
                var keys = parentVnode.componentInstance.keys
                if (cache[key]) {
                    th.$destroy() // remove key
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
}
</script>

<style lang="less" scoped>
.info span {
    margin: 0 8px;
}
.product-detail {
    h1 {
        margin: 20px 0;
        // text-align: left;
    }
    p {
        line-height: 40px;
        // text-align: left;
    }
}
</style>