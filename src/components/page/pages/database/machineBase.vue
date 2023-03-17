<template>
    <div class="container">
        <!-- 订单列表 -->

        <title-name></title-name>
        <div class="orderCont">
            <!-- <div class="orderSearch" flex>
                <el-input v-model="compPama.QueryString" clearable placeholder="请输入工艺名称"></el-input>
                <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
            </div> -->

            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 150px; text-align: left">设备库列表</div>
                <div flex="cross:center" class="osselect">
                    <span>工艺：</span>
                    <el-select v-model="ssVal" clearable placeholder="请选择工艺" @change="searchBtn()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <!-- <el-input style="margin-left: 1px" v-model="compPama.QueryString" clearable placeholder="请输入工艺名称"></el-input> -->
                    <!-- <el-button class="orderBtn" @click="searchBtn()">搜索</el-button> -->
                </div>
            </div>
            <div class="orderTable">
                <div class="tableod" style="margin-top: 8px">
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="room" label="车间" align="center"> </el-table-column>
                        <el-table-column prop="device_name" label="设备名" align="center"> </el-table-column>
                        <el-table-column prop="craft_name" label="加工工艺" align="center"> </el-table-column>
                        <el-table-column prop="isOnLine" label="是否联网" align="center">
                            <slot slot-scope="scope">
                                <span>
                                    {{ scope.row.isOnLine ? '是' : '否' }}
                                </span>
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
    </div>
</template>

<script>
import { DeviceList } from '@/api/api';
import { CraftList } from '@/api/base';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            total: 0,
            tableHeight: 0,
            selectStatus: [],
            compPamagy: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            },
            ssVal: ''
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getDeviceList2();

        this.getCraftList();
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
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getDeviceList2();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getDeviceList2();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        getDeviceList2() {
            this.compPama.BaseID = this.ssVal;
            DeviceList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    console.log(this.tableData, 'this.tableData=====');
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getDeviceList2();
        },
        getCraftList() {
            CraftList(this.compPamagy).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.selectStatus = Data;
                    // console.log(Data,'===data');
                }
            });
        }
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
</style>