<template>
    <div class="container">
        <div class="title">
            <router-link to="/orderList" style="color: #2a5389">订单列表</router-link> > <span style="color: #345aff">订单详情</span>
        </div>
        <el-card class="box-card">
            <!-- <div class="btn">
                <div></div>
                <el-button class="butn" style="height: 40px" @click="centerDialogVisible = true" v-show="false">添加模具</el-button>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入订单号" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div> -->
            <!-- <div :class="this.Bj ? 'checkBorder' : ''" style="height: 125px">
                <div class="tableTop addtableTop" flex="cross:center main:justify">
                    <div>编辑订单</div>
                    <div class="marr" flex="cross:center">
                        <el-button class="dioSave" @click="ModifyOrder()">保存</el-button>
                        <el-button class="dioSave cancelBtn" v-show="this.Bj" @click="quxiao()">取消</el-button>
                    </div>
                </div>

               <div class="addNewKuang dialogclass" flex="cross:center main:justify">
                  
                    <div class="dialogclass typeBottom">
                        <el-form ref="form" :model="form" :inline="true" label-width="80px">
                    
                            <el-form-item label="模具名称：">
                                <el-input v-model="form.name" placeholder="请输入模具名称" ref="input"></el-input>
                            </el-form-item>
                            <el-form-item label="模具类型：">
                                <el-select v-model="form.moldType_name" filterable placeholder="请选择/输入">
                                    <el-option
                                        :label="item.name"
                                        :value="item.name"
                                        v-for="(item, index) in this.moju"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                      
                            <el-form-item label="试模时间：" style="width: 390px">
                                <el-date-picker
                                    v-model="form.testTime"
                                    type="datetime"
                                    placeholder="请选择试模时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="交付时间：" style="width: 390px">
                                <el-date-picker
                                    v-model="form.endTime"
                                    type="datetime"
                                    placeholder="请选择交付时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>  -->

            <div class="tie">
                基本资料
                <el-tooltip v-if="!tableData[2]" content="没有权限，不能操作" placement="top">
                    <el-button class="dioSave btnOk" style="background: #999999 !important">编辑</el-button>
                </el-tooltip>
                <span v-else>
                    <el-button class="dioSave btnOk" v-if="!code" @click="Bjbtn()">编辑</el-button>
                    <template v-else>
                        <el-button class="dioSave btnOk" @click="ModifyOrder()">保存</el-button>
                        <el-button class="dioSave btnCancel" @click="quxiao()">取消</el-button>
                    </template>
                </span>
            </div>
            <table class="tab">
                <tr>
                    <th>订单号：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.code"></el-input></td>
                    <td v-else>{{ tableData.code }}</td>
                    <th>客户名称：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.buyer_name"></el-input></td>
                    <td v-else>{{ tableData.buyer_name }}</td>
                    <th>客户编号：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.buyer_id"></el-input></td>
                    <td v-else>{{ tableData.buyer_id }}</td>
                    <th>客户地址：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.address"></el-input></td>
                    <td v-else>
                        <el-tooltip :content="tableData.address" placement="top">
                            <div style="width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                                {{ tableData.address }}
                            </div>
                        </el-tooltip>
                    </td>
                </tr>
                <tr>
                    <th>联系人：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.tel_name"></el-input></td>
                    <td v-else>{{ tableData.tel_name }}</td>
                    <th>联系人电话：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.tel"></el-input></td>
                    <td v-else>{{ tableData.tel }}</td>
                    <th>模具名称：</th>
                    <td v-if="code"><el-input ref="input" v-model="iptform.name"></el-input></td>
                    <td v-else>{{ tableData.name }}</td>
                    <th>模具类型：</th>
                    <td v-if="code" style="background: #f5f7fa"><el-input disabled v-model="iptform.moldType_name"></el-input></td>
                    <td v-else>{{ tableData.moldType_name }}</td>
                </tr>
                <tr>
                    <th>模具数量：</th>
                    <td v-if="code"><el-input v-model="iptform.amount"></el-input></td>
                    <td v-else>{{ tableData.amount }}</td>
                    <th>试模时间：</th>
                    <td v-if="code">
                        <el-date-picker
                            v-model="iptform.testTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </td>
                    <td v-else>{{ tableData.testTime }}</td>
                    <th>创建时间：</th>
                    <td v-if="code" style="background: #f5f7fa">
                        <el-date-picker
                            disabled
                            v-model="iptform.ctTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </td>
                    <td v-else>{{ tableData.ctTime }}</td>
                    <th>交付时间：</th>
                    <td v-if="code">
                        <el-date-picker
                            v-model="iptform.endTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                    </td>
                    <td v-else>{{ tableData.endTime }}</td>
                </tr>
                <tr>
                    <th>跳过造型：</th>
                    <td v-if="code"><el-checkbox v-model="iptform.moding" false-label="true" true-label="false"></el-checkbox></td>
                    <td v-else><el-checkbox disabled v-model="tableData.moding" false-label="true" true-label="false"></el-checkbox></td>
                    <th>附件图纸：</th>
                    <td v-if="code">
                        <el-image
                            v-if="iptform.picURL"
                            style="
                                width: 50px;
                                height: 40px;
                                border: 1px solid #c0ccda;
                                border-radius: 4px;
                                margin-top: 3px;
                                cursor: pointer;
                            "
                            :src="
                                iptform.picURL
                                    ? `${urls}Files/ProgramPic/${iptform.picURL}`
                                    : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                            "
                            fit="scale-down"
                            @click="goFile"
                        >
                        </el-image>
                        <el-button v-else class="dioSave btnCancel" @click="goFile">选择</el-button>
                        <input type="file" id="file" style="display: none" ref="files" multiple @change="upload" />
                    </td>
                    <td v-else>
                        <el-image
                            v-if="tableData.picURL"
                            style="
                                width: 50px;
                                height: 40px;
                                border: 1px solid #c0ccda;
                                border-radius: 4px;
                                margin-top: 3px;
                                cursor: pointer;
                            "
                            :src="
                                tableData.picURL
                                    ? `${urls}Files/ProgramPic/${tableData.picURL}`
                                    : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                            "
                            fit="scale-down"
                            @click="bigImg(tableData.picURL)"
                        >
                        </el-image>
                    </td>
                    <th>附件文件：</th>
                    <td v-if="code">
                        <div flex="cross:center">
                            <div class="chooseFile" flex="cross:center">
                                <div class="chooseF">
                                    <div v-if="iptform.fName" @click="goFile1" style="cursor: pointer">{{ iptform.fName }}</div>
                                    <el-button v-else class="dioSave btnCancel" @click="goFile1">选择</el-button>
                                </div>
                            </div>
                            <div class="inputBox">
                                <input type="file" id="file1" style="display: none" ref="files1" multiple @change="upload1" />
                            </div>
                        </div>
                    </td>
                    <td v-else>{{ tableData.fName }}</td>
                    <th>订单说明：</th>
                    <td v-if="code"><el-input v-model="iptform.remark"></el-input></td>
                    <td v-else>{{ tableData.remark }}</td>
                </tr>
            </table>
            <div class="tie" style="margin: 8px 0; border: 1px solid #bfc3c6">造型修改记录</div>
            <!-- <tab :tableData="tableDatas" :label="label" ref="tab">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'"
                        ><el-button @click="bianji(row)" type="text" size="small" class="lan">编辑</el-button>
                    </span>
                </template>
            </tab> -->
            <tab :tableData="tabData" :label="labels" height="505px">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'status' && row.status == 0">
                        <el-tooltip v-if="!tableData[6]" content="没有权限，不能操作" placement="top">
                            <el-button
                                v-if="row.status == ' '"
                                type="success"
                                size="small"
                                icon="el-icon-check"
                                class="btnPass"
                                style="background: #999999 !important"
                                >通过</el-button
                            >
                        </el-tooltip>
                        <span v-else style="margin-right: 10px">
                            <el-button
                                v-if="row.status == ' '"
                                type="success"
                                size="small"
                                icon="el-icon-check"
                                class="btnPass"
                                @click="tongguo(row)"
                                >通过</el-button
                            >
                        </span>
                        <el-tooltip v-if="!tableData[6]" content="没有权限，不能操作" placement="top">
                            <el-button
                                v-if="row.status == ' '"
                                type="danger"
                                size="small"
                                icon="el-icon-close"
                                class="btnReject"
                                style="background: #999999 !important"
                                >驳回</el-button
                            >
                        </el-tooltip>
                        <span v-else>
                            <el-button
                                v-if="row.status == ' '"
                                type="danger"
                                size="small"
                                icon="el-icon-close"
                                class="btnReject"
                                @click="bohui(row)"
                                >驳回</el-button
                            >
                        </span>
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
            <el-dialog title="添加模具类型" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="模具名称：">
                            <el-input v-model="form.name" placeholder="请输入模具名称"></el-input>
                        </el-form-item>
                        <el-form-item label="模具类型：">
                            <div flex="cross:center">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                                <i style="margin-left: 20px; cursor: pointer" class="el-icon-circle-plus-outline" @click="addLeiXing()"></i>
                            </div>
                        </el-form-item>
                        <el-form-item label="模具数量：">
                            <el-input v-model="form.name" placeholder="请输入数量"></el-input>
                        </el-form-item>
                        <el-form-item label="试模时间：">
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
                        </el-form-item>
                        <el-form-item label="交付时间：">
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期"> </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="Modir()">保存</el-button>
                </span>
            </el-dialog>
        </div>
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
            <el-dialog title="编辑" :visible.sync="Visible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <!-- <el-form-item label="模具编号：">
                            <el-input v-model="form.moldType_id" placeholder="请输入模具编号"></el-input>
                        </el-form-item> -->
                        <el-form-item label="模具名称：">
                            <el-input v-model="form.name" placeholder="请输入模具名称"></el-input>
                        </el-form-item>
                        <el-form-item label="模具类型：">
                            <el-select v-model="form.moldType_name" filterable placeholder="请选择/输入">
                                <el-option
                                    :label="item.name"
                                    :value="item.name"
                                    v-for="(item, index) in this.moju"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="模具数量：">
                            <el-input v-model="form.amount" placeholder="请输入数量"></el-input>
                        </el-form-item> -->
                        <el-form-item label="试模时间：">
                            <el-date-picker
                                v-model="form.testTime"
                                type="datetime"
                                placeholder="请选择试模时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="交付时间：">
                            <el-date-picker
                                v-model="form.endTime"
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
                    <el-button class="dioSave" @click="ModifyOrder()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="驳回原因" :visible.sync="BHvisible" width="600px" @close="BHcancel">
                <div>
                    <el-form ref="form" :model="BHform" label-width="120px">
                        <el-form-item
                            label="原因填写："
                            prop="mask"
                            :rules="[{ required: true, message: '请输入驳回原因', trigger: 'blur' }]"
                        >
                            <el-input
                                type="textarea"
                                maxlength="100"
                                show-word-limit
                                :rows="5"
                                v-model="BHform.mask"
                                placeholder="请输入驳回原因"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave btnOk" @click="BHsave">提交</el-button>
                    <el-button class="dioSave btnCancel" @click="BHcancel">清空</el-button>
                </span>
            </el-dialog>
        </div>
        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { ModifyOrder, BuyerList, MoldTypeList, OrderList, DesignPicListByOrder, AuditDesign } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            moldid: null,
            data: {},
            Visible: false,
            value1: '',
            addLx: false,
            form: {},
            centerDialogVisible: false,
            currentPage: 1,
            total: 0,
            pageSize: 10,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
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
                    prop: 'amount',
                    label: '模具数'
                },
                {
                    prop: 'testTime',
                    label: '试模时间',
                    width: '179'
                },
                {
                    prop: 'endTime',
                    label: '交付时间',
                    width: '179'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '179'
                }
            ],
            tableData: {
                code: ''
            },
            moju: [],
            tableDatas: [
                // {
                //     amount: 10,
                //     buyer_id: 34,
                //     buyer_name: '测试',
                //     code: '10041',
                //     cp_id: 1,
                //     ctTime: '2021-12-21 17:43:37',
                //     endTime: '2021-12-29 00:00:00',
                //     id: 41,
                //     moldType_id: 36,
                //     moldType_name: '蓝牙耳机',
                //     name: '我你',
                //     testTime: '2021-12-02 00:00:00',
                //     user_id: 1,
                //     user_name: '博森管理员'
                // }
            ],
            // 设置只能选择当前日期及之后的日期
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
            Bj: false,
            code: false,
            iptform: {
                code: '',
                buyer_name: '',
                buyer_id: '',
                address: '',
                tel_name: '',
                tel: '',
                name: '',
                moldType_name: '',
                amount: '',
                testTime: '',
                ctTime: '',
                endTime: '',
                remark: '',
                picName: '',
                picURL: '',
                fName: '',
                fURL: '',
                moding: 'true'
            },
            labels: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'img',
                    label: '造型图片',
                    width: '430'
                },
                {
                    prop: 'remark',
                    label: '备注'
                },
                {
                    prop: 'ctTime',
                    label: '上传时间',
                    shijian: true
                },
                {
                    prop: 'status',
                    label: '状态'
                }
            ],
            tabData: [],
            BHvisible: false,
            BHform: {
                mask: ''
            },
            bohuiRow: {},
            urls: '',
            dialogVisible: false
        };
    },
    computed: {},
    watch: {},
    methods: {
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
                this.$set(this.iptform, 'fURL', res.data[0].Name);
                this.$set(this.iptform, 'fName', res.data[0].FName);
                this.$refs.files1.value = null;
            });
        },
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
                this.$set(this.iptform, 'picURL', res.data.Name);
                this.$set(this.iptform, 'picName', res.data.FName);
                this.$refs.files.value = null;
            });
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        bigImg(img) {
            if (img) {
                this.imgBigTu = this.urls + 'Files/ProgramPic/' + img;
                this.dialogVisible = true;
            }
        },
        //通过驳回
        AuditDesign(row, num) {
            let params = {
                id: row.design_id,
                status: num,
                remark: this.BHform.mask,
                user_id: row.user_id
            };
            AuditDesign(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.BHform.mask = '';
                    this.DesignPicListByOrder();
                }
            });
        },
        //列表数据
        DesignPicListByOrder() {
            let params = {
                CP_ID: Number(localStorage.getItem('comp_id')),
                BaseID: this.tableData.id,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            DesignPicListByOrder(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.status == 0) {
                            item.status = ' ';
                        } else if (item.status == 1) {
                            item.status = '驳回';
                        } else {
                            item.status = '通过';
                        }
                    });
                    this.tabData = Data;
                    this.total = PageCount;
                }
            });
        },
        //清空
        BHcancel() {
            this.BHform.mask = '';
            this.$refs.form.resetFields();
        },
        //通过
        tongguo(row) {
            this.$confirm('确认要通过此订单嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // row.status = 2;
                    this.AuditDesign(row, 2);
                })
                .catch(() => {});
        },
        //驳回
        bohui(row) {
            this.$confirm('确认要驳回此订单嘛？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // row.status = 1;
                    this.bohuiRow = row;
                    this.BHvisible = true;
                })
                .catch(() => {});
        },
        //驳回确定
        BHsave() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.BHvisible = false;
                    this.AuditDesign(this.bohuiRow, 1);
                } else {
                    return false;
                }
            });
        },
        //编辑
        Bjbtn() {
            this.iptform.code = this.tableData.code;
            this.iptform.buyer_name = this.tableData.buyer_name;
            this.iptform.buyer_id = this.tableData.buyer_id;
            this.iptform.address = this.tableData.address;
            this.iptform.tel_name = this.tableData.tel_name;
            this.iptform.tel = this.tableData.tel;
            this.iptform.name = this.tableData.name;
            this.iptform.moldType_name = this.tableData.moldType_name;
            this.iptform.amount = this.tableData.amount;
            this.iptform.testTime = this.tableData.testTime;
            this.iptform.ctTime = this.tableData.ctTime;
            this.iptform.endTime = this.tableData.endTime;
            this.iptform.remark = this.tableData.remark;
            this.iptform.moding = this.tableData.moding;
            this.iptform.picURL = this.tableData.picURL;
            this.iptform.picName = this.tableData.picName;
            this.iptform.fName = this.tableData.fName;
            this.iptform.fURL = this.tableData.fURL;
            this.code = true;

            this.$nextTick(() => {
                this.$refs.input.focus();
                this.$refs.input.select();
            });
        },
        //取消
        quxiao() {
            this.code = false;
            this.Bj = false;
            // this.$refs.tab.setkeynull(false);
            this.form.name = '';
            this.form.moldType_name = '';
            this.form.testTime = '';
            this.form.endTime = '';
        },
        //列表
        OrderList() {
            let params = {
                id: this.tableData.id,
                cp_id: localStorage.getItem('comp_id')
            };
            OrderList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableDatas = Data;
                }
            });
        },
        MoldTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            MoldTypeList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.moju = Data;
                }
            });
        },
        //类型
        BuyerList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                buyer_id: this.tableData.buyer_id
            };
            BuyerList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    // this.tableData = Data;
                }
            });
        },
        bianji(row) {
            // this.Visible = true;
            this.Bj = true;
            // this.$refs.tab.setkeynull(true);
            this.form = JSON.parse(JSON.stringify(row));
            this.$refs.input.focus();
            this.$nextTick(() => {
                this.$refs.input.select();
            });
        },
        // 订单编辑
        ModifyOrder() {
            // if (this.iptform.moldType_id == '' || this.iptform.moldType_id == null) {
            //     this.$message.warning('请选择模具编号！');
            //     return;
            // }
            if (this.iptform.name == '') {
                this.$message.warning('请选择模具名称！');
                return;
            }
            if (this.iptform.moldType_name == '') {
                this.$message.warning('请选择模具类型！');
                return;
            }
            if (this.iptform.amount == '' || this.iptform.amount == null) {
                this.$message.warning('请输入模具数量！');
                return;
            }
            if (this.iptform.testTime == '' || this.iptform.testTime == null) {
                this.$message.warning('请输入试模时间！');
                return;
            }
            if (this.iptform.endTime == '' || this.iptform.endTime == null) {
                this.$message.warning('请输入交付时间！');
                return;
            }
            if (this.iptform.testTime >= this.iptform.endTime) {
                this.$message.warning('试模时间不能晚于交付时间！');
                return;
            }
            this.moju.map((item) => {
                if (item.name == this.iptform.moldType_name) {
                    this.moldid = item.id;
                }
            });
            // if (this.iptform.picName || this.iptform.fName) {
            //     if (!this.iptform.moding) {
            //         this.$message.warning('请勾选附件！');
            //         return;
            //     }
            // }

            let params = {
                id: this.tableData.id,
                buyer_id: this.iptform.buyer_id,
                name: this.iptform.name,
                moldType_id: this.moldid,
                testTime: this.iptform.testTime,
                endTime: this.iptform.endTime,
                amount: this.iptform.amount,
                user_id: Number(localStorage.getItem('user_id')),
                CP_ID: Number(localStorage.getItem('comp_id')),
                remark: this.iptform.remark,
                status: this.tableData.status,
                moding: JSON.parse(this.iptform.moding),
                picName: this.iptform.picName,
                picURL: this.iptform.picURL,
                fName: this.iptform.fName,
                fURL: this.iptform.fURL
            };
            ModifyOrder(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.tableData.name = this.iptform.name;
                    this.tableData.amount = this.iptform.amount;
                    this.tableData.testTime = this.iptform.testTime;
                    this.tableData.endTime = this.iptform.endTime;
                    this.tableData.remark = this.iptform.remark;
                    this.tableData.moding = this.iptform.moding;
                    this.tableData.picName = this.iptform.picName;
                    this.tableData.picURL = this.iptform.picURL;
                    this.tableData.fName = this.iptform.fName;
                    this.tableData.fURL = this.iptform.fURL;
                    this.tableData.ctTime = this.getTime();
                    this.code = false;
                }
            });
            this.form = {};
            this.Bj = false;
            this.Visible = false;
        },
        getTime() {
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
            let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
            let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            var gettimes = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            return gettimes;
        },
        open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
        addLeiXing() {
            this.addLx = true;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.DesignPicListByOrder();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.DesignPicListByOrder();
        }
    },
    created() {
        this.url = localStorage.getItem('upDaima');
        this.urls = localStorage.getItem('seeDaima');
        if (this.$route.params.id) {
            localStorage.setItem('rowData', JSON.stringify(this.$route.params));
        } else {
        }
        this.tableData = JSON.parse(localStorage.getItem('rowData'));
        this.tableData.moding = this.tableData.moding.toString();
        this.OrderList();
        this.BuyerList();
        this.MoldTypeList();
        this.DesignPicListByOrder();
    },
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {
        localStorage.removeItem('rowData');
    },
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
        border: none;
        .btn {
            display: flex;
            justify-content: space-between;
            height: 46px;
        }
        .page {
            position: absolute;
            right: 61px;
            bottom: 26px;
        }
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
                    width: 15%;
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
</style>