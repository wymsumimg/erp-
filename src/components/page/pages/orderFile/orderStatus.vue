<template>
    <div class="container yichu" id="app-root">
        <!-- 订单档案详情 -->
        <div class="dingDang" style="min-width: 1420px">
            <div flex="cross:center" class="tableTop" style="margin: 0; border-top: 1px solid #bfc3c6">
                <div
                    class="shousuoIconBox"
                    flex="cross:center main:center"
                    @click="baseShow = !baseShow"
                    :style="{ transform: baseShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                >
                    <i class="el-icon-d-arrow-right shousuoIcon"></i>
                </div>
                <span @click="$router.go(-1)">订单状态展示</span>
            </div>
            <div class="dingDangTop" v-show="baseShow">
                <table>
                    <tr>
                        <td>
                            <span class="bhName">订单编号：</span>
                            <span class="bhcode">{{ row.code }}</span>
                        </td>
                        <td>
                            <span class="bhName">模具：</span>
                            <span class="bhcode">{{ row.name }}</span>
                        </td>
                        <td>
                            <span class="bhName">客户：</span>
                            <span class="bhcode">{{ row.buyer_name }}</span>
                        </td>
                        <td>
                            <span class="bhName">试模时间：</span>
                            <span class="bhcode">{{ row.testTime }}</span>
                        </td>
                        <td>
                            <span class="bhName">交付时间：</span>
                            <span class="bhcode">{{ row.endTime }}</span>
                        </td>
                        <td>
                            <span class="bhName">加工用时：</span>
                            <span class="bhcode" style="font-size: 16px">{{ TotalSecond | times }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="content" v-show="baseShow">
            <div class="content1">
                <div class="content1-1">
                    <div>状态</div>
                    <div>工件</div>
                    <div>料号</div>
                    <div>工艺</div>
                </div>
                <div class="content1-1">
                    <div style="color: #37b452">已完成</div>
                    <div>{{ this.BomType[0] }}</div>
                    <div>{{ this.Material[0] }}</div>
                    <div>{{ this.Craft[0] }}</div>
                </div>
                <div class="content1-1">
                    <div style="color: #2a5389">加工中</div>
                    <div>{{ this.BomType[2] }}</div>
                    <div>{{ this.Material[2] }}</div>
                    <div>{{ this.Craft[2] }}</div>
                </div>
                <div class="content1-1">
                    <div>待加工</div>
                    <div>{{ this.BomType[1] }}</div>
                    <div>{{ this.Material[1] }}</div>
                    <div>{{ this.Craft[1] }}</div>
                </div>
            </div>
            <div class="content2">
                <div style="padding: 15px">
                    <div flex="main:justify">
                        <div style="font-size: 16px; font-family: Microsoft YaHei; font-weight: bold; color: #172b43">基本资料</div>
                        <div>
                            <span
                                class="tabBtn"
                                :style="this.tabShow ? 'background: #558cd5;border: 1px solid #2a5389;color: #ffffff;' : ''"
                                @click="onTab"
                                >数量</span
                            >
                            <span
                                class="tabBtn"
                                :style="!this.tabShow ? 'background: #558cd5;border: 1px solid #2a5389;color: #ffffff;' : ''"
                                @click="onTabs"
                                >进度</span
                            >
                        </div>
                    </div>
                    <div v-show="this.tabShow">
                        <div id="main" style="width: 100%; height: 180px"></div>
                    </div>
                    <div v-show="!this.tabShow">
                        <div id="mains" :style="'width:100% ; height: 180px'"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tableTop" flex="main:justify" style="margin-top: 0">
            <div flex>
                <img src="../../../common/comImg/index/矢量智能对象 (1).png" alt="" class="img" />
                <div style="font-size: 0.875rem">
                    加工状态（<span style="color: #37b452">加工完成</span><span style="color: #02b3d2">&nbsp;&nbsp; 工艺跳过</span>
                    <span style="color: #ff6f00">&nbsp;&nbsp; 加工暂停</span><span style="color: #2a5389">&nbsp;&nbsp; 加工中</span
                    ><span style="color: #878787">&nbsp;&nbsp; 待加工</span> ）
                </div>
            </div>

            <div style="width: 30%" flex="cross:center main:justify">
                <div></div>

                <div class="orderSearches" flex="cross:center ">
                    <el-input placeholder="请输入工件名称" clearable v-model="form.search" @clear="search"></el-input>
                    <el-button class="orderBtn btnOk" @click="search">搜索</el-button>
                </div>
            </div>
        </div>

        <div class="orderTable mart">
            <div class="tableod">
                <el-table
                    :data="tableData"
                    border
                    :row-class-name="tableRowClassName"
                    :header-cell-class-name="headerStyle"
                    :span-method="objectSpanMethod"
                    :cell-style="cellStyle"
                    style="width: 100%"
                    :height="tableHeight"
                    :max-height="tableHeight"
                >
                    <el-table-column fixed prop="BomTypeName" label="" width="120" header-align="center" align="center"> </el-table-column>
                    <el-table-column fixed prop="MaterialName" label="料号" width="120" header-align="center" align="center">
                    </el-table-column>
                    <el-table-column fixed prop="Time" label="总计" width="150" header-align="center" align="center">
                        <template slot-scope="{ row }">
                            {{ row.Time[0] | times }}
                        </template>
                    </el-table-column>
                    <el-table-column fixed prop="city" label="等待" width="150" header-align="center" align="center">
                        <template slot-scope="{ row }">
                            {{ row.Time[2] | times }}
                        </template>
                    </el-table-column>
                    <el-table-column fixed prop="address" label="实际" width="150" header-align="center" align="center">
                        <template slot-scope="{ row }">
                            {{ row.Time[1] | times }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="" label=" " width="5000" header-align="center" align="left">
                        <template slot-scope="{ row }">
                            <el-tooltip
                                effect="light"
                                placement="top"
                                v-for="(item, index) in row.Craft"
                                :key="index"
                                :disabled="item.Status == -1 || item.Status == 0 || item.Status == 5"
                            >
                                <div slot="content" style="font-size: 14px">
                                    <div><span class="diaTitle">工艺：</span>{{ item.CraftName }}</div>
                                    <div><span class="diaTitle">开始时间：</span>{{ item.BeginTime }}</div>
                                    <div><span class="diaTitle">结束时间：</span>{{ item.EndTime || '—' }}</div>
                                    <div><span class="diaTitle">暂停时长：</span>{{ item.WaitSecond | times }}</div>
                                    <div><span class="diaTitle">总时长：</span>{{ item.TotalSecond | times }}</div>
                                </div>
                                <span
                                    class="craft"
                                    :style="
                                        item.Status == -1
                                            ? 'color:#999999'
                                            : item.Status == 0
                                            ? 'color:#999999'
                                            : item.Status == 1
                                            ? 'color:#2A5389'
                                            : item.Status == 2
                                            ? 'color:#37B452'
                                            : item.Status == 3
                                            ? 'color:#999999'
                                            : item.Status == 4
                                            ? 'color:#FF6F00'
                                            : item.Status == 5
                                            ? 'color:#02B3D2'
                                            : ''
                                    "
                                >
                                    {{ item.CraftName }}
                                </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { MoldDetial } from '@/api/api';

export default {
    components: {},
    data() {
        return {
            form: {
                search: ''
            },

            tableData: [],
            tabShow: true,
            Material: [],
            Craft: [],
            BomType: [],
            row: {},
            BomTypePress: [],
            BomTypeCount: [],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            TotalSecond: 0,
            tableHeight: 0,
            baseShow: true
        };
    },
    computed: {},
    watch: {
        baseShow() {
            if (!this.baseShow) {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 170;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 170;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 465;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 465;
                };
            }
        }
    },
    created() {
        this.row = JSON.parse(this.$Base64.decode(this.$route.query.info));
        this.MoldDetial();
    },
    mounted() {
        this.$nextTick(() => {
            var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (isMac) {
                //your code
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 545;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 545;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 465;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 465;
                };
            }
        });
    },
    methods: {
        //搜索
        search() {
            this.MoldDetial();
        },
        handleClick(row) {
            console.log(row);
        },
        //表格样式
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
        /**
         * 改变表格某一列的单元格颜色
         */
        cellStyle({ row, column, rowIndex, columnIndex }) {
            if (column.label == '料号' || column.label == '总计' || column.label == '等待' || column.label == '实际') {
                return 'background: #F8FAFE;';
            }
            if (column.label == ' ') {
                return 'padding: 0 !important';
            }
        },
        //合并方法
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 0) {
                //合并相同的名字
                let nameSpan = this.getSpanNumber(this.tableData, 'BomTypeName');
                return {
                    rowspan: nameSpan[rowIndex],
                    colspan: 1
                };
            }
        },
        //获取要合并的行数
        getSpanNumber(data, prop) {
            //data要处理的数组，prop要合并的属性，比如name

            //数组的长度，有时候后台可能返回个null而不是[]
            let length = Array.isArray(data) ? data.length : 0;
            if (length > 0) {
                //用于标识位置
                let position = 0;
                //用于对比的数据
                let temp = data[0][prop];
                //要返回的结果
                let result = [1];
                //假设数据是AABCC，我们的目标就是返回20120
                for (let i = 1; i < length; i++) {
                    if (data[i][prop] == temp) {
                        //标识位置的数据加一
                        result[position] += 1;
                        //当前位置添0
                        result[i] = 0;
                    } else {
                        //不相同时，修改标识位置，该位置设为1，修改对比值
                        position = i;
                        result[i] = 1;
                        temp = data[i][prop];
                    }
                }
                //返回结果
                return result;
            } else {
                return [0];
            }
        },
        echarts(data1, data2) {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '20px',
                    left: '90px',
                    right: '90px',
                    bottom: '25px'
                },
                xAxis: {
                    type: 'category',
                    data: data1,
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true, // Y轴
                        lineStyle: {
                            color: '#000' // 颜色
                        }
                    }
                },
                series: [
                    {
                        data: data2,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        barWidth: 20,
                        // 随机颜色
                        // itemStyle: {
                        //     normal: {
                        //         color:function(){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        //     },
                        // },
                        // 指定颜色
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorarrays = ['#0769CB', '#00ABBD', '#ffd886', '#9F2E61', '#4D670C', '#0769CB', '#00ABBD'];
                                    return colorarrays[0];
                                }
                            }
                        },
                        type: 'bar'
                    }
                ]
            };

            option && myChart.setOption(option);
            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main')).resize();
                }, 100);
            });
        },
        echartss(data1, data2) {
            var chartDom = document.getElementById('mains');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;

                        return relVal;
                    }
                },
                grid: {
                    top: '20px',
                    left: '90px',
                    right: '90px',
                    bottom: '25px'
                },
                xAxis: {
                    type: 'category',
                    data: data1,
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true, // Y轴
                        lineStyle: {
                            color: '#000' // 颜色
                        }
                    }
                },
                series: [
                    {
                        data: data2,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function (params) {
                                return params.value + '%';
                            }
                        },
                        barWidth: 20,
                        // 随机颜色
                        // itemStyle: {
                        //     normal: {
                        //         color:function(){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        //     },
                        // },
                        // 指定颜色
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorarrays = ['#0769CB', '#00ABBD', '#ffd886', '#9F2E61', '#4D670C', '#0769CB', '#00ABBD'];
                                    return colorarrays[0];
                                }
                            }
                        },
                        type: 'bar'
                    }
                ]
            };

            option && myChart.setOption(option);
            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('mains')).resize();
                }, 100);
            });
        },
        //数据
        MoldDetial() {
            let params = {
                cp_id: Number(localStorage.getItem('comp_id')),
                id: Number(this.row.id)
            };
            MoldDetial(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    if (this.form.search == '') {
                        this.tableData = Data.MaterialList;
                    } else {
                        let arr = [];
                        Data.MaterialList.map((item) => {
                            if (item.BomTypeName == this.form.search) {
                                arr.push(item);
                            }
                        });
                        this.tableData = arr;
                    }

                    this.Material = Data.Material;
                    this.Craft = Data.Craft;
                    this.BomType = Data.BomType;
                    this.BomTypePress = Data.BomTypePress;
                    this.BomTypeCount = Data.BomTypeCount;
                    this.TotalSecond = Data.TotalSecond;
                    this.data1 = [];
                    this.data2 = [];
                    this.data3 = [];
                    this.data4 = [];
                    for (var i = 0; i < this.BomTypeCount.length; i++) {
                        this.data1.push(this.BomTypeCount[i][0]);
                        this.data2.push(this.BomTypeCount[i][1]);
                    }

                    for (var i = 0; i < this.BomTypePress.length; i++) {
                        this.data3.push(this.BomTypePress[i][0]);
                        this.data4.push(this.BomTypePress[i][1].slice(0, this.BomTypePress[i][1].length - 1));
                    }
                    this.echarts(this.data1, this.data2);
                }
            });
        },
        //tab
        onTab() {
            this.tabShow = true;
            this.$nextTick(() => {
                this.echarts(this.data1, this.data2);
            });
        },
        onTabs() {
            this.tabShow = false;
            this.$nextTick(() => {
                this.echartss(this.data3, this.data4);
            });
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
.container {
    .content {
        display: flex;
        width: 100%;
        height: 253px;
        background: #f0f3f7;
        .content1 {
            width: 34%;
            height: 210px;
            background: #ffffff;
            border: 1px solid #b2b6b8;
            margin: 10px;
            padding: 10px 30px;
            .content1-1 {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 50px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                div {
                    width: 25%;
                    text-align: center;
                }
            }
            .content1-1:nth-child(2n) {
                background: #f6f9fd;
            }
        }
        .content2 {
            width: 63%;
            height: 230px;
            background: #ffffff;
            border: 1px solid #b2b6b8;
            margin: 0.625rem;
        }
    }
}

.img {
    width: 23px;
    height: 23px;
    margin: 7px 7px 7px 0;
}
.dingDang .dingDangTop table tr td {
    width: 16% !important;
}
.craft {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    border-right: 1px solid #b2b6b8;
}
.tabBtn {
    display: inline-block;
    width: 45px;
    height: 32px;
    color: #333333;
    border: 1px solid #b2b6b8;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.diaTitle {
    display: inline-block;
    width: 80px;
    text-align: right;
    color: #666666;
}
</style>
