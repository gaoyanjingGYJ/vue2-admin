<template>
    <div>
        <el-dialog :title="title" :visible="visible" width="50%" :before-close="close">
            <el-row :gutter="20">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="起始城市" prop="start">
                            <el-input v-model="ruleForm.start"></el-input>
                        </el-form-item>
                        <el-form-item label="目的城市" prop="end">
                            <el-input v-model="ruleForm.end"></el-input>
                        </el-form-item>
                        <el-form-item label="货物名称" prop="cargo">
                            <el-input v-model="ruleForm.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="件数" prop="count">
                            <el-input v-model="ruleForm.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="ruleForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="运费" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="订单来源" prop="from">
                            <el-radio-group v-model="ruleForm.from">
                                <el-radio label="移动端">移动端</el-radio>
                                <el-radio label="pc端">pc端</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否支付" prop="pay">
                            <el-radio-group v-model="ruleForm.pay">
                                <el-radio :label="1">已支付</el-radio>
                                <el-radio :label="2">未支付</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {post} from "@/utils/http"
// import {mapState,mapMutations} from "vuex"
export default {
    props: ['visible','row'],
    data() {
        return {
            ruleForm: {
                name: '',
                start: '',
                end: '',
                cargo: '',
                count: '',
                unit: '',
                price: '',
                from: '',
                pay: '',
            },
            rules: {
                name: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
                start: [{ required: true, message: '起始城市为空', trigger: 'blur' }],
                end: [{ required: true, message: '目的城市不能为空', trigger: 'blur' }],
                cargo: [{ required: true, message: '货物名称不能为空', trigger: 'blur' }],
                count: [
                    { required: true, message: '件数不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '件数必须为数字', trigger: 'blur' },
                ],
                unit: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
                price: [
                    { required: true, message: '运费不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '运费必须为数字', trigger: 'blur' },
                ],
                from: [{ required: true, message: '订单来源不能为空', trigger: 'change' }],
                pay: [{ required: true, message: '是否支付不能为空', trigger: 'change' }],
            },
            title:"新建订单",
        }
    },
    methods: {
        // ...mapMutations(["clearRow"]),
        close() {
            // 点击了保存之后再次点击新建订单按钮，上次的数据内容还在，应该将表单清空，就是把双向绑定的数据置空。如果只将数据置空，原来的表单校验还存在.应该将整体表单的数据和校验规则都重置，使用resetFields,对整个表单进行重置，将所有字段值重置为初始值并移除校验结果，该方法是form的方法需要使用ref拿到form
            this.$refs.ruleForm.resetFields()
            //点击取消按钮，不能直接修改visible，因为visible是父组件的变量，只能使用自定义事件，通知父组件，让父组件将visible设置为flase
            this.$emit('close')
            //将vuex中的数据清空
            // this.clearRow()
            this.$emit("clearRow")
        },
        save() {
            // 点击保存按钮进行整体表单验证，验证通过时像后端发送请求，由后端添加到数据库，给用户以反馈，关闭对话框，并再次发送请求刷新列表，而发送获取表格数据的方法在父组件中，使用自定义事件通知父组件
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    post("/addOrder",this.ruleForm).then(()=>{
                        this.$message({
                            type:"success",
                            message:"保存成功"
                        })
                        this.close()
                        this.$emit(("reload"))
                    })
                }
            })
        },
    },
    // 点击编辑按钮显示该弹窗并将该行的数据也显示出来，那么什么情况下将该行数据显示出来呢？可以通过监听visible的变化，当visible为true时就更改双向绑定的值将改行数据显示在表单中
    /*computed:{
        ...mapState(['row'])
    },*/
    watch:{
        visible(){
           
            const {name,start,end,cargo,count,unit,price,from,pay}=this.row
            // 可以通过vuex中是否有数据来判断当前页面是新建订单还是编辑订单
            this.title=name?"编辑订单":"新建订单"
            this.ruleForm={name,start,end,cargo,count,unit,price,from,pay}
            //在点击编辑之后再点击新建订单还会显示之前点击编辑显示的内容，这是因为vuex中的数据没有清空，将表单重置了，但是visible发生变化又从vuex中取了数据，因此还需要再关闭时将vuex中的数据清空
        }
    }
}
</script>

<style lang="less" scoped>
</style>