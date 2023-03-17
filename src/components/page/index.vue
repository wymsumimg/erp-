<template>
    <div class="container indexClass" id="indexPage">
        <div class="orderCont cont">
            <div class="indexcon">
                <ul flex="main:justify">
                    <li v-for="(de, index) in designList" :key="index">
                        <div flex="main:justify">
                            <div class="zuhe">
                                <span class="ge">{{ de.name }}</span>
                            </div>
                            <div class="imgBox">
                                <img :src="require('../common/comImg/index/num' + (index + 1) + '.png')" alt="" />
                            </div>
                        </div>
                        <div flex="cross:baseline">
                            <div class="miaoshu" :style="{ color: de.id == 8 ? '#FF6F00' : '#2a5389' }">{{ de.number }}</div>
                            <div class="addNum">
                                {{ de.addNum }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="shujuku">
                <div class="sjTop" flex="cross:center">模具设计</div>
                <div class="sjContent">
                    <ul flex="main:justify">
                        <li flex="main:center  cross:center" v-for="(de, index) in dataList" :key="index">
                            <div
                                class="sjNei"
                                flex="dir:top"
                                :style="{ borderRight: index == 5 || index == 7 ? 'none' : '1px solid #bfc3c6' }"
                            >
                                <div flex="cross:baseline">
                                    <div class="miaoshu">{{ de.number }}</div>
                                    <div class="addNum">
                                        {{ de.addNum }}
                                    </div>
                                </div>
                                <div class="zuhe">{{ de.name }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="muju" flex="main:justify">
                <div class="mujuLeft mujuli">
                    <div class="ml_top"><div class="ml_top_nei">模具加工</div></div>
                    <div class="ml_bot" flex="main:justify">
                        <div class="ml_bot_li ml_bot_l" flex flex-wrap>
                            <div class="kuai" flex>
                                <img src="../common/comImg/index/num9.png" alt="" />
                                <div class="k_text">
                                    <div class="k_1">累计模具</div>
                                    <div class="k_2">{{ DataName.M_ALL }}</div>
                                </div>
                            </div>
                            <div class="kuai" flex>
                                <img src="../common/comImg/index/num10.png" alt="" />
                                <div class="k_text">
                                    <div class="k_1">本月新增</div>
                                    <div class="k_2">{{ DataName.M_New }}</div>
                                </div>
                            </div>
                            <div class="kuai" flex>
                                <img src="../common/comImg/index/num11.png" alt="" />
                                <div class="k_text">
                                    <div class="k_1">加工中</div>
                                    <div class="k_2">{{ DataName.M_Working }}</div>
                                </div>
                            </div>
                            <div class="kuai" flex>
                                <img src="../common/comImg/index/num12.png" alt="" />
                                <div class="k_text">
                                    <div class="k_1">暂停加工</div>
                                    <div class="k_2">{{ DataName.M_Pause }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="ml_bot_li ml_bot_r">
                            <div id="numEcharts" ref="numEcharts" class="leftEcharts" style="height: 180px"></div>
                        </div>
                    </div>
                </div>
                <div class="mujuRight mujuli">
                    <div class="ml_top">
                        <div class="ml_top_nei" flex="main:justify">
                            <div>模具加工进度</div>
                            <div>
                                <span
                                    class="tabBtn"
                                    :style="this.tabShow ? 'background: #558cd5;border: 1px solid #2a5389;color: #ffffff;' : ''"
                                    @click="onTab"
                                    >进度</span
                                >
                                <span
                                    class="tabBtn"
                                    :style="!this.tabShow ? 'background: #558cd5;border: 1px solid #2a5389;color: #ffffff;' : ''"
                                    @click="onTabs"
                                    >天数</span
                                >
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-show="this.tabShow">
                            <div id="main" style="width: 100%; height: 205px"></div>
                        </div>
                        <div v-show="!this.tabShow">
                            <div id="mains" :style="'width:100% ; height: 205px'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tableBox" flex="main:justify">
                <div class="tb tb2" style="margin-right: 10px">
                    <div class="tbTop" flex="main:justify cross:center">
                        <div class="jiagongname">加工中列表</div>
                        <div class="more" @click="moreBtn(1)">更多>></div>
                    </div>
                    <div class="tableod tbBody tabIndex">
                        <div>
                            <el-table
                                :data="tableData"
                                height="293"
                                border
                                :row-class-name="tableRowClassName"
                                :header-cell-class-name="headerStyle"
                            >
                                <el-table-column prop="date" label="序号" width="50" align="center">
                                    <slot slot-scope="scope">
                                        <span class="white">
                                            <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                        </span>
                                    </slot>
                                </el-table-column>
                                <el-table-column prop="order_name" label="订单号" align="center"> </el-table-column>
                                <el-table-column prop="BomTyp_name" label="工件" align="center" show-overflow-tooltip> </el-table-column>
                                <el-table-column prop="Device_name" label="机台号" align="center"> </el-table-column>
                                <el-table-column prop="Press" label="加工进度" align="center">
                                    <slot slot-scope="scope">
                                        <span class="white">
                                            <span>{{ scope.row.Press }}%</span>
                                        </span>
                                    </slot>
                                </el-table-column>
                                <el-table-column prop="Material_name" label="当前料号" align="center" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="Craft_name" label="当前工艺" align="center" show-overflow-tooltip> </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div style="width: 62%" flex="main:justify">
                    <div class="tb">
                        <div class="tbTop" flex="main:justify cross:center">
                            <div class="jiagongname">待加工列表</div>
                            <div class="more" @click="moreBtn(0)">更多>></div>
                        </div>
                        <div class="tableod tbBody tabIndex">
                            <div>
                                <el-table
                                    :data="daitableData"
                                    height="293"
                                    border
                                    :row-class-name="tableRowClassName"
                                    :header-cell-class-name="headerStyle"
                                >
                                    <el-table-column prop="date" label="序号" width="50" align="center">
                                        <slot slot-scope="scope">
                                            <span class="white">
                                                <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                            </span>
                                        </slot>
                                    </el-table-column>
                                    <el-table-column prop="order_name" label="订单号" align="center"> </el-table-column>
                                    <el-table-column prop="BomTyp_name" label="工件" align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="Material_name" label="料号" align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="Craft_name" label="工艺" align="center" show-overflow-tooltip> </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <div class="tb tbsuo">
                        <div class="tbTop" flex="main:justify cross:center">
                            <div class="jiagongname">实时动态</div>
                        </div>
                        <div class="tbBody">
                            <div class="shishiTusts" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                <el-carousel
                                    direction="vertical"
                                    :autoplay="autoplay"
                                    :interval="5000"
                                    height="280px"
                                    :loop="true"
                                    v-if="statusList.length > 0"
                                >
                                    <el-carousel-item v-for="(items, indexs) in statusList" :key="indexs">
                                        <ul v-for="(item, index) in items" :key="index">
                                            <li flex="main:justify">
                                                <div flex="cross:center ">
                                                    <div
                                                        class="dottColor"
                                                        :style="{
                                                            background:
                                                                Number(new Date().getTime()) - Number(new Date(item.ctTime).getTime()) <=
                                                                Number(10 * 60 * 1000)
                                                                    ? '#FF0000'
                                                                    : '#2A5389'
                                                        }"
                                                    ></div>
                                                    <div
                                                        class="textgy"
                                                        :style="{
                                                            color:
                                                                Number(new Date().getTime()) - Number(new Date(item.ctTime).getTime()) <=
                                                                Number(10 * 60 * 1000)
                                                                    ? ''
                                                                    : '#888'
                                                        }"
                                                    >
                                                        {{ item.mess
                                                        }}<span
                                                            :style="{
                                                                color:
                                                                    Number(new Date().getTime()) -
                                                                        Number(new Date(item.ctTime).getTime()) <=
                                                                    Number(10 * 60 * 1000)
                                                                        ? $global.statusColor[item.status]
                                                                        : '#888'
                                                            }"
                                                            >&nbsp;{{ getStatus(item.status) }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="timegy">{{ item.ctTime.split(' ')[1] }}</div>
                                            </li>
                                        </ul>
                                    </el-carousel-item>
                                </el-carousel>
                                <el-carousel direction="vertical" :autoplay="autoplay" :interval="5000" height="4.8rem" :loop="true" v-else>
                                    <span class="noData" flex="main:center cross:center">暂无数据</span>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { MoldHome } from '@/api/api';
export default {
    components: {},
    data() {
        return {
            designList: [
                {
                    id: 1,
                    number: 0,
                    name: '累计订单',
                    addNum: 0
                },
                {
                    id: 2,
                    number: 0,
                    name: '待审订单'
                },
                {
                    id: 3,
                    number: 0,
                    name: '过审订单'
                },
                {
                    id: 4,
                    number: 0,
                    name: '取消订单'
                },
                {
                    id: 5,
                    number: 0,
                    name: '设计订单'
                },
                {
                    id: 6,
                    number: 0,
                    name: '加工订单'
                },
                {
                    id: 7,
                    number: 0,
                    name: '交付订单'
                },
                {
                    id: 8,
                    number: 0,
                    name: '预警订单'
                }
            ],
            dataList: [
                {
                    id: 1,
                    number: 0,
                    name: '累计设计',
                    addNum: 0
                },
                {
                    id: 2,
                    number: 0,
                    name: '待设计'
                },
                {
                    id: 3,
                    number: 0,
                    name: '造型设计'
                },
                {
                    id: 4,
                    number: 0,
                    name: 'BOM设计'
                },
                {
                    id: 5,
                    number: 0,
                    name: '工艺设计'
                },
                {
                    id: 6,
                    number: 0,
                    name: 'CAD设计'
                },
                {
                    id: 7,
                    number: 0,
                    name: '编程设计'
                },
                {
                    id: 8,
                    number: 0,
                    name: '加工任务'
                }
            ],
            tableData: [],
            daitableData: [],
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 10,
                QueryString: ''
            },
            statusList: [],
            numes: 0,
            myChart: {},
            tabShow: true,
            DataName: {},
            autoplay: true
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        // 首页接口
        this.getMoldHome();
    },
    methods: {
        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },
        getMoldHome() {
            let params = {
                cp_id: localStorage.getItem('comp_id')
            };
            MoldHome(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.DataName = Data;
                    for (let i = 0; i < this.designList.length; i++) {
                        if (this.designList[i].id == 1) {
                            this.designList[i].number = Data.O_ALL;
                            this.designList[i].addNum = '+' + Data.O_New;
                        }
                        if (this.designList[i].id == 2) {
                            this.designList[i].number = Data.O_Check;
                        }
                        if (this.designList[i].id == 3) {
                            this.designList[i].number = Data.O_Pass;
                        }
                        if (this.designList[i].id == 4) {
                            this.designList[i].number = Data.O_Cancel;
                        }
                        if (this.designList[i].id == 5) {
                            this.designList[i].number = Data.O_Design;
                        }
                        if (this.designList[i].id == 6) {
                            this.designList[i].number = Data.O_Working;
                        }
                        if (this.designList[i].id == 7) {
                            this.designList[i].number = Data.O_Pay;
                        }
                        if (this.designList[i].id == 8) {
                            this.designList[i].number = Data.O_Warrning;
                        }
                    }
                    for (let i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i].id == 1) {
                            this.dataList[i].number = Data.D_ALL;
                            this.dataList[i].addNum = '+' + Data.D_New;
                        }
                        if (this.dataList[i].id == 2) {
                            this.dataList[i].number = Data.D_NoDesign;
                        }
                        if (this.dataList[i].id == 3) {
                            this.dataList[i].number = Data.D_Modeing;
                        }
                        if (this.dataList[i].id == 4) {
                            this.dataList[i].number = Data.D_BOM;
                        }
                        if (this.dataList[i].id == 5) {
                            this.dataList[i].number = Data.D_Craft;
                        }
                        if (this.dataList[i].id == 6) {
                            this.dataList[i].number = Data.D_CAD;
                        }
                        if (this.dataList[i].id == 7) {
                            this.dataList[i].number = Data.D_Program;
                        }
                        if (this.dataList[i].id == 8) {
                            this.dataList[i].number = Data.D_Task;
                        }
                    }
                    let zongFen = Number(Data.M_Working) + Number(Data.M_Pause) + Number(Data.M_Wait);
                    let bingData = [
                        { value: Data.M_Working, name: Data.M_Working==0?('加工中(0%)'):('加工中(' + ((Data.M_Working / zongFen) * 100).toFixed(2) + '%)') },
                        { value: Data.M_Pause, name: Data.M_Pause==0?('加工暂停(0%)'):('加工暂停(' + ((Data.M_Pause / zongFen) * 100).toFixed(2) + '%)') },
                        { value: Data.M_Wait, name: Data.M_Wait==0?('待加工(0%)'):('待加工(' + ((Data.M_Wait / zongFen) * 100).toFixed(2) + '%)') },
                        
                    ];
                    this.numEcharts(bingData);

                    if (Data.MoldPress.length > 0) {
                        this.jinduData1 = [];
                        this.jinduData2 = [];
                        for (let i = 0; i < Data.MoldPress.length; i++) {
                            this.jinduData1.push(Data.MoldPress[i][0]);
                            this.jinduData2.push(Data.MoldPress[i][1]);
                        }
                        this.echarts(this.jinduData1, this.jinduData2);
                    }
                    if (Data.MoldDays.length > 0) {
                        this.dayData1 = [];
                        this.dayData2 = [];
                        for (let i = 0; i < Data.MoldDays.length; i++) {
                            this.dayData1.push(Data.MoldDays[i][0]);
                            this.dayData2.push(Data.MoldDays[i][1]);
                        }
                        this.echartss(this.dayData1, this.dayData2);
                    }

                    let workList = Data.WorkList;

                    if (workList.length > 0) {
                        this.tableData = [];
                        this.daitableData = [];
                        for (let i = 0; i < workList.length; i++) {
                            if (workList[i].Status == 1) {
                                this.tableData.push(workList[i]);
                                this.tableData = this.tableData.slice(0, 8);
                            }
                            if (workList[i].Status == 0) {
                                this.daitableData.push(workList[i]);
                                this.daitableData = this.daitableData.slice(0, 8);
                            }
                        }
                    }

                    if (Data.RunTimeMess.length > 0) {
                        let indexListDi = Math.ceil(Data.RunTimeMess.length / 6);
                        let newArrDi = [];
                        for (var i = 0; i < indexListDi; i++) {
                            newArrDi[i] = Data.RunTimeMess.splice(0, 6);
                        }
                        this.statusList = newArrDi;
                    }
                }
            });
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyleIndex';
        },
        moreBtn(status) {
            // 加工中1  待加工0
            let row = {
                status: status
            };
            this.$router.push({
                path: '/processingPlan',
                query: {
                    info: this.$Base64.encode(
                        JSON.stringify({
                            ...row
                        })
                    )
                }
            });
        },
        getStatus(status) {
            if (status == 0) {
                return '待加工';
            } else if (status == 1) {
                return '开始加工';
            } else if (status == 2) {
                return '加工完成';
            } else if (status == 3) {
                return '准备加工';
            } else if (status == 4) {
                return '加工暂停';
            } else if (status == 5) {
                return '工艺跳过';
            }
        },

        numEcharts(bingData) {
            let this_ = this;
            this_.myChart = echarts.init(document.getElementById('numEcharts'));
            let resizeTimer = null;

            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: 25,
                    bottom: 20,
                    icon: 'circle',
                    padding: [10, 0],
                    itemGap: 35
                },
                series: [
                    {
                        color: ['#2A5389', '#FF6F00', '#CCCCCC'],
                        name: '模具加工',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: bingData
                    }
                ]
            };
            this_.myChart.setOption(option);

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this_.myChart.resize();
                }, 100);
            });
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
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].marker + params[i].value + '%';
                        }
                        return relVal;
                    }
                },

                grid: {
                    top: '30px',
                    left: '50px',
                    right: '60px',
                    bottom: '20px'
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
                    }
                },
                grid: {
                    top: '30px',
                    left: '50px',
                    right: '60px',
                    bottom: '20px'
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
        onTab() {
            this.tabShow = true;
            this.$nextTick(() => {
                this.echarts(this.jinduData1, this.jinduData2);
            });
        },
        onTabs() {
            this.tabShow = false;
            this.$nextTick(() => {
                this.echartss(this.dayData1, this.dayData2);
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
<style lang='scss'>
.tbBody {
    padding: 0;
}
.tbBody .el-table td {
    padding: 4px !important;
}
.tbBody {
    .el-table th {
        padding: 6px 0 !important;
    }
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类

// .index_top {
//     width: 100%;
//     height: 0.56rem;
//     background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
//     padding-left: 0.24rem;
//     box-sizing: border-box;
//     border: 0.02rem solid #BFC3C6;
//     font-size: 0.16rem;
//     font-family: Microsoft YaHei;
//     font-weight: bold;
//     color: #2A5389;
// }
.index_top {
    width: 100%;
    height: 56px;
    background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
    border: 1px solid #bfc3c6;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2a5389;
    padding-left: 24px;
    box-sizing: border-box;
}
.cont {
    width: 100%;
    // height: 94%;
    box-sizing: border-box;
    background: #f6f9fd;
    padding: 0 8px;
}

.indexcon {
    padding: 10px 0;
    ul {
        width: 100%;
        li {
            width: 11.5%;
            padding: 10px 20px;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 4px;

            .imgBox {
                width: 40px;
                height: 40px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
.zuhe {
    margin-top: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    .numthree {
        font-size: 28px;
        font-weight: bold;
    }
    .ge {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
    }
}
.miaoshu {
    // margin-top: 10px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2a5389;
}
.addNum {
    margin-left: 10px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #37b452;
}
.sbzs {
    margin-top: 18px;
}
.shujuku {
    box-sizing: border-box;
    border-radius: 4px;
    .sjTop {
        box-sizing: border-box;
        width: 100%;
        height: 46px;
        background: #fff;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #172b43;
        border-bottom: 1px solid #eee;
        padding: 0 20px;
    }
    .sjContent {
        background: #fff;
        ul {
            border-top: none;

            li {
                padding: 14px 0 20px;
                width: 230px;
                // height: 61px;
            }
            .sjNei {
                width: 100%;
                align-items: center;
            }

            li:nth-of-type(6) {
                border-right: 1px solid #bfc3c6;
            }
        }
    }
}
.tableBox {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    .tb {
        width: 60%;
        box-sizing: border-box;
        padding: 0 20px;
        background: #fff;
        border-radius: 4px;
        .tbTop {
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            border-bottom: none;
            .jiagongname {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #172b43;
            }
            .more {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #6772fb;
                cursor: pointer;
            }
        }
        .tbBody {
            box-sizing: border-box;
            width: 100%;
        }
        .shishiTusts {
            background: #ffffff;
            height: 280px;
            ul {
                padding: 6px 0;
                border-bottom: 1px solid #e7e7e7;
                li {
                    height: 32px;
                    line-height: 32px;
                    display: flex;
                    // justify-content: space-between;
                    .dottColor {
                        width: 6px;
                        height: 6px;
                        // background: #ff0000;
                        border-radius: 50%;
                        margin-right: 17px;
                    }
                    .textgy {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #000000;
                    }
                    .timegy {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #999;
                        // text-align: right;
                    }
                }
            }
        }
    }
    .tb2 {
        width: 38%;
        min-width: 647px;
    }
    .tbsuo {
        margin-left: 10px;
        width: 40%;
        height: 340px;
    }
}
.muju {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    .mujuli {
        background: #ffffff;
        border-radius: 4px;
        .ml_top {
            width: 100%;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #172b43;
            padding: 0 20px;
            height: 46px;
            line-height: 46px;

            box-sizing: border-box;
            .ml_top_nei {
                width: 100%;
                border-bottom: 1px solid #eeeeee;
            }
        }
        .ml_bot {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            .ml_bot_li {
            }
            .ml_bot_l {
                width: 321px;
                border-right: 1px solid #eeeeee;
                .kuai {
                    width: 50%;
                    padding: 30px 20px 25px 0;
                    box-sizing: border-box;
                    img {
                        width: 22px;
                        height: 22px;
                    }
                    .k_text {
                        margin-left: 8px;
                        .k_1 {
                            font-size: 14px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #666666;
                        }
                        .k_2 {
                            margin-top: 10px;
                            font-size: 22px;
                            color: #2a5389;
                        }
                    }
                }
            }
            .ml_bot_r {
                width: 65%;
                padding-top: 20px;
            }
        }
    }
    .mujuLeft {
        width: 38%;
        min-width: 647px;
        margin-right: 10px;
    }
    .mujuRight {
        width: 62%;
    }
}
.tabBtn {
    display: inline-block;
    width: 45px;
    height: 28px;
    color: #333333;
    border: 1px solid #b2b6b8;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
}
</style>
<style lang="scss">
.shishiTusts .el-carousel__item {
    width: 100%;
    min-width: 380px;
    overflow-x: auto;
}
.tabIndex .el-table th.is-leaf,
.tableod .el-table td {
    border-bottom: 1px solid #d5d5d5;
}
.tabIndex .el-table--border th,
.tableod .el-table--border td {
    border-right: 1px solid #d5d5d5;
}
.tabIndex .el-table--group,
.tableod .el-table--border {
    border-top: 1px solid #d5d5d5;
    border-left: 1px solid #d5d5d5;
    border-right: 1px solid #d5d5d5;
}
</style>