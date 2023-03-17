<template>
    <div class="">
        <div class="pageChange" style="margin: 0 20px">
            <ul flex="cross:center main:center">
                <li v-for="(item,index) in titleData" :key='index' :class="{homeActived:num==index}" @click="tabClick(item,index)" flex="cross:center main:center">
                    <span class="kuai" :class="{kuaiA:num==index}">
                    </span>
                    <span>
                        {{item.title}}
                    </span>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        num:{
            type:Number
        }
    },
    data() {
        return {
            // num:0,
            titleData:[
                {id:0,title:'系统首页',url:'/index'},
                {id:1,title:'代工厂',url:'/companyStatistics'},
                {id:2,title:'产品管理',url:'/productList'},
                {id:3,title:'工单管理',url:'/orderManagement'},
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        tabClick(item){
            this.$router.replace(item.url)
            
        },
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
</style>