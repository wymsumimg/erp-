<template>
    <div class="orderTop" style="border-bottom: none">
        <span>{{ onePageName }}<span class="dayu">></span></span
        ><span class="nextchuang">{{ twoPageName }}</span>
        <span :style="{display:threeName?'inline-block':'none'}"><span class="dayu">></span>{{threeName}}</span>
    </div>
</template>

<script>
export default {
    components: {},
    props:{
        threeName:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            twoPageName: '',
            onePageName: ''
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
        let menuList = localStorage.getItem('roleMenu') ? JSON.parse(localStorage.getItem('roleMenu')) : [];
        let currentRoute = this.$route.path.split('/')[1];
        for (let i = 0; i < menuList.length; i++) {
            let subs = menuList[i].subs;
            if (subs) {
                for (let j = 0; j < subs.length; j++) {
                    if (subs[j].index == currentRoute) {
                        this.twoPageName = subs[j].title;
                        this.onePageName = menuList[i].title;
                    }
                }
            }
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