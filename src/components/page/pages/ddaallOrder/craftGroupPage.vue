<template>
    <div class="container">
        <div class="title orderTop" style="border-bottom: none">
            <router-link to="/craftGroup" style="color: #2a5389">工艺列表</router-link> >
            <span style="color: #345aff">{{ data.k ? '编辑' : '创建' }}</span>
        </div>

        <div class="jibenziliao">
            <div flex="cross:center" class="tableTop" style="margin-top: 0; border-top: 1px solid #bfc3c6">
                <div
                    class="shousuoIconBox"
                    flex="cross:center main:center"
                    @click="baseShow = !baseShow"
                    :style="{ transform: baseShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                >
                    <i class="el-icon-d-arrow-right shousuoIcon"></i>
                </div>
                <span>基本资料</span>
            </div>

            <div class="zlTable" v-show="baseShow">
                <table class="tableClass" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="nameLeft">订单号：</td>
                        <td class="nameRight">{{ data.order_code }}</td>
                        <td class="nameLeft">模具名称：</td>
                        <td class="nameRight">
                            {{ data.name }}
                        </td>
                        <td class="nameLeft">模具类型：</td>
                        <td class="nameRight">{{ data.moldType_name }}</td>
                        <td class="nameLeft">客户名称：</td>
                        <td class="nameRight">{{ data.buyer_name }}</td>
                    </tr>
                    <tr>
                        <td class="nameLeft">试模时间：</td>
                        <td class="nameRight">{{ data.testTime }}</td>
                        <td class="nameLeft">交付时间：</td>
                        <td class="nameRight">{{ data.endTime }}</td>
                        <td class="nameLeft">创建时间：</td>
                        <td class="nameRight">{{ order_ctTime }}</td>
                        <td class="nameLeft">订单说明：</td>
                        <td class="nameRight">
                            <el-tooltip :disabled="!content" :content="data.remark" placement="top">
                                <div
                                    ref="content"
                                    style="max-width: 205px; height: 36px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                                >
                                    {{ data.remark }}
                                </div>
                            </el-tooltip>
                        </td>
                    </tr>
                </table>

                <div class="selftb" flex>
                    <div class="selftb_l" flex>
                        <div class="selftb_img">造型图片：</div>
                        <div class="selimgBox" flex="main:around cross:center">
                            <div style="width: 160px; height: 112px">
                                <div class="imgLeft imgleftBox" v-if="data.pic1">
                                    <el-image
                                        style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                        :src="`${url}Files/ProgramPic/${data.pic1}`"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(data.pic1)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="tableImgZhan neiZhan" v-else>
                                    <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                </div>
                            </div>
                            <div style="width: 160px; height: 112px">
                                <div class="imgLeft imgleftBox" v-if="data.pic2" @click="bigImg(data.pic2)">
                                    <el-image
                                        style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                        :src="`${url}Files/ProgramPic/${data.pic2}`"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(data.pic2)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="tableImgZhan neiZhan" v-else>
                                    <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                </div>
                            </div>
                            <div style="width: 160px; height: 112px">
                                <div class="imgLeft imgleftBox" v-if="data.pic3" @click="bigImg(data.pic3)">
                                    <el-image
                                        style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                        :src="`${url}Files/ProgramPic/${data.pic3}`"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(data.pic3)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="tableImgZhan neiZhan" v-else>
                                    <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="selftb_l selftb_r">
                        <ul>
                            <li flex="cross:center" v-for="(item, index) in tableData" :key="index">
                                <div class="sr_title" v-show="index == 0">工程文件：</div>
                                <div class="sr_name" flex="cross:center main:center">
                                    <img src="../../../common/comImg/index/file.png" alt="" />
                                    <el-tooltip class="item" effect="dark" :content="item.fileName" placement="top">
                                        <span class="yichuHide">{{ item.fileName }}</span>
                                    </el-tooltip>
                                </div>

                                <div class="sr_name1 sr_k">{{ item.fileSize }}k</div>
                                <div class="sr_name2" flex="cross:center main:center" @click="downLoadFile(item)">
                                    <div class="sr_downLoad">下载</div>
                                </div>
                                <div class="sr_more" @click="moreClick()" v-show="index == 0 && wenjian_data.length > 3">更多></div>
                            </li>
                            <div v-show="tableData.length == 0">
                                <li flex="cross:center main:center">-</li>
                                <li flex="cross:center main:center">-</li>
                                <li flex="cross:center main:center">-</li>
                            </div>
                            <div v-show="tableData.length == 1">
                                <li flex="cross:center main:center">-</li>
                                <li flex="cross:center main:center">-</li>
                            </div>
                            <div v-show="tableData.length == 2">
                                <li flex="cross:center main:center">-</li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
        <!-- <div class="tie">基本资料</div>
        <table class="tab">
            <tr>
                <th>订单号：</th>
                <td>{{ data.order_id }}</td>
                <th>模具名称：</th>
                <td>{{ data.name }}</td>
                <th>买家：</th>
                <td>{{ data.buyer_name }}</td>
            </tr>
            <tr>
                <th>交付日期：</th>
                <td>{{ data.endTime }}</td>
                <th>订单说明：</th>
                <td>{{ data.remark }}</td>
                <th>造型图纸：</th>
                <td>
                    <el-image
                        style="width: 100px; height: 38px; margin-right: 10px"
                        :src="data.pic1 ? `${url}Files/ProgramPic/${data.pic1}` : require('../../../common/comImg/index/组 17 拷贝@2x.png')"
                        fit="contain"
                        @click="bigImg(data.pic1)"
                    ></el-image>
                    <el-image
                        style="width: 100px; height: 38px; margin-right: 10px"
                        :src="data.pic2 ? `${url}Files/ProgramPic/${data.pic2}` : require('../../../common/comImg/index/组 17 拷贝@2x.png')"
                        fit="contain"
                        @click="bigImg(data.pic2)"
                    ></el-image>
                    <el-image
                        style="width: 100px; height: 38px; margin-right: 10px"
                        :src="data.pic3 ? `${url}Files/ProgramPic/${data.pic3}` : require('../../../common/comImg/index/组 17 拷贝@2x.png')"
                        fit="contain"
                        @click="bigImg(data.pic3)"
                    ></el-image>
                </td>
            </tr>
        </table> -->
        <!-- <div class="tableTop" flex="cross:center">
            <div style="width: 90px">工程文件</div>
           

            <div style="width: 100%" flex="cross:center main:justify">
                <div></div>

                <div class="orderSearches" flex="cross:center ">
                    <el-input placeholder="请输入文件名" clearable v-model="form.search"></el-input>
                    <el-button class="orderBtn btnOk" @click="search">搜索</el-button>
                </div>
            </div>
        </div>

        <tab :tableData="tableData" :label="label" :Page="Page" :Size="Size" :height="249">
            <template slot-scope="{ item, row }">
                <span v-if="item.prop === 'operation'">
                    <el-button type="text" size="small" class="lan" @click="downLoadFile(row)">下载</el-button>
                </span>
            </template>
        </tab> -->
        <!-- <page
            style="float: right"
            :currentPage="currentPage"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :total="total"
            :pageSize="pageSize"
        >
        </page> -->
        <div class="tableTop" flex="cross:center">
            <div flex="cross:center main:center">
                <div
                    @click="bzjShow = !bzjShow"
                    :style="{ transform: bzjShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                    class="shousuoIconBox"
                    flex="cross:center main:center"
                >
                    <i class="el-icon-d-arrow-right shousuoIcon"></i>
                </div>
                <div style="width: 90px">料号信息</div>
            </div>

            <div style="width: 100%" flex="cross:center main:justify">
                <div></div>

                <div class="orderSearches" flex="cross:center ">
                    <el-input placeholder="请输入料号" clearable @clear="lhclear" v-model="form1.search1"></el-input>
                    <el-button class="orderBtn btnOk" @click="lhSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <tab
            :tableData="tableData1.slice((lhPageIndex - 1) * lhPageSize, lhPageIndex * lhPageSize)"
            :label="label1"
            :height="425"
            :Page="Page"
            :Size="Size"
            v-show="bzjShow"
        >
            <template slot-scope="{ item, row }">
                <span v-if="item.prop === 'operation'">
                    <!-- <el-tooltip v-if="row.Craft != null" content="任务已有流程" placement="top">
                        <el-button style="color: #999" type="text" size="small" class="lan">添加</el-button>
                    </el-tooltip> -->
                    <el-button v-if="row.Craft == null" type="text" size="small" class="lan" @click="add(row)">创建</el-button>
                    <!-- 
                    <el-tooltip v-if="row.Craft == null" content="任务未添加流程" placement="top">
                        <el-button style="color: #999" type="text" size="small" class="lan">编辑</el-button>
                    </el-tooltip> -->
                    <el-button v-else type="text" size="small" class="lan" @click="edit(row)">编辑</el-button>
                    <!-- <el-button type="text" size="small" class="hong" >删除</el-button> -->
                </span>
            </template>
        </tab>
        <div class="pagenofixed" style="border: none">
            <el-pagination
                class="page"
                @size-change="lhSizeChange"
                @current-change="lhCurrentChange"
                :current-page="lhPageIndex"
                :page-sizes="[20, 50, 100]"
                :page-size="lhPageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="lhtotals"
            >
            </el-pagination>
        </div>
        <!-- <page
            style="float: right"
            :currentPage="currentPage1"
            @handleSizeChange="handleSizeChange1"
            @handleCurrentChange="handleCurrentChange1"
            :total="total1"
            :pageSize="pageSize1"
        >
        </page> -->
        <Dia :Visible.sync="Visible" :data="data" :Row="Row"></Dia>

        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
        <!-- 工程文件 -->
        <div class="dialogclass">
            <el-dialog title="工程文件" :visible.sync="upFileDio" width="800px">
                <div>
                    <div class="tableod">
                        <el-table
                            :data="wenjian_data.slice((gcPageIndex - 1) * gcPageSize, gcPageIndex * gcPageSize)"
                            border
                            :row-class-name="tableRowClassName"
                            :header-cell-class-name="headerStyle"
                            style="width: 100%"
                            height="500px"
                        >
                            <el-table-column prop="date" label="序号" width="80" align="center">
                                <slot slot-scope="scope">
                                    <span class="white">
                                        <span>{{ (gcPageIndex - 1) * gcPageSize + scope.$index + 1 }}</span>
                                    </span>
                                </slot>
                            </el-table-column>
                            <el-table-column prop="fileName" label="工程文件" width="400" align="center" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="fileSize" label="文件大小" align="center">
                                <slot slot-scope="scope">{{ scope.row.fileSize }}k</slot></el-table-column
                            >
                            <el-table-column prop="address" label="操作" align="center">
                                <slot slot-scope="scope">
                                    <div flex="cross:center main:center">
                                        <!-- <div @click="yclhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                            <div @click="ycldelClick(scope.row)" class="caozuoStyle delbtn">删除</div> -->
                                        <div class="sr_downLoad" @click="downLoadFile(scope.row)">下载</div>
                                    </div>
                                </slot>
                            </el-table-column>
                        </el-table>
                        <div class="dioPage diopageright">
                            <el-pagination
                                @size-change="gcSizeChange"
                                @current-change="gcCurrentChange"
                                :current-page="gcPageIndex"
                                :page-sizes="[20, 50, 100]"
                                :page-size="gcPageSize"
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="gctotal"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import Dia from './craftGroupDia.vue';
import { BomCraftDetialList } from '@/api/api';
export default {
    components: { tab, page, Dia },
    data() {
        return {
            url: '',
            tableData: [],
            tableData1: [],
            form: { search: '' },
            form1: { search1: '' },
            currentPage: 1,
            total: 0,
            pageSize: 20,
            Page: 1,
            Size: 20,
            currentPage1: 1,
            total1: 0,
            pageSize1: 20,
            Page1: 1,
            Size1: 20,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'fileName',
                    label: '文件名称'
                },
                {
                    prop: 'fileSize',
                    label: '文件大小(k)'
                },
                {
                    prop: 'operation',
                    label: '操作'
                }
            ],
            label1: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'ID',
                    label: '编号'
                },
                {
                    prop: 'BomTypeName',
                    label: '工件'
                },
                {
                    prop: 'MaterialName',
                    label: '料号'
                },

                {
                    prop: 'TypeName',
                    label: '原料类型'
                },
                {
                    prop: 'MName',
                    label: '原料'
                },
                {
                    prop: 'LWH',
                    label: '原材料尺寸'
                },
                // {
                //     prop: 'MaterialName',
                //     label: '工艺流程名称'
                // },
                {
                    prop: 'CraftName',
                    label: '工艺流程'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '150'
                }
            ],
            Visible: false,
            data: {},
            imgBigTu: '',
            dialogVisible: false,
            Row: {},
            bom_craft_id: 0,
            upFileDio: false,
            gctotal: 0,
            gcPageIndex: 1,
            gcPageSize: 20,
            wenjian_data: [],
            baseShow: true,
            bzjShow: true,
            lhPageIndex: 1,
            lhPageSize: 20,
            lhtotals: 0,
            order_ctTime: '',
            content: false
        };
    },
    computed: {},
    watch: {
        lhPageIndex: function (val) {
            this.Page = val;
        },
        lhPageSize: function (val) {
            this.Size = val;
        },
        currentPage1: function (val) {
            this.Page1 = val;
        },
        pageSize1: function (val) {
            this.Size1 = val;
        }
    },
    methods: {
        contentWidth() {
            if (this.$refs.content.clientWidth < this.$refs.content.scrollWidth) {
                this.content = true;
            }
        },
        edit(row) {
            this.Row = row;
            this.Row.bianji = 1;
            this.Visible = true;
        },
        add(row) {
            this.Row = row;
            this.Visible = true;
        },
        moreClick() {
            this.upFileDio = true;
        },
        //下载
        downLoadFile(item) {
            this.$axios
                .get(this.url + 'Files/' + item.guidName, {
                    responseType: 'blob'
                })
                .then((res) => {
                    this.wenbenRes = res.data;

                    this.saveTXT(this.wenbenRes, item.fileName);
                });
        },
        saveTXT(content, filename) {
            // var blob = new Blob(['\ufeff' + content], { type: 'text/txt,charset=UTF-8' });
            // if (typeof blob === 'object' && blob instanceof Blob) {
            //     blob = URL.createObjectURL(blob);
            // }
            // const aLink = document.createElement('a');
            // aLink.href = blob;
            // aLink.download = filename;
            // aLink.click();
            // 处理返回的文件流
            // const content = content;
            const blob = new Blob([content], { type: 'application/zip' });
            // const fileName = this.bathCode + '.zip';
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a');
                elink.download = filename;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        },
        //工艺列表明细
        BomCraftDetialList(a) {
            let params = {
                cp_id: Number(localStorage.getItem('comp_id')),
                BaseID: Number(this.data.bom_id),
                ID: this.data.id || 0,
                QueryString: this.form.search || this.form1.search1,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            BomCraftDetialList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.wenjian_data = Data.design_Files;
                    this.gctotal = this.wenjian_data.length;
                    if (Data.design_Files.length > 3) {
                        this.tableData = Data.design_Files.slice(0, 3);
                    } else {
                        this.tableData = Data.design_Files;
                    }
                    this.order_ctTime = Data.Bom.order_ctTime;
                    this.lhtotals = Data.BomCraftMaterials.length;
                    this.tableData1 = Data.BomCraftMaterials;
                }
            });
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        bigImg(img) {
            if (img) {
                this.imgBigTu = this.url + 'Files/ProgramPic/' + img;
                this.dialogVisible = true;
            }
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },

        lhSizeChange(val) {
            this.lhPageSize = val;
        },
        gcSizeChange(val) {
            this.gcPageSize = val;
        },
        lhSearch() {
            if (!this.tableData2) {
                this.tableData2 = this.tableData1;
            } else {
                this.tableData1 = this.tableData2;
            }
            var arr = [];
            for (var i = 0; i < this.tableData1.length; i++) {
                if (this.tableData1[i].MaterialName.indexOf(this.form1.search1) >= 0) {
                    arr.push(this.tableData1[i]);
                }
            }
            this.tableData1 = arr;
            this.lhtotals = this.tableData1.length;
        },
        lhclear() {
            this.tableData1 = this.tableData2;
            this.lhtotals = this.tableData1.length;
        },
        lhCurrentChange(val) {
            this.lhPageIndex = val;
        },
        gcCurrentChange(val) {
            this.gcPageIndex = val;
        },
        search() {
            this.currentPage = 1;
            this.BomCraftDetialList();
        },
        search1() {
            this.currentPage1 = 1;
            this.BomCraftDetialList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.BomCraftDetialList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.BomCraftDetialList();
        },
        handleSizeChange1(val) {
            this.pageSize1 = val;
            this.BomCraftDetialList();
        },
        handleCurrentChange1(val) {
            this.currentPage1 = val;
            this.BomCraftDetialList();
        }
    },
    created() {
        this.url = localStorage.getItem('seeDaima');
        this.data = JSON.parse(this.$Base64.decode(this.$route.query.info));
        this.BomCraftDetialList();
    },
    mounted() {
        this.contentWidth();
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
.tie {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #172b43;
    line-height: 42px;
    height: 42px;
    background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
    border: 1px solid #bfc3c6;
    padding-left: 8px;
}
.tab {
    width: 99%;
    border-collapse: collapse;
    border: none;
    margin: 9px;
    tr {
        height: 42px;
        th {
            border: solid #b2b6b8 1px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2a5389;
            text-align: right;
        }
        td {
            width: 20%;
            border: solid #b2b6b8 1px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            padding-left: 20px;
            .el-input__inner {
                border: none;
                padding: 0;
            }
            .el-input__icon {
                display: none;
            }
        }
    }
}
.hong {
    color: #e6331d;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
}
.lan {
    color: #345aff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
}
.butn {
    border: 2px solid #b1b8bc;
    background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
    border-radius: 4px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    line-height: 5px;
    margin: auto 7px;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: linear-gradient(0deg, #2a5389 0%, #a2c2ec 100%) !important;
    border-radius: 5px !important;
}

.container {
    position: relative;
    .page {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
}
</style>
