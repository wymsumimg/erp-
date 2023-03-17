<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
    >
    </el-pagination>
</template>

<script>
export default {
    props: {
        currentPage: {
            default: 1
        },
        total: {
            default: Number
        },
        pageSize: {
            default: 20
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('handleSizeChange', val);
        },
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val);
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: linear-gradient(0deg, #2a5389 0%, #a2c2ec 100%);
    border-radius: 5px;
}
</style>