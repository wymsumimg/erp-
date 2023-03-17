<template>
    <div class="container">
        <div class="title">订单列表</div>
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
            <tab :tableData="tableData" :label="label" style="margin-top: 17px">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'"
                        ><el-button @click="chakan(row)" type="text" size="small" class="lan">查看</el-button>
                        <el-button style="width: 52px" type="text" size="small"></el-button>
                        <el-button type="text" size="small" class="lan" @click="centerDialogVisible = true">编辑</el-button></span
                    >
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
            <el-dialog title="编辑" :visible.sync="centerDialogVisible" width="30%">
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="机台号：">
                            <el-select v-model="form.region" filterable placeholder="请选择/输入">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="liaohao = false">保存</el-button>
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
                    label: '订单号'
                },
                {
                    prop: 'icon',
                    label: '模具编号'
                },
                {
                    prop: 'sort',
                    label: '客户名称'
                },
                {
                    prop: 'path',
                    label: '工艺数量'
                },
                {
                    prop: 'fullPath',
                    label: '机台号'
                },
                {
                    prop: 'fullPath',
                    label: '状态'
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
        chakan(row) {
            this.$router.push({ path: '/checkOrde', params: row });
        },
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
</style>