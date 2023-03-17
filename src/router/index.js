import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '文件' },
            children: [
                {
                    path: '/index',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/index.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/orderList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/order/orderList.vue'),
                    meta: { title: '订单列表' }
                },

                {
                    path: '/modellingGroup',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/modellingGroup.vue'),
                    meta: { title: '造型组' }
                },
                {
                    path: '/modellingGroupTeam',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/modellingGroupTeam.vue'),
                    meta: { title: '造型设计组长' }
                },
                {
                    path: '/modellingGroupDetails',
                    component: () =>
                        import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/modellingGroupDetails.vue'),
                    meta: { title: '上传记录' }
                },
                {
                    path: '/bomGroup',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/bomGroup.vue'),
                    meta: { title: 'BOM组' }
                },
                {
                    path: '/bomCreateEdit',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/bomCreateEdit.vue'),
                    meta: { title: 'BOM组创建编辑' }
                },
                {
                    path: '/cadGroup',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/cadGroup.vue'),
                    meta: { title: 'CAD组' }
                },
                {
                    path: '/cadGroupTeam',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/cadGroupTeam.vue'),
                    meta: { title: 'CAD组组长' }
                },
                {
                    path: '/cadCreateEdit',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/cadCreateEdit.vue'),
                    meta: { title: 'CAD组创建编辑' }
                },
                {
                    path: '/craftGroup',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/craftGroup.vue'),
                    meta: { title: '工艺' }
                },
                {
                    path: '/craftGroupTeam',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/craftGroupTeam.vue'),
                    meta: { title: '工艺组长' }
                },
                {
                    path: '/craftGroupPage',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/craftGroupPage.vue'),
                    meta: { title: '工艺编辑页' }
                },
                {
                    path: '/tableList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/tableList.vue'),
                    meta: { title: '设计列表' }
                },

                {
                    path: '/detail',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/detail.vue'),
                    meta: { title: '已创建' }
                },

                {
                    path: '/orderStatistics',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/ddaallOrder/orderStatistics.vue'),
                    meta: { title: '订单统计' }
                },
                {
                    path: '/moldBase',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/moldBase.vue'),
                    meta: { title: '模具库' }
                },
                {
                    path: '/processDatabase',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/processDatabase.vue'),
                    meta: { title: '工艺库' }
                },
                {
                    path: '/processLibrary',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/processLibrary.vue'),
                    meta: { title: '工艺流程库' }
                },
                {
                    path: '/materialInventory',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/materialInventory.vue'),
                    meta: { title: '原材料库' }
                },
                {
                    path: '/standardPartLibrary',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/standardPartLibrary.vue'),
                    meta: { title: '标准件库' }
                },
                {
                    path: '/jobLibrary',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/jobLibrary.vue'),
                    meta: { title: '工件库' }
                },
                {
                    path: '/machineBase',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/machineBase.vue'),
                    meta: { title: '机台库' }
                },

                {
                    path: '/typeManagement',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/typeManagement.vue'),
                    meta: { title: '类型管理' }
                },
                {
                    path: '/bztypeManagement',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/bztypeManagement.vue'),
                    meta: { title: '类型管理' }
                },
                {
                    path: '/sizeManagement',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/database/sizeManagement.vue'),
                    meta: { title: '尺寸管理' }
                },
                {
                    path: '/workList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/workersList/workList.vue'),
                    meta: { title: '待加工列表' }
                },
                {
                    path: '/seeDaima',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/workersList/seeDaima.vue'),
                    meta: { title: '查看代码' }
                },
                {
                    path: '/purchasingList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/purchasing/purchasingList.vue'),
                    meta: { title: '采购列表' }
                },
                {
                    path: '/purchasingDetail',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/purchasing/purchasingDetail.vue'),
                    meta: { title: '采购详情' }
                },

                {
                    path: '/customList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/order/customList.vue'),
                    meta: { title: '客户列表' }
                },
                {
                    path: '/productiveTask',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/paichan/productiveTask.vue'),
                    meta: { title: '生产任务' }
                },
                {
                    path: '/productionList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/paichan/productionList.vue'),
                    meta: { title: '生产列表' }
                },
                {
                    path: '/processingPlan',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/paichan/processingPlan.vue'),
                    meta: { title: '加工任务' }
                },
                {
                    path: '/bcOrderList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/bcOrderList.vue'),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/listPendingOrders',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/listPendingOrders.vue'),
                    meta: { title: '待完成订单' }
                },
                {
                    path: '/programming',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/programming.vue'),
                    meta: { title: '编程设计列表' }
                },
                {
                    path: '/programmingTeam',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/programmingTeam.vue'),
                    meta: { title: '编程设计组长' }
                },
                {
                    path: '/orderDetailsPage',
                    name: 'orderDetailsPage',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/order/orderDetailsPage.vue'),
                    meta: { title: '订单详情页' }
                },
                {
                    path: '/Completed',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/Completed.vue'),
                    meta: { title: '待完成查看页' }
                },
                {
                    path: '/checkOrde',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/checkOrde.vue'),
                    meta: { title: '订单查看页' }
                },
                {
                    path: '/orderAmount',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/biancheng/orderAmount.vue'),
                    meta: { title: '订单查看详情页' }
                },
                {
                    path: '/SchedulingDetailsPage',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/paichan/SchedulingDetailsPage.vue'),
                    meta: { title: '创建加工任务页' }
                },
                {
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/permission/index.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/plant',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/set/plant.vue'),
                    meta: { title: '工厂设置' }
                },
                {
                    path: '/accountAdd',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/set/accountAdd.vue'),
                    meta: { title: '添加账号' }
                },
                {
                    path: '/branch',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/set/branch.vue'),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/account',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/set/account.vue'),
                    meta: { title: '账号设置' }
                },
                {
                    path: '/addRole',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/permission/addRole.vue'),
                    meta: { title: '添加角色' }
                },

                {
                    path: '/orderFileList',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/orderFile/orderFileList.vue'),
                    meta: { title: '订单档案' }
                },

                {
                    path: '/orderStatus',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/orderFile/orderStatus.vue'),
                    meta: { title: '订单档案详情' }
                },

                {
                    path: '/orderFileDetail',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/orderFile/orderFileDetail.vue'),
                    meta: { title: '订单档案详情' }
                },

                {
                    path: '/flowChart',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/order/flowChart.vue'),
                    meta: { title: '流程图' }
                },

                {
                    path: '/operationGuide',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/pages/operation/operationGuide.vue'),
                    meta: { title: '操作指引' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/board',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/board/board.vue'),
            meta: { title: '数据看板' }
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
