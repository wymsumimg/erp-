<template>
    <div class="eldialogImg">
        <el-dialog title="" :visible.sync="visible" :width="imgwidth" @close="closeDio">
            <span>
                <img :src="imgBigTu" class="imgbigCals" alt="" />
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        imgBigTu: {
            type: String
        },
        dialogVisible: {
            type: Boolean
        },
        imgwidth: {
            type: String,
            default: '800px'
        }
    },
    data() {
        return {
            visible: this.dialogVisible
        };
    },
    computed: {},
    watch: {
        dialogVisible(val) {
            this.visible = val;
        }
    },
    methods: {
        closeDio() {
            this.$emit('dioClose', this.visible);
        }
    },
    created() {},
    mounted() {
        console.log(this.imgwidth);
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