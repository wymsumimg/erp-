<template>
    <div class="container">
        <title-name></title-name>
        <div class="orderCont">
            <div :class="[saveSure == 1 ? 'checkBorder' : '']">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>{{ saveSure == 0 ? '添加' : '编辑' }}工艺</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                        <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button>
                    </div> -->
                </div>
                <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                    <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加类型</el-button> -->
                    <div class="dialogclass typeBottom">
                        <el-form ref="form" :inline="true" :model="form" label-width="80px">
                            <!-- <div class="gongyiName"> -->
                            <el-form-item label="工艺名称：">
                                <el-input v-model="formName" maxlength="20" ref="inputes" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="所需时长：">
                                <div flex="cross:center" class="timegongyi">
                                    <el-input v-model="minTime" type="number" @change="dayuLing" placeholder="最少用时"></el-input>m
                                    <span class="fenge" style="margin: 0 18px">-</span>
                                    <el-input v-model="maxTime" type="number" @change="dayuLing" placeholder="最多用时"></el-input>m
                                </div>
                            </el-form-item>
                            <el-form-item label="工作方式：">
                                <el-select v-model="workType" placeholder="" size="small">
                                    <el-option v-for="item in workList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="">
                                <div flex="cross:center">
                                    <div>
                                        <el-tooltip v-if="!btn[35]" content="没有权限，不能操作" placement="top">
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
                            </el-form-item>
                            <!-- </div> -->
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="tableTop" flex="cross:center ">
                <div style="width: 150px">工艺库列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="orderSearches" flex="cross:center ">
                        <el-input v-model="compPama.QueryString" clearable placeholder="请输入工艺名称"></el-input>
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
                        <el-table-column prop="type_name" label="工艺类型" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工艺名称" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工作方式" align="center">
                            <slot slot-scope="scope">
                                <span v-if="scope.row.workType == 0" style="color: #ffa300">手动</span>
                                <span v-if="scope.row.workType == 1" style="color: #2a5389">自动</span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="" label="所需时长" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ scope.row.minTime }}-{{ scope.row.maxTime }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div>
                                        <el-tooltip v-if="!btn[35]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">编辑</div>
                                        </el-tooltip>
                                        <div v-else @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    </div>
                                    <div>
                                        <el-tooltip v-if="!btn[36]" content="没有权限，不能操作" placement="top">
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
            <el-dialog :title="dioName" :visible.sync="addLx" width="500px">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <!-- <el-form-item label="工艺类型：">
                            <el-select v-model="typeVal" filterable placeholder="请选择/输入">
                                <el-option  v-for="(ty,i) in typeList" :key='i' :label="ty.name" :value="ty.id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <!-- flex="cross:center" -->
                        <div class="gongyiName">
                            <el-form-item label="工艺名称：">
                                <el-input v-model="formName" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="所需时长：">
                                <div flex="cross:center" class="timegongyi" style="width: 250px">
                                    <el-input v-model="minTime" type="number" @change="dayuLing" placeholder="最少用时"></el-input>m
                                    <span class="fenge" style="margin: 0 18px">-</span>
                                    <el-input v-model="maxTime" type="number" @change="dayuLing" placeholder="最多用时"></el-input>m
                                </div>
                            </el-form-item>
                        </div>

                        <!-- <div flex="cross:center" class="gongyiName" v-for="(gy, i) in gyList" :key="i">
                            <el-form-item label="工艺名称：">
                                <el-input v-model="gy.name" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="所需时长：">
                                <div flex="cross:center" class="timegongyi">
                                    <el-input v-model="gy.timeLess" type="number" placeholder="最少用时"></el-input>
                                    <span class="fenge">-</span>
                                    <el-input v-model="gy.timeMore" type="number" placeholder="最多用时"></el-input>
                                    <div class="iconzengjian" flex="cross:center">
                                        <i class="el-icon-circle-plus-outline" @click="addList(gy, i)"></i>
                                        <i class="el-icon-remove-outline" v-show="gyList.length > 1" @click="removeList(gy, i)"></i>
                                    </div>
                                </div>
                            </el-form-item>
                        </div> -->
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
import { CraftList, AddCraft, ModifyCraft, DeleteCraft, CraftTypeList } from '@/api/base';
export default {
    components: {},
    data() {
        return {
            orderVal: '',
            tableData: [],
            currentPage: 1,
            addLx: false,
            form: {},
            gyList: [
                {
                    name: '',
                    timeLess: '',
                    timeMore: ''
                }
            ],
            total: 0,
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            maxTime: '',
            minTime: '',
            dioName: '',
            saveSure: 0,
            formName: '',
            typeList: [],
            typeVal: '',
            rowID: 0,
            addtypeVal: '',
            highCurrent: true,
            tableHeight: 0,
            workList: [
                { label: '手动', value: 0 },
                { label: '自动', value: 1 }
            ],
            workType: 0,
            btn: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getCraftList();
        this.getCraftTypeList();
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
        dayuLing() {
            //  let flag = new RegExp('^[1-9]([0-9])*$').test(this.minTime);
            //  let flag2 = new RegExp('^[1-9]([0-9])*$').test(this.maxTime);
            if (this.minTime < 0 || this.maxTime < 0) {
                this.$message({
                    showClose: true,

                    message: '请输入正整数',

                    type: 'warning'
                });
                this.minTime = '';
                this.maxTime = '';
            }
        },
        // number(e) {
        //     let flag = new RegExp('^[1-9]([0-9])*$').test(e.target.value);

        //     if (!flag) {
        //         this.$message({
        //             showClose: true,

        //             message: '请输入正整数',

        //             type: 'warning'
        //         });
        //     }
        // },

        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getCraftList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getCraftList();
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

        addList(gy, i) {
            let params = {
                name: '',
                timeLess: '',
                timeMore: ''
            };
            this.gyList.push(params);
        },
        removeList(gy, i) {
            this.gyList.splice(i, 1);
        },
        searchBtn() {
            this.getCraftList();
        },
        getCraftList() {
            CraftList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
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
                    DeleteCraft(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getCraftList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此工艺已被工艺流程创建');
                            this.getCraftList();
                        }
                    });
                })
                .catch(() => {});
        },
        quxiao() {
            this.addleixing();
            this.highCurrent = false;
        },
        addleixing() {
            // this.addLx = true;

            this.dioName = '添加工艺';
            this.saveSure = 0;
            this.formName = '';
            // this.typeVal=''
            this.minTime = '';
            this.maxTime = '';
            this.workType = 0;
        },
        detailClick(row) {
            // this.addLx = true;
            this.dioName = '编辑工艺';
            this.saveSure = 1;
            this.rowID = row.id;

            this.typeVal = row.craft_type_id;

            this.formName = row.name;
            this.workType = row.workType;
            this.$refs.inputes.focus();
            this.$nextTick(() => {
                this.$refs.inputes.select();
            });

            this.minTime = row.minTime;
            this.maxTime = row.maxTime;
            this.highCurrent = true;
        },
        saveDio() {
            if (this.typeVal == '') {
                this.$message.warning('请选择工艺类型');
                return;
            }
            if (this.formName == '') {
                this.$message.warning('请输入工艺名称');
                return;
            }
            if (this.minTime || this.maxTime) {
                if (Number(this.minTime) > Number(this.maxTime)) {
                    this.$message.warning('最少用时不能大于最多用时');
                    return;
                }
            }
            // if (this.minTime.charAt(0) == '-' || this.maxTimecharAt(0) == '-') {
            //     this.$message.warning('不能为负数！');
            //     return;
            // }

            let params = {
                name: this.formName,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                craft_type_id: this.typeVal,
                minTime: this.minTime == '' ? 0 : this.minTime,
                maxTime: this.maxTime == '' ? 0 : this.maxTime,
                workType: this.workType
            };
            if (this.saveSure == 0) {
                AddCraft(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.addLx = false;
                        this.getCraftList();
                        this.addleixing();
                    }
                });
            } else {
                params.id = this.rowID;
                ModifyCraft(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.addLx = false;
                        this.getCraftList();
                        this.addleixing();
                    }
                });
            }
        },
        getCraftTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            CraftTypeList(params).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.typeList = Data;
                    this.typeVal = this.typeList[0].id;
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