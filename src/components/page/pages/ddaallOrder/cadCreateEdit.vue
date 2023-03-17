<template>
    <div class="container yichu">
        <!-- 订单列表 -->

        <div class="orderTop">
            <span style="cursor: pointer" @click="$router.go(-1)">CAD组创建编辑</span
            ><span class="dayu">></span><span class="nextchuang">详情</span>
        </div>
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
                            <td class="nameLeft">模具名称：</td>
                            <td class="nameRight">
                                <!-- 模具图片： -->
                            </td>
                            <td class="nameLeft">客户名称：</td>
                            <td class="nameRight">{{ buyer_name }}</td>
                            <td class="nameLeft">客户地址：</td>
                            <td class="nameRight">{{ order_name }}</td>
                        </tr>
                        <tr>
                            <td class="nameLeft">试模时间：</td>
                            <td class="nameRight">{{ buyer_name }}</td>
                            <td class="nameLeft">创建时间：</td>
                            <td class="nameRight">{{ testTime }}</td>
                            <td class="nameLeft">交付时间：</td>
                            <td class="nameRight">{{ endTime }}</td>
                            <td class="nameLeft">订单说明：</td>
                            <td class="nameRight">{{ endTime }}</td>
                        </tr>
                    </table>
                    <div class="selftb" flex>
                        <div class="selftb_l" flex>
                            <div class="selftb_img">造型图片：</div>
                            <div class="selimgBox" flex="main:around cross:center">
                                <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
                        <div class="selftb_l selftb_r">
                            <ul>
                                <li flex="cross:center">
                                    <div class="sr_title">工程文件：</div>
                                    <div class="sr_name" flex="cross:center main:center">
                                        <img src="../../../common/comImg/index/file.png" alt="" />
                                        <span>文件3</span>
                                    </div>

                                    <div class="sr_name1 sr_k">18k</div>
                                    <div class="sr_name2" flex="cross:center main:center"><div class="sr_downLoad">下载</div></div>
                                    <div class="sr_more" @click="moreClick()">更多></div>
                                    <!-- 大于三条显示更多 -->
                                </li>
                                <li flex="cross:center main:center">-</li>
                                <li flex="cross:center main:center">-</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow = !ziliaoShow"
                            :style="{ transform: ziliaoShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>料号信息</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="请输入料号名称"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <!-- <transition name="fade"> -->
                <div class="tableod tableMax" v-show="ziliaoShow">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="工艺" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="CAD图片" align="center">
                            <slot slot-scope="scope">

                            </slot>
                        </el-table-column>
                        <el-table-column prop="bomType_Name" label="备注" width="180" align="center"> </el-table-column>
                        
                        <el-table-column prop="processFlow_name" label="状态" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="upClick(scope.row)" class="caozuoStyle">上传</div>
                                    <div @click="lhdelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                </div>
                            </slot>
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
                <!-- </transition> -->
            </div>
 
        </div>
    </div>
</template>

<script>
var re = /^[1-9]+[0-9]*]*$/;
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
    DeleteBomPart,
    AddDesignPic
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
    CraftList,
    BomTypeList
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
            // amount: '',
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
                PageSize: 20,
                QueryString: '',
                BaseID: 0
            },
            yclParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: '',
                BaseID: 0
            },
            bzjParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
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
            gjprocess: [],
            gychoose: '',
            gjchoose: '',
            lhName: '',

            currentIndex: -1,
            xiugaiList: [],
            currentIndexxg: -1,
            gyData: [],
            showgy: false,
            ruleslh: {},
            bzjName: '',
            yclName: '',
            lhgyName: '',
            fileList: [
                // {
                //     name: 'food.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // },
                // {
                //     name: 'food2.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }
            ],
            upDaimaUrl: '',
            fileList2: [],
            pic1: '',
            pic2: '',
            ziliaoShow: true,
            yclShow: true,
            baseShow: true,
            bzjShow: true,
            upFileDio:false,
            dialogVisible:false
        };
    },
    computed: {},
    watch: {},
    created() {
        if (localStorage.getItem('baseId')) {
            this.baseId = localStorage.getItem('baseId');
        } else {
            this.baseId = this.$route.query.baseId;
        }

        this.code = this.$route.query.code;
        // this.amount = this.$route.query.amount;
        this.order_name = this.$route.query.order_name;
        this.buyer_name = this.$route.query.buyer_name;
        this.testTime = this.$route.query.testTime;
        this.endTime = this.$route.query.endTime;
        this.order_id = this.$route.query.order_id;
        // this.pic1 = this.$route.query.pic1;
        // this.pic2 = this.$route.query.pic2;
        // // console.log(this.pic1,this.pic2,'-----------');
        // if(this.pic1){
        //     let pic1obj={name:'图片一',url:this.pic1}
        //      this.fileList.push(pic1obj)
        // }
        // if(this.pic2){
        //     let pic1obj2={name:'图片二',url:this.pic2}
        //     this.fileList2.push(pic1obj2)
        // }

        this.getBomList();
    },
    mounted() {
        if (this.$route.query.page == 1) {
            this.shangPage = '设计列表';
        } else if (this.$route.query.page == 2) {
            this.shangPage = '设计列表';
        } else if (this.$route.query.page == 3) {
            this.shangPage = '设计列表';
        } else if (this.$route.query.page == 4) {
            this.shangPage = '订单统计';
        }
        // console.log(localStorage.getItem('upDaima'),'上传');
        this.upDaimaUrl = localStorage.getItem('upDaima');
        this.seeDaima = localStorage.getItem('seeDaima');
    },
    methods: {
        dioClose(val) {
            this.dialogVisible = val;
        },
        bigImg(img) {
            this.imgBigTu = this.seeDaima + 'Files/ProgramPic/' + img;
            console.log(img);
            this.dialogVisible = true;
        },
        clearFiles() {
            this.$refs['my-upload'].clearFiles();
        },
        clearFiles2() {
            this.$refs['my-upload2'].clearFiles();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList, '======handleRemove');
        },
        handlePreview(file) {
            console.log(file, '00000handlePreview');
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
                // `当前限制选择 1 个文件，请删除重新选择`
                `当前已有选择文件`
            );
        },
 
        
       

    
        
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
      

       
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
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
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此料号已创建原材料');
                        }
                    });
                })
                .catch(() => {});
        },

       
       
       
        
        lhSearch() {
            this.getBomList();
        },
        
       
       

       
        
   

        
        moreClick(){
            this.upFileDio=true
        },
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
.fade-enter,
.fade-leave-to {
    opacity: 0;

    transform: translateY(-5px);
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
</style>