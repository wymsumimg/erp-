<template>
    <div class="container">
        <div class="title">
            <router-link to="/orderList" style="color: #2a5389">设计管理</router-link> >
            <router-link to="/orderList" style="color: #2a5389">CAD设计</router-link> ><span style="color: #345aff">组长</span>
        </div>
        <!-- <title-name></title-name> -->
        <el-card class="box-card">
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 300px; text-align: left">
                    订单列表
                    <el-tooltip v-if="btn[26]" content="没有权限，不能操作" placement="top">
                        <el-button class="orderBtn" style="width: 100px; height: 32px; background: #999999 !important">批量派单</el-button>
                    </el-tooltip>
                    <el-button v-else class="orderBtn" style="width: 100px; height: 32px" @click="batch()">批量派单</el-button>
                </div>

                <div flex class="osselect">
                    <el-select v-model="ssVal" @change="search">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="form.search" clearable placeholder="请输入模具名称"></el-input>
                    <el-button class="orderBtn" @click="search">搜索</el-button>
                </div>
            </div>

            <tab :tableData="tableData" :label="label" :Page="Page" :Size="Size">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <el-tooltip v-if="btn[61]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">派单</el-button>
                        </el-tooltip>
                        <el-button v-else @click="send(row)" type="text" size="small" class="lan">派单</el-button>

                        <el-tooltip v-if="btn[61]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">详情</el-button>
                        </el-tooltip>
                        <el-button v-else @click="detail(row)" type="text" size="small" class="lan">详情</el-button>
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
        </el-card>

        <div class="dialogclass">
            <el-dialog title="批量派单" :visible.sync="batchVisible" width="1450px">
                <div style="border-bottom: 1px solid #b1b8bc">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
                        <el-form-item label="模具名称：">
                            <el-select v-model="formInline.ming" placeholder="请选择模具名">
                                <el-option :label="item" :value="item" v-for="(item, index) in []" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工件名称：">
                            <el-select v-model="formInline.GJming" placeholder="请选择工件名">
                                <el-option :label="item" :value="item" v-for="(item, index) in []" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="料号名称：">
                            <el-select v-model="formInline.LHming" placeholder="请选择料号名">
                                <el-option :label="item" :value="item" v-for="(item, index) in []" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工艺名称：">
                            <el-select v-model="formInline.LHming" placeholder="请选择料号名">
                                <el-option :label="item" :value="item" v-for="(item, index) in []" :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="计划时间：">
                            <div v-if="formInline.workBegin">{{ formInline.workBegin }} — {{ formInline.workEnd }}</div>
                        </el-form-item>
                    </el-form>
                </div>

                <div
                    v-if="show"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    style="height: 500px; margin-top: 20px; overflow: auto"
                >
                    <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        label-width="120px"
                        v-for="(item, index) in []"
                        :key="index"
                    >
                        <el-form-item :label="`工艺${index + 1}：`">
                            <el-input
                                :value="`${item.material_name} - ${item.craft_name}`"
                                placeholder="请选择模具名"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间：" class="XX">
                            <el-date-picker
                                v-model="item.begintime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :disabled="item.begintime"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：" class="XX">
                            <el-date-picker
                                v-model="item.endtime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :disabled="item.endtime"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="选择人员：">
                            <el-select v-model="item.device_id" placeholder="请选择人员" :disabled="item.device_id == 0 || item.device_id">
                                <el-option label="暂不选择" :value="0"></el-option>

                                <div>
                                    <el-option
                                        :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                        :value="items.device_id"
                                        v-for="(items, index) in []"
                                        :key="index"
                                    ></el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else style="height: 500px; margin-top: 20px; overflow: auto"></div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" v-no-more-click>保存</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="dialogclass">
            <el-dialog title="派单" :visible.sync="sendVisible" width="420px">
                <div>
                    <el-form ref="form" :model="form" label-width="120px" style="display: flex; justify-content: center">
                        <div class="bj">
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
                            <el-form-item label="选择人员：">
                                <el-select v-model="form" placeholder="请选择人员">
                                    <el-option label="暂不选择" value="0"></el-option>
                                    <div>
                                        <el-option
                                            :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                            :value="items.device_id"
                                            v-for="(items, index) in []"
                                            :key="index"
                                        ></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </div>
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
import { OrderList } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },

    data() {
        return {
            form: {
                search: ''
            },
            currentPage: 1,
            total: 0,
            pageSize: 20,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '50'
                },
                {
                    prop: 'code',
                    label: '模具名称'
                },
                {
                    prop: 'name',
                    label: '工件'
                },
                {
                    prop: 'moldType_name',
                    label: '料号'
                },
                {
                    prop: 'buyer_name',
                    label: '工艺'
                },
                {
                    prop: 'testTime',
                    label: '预估开始时间',
                    width: '179'
                },
                {
                    prop: 'endTime',
                    label: '预估结束时间',
                    width: '179'
                },
                {
                    prop: 'ctTime',
                    label: '实际开始时间',
                    width: '179'
                },
                {
                    prop: 'ctTime',
                    label: '实际结束时间',
                    width: '179'
                },
                {
                    prop: 'remark',
                    label: '指派人'
                },
                {
                    prop: 'status',
                    label: '状态'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '179'
                }
            ],
            tableData: [],
            Page: 1,
            Size: 20,
            btn: {},
            selectStatus: [
                {
                    id: '',
                    name: '全部订单'
                },
                {
                    id: 0,
                    name: '待设计'
                },
                {
                    id: 1,
                    name: '待审核'
                },
                {
                    id: 2,
                    name: '造型通过'
                },
                {
                    id: 3,
                    name: 'BOM设计'
                },
                {
                    id: 4,
                    name: '生产中'
                },
                {
                    id: 5,
                    name: '试模'
                },
                {
                    id: 6,
                    name: '维修'
                },
                {
                    id: 7,
                    name: '交付'
                },
                {
                    id: 8,
                    name: '分配工艺'
                },
                {
                    id: 9,
                    name: '任务分配'
                },
                {
                    id: 10,
                    name: '造型未通过'
                }
            ],
            ssVal: '',
            batchVisible: false,
            formInline: {},
            sendVisible: false,
            form: {},
            show: false
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
        send(row) {
            this.sendVisible = true;
        },
        batch() {
            this.formInline = {};
            this.OrderList();
            this.batchVisible = true;
        },
        //查看
        detail(row) {
            this.$router.push({
                path: '/orderStatus',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },
        search() {
            this.currentPage = 1;
            this.OrderList();
        },
        //列表
        OrderList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            if (this.ssVal !== '') {
                params.Status = this.ssVal;
            }
            OrderList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.status == 0) {
                            item.status = '待设计';
                        } else if (item.status == 1) {
                            item.status = '待审核';
                        } else if (item.status == 2) {
                            item.status = '造型通过';
                        } else if (item.status == 3) {
                            item.status = 'BOM设计';
                        } else if (item.status == 4) {
                            item.status = '生产中';
                        } else if (item.status == 5) {
                            item.status = '试模';
                        } else if (item.status == 6) {
                            item.status = '维修';
                        } else if (item.status == 7) {
                            item.status = '交付';
                        } else if (item.status == 8) {
                            item.status = '分配工艺';
                        } else if (item.status == 9) {
                            item.status = '任务分配';
                        } else if (item.status == 10) {
                            item.status = '造型未通过';
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.OrderList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.OrderList();
        }
    },
    created() {
        this.OrderList();
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
<style lang="scss" scoped>
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
.diatil {
    widows: 100%;
    height: 77px;
    background: #dee4ef;
}
.leiBtn {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    background: linear-gradient(0deg, #2a5389 0%, #a2c2ec 100%);
    border-radius: 4px;
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
::v-deep.dialogclass .el-input__inner {
    width: 200px;
}
</style>
