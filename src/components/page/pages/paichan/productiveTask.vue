<template>
    <div class="container">
        <div class="title orderTop">生产任务</div>
        <el-card class="box-card">
            <div class="btn">
                <el-button
                    class="butn"
                    style="height: 40px"
                    @click="
                        centerDialogVisible = true;
                        dialogTableVisible = true;
                        form = {};
                    "
                    >创建生产任务</el-button
                >

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入订单号" v-model="form.search" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn" @click="OrderTaskList()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 17px">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <el-button type="text" @click="open(row)" size="small" class="hong">删除</el-button></span
                    >
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
            <el-dialog title="创建生产" :visible.sync="centerDialogVisible" width="50%">
                <el-form ref="form" :model="form" label-width="120px" class="shengchan">
                    <div>
                        <el-form-item label="订单号：">
                            <el-input v-model="form.name" placeholder="请输入订单号"></el-input>
                        </el-form-item>
                        <el-form-item label="模具名称：">
                            <el-input v-model="form.name" placeholder="请输入模具名称"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input v-model="form.name" placeholder="请输入客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="form.mark" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间：">
                            <el-date-picker
                                v-model="form.value"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="模具编号：">
                            <el-input v-model="form.name" placeholder="请输入模具编号"></el-input>
                        </el-form-item>
                        <el-form-item label="料号名数量：">
                            <el-input v-model="form.name" placeholder="请输入料号名数量"></el-input>
                        </el-form-item>
                        <el-form-item label="交付时间：">
                            <el-date-picker
                                v-model="form.value3"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="试模时间：">
                            <el-date-picker
                                v-model="form.value2"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：">
                            <el-date-picker
                                v-model="form.value1"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddOrderTask()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="创建生产" :visible.sync="chuangjian" width="30%">
                <div>
                    <tab></tab>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="chuangjian = false">确认</el-button>
                </span>
            </el-dialog>
        </div>

        <el-dialog title="提示" :visible.sync="dialogTableVisible">
            <div style="display: flex; align-items: center">
                <img src="../../../common/comImg/index/提示.png" alt="" style="width: 20px" /><span
                    >&nbsp;&nbsp;当前日期还有{{ this.tableData.length }}个订单待完成，确定创建嘛？</span
                >
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 17px" :show="true"> </tab>
        </el-dialog>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { OrderTaskList, AddOrderTask, DeleteOrderTask } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            dialogTableVisible: false,
            chuangjian: false,
            form: {},
            centerDialogVisible: false,
            currentPage: 1,
            total: 0,
            pageSize: 10,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'code',
                    label: '订单号'
                },
                {
                    prop: 'order_id',
                    label: '模具编号'
                },
                {
                    prop: 'name',
                    label: '模具名称'
                },
                {
                    prop: 'amount',
                    label: '科料数量'
                },
                {
                    prop: 'buer_name',
                    label: '客户名称'
                },

                {
                    prop: 'begintime',
                    label: '试模时间'
                },
                {
                    prop: 'endtime',
                    label: '交付时间'
                },
                {
                    prop: 'mark',
                    label: '备注'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '179'
                }
            ],
            tableData: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        //生产任务删除
        DeleteOrderTask(row) {
            let params = {
                id: row.id
            };
            DeleteOrderTask(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.OrderTaskList();
                }
            });
        },
        //生产任务添加
        AddOrderTask() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                order_id: 1,
                begintime: this.form.value,
                endtime: this.form.value1,
                user_id: localStorage.getItem('user_id'),
                status: 0,
                mark: this.form.mark
            };
            AddOrderTask(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                }
            });
            this.centerDialogVisible = false;
            this.OrderTaskList();
            this.form = {};
        },
        //生产任务列表
        OrderTaskList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 0,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            OrderTaskList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        open(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteOrderTask(row);
                })
                .catch(() => {
                    
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    created() {
        this.OrderTaskList();
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
.container {
    padding: 0;
    .title {
        height: 56px;
        background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2a5389;
        line-height: 56px;
        padding-left: 13px;
    }
    .box-card {
        widows: 100%;
        height: calc(100% - 60px);

        border-radius: 0;
        .btn {
            display: flex;
            justify-content: space-between;
            height: 46px;
        }
        .page {
            position: absolute;
            right: 61px;
            bottom: 26px;
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
.shengchan {
    display: flex;
}
::v-deep.esh {
    height: 36px;
    border: 2px solid #b1b8bc;
    .el-input__inner {
        height: 32px;
        border: none;
    }
}
</style>