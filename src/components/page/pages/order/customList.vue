<template>
    <div class="container">
        <!-- <div class="title orderTop" style="border-bottom: none">客户列表</div> -->
        <title-name></title-name>
        <el-card class="box-card">
            <!-- <div class="btn">
                <el-button class="butn" style="height: 40px" @click="tianjia()">添加客户</el-button>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入公司名称" clearable v-model="form.search" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn" @click="BuyerList()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <div :class="this.Bj ? 'checkBorder' : ''" style="height: 125px">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ this.Bj ? '编辑' : '添加' }}客户</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="AddBuyer()">{{ this.Bj ? '保存' : '添加' }}</el-button>
                        <el-button class="dioSave cancelBtn" v-show="this.Bj" @click="quxiao()">取消</el-button>
                    </div> -->
                </div>

                <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                    <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加类型</el-button> -->
                    <div class="dialogclass typeBottom">
                        <el-form ref="form" :model="form" :inline="true" label-width="90px">
                            <el-form-item label="公司名称：">
                                <el-input v-model="form.name" maxlength="20" placeholder="请输入公司名称" ref="input"></el-input>
                            </el-form-item>
                            <el-form-item label="公司地址：">
                                <el-input v-model="form.address" maxlength="50" placeholder="请输入公司地址"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：">
                                <el-input v-model="form.tel_name" maxlength="10" placeholder="请输入联系人"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话：">
                                <el-input
                                    oninput="value=value.replace(/[^\d]/g,'')"
                                    v-model="form.tel"
                                    maxlength="11"
                                    placeholder="请输入联系人电话"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-tooltip v-if="!btn[8]" content="没有权限，不能操作" placement="top">
                                    <el-button class="dioSave btnOk" style="background: #999999 !important">{{
                                        this.Bj ? '保存' : '添加'
                                    }}</el-button>
                                </el-tooltip>
                                <el-button v-else class="dioSave btnOk" @click="AddBuyer()">{{ this.Bj ? '保存' : '添加' }}</el-button>

                                <el-button class="dioSave btnCancel" @click="quxiao()">{{ this.Bj ? '取消' : '清空' }}</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="tableTop" flex="cross:center">
                <div style="width: 150px">客户列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="orderSearches" flex="cross:center ">
                        <el-input placeholder="请输入公司名称" clearable v-model="form.search"></el-input>
                        <el-button class="orderBtn btnOk" @click="search()">搜索</el-button>
                    </div>
                </div>
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 10px" :Page="Page" :Size="Size" ref="tab">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <el-tooltip v-if="!btn[8]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">编辑</el-button>
                        </el-tooltip>
                        <el-button v-else @click="bianji(row)" type="text" size="small" class="lan">编辑</el-button>

                        <el-tooltip v-if="!btn[9]" content="没有权限，不能操作" placement="top">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important">删除</el-button>
                        </el-tooltip>
                        <el-button v-else type="text" size="small" class="hong" @click="open(row)">删除</el-button>
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
            ></page>
        </el-card>
        <div class="dialogclass">
            <el-dialog title="添加客户" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <!-- <el-form-item label="公司logo：">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
                                <el-button size="small" type="primary" style="margin: 0 0 0 89px; font-size: 18px">···</el-button>
                            </el-upload>
                        </el-form-item> -->
                        <el-form-item label="公司名称：">
                            <el-input v-model="form.name" maxlength="20" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址：">
                            <el-input v-model="form.address" maxlength="50" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input v-model="form.tel_name" maxlength="5" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话：">
                            <el-input
                                oninput="value=value.replace(/[^\d]/g,'')"
                                v-model="form.tel"
                                placeholder="请输入联系人电话"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                v-model="form.desc"
                                style="width: 248px; border: 1px solid #b1b8bc !important"
                            ></el-input>
                        </el-form-item> -->
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddBuyer()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="客户编辑" :visible.sync="Visible" width="30%">
                <div>
                    <el-form ref="form" :model="forms" label-width="120px">
                        <!-- <el-form-item label="公司logo：">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
                                <el-button size="small" type="primary" style="margin: 0 0 0 89px; font-size: 18px">···</el-button>
                            </el-upload>
                        </el-form-item> -->
                        <el-form-item label="公司名称：">
                            <el-input v-model="forms.name" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址：">
                            <el-input v-model="forms.address" placeholder="请输入公司地址"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input v-model="forms.tel_name" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话：">
                            <el-input
                                oninput="value=value.replace(/[^\d]/g,'')"
                                v-model="forms.tel"
                                placeholder="请输入联系人电话"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="备注：">
                            <el-input
                                type="textarea"
                                v-model="forms.desc"
                                style="width: 248px; border: 1px solid #b1b8bc !important"
                            ></el-input>
                        </el-form-item> -->
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="ModifyBuyer()">保存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { BuyerList, AddBuyer, ModifyBuyer, DeleteBuyer } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            Visible: false,
            forms: {
                name: '',
                address: '',
                tel_name: '',
                tel: ''
            },
            form: {
                name: '',
                address: '',
                tel_name: '',
                tel: ''
            },
            centerDialogVisible: false,
            currentPage: 1,
            total: 0,
            pageSize: 20,

            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                // {
                //     prop: 'city',
                //     label: '客户公司logo'
                // },
                {
                    prop: 'name',
                    label: '客户公司名称'
                },
                {
                    prop: 'code',
                    label: '客户公司编号'
                },
                {
                    prop: 'address',
                    label: '客户公司地址',
                    width: '500'
                },
                {
                    prop: 'tel_name',
                    label: '联系人姓名'
                },
                {
                    prop: 'tel',
                    label: '联系人电话'
                },
                {
                    prop: 'ctTime',
                    label: '创建时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: '',
                    label: '累计订单'
                },

                {
                    prop: 'operation',
                    label: '操作',
                    width: '130'
                }
            ],
            tableData: [],
            Page: 1,
            Size: 20,
            Bj: false,
            highCurrent: true,
            btn: {}
        };
    },
    computed: {},
    watch: {
        currentPage: function (val) {
            this.Page = val;
        },
        pageSize: function (val) {
            this.Size = val;
        }
    },
    methods: {
        search() {
            this.currentPage = 1;
            this.BuyerList();
        },
        //取消
        quxiao() {
            this.Bj = false;
            this.$refs.tab.setkeynull(false);
            this.form.name = '';
            this.form.address = '';
            this.form.tel_name = '';
            this.form.tel = '';
        },
        tianjia() {
            this.form = {};
            this.centerDialogVisible = true;
        },
        //客户删除
        DeleteBuyer(row) {
            let params = {
                id: row.id
            };
            DeleteBuyer(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '删除成功!',
                        type: 'success'
                    });
                    this.BuyerList();
                }
                if (ReturnCode == 203) {
                    this.$message({
                        message: '删除失败，此客户已被创建订单!',
                        type: 'error'
                    });
                    this.BuyerList();
                }
            });
        },
        bianji(row) {
            // this.Visible = true;
            this.$refs.tab.setkeynull(true);
            this.Bj = true;
            this.form = JSON.parse(JSON.stringify(row));
            this.code = row.code;
            this.$refs.input.focus();
            this.$nextTick(() => {
                this.$refs.input.select();
            });
        },
        //客户编辑
        ModifyBuyer() {
            if (this.form.name == '' || this.form.name == null) {
                this.$message.warning('请输入公司名称！');
                return;
            }
            if (this.form.address == '' || this.form.address == null) {
                this.$message.warning('请输入公司地址！');
                return;
            }
            if (this.form.tel_name == '') {
                this.$message.warning('请输入联系人！');
                return;
            }
            if (this.form.tel == '' || this.form.tel == null) {
                this.$message.warning('请输入联系人电话！');
                return;
            }
            let params = {
                id: this.form.id,
                name: this.form.name,
                tel_name: this.form.tel_name,
                tel: this.form.tel,
                address: this.form.address,
                user_id: localStorage.getItem('user_id'),
                CP_ID: localStorage.getItem('comp_id'),
                code: this.code
            };
            ModifyBuyer(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.BuyerList();
                }
            });
            this.form.name = '';
            this.form.address = '';
            this.form.tel_name = '';
            this.form.tel = '';
            this.Bj = false;
            this.Visible = false;
        },
        //客户添加
        AddBuyer() {
            if (this.Bj) {
                this.ModifyBuyer();
                return;
            }
            if (this.form.name == '') {
                this.$message.warning('请输入公司名称！');
                return;
            }
            if (this.form.address == '' || this.form.address == null) {
                this.$message.warning('请输入公司地址！');
                return;
            }
            if (this.form.tel_name == '' || this.form.tel_name == null) {
                this.$message.warning('请输入联系人！');
                return;
            }

            if (this.form.tel == '' || this.form.tel == null) {
                this.$message.warning('请输入联系人电话！');
                return;
            }
            let params = {
                name: this.form.name,
                tel_name: this.form.tel_name,
                tel: this.form.tel,
                address: this.form.address,
                user_id: localStorage.getItem('user_id'),
                CP_ID: localStorage.getItem('comp_id')
            };
            AddBuyer(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.BuyerList();
                }
            });
            this.form.name = '';
            this.form.address = '';
            this.form.tel_name = '';
            this.form.tel = '';
            this.centerDialogVisible = false;
        },
        //客户列表
        BuyerList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            BuyerList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        open(row) {
            this.$confirm('确认要删除该客户信息嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteBuyer(row);
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.BuyerList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.BuyerList();
        }
    },
    created() {
        this.BuyerList();
        this.btn = this.rightControl();
    },
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep.container {
    padding: 0;
    .title {
        height: 47px;
        background: linear-gradient(0deg, #e7f0fc 0%, #c4d3eb 43%, #d5e1f7 56%, #ccdbf2 65%, #ccdaf1 74%, #edf3fc 98%);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2a5389;
        line-height: 47px;
        padding-left: 13px;
    }
    .box-card {
        widows: 100%;
        height: calc(100% - 49px);
        border-radius: 0;
        position: relative;
        border: none;
        .btn {
            display: flex;
            justify-content: space-between;
            height: 46px;
        }
        .page {
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
        .el-card__body {
            padding: 0 !important;
        }
    }
}
.butn {
    border: 2px solid #b1b8bc;
    background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
    border-radius: 4px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    line-height: 12px;
}
.hong {
    color: #e6331d;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
}
.lan {
    color: #345aff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
}
.upload-demo {
    width: 250px;
    height: 40px;
    border: 1px solid #aaaaaa;
    overflow: hidden;
    .el-upload--text {
        border: none;
    }
}
::v-deep.el-button--primary {
    color: #000;
    background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
    border-color: #b1b8bc;
}
::v-deep.esh {
    height: 36px;
    border: 2px solid #b1b8bc;
    .el-input__inner {
        height: 32px;
        border: none;
    }
}
::v-deep.el-form--inline .el-form-item {
    margin-right: 5px;
}
</style>