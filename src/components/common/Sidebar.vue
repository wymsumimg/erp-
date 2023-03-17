<template>
    <div class="sidebar">
        <!-- <div class="sb_top">操作导航</div> -->
        <!-- background-color="#FFFFFF"
            text-color="#000000"
            active-text-color="#20a0ff" -->

        <!-- background-color="#2A5389"
            text-color="#fff" -->
        <el-menu class="sidebar-el-menu" mode="horizontal" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <!-- <img
                                :src="require('../common/comImg/sidebar/' + item.icon + '.png')"
                                style="width: 22px; height: 22px; margin-right: 10px"
                                alt=""
                            /> -->
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">
                                    <!-- <el-menu-item :index="subItem.index" :key="subItem.index">
                                        <div flex>
                                            <div style="width: 10px; height: 24px; margin-right: 10px"></div> -->

                                    <div style="color: #909399">{{ subItem.title }}</div>
                                    <!-- </div> -->
                                    <!-- </el-menu-item> -->
                                </template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    <div flex>
                                        <div style="width: 10px; height: 24px; margin-right: 10px"></div>

                                        <div>{{ threeItem.title }}</div>
                                    </div>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                                :default-active="subItem.path == '/bztypeManagement'"
                            >
                                <div flex>
                                    <div style="width: 10px; height: 24px; margin-right: 10px"></div>

                                    <div style="font-weight: bold">{{ subItem.title }}</div>
                                </div>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <!-- <i :class="item.icon"></i> -->
                        <!-- <img
                                :src="require('../common/comImg/sidebar/' + item.icon + '.png')"
                                style="width: 22px; height: 22px; margin-right: 10px"
                                alt=""
                            /> -->
                        <span slot="title" style="font-weight: bold">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { RoleMenu, ReLogin } from '@/api/api';
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [],
            itemsList: [
                {
                    icon: 'png0',
                    index: 'index',
                    title: '首页'
                },
                {
                    icon: 'png1',
                    index: 'order',
                    title: '订单管理',
                    subs: [
                        {
                            index: 'orderList',
                            title: '订单列表'
                        },
                        {
                            index: 'customList',
                            title: '客户列表'
                        }
                    ]
                },
                {
                    icon: 'png2',
                    index: 'designDepartment',
                    title: '设计管理',
                    subs: [
                        {
                            index: 'modellingGroup',
                            title: '造型组'
                        },
                        {
                            index: 'bomGroup',
                            title: 'BOM组'
                        },
                        // {
                        //     index: 'cadGroup',
                        //     title: 'CAD组'
                        // },
                        {
                            index: 'craftGroup',
                            title: '工艺'
                        }
                        // {
                        //     index: 'tableList',
                        //     title: '设计列表'
                        // }
                    ]
                },
                {
                    icon: 'png3',
                    index: 'paichan',
                    title: '生产管理',
                    subs: [
                        {
                            index: 'productionList',
                            title: '生产列表'
                        },
                        {
                            index: 'processingPlan',
                            title: '加工任务'
                        }
                    ]
                },
                {
                    icon: 'png4',
                    index: 'biancheng',
                    title: '编程',
                    subs: [
                        {
                            index: 'listPendingOrders',
                            title: '待完成订单'
                        }
                    ]
                },

                {
                    icon: 'png5',
                    index: 'workes',
                    title: '机台任务',
                    subs: [
                        {
                            index: 'workList',
                            title: '待加工列表'
                        }
                    ]
                },
                {
                    icon: 'png6',
                    index: 'database',
                    title: '企业数据库',
                    subs: [
                        {
                            index: 'moldBase',
                            title: '模具类别'
                        },
                        {
                            index: 'processDatabase',
                            title: '工艺库'
                        },
                        {
                            index: 'processLibrary',
                            title: '工艺流程库'
                        },
                        {
                            index: 'materialInventory',
                            title: '原材料库'
                        },
                        {
                            index: 'standardPartLibrary',
                            title: '标准件库'
                        },
                        {
                            index: 'jobLibrary',
                            title: '工件库'
                        },
                        {
                            index: 'machineBase',
                            title: '设备库'
                        }
                    ]
                },
                {
                    icon: 'png7',
                    index: 'purchasing',
                    title: '采购',
                    subs: [
                        {
                            index: 'purchasingList',
                            title: '采购列表'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            this.getRoleMenu();
            if (this.$route.path == '/bztypeManagement') {
                return 'standardPartLibrary';
            }
            if (this.$route.path == '/typeManagement') {
                return 'materialInventory';
            }
            if (this.$route.path == '/orderDetailsPage') {
                return 'orderList';
            }
            if (this.$route.path == '/purchasingDetail') {
                return 'purchasingList';
            }
            if (this.$route.path == '/detail') {
                return 'tableList';
            }
            if (this.$route.path == '/seeDaima') {
                return 'workList';
            }
            return this.$route.path.replace('/', '');
        }
    },
    methods: {
        getRoleMenu() {
            let params = {
                ID: localStorage.getItem('role_id')
            };
            RoleMenu(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.items = Data;
                    let indexPage = {
                        icon: 'png0',
                        index: 'index',
                        title: '首页'
                    };
                    this.items.unshift(indexPage);
                    localStorage.setItem('roleMenu', JSON.stringify(this.items));
                }
            });
        },
        ReLogin() {
            let params = {
                id: localStorage.getItem('user_id')
            };
            ReLogin(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    localStorage.setItem('comp_id', Data.User.cp_id);
                    localStorage.setItem('ManageName', Data.User.name);
                    localStorage.setItem('login_staus', Data.User.cp_id);
                    localStorage.setItem('user_id', Data.User.id);
                    localStorage.setItem('role_id', Data.User.role_id);
                    localStorage.setItem('account', Data.User.account);
                    // 0 查看9002  1 上传9001
                    let dataServe = Data.Server;
                    for (let i = 0; i < dataServe.length; i++) {
                        if (dataServe[i].type == 0) {
                            localStorage.setItem('seeDaima', dataServe[i].localServer);
                        } else if (dataServe[i].type == 1) {
                            localStorage.setItem('upDaima', dataServe[i].localServer);
                        }
                    }
                }
            });
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.ReLogin();
        this.getRoleMenu();
    }
};
</script>

<style lang='scss'>
/* .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
} */
.sidebar {
    .el-menu {
        background: #2a5389;
    }
}
.el-menu-item.is-active {
    color: #000;
}
.el-menu-item.is-active {
    // background-color: #e7f3fd !important;
    border-left: 4px solid #2a5389;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
    color: #2a5389;
}
.el-submenu__title {
    font-weight: bold !important;
    color: #fff !important;
}
.el-submenu__title:hover {
    background: #467abd;
}
.el-menu-item:hover,
.el-menu-item:focus {
    background: #467abd;
}

.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    background: #467abd;
    border-bottom: none;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title:hover {
    background: #467abd !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background: #467abd !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    background: #e7f3fd;
    // border-left: 4px solid #2a5389;
}

.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
    padding: 0;
}

.sb_top {
    padding-left: 20px;
    box-sizing: border-box;
    height: 56px;
    line-height: 56px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #172b43;
    background: linear-gradient(0deg, #e7f0fc 0%, #c4d3eb 43%, #d5e1f7 56.00000000000001%, #ccdbf2 65%, #ccdaf1 74%, #edf3fc 98%);
    box-shadow: 0px 6px 9px 0px rgba(42, 83, 137, 0.25);
}
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
    color: #fff;
}
.el-menu-item.is-active {
    border-left: none;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    outline: none;
    color: #fff;
    background: #467abd !important;
}
.el-submenu__title i {
    color: #d6e3fd;
}
.el-menu--horizontal > .el-menu-item {
    color: #fff;
}
.el-submenu__title {
    padding: 0 11px;
}
</style>

