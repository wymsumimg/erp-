<template>
    <div class="container">
        <title-name></title-name>
        <div class="orderCont">
            <div class="orderSearch tableTop" flex="main:justify" style="margin-top: 0">
                <div style="width: 300px; text-align: left"  flex="cross:center">
                    角色列表
                    <div style="margin-left:20px;">
                        <el-tooltip v-if="!btn[50]" content="没有权限，不能操作" placement="top">
                            <el-button class="dioSave" style="background:#999"><i class="el-icon-plus"></i> 添加</el-button>
                        </el-tooltip>
                        <el-button v-else class="dioSave btnOk" @click="AddRole()"><i class="el-icon-plus"></i> 添加</el-button>
                    </div>
                    
                </div>

                <div flex="cross:center">
                    <el-input v-model="compPama.QueryString" clearable placeholder="请输入角色名称"></el-input>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
            </div>

            <div class="orderTable mart">
                <div class="tableod">
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
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
                        <el-table-column prop="name" label="角色名称" align="center"> </el-table-column>
                        <el-table-column prop="name" label="角色描述" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    {{scope.row.remark?scope.row.remark:'-'}}
                                </span>
                            </slot>
                        </el-table-column>
                        <!-- <el-table-column prop="name" label="权限" align="center">
                            <slot slot-scope="scope">
                                <span>-</span>
                            </slot>
                        </el-table-column> -->
                        <el-table-column prop="" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div class="mojuCaozuo" flex="cross:center main:center">
                                    <div>
                                        <el-tooltip v-if="!btn[50]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">编辑</div>
                                        </el-tooltip>
                                        <el-tooltip v-else-if="scope.row.type==1" content="系统管理不能编辑" placement="top">
                                            <div style="color: #999" class="caozuoStyle">编辑</div>
                                        </el-tooltip>
                                        <div v-else @click="detailClick(scope.row)" class="caozuoStyle">编辑</div>
                                    </div>
                                    <!-- <div @click="detailClick(scope.row)" class="caozuoStyle">修改</div> -->
                                    <div>
                                        <el-tooltip v-if="!btn[58]" content="没有权限，不能操作" placement="top">
                                            <div  style="color: #999;margin-left:30px;" class="caozuoStyle ">删除</div>
                                        </el-tooltip>
                                        <el-tooltip v-else-if="scope.row.type==1" content="系统管理不能删除" placement="top">
                                            <div style="color: #999" class="caozuoStyle delbtn2">删除</div>
                                        </el-tooltip>
                                        <div v-else @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                    </div>
                                    <!-- <div @click="delClick(scope.row)" class="caozuoStyle delbtn">删除</div> -->
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
        
    </div>
</template>

<script>
import { RoleList,RoleDele } from '@/api/api';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            currentPage: 1,
            form: {},
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: ''
            },
            total: 0,

            formName: '',
            tableHeight: 0,
            btn: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getRoleList();
        this.$nextTick(() => {
            var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (isMac) {
                //your code
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 245;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 245;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 240;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 240;
                };
            }
        });
        this.btn = this.rightControl();
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        
        
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        searchBtn(){
             this.getRoleList();
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getRoleList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getRoleList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        detailClick(row) {
            // this.$router.push('/addRole');
            this.$router.push({
                path: '/addRole',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },
        AddRole(){
            // this.$router.push('/addRole?roleId=0');
            let row={
                id:0
            }
            this.$router.push({
                path: '/addRole',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },

        delClick(row) {
            this.$confirm('确认删除吗？删除后不可恢复', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        ID: row.id
                    };
                    RoleDele(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getRoleList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，该角色正在使用中！');
                        }
                    });
                })
                .catch(() => {});
        },
        getRoleList() {
            RoleList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
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
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.delbtn2 {
    margin-left: 30px;
    color: #e6331d ;
}
</style>