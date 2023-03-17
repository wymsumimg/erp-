<template>
    <!-- <div class="container">
        <div class="center">
            <div class="title">账号管理</div>
            <div class="basics">
                查询
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 29px 0 0 80px">
                    <div flex>
                        <el-form-item label="账号">
                            <el-input v-model="ruleForm.account" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </div>

                    <div flex>
                        <el-form-item label="角色">
                            <el-select v-model="ruleForm.role" placeholder="请选择角色" @focus="RoleList">
                                <el-option :label="item.name" v-for="(item, index) in roleList" :key="index" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="ruleForm.status" placeholder="请选择状态">
                                <el-option label="禁用" :value="0"></el-option>
                                <el-option label="启用" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="footer" style="margin-top: -22px">
                    <div class="ftr-btn" style="margin-left: -470px">
                        <button class="save" @click="submitForm">查询</button>
                        <button class="call" @click="resetForm">重置</button>
                    </div>
                </div>
            </div>
            <div class="basics" style="padding-right: 29px">
                <div class="footer" style="margin-top: -10px">
                    <div class="ftr-btn" style="height: 50px; margin-left: -930px">
                        <button class="save" @click="accountAdd">+ 添加</button>
                    </div>
                </div>
                <tab
                    :tableData="userList"
                    :height="355"
                    :label="label"
                    :Page="Page"
                    :Size="Size"
                    style="margin-bottom: 86px; font-weight: 400"
                >
                    <template slot-scope="{ item, row }">
                        <span v-if="item.prop === 'department'">
                            {{ departmentLists[row.department] }}
                        </span>
                        <span v-if="item.prop === 'role_id'">
                            {{ roleLists[row.role_id] }}
                        </span>
                        <span v-if="item.prop === 'status'" :style="row.status == 0 ? 'color:#F4523B' : ''">
                            {{ statusList[row.status] }}
                        </span>
                        <span v-if="item.prop === 'operation'">
                            <el-button @click="edit(row)" type="text" size="small">编辑</el-button>
                            <el-button @click="start(row)" type="text" size="small">{{ row.status ? '禁用' : '启用' }}</el-button>
                            <el-button @click="reset(row)" type="text" size="small">重置密码</el-button>
                            <el-button @click="del(row)" type="text" size="small" style="color: #e6331d">删除</el-button>
                        </span>
                    </template>
                </tab>
                <page
                    class="page"
                    :currentPage="currentPage"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                    :total="total"
                    :pageSize="pageSize"
                >
                </page>
            </div>
        </div>
        <div class="dialogclass">
            <el-dialog title="重置密码" :visible.sync="visible" width="420px" @close="cancel">
                <div>
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                        style="margin-left: -30px"
                    >
                        <el-form-item label="新密码" prop="password">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pwd">
                            <el-input v-model="ruleForm.pwd" placeholder="请再次输入密码" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave btnOk" @click="save">提交</el-button>
                    <el-button class="dioSave btnCancel" @click="cancel">清空</el-button>
                </span>
            </el-dialog>
        </div>
    </div> -->
    <div class="container">
        <title-name></title-name>
        <!-- <div class="title orderTop" style="border-bottom: none">
            <router-link to="/" style="color: #444444">设置</router-link> > <span style="color: #345aff">账号管理</span>
        </div> -->

        <div class="orderCont" style="padding-bottom: 0px">
            <div :class="[saveSure == 1 ? 'checkBorder' : '']" style="height: 155px">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ saveSure == 0 ? '添加' : '编辑' }}账号</div>
                </div>
                <div class="addNewKuang dialogclass" flex="cross:center ">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="90px"
                        class="demo-ruleForm"
                        :inline="true"
                        style="margin-top: 38px"
                    >
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入姓名" ref="inpute"></el-input>
                        </el-form-item>
                        <el-form-item label="登录账号：" prop="account">
                            <el-input v-model="ruleForm.account" placeholder="请输入登录账号"></el-input>
                        </el-form-item>
                        <el-form-item v-show="!saveSure" label="密码：" prop="password">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item v-show="!saveSure" label="确认密码：" prop="pwd">
                            <el-input v-model="ruleForm.pwd" placeholder="请再次输入密码" show-password></el-input>
                        </el-form-item>

                        <el-form-item label="所属部门：" prop="department_id">
                            <el-select v-model="ruleForm.department_id" placeholder="请选择部门" @focus="DepartmentList">
                                <el-option
                                    :label="item.name"
                                    v-for="(item, index) in departmentList"
                                    :key="index"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="所属角色：" prop="role_id">
                            <el-select v-model="ruleForm.role_id" placeholder="请选择角色" @focus="RoleList">
                                <el-option :label="item.name" v-for="(item, index) in roleList" :key="index" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-tooltip v-if="!btn[54]" content="没有权限，不能操作" placement="top">
                                <el-button class="dioSave" style="background: #999999 !important">{{
                                    saveSure == 0 ? '添加' : '保存'
                                }}</el-button>
                            </el-tooltip>
                            <el-button v-else class="dioSave" @click="submitForm('ruleForm')">{{
                                saveSure == 0 ? '添加' : '保存'
                            }}</el-button>

                            <el-button class="dioSave cancelBtn" @click="resetForm('ruleForm')">
                                {{ saveSure == 0 ? '清空' : '取消' }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="tableTop" flex="cross:center " style="margin-top: 0">
                <div style="width: 150px">账号列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="detailSearch marr" flex="cross:center ">
                        <el-input v-model="ruleForm.search" clearable placeholder="请输入姓名"></el-input>
                        <el-button class="orderBtn" @click="search">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="orderTable">
                <div class="tableod">
                    <tab :tableData="userList" :label="label" :Page="Page" :Size="Size" style="margin-bottom: 86px; font-weight: 400">
                        <template slot-scope="{ item, row }">
                            <span v-if="item.prop === 'status'">
                                <el-tooltip v-if="!btn[54]" content="没有权限，不能操作" placement="top">
                                    <el-switch
                                        v-model="row.status"
                                        active-color="#999999"
                                        inactive-color="#999999"
                                        :active-value="1"
                                        :inactive-value="0"
                                        disabled
                                    >
                                    </el-switch>
                                </el-tooltip>
                                <el-switch
                                    v-else
                                    v-model="row.status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="start(row)"
                                >
                                </el-switch>
                            </span>
                            <span v-if="item.prop === 'operation'">
                                <el-tooltip v-if="!btn[54]" content="没有权限，不能操作" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">编辑</el-button>
                                </el-tooltip>
                                <el-tooltip v-else-if="row.type == 1" content="系统管理不能编辑" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">编辑</el-button>
                                </el-tooltip>
                                <el-button v-else @click="edit(row)" type="text" size="medium">编辑</el-button>

                                <!-- <el-tooltip v-if="!btn[54]" content="没有权限，不能操作" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">{{
                                        row.status ? '禁用' : '启用'
                                    }}</el-button>
                                </el-tooltip>
                                <el-button v-else @click="start(row)" type="text" size="medium">{{
                                    row.status ? '禁用' : '启用'
                                }}</el-button> -->

                                <el-tooltip v-if="!btn[54]" content="没有权限，不能操作" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">重置密码</el-button>
                                </el-tooltip>
                                <el-button v-else @click="reset(row)" type="text" size="medium">重置密码</el-button>

                                <el-tooltip v-if="!btn[60]" content="没有权限，不能操作" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">删除</el-button>
                                </el-tooltip>
                                <el-tooltip v-else-if="row.type == 1" content="系统管理不能删除" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">删除</el-button>
                                </el-tooltip>
                                <el-button v-else @click="del(row)" type="text" size="medium" style="color: #e6331d">删除</el-button>
                            </span>
                        </template>
                    </tab>

                    <page
                        class="page"
                        :currentPage="currentPage"
                        @handleSizeChange="handleSizeChange"
                        @handleCurrentChange="handleCurrentChange"
                        :total="total"
                        :pageSize="pageSize"
                    >
                    </page>
                </div>
            </div>
        </div>
        <div class="dialogclass">
            <el-dialog title="重置密码" :visible.sync="visible" width="520px" @close="cancel">
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="新密码：" prop="password" style="width: 85%">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="pwd" style="width: 85%">
                            <el-input v-model="ruleForm.pwd" placeholder="请再次输入密码" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave btnOk" @click="save">提交</el-button>
                    <el-button class="dioSave btnCancel" @click="cancel">清空</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { RoleList, UserList, DepartmentList, UserDelete, UserEdit } from '@/api/api';
import { getTime } from '@/utils/index';

export default {
    name: 'Account',
    components: { tab, page },
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
                role_id: '',
                status: '',
                password: '',
                pwd: '',
                department_id: '',
                search: ''
            },
            currentPage: 1,
            total: 0,
            pageSize: 20,
            Page: 1,
            Size: 20,
            visible: false,
            roleList: [],
            userList: [],
            departmentList: [],
            statusList: {
                0: '禁用',
                1: '启用'
            },
            roleLists: {},
            departmentLists: {},
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
                password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
                pwd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }],
                department_id: [{ required: true, message: '请选择部门', trigger: 'blur' }]
            },
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'name',
                    label: '姓名'
                },
                {
                    prop: 'account',
                    label: '登录账号'
                },
                {
                    prop: 'department',
                    label: '所属部门'
                },
                {
                    prop: 'role_name',
                    label: '所属角色'
                },
                {
                    prop: 'status',
                    label: '状态',
                    status: true
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '260'
                }
            ],
            saveSure: 0,
            btn: {}
        };
    },
    watch: {
        currentPage: function (val) {
            this.Page = val;
        },
        pageSize: function (val) {
            this.Size = val;
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.saveSure == 0) {
                        this.ruleForm.id = 0;
                        this.ruleForm.status = 1;
                    }
                    this.UserEdit(this.ruleForm);
                    this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        search() {
            this.UserList();
        },
        resetForm(formName) {
            if ((this.saveSure = 1)) {
                this.saveSure = 0;
            }
            this.ruleForm = {
                name: '',
                account: '',
                role_id: '',
                status: '',
                password: '',
                pwd: '',
                department_id: ''
            };
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.UserList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.UserList();
        },
        accountAdd() {
            this.$router.push('/accountAdd');
        },
        reset(row) {
            this.ruleForm = {
                name: '',
                account: '',
                role_id: '',
                status: '',
                password: '',
                pwd: '',
                department_id: ''
            };
            this.row = row;
            this.visible = true;
        },
        start(row) {
            // this.$confirm(`确认要${row.status ? '禁用' : '启用'}此账号嘛？`, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // })
            //     .then(() => {
            // if (row.status == 0) {
            //     row.status = 1;
            // } else {
            //     row.status = 0;
            // }
            this.UserEdit(row);
            // })
            // .catch(() => {
            //     this.UserList();
            // });
        },
        edit(row) {
            // this.$router.push({
            //     path: '/accountAdd',
            //     query: {
            //         info: this.$Base64.encode(
            //             JSON.stringify({
            //                 ...row,
            //                 edit: true
            //             })
            //         )
            //     }
            // });
            this.DepartmentList();
            this.RoleList();
            this.saveSure = 1;
            this.$refs.inpute.focus();
            this.$nextTick(() => {
                this.$refs.inpute.select();
            });
            this.ruleForm = { ...row };
            console.log(this.ruleForm);
            this.ruleForm.password = row.pwd;
            this.ruleForm.id = row.id;
            this.ruleForm.status = row.status;
        },
        save() {
            this.row.pwd = this.ruleForm.pwd;
            this.UserEdit(this.row);
            this.visible = false;
        },
        cancel() {
            this.ruleForm.password = '';
            this.ruleForm.pwd = '';
        },
        DepartmentList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            DepartmentList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.departmentList = Data;
                    Data.map((item) => {
                        this.departmentLists[item.id] = item.name;
                    });
                }
            });
        },
        RoleList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            RoleList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.roleList = Data;
                    Data.map((item) => {
                        this.roleLists[item.id] = item.name;
                    });
                }
            });
        },
        UserList() {
            let params = {
                CP_ID: Number(localStorage.getItem('comp_id')),
                QueryString: this.ruleForm.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            UserList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.total = PageCount;
                    this.userList = Data;
                }
            });
        },
        del(row) {
            this.$confirm('确认要删除此账号嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.UserDelete(row);
                })
                .catch(() => {});
        },
        UserDelete(row) {
            let params = {
                ID: row.id
            };
            UserDelete(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.UserList();
                }
            });
        },
        UserEdit(row) {
            let params = {
                id: row.id,
                cp_id: localStorage.getItem('comp_id'),
                name: row.name,
                department: row.department_id,
                role_id: row.role_id,
                status: row.status,
                ctTime: getTime(new Date()).split(' ')[0],
                lastLogin: getTime(new Date()).split(' ')[0],
                IP: '111.111.111.111',
                account: row.account,
                pwd: row.pwd
            };
            UserEdit(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    if ((this.saveSure = 0)) {
                        this.saveSure = 1;
                    }
                    (this.ruleForm = {
                        name: '',
                        account: '',
                        role_id: '',
                        status: '',
                        password: '',
                        pwd: '',
                        department_id: '',
                        search: ''
                    }),
                        this.UserList();
                }
            });
        }
    },
    created() {
        this.UserList();
        this.btn = this.rightControl();
    }
};
</script>

<style lang="scss" scoped>
// @import '../../../common/set.scss';
// ::v-deep.dialogclass {
//     .el-form .el-input {
//         width: 260px !important;
//     }
//     .el-input__inner {
//         width: 260px !important;
//     }
// }
::v-deep.addNewKuang .el-form-item {
    margin-bottom: 15px;
}
.container {
    position: relative;
    .page {
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
}
</style>
