<template>
    <div class="container">
        <!-- <div class="title orderTop" style="border-bottom: none">订单列表</div> -->
        <title-name></title-name>
        <el-card class="box-card">
            <!-- <div class="btn">
                <el-button class="butn" style="height: 40px" @click="chuangjian()">创建订单</el-button>

                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入模具名称" clearable v-model="form.search" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn" @click="OrderList()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <div :class="this.Bj ? 'checkBorder' : ''" style="height: 125px">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>创建订单</div>
                    <!-- <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="AddOrder()">创建</el-button>
                        <el-button class="dioSave cancelBtn">取消</el-button>
                    </div> -->
                </div>

                <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                    <!-- <el-button class="butn" style="height: 40px" @click="addleixing">添加类型</el-button> -->
                    <div class="dialogclass typeBottom">
                        <el-form
                            ref="form"
                            :inline="true"
                            :model="form"
                            :rules="rules"
                            label-width="80px"
                            style="width: 100%; margin-top: 13px"
                        >
                            <el-form-item label="客户名称：">
                                <el-select v-model="form.userName" filterable placeholder="请选择/输入">
                                    <el-option
                                        :label="item.name"
                                        :value="item.name"
                                        v-for="(item, index) in this.form.kehu"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="订单编号：">
                                    <el-input v-model="form.code" placeholder="请输入订单编号"></el-input>
                                </el-form-item> -->
                            <el-form-item label="模具类型：">
                                <div flex="cross:center">
                                    <el-select v-model="form.leixing" filterable placeholder="请选择/输入">
                                        <el-option
                                            :label="item.name"
                                            :value="item.name"
                                            v-for="(item, index) in this.form.moju"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                    <!-- <i
                                        style="margin-left: 20px; cursor: pointer"
                                        class="el-icon-circle-plus-outline"
                                        @click="addLeiXing()"
                                    ></i> -->
                                </div>
                            </el-form-item>
                            <el-form-item label="模具名称：">
                                <el-input v-model="form.modlName" maxlength="20" placeholder="请输入模具名称"></el-input>
                            </el-form-item>

                            <!-- <el-form-item label="模具数量：">
                            <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.shu" placeholder="请输入数量"></el-input>
                        </el-form-item> -->

                            <el-form-item label="试模时间：">
                                <el-date-picker
                                    v-model="form.value"
                                    type="datetime"
                                    placeholder="请选择试模时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 200px"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="交付时间：">
                                <el-date-picker
                                    v-model="form.value1"
                                    type="datetime"
                                    placeholder="请选择交付时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 200px"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="订单说明：">
                                <el-input v-model="form.remark" placeholder="请输入订单说明(50字内)" maxlength="50" />
                            </el-form-item>

                            <el-form-item label="附件图片：">
                                <div flex="cross:center">
                                    <div class="chooseFile" flex="cross:center">
                                        <div class="chooseF">
                                            <el-input v-model="form.picName" readonly placeholder="请选择文件"></el-input>
                                        </div>
                                    </div>
                                    <div class="inputBox">
                                        <input type="file" id="file" style="display: none" ref="files" multiple @change="upload" />
                                    </div>
                                    <el-button class="dioSave btnCancel" @click="goFile">选择</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="附件文件：">
                                <div flex="cross:center">
                                    <div class="chooseFile" flex="cross:center">
                                        <div class="chooseF">
                                            <el-input v-model="form.fName" readonly placeholder="请选择文件"></el-input>
                                        </div>
                                    </div>
                                    <div class="inputBox">
                                        <input type="file" id="file1" style="display: none" ref="files1" multiple @change="upload1" />
                                    </div>
                                    <el-button class="dioSave btnCancel" @click="goFile1">选择</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="跳过造型：">
                                <el-checkbox v-model="form.moding" false-label="true" true-label="false"></el-checkbox>
                            </el-form-item>

                            <el-form-item label=" " label-width="26px">
                                <el-tooltip v-if="!btn[2]" content="没有权限，不能操作" placement="top">
                                    <el-button class="dioSave btnOk" style="background: #999999 !important">创建</el-button>
                                </el-tooltip>
                                <el-button v-else class="dioSave btnOk" @click="AddOrder()">创建</el-button>

                                <el-button class="dioSave btnCancel" @click="resetForm">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>

            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 150px; text-align: left">订单列表</div>

                <div flex class="osselect">
                    <el-select v-model="ssVal" @change="search">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="form.search" clearable placeholder="请输入模具名称"></el-input>
                    <el-button class="orderBtn" @click="search">搜索</el-button>
                </div>
            </div>

            <tab :tableData="tableData" :label="label" :Page="Page" :Size="Size">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop == 'status'" :style="'color:' + statusColor[row.status]"> {{ statusData[row.status] }} </span>
                    <span v-if="item.prop === 'operation'">
                        <el-button @click="xiangqing(row)" type="text" size="small" class="lan">详情</el-button>
                        <!-- <el-button @click="plan(row)" type="text" size="small" class="lan">进度</el-button> -->
                        <el-tooltip v-if="!btn[5]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">进度</el-button>
                        </el-tooltip>
                        <el-button v-else @click="plan2(row)" type="text" size="small" class="lan">进度</el-button>

                        <el-tooltip v-if="!btn[7]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">交付</el-button>
                        </el-tooltip>
                        <el-button v-else @click="jiaofu(row)" type="text" size="small" class="lan">交付</el-button>

                        <el-tooltip v-if="!btn[4]" content="没有权限，不能操作" placement="top">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important">取消</el-button>
                        </el-tooltip>
                        <el-button v-else @click="quxiao(row)" type="text" size="small" class="hong">取消</el-button>

                        <el-tooltip v-if="!btn[3]" content="没有权限，不能操作" placement="top">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important">删除</el-button>
                        </el-tooltip>
                        <el-button v-else type="text" size="small" class="hong" @click="open(row)">删除</el-button>
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
            >
            </page>
        </el-card>
        <div class="dialogclass">
            <el-dialog title="创建订单" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                        <el-form-item label="客户名称：">
                            <el-select v-model="form.userName" filterable placeholder="请选择/输入">
                                <el-option
                                    :label="item.name"
                                    :value="item.name"
                                    v-for="(item, index) in this.form.kehu"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模具类型：">
                            <div flex="cross:center">
                                <el-select v-model="form.leixing" filterable placeholder="请选择/输入">
                                    <el-option
                                        :label="item.name"
                                        :value="item.name"
                                        v-for="(item, index) in this.form.moju"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                                <!-- <i style="margin-left: 20px; cursor: pointer" class="el-icon-circle-plus-outline" @click="addLeiXing()"></i> -->
                            </div>
                        </el-form-item>
                        <el-form-item label="模具名称：">
                            <el-input v-model="form.modlName" placeholder="请输入模具名称"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="模具数量：">
                            <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.shu" placeholder="请输入数量"></el-input>
                        </el-form-item> -->
                        <el-form-item label="试模时间：">
                            <el-date-picker
                                v-model="form.value"
                                type="datetime"
                                placeholder="请选择试模时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="交付时间：">
                            <el-date-picker
                                v-model="form.value1"
                                type="datetime"
                                placeholder="请选择交付时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddOrder()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="添加模具类型" :visible.sync="addLx" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="类型：">
                            <el-input v-model="form.lxName" placeholder="请输入类型名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddMoldType()">添加</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="取消原因" :visible.sync="QXvisible" width="600px" @close="QXcancel">
                <div>
                    <el-form ref="QXform" :model="QXform" label-width="120px">
                        <el-form-item
                            label="原因填写："
                            prop="mask"
                            :rules="[{ required: true, message: '请输入取消原因', trigger: 'blur' }]"
                        >
                            <el-input type="textarea" :rows="5" v-model="QXform.mask" placeholder="请输入取消原因"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave btnOk" @click="QXsave">提交</el-button>
                    <el-button class="dioSave btnCancel" @click="QXcancel">清空</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import rules from '../components/rules';
import { OrderList, AddOrder, BuyerList, MoldTypeList, AddMoldType, DeleteOrder } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },

    data() {
        return {
            rules,
            addLx: false,
            form: {
                kehu: [],
                moju: [],
                modlName: '',
                shu: null,
                value: '',
                value1: '',
                leixing: '',
                search: '',
                lxName: '',
                userName: '',
                code: '',
                remark: '',
                picName: '',
                picURL: '',
                fName: '',
                fURL: '',
                moding: 'true'
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
                    prop: 'code',
                    label: '订单号'
                },
                // {
                //     prop: 'moldType_id',
                //     label: '模具编号'
                // },
                {
                    prop: 'name',
                    label: '模具名称'
                },
                {
                    prop: 'moldType_name',
                    label: '模具类型'
                },
                {
                    prop: 'buyer_name',
                    label: '客户名称'
                },
                {
                    prop: 'testTime',
                    label: '试模时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'endTime',
                    label: '交付时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'status',
                    label: '订单状态',
                    status: true
                },
                {
                    prop: 'ctTime',
                    label: '创建时间',
                    width: '179',
                    shijian: true
                },
                {
                    prop: 'fName',
                    label: '附件文件',
                    down: true
                },
                {
                    prop: 'picURL',
                    label: '附件图纸',
                    width: '90'
                },
                {
                    prop: 'remark',
                    label: '订单说明',
                    name: true
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '260'
                }
            ],
            tableData: [],
            Page: 1,
            Size: 20,
            // 设置只能选择当前日期及之后的日期
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
            Bj: false,
            QXform: {
                mask: ''
            },
            QXvisible: false,
            selectStatus: [
                {
                    id: '',
                    name: '全部订单'
                },
                {
                    id: 0,
                    name: '待设计'
                },
                {
                    id: 1,
                    name: '待审核'
                },
                {
                    id: 2,
                    name: '造型通过'
                },
                {
                    id: 3,
                    name: 'BOM设计'
                },
                {
                    id: 4,
                    name: '生产中'
                },
                {
                    id: 5,
                    name: '试模'
                },
                {
                    id: 6,
                    name: '维修'
                },
                {
                    id: 7,
                    name: '交付'
                },
                {
                    id: 8,
                    name: '分配工艺'
                },
                {
                    id: 9,
                    name: '任务分配'
                },
                {
                    id: 10,
                    name: '造型未通过'
                }
            ],
            ssVal: '',
            btn: {},
            statusData: {
                0: '待设计',
                1: '待审核',
                2: '造型通过',
                3: 'BOM设计',
                4: '生产中',
                5: '试模',
                6: '维修',
                7: '交付',
                8: '分配工艺',
                9: '任务分配',
                10: '造型未通过'
            },
            statusColor: {
                0: '#ffa300',
                1: '#ffa300',
                2: '#27c6de',
                3: '#18a837',
                4: '#2a5389',
                5: '#ff0000',
                6: '#ff0000',
                7: '#18A837',
                8: '#18a837',
                9: '#18a837',
                10: '#ff0000'
            }
        };
    },
    computed: {},
    watch: {
        currentPage: function (val) {
            this.Page = val;
        },
        pageSize: function (val) {
            this.Size = val;
        }
    },
    methods: {
        goFile() {
            this.$nextTick(() => {
                this.$refs.files.click();
            });
        },
        upload(e) {
            let files = e.target.files || e.dataTransfer.files;
            // 通过FormData将文件转成二进制数据
            let formData = new FormData();
            // 将文件转二进制
            formData.append('upload', files[0]);

            this.$axios.post(this.url + 'api/File/UpLoadProgramPic', formData).then((res) => {
                this.$set(this.form, 'picURL', res.data.Name);
                this.$set(this.form, 'picName', res.data.FName);
                this.$refs.files.value = null;
            });
        },
        goFile1() {
            this.$nextTick(() => {
                this.$refs.files1.click();
            });
        },
        upload1(e) {
            let files = e.target.files || e.dataTransfer.files;
            // 通过FormData将文件转成二进制数据
            let formData = new FormData();
            // 将文件转二进制
            formData.append('upload', files[0]);

            this.$axios.post(this.url + 'api/File/UpLoadFile', formData).then((res) => {
                this.$set(this.form, 'fURL', res.data[0].Name);
                this.$set(this.form, 'fName', res.data[0].FName);
                this.$refs.files1.value = null;
            });
        },
        //进度
        plan(row) {
            this.$router.push({
                path: '/flowChart',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            id: row.id
                        })
                    )
                }
            });
        },
        plan2(row) {
            this.$router.push({
                path: '/orderStatus',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },
        search() {
            this.currentPage = 1;
            this.OrderList();
        },
        //取消
        QXcancel() {
            this.QXform.mask = '';
            this.$refs.QXform.resetFields();
        },
        //交付
        jiaofu(row) {
            this.$confirm('确认要交付此订单嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '交付成功!'
                    });
                })
                .catch(() => {});
        },
        //取消
        quxiao(row) {
            this.$confirm('确定要取消此任务订单嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.QXform.mask = '';
                    this.QXvisible = true;
                })
                .catch(() => {});
        },
        //取消确定
        QXsave() {
            this.$refs.QXform.validate((valid) => {
                if (valid) {
                    this.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    this.QXvisible = false;
                } else {
                    return false;
                }
            });
        },
        //清空表单
        resetForm() {
            this.form.userName = '';
            this.form.leixing = '';
            this.form.modlName = '';
            this.form.value = '';
            this.form.value1 = '';
            this.form.code = '';
            this.form.remark = '';
            this.form.moding = 'true';
            this.form.picName = '';
            this.form.picURL = '';
            this.form.fName = '';
            this.form.fURL = '';
        },
        blu() {
            this.Bj = false;
        },
        fo() {
            this.Bj = true;
        },
        chuangjian() {
            this.form.userName = '';
            this.form.leixing = '';
            this.form.modlName = '';
            this.form.value = '';
            this.form.value1 = '';
            this.form.remark = '';
            this.form.moding = 'true';
            this.form.picName = '';
            this.form.picURL = '';
            this.form.fName = '';
            this.form.fURL = '';
            this.centerDialogVisible = true;
        },
        //删除
        DeleteOrder(row) {
            let params = {
                id: row.id
            };
            DeleteOrder(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.OrderList();
                }
                if (ReturnCode == 203) {
                    this.$message({
                        type: 'error',
                        message: '删除失败，此订单已被设计管理创建!'
                    });
                    this.OrderList();
                }
            });
        },
        // 模具类型添加
        AddMoldType() {
            let params = {
                name: this.form.lxName,
                cp_id: localStorage.getItem('comp_id'),
                user_id: localStorage.getItem('user_id')
            };
            AddMoldType(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.MoldTypeList();
                }
            });
            this.addLx = false;
        },
        // 模具类型列表
        MoldTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            MoldTypeList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.form.moju = Data;
                }
            });
        },
        //客户
        BuyerList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            BuyerList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.form.kehu = Data;
                }
            });
        },
        // 订单添加
        AddOrder() {
            if (this.form.userName == '' || this.form.userName == null) {
                this.$message.warning('请输入选择客户');
                return;
            }
            if (this.form.leixing == '') {
                this.$message.warning('请输入模具类型');
                return;
            }
            if (this.form.modlName == '') {
                this.$message.warning('请输入模具名');
                return;
            }
            // if (this.form.shu == '' || this.form.shu == null) {
            //     this.$message.warning('请输入模具数量');
            //     return;
            // }
            if (this.form.value == '') {
                this.$message.warning('请选择试模时间');
                return;
            }
            if (this.form.value1 == '') {
                this.$message.warning('请选择交付时间');
                return;
            }
            if (this.form.value >= this.form.value1) {
                this.$message.warning('试模时间不能晚于交付时间！');
                return;
            }
            // if (this.form.picName || this.form.fName) {
            //     if (!this.form.moding) {
            //         this.$message.warning('请勾选附件！');
            //         return;
            //     }
            // }
            let moldType_id;
            this.form.moju.map((item) => {
                if (item.name == this.form.leixing) {
                    moldType_id = item.id;
                }
            });
            let buyer_id;
            this.form.kehu.map((item) => {
                if (item.name == this.form.userName) {
                    buyer_id = item.id;
                }
            });
            let params = {
                buyer_id: buyer_id,
                name: this.form.modlName,
                moldType_id: moldType_id,
                testTime: this.form.value,
                endTime: this.form.value1,
                amount: 1 || this.form.shu,
                // code: this.form.code || '',
                user_id: localStorage.getItem('user_id'),
                CP_ID: localStorage.getItem('comp_id'),
                remark: this.form.remark,
                moding: JSON.parse(this.form.moding),
                picName: this.form.picName,
                picURL: this.form.picURL,
                fName: this.form.fName,
                fURL: this.form.fURL
            };
            AddOrder(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.OrderList();
                }
            });
            this.form.userName = '';
            this.form.leixing = '';
            this.form.modlName = '';
            this.form.value = '';
            this.form.value1 = '';
            this.form.remark = '';
            this.form.moding = 'true';
            this.form.picName = '';
            this.form.picURL = '';
            this.form.fName = '';
            this.form.fURL = '';
            this.centerDialogVisible = false;
        },
        //列表
        OrderList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            if (this.ssVal !== '') {
                params.Status = this.ssVal;
            }
            OrderList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        open(row) {
            this.$confirm('确认要删除此订单嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.DeleteOrder(row);
                })
                .catch(() => {});
        },

        addLeiXing() {
            this.form.lxName = '';
            this.addLx = true;
        },
        xiangqing(row) {
            this.form.kehu.map((item) => {
                if (item.name == row.buyer_name) {
                    row = { ...item, ...row };
                }
            });
            row[2] = this.btn[2];
            row[6] = this.btn[6];
            this.$router.push({ name: 'orderDetailsPage', params: row });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.OrderList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.OrderList();
        }
    },
    created() {
        this.OrderList();
        this.BuyerList();
        this.MoldTypeList();
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
<style lang="scss" scoped>
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
.diatil {
    widows: 100%;
    height: 77px;
    background: #dee4ef;
}
.leiBtn {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    background: linear-gradient(0deg, #2a5389 0%, #a2c2ec 100%);
    border-radius: 4px;
}
::v-deep.esh {
    height: 36px;
    border: 2px solid #b1b8bc;
    .el-input__inner {
        height: 32px;
        border: none;
    }
}
::v-deep.el-form--inline .el-form-item {
    margin-right: 5px;
    .el-upload--picture-card {
        width: 75px;
        height: 75px;
        line-height: 85px;
    }
}
::v-deep.dialogclass .el-input__inner {
    width: 200px;
}
::v-deep.chooseF .el-input__inner {
    width: 130px;
}
</style>
