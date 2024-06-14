<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="10">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户单号" prop="id">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="货物单位" prop="unit">
                            <el-select v-model="ruleForm.unit" placeholder="请选择货物单位">
                                <el-option label="件" value="jian"></el-option>
                                <el-option label="吨" value="dun"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="发货地址" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="承运方式" prop="carriage">
                            <el-radio-group v-model="ruleForm.carriage">
                                <el-radio :label="1">个人</el-radio>
                                <el-radio :label="2">公司</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户单号" prop="id">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="货物单位" prop="unit">
                            <el-select v-model="ruleForm.unit" placeholder="请选择货物单位">
                                <el-option label="件" value="jian"></el-option>
                                <el-option label="吨" value="dun"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="发货地址" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="承运方式" prop="carriage">
                            <el-radio-group v-model="ruleForm.carriage">
                                <el-radio :label="1">个人</el-radio>
                                <el-radio :label="2">公司</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">立即创建</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
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
            ruleForm: {
                name: '',
                id: '',
                unit: '',
                date1: '',
                date2: '',
                delivery: '',
                address: '',
                carriage: '',
                desc: '',
            },
            rules: {
                name: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
                id: [{ required: true, message: '客户单号不能为空', trigger: 'blur' }],
                unit: [{ required: true, message: '货物单位不能为空', trigger: 'change' }],
                date1: [{ type: 'date', required: true, message: '日期不能为空', trigger: 'change' }],
                date2: [{ type: 'date', required: true, message: '时间不能为空', trigger: 'change' }],

                address: [{ required: true, message: '发货地址不能为空', trigger: 'blur' }],
                carriage: [{ required: true, message: '承运方式不能为空', trigger: 'change' }],
                desc: [{ required: true, message: '活动形式不能为空', trigger: 'blur' }],
            },
        }
    },
    methods: {
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    post('/waybillIn', this.ruleForm).then(() => {
                        this.$message({
                            type: 'success',
                            message: '运单录入成功',
                        })
                    })
                }
            })
        },
        resetForm() {
            this.$refs.ruleForm.resetFields()
        },
    },
}
</script>

<style lang="less" scoped>
</style>