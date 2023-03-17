<template>
    <div class="container">
        <!-- BOM组 -->

        <!-- <div class="orderTop">BOM组</div> -->
        <title-name></title-name>
        <div class="orderCont">
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 150px; text-align: left">BOM设计列表</div>
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
                        <el-table-column prop="order_code" label="订单号" align="center" width="130"> </el-table-column>
                        <el-table-column prop="name" label="模具名称" show-overflow-tooltip align="center" width="150"> </el-table-column>
                        <el-table-column prop="pic1" label="造型图纸" align="center" width="280">
                            <slot slot-scope="scope">
                                <div class="selimgBox" flex=" cross:center">
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic1">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic1)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                        <!-- <div class="tableImgZhan" v-else>
                                            <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                        </div> -->
                                    </div>

                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic2">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic2)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                        <!-- <div class="tableImgZhan" v-else>
                                            <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                        </div> -->
                                    </div>
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic3">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic3)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                        <!-- <div class="tableImgZhan" v-else>
                                            <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                        </div> -->
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>

                        <el-table-column prop="ctTime" label="创建时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="交付时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="address" label="订单状态" align="center" width="140">
                            <slot slot-scope="scope">
                                <span>
                                    <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                        getStatus[scope.row.status]
                                    }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="remark" label="订单说明" show-overflow-tooltip align="center" width="250"> </el-table-column>

                        <el-table-column prop="address" label="操作" align="center" width="140">
                            <slot slot-scope="scope">
                                <div flex=" main:center">
                                    <!-- <div @click="create(scope.row)" class="caozuoStyle" :style="{color:scope.row.status==0?'#345AFF':'#999'}">创建</div> -->
                                    <!-- :style="{color:scope.row.status==1?'#345AFF':'#999'}" -->
                                    <div>
                                        <el-tooltip v-if="!btn[15]" content="没有权限，不能操作" placement="top">
                                            <div  style="color: #999" class="caozuoStyle">{{ scope.row.status == 0 ? '创建' : '编辑' }}</div>
                                        </el-tooltip>
                                        <div v-else @click="edit(scope.row)" class="caozuoStyle">{{ scope.row.status == 0 ? '创建' : '编辑' }}</div>
                                    </div>
                                    
                                    <!-- <div @click="delBtn(scope.row)" class="caozuoStyle" style="color:#E6331D">删除</div> -->
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
        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
    </div>
</template>

<script>
import { BomList, AddBom } from '@/api/design';
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
                    id: 1,
                    name: '设计完成订单'
                },
                {
                    id: 0,
                    name: '待设计订单'
                },
                {
                    id: '',
                    name: '全部订单'
                }
            ],
            getStatus: {
                0: '待设计',
                1: '设计完成'
            },
            statusColor: {
                0: '#FFA300',
                1: '#18a837'
            },
            ssVal: '',
            seeDaima: '',
            imgBigTu: '',
            dialogVisible: false,
            tableHeight: 0,
            btn: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getBomList();
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
        this.btn = this.rightControl();
    },
    methods: {
        dioClose(val) {
            this.dialogVisible = val;
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getBomList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getBomList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },

        getBomList() {
            this.compPama.status = this.ssVal;
            BomList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getBomList();
        },
        bigImg(img) {
            this.imgBigTu = this.seeDaima + 'Files/ProgramPic/' + img;
            console.log(img);
            this.dialogVisible = true;
        },
        delBtn() {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {})
                .catch(() => {});
        },
        // create(row){
        //     if(row.status!=0){
        //         return
        //     }
        //     let params={
        //         "cp_id":localStorage.getItem('comp_id'),
        //         "order_id":row.order_id,
        //         "design_id":row.design_id,
        //         "user_id":localStorage.getItem('user_id')
        //     }
        //     AddBom(params).then(res=>{
        //         let { ReturnCode, Data } = res;
        //         if (ReturnCode == 200) {
        //             console.log(Data);
        //             this.$router.push(`/bomCreateEdit?DataId=${Data}&&designId=${row.design_id}&&name=0&&order_id=${row.order_id}`)
        //         }
        //     })

        // },
        edit(row) {
            // this.$router.push(`/bomCreateEdit?DataId=${row.bom_id?row.bom_id:0}&&designId=${row.design_id}&&name=1&&order_id=${row.order_id}`)

            this.$router.push({
                path: '/bomCreateEdit',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
