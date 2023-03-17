<template>
    <div class="container">
        <!-- 订单列表 -->

        <div class="orderTop">设计列表</div>
        <div class="orderCont">
            <div class="orderSearch" flex="main:right">
                <div flex class="osselect">
                    <el-select v-model="ssVal" clearable placeholder="请选择是否创建" @change="searchBtn()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="compPama.QueryString" clearable placeholder="请输入模具名称"></el-input>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
            </div>
            <div class="orderTable mart">
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
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="订单号" align="center"> </el-table-column>

                        <el-table-column prop="amount" label="模具数量" align="center"> </el-table-column>
                        <el-table-column prop="order_name" label="模具名称" align="center"> </el-table-column>
                        <el-table-column prop="buyer_name" label="客户名称" align="center"> </el-table-column>
                        <el-table-column prop="pic1" label="图片一" align="center">
                            <slot slot-scope="scope">
                                <div v-if="scope.row.pic1">
                                    <img
                                        :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                        @click="bigImg(scope.row.pic1)"
                                        class="imgPic"
                                        alt=""
                                    />
                                </div>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="pic2" label="图片二" align="center">
                            <slot slot-scope="scope">
                                <div v-if="scope.row.pic2">
                                    <img
                                        :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                        @click="bigImg(scope.row.pic2)"
                                        class="imgPic"
                                        alt=""
                                    />
                                </div>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="testTime" label="试模时间" align="center" width="180"> </el-table-column>
                        <el-table-column prop="endTime" label="交付时间" align="center" width="180"> </el-table-column>
                        <el-table-column prop="address" label="状态" align="center">
                            <slot slot-scope="scope">
                                <span>
                                    <span class="designColored" v-if="scope.row.id > 0">已创建</span>
                                    <span class="designColor" v-else>待创建</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div @click="handleClick(scope.row)" class="caozuoStyle">详情</div>
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
        <div class="eldialogImg">
            <el-dialog title="" :visible.sync="dialogVisible" width="800px">
                <span>
                    <img :src="imgBigTu" class="imgbigCals" alt="" />
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { DesignList } from '@/api/design';
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
            selectStatus: [
                {
                    id: 0,
                    name: '已创建订单'
                },
                {
                    id: -1,
                    name: '待创建订单'
                },
                {
                    id: '',
                    name: '全部订单'
                }
            ],
            ssVal: '',
            seeDaima: '',
            imgBigTu: '',
            dialogVisible: false,
            tableHeight: 0
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getDesignList();
        this.seeDaima = localStorage.getItem('seeDaima');
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
        handleClick(row) {
            if (row.id > 0) {
                this.$router.push(
                    `/detail?page=3&&baseId=${row.id ? row.id : 0}&&code=${row.code}&&amount=${row.amount}&&order_name=${
                        row.order_name
                    }&&buyer_name=${row.buyer_name}&&testTime=${row.testTime}&&endTime=${row.endTime}&&order_id=${row.order_id}&&pic1=${
                        row.pic1
                    }&&pic2=${row.pic2}`
                );
            } else {
                this.$router.push(
                    `/detail?page=2&&baseId=${row.id ? row.id : 0}&&code=${row.code}&&amount=${row.amount}&&order_name=${
                        row.order_name
                    }&&buyer_name=${row.buyer_name}&&testTime=${row.testTime}&&endTime=${row.endTime}&&order_id=${row.order_id}&&pic1=${
                        row.pic1
                    }&&pic2=${row.pic2}`
                );
            }
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
        },
        bigImg(img) {
            this.imgBigTu = this.seeDaima + 'Files/ProgramPic/' + img;
            console.log(img);
            this.dialogVisible = true;
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