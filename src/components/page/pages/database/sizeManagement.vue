<template>
    <div class="">
        <!-- <div class="orderTop">
            数据库<span class="dayu">></span><span style="cursor: pointer" @click="jump()" class="nextchuang">标准件库</span
            ><span class="dayu">></span><span class="nextchuang">尺寸管理</span>
        </div> -->
        <div class="orderCont" style="padding-bottom: 0px">
            <div flex="cross:center main:justify" class="dialogclass">
                <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加尺寸</el-button> -->

                <!-- <div> -->
                <el-form ref="form" :inline="true" :model="form" label-width="60px">
                    <!-- <div flex="cross:center main:justify"> -->
                    <el-form-item label="尺寸：">
                        <el-input v-model="chicun" placeholder="请输入尺寸"></el-input>
                    </el-form-item>
                    <el-form-item label="价格：">
                        <el-input v-model="price" @change="jiagezheng" type="number" placeholder="请输入价格"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="dioSave" @click="saveDio">{{ saveSure == 0 ? '添加' : '保存' }}</el-button>
                        <el-button class="dioSave cancelBtn" @click="quxiao" v-show="saveSure == 1">取消</el-button>
                    </el-form-item>
                    <!-- </div> -->
                    <!-- <el-form-item label="标准件：">
                            <div flex="cross:center">
                                <el-select v-model="typeVal" disabled filterable placeholder="请选择/输入">
                                    <el-option v-for="(ty, i) in typeList" :key="i" :label="ty.name" :value="ty.id"></el-option>
                                </el-select>
                            </div>
                        </el-form-item> -->
                </el-form>
                <!-- </div> -->
            </div>

            <div class="orderTable" style="margin: 0px 0 40px 0">
                <div class="tableod">
                    <el-table
                        :data="tableData"
                        max-height="400"
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
                        <el-table-column prop="name" label="标准件尺寸" align="center"> </el-table-column>
                        <el-table-column prop="price" label="价格" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="tablePage dioPage diopagees">
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
            <el-dialog :title="dioName" :visible.sync="addLx" width="500px" :close-on-click-modal="false" :append-to-body="true">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="标准件：">
                            <div flex="cross:center">
                                <el-select v-model="typeVal" disabled filterable placeholder="请选择/输入">
                                    <el-option v-for="(ty, i) in typeList" :key="i" :label="ty.name" :value="ty.id"></el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                        <el-form-item label="尺寸：">
                            <el-input v-model="chicun" type="number" placeholder="请输入尺寸"></el-input>
                        </el-form-item>
                        <el-form-item label="价格：">
                            <el-input v-model="price" @change="jiagezheng" type="number" placeholder="请输入价格"></el-input>
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
import { PartSpecList, AddPartSpec, ModifyPartSpec, DeletePartSpec, PartList } from '@/api/base';
export default {
    components: {},
    props: {
        guigeID: {
            type: Number,
            default: 0
        }
    },
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
            chicun: '',
            price: '',
            saveSure: 0,
            total: 0,
            rowID: 0,
            dioName: '',
            typeVal: '',
            typeList: []
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getPartSpecList();
    },
    methods: {
        number(e) {
            let flag = new RegExp('^[1-9]([0-9])*$').test(e.target.value);

            if (!flag) {
                this.$message({
                    showClose: true,

                    message: '请输入正整数',

                    type: 'warning'
                });
            }
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getPartSpecList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getPartSpecList();
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
        },
        addleixing() {
            // this.addLx = true;
            // this.getPartList();
            this.dioName = '添加尺寸';
            this.saveSure = 0;
            this.chicun = '';
            this.price = '';
            this.typeVal = '';
        },
        detailClick(row) {
            // this.addLx = true;
            // this.getPartList();
            this.dioName = '编辑尺寸';
            this.saveSure = 1;
            this.rowID = row.id;
            this.chicun = row.name;
            this.price = row.price;
            this.typeVal = row.part_id;
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
                    DeletePartSpec(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getPartSpecList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此规格已被设计管理创建');
                        }
                    });
                })
                .catch(() => {});
        },
        getPartSpecList() {
            this.compPama.BaseID = this.guigeID;
            PartSpecList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getPartSpecList();
        },

        saveDio() {
            // if (this.typeVal == '') {
            //     this.$message.warning('请选择标准件');
            //     return;
            // }
            if (this.chicun == '') {
                this.$message.warning('请输入尺寸');
                return;
            }
            if (this.price == '') {
                this.$message.warning('请输入价格');
                return;
            }
            if (this.price < 0) {
                this.$message.warning('请输入正整数');
                this.price = '';
                return;
            }

            let params = {
                name: this.chicun,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                part_id: this.guigeID,
                L: 0,
                W: 0,
                H: 0,
                price: this.price ? this.price : 0
            };
            if (this.saveSure == 0) {
                AddPartSpec(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.addLx = false;
                        this.getPartSpecList();
                    }
                });
            } else {
                params.id = this.rowID;
                ModifyPartSpec(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.addLx = false;
                        this.getPartSpecList();
                        this.addleixing();
                    }
                });
            }
            this.addleixing();
        },
        getPartList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            PartList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.typeList = Data;
                    this.typeVal = this.guigeID;
                }
            });
        },
        jump() {
            this.$router.go(-1);
        },
        jiagezheng() {
            if (this.price < 0) {
                this.$message.warning('请输入正整数');
            }
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
<style lang='scss'>
.diopagees {
    right: 45px !important;
}
</style>
