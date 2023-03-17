<template>
    <div class="container yichu">
        <!-- 订单列表 -->

        <div class="orderTop">{{ shangPage }}<span class="dayu">></span><span class="nextchuang">详情</span></div>
        <div class="orderCont">
            <div class="jibenziliao">
                <div class="tableTop" style="margin-top: 0">基本资料</div>
                <div class="zlTable">
                    <table class="tableClass" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="nameLeft">订单号：</td>
                            <td class="nameRight">1634739890</td>
                            <td class="nameLeft">模具编号：</td>
                            <td class="nameRight">Y01-ZDY-10</td>
                            <td class="nameLeft">模具名称：</td>
                            <td class="nameRight">折叠椅</td>
                        </tr>
                        <tr>
                            <td class="nameLeft">客户名称：</td>
                            <td class="nameRight">1634739890</td>
                            <td class="nameLeft">试模时间：</td>
                            <td class="nameRight">Y01-ZDY-10</td>
                            <td class="nameLeft">交付时间：</td>
                            <td class="nameRight">折叠椅</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div>
                        <span>料号信息</span>
                        <el-button class="buttonAdd" @click="addLiaoHao()">添加料号</el-button>
                    </div>
                    <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="orderVal" placeholder="请输入料号编号/名称"></el-input>
                        <el-button class="orderBtn mar20">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax">
                    <el-table
                        :data="tableData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center"> </el-table-column>
                        <el-table-column prop="name" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="address" label="料号名称" align="center"> </el-table-column>
                        <el-table-column prop="address" label="工艺流程" align="center"> </el-table-column>
                        <el-table-column prop="address" label="图纸" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="handleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]"
                            :page-size="100"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div>
                        <span>原材料信息</span>
                        <el-button class="buttonAdd" @click="addYuancailiao">添加原材料</el-button>
                    </div>
                    <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="orderVal" placeholder="请输入原材料名称"></el-input>
                        <el-button class="orderBtn mar20">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax">
                    <el-table
                        :data="tableData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center"> </el-table-column>
                        <el-table-column prop="name" label="原材料名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料尺寸" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="handleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]"
                            :page-size="100"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div>
                        <span>标准件信息</span>
                        <el-button class="buttonAdd" @click="addBzj">添加标准件</el-button>
                    </div>
                    <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="orderVal" placeholder="请输入标准件名称"></el-input>
                        <el-button class="orderBtn mar20">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax">
                    <el-table
                        :data="tableData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center"> </el-table-column>
                        <el-table-column prop="name" label="标准件名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件尺寸" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="handleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]"
                            :page-size="100"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加料号" :visible.sync="liaohao" width="45%">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="料号名称：">
                                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                            </el-form-item>
                            <el-form-item label="工艺流程：">
                                <div flex="cross:center">
                                    <el-select v-model="form.region" placeholder="请选择">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                    <div class="iconzengjian" flex="cross:center">
                                        <i class="el-icon-circle-plus-outline"></i>
                                        <i class="el-icon-remove-outline"></i>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="">
                                <div class="chuansuo">
                                    <el-transfer
                                        v-model="liaohaoVal"
                                        :data="liaohaoData"
                                        @change="liaohaoChange"
                                        :titles="[' ', ' ']"
                                        :button-texts="['删除', '添加']"
                                    ></el-transfer>
                                </div>
                            </el-form-item>

                            <el-form-item label="上传图纸：">
                                <el-button class="dioSave chooseTz">选择图纸</el-button>
                                <span class="chosebnsi">请选择上传本地图纸</span>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohaoSave">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加原材料" :visible.sync="yuancailiao" width="30%">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="选择料号：">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="原材料名称：">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="尺寸：">
                                <el-input v-model="form.name" placeholder="请输入尺寸"></el-input>
                            </el-form-item>
                            <el-form-item label="类型：">
                                <div flex="cross:center">
                                    <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                    <i
                                        style="margin-left: 20px; cursor: pointer"
                                        class="el-icon-circle-plus-outline"
                                        @click="addLeiXing()"
                                    ></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="数量：">
                                <el-input v-model="form.name" placeholder="请输入原材料数量"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohao = false">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <!-- 添加类型 -->
            <div class="dialogclass">
                <el-dialog title="添加类型" :visible.sync="addLx" width="30%">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="类型：">
                                <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohao = false">添加</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加标准件" :visible.sync="biaozhuanjian" width="30%">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="标准件名称：">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="尺寸：">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类型：">
                                <div flex="cross:center">
                                    <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                    <i
                                        style="margin-left: 20px; cursor: pointer"
                                        class="el-icon-circle-plus-outline"
                                        @click="addLeiXing()"
                                    ></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="数量：">
                                <el-input v-model="form.name" placeholder="请输入原材料数量"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohao = false">保存</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            orderVal: '',
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区'
                }
            ],
            currentPage: 1,
            shangPage: '',
            liaohao: false,
            form: {},
            yuancailiao: false,
            addLx: false,
            biaozhuanjian: false,
            liaohaoData: [
                {
                    key: 1,
                    label: `备选项1`,
                    disabled: false
                },
                {
                    key: 2,
                    label: `备选项3`,
                    disabled: false
                }
            ],
            liaohaoVal: []
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        console.log(this.$route.query.page);
        if (this.$route.query.page == 1) {
            this.shangPage = '订单列表';
        } else if (this.$route.query.page == 2) {
            this.shangPage = '待创建';
        } else if (this.$route.query.page == 3) {
            this.shangPage = '已创建';
        } else if (this.$route.query.page == 4) {
            this.shangPage = '订单统计';
        }
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        handleClick() {},
        addLiaoHao() {
            this.liaohao = true;
        },
        addYuancailiao() {
            this.yuancailiao = true;
        },
        addLeiXing() {
            this.addLx = true;
        },
        addBzj() {
            this.biaozhuanjian = true;
        },
        delClick() {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {});
        },
        liaohaoSave() {
            // 工艺流程直接保存，则直接保存 否则 （如果有新建的流程），则弹出以下提示
            this.$confirm('是否将新建的工艺流程保存到流程库?', '提示', {
                confirmButtonText: '保存',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                })
                .catch(() => {});
        },
        liaohaoChange() {
            console.log(this.liaohaoVal, '====');
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