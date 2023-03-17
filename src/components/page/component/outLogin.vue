<template>
    <div class="userImg" flex="cross:center ">
        <img src="../../common/comImg/index/userImg.png" alt="" />
        <span class="ptname">{{loginName}}</span>
        <div class="tuichu" @click="outLogin()">退出登录</div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            loginName:""
        };
    },
    computed: {},
    watch: {},
    methods: {
        outLogin(){
            localStorage.removeItem('login_staus')
            this.$router.replace('/login')
        }
    },
    created() {},
    mounted() {
        this.loginName=localStorage.getItem('shangBaoName')
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