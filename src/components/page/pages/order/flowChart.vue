<template>
    <div class="container">
        <!-- <title-name></title-name> -->
        <div class="orderTop" style="border-bottom: none">
            <span>订单列表<span class="dayu">></span></span
            ><span class="nextchuang">思维导图</span>
        </div>
        <div class="tableTop" flex="cross:center ">
            <div style="width: 100%" flex="cross:center main:justify">
                <div class="detailSearch marr" flex="cross:center ">
                    <!-- <el-input v-model="compPama.QueryString" clearable placeholder="请输入模块名称"></el-input> -->
                    <el-select v-model="compPama.QueryString" clearable filterable placeholder="请选择/输入名称">
                        <el-option v-for="item in moduleList" :key="item.id" :label="item.text" :value="item.id"> </el-option>
                    </el-select>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
                <div></div>
            </div>
        </div>
        <div style="height: 100px"></div>
        <div>
            <div ref="myPage" v-loading="g_loading" style="margin-top: -100px; width: calc(100% - 10px); height: calc(92.2vh - 100px)">
                <SeeksRelationGraph
                    ref="seeksRelationGraph"
                    :options="graphOptions"
                    :on-node-click="onNodeClick"
                    :on-line-click="onLineClick"
                >
                    <div
                        slot="node"
                        slot-scope="{ node }"
                        @mouseover="showNodeTips(node, $event)"
                        @mouseout="hideNodeTips(node, $event)"
                        style="width: 100%; height: 100%"
                    >
                        <div style="width: 100%; height: 100%; display: flex; align-items: center">
                            {{ node.text }}
                        </div>
                    </div>
                </SeeksRelationGraph>
            </div>
        </div>

        <div
            v-if="isShowNodeTipsPanel"
            :style="{
                left: nodeMenuPanelPosition.x + 'px',
                top: nodeMenuPanelPosition.y + 'px'
            }"
            style="
                z-index: 999;
                padding: 10px;
                background-color: #ffffff;
                border: #eeeeee solid 1px;
                box-shadow: 0px 0px 8px #cccccc;
                position: absolute;
            "
        >
            <div style="line-height: 25px; padding: 0 10px; color: #000; font-size: 14px">名称：{{ currentNode.text }}</div>
            <!-- <div class="c-node-menu-item">id:{{ currentNode.data.sonData }}</div> -->
            <!-- class="xuanfu" -->
            <div class="xuanfu">
                <div v-for="(item, index) in currentNode.data" :key="index" style="padding: 10px 0; border-bottom: 1px solid #ddd">
                    <div flex>
                        <div flex="cross:center">
                            <!-- <div class="btitle">工艺:</div> -->
                            <div style="width: 80px">{{ item.dt1 }}</div>
                        </div>
                        <div>
                            <div v-show="item.dt2" flex="cross:center" style="margin-bottom: 5px">
                                <div class="btitle">开始:</div>
                                <div>{{ item.dt2 }}</div>
                            </div>
                            <div v-show="item.dt3" flex="cross:center" style="margin-bottom: 5px">
                                <div class="btitle">结束:</div>
                                <div>{{ item.dt3 }}</div>
                            </div>
                            <div flex>
                                <div flex="cross:center">
                                    <div class="btitle">状态:</div>
                                    <div style="width: 70px; display: flex; align-items: center" :style="{ color: selectColor[item.dt4] }">
                                        {{ selectStatus[item.dt4] }}
                                    </div>
                                </div>
                                <div flex="cross:center">
                                    <div class="btitle">用时:</div>
                                    <div>{{ (item.dt5 / 3600).toFixed(2) }}h</div>
                                    <!-- 多少个小时 -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="c-node-menu-item">id:{{ currentNode.text }}</div> -->
        </div>
    </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph';
import { MoldMapL } from '@/api/api';
export default {
    name: 'SeeksRelationGraphDemo',
    components: { SeeksRelationGraph },
    data() {
        return {
            g_loading: true,
            demoname: '---',
            graphOptions: {
                backgrounImage: 'http://ai-mark.cn/images/ai-mark-desc.png',
                backgrounImageNoRepeat: true,
                layouts: [
                    {
                        label: '中心',
                        layoutName: 'tree',
                        layoutClassName: 'seeks-layout-center',
                        defaultJunctionPoint: 'border',
                        defaultNodeShape: 0,
                        defaultLineShape: 1,
                        from: 'left',
                        max_per_width: '300',
                        // min_per_height: '40',

                        max_per_height: '60' //最大纵向间距
                    }
                ],
                defaultLineMarker: {
                    markerWidth: 0,
                    markerHeight: 0,
                    refX: 6,
                    refY: 6,
                    data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
                },
                // defaultExpandHolderPosition: "right",
                defaultNodeShape: 1, //矩形圆角样式   2 矩形
                defaultNodeWidth: '100',
                defaultLineShape: 3, //线条样式-直线
                defaultJunctionPoint: 'lr', //默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）
                defaultNodeBorderWidth: 0, //边框宽度
                defaultLineColor: 'rgba(0, 186, 189, 1)',
                defaultNodeColor: 'rgba(0, 206, 209, 1)',
                allowShowMiniToolBar: false, //是否显示工具栏
                disableDragNode: true //是否禁用图谱中节点的拖动
                // defaultFocusRootNode: true //默认为根节点添加一个被选中的样式
                // defaultLineColor: '#ccc' //默认线条颜色
            },
            isShowNodeTipsPanel: false,
            nodeMenuPanelPosition: { x: 0, y: 0 },
            compPama: {
                QueryString: ''
            },
            orderId: '',
            moduleList: [],
            selectStatus: {
                '-1': '待创建',
                0: '待加工',
                1: '加工中',
                2: '加工完成',
                4: '加工暂停',
                5: '工艺跳过'
            },
            selectColor: {
                '-1': '#ffa300',
                0: '#ffa300',
                1: '#2a5389',
                2: '#18a837',
                4: '#ff0000',
                5: '#11B7D5'
            }
        };
    },
    created() {},
    mounted() {
        this.orderId = JSON.parse(this.$Base64.decode(this.$route.query.info)).id;
        this.demoname = this.$route.params.demoname;
        this.getMoldMapL();
    },
    methods: {
        searchBtn() {
            let QueryString = this.compPama.QueryString;
            if (QueryString == '') {
                var graph = this.$refs.seeksRelationGraph;
                graph.refresh();
            } else {
                var graph = this.$refs.seeksRelationGraph;
                graph.focusNodeById(QueryString);
                graph.getNodeById(QueryString).borderColor = '#000000';
                graph.getNodeById(QueryString).fontColor = '#000000';
            }
        },
        // 节点悬浮
        onNodeClick(nodeObject, $event) {
            console.log('onNodeClick:', nodeObject);
        },
        onLineClick(lineObject, $event) {
            console.log('onLineClick:', lineObject);
        },
        showNodeTips(nodeObject, $event) {
            // console.log(nodeObject,'nodeObject----');
            this.currentNode = nodeObject;
            var _base_position = this.$refs.myPage.getBoundingClientRect();
            console.log('showNodeMenus:', $event, _base_position);
            this.isShowNodeTipsPanel = true;
            this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
            this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 110;
        },
        hideNodeTips(nodeObject, $event) {
            this.isShowNodeTipsPanel = false;
        },
        setGraphData(Data) {
            // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
            //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
            var __graph_json_data = Data;
            console.log(JSON.stringify(__graph_json_data));
            setTimeout(
                function() {
                    this.g_loading = false;
                    this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, seeksRGGraph => {
                        // 这些写上当图谱初始化完成后需要执行的代码
                    });
                }.bind(this),
                1000
            );
        },

        getMoldMapL() {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                id: this.orderId
            };
            MoldMapL(params).then(res => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    console.log(Data, '====1');
                    this.moduleList = Data.nodes;
                    console.log(Data.links, '=====links');
                    for (let i = 0; i < Data.links.length; i++) {
                        if (
                            Data.links[i].styleClass == 'colorL1' ||
                            Data.links[i].styleClass == 'colorL1-1' ||
                            Data.links[i].styleClass == 'colorL1-1-1'
                        ) {
                            Data.links[i].color = '#5283c3';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL2' ||
                            Data.links[i].styleClass == 'colorL2-1' ||
                            Data.links[i].styleClass == 'colorL2-1-1'
                        ) {
                            Data.links[i].color = '#a992cf';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL3' ||
                            Data.links[i].styleClass == 'colorL3-1' ||
                            Data.links[i].styleClass == 'colorL3-1-1'
                        ) {
                            Data.links[i].color = '#2fa4c1';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL4' ||
                            Data.links[i].styleClass == 'colorL4-1' ||
                            Data.links[i].styleClass == 'colorL4-1-1'
                        ) {
                            Data.links[i].color = '#cc7eae';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL5' ||
                            Data.links[i].styleClass == 'colorL5-1' ||
                            Data.links[i].styleClass == 'colorL5-1-1'
                        ) {
                            Data.links[i].color = '#f4c251';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL6' ||
                            Data.links[i].styleClass == 'colorL6-1' ||
                            Data.links[i].styleClass == 'colorL6-1-1'
                        ) {
                            Data.links[i].color = '#f56b85';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL7' ||
                            Data.links[i].styleClass == 'colorL7-1' ||
                            Data.links[i].styleClass == 'colorL7-1-1'
                        ) {
                            Data.links[i].color = '#cc7eaf';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL8' ||
                            Data.links[i].styleClass == 'colorL8-1' ||
                            Data.links[i].styleClass == 'colorL8-1-1'
                        ) {
                            Data.links[i].color = '#bccf93';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL9' ||
                            Data.links[i].styleClass == 'colorL9-1' ||
                            Data.links[i].styleClass == 'colorL9-1-1'
                        ) {
                            Data.links[i].color = '#93cfae';
                        }
                        if (
                            Data.links[i].styleClass == 'colorL10' ||
                            Data.links[i].styleClass == 'colorL10-1' ||
                            Data.links[i].styleClass == 'colorL10-1-1'
                        ) {
                            Data.links[i].color = '#ce7d7d';
                        }
                    }
                    for (let i = 0; i < Data.nodes.length; i++) {
                        if (
                            Data.nodes[i].styleClass == 'color1-1-1' ||
                            Data.nodes[i].styleClass == 'color2-1-1' ||
                            Data.nodes[i].styleClass == 'color3-1-1' ||
                            Data.nodes[i].styleClass == 'color4-1-1' ||
                            Data.nodes[i].styleClass == 'color5-1-1' ||
                            Data.nodes[i].styleClass == 'color6-1-1' ||
                            Data.nodes[i].styleClass == 'color7-1-1' ||
                            Data.nodes[i].styleClass == 'color8-1-1' ||
                            Data.nodes[i].styleClass == 'color9-1-1' ||
                            Data.nodes[i].styleClass == 'color10-1-1'
                        ) {
                            if (Data.nodes[i].text == '待创建' || Data.nodes[i].text == '待加工') {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#FFA300';
                            } else if (Data.nodes[i].text == '加工中') {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#2a5389';
                            } else if (Data.nodes[i].text == '加工完成') {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#18a837';
                            } else if (Data.nodes[i].text == '加工暂停') {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#ff0000';
                            } else if (Data.nodes[i].text == '工艺跳过') {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#11B7D5';
                            } else {
                                Data.nodes[i].color = '#fff';
                                Data.nodes[i].fontColor = '#11B7D5';
                            }
                        }
                    }
                    this.setGraphData(Data);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.xuanfu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    /* padding-top: 20px; */
}

/* 一级 */
.color1 {
    background: #5283c3 !important;
}
.color2 {
    background: #a992cf !important;
}
.color3 {
    background: #2fa4c1 !important;
}
.color4 {
    background: #cc7eae !important;
}
.color5 {
    background: #f4c251 !important;
}
.color6 {
    background: #f56b85 !important;
}
.color7 {
    background: #cc7eaf !important;
}
.color8 {
    background: #bccf93 !important;
}
.color9 {
    background: #93cfae !important;
}
.color10 {
    background: #ce7d7d !important;
}
/* 二级 */
.color1-1 {
    background: #5283c3 !important;
}
.color2-1 {
    background: #a992cf !important;
}
.color3-1 {
    background: #2fa4c1 !important;
}
.color4-1 {
    background: #cc7eae !important;
}
.color5-1 {
    background: #f4c251 !important;
}
.color6-1 {
    background: #f56b85 !important;
}
.color7-1 {
    background: #cc7eaf !important;
}
.color8-1 {
    background: #bccf93 !important;
}
.color9-1 {
    background: #93cfae !important;
}
.color10-1 {
    background: #ce7d7d !important;
}
/* 三级 */
/* .color1-1-1 {
    background: #5283c3 !important;
}
.color2-1-1 {
    background: #a992cf !important;
}
.color3-1-1 {
    background: #2fa4c1 !important;
}
.color4-1-1 {
    background: #cc7eae !important;
}
.color5-1-1 {
    background: #f4c251 !important;
}
.color6-1-1 {
    background: #f56b85 !important;
}
.color7-1-1 {
    background: #cc7eaf !important;
}
.color8-1-1 {
    background: #bccf93 !important;
}
.color9-1-1 {
    background: #93cfae !important;
}
.color10-1-1 {
    background: #ce7d7d !important;
} */
/* 这是线 */
/* 一级 */
.colorL1 {
    color: #000 !important;
    background: #000 !important;
}
.colorL2 {
    color: #a992cf !important;
}
.colorL3 {
    color: #2fa4c1 !important;
}
.colorL4 {
    color: #cc7eae !important;
}
.colorL5 {
    color: #f4c251 !important;
}
.colorL6 {
    color: #f56b85 !important;
}
.colorL7 {
    color: #cc7eaf !important;
}
.colorL8 {
    color: #bccf93 !important;
}
.colorL9 {
    color: #93cfae !important;
}
.colorL10 {
    color: #ce7d7d !important;
}
/* 二级 */
.colorL1-1 {
    color: #5283c3 !important;
}
.colorL2-1 {
    color: #a992cf !important;
}
.colorL3-1 {
    color: #2fa4c1 !important;
}
.colorL4-1 {
    color: #cc7eae !important;
}
.colorL5-1 {
    color: #f4c251 !important;
}
.colorL6-1 {
    color: #f56b85 !important;
}
.colorL7-1 {
    color: #cc7eaf !important;
}
.colorL8-1 {
    color: #bccf93 !important;
}
.colorL9-1 {
    color: #93cfae !important;
}
.colorL10-1 {
    color: #ce7d7d !important;
}
/* 三级 */
.colorL1-1-1 {
    color: #5283c3 !important;
}
.colorL2-1-1 {
    color: #a992cf !important;
}
.colorL3-1-1 {
    color: #2fa4c1 !important;
}
.colorL4-1-1 {
    color: #cc7eae !important;
}
.colorL5-1-1 {
    color: #f4c251 !important;
}
.colorL6-1-1 {
    color: #f56b85 !important;
}
.colorL7-1-1 {
    color: #cc7eaf !important;
}
.colorL8-1-1 {
    color: #bccf93 !important;
}
.colorL9-1-1 {
    color: #93cfae !important;
}
.colorL10-1-1 {
    color: #ce7d7d !important;
}

.btitle {
    color: #777;
}
</style>
