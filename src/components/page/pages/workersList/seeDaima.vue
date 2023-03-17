<template>
    <div class="container">
        <div class="orderTop" style="border-bottom:none;">
            机台任务 <span class="dayu">></span><span class="nextchuang" style="cursor: pointer" @click="goback()">待加工列表</span>
            <span class="dayu">></span><span class="nextchuang">查看代码</span>
        </div>
        <div class="orderCont">
            <div flex="main:justify">
                <div class="oc50">
                    <div class="tableTop addtableTop">加工图</div>
                    <div class="addNewKuang dialogclass jiagong" flex="cross:center main:justify">
                        <div class="imgoverGet">
                            <ul flex="cross:center ">
                                <li v-for="(img, i) in jiagongImg" :key="i" @click="imgFang(img)">
                                    <img :src="seeDaima + 'Files//ProgramPic/' + img.picName" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="oc50">
                    <div class="tableTop addtableTop">设计图</div>
                    <div class="addNewKuang dialogclass jiagong" flex="cross:center main:justify">
                        <div class="imgoverGet">
                            <ul flex="cross:center ">
                                <li v-for="(img, i) in shejiImg" :key="i" @click="imgFang(img)">
                                    <img :src="seeDaima + 'Files//ProgramPic/' + img.picName" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="orderTable" style="margin-top: 20px">
                <div class="tableod">
                    <el-table
                        :data="tableData"
                        max-height="520"
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
                        <el-table-column prop="groupName" label="分组" align="center"> </el-table-column>
                        <el-table-column prop="name" label="代码名称" align="center"> </el-table-column>
                        <el-table-column prop="ctTime" label="上传时间" align="center" width="180"> </el-table-column>
                        <el-table-column prop="status" label="状态" align="center">
                            <slot slot-scope="scope">
                                <span :style="{ color: $global.statusColor[scope.row.status] }">{{ getStatus(scope.row.status) }}</span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" align="center" width="550">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div @click="seeClick(scope.row)" class="caozuoStyle">查看代码</div>
                                    <div>
                                        <div
                                            v-if="scope.row.status == 0 && scope.row.status != 3 && gloStaue"
                                            @click="startClick(scope.row)"
                                            class="caozuoStyle"
                                            style="margin-left: 30px"
                                            :style="{ color: scope.row.status == 0 && scope.row.status != 3 && gloStaue ? '' : '#999' }"
                                        >
                                            发送到机台
                                        </div>
                                        <el-tooltip content="待加工不可发送到机台" placement="top" v-else>
                                            <div
                                                class="caozuoStyle"
                                                style="margin-left: 30px"
                                                :style="{ color: scope.row.status == 0 && scope.row.status != 3 && gloStaue ? '' : '#999' }"
                                            >
                                                发送到机台
                                            </div>
                                        </el-tooltip>
                                    </div>

                                    <div @click="getProgramReplaceList(scope.row)" class="caozuoStyle" style="margin-left: 30px">
                                        替换记录
                                    </div>
                                    <!-- <div>
                                        <div
                                            v-if="scope.row.status == 3"
                                            @click="startprodution(scope.row)"
                                            style="margin-left: 30px"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == 3 ? '' : '#999' }"
                                        >
                                            开始加工
                                        </div>
                                        <el-tooltip content="需要发送代码到机台" placement="top" v-else>
                                            <div
                                                style="margin-left: 30px"
                                                class="caozuoStyle"
                                                :style="{ color: scope.row.status == 3 ? '' : '#999' }"
                                            >
                                                开始加工
                                            </div>
                                        </el-tooltip>
                                    </div>
                                    <div>
                                        <div
                                            v-if="scope.row.status == 1"
                                            @click="endprodution(scope.row)"
                                            style="margin-left: 30px"
                                            :style="{ color: scope.row.status == 1 ? '' : '#999' }"
                                            class="caozuoStyle"
                                        >
                                            结束加工
                                        </div>
                                        <el-tooltip content="加工未开始" placement="top" v-else>
                                            <div
                                                style="margin-left: 30px"
                                                :style="{ color: scope.row.status == 1 ? '' : '#999' }"
                                                class="caozuoStyle"
                                            >
                                                结束加工
                                            </div>
                                        </el-tooltip>
                                    </div> -->
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

        <div class="dialogclass suo">
            <el-dialog title="查看代码" :visible.sync="addLx" width="800px">
                <div flex>
                    <div class="daimaleft" v-loading="loading">
                        <div class="daimaText">代码</div>
                        <virtual-list
                            class="listIndex"
                            style="height: 500px; overflow-y: auto"
                            :data-key="'id'"
                            :data-sources="items"
                            :data-component="item"
                        />
                    </div>
                    <div class="daimaright ">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="查找：">
                                <el-input v-model="chazhao" placeholder="请输入查找内容"></el-input>
                            </el-form-item>
                            <el-form-item label="替换：">
                                <el-input v-model="tihuan" placeholder="请输入替换内容"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button class="orderBtn" style="width: 120px" @click="xiazai()">下载代码</el-button>
                                <el-button class="orderBtn" :disabled="tijiaoStatus == 1" @click="submitdaima()">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="发送到机台" :visible.sync="addLxstart" width="500px">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="机台列表：">
                        <el-select v-model="sbVal" filterable placeholder="请选择/输入机台">
                            <el-option v-for="(ty, i) in shebeiList" :key="i" :label="ty.name" :value="ty.device_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="savejitai">确定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 替换记录 -->
        <div class="dialogclass dioPage suo">
            <el-dialog title="替换记录" :visible.sync="tihuanDio" width="1000px" :close-on-click-modal='false'>
                <div class="orderCont">
                    <div class="orderTable" style="margin-top: 20px">
                        <div class="tableod">
                            <el-table
                                :data="tableDataRecord"
                                height="400"
                                border
                                :row-class-name="tableRowClassName"
                                :header-cell-class-name="headerStyle"
                                style="width: 100%"
                            >
                                <el-table-column prop="date" label="序号" width="100" align="center">
                                    <slot slot-scope="scope">
                                        <span class="white">
                                            <span>{{ (compPamaRecord.PageIndex - 1) * compPamaRecord.PageSize + scope.$index + 1 }}</span>
                                        </span>
                                    </slot>
                                </el-table-column>
                                <el-table-column prop="findStr" label="查找字符" align="center"> </el-table-column>
                                <el-table-column prop="replaceStr" label="替换字符" align="center"> </el-table-column>
                                <el-table-column prop="count" label="替换个数" align="center"> </el-table-column>
                            </el-table>
                            <div class="tablePageedss">
                                <el-pagination
                                    @size-change="handleSizeChangeRecord"
                                    @current-change="handleCurrentChangeRecord"
                                    :current-page="compPamaRecord.PageIndex"
                                    :page-sizes="[20, 50, 100]"
                                    :page-size="compPamaRecord.PageSize"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="totalRecord"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 图片放大 可缩放可拖曳 -->
        <div class="suo suoimg">
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                :before-close="closeimg"
                width="800px"
                height="800px"
                v-dialogDrag
                :modal="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
            >
                <div flex="cross:center main:center">
                    <!-- class="imgbigCals" -->
                    <!-- <img :src="imgBigTu" @mousewheel="rollImg(this)" ref="bigImage" alt="" /> -->
                    <previewPicture :imgUrl="imgBigTu" v-if="imgBigShow"></previewPicture>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import previewPicture from '../../../common/pickure.vue';
import { DeviceList } from '@/api/base';
import { ProgramFileList, OrderTaskDetailPicList } from '@/api/api';
import { AddProgramReplace, ProgramReplaceList, StartWork, EndWork } from '@/api/worker';
import Item from './Item';
import VirtualList from 'vue-virtual-scroll-list';
export default {
    components: {
        VirtualList,
        previewPicture
    },
    data() {
        return {
            tableData: [],
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            form: {},
            dioName: '',
            saveSure: 0,
            total: 0,
            rowID: 0,
            formName: '',
            BaseID: 0,
            addLx: false,
            wenbenRes: '',
            addLxstart: false,
            sbVal: '',
            shebeiList: [],
            // seeDaima:''
            item: Item,
            items: [],
            loading: false,
            chazhao: '',
            tihuan: '',
            tihuanDio: false,
            tableDataRecord: [],
            totalRecord: 0,
            compPamaRecord: {
                cp_id: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20
            },
            gloStaue: true,
            tijiaoStatus: 0,
            jiagongImg: [],
            shejiImg: [],
            imgBigTu: '',
            dialogVisible: false,
            widthImg: '300px',
            heightImg: '',
            imgBigShow: false
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.seeDaima = localStorage.getItem('seeDaima');
        this.upDaima = localStorage.getItem('upDaima');
        this.BaseID = this.$route.query.BaseID;
        this.sbVal = this.$route.query.deviceId;
        this.isWorking = this.$route.query.isWorking;
        if (this.isWorking == 0) {
            this.gloStaue = true;
        } else {
            this.gloStaue = false;
        }
        this.getProgramFileList();
        this.getOrderTaskDetailPicList();
        

        // window.addEventListener('mousewheel',this.handleScroll,false)
    },
    methods: {
        rollImg() {
            /* 获取当前页面的缩放比
                    若未设置zoom缩放比，则为默认100%，即1，原图大小
                */
            var zoom = parseInt(this.$refs.bigImage.style.zoom) || 100;
            /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
                    wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
                */
            zoom += event.wheelDelta / 12;
            /* 最小范围 和 最大范围 的图片缩放尺度 */
            if (zoom >= 100 && zoom < 500) {
                this.$refs.bigImage.style.zoom = zoom + '%';
            }
            return false;
        },
        closeimg() {
            // this.$refs.bigImage.style.zoom = '100%';
            this.dialogVisible = false;
            this.imgBigShow = false;
        },
        imgFang(item) {
            this.dialogVisible = true;
            this.imgBigShow = true;
            this.imgBigTu = this.seeDaima + 'Files//ProgramPic/' + item.picName;
        },
        getOrderTaskDetailPicList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                BaseID: this.BaseID
            };
            OrderTaskDetailPicList(params).then((res) => {  
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.jiagongImg = [];
                    this.shejiImg = [];
                    // 图片类别 0加工图 1设计图
                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].type == 0) {
                            this.jiagongImg.push(Data[i]);
                        }
                        if (Data[i].type == 1) {
                            this.shejiImg.push(Data[i]);
                        }
                    }
                }
            });
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getProgramFileList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getProgramFileList();
        },
        handleSizeChangeRecord(val) {
            this.compPamaRecord.PageSize = val;
            this.getProgramReplaceList();
        },
        handleCurrentChangeRecord(val) {
            this.compPamaRecord.PageIndex = val;
            this.getProgramReplaceList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },

        getProgramFileList() {
            this.compPama.BaseID = this.BaseID;
            ProgramFileList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        seeClick(row) {
            this.items = [];
            this.loading = true;
            this.addLx = true;
            this.chazhao = '';
            this.tihuan = '';
            this.daimaName = row.name;
            this.tihuanFileName = row.fileName;
            this.programFile_id = row.id;
            this.tijiaoStatus = row.status;
            this.$axios.get(this.seeDaima + 'Files/' + row.fileName).then((res) => {
                console.log(this.wenbenRes);
                this.wenbenRes = res.data;

                this.handleStr(res.data);
            });
        },
        handleStr(str) {
            let arrs = str.split('\r\n');
            let arres = [];

            for (let i = 0; i < arrs.length; i++) {
                if (arrs[i].trim() != '') {
                    arres.push(JSON.parse(`{"id":${i},"text":"${arrs[i]}"}`));
                } else {
                }
            }
            let arr2 = [];
            let obj = {};
            for (let i = arrs.length; i < arrs.length + 10; i++) {
                obj.id = i;
                obj.text = '';
                arres.push(JSON.parse(`{"id":${i},"text":""}`));
            }

            this.items = arres;
            this.loading = false;
        },
        startClick(row) {
            if (this.sbVal == '') {
                this.$message.warning('您没有选择机台，请返回待加工列表选择机台');
                return;
            }
            this.rowName = row.fileName;
            this.rowesId = row.id;
            this.orderTask_detial_id = row.orderTask_detial_id;
            this.$confirm('确认发送到机台吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.savejitai();
                })
                .catch(() => {});
        },
        savejitai() {
            let params = {
                FileName: this.rowName,
                Device_ID: this.sbVal,
                ordertask_detial_id: this.orderTask_detial_id,
                id: this.rowesId
            };
            this.$axios.post(this.upDaima + 'api/File/SendToDevices', params).then((res) => {
                if (res.data.ReturnCode == 200) {
                    this.$message.success('发送成功');
                    this.addLxstart = false;
                    this.getProgramFileList();
                }
            });
        },
        goback() {
            this.$router.go(-1);
        },
        xiazai() {
            saveTXT(this.wenbenRes, this.daimaName);
            // const link = document.createElement('a'); // 创建a标签
            // link.href = this.seeDaima + 'Files/' + this.tihuanFileName
            // link.download = ""; // 重命名文件
            // link.click();
        },
        submitdaima() {
            if (this.chazhao == '') {
                this.$message.warning('请输入查找代码');
                return;
            }
            if (this.tihuan == '') {
                this.$message.warning('请输入替换代码');
                return;
            }
            // if (this.wenbenRes.search(this.chazhao) == -1) {
            //     this.$message.warning('此段代码不存在，请重新输入');
            //     return;
            // }
            let params = {
                FileName: this.tihuanFileName,
                FindStr: this.chazhao,
                ReplaceStr: this.tihuan
            };
            this.$axios.post(this.upDaima + 'api/File/ChangeText', params).then((res) => {
                if (res.data.ReturnCode == 200) {
                    console.log(res.data.Data, '=====res.data');
                    let dbprams = {
                        programFile_id: this.programFile_id,
                        cp_id: localStorage.getItem('comp_id'),
                        user_id: localStorage.getItem('user_id'),
                        count: res.data.Data,
                        findStr: this.chazhao,
                        replaceStr: this.tihuan
                    };
                    this.getAddProgramReplace(dbprams);
                }
            });
        },
        getAddProgramReplace(dbprams) {
            AddProgramReplace(dbprams).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.$message.success('替换成功');
                    this.addLx = false;
                    this.getProgramFileList();
                }
            });
        },

        getProgramReplaceList(row) {
           
            this.tihuanDio = true;
            if(row){
                this.compPamaRecord.BaseID = row.id;
            }
            
            ProgramReplaceList(this.compPamaRecord).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                     this.tableDataRecord = [];
                    this.tableDataRecord = Data;
                    this.totalRecord = PageCount;
                }
            });
        },
        startprodution(row) {
            this.$confirm('确定开始加工?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id,
                        orderTask_detial_id: row.orderTask_detial_id
                    };
                    StartWork(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('开始加工');
                            this.getProgramFileList();
                        }
                    });
                })
                .catch(() => {});
        },
        endprodution(row) {
            this.$confirm('确定停止加工?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id,
                        orderTask_detial_id: row.orderTask_detial_id
                    };
                    EndWork(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('停止加工');
                            this.getProgramFileList();
                        }
                    });
                })
                .catch(() => {});
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
function saveTXT(content, filename) {
    var blob = new Blob(['\ufeff' + content], { type: 'text/txt,charset=UTF-8' });
    if (typeof blob === 'object' && blob instanceof Blob) {
        blob = URL.createObjectURL(blob);
    }
    const aLink = document.createElement('a');
    aLink.href = blob;
    aLink.download = filename;
    aLink.click();
}
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
.suo {
    .el-dialog__wrapper {
        pointer-events: none !important;
    }
    .el-dialog {
        pointer-events: auto !important;
    }
}
.suoimg {
    .el-dialog__body {
        padding: 264px 20px !important;
    }
    .el-dialog__wrapper {
        z-index: 9999999 !important;
    }
}
</style>