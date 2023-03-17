<template>
    <div class="container">
        <title-name :threeName="threeName"></title-name>
        <div class="orderCont">
            <div class="orderSearch tableTop checkNameTop" flex="main:justify" style="margin-top: 0">
                <div class="checkName">
                    <ul flex="cross:center">
                        <li
                            @click="checkChange(item, index)"
                            :class="{ checkClass: active == item.id }"
                            v-for="(item, index) in titleArr"
                            :key="index"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
                <div flex class="osselect">
                    <el-select v-model="ssVal" clearable placeholder="请选择是否创建" @change="searchBtn()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="compPama.QueryString" clearable placeholder="模具名称"></el-input>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
            </div>
            <div class="orderTable mart" v-show="active == 1">
                <div class="tableod">
                    <!-- max-height="640" -->
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="订单编号" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="moldType_name" label="模具类型" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="name" label="模具名称" show-overflow-tooltip align="center" width="130"> </el-table-column>

                        <el-table-column prop="endTime" label="交付时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="试模时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="创建时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="address" label="状态" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <span>
                                    <!-- 待审核  待派单 -->
                                    <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                        getStatus[scope.row.status]
                                    }}</span>
                                </span>
                            </slot>
                        </el-table-column>

                        <el-table-column prop="order_remark" label="订单说明" show-overflow-tooltip align="center" min-width="150">
                        </el-table-column>
                        <el-table-column prop="order_remark" label="指派人" show-overflow-tooltip align="center" min-width="150">
                        </el-table-column>

                        <el-table-column prop="address" label="操作" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <div flex=" main:justify">
                                    <!-- <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">派单</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="ProductPaiDan(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            派单
                                        </div>
                                    </div> -->
                                    <div @click="ProductPaiDan(scope.row)">派单</div>
                                    <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">详情</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            详情
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="tablePage">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="compPama.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="compPama.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable mart" v-show="active == 2">
                <div class="tableod">
                    <!-- max-height="640" -->
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="订单编号" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="moldType_name" label="模具类型" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="name" label="模具名称" show-overflow-tooltip align="center" width="130"> </el-table-column>

                        <el-table-column prop="endTime" label="预估开始时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="预估结束时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="实际开始时间" align="center" min-width="180"> </el-table-column>

                        <el-table-column prop="address" label="状态" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <span>
                                    <!-- 待设计-1 0待审核  未通过1   通过2  已创建3  -->
                                    <!-- -1待创建 0待审核 1未通过 2通过 -->
                                    <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                        getStatus[scope.row.status]
                                    }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="order_remark" label="订单说明" show-overflow-tooltip align="center" min-width="150">
                        </el-table-column>

                        <el-table-column prop="address" label="操作" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <div flex=" main:justify">
                                    <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">开始</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            开始
                                        </div>
                                    </div>
                                    <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">详情</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            详情
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="tablePage">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="compPama.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="compPama.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialogclass paidanCalss">
            <el-dialog title="派单" :visible.sync="paidanDio" width="420px" @close="closeImgDio">
                <!-- <div slot="title" class="dialog-title">
                    <span class="title-text">上传产品造型图</span>
                    <span style="color: #345aff; margin-left: 10px">[{{ mojuName }}]</span>
                    <div class="button-right">
                        <span class="title-close"></span>
                    </div>
                </div> -->
                <div style="padding: 30px 0 0; box-sizing: border-box">
                    <div class="typeBottom" flex="main:around">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="选择人员：">
                                <el-select v-model="form.region" placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择时间：">
                                <el-date-picker
                                    v-model="form.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>

                            <div class="tijiao">
                                <el-button class="dioSave">提交</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { DesignList, AddDesign, DesignPicList, AddDesignFile, DesignFileList, DeleteDesignFile } from '@/api/design';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20
                // status: ''
            },
            total: 0,
            selectStatus: [
                {
                    id: -1,
                    name: '待设计订单'
                },
                {
                    id: 0,
                    name: '待审核订单'
                },
                {
                    id: 1,
                    name: '未通过订单'
                },
                {
                    id: 2,
                    name: '通过订单'
                },
                {
                    id: 3,
                    name: '设计完成订单'
                },
                {
                    id: '',
                    name: '全部订单'
                }
            ],
            ssVal: '',
            seeDaima: '',
            upDaima: '',

            tableHeight: 0,

            getStatus: {
                '-1': '待设计',
                0: '待审核',
                1: '未通过',
                2: '通过',
                3: '设计完成'
            },
            statusColor: {
                '-1': '#FFA300',
                0: '#FFA300',
                1: '#FF0000',
                2: '#27c6de',
                3: '#18A837'
            },

            btn: {},
            threeName: '组长',
            titleArr: [
                { id: 1, name: '产品造型' },
                { id: 2, name: '产品三维' }
            ],
            active: 1,
            paidanDio: false,
            form: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getDesignList();
        this.seeDaima = localStorage.getItem('seeDaima');
        this.upDaima = localStorage.getItem('upDaima');
        this.$nextTick(() => {
            var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (isMac) {
                //your code
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 245;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 245;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 240;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 240;
                };
            }
        });
        this.btn = this.rightControl();
    },
    methods: {
        ProductPaiDan(row) {
            console.log(row);

            this.paidanDio = true;
        },
        closeImgDio() {},
        checkChange(item, index) {
            console.log(item, index);
            this.active = item.id;
        },

        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getDesignList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getDesignList();
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },

        getDesignList() {
            this.compPama.Status = this.ssVal;
            DesignList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getDesignList();
        }

        // moreBtn(id, status) {
        //     if (status == -1) {
        //         return;
        //     } else {
        //         this.edID = id;
        //         this.moreDio = true;

        //         this.editDetailParams.BaseID = id;
        //         DesignPicList(this.editDetailParams).then((res) => {
        //             let { ReturnCode, Data, PageCount } = res;
        //             if (ReturnCode == 200) {
        //                 this.editDetailList = Data;
        //                 this.edTotal = PageCount;
        //             }
        //         });
        //     }
        // },
    },

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
.inputBox {
    position: relative;
    .seR {
        margin-right: 30px;
    }
    input {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}
</style>

<style lang='scss'>
.hide .el-upload--picture-card {
    display: none;
}

.upImgCalss {
    .el-upload-list--picture-card .el-upload-list__item {
        transition: all 0s !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        img {
            height: auto !important;
        }
    }
}
</style>