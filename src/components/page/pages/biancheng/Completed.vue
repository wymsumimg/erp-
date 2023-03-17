<template>
    <div class="container">
        <div class="title">
            <router-link to="/listPendingOrders" style="color: #2a5389">待完成订单</router-link> > <span style="color: #345aff">查看</span>
        </div>
        <el-card class="box-card">
            <div class="btn">
                <div></div>

                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="butn">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tie" style="margin-top: 28px">基本资料</div>
            <table class="tab">
                <tr>
                    <th width="173px" height="45px">订单号：</th>
                    <td width="346px">1634739890</td>
                    <th width="173px">模具编号：</th>
                    <td width="346px">Y01-ZDY-10</td>
                    <th width="173px">客户名称：</th>
                    <td width="346px">精诚时代</td>
                    <th width="173px">试模时间：</th>
                    <td width="346px">2021-12-01</td>
                    <th width="173px">交付时间：</th>
                    <td width="346px">2021-12-03</td>
                </tr>
            </table>
            <tab :tableData="tableData" :label="label" style="margin-top: 21px">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'"
                        ><el-button @click="chakanVisible = true" type="text" size="small" class="lan">详情</el-button>
                        <el-button style="width: 52px" type="text" size="small"></el-button>
                        <el-button type="text" size="small" class="lan" @click="centerDialogVisible = true">上传</el-button>
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
            <el-dialog title="上传" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="选择文件：">
                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
                                <el-button size="small" type="primary" style="margin: 0 0 0 89px; font-size: 18px">···</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="liaohao = false">保存</el-button>
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
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';

export default {
    name: 'orderList',
    components: { tab, page },
    data() {
        return {
            chakanVisible:false,
            form: {},
            centerDialogVisible: false,
            currentPage: 1,
            total: 50,
            pageSize: 10,
            label: [
                {
                    prop: 'name',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'city',
                    label: '模具编号'
                },
                {
                    prop: 'icon',
                    label: '模具名称'
                },
                {
                    prop: 'sort',
                    label: '模具类型'
                },
                {
                    prop: 'path',
                    label: '模具数'
                },
                {
                    prop: 'fullPath',
                    label: '交付时间'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '289'
                }
            ],
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }
            ]
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    created() {},
    mounted() {},
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
.container {
    padding: 0;
    .title {
        height: 56px;
        background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #2a5389;
        line-height: 56px;
        padding-left: 13px;
    }
    .box-card {
        widows: 100%;
        height: calc(100% - 60px);
        border-radius: 0;
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
            line-height: 50px;
            height: 50px;
            background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
            border: 1px solid #bfc3c6;
            padding-left: 21px;
            margin-top: 28px;
            border-bottom: none;
        }
        .tab {
            border-collapse: collapse;
            border: none;
            th {
                border: solid #b2b6b8 1px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #2a5389;
                text-align: right;
            }
            td {
                border: solid #b2b6b8 1px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                padding-left: 20px;
            }
        }
    }
}
.el-button--text {
    color: #e6331d;
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
</style>