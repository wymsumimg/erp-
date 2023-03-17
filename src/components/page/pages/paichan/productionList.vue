<template>
    <div class="container">
        <!-- <div class="title orderTop" style="border-bottom: none">生产任务</div> -->
        <title-name></title-name>
        <el-card class="box-card">
            <!-- <div class="btn">
                <div></div>

                <el-form :inline="true" class="demo-form-inline">
                    <el-select v-model="ssVal" clearable placeholder="请选择是否创建" class="xiala">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input placeholder="请输入模具名称" clearable class="esh" v-model="form.search"></el-input>

                    <el-button type="primary" class="butn" @click="OrderTaskList()">搜索</el-button>
                </el-form>
            </div> -->
            <div :class="this.Bj ? 'checkBorder' : ''" style="height: 125px">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ this.tou ? '编辑' : '创建' }}生产任务</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" v-if="this.Bj" @click="Save()">{{ this.tou ? '创建' : '保存' }}</el-button>
                        <el-button class="dioSave cancelBtn" v-if="this.Bj" @click="quxiao()">取消</el-button>
                    </div> -->
                </div>

                <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                    <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加类型</el-button> -->
                    <div class="dialogclass typeBottom">
                        <el-form ref="form" :model="form" :inline="true" label-width="80px">
                            <el-form-item label="开始时间：" style="width: 390px">
                                <el-date-picker
                                    ref="date"
                                    v-model="form.begintime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间：" style="width: 390px">
                                <el-date-picker
                                    v-model="form.endtime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="dioSave btnOk" v-if="this.Bj" @click="Save()">{{ this.tou ? '保存' : '创建' }}</el-button>
                                <el-button class="dioSave btnCancel" v-if="this.Bj" @click="quxiao()">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 150px; text-align: left">生产任务列表</div>
                <div flex class="osselect">
                    <el-select v-model="ssVal" placeholder="请选择是否创建" @change="search()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="form.search" clearable placeholder="请输入模具名称"></el-input>
                    <el-button class="orderBtn" @click="search()">搜索</el-button>
                </div>
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 8px" :Page="Page" :Size="Size" ref="tab">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <el-tooltip v-if="!btn[23]" content="没有权限，不能操作" placement="top">
                            <el-button
                                v-if="row.status == '待加工'"
                                style="color: #999999 !important"
                                type="text"
                                size="small"
                                class="lan"
                                >{{ row.status != '待创建' ? '编辑' : '创建' }}</el-button
                            >

                            <el-button v-else style="color: #999999 !important" type="text" size="small" class="lan">{{
                                row.status != '待创建' ? '编辑' : '创建'
                            }}</el-button>
                        </el-tooltip>

                        <span v-else style="margin-right: 10px">
                            <el-button v-if="row.status == '待加工'" @click="diaBianji(row)" type="text" size="small" class="lan">{{
                                row.status != '待创建' ? '编辑' : '创建'
                            }}</el-button>
                            <el-tooltip v-else content="任务已开始，不能编辑" placement="top" :disabled="row.status == '待创建'">
                                <el-button
                                    :style="row.status != '待创建' ? 'color:#999' : ''"
                                    @click="diaBianji(row)"
                                    type="text"
                                    size="small"
                                    class="lan"
                                    >{{ row.status != '待创建' ? '编辑' : '创建' }}</el-button
                                >
                            </el-tooltip>
                        </span>

                        <el-tooltip v-if="!btn[24]" content="没有权限，不能操作" placement="top">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important" v-if="row.status == '待加工'"
                                >删除</el-button
                            >
                        </el-tooltip>
                        <span v-else>
                            <el-button type="text" size="small" class="hong" @click="open(row)" v-if="row.status == '待加工'"
                                >删除</el-button
                            >
                        </span>
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
            <el-dialog :title="title ? '编辑' : '创建'" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="开始时间：">
                            <el-date-picker
                                v-model="form.begintime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：">
                            <el-date-picker
                                v-model="form.endtime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="Save()">保存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { OrderTaskList, ModifyOrderTask, DeleteOrderTask, AddOrderTask } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            form: {},
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
                {
                    prop: 'code',
                    label: '订单号'
                },
                // {
                //     prop: 'order_id',
                //     label: '模具编号'
                // },
                {
                    prop: 'name',
                    label: '模具名称'
                },
                {
                    prop: 'amount',
                    label: '模具数量'
                },
                {
                    prop: 'testTime',
                    label: '试模时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'order_end',
                    label: '交付时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'begintime',
                    label: '订单开始时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'endtime',
                    label: '结束时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'ctTime',
                    label: '创建时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'buyer_name',
                    label: '客户名称'
                },
                {
                    prop: 'status',
                    label: '状态'
                },
                // {
                //     prop: 'mark',
                //     label: '备注'
                // },

                {
                    prop: 'operation',
                    label: '操作',
                    width: '150'
                }
            ],
            tableData: [],
            selectStatus: [
                {
                    id: '',
                    name: '全部订单'
                },
                {
                    id: -1,
                    name: '待创建'
                },
                {
                    id: 0,
                    name: '待加工'
                },
                {
                    id: 1,
                    name: '加工中'
                },
                {
                    id: 2,
                    name: '加工完成'
                }
                // {
                //     id: 3,
                //     name: '准备加工'
                // },
                // {
                //     id: 4,
                //     name: '加工暂停'
                // }
            ],
            ssVal: '',
            Page: 1,
            Size: 20,
            // 设置只能选择当前日期及之后的日期
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
            title: '',
            Bj: false,
            tou: false,
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
            this.OrderTaskList();
        },
        //取消
        quxiao() {
            this.Bj = false;
            this.tou = false;
            this.form.begintime = '';
            this.form.endtime = '';
        },
        Save() {
            if (this.form.id == null) {
                this.AddOrderTask();
            } else {
                this.ModifyOrderTask();
            }
            this.tou = false;
            this.Bj = false;
        },
        //生产任务添加
        AddOrderTask() {
            if (this.form.begintime == null || this.form.endtime == null) {
                this.$message.warning('请输入开始/结束时间！');
                return;
            }
            if (new Date(this.form.begintime).getTime() >= new Date(this.form.testTime).getTime()) {
                this.$message.warning('开始时间要早于试模时间！');
                return;
            }
            if (new Date(this.form.endtime).getTime() >= new Date(this.form.testTime).getTime()) {
                this.$message.warning('结束时间早于试模时间！');
                return;
            }
            if (new Date(this.form.begintime).getTime() >= new Date(this.form.endtime).getTime()) {
                this.$message.warning('开始时间早于结束时间！');
                return;
            }
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                design_id: this.form.design_id,
                order_id: this.form.order_id,
                begintime: this.form.begintime,
                endtime: this.form.endtime,
                user_id: localStorage.getItem('user_id'),
                status: 0,
                mark: this.form.mark
            };
            console.log(params);
            AddOrderTask(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.OrderTaskList();
                }
            });
            this.centerDialogVisible = false;

            this.form = {};
        },
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
                if (ReturnCode == 203) {
                    this.$message.error('删除失败，此订单已被创建加工任务!');
                }
            });
        },
        diaBianji(row) {
            this.quxiao();
            if (row.status == '待创建' || row.status == '待加工') {
                if (row.status == '待创建') {
                    this.tou = false;
                } else {
                    this.tou = true;
                }
            } else {
                return;
            }
            this.$refs.tab.setkeynull(row);
            this.Bj = true;

            this.$refs.date.focus();
            // this.centerDialogVisible = true;
            this.title = row.begintime;
            this.form = JSON.parse(JSON.stringify(row));

            // if (this.form.id == null) {
            //     this.form.begintime = new Date();
            // } else {
            // }
        },
        //生产任务编辑
        ModifyOrderTask() {
            if (this.form.begintime == null || this.form.endtime == null) {
                this.$message.warning('请输入开始/结束时间！');
                return;
            }
            if (new Date(this.form.begintime).getTime() >= new Date(this.form.testTime).getTime()) {
                this.$message.warning('开始时间要早于试模时间！');
                return;
            }
            if (new Date(this.form.endtime).getTime() >= new Date(this.form.testTime).getTime()) {
                this.$message.warning('结束时间早于试模时间！');
                return;
            }
            if (new Date(this.form.begintime).getTime() >= new Date(this.form.endtime).getTime()) {
                this.$message.warning('开始时间早于结束时间！');
                return;
            }
            let params = {
                id: this.form.id,
                design_id: this.form.design_id,
                cp_id: this.form.cp_id,
                order_id: this.form.order_id,
                begintime: this.form.begintime,
                endtime: this.form.endtime,
                user_id: this.form.user_id,
                status: 0,
                mark: this.form.mark
            };

            ModifyOrderTask(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.OrderTaskList();
                }
            });
            this.form.begintime = '';
            this.form.endtime = '';
            this.Bj = false;
            this.centerDialogVisible = false;
        },
        //生产任务列表
        OrderTaskList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Status: this.ssVal
            };
            OrderTaskList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        // if (item.status == -1) {
                        //     item.status = '待创建';
                        // } else {
                        //     item.status = '已创建';
                        // }
                        if (item.status == -1) {
                            item.status = '待创建';
                        } else if (item.status == 0) {
                            item.status = '待加工';
                        } else if (item.status == 1) {
                            item.status = '加工中';
                        } else if (item.status == 2) {
                            item.status = '加工完成';
                        } else if (item.status == 3) {
                            item.status = '准备加工';
                        } else if (item.status == 4) {
                            item.status = '加工暂停';
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        open(row) {
            this.$confirm('确认删除该订单的生产任务嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteOrderTask(row);
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.OrderTaskList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.OrderTaskList();
        }
    },
    created() {
        this.OrderTaskList();
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
</style>