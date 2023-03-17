<template>
    <div class="container">
        <title-name></title-name>
        <el-card class="box-card">
            <div class="tableTop" flex="cross:center" style="margin-top: 0">
                <div style="width: 150px">模具档案列表</div>

                <div style="width: 100%" flex="cross:center main:justify">
                    <div></div>

                    <div class="orderSearches" flex="cross:center ">
                        <el-input placeholder="请输入模具名称" clearable v-model="form.search"></el-input>
                        <el-button class="orderBtn btnOk" @click="search">搜索</el-button>
                    </div>
                </div>
            </div>

            <tab :tableData="tableData" :label="label" :Page="Page" :Size="Size">
                <template slot-scope="{ item, row }">
                    <span v-if="item.prop === 'operation'">
                        <el-tooltip v-if="!btn[61]" content="没有权限，不能操作" placement="top">
                            <el-button style="color: #999999 !important" type="text" size="small" class="lan">查看</el-button>
                        </el-tooltip>
                        <el-button v-else @click="chakan(row)" type="text" size="small" class="lan">查看</el-button>
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
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { OrderList } from '@/api/api';

export default {
    name: 'orderList',
    components: { tab, page },

    data() {
        return {
            form: {
                search: ''
            },
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
                    prop: 'code',
                    label: '订单号'
                },
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
                    width: '179'
                },
                {
                    prop: 'endTime',
                    label: '交付时间',
                    width: '179'
                },
                {
                    prop: 'status',
                    label: '订单状态'
                },
                {
                    prop: 'ctTime',
                    label: '创建时间',
                    width: '179'
                },
                {
                    prop: 'remark',
                    label: '订单说明'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '179'
                }
            ],
            tableData: [],
            Page: 1,
            Size: 20,
            btn: {}
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
        //查看
        chakan(row) {
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
        //列表
        OrderList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            OrderList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.status == 0) {
                            item.status = '待设计';
                        } else if (item.status == 1) {
                            item.status = '待审核';
                        } else if (item.status == 2) {
                            item.status = '造型通过';
                        } else if (item.status == 3) {
                            item.status = 'BOM设计';
                        } else if (item.status == 4) {
                            item.status = '生产中';
                        } else if (item.status == 5) {
                            item.status = '试模';
                        } else if (item.status == 6) {
                            item.status = '维修';
                        } else if (item.status == 7) {
                            item.status = '交付';
                        } else if (item.status == 8) {
                            item.status = '分配工艺';
                        } else if (item.status == 9) {
                            item.status = '任务分配';
                        } else if (item.status == 10) {
                            item.status = '造型未通过';
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
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
        this.btn = this.rightControl();
    },
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
}
</style>
