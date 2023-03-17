<template>
    <div class="container">
        <!-- <div class="title orderTop">编程任务列表</div> -->
        <title-name></title-name>
        <el-card class="box-card">
            <!-- <div class="btn">
                <el-button class="butn" style="height: 40px" @click="xqPage()" v-if="false">创建加工任务</el-button>
                <div></div>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入模具名" clearable v-model="form.search" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn" @click="OrderTaskDetialList">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 150px; text-align: left">编程设计列表</div>
                <div flex class="osselect">
                    <el-select v-model="ssVal" placeholder="请选择是否创建" @change="search()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="form.search" clearable placeholder="请输入模具名称"></el-input>
                    <el-select
                        id="sele"
                        ref="sele"
                        v-model="value2"
                        multiple
                        :multiple-limit="3"
                        placeholder="请选择工件"
                        @focus="BomTypeList"
                        @change="seleChange"
                    >
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                    <el-input style="margin-left: 1px" v-model="form.search2" clearable placeholder="请输入料号"></el-input>
                    <el-button class="orderBtn" @click="search()">搜索</el-button>
                </div>
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 8px" :Page="Page" :Size="Size" :he="true" @daima="daima">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'" flex="main:center">
                        <el-tooltip v-if="!btn[29]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999" type="text" size="small" class="lan">上传</el-button>
                        </el-tooltip>
                        <el-tooltip v-else content="任务设计完成，不能操作" placement="top" :disabled="row.isLock != '设计完成'">
                            <el-button
                                @click="ProgramFileList(row)"
                                :style="row.isLock == '设计完成' ? 'color:#999' : ''"
                                type="text"
                                size="small"
                                class="lan"
                                >上传</el-button
                            >
                        </el-tooltip>

                        <div style="margin-left: 20px" v-if="!btn[30]">
                            <el-tooltip v-if="row.status != 2 && row.isLock == '设计完成'" content="没有权限，不能操作" placement="top">
                                <el-button type="text" size="small" style="color: #999">撤销</el-button>
                            </el-tooltip>
                            <el-tooltip v-else content="没有权限，不能操作" placement="top">
                                <el-button type="text" style="color: #999" size="small" class="lan">完成</el-button>
                            </el-tooltip>
                        </div>
                        <div style="margin-left: 20px" v-else>
                            <el-button
                                v-if="row.status != 2 && row.isLock == '设计完成'"
                                type="text"
                                size="small"
                                class="hong"
                                @click="chexiao(row)"
                                >撤销</el-button
                            >
                            <el-tooltip v-else content="任务设计完成，不能操作" placement="top" :disabled="row.isLock != '设计完成'">
                                <el-button
                                    @click="wancheng(row)"
                                    type="text"
                                    :style="row.isLock == '设计完成' ? 'color:#999' : false"
                                    size="small"
                                    class="lan"
                                    >完成</el-button
                                >
                            </el-tooltip>
                            <!-- <el-tooltip v-else content="请先上传代码" placement="top" :disabled="row.programCount > 0">
                                <el-tooltip  content="任务设计完成，不能操作" placement="top" :disabled="row.isLock != '设计完成'">
                                    <el-button
                                        @click="wancheng(row)"
                                        type="text"
                                        :style="
                                            row.isLock == '设计完成' ? 'color:#999' : false || row.programCount <= 0 ? 'color:#999' : false
                                        "
                                        size="small"
                                        class="lan"
                                        >完成</el-button
                                    >
                                </el-tooltip>
                            </el-tooltip> -->
                        </div>

                        <!-- <el-button style="width: 20px" type="text" size="small"></el-button>
                        <el-button type="text" size="small" class="hong" @click="open(row)">删除</el-button> -->
                        <!-- <el-tooltip content="任务设计完成，不能操作" placement="top" :disabled="row.isLock != '设计完成'">
                            <el-button
                                type="text"
                                size="small"
                                class="hong"
                                :style="row.isLock == '设计完成' ? 'color:#999' : ''"
                                @click="open(row)"
                                >删除</el-button
                            >
                        </el-tooltip> -->
                    </span>
                </template>
            </tab>
            <page
                class="page"
                :currentPage="currentPage"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :total="total"
                :pageSize="pageSize"
            ></page>
        </el-card>
        <div class="dialogclass">
            <el-dialog title="编辑文件" :visible.sync="centerDialogVisible" width="25%">
                <div>
                    <el-form ref="form" :inline="true" :model="form" label-width="120px">
                        <!-- <el-form-item label="代码名：">
                            <el-input v-model="forms.name" placeholder="请输入代码名"></el-input>
                        </el-form-item> -->
                        <el-form-item label="选择文件：">
                            <input type="file" id="file1" style="display: none" ref="files1" @change="upload1()" />
                            <el-input v-model="WName1" placeholder="请选择文件" readonly></el-input>
                            <button class="wjBtn" @click="goFile1()">···</button>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="ModifyProgramFile()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="关联代码" :visible.sync="addLx" width="1130px" :shai="true" @close="cenDia">
                <tab
                    :tableData="tableDatas"
                    :label="labels"
                    :filters="filters"
                    :shai="true"
                    @filterHandler="filterHandler"
                    :height="500"
                    :shuzu="shuzu"
                    @handleSelectionChange="handleSelectionChanges"
                    ref="child"
                    @beiyong="beiyongs"
                    :Sxian="Sxian"
                >
                    <template slot-scope="{ item, row }">
                        <span v-if="item.prop === 'operation'">
                            <!-- <el-button @click="bianjis(row)" type="text" size="small" class="lan">编辑</el-button>
                                <el-button style="width: 20px" type="text" size="small"></el-button> -->

                            <el-tooltip v-if="Sxian" content="任务设计完成，不能操作" placement="top">
                                <el-button style="color: #999" type="text" size="small" class="hong">删除</el-button>
                            </el-tooltip>
                            <el-button v-else type="text" size="small" class="hong" @click="shan(row)">删除</el-button>
                        </span>
                    </template>
                </tab>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="上传" :visible.sync="scVisible" width="1130px" :close-on-press-escape="false" :close-on-click-modal="false">
                <div flex>
                    <el-form
                        ref="form"
                        :inline="true"
                        :model="form"
                        label-width="100px"
                        enctype="multipart/form-data"
                        style="display: flex; align-items: center"
                    >
                        <!-- <el-form-item label="代码名：">
                            <el-input v-model="form.name" placeholder="请输入代码名"></el-input>
                        </el-form-item> -->

                        <el-form-item label="选择文件：">
                            <input type="file" id="file" style="display: none" ref="files" multiple @change="upload()" v-if="show" />
                            <!-- <el-input v-model="WName" placeholder="请选择文件" readonly></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button class="dioSave btnCancel" @click="goFile()">选择</el-button>
                            <el-button class="dioSave btnOk" @click="AddProgramFile()">上传</el-button>
                        </el-form-item>
                        <el-form-item label="分组：">
                            <el-input v-model="form.desc" maxlength="30" placeholder="请输入分组名"></el-input>
                        </el-form-item>
                        <el-form-item label="图纸：" class="labels">
                            <div class="tu">
                                <el-upload
                                    :action="this.url + 'api/File/UpLoadProgramPic'"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :on-success="tupian"
                                    :file-list="fileList"
                                    ref="img"
                                    accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PNG, .GIF"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>

                                <el-dialog
                                    :visible.sync="dialogVisible"
                                    :modal-append-to-body="false"
                                    :append-to-body="true"
                                    :close-on-click-modal="false"
                                >
                                    <img width="100%" :src="dialogImageUrl" alt="" />
                                    <div v-for="(item, index) in fileList" :key="index" style="text-align: center">
                                        {{ item.url == dialogImageUrl ? `分组：${item.groupName}` : '' }}
                                    </div>
                                </el-dialog>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <tab
                        :tableData="tableDatas"
                        :label="labels"
                        :filters="filters"
                        :shai="true"
                        @filterHandler="filterHandler"
                        :height="500"
                        :shuzu="shuzu"
                        @handleSelectionChange="handleSelectionChange"
                        ref="childs"
                        @beiyong="beiyong"
                    >
                        <template slot-scope="{ item, row }">
                            <span v-if="item.prop === 'operation'">
                                <!-- <el-button @click="bianjis(row)" type="text" size="small" class="lan">编辑</el-button>
                                <el-button style="width: 20px" type="text" size="small"></el-button> -->
                                <el-button type="text" size="small" class="hong" @click="opens(row)">删除</el-button>
                            </span>
                        </template>
                    </tab>
                </div>

                <!-- <div style="margin-top: 20px; display: flex" >
                    <div style="width: 50%">&nbsp;加工图</div>
                    <div>&nbsp;设计图</div>
                </div> -->

                <!-- <div style="display: flex; justify-content: space-between; margin-top: 10px">
                  

                    <div class="tu">
                        <el-upload
                            :action="this.url + 'api/File/UpLoadProgramPic'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreviews"
                            :on-remove="handleRemoves"
                            :on-success="tupians"
                            :file-list="fileLists"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog
                            :visible.sync="dialogVisibles"
                            :modal-append-to-body="false"
                            :append-to-body="true"
                            :close-on-click-modal="false"
                        >
                            <img width="100%" :src="dialogImageUrls" alt="" />
                            <div v-for="(item, index) in fileLists" :key="index" style="text-align: center">
                                {{ item.url == dialogImageUrl ? `分组：${item.groupName}` : '' }}
                            </div>
                        </el-dialog>
                    </div>
                </div> -->
                <span slot="footer" class="dialog-footer"> </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import {
    OrderTaskDetialList,
    DeleteOrderTaskDetial,
    ProgramFileList,
    AddProgramFiles,
    ModifyProgramFile,
    DeleteProgramFile,
    ModifyProgramFile_Name,
    ProgramLock,
    ProgramList,
    AddOrderTaskDetailPic,
    OrderTaskDetailPicList,
    DeleteOrderTaskDetailPic,
    DeleteProgramPic,
    ProgramUnLock,
    ModifyProgramBackup
} from '@/api/api';
import { BomTypeList } from '@/api/base';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            show: false,
            scVisible: false,
            forms: {
                id: 0
            },
            bianjiVisible: false,
            addLx: false,
            form: {
                desc: '',
                search: '',
                search2: ''
            },
            centerDialogVisible: false,
            currentPage: 1,
            total: 0,
            pageSize: 20,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'order_name',
                    label: '模具名称'
                },
                {
                    prop: 'bomType_name',
                    label: '工件'
                },

                {
                    prop: 'material_name',
                    label: '料号'
                },
                {
                    prop: 'craft_name',
                    label: '工艺'
                },
                {
                    prop: 'device_name',
                    label: '机台号'
                },
                {
                    prop: 'programCount',
                    label: '代码数量'
                },
                {
                    prop: 'begintime',
                    label: '计划开始时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'endtime',
                    label: '计划结束时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'buyer_name',
                    label: '客户'
                },
                {
                    prop: 'isLock',
                    label: '状态',
                    sortable: true
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '150'
                }
            ],
            tableData: [],
            labels: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '90'
                },
                {
                    prop: 'groupName',
                    label: '分组'
                },
                {
                    prop: 'name',
                    label: '代码名',
                    width: '400'
                },
                // {
                //     prop: 'programLine',
                //     label: '代码行数'
                // },
                // {
                //     prop: 'fileName',
                //     label: '文件名'
                // },
                // {
                //     prop: 'fileURL',
                //     label: '地址'
                // },
                {
                    prop: 'ctTime',
                    label: '上传时间',
                    width: '179'
                },
                // {
                //     prop: 'user_name',
                //     label: '上传人'
                // },
                {
                    prop: 'chuan',
                    label: '状态'
                },

                {
                    prop: 'operation',
                    label: '操作'
                },
                {
                    prop: 'isBackup',
                    label: '备用'
                }
            ],
            tableDatas: [],
            file: {},
            cp_id: localStorage.getItem('cp_id'),
            wenjian: {},
            url: '',
            shangchuan: {},
            selectStatus: [
                {
                    id: '',
                    name: '全部订单'
                },
                {
                    id: 0,
                    name: '待设计订单'
                },
                {
                    id: 1,
                    name: '设计完成订单'
                }
            ],
            ssVal: '',
            WName: '',
            WName1: '',
            Page: 1,
            Size: 20,
            dialogImageUrl: '',
            dialogImageUrls: '',
            dialogVisible: false,
            dialogVisibles: false,
            orderTask_detial_id: null,
            fileList: [],
            fileLists: [],
            ID: null,
            Name: '',
            URL: '',
            hang: 0,
            wenjianming: [],
            filters: [],
            shuzu: [],
            Sxian: false,
            options: [],
            value2: [],
            btn: {}
        };
    },
    computed: {},
    watch: {
        scVisible: function (value) {
            if (value == false) {
                this.form.name = '';
                this.shangchuan = {};
                this.form.desc = '';
            }
            if (value == true) {
                this.OrderTaskDetailPicList();
                this.$nextTick(() => {
                    this.clwidth();
                });
            }
        },
        currentPage: function (val) {
            this.Page = val;
        },
        pageSize: function (val) {
            this.Size = val;
        }
        // fileList: {
        //     handler(n, o) {
        //         if (n !== o) {
        //             this.fileList = n;
        //         }
        //     },
        //     // immediate: true,  //刷新加载 立马触发一次handler
        //     deep: true // 可以深度检测到 person 对象的属性值的变化
        // }
    },
    methods: {
        seleChange() {
            this.$el.querySelector('#sele').style.width = `${140 + (this.value2.length > 1 ? 60 * this.value2.length : 0)}px`;
            this.$refs.sele.$children[1].$el.style.width = `${140 + (this.value2.length > 1 ? 60 * this.value2.length : 0)}px`;
        },
        //工件下拉
        BomTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            };
            BomTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.options = Data;
                }
            });
        },
        cenDia() {
            this.Sxian = false;
        },
        clwidth() {
            // console.log(this.$refs.img.$children[0]);
            // if (this.$refs.img.offsetWidth < 150) {
            //     this.show = false;
            // }
        },
        search() {
            this.currentPage = 1;
            this.ProgramList();
        },
        beiyong(row) {
            let params = {
                id: row.id,
                cp_id: row.cp_id,
                user_id: row.user_id,
                name: row.name,
                orderTask_detial_id: row.orderTask_detial_id,
                programLine: row.programLine,
                fileName: row.fileName,
                fileURL: row.fileURL,
                isBackup: row.isBackup
            };
            ModifyProgramBackup(params)
                .then((res) => {
                    let { Data, ReturnCode } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    }
                })
                .then((res) => {
                    this.ProgramFileList(row, 1);
                });
        },
        beiyongs(row) {
            let params = {
                id: row.id,
                cp_id: row.cp_id,
                user_id: row.user_id,
                name: row.name,
                orderTask_detial_id: row.orderTask_detial_id,
                programLine: row.programLine,
                fileName: row.fileName,
                fileURL: row.fileURL,
                isBackup: row.isBackup
            };
            ModifyProgramBackup(params)
                .then((res) => {
                    let { Data, ReturnCode } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    }
                })
                .then((res) => {
                    this.ProgramFileList(row, 1, 5);
                });
        },
        handleSelectionChanges(val) {
            this.addLx = false;
            console.log(val);
            this.$refs.child.toggleSelection();
            this.$refs.childs.toggleSelection();
        },
        handleSelectionChange(val) {
            if (val.length) {
                this.addLx = true;
            }
            console.log(val);
        },
        bei(row) {
            console.log(row);
        },
        //筛选
        filterHandler(value, row, column) {
            // const property = column['value'];
            // // return row[property] === value;
            // console.log(row[property], '00000');
        },
        chexiao(row) {
            this.$confirm('此操作将撤销该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.ProgramUnLock(row);
                })
                .catch(() => {});
        },
        //完成代码任务撤销
        ProgramUnLock(row) {
            let params = {
                ID: row.id
            };
            ProgramUnLock(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '撤销成功!'
                    });
                    this.ProgramList();
                }
            });
        },
        //删除图片-文件 第二步
        DeleteProgramPic() {
            let params = {
                Name: this.Name,
                URL: this.URL
            };
            DeleteProgramPic(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.OrderTaskDetailPicList();
                    this.dialogVisible = false;
                }
            });
        },
        //删除图片-数据 第一步
        DeleteOrderTaskDetailPic() {
            let params = {
                id: this.ID
            };
            DeleteOrderTaskDetailPic(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                }
            });
            this.DeleteProgramPic();
        },
        //图片列表
        OrderTaskDetailPicList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                BaseID: this.orderTask_detial_id
            };
            OrderTaskDetailPicList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    let liucheng = [];
                    let liuchengs = [];
                    Data.map((item) => {
                        if (item.type == 0) {
                            liucheng.push(item);
                        }
                        if (item.type == 1) {
                            liuchengs.push(item);
                        }
                    });
                    this.fileList = liucheng;
                    this.fileLists = liuchengs;
                    for (let i = 0; i < this.fileList.length; i++) {
                        this.fileList[i].name = this.fileList[i].picName;
                        this.fileList[i].url = this.urls + 'Files/ProgramPic/' + this.fileList[i].picName;
                    }
                    for (let i = 0; i < this.fileLists.length; i++) {
                        this.fileLists[i].name = this.fileLists[i].picName;
                        this.fileLists[i].url = this.urls + 'Files/ProgramPic/' + this.fileLists[i].picName;
                    }
                }
            });
        },
        //上传设计图片
        tupians(file) {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                orderTask_detial_id: this.orderTask_detial_id,
                type: 1,
                picName: file.Name,
                picURL: file.URL,
                name: file.FName,
                groupName: this.form.desc ? this.form.desc : '-'
            };
            AddOrderTaskDetailPic(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '上传成功!'
                    });
                    this.form.desc = '';
                    this.OrderTaskDetailPicList();
                }
            });
        },
        //上传加工图片
        tupian(file) {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id'),
                orderTask_detial_id: this.orderTask_detial_id,
                type: 0,
                picName: file.Name,
                picURL: file.URL,
                name: file.FName,
                groupName: this.form.desc ? this.form.desc : '-'
            };
            AddOrderTaskDetailPic(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '上传成功!'
                    });
                    this.form.desc = '';
                    this.OrderTaskDetailPicList();
                }
            });
        },
        handleRemoves(file, fileList) {
            this.OrderTaskDetailPicList();
            this.$confirm('是否删除该图片?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.Name = file.picName;
                    this.URL = file.picURL;
                    this.ID = file.id;
                    this.DeleteOrderTaskDetailPic();
                })
                .catch(() => {});
        },
        handlePictureCardPreviews(file) {
            this.dialogImageUrls = file.url;
            this.dialogVisibles = true;
        },
        handleRemove(file, fileList) {
            this.OrderTaskDetailPicList();
            this.$confirm('是否删除该图片?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.Name = file.picName;
                    this.URL = file.picURL;
                    this.ID = file.id;
                    this.DeleteOrderTaskDetailPic();
                })
                .catch(() => {});
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //搜索
        ProgramList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                QueryString2: this.form.search2,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Status: this.ssVal,
                BomType: this.value2,
                WorkType: 1
            };
            ProgramList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    let datas = [];
                    Data.map((item) => {
                        if (item.isLock == false) {
                            item.isLock = '待设计';
                        } else {
                            item.isLock = '设计完成';
                        }
                        if (item.workType == 1) {
                            datas.push(item);
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        wancheng(row) {
            if (row.isLock == '设计完成') {
                return;
            }
            // if (row.programCount <= 0) {
            //     return;
            // }
            this.$confirm('完成之后不可再次上传代码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        ID: row.id
                    };
                    ProgramLock(params).then((res) => {
                        let { Data, ReturnCode } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '设计完成!'
                            });
                            this.ProgramList();
                        }
                    });
                })
                .catch(() => {});
        },
        goFile() {
            this.show = true;
            this.$nextTick(() => {
                this.$refs.files.click();
            });
        },
        goFile1() {
            this.$refs.files1.click();
        },
        upload() {
            for (let i = 0; i < this.tableDatas.length; i++) {
                if (this.tableDatas[i].chuan) {
                    this.$message.warning('请先上传代码！');
                    return;
                }
            }

            var fileObj = document.getElementById('file').files; // js 获取文件对象
            var file = document.getElementById('file').files[0];
            var shuzu = [];

            for (var i = 0; i < fileObj.length; i++) {
                // var reader = new FileReader();
                // var that = this;
                // reader.onload = function () {
                //     var num = this.result.replace(/[^\n]/g, '');
                //     that.hang = num.length + 1;
                // };
                // document.getElementById('file').files[i].groupName = '';
                document.getElementById('file').files[i].user_name = localStorage.getItem('ManageName');
                document.getElementById('file').files[i].programLine = this.hang;
                document.getElementById('file').files[i].ctTime = this.transformTime();
                document.getElementById('file').files[i].chuan = '未上传';
                shuzu.push(document.getElementById('file').files[i]);
                this.shuzu.push(document.getElementById('file').files[i]);
            }
            // reader.readAsText(file);

            var form = new FormData();
            form.append('file', this.file);
            if (fileObj.length != 0) {
                var i = fileObj.length;
                this.counts = i;
                var that = this;
                for (var j = 0; j < i; j++) {
                    (function (i) {
                        form.append('file', fileObj[i]); // 文件对象
                    })(j);
                }
            }
            this.shangchuan = form;
            this.WName = fileObj[0].name;
            this.form.name = fileObj[0].name;
            this.wenjianming = shuzu;

            for (let i = 0; i < this.tableDatas.length; i++) {
                for (let j = 0; j < shuzu.length; j++) {
                    if (this.tableDatas[i].name == shuzu[j].name) {
                        return this.$message({
                            type: 'warning',
                            message: '文件重复上传!'
                        });
                    }
                }
            }
            this.tableDatas.unshift(...shuzu);
            this.show = false;
        },
        transformTime() {
            var d = new Date();
            var datetime =
                d.getFullYear() +
                '-' +
                (d.getMonth() + 1) +
                '-' +
                d.getDate() +
                ' ' +
                d.getHours() +
                ':' +
                d.getMinutes() +
                ':' +
                d.getSeconds();
            return datetime;
        },
        num(hang) {
            this.hang = hang;
        },
        upload1() {
            var fileObj = document.getElementById('file1').files; // js 获取文件对象
            var file = document.getElementById('file').files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var hang = this.result.replace(/[^\n]/g, '');
                this.hang = hang.length + 1;
            };
            var form = new FormData();
            form.append('file', this.file);
            if (fileObj.length != 0) {
                var i = fileObj.length;
                this.counts = i;
                var that = this;
                for (var j = 0; j < i; j++) {
                    (function (i) {
                        form.append('file', fileObj[i]); // 文件对象
                    })(j);
                }
            }
            this.shangchuan = form;
            this.WName1 = fileObj[0].name;
            this.forms.name = fileObj[0].name;
        },
        //编辑弹窗
        bianjis(row) {
            this.centerDialogVisible = true;
            this.forms = JSON.parse(JSON.stringify(row));
            this.WName1 = this.forms.fileName;
            this.wenjian = row;
        },
        opens(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteProgramFile(row);
                })
                .catch(() => {});
        },
        shan(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteProgramFile(row, 5);
                })
                .catch(() => {});
        },
        //删除加工代码
        DeleteProgramFile(row, shan) {
            if (row.chuan == '未上传') {
                this.tableDatas.splice(
                    this.tableDatas.findIndex((item) => item.name == row.name && item.chuan == '未上传'),
                    1
                );
                // this.tableDatas.map(item=>{
                //     if (item.name==row.name) {
                //         this.tableDatas
                //     }
                // })
                return;
            }
            let params = {
                id: row.id,
                orderTask_detial_id: row.orderTask_detial_id
            };
            DeleteProgramFile(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.ProgramFileList(row, 1, shan);
                    this.ProgramList();
                }
                if (ReturnCode == 203) {
                    this.$message.error('删除失败，此代码已被机台任务加工!');
                }
            });
        },
        //编辑加工代码
        ModifyProgramFile() {
            if (!this.shangchuan.append) {
                let params = {
                    id: this.wenjian.id,
                    name: this.forms.name
                };
                ModifyProgramFile_Name(params).then((res) => {
                    let { Data, ReturnCode } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.shangchuan = {};
                        let params = {
                            id: this.wenjian.id,
                            cp_id: this.wenjian.cp_id,
                            orderTask_detial_id: this.wenjian.orderTask_detial_id
                        };
                        this.ProgramFileList(params, 1);
                    }
                });
            } else {
                this.$axios.post(this.url + 'api/File/UpLoadFile', this.shangchuan).then((res) => {
                    let params = {
                        id: this.wenjian.id,
                        cp_id: this.wenjian.cp_id,
                        user_id: this.wenjian.user_id,
                        name: this.forms.name,
                        orderTask_detial_id: this.wenjian.orderTask_detial_id,
                        fileName: res.data.URL,
                        fileURL: res.data.Name
                    };
                    ModifyProgramFile(params).then((res) => {
                        let { Data, ReturnCode } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            this.shangchuan = {};
                            this.ProgramFileList(params, 1);
                        }
                    });
                });
            }
            this.centerDialogVisible = false;
            this.WName1 = '';
        },
        //上传加工代码
        AddProgramFile() {
            this.$axios.post(this.url + 'api/File/UpLoadFile', this.shangchuan).then((res) => {
                let params = [];
                for (let i = 0; i < res.data.length; i++) {
                    let data = {};
                    data.cp_id = this.row.cp_id;
                    data.user_id = this.row.user_id;
                    data.orderTask_detial_id = this.row.id;
                    data.fileURL = res.data[i].URL;
                    data.fileName = res.data[i].Name;
                    data.name = this.wenjianming[i].name;
                    data.programLine = this.hang;
                    data.groupName = this.form.desc ? this.form.desc : '-';
                    params.push(data);
                }
                // let param = {
                //     cp_id: this.row.cp_id,
                //     user_id: this.row.user_id,
                //     orderTask_detial_id: this.row.id,
                //     fileURL: res.data[0].URL,
                //     fileName: res.data[0].Name,
                //     name: this.wenjianming[0].name,
                //     programLine: this.hang
                // };
                // let param1 = {
                //     cp_id: this.row.cp_id,
                //     user_id: this.row.user_id,
                //     orderTask_detial_id: this.row.id,
                //     fileURL: res.data[1].URL,
                //     fileName: res.data[1].Name,
                //     name: this.wenjianming[1].name,
                //     programLine: this.hang
                // };
                // let params = [param, param1];
                AddProgramFiles(params).then((res) => {
                    let { Data, ReturnCode } = res;
                    if (ReturnCode == 200) {
                        this.ProgramFileList(this.row);
                        this.ProgramList();
                        this.form.name = '';
                        this.shangchuan = {};
                        this.form.desc = '';
                    }
                });
            });
        },
        handleChange(file) {
            this.file = file;
        },
        daima(row) {
            if (row.isLock == '设计完成') {
                this.Sxian = true;
            }
            this.row = row;
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                BaseID: row.id
            };
            this.orderTask_detial_id = row.id;

            ProgramFileList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.tableDatas = Data;
                    this.addLx = true;
                }
            });
        },
        //代码列表
        ProgramFileList(row, num, shan) {
            if (row.isLock == '设计完成') {
                return;
            }

            let params = {};
            if (num === 1) {
                params = {
                    cp_id: localStorage.getItem('comp_id'),
                    BaseID: row.orderTask_detial_id
                };
                this.orderTask_detial_id = row.id;
            } else {
                this.row = row;
                params = {
                    cp_id: localStorage.getItem('comp_id'),
                    BaseID: row.id
                };
                this.orderTask_detial_id = row.id;
            }
            ProgramFileList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.tableDatas = Data;
                    let newfilter = [];

                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].groupName != '') {
                            newfilter.push({ text: Data[i].groupName, value: Data[i].groupName });

                            // this.filters.push({ text: '', value: '' });
                            // // console.log(this.filters[i],111111111111111111);

                            // this.filters[i].text = Data[i].groupName;
                            // this.filters[i].value = Data[i].groupName;

                            // console.log(this.filters, '===--');
                        }
                    }
                    // newfilter.push({ text: '-', value: '-' });
                    var obj = {};
                    newfilter = newfilter.reduce(function (item, next) {
                        obj[next.value] ? '' : (obj[next.value] = true && item.push(next));
                        return item;
                    }, []);
                    this.filters = newfilter;
                }
            });
            this.WName = '';
            // this.OrderTaskDetailPicList();
            if (shan !== 5) {
                this.scVisible = true;
            }
        },
        // 加工任务删除
        DeleteOrderTaskDetial(row) {
            let params = {
                id: row.id
            };
            DeleteOrderTaskDetial(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.ProgramList();
                }
                if (ReturnCode == 203) {
                    this.$message.error('删除失败，此模具工艺已上传代码!');
                }
            });
        },
        // 加工任务列表
        OrderTaskDetialList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                QueryString2: this.form.search2,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            OrderTaskDetialList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.isLock == false) {
                            item.isLock = '待设计';
                        } else {
                            item.isLock = '设计完成';
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        open(row) {
            if (row.isLock == '设计完成') {
                return;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteOrderTaskDetial(row);
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.ProgramList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.ProgramList();
        }
    },
    created() {
        this.ProgramList();
        // this.OrderTaskDetailPicList();
        this.btn = this.rightControl();
    },
    mounted() {
        this.url = localStorage.getItem('upDaima');
        this.urls = localStorage.getItem('seeDaima');
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
::v-deep.container {
    padding: 0;

    .title {
        height: 47px;
        background: linear-gradient(0deg, #e7f0fc 0%, #c4d3eb 43%, #d5e1f7 56%, #ccdbf2 65%, #ccdaf1 74%, #edf3fc 98%);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2a5389;
        line-height: 47px;
        padding-left: 13px;
    }
    .box-card {
        widows: 100%;
        height: calc(100% - 49px);
        border-radius: 0;
        position: relative;
        border: none;
        .btn {
            display: flex;
            justify-content: space-between;
            height: 46px;
        }
        .page {
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
        .el-card__body {
            padding: 0 !important;
        }
    }
}
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
::v-deep.esh {
    height: 36px;
    border: 2px solid #b1b8bc;
    .el-input__inner {
        height: 32px;
        border: none;
    }
}
::v-deep.el-table th {
    padding: 5px 0 !important;
}
.upload-demo {
    width: 250px;
    height: 40px;
    border: 1px solid #aaaaaa;
    overflow: hidden;
    .el-upload--text {
        border: none;
    }
}
::v-deep.el-button--primary {
    color: #000;
    background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
    border-color: #b1b8bc;
}
.wjBtn {
    position: absolute;
    right: 0;
    width: 60px;
    height: 40px;
}
// ::v-deep.tu {
//     overflow: auto;
//     width: 49%;
//     height: 400px;
//     border: 2px solid #b1b8bc;
//     margin: 2px;
//     .el-upload-list--picture-card .el-upload-list__item {
//         width: 50px !important;
//         height: 50px !important;
//     }
//     .el-upload--picture-card {
//         width: 50px !important;
//         height: 50px !important;
//     }
//     .el-icon-plus {
//         position: relative;
//         width: 50px !important;
//         height: 50px !important;
//     }
//     .el-icon-plus:before {
//         position: absolute;
//         top: -20px !important;
//         left: 9px;
//     }

::v-deep.tu {
    overflow: hidden;
    width: 320px;
    height: 72px;
    border: 2px solid #b1b8bc;
    ul > li {
        width: 72px !important;
        height: 72px !important;
        transition: none !important;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            height: auto !important;
            width: auto !important;
            max-width: 100% !important;
            max-height: 100% !important;
        }
    }
    .el-upload--picture-card {
        width: 72px !important;
        height: 72px !important;
    }
    .el-upload--picture-card i {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
::v-deep.el-checkbox:last-of-type {
    padding: 13px 0;
}
::v-deep.labels > label {
    line-height: 70px !important;
}
::v-deep.dialogclass .el-input__inner {
    width: 230px !important;
}
</style>
