<template>
    <div class="container">
        <div class="center">
            <div class="title">
                <router-link to="/account" style="color: #444444">账号设置</router-link> >
                <span style="color: #345aff">{{ row.edit ? '编辑账号' : '添加账号' }}</span>
            </div>
            <div class="basics">
                {{ row.edit ? '编辑账号' : '添加账号' }}
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin: 29px 0 30px 80px"
                >
                    <el-form-item label="账号名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入账号名称"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="ruleForm.account" placeholder="请手机号码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!row.edit" label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item v-if="!row.edit" label="确认密码" prop="pwd">
                        <el-input v-model="ruleForm.pwd" placeholder="请再次输入密码" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="所属部门" prop="branch">
                        <el-select v-model="ruleForm.branch" placeholder="请选择部门" @focus="DepartmentList">
                            <el-option :label="item.name" v-for="(item, index) in departmentList" :key="index" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属角色" prop="role">
                        <el-select v-model="ruleForm.role" placeholder="请选择角色" @focus="RoleList">
                            <el-option :label="item.name" v-for="(item, index) in roleList" :key="index" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="footer">
                <div class="ftr-btn">
                    <button class="save" @click="submitForm('ruleForm')">保存</button>
                    <button class="call" @click="resetForm('ruleForm')">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UserEdit, RoleList, DepartmentList } from '@/api/api';
import { getTime } from '@/utils/index';
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                account: '',
                password: '',
                pwd: '',
                role: '',
                branch: ''
            },
            row: {},
            rules: {
                name: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
                account: [{ required: true, message: '请手机号码', trigger: 'blur' }],
                password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
                pwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
                branch: [{ required: true, message: '请选择部门', trigger: 'blur' }]
            },
            roleList: [],
            departmentList: []
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.UserEdit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            if (this.row.edit) {
                this.$router.push('/account');
            }
        },
        RoleList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            RoleList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.roleList = Data;
                }
            });
        },
        DepartmentList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            DepartmentList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.departmentList = Data;
                }
            });
        },
        UserEdit() {
            let params = {
                id: this.row.id || 0,
                cp_id: localStorage.getItem('comp_id'),
                name: this.ruleForm.name,
                department: this.ruleForm.branch,
                role_id: this.ruleForm.role,
                status: 1,
                ctTime: getTime(new Date()).split(' ')[0],
                lastLogin: getTime(new Date()).split(' ')[0],
                IP: '111.111.111.111',
                account: this.ruleForm.account,
                pwd: this.ruleForm.pwd
            };
            UserEdit(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: this.row.edit ? '编辑成功！' : '添加成功！',
                        type: 'success'
                    });
                    this.$router.push('/account');
                }
            });
        }
    },
    created() {
        if (this.$route.query.info) {
            this.row = JSON.parse(this.$Base64.decode(this.$route.query.info));
            this.RoleList();
            this.DepartmentList();
            this.ruleForm = {
                name: this.row.name,
                account: this.row.account,
                role: this.row.role_id,
                branch: this.row.department,
                pwd: this.row.pwd
            };
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../common/set.scss';
</style>
