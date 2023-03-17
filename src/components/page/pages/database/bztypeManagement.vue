<template>
    <div class="container">
        <div class="orderTop">
            数据库<span class="dayu">></span><span style="cursor: pointer" @click="jump()" class="nextchuang">标准件库</span
            ><span class="dayu">></span><span class="nextchuang">类型管理</span>
        </div>
        <div class="orderCont" style="padding-bottom: 0px">
            <div :class="[saveSure == 1 ? 'checkBorder' : '']">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ saveSure == 0 ? '添加' : '编辑' }}类型</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                        <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button>
                    </div> -->
                </div>
                <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                    <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加类型</el-button> -->
                    <div class="dialogclass typeBottom">
                        <el-form ref="form" :inline="true" :model="form" label-width="50px">
                            <el-form-item label="类型：">
                                <el-input v-model="formName" maxlength="20" ref="inputes" placeholder="请输入类型名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                                <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="tableTop" flex="cross:center ">
                <div style="width: 150px">类型列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="detailSearch marr" flex="cross:center ">
                        <el-input v-model="compPama.QueryString" clearable placeholder="请输入类型名称"></el-input>
                        <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
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
                        <el-table-column prop="name" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
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
                        <el-form-item label="类型：">
                            <el-input v-model="formName" placeholder="请输入类型名称"></el-input>
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
import { PartTypeList, AddPartType, ModifyPartType, DeletePartType } from '@/api/base';
export default {
    components: {},
    data() {
        return {
            orderVal: '',
            tableData: [],
            currentPage: 1,
            addLx: false,
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
            dioName: '',
            saveSure: 0,
            total: 0,
            rowID: 0,
            formName: '',
            highCurrent: true,
            tableHeight: 0
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
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
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getPartTypeList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getPartTypeList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        quxiao() {
            this.addleixing();
            this.highCurrent = false;
        },
        addleixing() {
            // this.addLx = true;
            this.dioName = '添加类型';
            this.saveSure = 0;
            this.formName = '';
        },
        detailClick(row) {
            // this.addLx = true;
            this.dioName = '编辑类型';
            this.saveSure = 1;
            this.rowID = row.id;
            this.formName = row.name;
            this.$refs.inputes.focus();
            this.$nextTick(() => {
                this.$refs.inputes.select();
            });
            this.highCurrent = true;
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
                    DeletePartType(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getPartTypeList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此标准件类型已被创建标准件');
                        }
                    });
                })
                .catch(() => {});
        },
        getPartTypeList() {
            PartTypeList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getPartTypeList();
        },
        saveDio() {
            if (this.formName == '') {
                this.$message.warning('请输入类型名称');
                return;
            }
            let params = {
                name: this.formName,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id')
            };
            if (this.saveSure == 0) {
                AddPartType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.addLx = false;
                        this.getPartTypeList();
                        this.formName = '';
                    }
                });
            } else {
                params.id = this.rowID;
                ModifyPartType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.addLx = false;
                        this.getPartTypeList();
                        this.addleixing();
                    }
                });
            }
        },
        jump() {
            this.$router.go(-1);
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