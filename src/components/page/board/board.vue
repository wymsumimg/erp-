<template>
    <div id="app" style="margin: 8px; width: 99.2%; height: 98.5%">
        <div class="box">
            <div class="formBox" flex="main:justify">
                <div flex>
                    <img src="../../common/comImg/index/微信图片_20211229173350.png" alt="" class="logo" />
                    <div style="width: 20px; border-right: 1px solid #b2b6b8; margin-right: 20px"></div>
                    <router-link class="fanhui" to="/"><i class="el-icon-s-home"
                            style="font-size: 19px; margin-right: 5px"></i><span>返回首页</span></router-link>
                </div>
                <el-form label-position="right" label-width="90px" :model="form" inline
                    style="height: 49px; margin: 7px 0 0 82px" flex>
                    <div>
                        <el-form-item label="模具名称：">
                            <el-input v-model="form.name" placeholder="请输入模具名称进行搜索"></el-input>
                        </el-form-item>
                        <el-form-item label="工件编号：">
                            <el-input v-model="form.region" placeholder="请输入工件编号进行搜索"></el-input>
                        </el-form-item>
                        <el-form-item label="件号：" label-width="60px">
                            <el-input v-model="form.type" placeholder="请输入件号进行搜索"></el-input>
                        </el-form-item>
                    </div>

                    <div>
                        <el-form-item>
                            <el-button class="btn" @click="workdata()">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!-- <div class="btxt">输入任意一项即可查询</div> -->
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="statusBox" flex>
                <div flex>
                    <img src="../../common/comImg/index/矢量智能对象 (1).png" alt="" class="img" />
                    <div>
                        计划加工（<span style="color: #ff1f1f">红色</span>：计划加工） 实际加工（<span
                            style="color: #2a5389">蓝色</span>：正在加工 <span style="color: #ff6f00">&nbsp;&nbsp;
                            黄色</span>：暂停加工
                        <span style="color: #26ae43">&nbsp;&nbsp; 绿色</span>：加工完成<span
                            style="color: #878787">&nbsp;&nbsp; 灰色</span>：待加工 ）
                    </div>
                </div>
                <header class="top-bar">
                    <el-form :inline="true" size="small">
                        <el-form-item label="请选择时间范围：">
                            <el-date-picker v-model="times" size="small" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" style="width: 350px"
                                @change="timeChange">
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item label="行数：">
                            <el-input v-model.number="rowNum" size="small" style="width: 60px" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="块数：">
                            <el-input v-model.number="colNum" size="small" style="width: 60px" placeholder=""></el-input>
                        </el-form-item> -->
                        <el-form-item label="每行高度：">
                            <el-slider v-model="cellHeight" :min="30" :max="100" style="width: 60px" size="small">
                            </el-slider>
                        </el-form-item>
                        <el-form-item label="每列宽度：">
                            <el-slider v-model="cellWidth" :min="20" :max="100" style="width: 60px" size="small">
                            </el-slider>
                        </el-form-item>
                        <el-form-item label="请选择表头时间单位：">
                            <el-select v-model="scale" placeholder="" style="width: 80px" size="small">
                                <el-option v-for="item in scaleList" :key="item.value" :label="item.label"
                                    :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="hideHeader">隐藏表头</el-checkbox>
                        </el-form-item>
                    </el-form>
                </header>
            </div>
        </div>

        <div class="containers">
            <v-gantt-chart :startTime="times[0]" :endTime="times[1]" :cellWidth="cellWidth" :cellHeight="cellHeight"
                :timeLines="timeLines" :titleHeight="titleHeight" :scale="scale" :titleWidth="titleWidth"
                showCurrentTime :hideHeader="hideHeader" :dataKey="dataKey" :arrayKeys="arrayKeys"
                :scrollToPostion="positionA" @scrollLeft="scrollLeftA" :datas="datasA">
                <template v-slot:block="{ data, item }">
                    <Test :data="data" :updateTimeLines="updateTimeLines" :cellHeight="cellHeight"
                        :currentTime="currentTime" :item="item"></Test>
                </template>
                <template v-slot:left="{ data }">
                    <TestLeft :data="data"></TestLeft>
                </template>
                <!-- <template v-slot:timeline="{ day, getTimeScales }">
                    <TestTimeline :day="day" :getTimeScales="getTimeScales"></TestTimeline>
                </template> -->
                <template v-slot:title>料号 \ 时间 </template>
                <!-- <template v-slot:markLine="{ timeConfig, getPosition }">
                    <TestMarkline :timeConfig="timeConfig" :getPosition="getPosition"></TestMarkline>
                </template> -->
            </v-gantt-chart>
        </div>
    </div>
</template>

<script>
import Test from './test.vue';
import TestLeft from './test-left.vue';
import TestTimeline from './test-timeline.vue';
import TestMarkline from './test-markline.vue';

import dayjs from 'dayjs';
import { OrderTaskDetialList, workdata } from '@/api/api';

const scaleList = `1,2,3,4,5,6,10,12,15,20,30,60,120,180,240,360,720,1440,2880,4320`.split(',').map((n) => {
    let value = parseInt(n);
    let label;
    if (value < 60) {
        label = value + '分钟';
    } else if (value >= 60 && value < 1440) {
        label = value / 60 + '小时';
    } else {
        label = value / 1440 + '天';
    }
    return {
        value,
        label
    };
});
export default {
    name: 'App',
    components: { Test, TestLeft, TestTimeline, TestMarkline },
    data() {
        return {
            timeLines: [
                {
                    time: dayjs().add(2, 'hour').toString(),
                    text: '~~'
                },
                {
                    time: dayjs().add(5, 'hour').toString(),
                    text: 'try',
                    color: '#747e80'
                }
            ],
            currentTime: dayjs(),
            cellWidth: 100,
            cellHeight: 30,
            titleHeight: 40,
            titleWidth: 250,
            scale: 360,
            times: ['2022-05-18 00:00:00', '2022-07-01 00:00:00'],
            //dayjs().add(-131, 'day').toString(), dayjs().add(-87, 'day').add(2, 'hour').toString()
            rowNum: 100,
            colNum: 10,
            datasA: [],
            datasB: [],
            dataKey: 'newId',
            scaleList: scaleList,
            scrollToTime: dayjs().add(1, 'day').toString(),
            scrollToPostion: { x: 10000, y: 10000 },
            hideHeader: false,
            hideSecondGantt: false,
            arrayKeys: ['gtArray', 'error'],
            scrollToY: 0,
            positionB: {},
            positionA: {},
            form: {
                name: '',
                region: '',
                type: ''
            }
        };
    },
    watch: {
        rowNum: 'updateData',
        colNum: 'updateData',
        // times: 'updateData',
        scrollToY(val) {
            this.positionA = { x: val };
        }
    },
    mounted() {
        // this.updateData();
        this.OrderTaskDetialList();
        this.workdata();
    },
    created: function created() {
        var self = this;
        window.addEventListener('resize', function () {
            self.$forceUpdate();
        });
    },
    methods: {
        //时间段搜索
        timeChange() {
            this.workdata();
        },
        // 加工任务列表
        workdata() {
            let params = {
                cp_id: Number(localStorage.getItem('comp_id')),
                EndablePager: 0,
                QueryString: this.form.type || this.form.name || this.form.region,
                ID: Number(localStorage.getItem('comp_id')),
                BeginTime: dayjs(this.times[0]).format('YYYY-MM-DD  HH:mm:ss'),
                EndTime: dayjs(this.times[1]).format('YYYY-MM-DD  HH:mm:ss')
            };
            workdata(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.datasA = Data;
                }
            });
        },
        // 加工任务列表
        OrderTaskDetialList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                QueryString: this.form.type || this.form.name || this.form.region,
                BeginTime: dayjs(this.times[0]).format('YYYY-MM-DD  HH:mm:ss'),
                EndTime: dayjs(this.times[1]).format('YYYY-MM-DD  HH:mm:ss')
            };
            OrderTaskDetialList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    let oldDataRule1 = [];
                    let data = [];
                    Data.map((item) => {
                        if (item.status != -1) {
                            data.push(item);
                        }
                    });

                    data.forEach((el) => {
                        let oldObj = {
                            id: el.id,
                            name: el.name,
                            bomType_name: el.bomType_name,
                            order_name: el.order_name,
                            gtArray: []
                        };
                        let cityObj = {
                            start: el.begintimeReal || el.work_begin,
                            end: el.endtimeReal || el.work_end,
                            status: el.status,
                            craft_name: el.craft_name
                        };
                        oldObj.gtArray.push(cityObj);
                        oldDataRule1.push(oldObj);
                    });
                    // console.log(oldDataRule1, '====oldDataRule1');

                    let newData1 = [];
                    let newObj1 = {};
                    oldDataRule1.forEach((el, i) => {
                        if (!newObj1[el.name]) {
                            newData1.push(el);
                            newObj1[el.name] = true;
                        } else {
                            newData1.forEach((el) => {
                                if (el.name === oldDataRule1[i].name) {
                                    el.gtArray = el.gtArray.concat(oldDataRule1[i].gtArray);
                                }
                            });
                        }
                    });
                    // console.log(newData1, '11111');

                    let oldDataRule2 = [];
                    data.forEach((el) => {
                        let oldObj = {
                            id: el.id,
                            name: el.name,
                            bomType_name: el.bomType_name,
                            order_name: el.order_name,
                            gtArray: [],
                            color: '#fff'
                        };
                        let cityObj = {
                            start: el.work_begin,
                            end: el.work_end,
                            craft_name: el.craft_name
                        };
                        oldObj.gtArray.push(cityObj);
                        oldDataRule2.push(oldObj);
                    });
                    // console.log(oldDataRule2, '====oldDataRule2');

                    let newData2 = [];
                    let newObj2 = {};
                    oldDataRule2.forEach((el, i) => {
                        if (!newObj2[el.name]) {
                            newData2.push(el);
                            newObj2[el.name] = true;
                        } else {
                            newData2.forEach((el) => {
                                if (el.name === oldDataRule2[i].name) {
                                    el.gtArray = el.gtArray.concat(oldDataRule2[i].gtArray);
                                }
                            });
                        }
                    });
                    newData1.forEach((el, i) => {
                        el.newId = Math.random();
                    });
                    newData2.forEach((el, i) => {
                        el.newId = Math.random();
                    });
                    newData2.forEach((el2, i2) => {
                        newData1.splice(i2, 0, el2);
                    });
                    let newDatas = [];
                    newDatas = newData1.sort(this.compare('id'));
                    //console.log(newDatas[0].gtArray[0].end,'11111-');
                    //console.log(newDatas[0].gtArray[1].start,'11111-');
                    let newshuju = [];
                    for (let i = 0; i < newDatas.length; i++) {
                        let newshuju1 = [];
                        if (newDatas[i].gtArray) {
                            for (let j = 0; j < newDatas[i].gtArray.length; j++) {
                                // newshuju = [...newDatas[i].gtArray];
                                // newshuju.push({});

                                // console.log(newDatas[i].gtArray, 4444444444444);
                                // newDatas[i].gtArray = newshuju;
                                if (j >= newDatas[i].gtArray.length - 1) {
                                } else {
                                    newshuju1.push({
                                        start: newDatas[i].gtArray[j].end,
                                        end: newDatas[i].gtArray[j + 1].start,
                                        k: true,
                                        craft_name: '间隔时间'
                                    });
                                }
                                // newDatas[i].gtArray = newshuju;
                                // console.log(newDatas[i].gtArray[j].end, 111111111111111111111);
                                //console.log(newDatas[i].gtArray[j].start, 111111111111111111111);
                            }
                        }
                        newshuju.push(newshuju1);
                    }
                    // console.log(newshuju, 2222222222);
                    for (let index = 0; index < newshuju.length; index++) {
                        for (let i = 0; i < newshuju[index].length; i++) {
                            // console.log(newshuju[index][i], '999999999999');
                            if (newDatas[index].gtArray) {
                                newDatas[index].gtArray.push(newshuju[index][i]);
                            }
                        }
                    }

                    // console.log(newDatas, '----------------');
                    let data1 = JSON.parse(JSON.stringify(data));
                    let data2 = JSON.parse(JSON.stringify(data));
                    data1.forEach((item) => {
                        let a = [];

                        a.push({
                            craft_name: item.craft_name,
                            start: item.work_begin,
                            end: item.work_end
                        });
                        item.gtArray = a;
                        item.color = '#fff';
                    });
                    data2.forEach((item) => {
                        let a = [];

                        a.push({
                            craft_name: item.craft_name,
                            start: item.begintimeReal || item.work_begin,
                            end:
                                item.endtimeReal || item.begintimeReal
                                    ? item.endtimeReal
                                        ? item.endtimeReal
                                        : dayjs()
                                    : item.endtimeReal
                                        ? dayjs()
                                        : item.work_end,
                            status: item.status
                        });
                        item.gtArray = a;
                    });
                    let zong = [];
                    for (let i = 0; i < data1.length; i++) {
                        zong.push(data1[i]);
                        zong.push(data2[i]);
                    }

                    // this.datasA = newDatas;
                }
            });
        },
        compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        },

        updateTimeLines(timeA, timeB) {
            this.timeLines = [
                {
                    time: timeA,
                    text: '自定义'
                },
                {
                    time: timeB,
                    text: '测试',
                    color: '#747e80'
                }
            ];
        },
        scrollLeftA(val) {
            this.positionB = { x: val };
        },
        scrollLeftB(val) {
            this.positionA = { x: val };
        }
    }
};
</script>

<style scoped>
body {
    font: 12px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2px);
    background: #fff;
}

label {
    margin-left: 10px;
}

input {
    width: 40px;
    height: 20px;
    vertical-align: middle;
}

input[type='range'] {
    width: 100px;
}

.top-bar {
    height: 40px;
}

.containers {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    flex: 1;
}

.main-footer {
    /* height: 30px; */
}

>>>.el-slider {
    width: 100px;
}

/* >>> .gantt-header-timeline {
    line-height: 35px !important;
} */
>>>.gantt-leftbar-wrapper {
    outline: 1px solid #b2b6b8 !important;
}

/* >>> .gantt-header-title {
    width: 150px !important;
} */
>>>.gantt-header-title {
    background: #2a5389;
    color: #fff;
    font-weight: 400;
    width: 230px !important;
    outline: 1px solid #b2b6b8 !important;
}

>>>.el-form-item--small .el-form-item__content {
    line-height: 40px;
}

>>>.gantt-header-timeline {
    /* overflow: visible !important; */
    margin: 0 !important;
    padding-left: 20px;
}

>>>.plan {
    height: 98% !important;
    margin-top: 1px !important;
}

>>>.gantt-leftbar-item {
    /* height: 29px !important; */
    border-bottom: 1px solid #b2b6b8 !important;
    box-sizing: border-box !important;
}

>>>.gantt-block-top-space {
    /* border-bottom: 0 !important; */
}

>>>.gantt-blocks {
    background-image: linear-gradient(#b2b6b8 1px, transparent 0), linear-gradient(90deg, #b2b6b8 1px, transparent 0) !important;
}

>>>.gantt-header {
    border-top: 1px solid #b2b6b8 !important;
}

>>>.gantt-markline:nth-child(1) {
    display: none !important;
}

>>>.el-input--suffix .el-input__inner {
    padding-right: 0px;
}
</style>
<style lang='scss' scoped>
.title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 54px;
    background: linear-gradient(0deg,
            #e7f0fc 0%,
            #c4d3eb 43%,
            #d5e1f7 56.00000000000001%,
            #ccdbf2 60 align='center' 3%,
            #ccdaf1 74%,
            #edf3fc 98%);
    box-shadow: 0px 6px 9px 0px rgba(42, 83, 137, 0.25);

    .img {
        width: 23px;
        height: 23px;
    }

    .text {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 30px;
        margin-left: 5px;
        margin-right: 8px;
    }
}

::v-deep.box {
    .logo {
        width: 179px;
        height: 36px;
        margin: 9px 21px;
    }

    background: #fff;
    margin-bottom: 8px;
    overflow: hidden;

    .formBox {
        height: 50px;
        border-bottom: 1px solid #b2b6b8;

        .el-input__inner {
            // width: 310px !important;
            height: 32px !important;
            // background: #ffffff !important;
            // border: 1px solid #b1b8bc !important;
        }

        .el-form-item__label {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
        }

        .btn {
            width: 70px;
            height: 32px;
            border: 1px solid #b1b8bc;
            background: linear-gradient(0deg, #cfd0e2 0%, #ffffff 100%);
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2a5389;
            line-height: 0;
        }

        .btn:hover {
            border: 1px solid #b1b8bcbd;
            color: #2a5389c0;
        }

        .btxt {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #8aa4c7;
        }

        .fanhui {
            margin-right: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666;
            line-height: 51px;
        }

        .fanhui:hover {
            color: #2a5389;
        }
    }

    .statusBox {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #b2b6b8;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 40px;

        .img {
            width: 24px;
            height: 24px;
            margin: 8px 4px;
        }

        .date {
            float: right;
            position: relative;
            right: -60px;
        }

        .el-input--prefix .el-input__inner {
            width: 151px;
            height: 24px;
            background: #ffffff;
            border: 1px solid #bfc3c6;
        }

        .bili {
            position: absolute;
            width: 130px;
            height: 246px;
            background: #ffffff;
            border: 1px solid #2a5389;
            box-shadow: 1px 2px 7px 0px rgba(42, 83, 137, 0.19);

            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            text-align: center;
            z-index: 99;

            li {
                cursor: pointer;
            }

            li:hover {
                background: #f5f6f7;
            }
        }
    }
}
</style>
