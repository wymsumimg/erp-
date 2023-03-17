<template>
    <el-popover placement="bottom" trigger="hover">
        <div
            ref="box"
            slot="reference"
            class="plan"
            :style="{
                'background-color':
                    item.status == 2
                        ? '#e9ffee'
                        : item.status == 1
                        ? '#E3EFFF'
                        : item.status == 4
                        ? '#FFECDD'
                        : item.status == -1
                        ? '#dbdbdb'
                        : item.status == 0
                        ? '#dbdbdb'
                        : item.status == 5
                        ? '#dbdbdb'
                        : item.k == true
                        ? '#f2f2f2'
                        : '#FFE8E8',
                color:
                    item.status == 2
                        ? '#18A837'
                        : item.status == 1
                        ? '#2A5389'
                        : item.status == 4
                        ? '#FF6F00'
                        : item.status == -1
                        ? '#000'
                        : item.status == 0
                        ? '#000'
                        : item.status == 5
                        ? '#000'
                        : item.k == true
                        ? '#a8a8a8'
                        : '',
                'margin-top': 0.1 * cellHeight + 'px'
            }"
            @click="onClick"
        >
            <div v-if="!item.k">
                <div class="runTime" v-if="show">
                    <span>S:{{ startToString.substr(5, 11) }}</span>
                    <span>E:{{ endToString.substr(5, 11) }}</span>
                </div>
            </div>
            <div class="middle">
                {{ item.craft_name }}
                <div style="font-size: 12px">({{ this.times(dayjs(endToString) - dayjs(startToString)) }})</div>
            </div>
            <!-- <div class="passenger">{{item.passenger}}人</div> -->
        </div>

        <div class="detail" v-if="!item.k">
            <span>
                <!-- {{ data.type }} -->
                {{ data.name }}
                <!-- {{ data.id }} -->
            </span>
            <ul>
                <li>
                    <span>工艺：</span><span>{{ item.craft_name }}</span>
                </li>
                <li>
                    <span>开始时间：</span><span>{{ startToString }}</span>
                </li>
                <li>
                    <span>结束时间：</span><span>{{ endToString }}</span>
                </li>
                <li>
                    <span>总时长：</span><span>{{ this.times(dayjs(endToString) - dayjs(startToString)) }}</span>
                </li>
            </ul>
        </div>
        <div class="detail" v-else>
            <span>间隔时长：</span><span>{{ this.times(dayjs(endToString) - dayjs(startToString)) }}</span>
        </div>
    </el-popover>
</template>

<script>
import dayjs from 'dayjs';

const NOW_PLAN = '#D5F8EA';
const FUTHER_PLAN = '#BFF2FE';
const PAST_PLAN = '#F2F2F2';
export default {
    name: 'Test',
    props: {
        data: Object,
        item: Object,
        currentTime: dayjs,
        updateTimeLines: Function,
        cellHeight: Number,
        startTimeOfRenderArea: Number
    },
    data() {
        return {
            dayjs: dayjs,
            show: true
        };
    },
    computed: {
        statusColor() {
            let { item, currentTime } = this;
            let start = dayjs(item.start);
            let end = dayjs(item.end);
            if (start.isBefore(currentTime) && end.isAfter(currentTime)) {
                return NOW_PLAN; // NOW
            } else if (end.isBefore(currentTime)) {
                return PAST_PLAN; // PAST
            } else {
                return FUTHER_PLAN; // Future
            }
        },
        startToString() {
            return dayjs(this.item.start).format('YYYY-MM-DD HH:mm:ss');
        },
        endToString() {
            return dayjs(this.item.end).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.clwidth();
        });
    },
    methods: {
        clwidth() {
            if (this.$refs.box.offsetWidth < 150) {
                this.show = false;
            }

            // if (this.$refs.box.$el.clientWidth < 65) {
            //     this.show = false;
            // }
        },
        // times(data) {
        //     let time = data / 1000;
        //     let d = Math.floor(time / 86400);
        //     let h = Math.floor((time % 86400) / 3600);
        //     let m = Math.floor(((time % 86400) % 3600) / 60);
        //     let s = (parseInt(time % 86400) % 3600) % 60;
        //     let hh = h < 10 ? '0' + h : h;
        //     let mm = m < 10 ? '0' + m : m;
        //     let ss = s < 10 ? '0' + s : s;
        //     return (d > 0 ? d + '天' : '') + hh + '时' + mm + '分';
        // },
        times(msd) {
            var time = msd / 1000;
            if (null != time && '' != time) {
                if (time > 60 && time < 60 * 60) {
                    time = parseInt(time / 60.0) + '分钟' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + '秒';
                } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0) + '小时' + Math.ceil((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) + '分钟';
                } else if (time >= 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0 / 24) +
                        '天' +
                        parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24) +
                        '小时' +
                        Math.ceil((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
                        '分钟';
                } else {
                    time = parseInt(time) + '秒';
                }
            }
            return time;
        },
        dateCalculation(second) {
            //返回天、时、分
            if (second > 0) {
                var day = 0;
                var hour = 0;
                var minute = 0;
                var data = {};
                minute = Math.floor(second / 6000 / 60);
                if (parseInt(minute) > 60) {
                    hour = parseInt(minute / 60);
                    minute %= 60; //算出有多分钟
                }
                if (parseInt(hour) > 24) {
                    day = parseInt(hour / 24);
                    hour %= 24; //算出有多分钟
                }
                data.day = day;
                data.hour = hour;
                data.minute = minute;
                return (data.day <= 0 ? '' : data.day + '天') + data.hour + '时' + data.minute + '分';
            }
        },
        onClick() {
            this.updateTimeLines(this.item.start, this.item.end);
        }
    }
};
</script>

<style lang="scss" scoped>
.middle {
    width: 88px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    flex: 1;
    text-align: center;
}
.runTime {
    min-width: 30px;
    display: flex;
    flex-direction: column;
}
.plan {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 80%;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    color: #ff0000;
    padding-left: 5px;
    font-size: 0.8rem;

    // opacity: 0.8;
}

.detail {
    .header {
        text-align: center;
        font-size: 1rem;
    }
}

.detail ul {
    list-style: none;
    padding: 0px;
    li {
        span {
            display: inline-block;
            width: 120px;
            color: #777;
            font-size: 0.8rem;
        }
        span:first-child {
            text-align: right;
        }

        span:last-child {
        }
    }
}
</style>
