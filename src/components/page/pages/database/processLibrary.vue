<template>
    <div class="container">
        <title-name></title-name>
        <div class="orderCont">
            <!-- <div > -->
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 300px; text-align: left" flex ="cross:center">
                    工艺流程库列表
                    
                    <div style="margin-left:20px;">
                        <el-tooltip v-if="!btn[38]" content="没有权限，不能操作" placement="top">
                            <el-button style="background: #999" class="butn" >添加工艺流程</el-button>
                        </el-tooltip>
                         <el-button v-else class="butn" @click="addleixing">添加工艺流程</el-button>
                    </div>
                </div>

                <div flex="cross:center">
                    <el-input v-model="compPama.QueryString" clearable placeholder="请输入工艺名称"></el-input>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
            </div>
            <!-- </div> -->

            <div class="orderTable mart">
                <div class="tableod">
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
                        <el-table-column prop="name" label="工艺流程名称" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="工艺流程" align="center"> </el-table-column>
                        <el-table-column prop="" label="时间区间(总和)" align="center" width="180">
                            <slot slot-scope="scope">
                                <span>{{ scope.row.minTime }}-{{ scope.row.maxTime }}</span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div>
                                        <el-tooltip v-if="!btn[38]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">编辑</div>
                                        </el-tooltip>
                                        <div v-else @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    </div>
                                    <div>
                                        <el-tooltip v-if="!btn[39]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999; margin-left: 30px" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <div v-else @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
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
        <div class="dialogclass">
            <el-dialog :title="dioName" :visible.sync="addLxDio" width="800px">
                <div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="流程名称：">
                            <el-input v-model="formName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="工艺流程：">
                            <!-- <div class="chuansuo">
                                <el-transfer
                                    v-model="gyDataVal"
                                    :data="gyData"
                                    :titles="[' ', ' ']"
                                    :button-texts="['删除', '添加']"
                                    @change="changegy"
                                    @left-check-change="leftChange"
                                    @right-check-change="rightChange"
                                ></el-transfer>
                            </div> -->
                            <div class="chuansuoKuang" flex="cross:center">
                                <div class="cskLeft">
                                    <ul>
                                        <li
                                            v-for="(gy, i) in gyData"
                                            :key="i"
                                            :class="currentIndex == i ? 'activeIndex' : ''"
                                            @dblclick="dblclickadd(gy, i)"
                                            @click="clickLi(gy, i)"
                                        >
                                            {{ gy.name }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="csk" flex-wrap>
                                    <div class="cskBtn" @click="addChuansuo()">添加 <i class="el-icon-arrow-right"></i></div>
                                    <div class="cskBtn" style="margin-top: 20px" @click="deleteChuansuo()">
                                        <i class="el-icon-arrow-left"></i>删除
                                    </div>
                                </div>
                                <div class="cskLeft cskRight">
                                    <ul>
                                        <li
                                            v-for="(xg, i) in xiugaiList"
                                            :key="i"
                                            :class="currentIndexxg == i ? 'activeIndex' : ''"
                                            @dblclick="dblclickdel(xg, i)"
                                            @click="clickLixg(xg, i)"
                                        >
                                            {{ xg.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="saveDio()">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { ProcessFlowList, AddProcessFlow, ModifyProcessFlow, ProcessFlowDetialList, CraftList, DeleteProcessFlow } from '@/api/base';
export default {
    components: {},
    data() {
        return {
            orderVal: '',
            tableData: [],
            currentPage: 1,
            addLxDio: false,
            form: {},
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            total: 0,
            gyData: [],
            gyDataVal: [],
            dioName: '',
            saveSure: 0,
            formName: '',
            currentIndex: -1,
            xiugaiList: [],
            currentIndexxg: -1,
            tableHeight: 0,
             btn: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getProcessFlowList();
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
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getProcessFlowList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getProcessFlowList();
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
            this.$router.push('/detail?page=1');
        },
        addleixing() {
            this.addLxDio = true;
            this.gyData = [];
            this.xiugaiList = [];
            this.getCraftList();
            this.dioName = '添加工艺流程';
            this.saveSure = 0;
            this.formName = '';
            this.currentIndex = -1;
            this.currentIndexxg = -1;
        },
        detailClick(row) {
            this.addLxDio = true;
            this.gyData = [];
            this.xiugaiList = [];
            this.getCraftList(row);
            this.dioName = '编辑工艺流程';
            this.saveSure = 1;
            this.rowID = row.id;
            this.formName = row.name;
            this.currentIndex = -1;
            this.currentIndexxg = -1;
        },

        searchBtn() {
            this.getProcessFlowList();
        },
        delClick(row) {
            this.$confirm('确定要删除此项吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteProcessFlow(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getProcessFlowList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此工艺流程已被设计管理创建');
                        }
                    });
                })
                .catch(() => {});
        },
        getProcessFlowList() {
            ProcessFlowList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        saveDio() {
            if (this.formName == '') {
                this.$message.warning('请输入流程名称');
                return;
            }
            if (this.xiugaiList.length < 1) {
                this.$message.warning('请添加至少一项工艺');
                return;
            }
            // if (this.xiugaiList.length < 2) {
            //     this.$message.warning('请添加至少两个工艺');
            //     return;
            // }
            // let gycheckList=[]
            // for(let i=0;i<this.gyData.length;i++){
            //     for(let j=0;j<this.gyDataVal.length;j++){
            //         if(this.gyData[i].id==this.gyDataVal[j]){
            //             gycheckList.push(this.gyData[i])
            //         }
            //     }
            // }

            if (this.saveSure == 0) {
                let copyData = JSON.parse(JSON.stringify(this.xiugaiList));
                for (let i = 0; i < copyData.length; i++) {
                    copyData[i].m_order = i + 1;
                    copyData[i].craft_id = copyData[i].id;

                    copyData[i].processFlow_id = 0;
                }
                for (let i = 0; i < copyData.length; i++) {
                    copyData[i].id = 0;
                }
                let params = {
                    processFlow: {
                        name: this.formName,
                        cp_id: localStorage.getItem('comp_id'),
                        user_id: localStorage.getItem('user_id')
                    },
                    processFlowDetial: copyData
                };
                AddProcessFlow(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.addLxDio = false;
                        this.getProcessFlowList();
                    }
                });
            } else {
                for (let i = 0; i < this.xiugaiList.length; i++) {
                    this.xiugaiList[i].m_order = i + 1;
                    if (!this.xiugaiList[i].craft_id) {
                        this.xiugaiList[i].craft_id = this.xiugaiList[i].id;
                    }
                    this.xiugaiList[i].processFlow_id = this.xiugaiList[i].id;
                }

                let params = {
                    processFlow: {
                        name: this.formName,
                        cp_id: localStorage.getItem('comp_id'),
                        user_id: localStorage.getItem('user_id'),
                        id: this.rowID
                    },
                    processFlowDetial: this.xiugaiList
                };
                console.log(JSON.stringify(params), '===');
                // params.id = this.rowID;
                ModifyProcessFlow(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.addLxDio = false;
                        this.getProcessFlowList();
                    }
                });
            }
        },
        getCraftList(row) {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            CraftList(params).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.gyData = Data;

                    console.log(Data, 'data');
                    console.log(this.gyData, 'gydata');
                    if (row) {
                        this.getdetailProcess(row);
                    }

                    // for (let i = 0; i < this.gyData.length; i++) {
                    //     this.gyData[i].key = this.gyData[i].id;
                    //     this.gyData[i].label = i+this.gyData[i].name;
                    //     this.gyData[i].disabled = false;
                    // }
                }
            });
        },
        getdetailProcess(row) {
            // 获取详细流程
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                baseID: row.id
            };
            ProcessFlowDetialList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    // this.xiugaiList = [];
                    this.xiugaiList = Data;
                    // let gy = [];

                    // for (let i = 0; i < this.gyData.length; i++) {
                    //     for (let j = 0; j < Data.length; j++) {
                    //         if (this.gyData[i].id == Data[j].craft_id) {
                    //             gy.push(this.gyData[i].id)
                    //             this.xiugaiList.push(this.gyData[i])
                    //         }
                    //     }
                    // }
                    // for(let i=0;i<this.gyData.length;i++){
                    //     for(let j = 0; j < gy.length; j++){
                    //         if(this.gyData[i].id==gy[j]){
                    //             this.gyData.splice(i, 1);
                    //         }
                    //     }
                    // }
                }
            });
        },
        changegy() {},
        leftChange() {},
        rightChange() {},
        addChuansuo() {
            if (this.currentIndex != -1) {
                if (this.saveSure == 0) {
                    if (this.xiugaiList.length > 0) {
                        if (this.xiugaiList[this.xiugaiList.length - 1].id == this.gyData[this.currentIndex].id) {
                            return this.$message.warning('不可添加相邻的相同工艺');
                        }
                    }
                } else {
                    if (this.xiugaiList.length > 0) {
                        let numcraft_id = this.xiugaiList[this.xiugaiList.length - 1].craft_id;
                        let numid = this.xiugaiList[this.xiugaiList.length - 1].id;
                        if ((numcraft_id ? numcraft_id : numid) == this.gyData[this.currentIndex].id) {
                            return this.$message.warning('不可添加相邻的相同工艺');
                        }
                    }
                }

                this.xiugaiList.push(this.gyData[this.currentIndex]);
                // this.gyData.splice(this.currentIndex, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        deleteChuansuo() {
            if (this.currentIndexxg != -1) {
                // this.gyData.push(this.xiugaiList[this.currentIndexxg]);
                this.xiugaiList.splice(this.currentIndexxg, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        clickLi(gy, i) {
            this.currentLeftId = gy.id;
            this.currentIndex = i;
        },
        clickLixg(xg, i) {
            // this.currentRightId=xg.craft_id
            this.currentIndexxg = i;
        },
        dblclickadd(gy, i) {
            this.currentLeftId = gy.id;
            this.addChuansuo();
        },
        dblclickdel(xg, i) {
            // this.currentRightId=xg.craft_id
            this.deleteChuansuo();
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