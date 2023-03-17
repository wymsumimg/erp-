<template>
    <!-- <div class="container">
        <div class="center">
            <div class="title">部门管理</div>
            <div class="basics">
                查询
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 29px 0 0 80px">
                    <el-form-item label="部门">
                        <el-input v-model="ruleForm.branch" placeholder="请输入部门"></el-input>
                    </el-form-item>
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
                    :tableData="departmentList"
                    :height="415"
                    :label="label"
                    :Page="Page"
                    :Size="Size"
                    style="margin-bottom: 86px; font-weight: 400"
                >
                    <template slot-scope="{ item, row }">
                        <span v-if="item.prop === 'operation'">
                            <el-button @click="edit(row)" type="text" size="small">编辑</el-button>
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
            <el-dialog :title="this.id ? '编辑部门' : '新增部门'" :visible.sync="visible" width="420px" @close="cancel">
                <div>
                    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-left: -30px">
                        <el-form-item label="部门名称">
                            <el-input v-model="ruleForm.branchTitle" placeholder="请输入部门名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave btnOk" @click="DepartmentEdit">提交</el-button>
                    <el-button class="dioSave btnCancel" @click="cancel">清空</el-button>
                </span>
            </el-dialog>
        </div>
    </div> -->
    <div class="container">
        <title-name></title-name>
        <!-- <div class="title orderTop" style="border-bottom: none">
            <router-link to="/" style="color: #444444">设置</router-link> > <span style="color: #345aff">部门管理</span>
        </div> -->

        <div class="orderCont" style="padding-bottom: 0px">
            <div :class="[saveSure == 1 ? 'checkBorder' : '']">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ saveSure == 0 ? '添加' : '编辑' }}部门</div>
                </div>
                <div class="addNewKuang dialogclass" flex="cross:center ">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" :inline="true">
                        <el-form-item label="部门名称：" prop="branchTitle">
                            <el-input v-model="ruleForm.branchTitle" placeholder="请输入部门名称" ref="inpute"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-tooltip v-if="!btn[52]" content="没有权限，不能操作" placement="top">
                                <el-button class="dioSave" style="background: #999999 !important">{{
                                    saveSure == 0 ? '添加' : '保存'
                                }}</el-button>
                            </el-tooltip>
                            <el-button v-else class="dioSave" @click="DepartmentEdit('ruleForm')">{{
                                saveSure == 0 ? '添加' : '保存'
                            }}</el-button>

                            <el-button class="dioSave cancelBtn" @click="cancel('ruleForm')">
                                {{ saveSure == 0 ? '清空' : '取消' }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="tableTop" flex="cross:center " style="margin-top: 0">
                <div style="width: 150px">部门列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="detailSearch marr" flex="cross:center ">
                        <el-input v-model="ruleForm.branch" clearable placeholder="请输入部门"></el-input>
                        <el-button class="orderBtn" @click="submitForm">搜索</el-button>
                    </div>
                </div>
            </div>

            <div class="orderTable">
                <div class="tableod">
                    <tab :tableData="departmentList" :label="label" :Page="Page" :Size="Size" style="margin-bottom: 86px; font-weight: 400">
                        <template slot-scope="{ item, row }">
                            <span v-if="item.prop === 'operation'">
                                <el-tooltip v-if="!btn[52]" content="没有权限，不能操作" placement="top">
                                    <el-button style="color: #999999 !important" type="text" size="medium">编辑</el-button>
                                </el-tooltip>
                                <el-button v-else @click="edit(row)" type="text" size="medium">编辑</el-button>

                                <el-tooltip v-if="!btn[59]" content="没有权限，不能操作" placement="top">
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
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { DepartmentList, DepartmentEdit, DeleteDepartment } from '@/api/api';
import { getTime } from '@/utils/index';

export default {
    components: { tab, page },
    data() {
        return {
            ruleForm: {
                branch: '',
                branchTitle: ''
            },
            currentPage: 1,
            total: 0,
            pageSize: 20,
            Page: 1,
            Size: 20,
            visible: false,
            starts: 1,
            departmentList: [],
            title: false,
            id: '',
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'name',
                    label: '部门'
                },
                {
                    prop: 'ctTime',
                    label: '创建时间'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '260'
                }
            ],
            saveSure: 0,
            rules: {
                branchTitle: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
            },
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
        submitForm() {
            this.pageSize = 20;
            this.currentPage = 1;
            this.DepartmentList();
        },
        resetForm() {
            this.ruleForm = {
                branch: ''
            };
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.DepartmentList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.DepartmentList();
        },
        accountAdd() {
            this.title = false;
            this.visible = true;
        },
        start() {},
        edit(row) {
            this.ruleForm.branchTitle = row.name;
            this.id = row.id;
            this.title = true;
            this.visible = true;
            this.saveSure = 1;
            this.$refs.inpute.focus();
            this.$nextTick(() => {
                this.$refs.inpute.select();
            });
        },
        save() {},
        cancel(formName) {
            this.ruleForm.branchTitle = '';
            this.id = '';
            this.saveSure = 0;
            this.$refs[formName].resetFields();
        },
        DepartmentList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                QueryString: this.ruleForm.branch,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            DepartmentList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.total = PageCount;
                    this.departmentList = Data;
                }
            });
        },
        DepartmentEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.branchTitle.trim().length <= 0) {
                        return this.$message({
                            message: '部门名称不能为空格！',
                            type: 'warning'
                        });
                    }
                    let params = {
                        id: this.id || 0,
                        cp_id: localStorage.getItem('comp_id'),
                        name: this.ruleForm.branchTitle,
                        code: '1',
                        ctTime: getTime(new Date()).split(' ')[0]
                    };
                    DepartmentEdit(params).then((res) => {
                        let { Data, ReturnCode, PageCount } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                message: this.id ? '编辑成功！' : '添加成功！',
                                type: 'success'
                            });
                            this.DepartmentList();
                            this.visible = false;
                            this.saveSure = 0;
                            this.ruleForm.branchTitle = '';
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        del(row) {
            this.$confirm('确认要删除此部门嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteDepartment(row);
                })
                .catch(() => {});
        },
        DeleteDepartment(row) {
            let params = {
                ID: row.id
            };
            DeleteDepartment(params).then((res) => {
                let { Data, ReturnCode, PageCount, ErrorMessage } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.DepartmentList();
                }
                if (ReturnCode == 203) {
                    this.$message.error(ErrorMessage);
                    this.DepartmentList();
                }
            });
        }
    },
    created() {
        this.DepartmentList();
        this.btn = this.rightControl();
    }
};
</script>

<style lang="scss" scoped>
// @import '../../../common/set.scss';
// ::v-deep.dialogclass {
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
