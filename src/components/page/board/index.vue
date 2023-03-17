<template>
    <div class="board">
        <div class="title">
            <img src="../../common/comImg/index/微信图片_20211229173350.png" alt="" class="logo" />
            <div flex="cross:center ">
                <img src="../../common/comImg/index/矢量智能对象.png" alt="" class="img" />
                <div class="text">
                    {{ ManageName }}
                </div>
            </div>
        </div>
        <div class="box">
            <div class="formBox">
                <el-form label-position="right" label-width="90px" :model="form" inline style="height: 49px; margin: 7px 0 0 82px" flex>
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
                            <el-button class="btn" @click="OrderTaskDetialList()">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!-- <div class="btxt">输入任意一项即可查询</div> -->
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="statusBox">
                <div flex>
                    <img src="../../common/comImg/index/矢量智能对象 (1).png" alt="" class="img" />
                    <div>
                        计划加工（<span style="color: #ff1f1f">红色</span>：计划加工） 实际加工（<span style="color: #2a5389">蓝色</span
                        >：正在加工 <span style="color: #ff6f00">&nbsp;&nbsp; 黄色</span>：暂停加工
                        <span style="color: #26ae43">&nbsp;&nbsp; 绿色</span>：加工完成 ）
                    </div>
                </div>
                <div style="width: 415px">
                    <el-dropdown @command="changebf">
                        <span class="el-dropdown-link">
                            <el-input-number
                                v-model="num"
                                size="mini"
                                @change="handleChange()"
                                :min="25"
                                :max="400"
                                :step="25"
                                @focus="focus()"
                            ></el-input-number>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="width: 130px">
                            <el-dropdown-item
                                :command="item.name"
                                v-for="(item, index) in baifenList"
                                :key="index"
                                style="text-align: center"
                                >{{ item.name }}%</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="date">
                        <span class="dateTit" style="margin-right: 5px">选择日期:</span>
                        <el-date-picker
                            type="date"
                            v-model="value"
                            placeholder="选择一个日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @change="OrderTaskDetialList()"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </div>

            <div class="tab">
                <div ref="bigImage" style="overflow: auto">
                    <template>
                        <el-table
                            :data="tableData"
                            border
                            :style="'width:' + num * 100 + 'px'"
                            :span-method="objectSpanMethod"
                            :cell-style="cellStyleBg"
                            :cell-class-name="cellClassFn"
                        >
                            <el-table-column width="77" prop="name" align="center">
                                <template slot="header" flex>
                                    <div class="tabhad">
                                        <span style="position: relative; margin-left: 28px">时间(h)</span>
                                        <div></div>
                                        <span style="position: relative; margin-left: -40px">料号</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :prop="columns.prop"
                                :label="columns.label"
                                min-width="60"
                                align="center"
                                v-for="(columns, index) in column"
                                :key="index"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <div flex class="tabHang">
                                            <div style="height: 3vh; line-height: 3vh" v-if="scope.$index % 2 == 0">
                                                <el-tooltip
                                                    content=""
                                                    placement="top"
                                                    v-for="(item, index) in scope.row.arr"
                                                    :key="index"
                                                    disabled
                                                >
                                                    <font
                                                        v-if="
                                                            getHour(item.work_begin) == columns.time.split(':')[0] ||
                                                            getHour(item.work_end) == columns.time.split(':')[0]
                                                        "
                                                        color="#FF0000"
                                                        style="
                                                            background: #ffe8e8;
                                                            position: absolute;
                                                            left: 0;
                                                            line-height: 3vh;
                                                            z-index: 99;
                                                            overflow: hidden;
                                                            height: 3vh;
                                                        "
                                                        :style="{
                                                            right: getHour(item.work_begin) == columns.time.split(':')[0] ? '0' : '',
                                                            left: getHour(item.work_end) == columns.time.split(':')[0] ? '0' : '',
                                                            width:
                                                                getHour(item.work_begin) == columns.time.split(':')[0]
                                                                    ? (60 - new Date(item.work_begin).getMinutes()) / 0.6 + '%'
                                                                    : new Date(item.work_end).getMinutes() / 0.6 + '%'
                                                        }"
                                                    >
                                                        {{ item.craft_name }}
                                                    </font>
                                                    <font
                                                        v-else-if="
                                                            Number(new Date(item.work_begin).getTime()) <=
                                                                Number(new Date(columns.time).getTime()) &&
                                                            Number(new Date(item.work_end).getTime()) >
                                                                Number(new Date(columns.time).getTime())
                                                        "
                                                        color="#FF0000"
                                                        style="
                                                            background: #ffe8e8;
                                                            position: absolute;
                                                            width: 100%;
                                                            left: 0;
                                                            line-height: 3vh;
                                                            z-index: 99;
                                                        "
                                                    >
                                                        {{ item.craft_name }}
                                                    </font>
                                                </el-tooltip>
                                                <div style="background: #e9ffee; height: 3vh; line-height: 3vh; width: 100%"></div>
                                            </div>
                                            <div style="height: 3vh; line-height: 3vh" v-else>
                                                <el-tooltip
                                                    content="11"
                                                    placement="top"
                                                    v-for="(item, index) in scope.row.arr"
                                                    :key="index"
                                                    style="height: 3vh"
                                                    disabled
                                                >
                                                    <font
                                                        v-if="
                                                            getHour(item.work_begin) == columns.time.split(':')[0] ||
                                                            getHour(item.work_end) == columns.time.split(':')[0]
                                                        "
                                                        :color="
                                                            item.status == 2
                                                                ? '#18A837'
                                                                : item.status == 1
                                                                ? '#2A5389'
                                                                : item.status == 4
                                                                ? '#FF6F00'
                                                                : ''
                                                        "
                                                        :style="{
                                                            background:
                                                                item.status == 2
                                                                    ? '#e9ffee'
                                                                    : item.status == 1
                                                                    ? '#E3EFFF'
                                                                    : item.status == 4
                                                                    ? '#FFECDD'
                                                                    : '',
                                                            right: getHour(item.work_begin) == columns.time.split(':')[0] ? '0' : '',
                                                            left: getHour(item.work_end) == columns.time.split(':')[0] ? '0' : '',
                                                            width:
                                                                getHour(item.work_begin) == columns.time.split(':')[0]
                                                                    ? (60 - new Date(item.work_begin).getMinutes()) / 0.6 + '%'
                                                                    : new Date(item.work_end).getMinutes() / 0.6 + '%'
                                                        }"
                                                        style="position: absolute; line-height: 3vh; z-index: 99; overflow: hidden"
                                                    >
                                                        {{ item.status == 0 || item.status == 3 ? '' : item.craft_name }}
                                                    </font>
                                                    <font
                                                        v-else-if="
                                                            Number(new Date(item.work_begin).getTime()) <=
                                                                Number(new Date(columns.time).getTime()) &&
                                                            Number(new Date(item.work_end).getTime()) >
                                                                Number(new Date(columns.time).getTime())
                                                        "
                                                        :color="
                                                            item.status == 2
                                                                ? '#18A837'
                                                                : item.status == 1
                                                                ? '#2A5389'
                                                                : item.status == 4
                                                                ? '#FF6F00'
                                                                : ''
                                                        "
                                                        :style="
                                                            item.status == 2
                                                                ? 'background: #e9ffee;'
                                                                : item.status == 1
                                                                ? 'background: #E3EFFF;'
                                                                : item.status == 4
                                                                ? 'background: #FFECDD;'
                                                                : ''
                                                        "
                                                        style="position: absolute; width: 100%; left: 0; line-height: 3vh; z-index: 99"
                                                    >
                                                        {{ item.status == 0 || item.status == 3 ? '' : item.craft_name }}
                                                    </font>
                                                </el-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { OrderTaskDetialList } from '@/api/api';
export default {
    components: {},
    data() {
        return {
            show: false,
            ManageName: '',
            form: {
                name: '',
                region: '',
                type: ''
            },
            value: '',
            num: 100,
            column: [
                {
                    prop: 'craft_name',
                    label: '00~01',
                    time: this.seTime('00')
                },
                {
                    prop: 'craft_name',
                    label: '01~02',
                    time: this.seTime('01')
                },
                {
                    prop: 'craft_name',
                    label: '02~03',
                    time: this.seTime('02')
                },
                {
                    prop: 'craft_name',
                    label: '03~04',
                    time: this.seTime('03')
                },
                {
                    prop: 'craft_name',
                    label: '04~05',
                    time: this.seTime('04')
                },
                {
                    prop: 'craft_name',
                    label: '05~06',
                    time: this.seTime('05')
                },
                {
                    prop: 'craft_name',
                    label: '06~07',
                    time: this.seTime('06')
                },
                {
                    prop: 'craft_name',
                    label: '07~08',
                    time: this.seTime('07')
                },
                {
                    prop: 'craft_name',
                    label: '08~09',
                    time: this.seTime('08')
                },
                {
                    prop: 'craft_name',
                    label: '09~10',
                    time: this.seTime('09')
                },
                {
                    prop: 'craft_name',
                    label: '10~11',
                    time: this.seTime('10')
                },
                {
                    prop: 'craft_name',
                    label: '11~12',
                    time: this.seTime('11')
                },
                {
                    prop: 'craft_name',
                    label: '12~13',
                    time: this.seTime('12')
                },
                {
                    prop: 'craft_name',
                    label: '13~14',
                    time: this.seTime('13')
                },
                {
                    prop: 'craft_name',
                    label: '14~15',
                    time: this.seTime('14')
                },
                {
                    prop: 'craft_name',
                    label: '15~16',
                    time: this.seTime('15')
                },
                {
                    prop: 'craft_name',
                    label: '16~17',
                    time: this.seTime('16')
                },
                {
                    prop: 'craft_name',
                    label: '17~18',
                    time: this.seTime('17')
                },
                {
                    prop: 'craft_name',
                    label: '18~19',
                    time: this.seTime('18')
                },
                {
                    prop: 'craft_name',
                    label: '19~20',
                    time: this.seTime('19')
                },
                {
                    prop: 'craft_name',
                    label: '20~21',
                    time: this.seTime('20')
                },
                {
                    prop: 'craft_name',
                    label: '21~22',
                    time: this.seTime('21')
                },
                {
                    prop: 'craft_name',
                    label: '22~23',
                    time: this.seTime('22')
                },
                {
                    prop: 'craft_name',
                    label: '23~24',
                    time: this.seTime('23')
                }
            ],
            tableData: [],
            baifenList: [
                { id: 1, name: '400' },
                { id: 2, name: '200' },
                { id: 3, name: '100' },
                { id: 4, name: '50' },
                { id: 5, name: '25' }
            ],
            bfVal: '',
            status: false
        };
    },
    computed: {},
    watch: {
        value: function (val) {
            if (val) {
                this.column = [
                    {
                        prop: 'craft_name',
                        label: '00~01',
                        time: `${this.value} 00:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '01~02',
                        time: `${this.value} 01:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '02~03',
                        time: `${this.value} 02:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '03~04',
                        time: `${this.value} 03:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '04~05',
                        time: `${this.value} 04:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '05~06',
                        time: `${this.value} 05:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '06~07',
                        time: `${this.value} 06:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '07~08',
                        time: `${this.value} 07:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '08~09',
                        time: `${this.value} 08:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '09~10',
                        time: `${this.value} 09:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '10~11',
                        time: `${this.value} 10:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '11~12',
                        time: `${this.value} 11:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '12~13',
                        time: `${this.value} 12:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '13~14',
                        time: `${this.value} 13:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '14~15',
                        time: `${this.value} 14:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '15~16',
                        time: `${this.value} 15:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '16~17',
                        time: `${this.value} 16:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '17~18',
                        time: `${this.value} 17:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '18~19',
                        time: `${this.value} 18:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '19~20',
                        time: `${this.value} 19:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '20~21',
                        time: `${this.value} 20:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '21~22',
                        time: `${this.value} 21:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '22~23',
                        time: `${this.value} 22:00:00`
                    },
                    {
                        prop: 'craft_name',
                        label: '23~24',
                        time: `${this.value} 23:00:00`
                    }
                ];
            }
        }
    },
    created() {
        this.OrderTaskDetialList();
    },
    mounted() {
        this.ManageName = localStorage.getItem('ManageName');
    },
    methods: {
        getHour(time) {
            var date = new Date(time);
            var Y = date.getFullYear() + '-';

            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

            var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

            return Y + M + D + h;
        },
        seTime(time) {
            let endTime2 = new Date(new Date(new Date().getTime()).setHours(Number(time), Number('00'), Number('00')));
            var date = new Date(endTime2);
            var Y = date.getFullYear() + '-';

            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';

            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';

            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

            return Y + M + D + h + m + s;
        },
        //加工任务列表
        OrderTaskDetialList() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                Status: '',
                QueryString: this.form.type || this.form.name || this.form.region,
                BeginTime: this.value ? `${this.value}  00:00:00` : '',
                EndTime: this.value ? `${this.value}  23:59:59` : ''
            };
            OrderTaskDetialList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    var result = [];
                    var obj = {};
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (!obj[this.tableData[i].bom_id]) {
                            result.push(this.tableData[i]);
                            obj[this.tableData[i].bom_id] = true;
                        }
                    }

                    this.tableTwo = Data;
                    let newArrTwo = [];
                    for (let n = 0; n < result.length; n++) {
                        let neiArr = [];
                        for (let i = 0; i < this.tableTwo.length; i++) {
                            if (result[n].bom_id == this.tableTwo[i].bom_id) {
                                neiArr.push(this.tableTwo[i]);
                            }
                        }
                        newArrTwo.push(neiArr);
                    }

                    for (let n = 0; n < result.length; n++) {
                        for (let i = 0; i < newArrTwo.length; i++) {
                            for (let j = 0; j < newArrTwo[i].length; j++) {
                                if (result[n].bom_id == newArrTwo[i][j].bom_id) {
                                    result[n].arr = newArrTwo[i];
                                }
                            }
                        }
                    }

                    // for (let i = 0; i < result.length; i++) {
                    //     result[i].nameArr = [];
                    // }

                    // var nameArrs = [];

                    // for (let i = 0; i < Data.length; i++) {
                    //     let nameArr = [];
                    //     let task_beginArr = [];
                    //     let task_endArr = [];
                    //     let work_beginArr = [];
                    //     let work_endArr = [];
                    //     let arr = [];
                    //     let obj = {};
                    //     for (let m = 0; m < Data.length; m++) {
                    //         if (Data[i].bom_id == Data[m].bom_id) {
                    //             arr.push(obj);
                    //             Data[m].arr = arr;
                    //             // for(let j = 0; j < result.length; j++){

                    //             // }
                    //             arr.map((item) => {
                    //                 item.task_begin = Data[m].task_begin;
                    //                 item.task_end = Data[m].task_end;
                    //                 item.work_begin = Data[m].work_begin;
                    //                 item.work_end = Data[m].work_end;
                    //                 item.craft_name = Data[m].craft_name;
                    //             });
                    // obj.task_begin = Data[m].task_begin;
                    // obj.task_end = Data[m].task_end;
                    // obj.work_begin = Data[m].work_begin;
                    // obj.work_end = Data[m].work_end;
                    // obj.craft_name = Data[m].craft_name;

                    // task_beginArr.push(Data[m].task_begin);
                    // Data[m].task_beginArr = task_beginArr;

                    // task_endArr.push(Data[m].task_end);
                    // Data[m].task_endArr = task_endArr;
                    // work_beginArr.push(Data[m].work_begin);
                    // Data[m].work_beginArr = work_beginArr;
                    // work_endArr.push(Data[m].work_end);
                    // Data[m].work_endArr = work_endArr;
                    // nameArr.push(Data[m].craft_name);
                    // Data[m].nameArr = nameArr;
                    //     }
                    // }
                    // for (let j = 0; j < result.length; j++) {
                    //     if (Data[i].bom_id == result[j].bom_id) {
                    //         result[j]['task_begin' + i] = Data[i].task_begin;
                    //         result[j]['task_end' + i] = Data[i].task_end;
                    //         result[j]['craft_name' + i] = Data[i].craft_name;

                    //         // result[j].nameArr = nameArr;

                    //         // result[j].name.push(Data[i].craft_name);

                    //         // nameArrs.push(result[i]['craft_name' + i]);
                    //         // console.log(nameArrs, '----');

                    //         result[j]['work_begin' + i] = Data[i].work_begin;
                    //         result[j]['work_end' + i] = Data[i].work_end;
                    //     }
                    // }
                    // }

                    let newArr = [];
                    for (let i = 0; i < result.length; i++) {
                        newArr.push(result[i]);

                        newArr.push(result[i]);
                    }
                    this.tableData = newArr;
                }
            });
        },
        changebf(command) {
            this.num = Number(command);
            this.show = false;
            if (this.num >= 25 && this.num <= 400) {
                this.$refs.bigImage.style.zoom = this.num + '%';
            }
        },
        onSubmit() {},
        handleChange() {
            if (this.num >= 25 && this.num <= 400) {
                this.$refs.bigImage.style.zoom = this.num + '%';
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },

        cellStyleBg({ row, column, rowIndex, columnIndex }) {
            if (columnIndex - 1 == new Date().getHours()) {
                return `background:#e8effa`;
            }
        },
        cellClassFn({ row, column, rowIndex, columnIndex }) {
            if (columnIndex % 2 === 0) {
                return `background:red`;
            }
        },
        focus() {
            this.show = true;
        },
        blur() {
            this.show = false;
        },
        // rollImg() {
        //     /* 获取当前页面的缩放比
        //             若未设置zoom缩放比，则为默认100%，即1，原图大小
        //         */
        //     this.num = parseInt(this.$refs.bigImage.style.zoom) || 100;
        //     /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
        //             wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
        //         */
        //     this.num += event.wheelDelta / 12;
        //     /* 最小范围 和 最大范围 的图片缩放尺度 */
        //     if (this.num >= 25 && this.num <= 400) {
        //         this.$refs.bigImage.style.zoom = this.num + '%';
        //     }
        //     return false;
        // },
        onli(e) {
            let str = e.target.innerHTML;
            this.num = str.substring(0, str.length - 1);
            this.show = false;
            if (this.num >= 25 && this.num <= 400) {
                this.$refs.bigImage.style.zoom = this.num + '%';
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
::v-deep.board {
    min-width: 1508px;
    .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 54px;
        background: linear-gradient(
            0deg,
            #e7f0fc 0%,
            #c4d3eb 43%,
            #d5e1f7 56.00000000000001%,
            #ccdbf2 60 align= 'center' 3%,
            #ccdaf1 74%,
            #edf3fc 98%
        );
        box-shadow: 0px 6px 9px 0px rgba(42, 83, 137, 0.25);
        .logo {
            width: 179px;
            height: 36px;
            margin: 9px 21px;
        }
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
    .box {
        height: calc(100vh - 70px);
        background: #fff;
        margin: 8px;
        overflow: hidden;

        .formBox {
            height: 50px;
            border-bottom: 1px solid #b2b6b8;
            .el-input__inner {
                width: 310px !important;
                height: 32px !important;
                background: #ffffff !important;
                border: 1px solid #b1b8bc !important;
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
    .tab {
        widows: 100%;
        height: 85%;
        margin: 8px;
        overflow: auto;
    }
}
::v-deep.el-table th {
    padding: 0 !important;
}
::v-deep.el-table td {
    padding: 3px 0 !important;
}
::v-deep.el-table--border th {
    background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
}
// ::v-deep.el-table--border th .el-table_1_column_1 {
//     background: linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%) !important;
// }
// ::v-deep.el-table tr:nth-child(2n) {
//     background: #f5f8fd;
// }
::v-deep.el-table tbody tr:hover > td {
    background-color: #e8effa !important;
}
::v-deep.el-table .cell {
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #172b43;
    line-height: 14px;
}
::v-deep.el-table--border,
::v-deep.el-table--group {
    border-color: #b2b6b8;
}

::v-deep.el-table--border:after,
::v-deep.el-table--group:after,
::v-deep.el-table:before {
    background-color: #b2b6b8;
}

::v-deep.el-table td,
::v-deep.el-table--border th,
::v-deep.el-table th.is-leaf {
    border-bottom-color: #b2b6b8;
}

::v-deep.el-table--border td,
::v-deep.el-table--border th {
    border-right-color: #b2b6b8;
}
::v-deep.el-table--border td {
    padding: 0 !important;
}
::v-deep.el-table .cell {
    padding: 0;
}
</style>

<style lang="scss">
.tab {
    .el-table_1_column_1 {
        padding: 0;
    }
    .el-table--border th:first-child .cell,
    .el-table--border td:first-child .cell {
        line-height: 20px !important;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .tabhad {
        width: 100%;
        height: 100%;
        background: linear-gradient(27deg, transparent 49.5%, #b2b6b8 49.5%, #b2b6b8 50.5%, transparent 50.5%);
    }
}
</style>