<template>
    <div class="container yichu">
        <!-- 订单列表 -->

        <div class="orderTop">{{ shangPage }}<span class="dayu">></span><span class="nextchuang">详情</span></div>
        <div class="orderCont">
            <div class="jibenziliao">
                <div flex="cross:center" class="tableTop" style="margin-top: 0; border-top: 1px solid #bfc3c6">
                    <div
                        @click="baseShow = !baseShow"
                        :style="{ transform: baseShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                        class="shousuoIconBox"
                        flex="cross:center main:center"
                    >
                        <i class="el-icon-d-arrow-right shousuoIcon"></i>
                    </div>
                    <span>基本资料</span>
                </div>
                <div class="zlTable" v-show="baseShow">
                    <table class="tableClass" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="nameLeft">订单号：</td>
                            <td class="nameRight">{{ code }}</td>
                            <td class="nameLeft">模具编号：</td>
                            <td class="nameRight">{{ amount }}</td>
                            <td class="nameLeft">模具名称：</td>
                            <td class="nameRight">{{ order_name }}</td>
                        </tr>
                        <tr>
                            <td class="nameLeft">客户名称：</td>
                            <td class="nameRight">{{ buyer_name }}</td>
                            <td class="nameLeft">试模时间：</td>
                            <td class="nameRight">{{ testTime }}</td>
                            <td class="nameLeft">交付时间：</td>
                            <td class="nameRight">{{ endTime }}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div>
                        <span>料号信息</span>
                        <el-button class="buttonAdd" @click="addLiaoHao()">添加料号</el-button>
                    </div>
                    <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="请输入料号编号/名称"></el-input>
                        <el-button class="orderBtn mar20" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="料号名称" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺流程" align="center"> </el-table-column>
                        <el-table-column prop="picFile" label="图纸" align="center">
                            <slot slot-scope="scope">
                                <div :class="scope.row.picFile == '' ? 'noyulan' : 'yulan'">
                                    <a :href="scope.row.picFile"></a>
                                    预览
                                </div>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="handleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="lhdelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div> -->
            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="yclShow = !yclShow"
                            :style="{ transform: yclShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>原材料信息</span>
                    </div>
                    <!-- <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="yclParams.QueryString" clearable placeholder="请输入原材料名称"></el-input>
                        <el-button class="orderBtn mar20" @click="yclSearch()">搜索</el-button>
                    </div> -->
                </div>
                <div class="tableod tableMax" v-show="yclShow">
                    <el-table
                        :data="yclData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (yclParams.PageIndex - 1) * yclParams.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="原材料名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="type_name" label="原材料类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料尺寸" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>L:{{ scope.row.L }}-</span>
                                    <span>W:{{ scope.row.W }}-</span>
                                    <span>H:{{ scope.row.H }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="amount" label="原材料数量" align="center"> </el-table-column>
                        <!-- <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="yclhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="ycldelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column> -->
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="yclSizeChange"
                            @current-change="yclCurrentChange"
                            :current-page="yclParams.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="yclParams.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="ycltotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="bzjShow = !bzjShow"
                            :style="{ transform: bzjShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>

                        <span>标准件信息</span>
                    </div>
                    <!-- <div class="orderSearch detailSearch" flex="cross:center">
                        <el-input v-model="bzjParams.QueryString" clearable placeholder="请输入标准件名称"></el-input>
                        <el-button class="orderBtn mar20" @click="bzjSearch()">搜索</el-button>
                    </div> -->
                </div>
                <div class="tableod tableMax" v-show="bzjShow">
                    <el-table
                        :data="bzjData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (bzjParams.PageIndex - 1) * bzjParams.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="标准件名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="typen_name" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="specn_name" label="标准件尺寸" align="center"> </el-table-column>
                        <el-table-column prop="amount" label="标准件数量" align="center"> </el-table-column>
                        <!-- <el-table-column prop="address" label="操作" align="center">
                            <tempalte slot-scope="scope" flex="cross:center main:center">
                                <div @click="bzjhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                <div @click="bzjdelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                            </tempalte>
                        </el-table-column> -->
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="bzjSizeChange"
                            @current-change="bzjCurrentChange"
                            :current-page="bzjParams.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="bzjParams.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="bzjtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加料号" :visible.sync="liaohao" width="500px">
                    <div>
                        <el-form ref="ruleForm" :model="form" :rules="ruleslh" label-width="120px">
                            <el-form-item label="工艺流程：">
                                <div flex="cross:center">
                                    <el-select v-model="gychoose" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in gyprocess" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                    <!-- <div class="iconzengjian" flex="cross:center">
                                        <i class="el-icon-circle-plus-outline" v-show="!showgy"  @click="showlhadd"></i>
                                        <i class="el-icon-remove-outline" v-show="showgy" @click="showlhddel"></i>
                                    </div> -->
                                </div>
                            </el-form-item>
                            <el-form-item label="料号名称：" prop="lhName">
                                <el-input v-model="lhName" placeholder="请输入名称"></el-input>
                            </el-form-item>

                            <!-- <el-form-item label="" v-show="showgy">
                                <div class="chuansuoKuang" flex="cross:center">
                                    <div class="cskLeft">
                                        <ul>
                                            <li
                                                v-for="(gy, i) in gyData"
                                                :key="i"
                                                :class="currentIndex == i ? 'activeIndex' : ''"
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
                                                @click="clickLixg(xg, i)"
                                            >
                                                {{ xg.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-form-item> -->

                            <!-- <el-form-item label="上传图纸：">
                                <el-button class="dioSave chooseTz">选择图纸</el-button>
                                <span class="chosebnsi">请选择上传本地图纸</span>
                            </el-form-item> -->
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohaoSave">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加原材料" :visible.sync="yuancailiao" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="选择料号：">
                                <el-select v-model="lhchoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in liaohaoList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="原材料类型：">
                                <div flex="cross:center">
                                    <el-select v-model="ylxChoose" @change="yclchange" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in yclLiexing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                    <i
                                        style="margin-left: 20px; cursor: pointer"
                                        class="el-icon-circle-plus-outline"
                                        @click="addyclLeiXing()"
                                    ></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="原材料名称：">
                                <el-select v-model="ymcChoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in yclList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="尺寸L：">
                                <el-input v-model="lhL" type="number" placeholder="请输入尺寸长"></el-input>
                            </el-form-item>
                            <el-form-item label="尺寸W：">
                                <el-input v-model="lhW" type="number" placeholder="请输入尺寸宽"></el-input>
                            </el-form-item>
                            <el-form-item label="尺寸H：">
                                <el-input v-model="lhH" type="number" placeholder="请输入尺寸高"></el-input>
                            </el-form-item>

                            <el-form-item label="数量：">
                                <el-input v-model="lhAmount" type="number" placeholder="请输入原材料数量"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="yuancailiaoSave()">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <!-- 添加类型 -->
            <div class="dialogclass">
                <el-dialog title="添加类型" :visible.sync="addLx" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="类型：">
                                <el-input v-model="leixingVal" placeholder="请输入类型名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="addLXVal">添加</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="dialogclass">
                <el-dialog title="添加标准件" :visible.sync="biaozhuanjian" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="选择料号：">
                                <el-select v-model="lhchoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in liaohaoList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标准件类型：">
                                <div flex="cross:center">
                                    <el-select v-model="blchoose" @change="bzchange" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in bzjLeixing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                    <i
                                        style="margin-left: 20px; cursor: pointer"
                                        class="el-icon-circle-plus-outline"
                                        @click="addLeiXing()"
                                    ></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="标准件名称：">
                                <el-select v-model="bmchoose" @change="bzjmcChange" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in bzjList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标准件规格：">
                                <el-select v-model="bgchoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in bzjGuige" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="尺寸L：">
                                <el-input v-model="form.name" placeholder="请输入尺寸长"></el-input>
                            </el-form-item>
                            <el-form-item label="尺寸W：">
                                <el-input v-model="form.name" placeholder="请输入尺寸宽"></el-input>
                            </el-form-item>
                            <el-form-item label="尺寸H：">
                                <el-input v-model="form.name" placeholder="请输入尺寸高"></el-input>
                            </el-form-item> -->

                            <el-form-item label="数量：">
                                <el-input v-model="ycNumber" placeholder="请输入原材料数量"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="yauncaiSave">保存</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {
    BomList,
    AddBom,
    ModifyBom,
    DeleteBom,
    BomMaterialList,
    AddBomMaterial,
    ModifyBomMaterial,
    DeleteBomMaterial,
    BomPartList,
    AddBomPart,
    ModifyBomPart,
    DeleteBomPart
} from '@/api/design';
import {
    MateialList,
    MateialTypeList,
    PartTypeList,
    PartList,
    PartSpecList,
    AddMateialType,
    AddPartType,
    ProcessFlowList,
    CraftList
} from '@/api/base';
export default {
    components: {},
    data() {
        return {
            orderVal: '',
            tableData: [],
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
            code: '',
            baseId: 0,
            amount: '',
            liaohaoVal: [],
            order_name: '',
            buyer_name: '',
            testTime: '',
            endTime: '',
            order_id: '',
            lhParms: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 10,
                QueryString: '',
                BaseID: 0
            },
            yclParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 10,
                QueryString: '',
                BaseID: 0
            },
            bzjParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 10,
                QueryString: '',
                BaseID: 0
            },
            lhData: [],
            lhtotal: 0,
            yclData: [],
            ycltotal: 0,
            bzjData: [],
            bzjtotal: 0,

            liaohaoList: [],
            yclLiexing: [],
            yclList: [],
            bzjLeixing: [],
            bzjList: [],
            bzjGuige: [],

            lhchoose: '',
            ylxChoose: '',
            ymcChoose: '',
            lhL: '',
            lhW: '',
            lhH: '',
            lhAmount: '',

            blchoose: '',
            bmchoose: '',
            bgchoose: '',

            leixingVal: '',
            ycNumber: '',
            typeAddbzj: 0,
            gyprocess: [],
            gychoose: '',
            lhName: '',

            currentIndex: -1,
            xiugaiList: [],
            currentIndexxg: -1,
            gyData: [],
            showgy: false,
            ruleslh: {},
            ziliaoShow: true,
            yclShow: true,
            baseShow: true,
            bzjShow: true
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        if (this.$route.query.page == 1) {
            // this.shangPage = '订单列表';
        } else if (this.$route.query.page == 2) {
            // this.shangPage = '待创建';
        } else if (this.$route.query.page == 3) {
            this.shangPage = '采购列表';
        } else if (this.$route.query.page == 4) {
            // this.shangPage = '订单统计';
        }
        if (localStorage.getItem('baseId')) {
            this.baseId = localStorage.getItem('baseId');
        } else {
            this.baseId = this.$route.query.baseId;
        }

        this.code = this.$route.query.code;
        this.amount = this.$route.query.amount;
        this.order_name = this.$route.query.order_name;
        this.buyer_name = this.$route.query.buyer_name;
        this.testTime = this.$route.query.testTime;
        this.endTime = this.$route.query.endTime;
        this.order_id = this.$route.query.order_id;
        this.getBomList();
        this.getBomMaterialList();
        this.getBomPartList();

        this.nopageBomList();
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        lhSizeChange(val) {
            this.lhParms.PageSize = val;
            this.getBomList();
        },
        lhCurrentChange(val) {
            this.lhParms.PageIndex = val;
            this.getBomList();
        },
        yclSizeChange(val) {
            this.yclParams.PageSize = val;
            this.getBomMaterialList();
        },
        yclCurrentChange(val) {
            this.yclParams.PageIndex = val;
            this.getBomMaterialList();
        },

        bzjSizeChange(val) {
            this.bzjParams.PageSize = val;
            this.getBomPartList();
        },
        bzjCurrentChange(val) {
            this.bzjParams.PageIndex = val;
            this.getBomPartList();
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
            this.liaohao = true;
            this.leixingVal = '';
            this.lhName = row.name;
            this.gychoose = row.processFlow_id;
            this.lhstatus = 1;
            this.rowidlhes = row.id;
            this.rowCode = row.code;
            this.gongyiliucheng();
        },
        addLiaoHao() {
            this.liaohao = true;
            this.leixingVal = '';
            this.lhName = '';
            this.gychoose = '';
            this.lhstatus = 0;
            this.gongyiliucheng();
        },
        gongyiliucheng() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            ProcessFlowList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gyprocess = Data;
                }
            });
        },
        addLeiXing() {
            this.lxtatus = 1;
            this.addLx = true;
        },
        addyclLeiXing() {
            this.lxtatus = 0;
            this.addLx = true;
        },
        addLXVal() {
            if (this.lxtatus == 0) {
                let params = {
                    name: this.leixingVal,
                    cp_id: localStorage.getItem('comp_id'),
                    user_id: localStorage.getItem('user_id')
                };
                AddMateialType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.addLx = false;
                        this.getMateialTypeList();
                    }
                });
            } else {
                let params = {
                    name: this.leixingVal,
                    cp_id: localStorage.getItem('comp_id'),
                    user_id: localStorage.getItem('user_id')
                };
                AddPartType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.addLx = false;
                        this.getPartTypeList();
                    }
                });
            }
        },
        addBzj() {
            this.typeAddbzj = 0;
            this.biaozhuanjian = true;
            this.getPartTypeList();
            this.blchoose = '';
            this.bmchoose = '';
            this.bgchoose = '';
            this.ycNumber = '';
            this.lhchoose = '';
        },
        bzjhandleClick(row) {
            this.typeAddbzj = 1;
            this.bzjrowID = row.id;
            this.leixingVal = '';
            this.biaozhuanjian = true;
            this.getPartTypeList();
            this.bmchoose = row.part_id;
            this.getPartList();
            this.bgchoose = row.part_spec_id;

            this.ycNumber = amount;
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
            if (this.gychoose == '') {
                this.$message.warning('请选择工艺流程');
                return;
            }
            if (this.lhName == '') {
                this.$message.warning('请输入料号名称');
                return;
            }
            if (this.lhstatus == 0) {
                // 添加成功，会返回设计表的ID,如果第一次创建需要将design_id更新
                let params = {
                    cp_id: localStorage.getItem('comp_id'),
                    order_id: this.order_id,
                    design_id: this.baseId,
                    name: this.lhName,
                    processFlow_id: this.gychoose,
                    user_id: localStorage.getItem('user_id')
                };
                AddBom(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加料号成功');
                        this.liaohao = false;
                        // 重新赋值
                        this.baseId = Data;
                        localStorage.setItem('baseId', this.baseId);
                        this.getBomList();

                        // this.getBomMaterialList();
                        // this.getBomPartList();
                    }
                });
            } else {
                let params = {
                    cp_id: localStorage.getItem('comp_id'),
                    order_id: this.order_id,
                    design_id: this.baseId,
                    name: this.lhName,
                    processFlow_id: this.gychoose,
                    user_id: localStorage.getItem('user_id'),
                    id: this.rowidlhes,
                    code: this.rowCode
                };
                ModifyBom(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加编辑成功');
                        this.liaohao = false;
                        this.getBomList();
                    }
                });
            }

            // 工艺流程直接保存，则直接保存 否则 （如果有新建的流程），则弹出以下提示
            // this.$confirm('是否将新建的工艺流程保存到流程库?', '提示', {
            //     confirmButtonText: '保存',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // })
            //     .then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '保存成功!'
            //         });
            //     })
            //     .catch(() => {});
        },

        getBomList() {
            this.lhParms.BaseID = this.baseId;
            BomList(this.lhParms).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.lhData = Data;
                    this.lhtotal = PageCount;
                }
            });
        },
        lhdelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBom(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomList();
                        }
                    });
                })
                .catch(() => {});
        },

        getBomMaterialList() {
            this.yclParams.BaseID = this.baseId;
            BomMaterialList(this.yclParams).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.yclData = Data;
                    this.ycltotal = PageCount;
                }
            });
        },
        ycldelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBomMaterial(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomMaterialList();
                        }
                    });
                })
                .catch(() => {});
        },
        getBomPartList() {
            this.bzjParams.BaseID = this.baseId;
            BomPartList(this.bzjParams).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.bzjData = Data;
                    this.bzjtotal = PageCount;
                }
            });
        },
        bzjdelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBomPart(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomPartList();
                        }
                    });
                })
                .catch(() => {});
        },
        lhSearch() {
            this.getBomList();
        },
        yclSearch() {
            this.getBomMaterialList();
        },
        bzjSearch() {
            this.getBomPartList();
        },
        // 原材料 不分页
        yclchange() {
            this.ymcChoose = '';
            this.getMateialList();
        },
        // 料号  BomList
        nopageBomList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.baseId
            };
            BomList(params).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.liaohaoList = Data;
                }
            });
        },
        // 原材料类型  MateialTypeList
        getMateialTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            MateialTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.yclLiexing = Data;
                }
            });
        },
        //原材料（名称）列表 MateialList
        getMateialList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.ylxChoose
            };
            MateialList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.yclList = Data;
                }
            });
        },

        // 标准件 不分页
        bzchange() {
            this.bmchoose = '';
            this.bgchoose = '';
            this.getPartList();
            // this.getPartSpecList();
        },
        bzjmcChange() {
            this.getPartSpecList();
        },
        // 料号  BomList
        //  标准件类型 PartTypeList
        getPartTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            PartTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjLeixing = Data;
                }
            });
        },
        // 标准件名称 PartList
        getPartList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.blchoose
            };
            PartList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjList = Data;
                }
            });
        },
        // 标准件规格 PartSpecList
        getPartSpecList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.bmchoose
            };
            PartSpecList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjGuige = Data;
                }
            });
        },

        // 添加原材料
        yuancailiaoSave() {
            if (this.lhchoose == '') {
                this.$message.warning('请选择料号');
                return;
            }
            if (this.ylxChoose == '') {
                this.$message.warning('请选择原材料类型');
                return;
            }
            if (this.ymcChoose == '') {
                this.$message.warning('请选择原材料名称');
                return;
            }
            if (this.lhL == '') {
                this.$message.warning('请输入尺寸长');
                return;
            }
            if (this.lhW == '') {
                this.$message.warning('请输入尺寸宽');
                return;
            }
            if (this.lhH == '') {
                this.$message.warning('请输入尺寸高');
                return;
            }
            if (this.lhAmount == '') {
                this.$message.warning('请输入原材料数量');
                return;
            }
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                bom_id: this.lhchoose,
                order_id: this.order_id,
                design_id: this.baseId,
                material_id: this.ymcChoose,
                L: this.lhL,
                W: this.lhW,
                H: this.lhH,
                amount: this.lhAmount,
                mark: '',
                user_id: localStorage.getItem('user_id')
            };
            if (this.typeAddtcl == 0) {
                AddBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('原材料添加成功');
                        this.yuancailiao = false;
                        this.getBomMaterialList();
                    }
                });
            } else {
                params.id = this.bjyclID;
                ModifyBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('原材料编辑成功');
                        this.yuancailiao = false;
                        this.getBomMaterialList();
                    }
                });
            }
        },
        addYuancailiao() {
            this.leixingVal = '';
            this.typeAddtcl = 0;
            this.yuancailiao = true;
            this.typeAddtcl = 0;
            this.ylxChoose = '';
            this.ymcChoose = '';
            this.lhchoose = '';
            this.lhL = '';
            this.lhW = '';
            this.lhH = '';
            this.lhAmount = '';
            this.getMateialTypeList();
            this.nopageBomList();
        },
        // 编辑原材料
        yclhandleClick(row) {
            this.leixingVal = '';
            this.typeAddtcl = 1;
            this.bjyclID = row.id;
            this.yuancailiao = true;
            this.getMateialTypeList();
            this.ylxChoose = row.material_type_id;
            this.getMateialList();
            this.ymcChoose = row.material_id;
            this.lhchoose = row.bom_id;
            this.lhL = row.L;
            this.lhW = row.W;
            this.lhH = row.H;
            this.lhAmount = row.amount;
        },

        // 保存标准件
        yauncaiSave() {
            if (this.lhchoose == '') {
                this.$message.warning('请选择料号');
                return;
            }
            if (this.blchoose == '') {
                this.$message.warning('请选择标准件类型');
                return;
            }
            if (this.bmchoose == '') {
                this.$message.warning('请选择标准件名称');
                return;
            }
            if (this.bgchoose == '') {
                this.$message.warning('请选择标准件规格');
                return;
            }
            if (this.ycNumber == '') {
                this.$message.warning('请输入原材料数量');
                return;
            }
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                bom_id: this.lhchoose,
                order_id: this.order_id,
                design_id: this.baseId,
                part_spec_id: this.bgchoose,
                part_id: this.bmchoose,
                amount: this.ycNumber,
                mark: '',
                user_id: localStorage.getItem('user_id')
            };
            if (this.typeAddbzj == 0) {
                AddBomPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('标准件添加成功');
                        // this.biaozhuanjian=false
                        this.getBomPartList();
                    }
                });
            } else {
                params.id = this.bzjrowID;
                ModifyBomPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('标准件添加成功');
                        this.biaozhuanjian = false;
                        this.getBomPartList();
                    }
                });
            }
        },
        getCraftList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            CraftList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gyData = Data;
                }
            });
        },
        addChuansuo() {
            if (this.currentIndex != -1) {
                this.xiugaiList.push(this.gyData[this.currentIndex]);
                this.gyData.splice(this.currentIndex, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        deleteChuansuo() {
            if (this.currentIndexxg != -1) {
                this.gyData.push(this.xiugaiList[this.currentIndexxg]);
                this.xiugaiList.splice(this.currentIndexxg, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        clickLi(gy, i) {
            this.currentIndex = i;
        },
        clickLixg(xg, i) {
            this.currentIndexxg = i;
        },
        showlhadd() {
            this.showgy = true;
        },
        showlhddel() {
            this.showgy = false;
        }
    },

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        localStorage.removeItem('baseId');
    },
    activated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>