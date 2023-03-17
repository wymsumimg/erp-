<template>
    <div class="container">
        <title-name></title-name>
        <div class="orderCont">
            <div flex="cross:center main:right">
                <div class="orderSearch" flex="main:right">
                    <el-form :inline="true">
                        <el-form-item label="设备名：">
                            <el-select v-model="compPama.BaseID" @change="checksbId" placeholder="请选择设备">
                                <el-option v-for="item in shebeiList" :key="item.device_id" :label="item.name" :value="item.device_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                        </el-form-item> -->
                    </el-form>
                </div>
            </div>

            <div class="orderTable mart" >
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
                        <el-table-column prop="order_code" label="订单号" align="center"> </el-table-column>
                        <el-table-column prop="order_name" label="模具名称" align="center"> </el-table-column>
                        <el-table-column prop="bomType_name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="bom_name" label="料号" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="begintime" label="加工开始时间" align="center" width="180"> </el-table-column>
                        <el-table-column prop="endtime" label="结束时间" align="center" width="180"> </el-table-column>
                        <el-table-column prop="programCount" label="代码数量" align="center"> </el-table-column>
                        <el-table-column prop="endCount" label="完成数量" align="center"> </el-table-column>
                        <el-table-column prop="status" label="状态" align="center">
                            <slot slot-scope="scope">
                                <span :style="{ color: $global.statusColor[scope.row.status] }">{{ getStatus(scope.row.status) }}</span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" align="center" width="250">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div @click="seeClick(scope.row)" style="margin-right: 20px" class="caozuoStyle">查看代码</div>
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
            <el-dialog :title="dioName" :visible.sync="addLx" width="500px">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="类型名称：">
                            <el-input v-model="formName" placeholder="请输入模具类型名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { DeviceList } from '@/api/base';
import { WorkList } from '@/api/worker';
import { ProgramFileList } from '@/api/api';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            addLx: false,
            form: {},
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                BaseID: ''
            },
            dioName: '',
            saveSure: 0,
            total: 0,
            rowID: 0,
            formName: '',
            shebeiList: [],
            daimaName: '',
            isWorking: 0,
            tableHeight: 0
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        // this.getWorkList();
        this.getDeviceList();
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
            this.getWorkList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getWorkList();
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
            this.addLx = true;
            this.dioName = '添加模具类型';
            this.saveSure = 0;
            this.formName = '';
        },
        detailClick(row) {
            this.addLx = true;
            this.dioName = '编辑模具类型';
            this.saveSure = 1;
            this.rowID = row.id;
            this.formName = row.name;
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
                    DeleteMoldType(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getWorkList();
                        }
                    });
                })
                .catch(() => {});
        },
        getDeviceList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            DeviceList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.shebeiList = Data;
                    if (localStorage.getItem('sbId')) {
                        this.compPama.BaseID = Number(localStorage.getItem('sbId'));
                    } else {
                        this.compPama.BaseID = Data[0].device_id;
                    }
                    this.getWorkList();
                }
            });
        },
        getWorkList() {
            WorkList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data.workList;
                    this.isWorking = Data.isWorking;
                    this.total = PageCount;

                    // if(this.tableData.length>0){
                    //         let params= {
                    //             CP_ID: localStorage.getItem('comp_id'),
                    //             EndablePager: 0,
                    //             BaseID:this.tableData[0].id
                    //         }
                    //         ProgramFileList(params).then((res) => {
                    //             let { ReturnCode, Data } = res;
                    //             if (ReturnCode == 200) {
                    //                 for(let i=0;i<Data.length;i++){
                    //                     if(Data[i].status==1){
                    //                         this.daimaName=Data[i].name
                    //                     }
                    //                 }
                    //             }
                    //         });
                    // }
                }
            });
        },
        searchBtn() {
            this.getWorkList();
        },
        saveDio() {
            if (this.formName == '') {
                this.$message.warning('请输入模具类型名称');
                return;
            }
            let params = {
                name: this.formName,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id')
            };
            if (this.saveSure == 0) {
                AddMoldType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.addLx = false;
                        this.getWorkList();
                    }
                });
            } else {
                params.id = this.rowID;
                ModifyMoldType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.addLx = false;
                        this.getWorkList();
                    }
                });
            }
        },
        seeClick(row) {
            this.$router.push(`/seeDaima?BaseID=${row.id}&&deviceId=${this.compPama.BaseID}&&isWorking=${this.isWorking}`);
        },
        getStatus(status) {
            if (status == 0) {
                return '待加工';
            } else if (status == 1) {
                return '加工中';
            } else if (status == 2) {
                return '加工完成';
            } else if (status == 3) {
                return '准备加工';
            } else if (status == 4) {
                return '加工暂停';
            }
        },
        checksbId() {
            localStorage.setItem('sbId', this.compPama.BaseID);
            this.searchBtn()
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
<style lang='scss'>
    .orderSearch{
        .el-form--inline .el-form-item{
            margin-right: 0;
        }
    }
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
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
</style>