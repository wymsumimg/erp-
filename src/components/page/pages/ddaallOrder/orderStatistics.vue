<template>
    <div class="container">
        <!-- 订单统计 -->

        <div class="orderTop">订单统计</div>
        <div class="orderCont">
            <div>
                <div class="dialogclass">
                    <el-form ref="form" :model="form" label-width="120px">
                        <div flex="cross:center ">
                            <el-form-item label="订单号：">
                                <el-input v-model="form.name" placeholder="请输入订单号"></el-input>
                            </el-form-item>
                            <el-form-item label="试模时间：">
                                <el-input v-model="form.name" disabled placeholder="--"></el-input>
                            </el-form-item>
                            <el-form-item label="交付时间：">
                                <el-input v-model="form.name" disabled placeholder="--"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="orderTable">
                <div class="tableod">
                    <el-table
                        :data="tableData"
                        height="640"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center"> </el-table-column>
                        <el-table-column prop="name" label="料号数量" width="180" align="center"> </el-table-column>
                        <el-table-column prop="address" label="工艺数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="图纸数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料尺寸" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="标准件尺寸" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <!-- 无数据颜色 #999 -->
                                <div @click="handleClick(scope.row)" class="caozuoStyle">查看</div>
                            </slot>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tableData: [
                {
                    date: '--',
                    name: '--',
                    address: '--'
                }
            ],
            form: {}
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
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
        handleClick(row) {
            this.$router.push('/detail?page=4');
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
</style>