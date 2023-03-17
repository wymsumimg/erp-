<template>
    <!-- onselectstart="return false" -->
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>

<script>
//如果keeplogin==false 当前页面关闭的时候清除缓存 login_staus
export default {
    errorCaptured() {},
    data() {
        return {
            windowWidth: 0,
            windowHeight: 0
        };
    },
    mounted() {},
    created() {},
    methods: {
        resize() {
            this.windowWidth = document.documentElement.clientWidth;
            this.windowHeight = document.documentElement.clientHeight;
        }
    }
};
</script>
<style >
/* 滚动条 */
/* ::-webkit-scrollbar
    {
    width: 8px;
    height: 8px;
    }
   
    ::-webkit-scrollbar-thumb:vertical {
    background-color:#afadad;
    }
    ::-webkit-scrollbar-thumb:horizontal {
        height: 8px;
    background-color:#afadad;
    } */
</style>