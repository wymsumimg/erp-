<template>
    <div class="container">
        <!-- <div class="title orderTop">加工任务</div> -->
        <title-name></title-name>
        <el-card class="box-card">
            <!-- <div class="btn">
               
                <div></div>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入料号" clearable v-model="form.search" class="esh"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn" @click="OrderTaskDetialList">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div> -->

            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 300px; text-align: left">
                    加工任务列表
                    <el-tooltip v-if="!btn[26]" content="没有权限，不能操作" placement="top">
                        <el-button class="orderBtn" style="width: 100px; height: 32px; background: #999999 !important">批量创建</el-button>
                    </el-tooltip>
                    <el-button v-else class="orderBtn" style="width: 100px; height: 32px" @click="chuangjian()">批量创建</el-button>
                </div>

                <div flex class="osselect">
                    <el-select v-model="ssVal" @change="search">
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
                    <el-button class="orderBtn" @click="search(true)">搜索</el-button>
                </div>
            </div>
            <tab :tableData="tableData" :label="label" style="margin-top: 8px" :Page="Page" :Size="Size" :he="true" @daima="daima">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <span v-if="!btn[26]" style="margin-right: 10px">
                            <el-tooltip v-if="row.status == '待加工'" content="没有权限，不能操作" placement="top">
                                <el-button style="color: #999999 !important" type="text" size="small" class="lan">{{
                                    row.status != '待创建' ? '编辑' : '创建'
                                }}</el-button>
                            </el-tooltip>
                            <el-tooltip v-else-if="row.status == '加工完成'" content="没有权限，不能操作" placement="top">
                                <el-button style="color: #999999 !important" type="text" size="small" class="lan">{{
                                    row.status != '待创建' ? '编辑' : '创建'
                                }}</el-button>
                            </el-tooltip>
                            <el-tooltip v-else content="没有权限，不能操作" placement="top">
                                <el-button style="color: #999999; margin-right: -10px" type="text" size="small" class="lan">编辑</el-button>
                            </el-tooltip>
                        </span>

                        <span v-else>
                            <el-button
                                v-if="row.status == '待加工'"
                                @click="bianji(row)"
                                type="text"
                                size="small"
                                class="lan"
                                style="margin-right: 10px"
                                >{{ row.status != '待创建' ? '编辑' : '创建' }}</el-button
                            >
                            <el-tooltip
                                v-else-if="row.status == '加工完成'"
                                content="任务已完成，不能编辑"
                                placement="top"
                                :disabled="row.status == '待创建'"
                            >
                                <el-button
                                    :style="row.status != '待创建' ? 'color:#999999' : ''"
                                    @click="bianji(row)"
                                    type="text"
                                    size="small"
                                    class="lan"
                                    >{{ row.status != '待创建' ? '编辑' : '创建' }}</el-button
                                >
                            </el-tooltip>
                            <el-tooltip
                                v-else
                                :content="row.status == '待创建' ? '任务未创建，不能编辑' : '任务已开始，不能编辑'"
                                placement="top"
                            >
                                <el-button style="color: #999999; margin-right: -10px" type="text" size="small" class="lan">编辑</el-button>
                            </el-tooltip>
                        </span>

                        <!-- <el-tooltip v-else content="任务已开始，不能编辑" placement="top" :disabled="row.status == '待创建'">
                            <el-button
                                :style="row.status != '待创建' ? 'color:#999' : ''"
                                @click="bianji(row)"
                                type="text"
                                size="small"
                                class="lan"
                                >{{ row.status != '待创建' ? '编辑' : '创建' }}</el-button
                            >
                        </el-tooltip> -->
                        <!-- <el-button style="width: 5px" type="text" size="small" v-if="row.status == '待加工'"></el-button> -->
                        <el-tooltip v-if="!btn[27]" content="没有权限，不能操作" placement="top" style="margin-right: 10px">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important" v-if="row.status == '待加工'"
                                >删除</el-button
                            >
                        </el-tooltip>
                        <span v-else style="margin-right: 10px">
                            <el-button type="text" size="small" class="hong" @click="open(row)" v-if="row.status == '待加工'"
                                >删除</el-button
                            >
                        </span>

                        <el-tooltip v-if="!btn[62]" content="没有权限，不能操作" placement="top">
                            <el-button type="text" size="small" class="hong" style="color: #999999 !important" v-if="row.status == '待加工'"
                                >跳过</el-button
                            >
                        </el-tooltip>
                        <span v-else>
                            <el-button type="text" size="small" class="hong" @click="qu(row)" v-if="row.status == '待加工'">跳过</el-button>
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
            <el-dialog title="创建加工任务" :visible.sync="centerDialogVisible" width="70%">
                <div>
                    <el-form ref="form" :inline="true" :model="form" label-width="120px">
                        <el-row>
                            <el-form-item label="料号-订单号：">
                                <el-input v-model="form.name" placeholder="请输入订单号"></el-input>
                            </el-form-item>
                            <i style="display: inline-block; width: 48px"></i>
                            <el-form-item label="料号名：">
                                <el-input v-model="form.name" placeholder="请输入料号名"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="选择工艺：">
                            <div flex="cross:center">
                                <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                                <i style="margin-left: 20px; cursor: pointer" class="el-icon-circle-plus-outline" @click="addLeiXing()"></i>
                            </div>
                        </el-form-item>
                        <el-form-item label="机台号：">
                            <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始时间：">
                            <el-date-picker v-model="form.value1" type="date" placeholder="选择日期"> </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddOrderTaskDetial()">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="添加类型" :visible.sync="addLx" width="30%">
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
            <el-dialog :title="this.forms.status == '待创建' ? '创建' : '编辑'" :visible.sync="bianjiVisible" width="820px">
                <div>
                    <el-form ref="form" :model="forms" label-width="120px" style="display: flex; justify-content: center">
                        <div>
                            <el-form-item label="订单开始时间：">
                                <el-input v-model="forms.workBegin" :disabled="true"> </el-input>
                            </el-form-item>
                            <el-form-item label="结束时间：">
                                <el-input v-model="forms.workEnd" :disabled="true"> </el-input>
                            </el-form-item>
                            <el-form-item label="机台号：">
                                <el-select v-model="forms.device_id" placeholder="请选择机台号">
                                    <el-option label="暂不选择" value="0"></el-option>
                                    <!-- <el-option
                                        :label="`#${item.room}-${item.device_name} ${item.craft_name}`"
                                        :value="item.device_id"
                                        v-for="(item, index) in this.jichuang"
                                        :key="index"
                                    ></el-option> -->
                                    <div v-show="flagjc">
                                        <el-option
                                            :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                            :value="items.device_id"
                                            v-for="(items, index) in jichuang"
                                            :key="index"
                                        ></el-option>
                                    </div>
                                    <div v-show="!flagjc">
                                        <el-option
                                            :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                            :value="items.device_id"
                                            v-for="(items, index) in rowJichuang"
                                            :key="index"
                                        ></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="bj">
                            <el-form-item label="加工开始时间：">
                                <el-date-picker
                                    v-model="forms.begintime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间：">
                                <el-date-picker
                                    v-model="forms.endtime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="Save()">保存</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="dialogclass">
            <el-dialog title="修改记录" :visible.sync="chakanVisible" width="30%">
                <div>
                    <tab :tableData="tableData" :label="label"></tab>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave">保存</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogclass">
            <el-dialog title="批量创建" :visible.sync="chuangjianVisible" width="1450px">
                <div style="border-bottom: 1px solid #b1b8bc">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
                        <el-form-item label="模具名称：">
                            <el-select v-model="formInline.ming" placeholder="请选择模具名" @change="Mchange()">
                                <el-option :label="item" :value="item" v-for="(item, index) in ming" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工件名称：">
                            <el-select v-model="formInline.GJming" placeholder="请选择工件名" @focus="GJming()" @change="GJchange()">
                                <!-- <el-option label="全部" value="0"></el-option> -->
                                <el-option :label="item" :value="item" v-for="(item, index) in GJmings" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="料号名称：">
                            <el-select v-model="formInline.LHming" placeholder="请选择料号名" @change="LHchange()">
                                <!-- <el-option label="全部" value="0"></el-option> -->
                                <el-option :label="item" :value="item" v-for="(item, index) in LHmings" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="间隔时间：">
                            <el-input
                                oninput="value=value.replace(/[^\d]/g,'')"
                                v-model="formInline.region"
                                clearable
                                placeholder="请输入间隔时间(分钟)"
                                @focus="JGchange()"
                                @change="JSchange()"
                            ></el-input>
                            <!-- <el-select v-model="formInline.region" clearable placeholder="请选择间隔时间" @change="JGchange()">
                                <el-option :label="item.label" :value="item.value" v-for="(item, index) in jiange" :key="index"></el-option>
                            </el-select> -->
                        </el-form-item>

                        <el-form-item label="计划时间：">
                            <div v-if="formInline.workBegin">{{ formInline.workBegin }} — {{ formInline.workEnd }}</div>
                            <!-- <el-date-picker
                                v-model="formInline.workBegin"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions0"
                                :disabled="true"
                            >
                            </el-date-picker> -->
                        </el-form-item>
                        <!-- <el-form-item label="结束时间："> -->
                        <!-- <el-date-picker
                                v-model="formInline.workEnd"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions0"
                                :disabled="true"
                            >
                            </el-date-picker> -->
                        <!-- </el-form-item> -->
                    </el-form>
                </div>

                <div
                    v-if="xian"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    style="height: 500px; margin-top: 20px; overflow: auto"
                >
                    <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        label-width="120px"
                        v-for="(item, index) in XJzu"
                        :key="index"
                    >
                        <el-form-item :label="`工艺${index + 1}：`">
                            <el-input
                                :value="`${item.material_name} - ${item.craft_name}`"
                                placeholder="请选择模具名"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间：" class="XX">
                            <el-date-picker
                                v-model="item.begintime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :disabled="Boolean(fuju[index].begintime)"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：" class="XX">
                            <el-date-picker
                                v-model="item.endtime"
                                type="datetime"
                                placeholder="选择日期时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :disabled="Boolean(fuju[index].endtime)"
                                @change="JSchange()"
                                @blur="JSblur(index)"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="机台号：">
                            <el-select
                                v-model="item.device_id"
                                placeholder="请选择机台"
                                :disabled="Boolean(fuju[index].device_id == 0 || fuju[index].device_id)"
                                @focus="DeviceList(item)"
                            >
                                <el-option label="暂不选择" :value="0"></el-option>

                                <div v-show="flagjc">
                                    <el-option
                                        :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                        :value="items.device_id"
                                        v-for="(items, index) in jichuang"
                                        :key="index"
                                    ></el-option>
                                </div>
                                <div v-show="!flagjc">
                                    <el-option
                                        :label="`#${items.room}-${items.device_name} ${items.craft_name}`"
                                        :value="items.device_id"
                                        v-for="(items, index) in rowJichuang"
                                        :key="index"
                                    ></el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else style="height: 500px; margin-top: 20px; overflow: auto"></div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" v-no-more-click @click="XJsave()">保存</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="dialogclass">
            <el-dialog title="代码数据" :visible.sync="scVisible" width="1300px" :shai="true">
                <div class="tabBox">
                    <tab :tableData="tableDatas" :filters="filters" :label="labels" :shai="false" :height="500"> </tab>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import {
    OrderTaskDetialList,
    AddOrderTaskDetial,
    ModifyOrderTaskDetial,
    DeleteOrderTaskDetial,
    DeviceList,
    OrderList,
    AddOrderTaskDetials,
    ProgramFileList,
    CancelOrderTaskDetial
} from '@/api/api';
import { BomTypeList } from '@/api/base';
export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            chakanVisible: false,
            forms: {
                id: 0
            },
            bianjiVisible: false,
            addLx: false,
            form: {
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
                    width: '50'
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
                    prop: 'begintime',
                    label: '计划开始时间',
                    width: '170',
                    shijian: true
                },
                {
                    prop: 'endtime',
                    label: '计划结束时间',
                    width: '170',
                    shijian: true
                },
                {
                    prop: 'begintimeReal',
                    label: '实际开始时间',
                    width: '170',
                    shijian: true
                },
                {
                    prop: 'endtimeReal',
                    label: '实际结束时间',
                    width: '170',
                    shijian: true
                },
                {
                    prop: 'totalsecond',
                    label: '时长',
                    width: '160',
                    shijian: true
                },
                {
                    prop: 'buyer_name',
                    label: '客户名称'
                },
                {
                    prop: 'programCount',
                    label: '代码数量'
                },
                {
                    prop: 'endCount',
                    label: '完成数量'
                },
                {
                    prop: 'status',
                    label: '状态',
                    sortable: true
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '140'
                }
            ],
            tableData: [],
            jichuang: [],
            rowJichuang: [],
            flagjc: true,
            selectStatus: [
                {
                    id: '',
                    name: '全部订单'
                },
                {
                    id: -1,
                    name: '待创建'
                },
                {
                    id: 0,
                    name: '待加工'
                },
                {
                    id: 1,
                    name: '加工中'
                },
                {
                    id: 2,
                    name: '加工完成'
                },
                // {
                //     id: 3,
                //     name: '准备加工'
                // },
                {
                    id: 4,
                    name: '加工暂停'
                },
                {
                    id: 5,
                    name: '工艺跳过'
                }
            ],
            ssVal: '',
            Page: 1,
            Size: 20,
            // 设置只能选择当前日期及之后的日期
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
            chuangjianVisible: false,
            formInline: {},
            ming: [],
            XJzu: [],
            jiange: [
                { label: '10分钟', value: 10 },
                { label: '20分钟', value: 20 },
                { label: '30分钟', value: 30 },
                { label: '40分钟', value: 40 },
                { label: '50分钟', value: 50 },
                { label: '60分钟', value: 60 }
            ],
            shuju: [],
            GJmings: [],
            LHmings: [],
            fuju: [],
            BJVisible: false,
            scVisible: false,
            tableDatas: [],
            labels: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '50'
                },
                {
                    prop: 'groupName',
                    label: '分组',
                    shijian: true
                },
                {
                    prop: 'name',
                    label: '代码名',
                    width: '350',
                    name: true
                },
                {
                    prop: 'ctTime',
                    label: '上传时间',
                    width: '160',
                    shijian: true
                },
                {
                    prop: 'begintime',
                    label: '开始时间',
                    width: '160',
                    shijian: true
                },
                {
                    prop: 'endtime',
                    label: '结束时间',
                    width: '160',
                    shijian: true
                },
                {
                    prop: 'totalsecond',
                    label: '时长',
                    width: '160',
                    shijian: true
                },
                {
                    prop: 'status',
                    label: '状态',
                    sortable: true
                }
            ],
            loading: false,
            xian: false,
            filters: [],
            options: [],
            value2: [],
            btn: {}
        };
    },
    computed: {},
    watch: {
        chuangjianVisible: function (val) {
            if (val == false) {
                this.form.search = '';
                this.XJzu = [];
                this.LHmings = [];
                this.handleCurrentChange(1);
            }
        },
        currentPage: function (val) {
            this.Page = val;
        },
        pageSize: function (val) {
            this.Size = val;
        }
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
        search() {
            this.currentPage = 1;
            this.OrderTaskDetialList();
        },
        JSblur(index) {
            this.XJzu[index].device_id = 0;
        },
        qu(row) {
            this.$confirm('此操作将跳过该工艺, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    console.log(row);
                    let params = {
                        id: row.id
                    };
                    CancelOrderTaskDetial(params).then((res) => {
                        let { Data, ReturnCode } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        }
                    });
                    this.OrderTaskDetialList();
                })
                .catch(() => {});
        },
        SecondToDate(msd) {
            var time = msd;
            if (null != time && '' != time) {
                if (time > 60 && time < 60 * 60) {
                    time = parseInt(time / 60.0) + '分钟' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + '秒';
                } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0) +
                        '小时' +
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
                        '分钟' +
                        parseInt(
                            (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
                                60
                        ) +
                        '秒';
                } else if (time >= 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0 / 24) +
                        '天' +
                        parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24) +
                        '小时' +
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
                        '分钟' +
                        parseInt(
                            (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
                                60
                        ) +
                        '秒';
                } else {
                    time = parseInt(time) + '秒';
                }
            }
            return time;
        },
        daima(row) {
            this.scVisible = true;
            //代码列表

            let params = {
                cp_id: localStorage.getItem('comp_id'),
                BaseID: row.id
            };
            ProgramFileList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.totalsecond > 0) {
                            item.totalsecond = this.SecondToDate(item.totalsecond);
                        } else {
                            item.totalsecond = '-';
                        }
                        if (item.status == -1) {
                            item.status = '待创建';
                        } else if (item.status == 0) {
                            item.status = '待加工';
                        } else if (item.status == 1) {
                            item.status = '加工中';
                        } else if (item.status == 2) {
                            item.status = '加工完成';
                        } else if (item.status == 3) {
                            item.status = '准备加工';
                        } else if (item.status == 4) {
                            item.status = '加工暂停';
                        } else if (item.status == 5) {
                            item.status = '工艺跳过';
                        }
                    });
                    this.tableDatas = Data;
                    let newfilter = [];

                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].groupName != '') {
                            newfilter.push({ text: Data[i].groupName, value: Data[i].groupName });
                        }
                    }
                    var obj = {};
                    newfilter = newfilter.reduce(function (item, next) {
                        obj[next.value] ? '' : (obj[next.value] = true && item.push(next));
                        return item;
                    }, []);
                    this.filters = newfilter;
                }
            });
        },
        GJchange() {
            this.xian = false;
            this.loading = true;
            let XJzus = [];
            for (let i = 0; i < this.shuju.length; i++) {
                if (this.formInline.GJming == '') {
                    XJzus = this.shuju;
                }
                if (this.shuju[i].bomType_name === this.formInline.GJming && this.shuju[i].order_name === this.formInline.ming) {
                    XJzus.push(this.shuju[i]);
                }
            }
            if (this.formInline.GJming == undefined) {
                this.LHmings = [];
            }
            this.fuju = JSON.parse(JSON.stringify(XJzus));
            this.XJzu = XJzus;
            // this.XJzu.map((item) => {
            //     if (this.formInline.GJming == item.bomType_name) {
            //         this.XJzu.push(item);
            //     }
            // });
            // this.formInline.LHming = '0';
            this.timers();
            this.formInline.LHming = '';
            this.LHming();
        },
        //获取工件名
        GJming() {
            // this.xian = false;
            this.XJzu.map((item) => {
                if (this.GJmings.indexOf(item.bomType_name) == -1) {
                    this.GJmings.push(item.bomType_name);
                }
            });
            if (!this.formInline.ming) {
                this.GJmings = [];
            }
        },
        LHchange() {
            this.loading = true;
            let XJzus = [];
            for (let i = 0; i < this.shuju.length; i++) {
                if (this.formInline.LHming == undefined) {
                    XJzus = this.shuju;
                }
                if (
                    this.shuju[i].material_name === this.formInline.LHming &&
                    this.shuju[i].bomType_name === this.formInline.GJming &&
                    this.shuju[i].order_name === this.formInline.ming
                ) {
                    XJzus.push(this.shuju[i]);
                }
            }
            this.fuju = JSON.parse(JSON.stringify(XJzus));
            this.XJzu = XJzus;
            // this.XJzu.map((item) => {
            //     if (this.formInline.GJming == item.bomType_name) {
            //         this.XJzu.push(item);
            //     }
            // });
            // console.log(this.formInline.LHming);
            if (this.formInline.LHming == undefined) {
                this.GJchange();
            }
            this.xian = true;
            this.timers();
        },
        timers() {
            this.timer = setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        //获取料号名
        LHming() {
            this.xian = false;
            this.LHmings = [];
            this.XJzu.map((item) => {
                if (this.LHmings.indexOf(item.material_name) == -1) {
                    this.LHmings.push(item.material_name);
                }
            });
            if (!this.formInline.GJming) {
                this.LHmings = [];
            }
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

            var Y = date.getFullYear() + '-';

            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';

            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';

            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

            return Y + M + D + h + m + s;
        },
        JSchange() {
            if (this.formInline.region) {
                for (let i = 0; i < this.XJzu.length; i++) {
                    if (this.XJzu[i].endtime && i + 1 < this.XJzu.length) {
                        if (!this.XJzu[i + 1].begintime) {
                            this.XJzu[i + 1].begintime = this.timestampToTime(
                                this.formInline.region * 60000 + new Date(this.XJzu[i].endtime).getTime()
                            );
                        }
                    }
                }
            }
            for (let i = 0; i < this.XJzu.length; i++) {
                if (this.XJzu[i].begintime && this.XJzu[i].begintime == this.XJzu[i].endtime) {
                    this.$message({
                        type: 'warning',
                        message: '开始不能和结束时间一样!'
                    });
                    return;
                }
            }
        },
        JGchange() {
            console.log(this.formInline.region, 1111111111111111111111);
        },
        //批量添加保存
        XJsave() {
            let params = [];
            for (let i = 0; i < this.XJzu.length; i++) {
                if (this.XJzu[i].begintime != null) {
                    // if (this.XJzu[i].begintime == null) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '请填写开始时间!'
                    //     });
                    //     return;
                    // }
                    // if (this.XJzu[i].endtime == null) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '请填写结束时间!'
                    //     });
                    //     return;
                    // }
                    // if (this.XJzu[0].begintime == null) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '请填写上一段工艺加工时间!'
                    //     });
                    //     return;
                    // }
                    // if (new Date(this.XJzu[0].endtime).getTime() <= new Date(this.XJzu[0].begintime).getTime()) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '加工结束时间不能早于开始时间!'
                    //     });
                    //     return;
                    // }
                    // if (i != 0 ? new Date(this.XJzu[i - 1].endtime).getTime() >= new Date(this.XJzu[i].begintime).getTime() : false) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '加工开始时间不能早于上一段工艺结束时间!'
                    //     });
                    //     return;
                    // }
                    // if (new Date(this.XJzu[i].endtime).getTime() <= new Date(this.XJzu[i].begintime).getTime()) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '加工结束时间不能早于开始时间!'
                    //     });
                    //     return;
                    // }
                    // if (i != 0 ? new Date(this.XJzu[i - 1].endtime).getTime() >= new Date(this.XJzu[i].endtime).getTime() : false) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '加工结束时间不能早于上一段工艺结束时间!'
                    //     });
                    //     return;
                    // }

                    // if (
                    //     new Date(this.XJzu[i].begintime).getTime() <= new Date(this.formInline.workBegin).getTime() ||
                    //     new Date(this.XJzu[i].endtime).getTime() >= new Date(this.formInline.workEnd).getTime()
                    // ) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '时间应在计划时间范围之内!'
                    //     });
                    //     return;
                    // }
                    // if (this.XJzu[i].device_id == null) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '请选择机台!'
                    //     });
                    //     return;
                    // }
                    // if (this.XJzu[i].begintime && i != 0 ? this.XJzu[i - 1].begintime == null : false) {
                    //     this.$message({
                    //         type: 'warning',
                    //         message: '请填写上一段工艺加工时间!'
                    //     });
                    //     return;
                    // }
                    if (!this.fuju[i].begintime) {
                        params.push({
                            // processFlowDetial_id: this.XJzu[i].processFlow_detial,
                            cp_id: this.XJzu[i].cp_id,
                            task_id: this.XJzu[i].task_id,
                            order_id: this.XJzu[i].order_id,
                            bom_craftDetial_id: this.XJzu[i].bom_craftDetial_id,
                            begintime: this.XJzu[i].begintime,
                            endtime: this.XJzu[i].endtime,
                            user_id: Number(localStorage.getItem('user_id')),
                            status: 0,
                            totalsecond: 0,
                            device_id: this.XJzu[i].device_id == '暂无选择' ? 0 : this.XJzu[i].device_id,
                            mark: '',
                            bom_craft_id: this.XJzu[i].bom_craft_id

                            // bom_id: this.XJzu[i].bom_id,
                            // craft: this.XJzu[i].craft_id,
                            // design_id: this.XJzu[i].design_id,
                            // m_order: this.XJzu[i].m_order
                        });
                    }
                }
            }
            if (params.length <= 0) {
                return this.$message({
                    type: 'error',
                    message: '添加失败!'
                });
            }

            AddOrderTaskDetials(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '添加失败!'
                    });
                }
                this.chuangjianVisible = false;
            });
        },
        Mchange() {
            // this.loading = true;
            this.formInline.GJming = '';
            this.formInline.LHming = '';
            this.xian = false;
            this.GJming();
            this.GJmings = [];
            this.form.search = this.formInline.ming;
            this.DeviceList();
            this.OrderTaskDetialList(0);
        },
        //模具名称
        OrderList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            OrderTaskDetialList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.ming = [];
                    Data.map((item) => {
                        console.log();
                        if (this.ming.indexOf(item.order_name) == -1) {
                            this.ming.push(item.order_name);
                        }
                    });
                }
            });
        },
        //创建
        chuangjian() {
            this.formInline = {};
            this.OrderList();
            this.chuangjianVisible = true;
        },
        //设备列表
        DeviceList(row) {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            if (row) {
                params.BaseID = row.craft_id;
            }
            DeviceList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    if (row) {
                        this.rowJichuang = Data;
                        this.flagjc = false;
                    } else {
                        this.jichuang = Data;
                        this.flagjc = true;
                    }
                }
            });
        },
        Save() {
            console.log(this.forms.status);
            if (this.forms.status == '待创建') {
                this.AddOrderTaskDetial();
            } else {
                this.ModifyOrderTaskDetial();
            }
        },
        xqPage() {
            this.$router.push('/SchedulingDetailsPage');
        },
        // 加工任务删除
        DeleteOrderTaskDetial(row) {
            let params = {
                id: row.id
            };
            DeleteOrderTaskDetial(params).then((res) => {
                let { Data, ReturnCode, ErrorMessage } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.OrderTaskDetialList();
                }
                if (ReturnCode == 203) {
                    this.$message.error(ErrorMessage);
                }
            });
        },
        bianji(row) {
            if (row.status == '待创建' || row.status == '待加工') {
            } else {
                return;
            }
            this.forms = JSON.parse(JSON.stringify(row));
            if (this.forms.device_id == 0) {
                this.forms.device_id = '暂无选择';
            }
            console.log(this.forms);
            // if (this.forms.id == null) {
            //     this.forms.begintime = new Date();
            // } else {
            // }
            this.bianjiVisible = true;
            this.DeviceList(row);
        },
        //加工任务编辑
        ModifyOrderTaskDetial() {
            // if (this.forms.begintime == null || this.forms.endtime == null) {
            //     this.$message.warning('请输入开始/结束时间！');
            //     return;
            // }
            // if (new Date(this.forms.workBegin).getTime() >= new Date(this.forms.begintime).getTime()) {
            //     this.$message.warning('开始时间晚于该订单开始时间！');
            //     return;
            // }
            // if (new Date(this.forms.workEnd).getTime() <= new Date(this.forms.endtime).getTime()) {
            //     this.$message.warning('结束时间早于该订单结束时间！');
            //     return;
            // }

            // if (new Date(this.forms.begintime).getTime() >= new Date(this.forms.endtime).getTime()) {
            //     this.$message.warning('开始时间不能晚于结束时间！');
            //     return;
            // }
            let params = {
                id: this.forms.id,
                cp_id: this.forms.cp_id,
                task_id: this.forms.task_id,
                order_id: this.forms.order_id,
                bom_craftDetial_id: this.forms.bom_craftDetial_id,
                begintime: this.forms.begintime,
                endtime: this.forms.endtime,
                user_id: this.forms.user_id,
                status: 0,
                totalsecond: this.forms.totalsecond == '-' ? 0 : this.forms.totalsecond,
                device_id: this.forms.device_id == '暂无选择' ? 0 : this.forms.device_id,
                mark: '',
                bom_craft_id: this.forms.bom_craft_id
            };
            ModifyOrderTaskDetial(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.OrderTaskDetialList();
                }
            });

            this.bianjiVisible = false;
        },
        addLeiXing() {
            this.addLx = true;
        },
        // 加工任务添加
        AddOrderTaskDetial() {
            if (this.forms.begintime == null || this.forms.endtime == null) {
                this.$message.warning('请输入开始/结束时间！');
                return;
            }
            // if (new Date(this.forms.workBegin).getTime() >= new Date(this.forms.begintime).getTime()) {
            //     this.$message.warning('加工开始时间不能晚于该订单开始时间！');
            //     return;
            // }
            // if (new Date(this.forms.workEnd).getTime() <= new Date(this.forms.endtime).getTime()) {
            //     this.$message.warning('加工结束时间不能晚于该订单交付时间！');
            //     return;
            // }
            // if (new Date(this.forms.begintime).getTime() >= new Date(this.forms.endtime).getTime()) {
            //     this.$message.warning('开始时间不能晚于结束时间！');
            //     return;
            // }
            if (new Date(this.forms.workBegin).getTime() >= new Date(this.forms.begintime).getTime()) {
                this.$message.warning('加工开始时间晚于该订单开始时间！');
                return;
            }
            if (new Date(this.forms.workEnd).getTime() <= new Date(this.forms.endtime).getTime()) {
                this.$message.warning('加工结束时间早于该订单结束时间！');
                return;
            }

            if (new Date(this.forms.begintime).getTime() >= new Date(this.forms.endtime).getTime()) {
                this.$message.warning('开始时间不能晚于结束时间！');
                return;
            }
            let params = {
                cp_id: this.forms.cp_id,
                processFlowDetial_id: this.forms.processFlow_detial,
                order_id: this.forms.order_id,
                task_id: this.forms.task_id,
                bom_id: this.forms.bom_id,
                craft: this.forms.craft_id,
                begintime: this.forms.begintime,
                endtime: this.forms.endtime,
                user_id: localStorage.getItem('user_id'),
                status: 0,
                totalsecond: 0,
                device_id: this.forms.device_id == '暂无选择' ? 0 : this.forms.device_id,
                design_id: this.forms.design_id
            };
            AddOrderTaskDetial(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.OrderTaskDetialList();
                }
            });
            this.bianjiVisible = false;
        },
        // 加工任务列表
        OrderTaskDetialList(zhi) {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                QueryString2: this.form.search2,
                EndablePager: zhi == 0 ? 0 : 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                BomType: this.value2
                // BeginTime: `2022-01-10 00:00:00`,
                // EndTime: `2022-01-10 23:59:59`
            };

            // if (this.ssVal == '') {
            // } else if (this.ssVal == 0) {
            //     params.Status = this.ssVal;
            // } else {
            //     params.Status = this.ssVal;
            // }
            if (Math.abs(this.ssVal) >= 0) {
                params.Status = this.ssVal;
            }

            OrderTaskDetialList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200 && this.chuangjianVisible == true) {
                    let zu = [];
                    Data.map((item) => {
                        if (item.order_name == this.formInline.ming) {
                            zu.push(item);
                        }
                    });
                    this.formInline.workBegin = zu[0].workBegin;
                    this.formInline.workEnd = zu[0].workEnd;
                    this.shuju = JSON.parse(JSON.stringify(zu));
                    this.fuju = JSON.parse(JSON.stringify(zu));
                    this.XJzu = zu;
                }
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        // if (item.status == -1) {
                        //     item.status = '待创建';
                        // } else {
                        //     item.status = '已创建';
                        // }
                        if (item.totalsecond > 0) {
                            item.totalsecond = this.SecondToDate(item.totalsecond);
                        } else {
                            item.totalsecond = '-';
                        }
                        if (item.status == -1) {
                            item.status = '待创建';
                        } else if (item.status == 0) {
                            item.status = '待加工';
                        } else if (item.status == 1) {
                            item.status = '加工中';
                        } else if (item.status == 2) {
                            item.status = '加工完成';
                        } else if (item.status == 3) {
                            item.status = '准备加工';
                        } else if (item.status == 4) {
                            item.status = '加工暂停';
                        } else if (item.status == 5) {
                            item.status = '工艺跳过';
                        }
                    });

                    this.tableData = Data;
                    this.total = PageCount;
                }
                // this.loading = false;
            });
        },
        open(row) {
            this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
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
            this.OrderTaskDetialList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.OrderTaskDetialList();
        }
    },
    created() {
        this.ssVal = this.$route.query.info ? JSON.parse(this.$Base64.decode(this.$route.query.info)).status : '';

        this.OrderTaskDetialList();
        this.btn = this.rightControl();
    },
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {
        clearTimeout(this.timer);
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
        .el-select__tags {
            flex-wrap: unset !important;
        }
    }
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
::v-deep.dialogclass .el-input__inner {
    width: 200px;
}
::v-deep.dialogclass .XX .el-date-editor--datetime .el-input__suffix {
    right: 18px !important;
}
::v-deep.dialogclass .bj .el-input__suffix {
    right: 18px !important;
}
// ::v-deep.el-table--border {
//     min-height: 730px;
// }
// ::v-deep.el-table--scrollable-y .el-table__body-wrapper {
//     min-height: 683px;
// }

::v-deep.tabBox td {
    padding: 15px 0 !important;
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>