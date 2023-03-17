<template>
    <div class="container">
        <title-name></title-name>
        <div class="orderCont">
            <div :class="[saveSure == 1 ? 'checkBorder' : '']">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ saveSure == 0 ? '添加' : '编辑' }}标准件</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                        <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button>
                    </div> -->
                </div>
                <div class="addNewKuang dialogclass" flex="cross:center ">
                    <!-- <div > -->
                    <el-form ref="form" :inline="true" :model="form" label-width="50px">
                        <el-form-item label="类型：">
                            <div flex="cross:center">
                                <el-select v-model="typeVal" filterable placeholder="请选择/输入">
                                    <el-option v-for="(ty, i) in typeList" :key="i" :label="ty.name" :value="ty.id"></el-option>
                                </el-select>
                                <!-- <i style="margin-left: 20px; cursor: pointer" class="el-icon-circle-plus-outline" @click="leixingadd()"></i> -->
                            </div>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-input v-model="formName" maxlength="20" ref="inputes" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div flex="cross:center">
                                <div>
                                    <el-tooltip v-if="!btn[44]" content="没有权限，不能操作" placement="top">
                                        <el-button class="dioSave" style="background: #999">{{
                                            saveSure == 0 ? '添加' : '保存'
                                        }}</el-button>
                                    </el-tooltip>
                                    <el-button v-else class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                                </div>

                                <el-button style="margin-left: 10px" class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1"
                                    >取消</el-button
                                >
                            </div>
                            <!-- <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                            <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button> -->
                        </el-form-item>
                        <!-- <el-form-item label="尺寸：">
                            <el-input v-model="form.name" placeholder="请输入尺寸"></el-input>
                        </el-form-item> -->
                    </el-form>
                    <!-- </div> -->
                </div>
            </div>

            <div class="tableTop" flex="cross:center ">
                <div style="width: 150px">标准件列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div>
                        <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加标准件</el-button> -->
                         <el-tooltip v-if="!btn[44]" content="没有权限，不能操作" placement="top">
                            <el-button style="background: #999" class="butn" >类型管理</el-button>
                         </el-tooltip>
                         <el-button v-else class="butn" @click="LXManage()">类型管理</el-button>

                        <!-- <el-button class="butn" style="height: 40px" @click="sizeManage()">尺寸管理</el-button> -->
                    </div>

                    <div class="detailSearch marr" flex="cross:center ">
                        <el-input v-model="compPama.QueryString" clearable placeholder="请输入名称"></el-input>
                        <el-button class="orderBtn" @click="searchBtn">搜索</el-button>
                    </div>
                </div>
            </div>
            <div class="orderTable">
                <div class="tableod">
                    <el-table
                        :highlight-current-row="highCurrent"
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
                        <el-table-column prop="typen_name" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="name" label="标准件名称" align="center"> </el-table-column>
                        <el-table-column prop="specCount" label="规格数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div>
                                        <el-tooltip v-if="!btn[44]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">编辑</div>
                                        </el-tooltip>
                                        <div v-else @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    </div>
                                    <div>
                                        <el-tooltip v-if="!btn[44]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999; margin-left: 30px" class="caozuoStyle">规格</div>
                                        </el-tooltip>
                                        <div v-else @click="guige(scope.row)" style="margin-left: 30px" class="caozuoStyle">规格</div>
                                    </div>

                                    <div>
                                        <el-tooltip v-if="!btn[45]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999; margin-left: 30px" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <div v-else @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                    </div>

                                    <!-- <div @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    
                                    <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div> -->
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
            <el-dialog :title="dioName" :visible.sync="yuancl" width="530px">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="类型：">
                            <div flex="cross:center">
                                <el-select v-model="typeVal" filterable placeholder="请选择/输入">
                                    <el-option v-for="(ty, i) in typeList" :key="i" :label="ty.name" :value="ty.id"></el-option>
                                </el-select>
                                <i style="margin-left: 20px; cursor: pointer" class="el-icon-circle-plus-outline" @click="leixingadd()"></i>
                            </div>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-input v-model="formName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="添加类型" :visible.sync="addLx" width="500px">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="类型：">
                            <el-input v-model="addtypeVal" placeholder="请输入类型名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="addDiolx()">添加</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass bztype">
            <el-dialog :title="'规格' + '<' + ggName + '>'" :visible.sync="addLxcc" :before-close="closeguige" width="1000px">
                <sizeManagement v-if="addOrUpdateVisible" :key="addOrUpdateKey" :guigeID="ggBaseID"></sizeManagement>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { PartList, AddPart, ModifyPart, DeletePart, PartTypeList, AddPartType } from '@/api/base';
import sizeManagement from './sizeManagement.vue';
export default {
    components: {
        sizeManagement
    },
    data() {
        return {
            orderVal: '',
            tableData: [],
            currentPage: 1,
            addLx: false,
            yuancl: false,
            form: {},
            leixingDio: false,
            yuancllX: false,
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            total: 0,
            dioName: '',
            saveSure: 0,
            formName: '',
            typeList: [],
            typeVal: '',
            rowID: 0,
            addtypeVal: '',
            addLxcc: false,
            ggBaseID: 0,
            addOrUpdateVisible: false,
            addOrUpdateKey: 0,
            ggName: '',
            highCurrent: true,
            tableHeight: 0,
            btn: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getPartList();
        this.getPartTypeList();
        this.$nextTick(() => {
            var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (isMac) {
                //your code
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 420;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 420;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 410;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 410;
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
            this.getPartList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getPartList();
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
        quxiao() {
            this.addleixing();
            this.highCurrent = false;
        },
        addleixing() {
            // this.yuancl = true;

            this.dioName = '添加标准件';
            this.saveSure = 0;
            this.formName = '';
            this.typeVal = '';
        },
        detailClick(row) {
            // this.getPartTypeList();
            // this.yuancl = true;
            this.dioName = '编辑标准件';
            this.saveSure = 1;
            this.rowID = row.id;
            this.formName = row.name;
            this.$refs.inputes.focus();
            this.$nextTick(() => {
                this.$refs.inputes.select();
            });
            this.typeVal = row.part_type_id;
            this.highCurrent = true;
        },
        leixingadd() {
            this.addLx = true;
            this.addtypeVal = '';
        },
        LXManage() {
            this.$router.push('/bztypeManagement');
        },
        sizeManage() {
            this.$router.push('/sizeManagement');
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
                    DeletePart(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getPartList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此标准件已被设计管理创建');
                        }
                    });
                })
                .catch(() => {});
        },
        getPartList() {
            PartList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getPartList();
        },
        saveDio() {
            if (this.typeVal == '') {
                this.$message.warning('请选择类型');
                return;
            }
            if (this.formName == '') {
                this.$message.warning('请输入名称');
                return;
            }

            let params = {
                name: this.formName,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                part_type_id: this.typeVal
            };
            if (this.saveSure == 0) {
                AddPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.yuancl = false;
                        this.getPartList();
                        this.formName = '';
                    }
                });
            } else {
                params.id = this.rowID;
                ModifyPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.yuancl = false;
                        this.getPartList();
                        this.addleixing();
                    }
                });
            }
        },
        getPartTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            PartTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.typeList = Data;
                }
            });
        },
        addDiolx() {
            if (this.addtypeVal == '') {
                this.$message.warning('请输入类型名称');
                return;
            }
            let params = {
                name: this.addtypeVal,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id')
            };
            AddPartType(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.addLx = false;
                    this.$message.success('添加成功');
                    this.getPartTypeList();
                }
            });
        },
        guige(row) {
            console.log(row, 'row---');
            this.addLxcc = true;
            this.addOrUpdateVisible = true;
            this.ggBaseID = row.id;
            this.ggName = row.name;
            this.addOrUpdateKey++;
        },
        closeguige() {
            this.addLxcc = false;
            this.getPartList();
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
<style lang='scss'>
.bztype {
    .el-dialog__body {
        padding: 0 0 20px;
    }
}
</style>