import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import store from '@/store';

import GanttChart from 'v-gantt-chart';
Vue.use(GanttChart);

//切换主题
import './assets/css/theme/496bff/index.css';

import './assets/css/icon.css';

import './components/common/flex.scss';
import './components/common/common.scss';
import '@/components/common/checkCss3.scss';
import './utils/filter';

import { rightControl } from '@/utils/index';
Vue.prototype.rightControl = rightControl;
// 第一种全路径发送请求
import axios from 'axios';
Vue.prototype.$axios = axios;
// 第二种封装在全局

//地址栏加密
import Base64 from './utils/encryption';
Vue.prototype.$Base64 = Base64;

// 第三种全路径发送请求
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.prototype.openLoading = function () {
    const loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: 'loading...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
        target: '.sub-main', // 需要遮罩的区域
        body: true,
        customClass: 'mask' // 遮罩层新增类名
    });
    // setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   loading.close();                        // 关闭遮罩层
    // },5000)
    return loading;
};

import global from './components/common/gloable';
Vue.prototype.$global = global;

import './utils/directives';

import enlargeImg from './components/page/component/enlargeImg.vue';
Vue.component('enlargeImg', enlargeImg);

import titleName from './components/common/title.vue';
Vue.component('titleName', titleName);

// 时间过滤器
Vue.filter('noValue', function (val) {
    if (val == '') {
        return '-';
    } else if (val == null) {
        return '-';
    } else {
        return val;
    }
});

Vue.config.productionTip = false;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('login_staus');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});
router.onError((error) => {
    // 这里的正则表达式可以根据实际情况下js命名来进行修改,“ (\d)+  ”只匹配数字

    const pattern = /Loading chunk (\d)+ failed/g;

    const isChunkLoadFailed = error.message.match(pattern);

    const targetPath = router.history.pending.fullPath;

    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

new Vue({
    router,
    store,
    // vns,
    render: (h) => h(App)
}).$mount('#app');
