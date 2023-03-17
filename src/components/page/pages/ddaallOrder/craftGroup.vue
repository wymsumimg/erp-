<template>
    <div class="container">
        <!-- <div class="title orderTop" style="border-bottom: none">工艺管理</div> -->
        <title-name></title-name>
        <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
            <div style="width: 150px; text-align: left">工艺列表</div>

            <div flex class="osselect">
                <el-select v-model="ssVal" @change="search">
                    <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>

                <el-input style="margin-left: 1px" v-model="form.search" clearable placeholder="请输入模具名称"></el-input>
                <el-button class="orderBtn" @click="search">搜索</el-button>
            </div>
        </div>
        <tab :tableData="tableData" :label="label" :Page="Page" :Size="Size" :he="true">
            <template slot-scope="{ item, row }">
                <span v-if="item.prop === 'operation'">
                    <!-- <el-tooltip v-if="row.status == '已创建'" content="任务已创建" placement="top">
                        <el-button style="color: #999" type="text" size="small" class="lan">创建</el-button>
                    </el-tooltip> -->
                    <el-tooltip v-if="!btn[55]" content="没有权限，不能操作" placement="top">
                        <el-button v-if="row.status == '待设计'" type="text" size="small" class="lan" style="color: #999999 !important"
                            >创建</el-button
                        >
                        <el-button v-else type="text" size="small" class="lan" style="color: #999999 !important">编辑</el-button>
                    </el-tooltip>

                    <span v-else style="margin-right: 10px">
                        <el-button v-if="row.status == '待设计'" type="text" size="small" class="lan" @click="AddBomCraft(row)"
                            >创建</el-button
                        >
                        <el-button v-else type="text" size="small" class="lan" @click="AddBomCraft(row, true)">编辑</el-button>
                    </span>

                    <!-- <el-tooltip v-if="row.status == '待创建'" content="任务待创建" placement="top">
                        <el-button style="color: #999" type="text" size="small" class="lan">编辑</el-button>
                    </el-tooltip> -->
                    <el-tooltip v-if="!btn[57]" content="没有权限，不能操作" placement="top">
                        <el-button v-if="row.status == '待设计'" type="text" size="small" class="hong" style="color: #999">删除</el-button>
                        <el-button v-else type="text" size="small" class="hong" style="color: #999999 !important">删除</el-button>
                    </el-tooltip>
                    <span v-else>
                        <el-button v-if="row.status == '待设计'" type="text" size="small" class="hong" style="color: #999">删除</el-button>
                        <el-button v-else type="text" size="small" class="hong" @click="DeleteBomCraft(row)">删除</el-button>
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
        >
        </page>
    </div>
</template>

<script>
import tab from '../components/tab';
import page from '../components/page';
import { BomCraftList, AddBomCraft, DeleteBomCraft } from '@/api/api';
export default {
    components: { tab, page },
    data() {
        return {
            url: '',

            tableData: [],
            form: {
                search: ''
            },
            currentPage: 1,
            total: 0,
            pageSize: 20,
            Page: 1,
            Size: 20,
            label: [
                {
                    prop: 'index',
                    label: '序号',
                    width: '96'
                },
                {
                    prop: 'order_code',
                    label: '订单编号'
                },
                // {
                //     prop: 'order_id',
                //     label: '订单号'
                // },
                {
                    prop: 'name',
                    label: '模具名称'
                },
                // {
                //     prop: 'code',
                //     label: '料号'
                // },
                // {
                //     prop: 'code',
                //     label: '工件'
                // },
                {
                    prop: 'img',
                    label: '造型图纸',
                    width: '400'
                },
                {
                    prop: 'status',
                    label: '订单状态'
                },
                {
                    prop: 'remark',
                    label: '订单说明'
                },
                {
                    prop: 'operation',
                    label: '操作',
                    width: '150'
                }
            ],
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
        //工艺删除
        DeleteBomCraft(row) {
            this.$confirm('确定要删除此工艺流程嘛？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    console.log(row);
                    let params = {
                        id: row.id
                    };
                    DeleteBomCraft(params).then((res) => {
                        let { ReturnCode, ErrorMessage } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            this.BomCraftList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error(ErrorMessage);
                        }
                    });
                })
                .catch(() => {});
        },
        AddBomCraft(row, k) {
            row.k = k;
            this.$router.push({
                path: '/craftGroupPage',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },
        //工艺列表
        BomCraftList() {
            let params = {
                cp_id: Number(localStorage.getItem('comp_id')),
                status: this.ssVal,
                QueryString: this.form.search,
                EndablePager: 1,
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            };
            BomCraftList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        if (item.status == 0) {
                            item.status = '待设计';
                        } else if (item.status == 1) {
                            item.status = '设计完成';
                        }
                    });
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        search() {
            this.currentPage = 1;
            this.BomCraftList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.BomCraftList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.BomCraftList();
        }
    },
    created() {
        this.BomCraftList();
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

.page {
    position: absolute;
    right: 20px;
    bottom: 20px;
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
