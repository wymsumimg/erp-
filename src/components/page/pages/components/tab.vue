 <template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 99.2%; margin: 8px 8px 0"
            :max-height="height ? height : tableHeight"
            ref="recordTable"
            @filter-change="filterChange"
            :highlight-current-row="highCurrent"
            class="ercordCasl"
            @selection-change="handleSelectionChange"
            @cell-click="cellClick"
        >
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                align="center"
                header-align="center"
                v-for="(item, index) in label"
                :key="index"
                :sortable="item.sortable"
                :filters="item.label == '分组' ? filters : null"
                :filter-method="item.label == '分组' ? filterHandler : null"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <font
                        v-if="item.prop == 'status'"
                        :color="
                            scope.row[item.prop] == '待加工' ||
                            scope.row[item.prop] == '待设计' ||
                            scope.row[item.prop] == '待审核' ||
                            scope.row[item.prop] == '待创建'
                                ? '#ffa300'
                                : false ||
                                  scope.row[item.prop] == '加工中' ||
                                  scope.row[item.prop] == '设计中' ||
                                  scope.row[item.prop] == '生产中'
                                ? '#2a5389'
                                : false ||
                                  scope.row[item.prop] == '加工完成' ||
                                  scope.row[item.prop] == '设计完成' ||
                                  scope.row[item.prop] == 'BOM设计' ||
                                  scope.row[item.prop] == '任务分配' ||
                                  scope.row[item.prop] == '分配工艺'
                                ? '#18a837'
                                : false ||
                                  scope.row[item.prop] == '准备加工' ||
                                  scope.row[item.prop] == '通过' ||
                                  scope.row[item.prop] == '造型通过'
                                ? '#27c6de'
                                : false || scope.row[item.prop] == '加工暂停' || scope.row[item.prop] == '试模'
                                ? '#ff0000'
                                : false || scope.row[item.prop] == '交付'
                                ? '#18A837'
                                : false
                                ? ''
                                : '#ff0000'
                        "
                        >{{ item.status == true ? '' : scope.row[item.prop] }}</font
                    >
                    <font v-else-if="item.prop == 'isLock'" :color="scope.row[item.prop] == '设计完成' ? '#18a837' : '#F5B139'">{{
                        scope.row[item.prop]
                    }}</font>

                    <font v-else-if="item.prop == 'chuan'" :color="scope.row[item.prop] == null ? '#18a837' : '#f5b139'">{{
                        scope.row[item.prop] == null ? '已上传' : '未上传'
                    }}</font>
                    <div v-else-if="item.prop == 'programCount'" style="cursor: pointer" @click="daima(scope.row)">
                        {{ scope.row[item.prop] }}
                    </div>

                    <el-checkbox
                        v-else-if="item.prop == 'isBackup' && scope.row.id"
                        v-model="scope.row[item.prop]"
                        :disabled="Sxian"
                        @change="beiyong(scope.row)"
                    ></el-checkbox>

                    <div v-else-if="item.prop == 'img'" class="demo-image__preview" flex="main:left cross:center" style="padding: 0 14%">
                        <div style="width: 50px; height: 40px; margin-right: 24%" v-show="scope.row.pic1">
                            <el-image
                                fit="scale-down"
                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                :src="
                                    scope.row.pic1
                                        ? `${urls}Files/ProgramPic/${scope.row.pic1}`
                                        : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                                "
                                @click="bigImg(scope.row.pic1)"
                            >
                            </el-image>
                        </div>

                        <div style="width: 50px; height: 40px; margin-right: 24%" v-show="scope.row.pic2">
                            <el-image
                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                :src="
                                    scope.row.pic2
                                        ? `${urls}Files/ProgramPic/${scope.row.pic2}`
                                        : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                                "
                                fit="scale-down"
                                @click="bigImg(scope.row.pic2)"
                            >
                            </el-image>
                        </div>

                        <div style="width: 50px; height: 40px" v-show="scope.row.pic3">
                            <el-image
                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                :src="
                                    scope.row.pic3
                                        ? `${urls}Files/ProgramPic/${scope.row.pic3}`
                                        : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                                "
                                fit="scale-down"
                                @click="bigImg(scope.row.pic3)"
                            >
                            </el-image>
                        </div>
                    </div>

                    <div v-else-if="item.prop == 'picURL'" class="demo-image__preview" flex="main:left cross:center" style="padding: 0 14%">
                        <div v-show="scope.row.picURL">
                            <el-image
                                fit="scale-down"
                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                :src="
                                    scope.row.picURL
                                        ? `${urls}Files/ProgramPic/${scope.row.picURL}`
                                        : require('../../../common/comImg/index/组 17 拷贝@2x.png')
                                "
                                @click="bigImg(scope.row.picURL)"
                            >
                            </el-image>
                        </div>
                    </div>

                    <div v-else-if="item.prop == 'LWH'">长:{{ scope.row.L }}-宽:{{ scope.row.W }}-高:{{ scope.row.H }}</div>

                    <div v-else-if="item.prop == 'groupName'">{{ scope.row[item.prop] ? scope.row[item.prop] : '-' }}</div>

                    <span v-else :style="item.down ? 'cursor: pointer;' : ''">
                        {{ item.status == true ? '' : scope.row[item.prop] }}
                    </span>

                    <span v-if="item.shijian && (scope.row[item.prop] == null || scope.row[item.prop] == '')">-</span>
                    <slot v-bind="{ item: item, row: scope.row, $index: scope.$index }" />
                    <span v-if="item.prop == 'index'"> {{ (Page - 1) * Size + scope.$index + 1 }}</span>
                </template>
            </el-table-column>

            <el-table-column v-if="false" type="selection" label-class-name="DisabledSelection" width="55"> </el-table-column>
        </el-table>
        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
    </div>
</template>

<script>
export default {
    props: {
        tableData: {
            default: Array
        },
        label: {
            default: Array
        },
        sortable: {
            default: Boolean
        },
        show: {
            default: Boolean
        },
        Size: {
            default: Number
        },
        Page: {
            default: Number
        },
        filters: {
            default: Array
        },
        shai: {
            type: Boolean
        },
        height: {
            default: Number
        },
        shuzu: {
            default: Array
        },
        he: {
            default: Boolean
        },
        Sxian: {
            default: Boolean
        }
    },
    data() {
        return {
            tableHeight: 0,
            highCurrent: false,
            // filtArr: [{ text: '-', value: '-' }],
            urls: '',
            imgBigTu: '',
            dialogVisible: false
        };
    },
    watch: {
        shuzu: function () {
            this.filterChange();
        }
    },

    methods: {
        cellClick(row, column, cell, event) {
            if (column.label === '附件文件') {
                this.downLoadFile(row);
            }
        },
        downLoadFile(item) {
            console.log(this.urls + 'Files/' + item.fURL);
            this.$axios
                .get(this.urls + 'Files/' + item.fURL, {
                    responseType: 'blob'
                })
                .then((res) => {
                    this.wenbenRes = res.data;

                    this.saveTXT(this.wenbenRes, item.fName);
                });
        },
        saveTXT(content, filename) {
            const blob = new Blob([content], { type: 'application/zip' });
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a');
                elink.download = filename;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        bigImg(img) {
            if (img) {
                this.imgBigTu = this.urls + 'Files/ProgramPic/' + img;
                this.dialogVisible = true;
            }
        },
        beiyong(row) {
            this.$emit('beiyong', row);
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.recordTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.recordTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val);
        },
        daima(row) {
            this.$emit('daima', row);
        },
        setkeynull(da) {
            this.highCurrent = true;
        },
        filterChange(filters) {
            // console.log((this.tableData = this.$refs.recordTable.tableData), 11111111111111111111111);
            // console.log(filters, 111111111111111);
        },
        filterHandler(value, row, column) {
            // console.log(row, value, column, 111111111111111111);
            // const property = column['text'];
            // row.push(this.shuzu);
            // this.filterChange();

            return row['groupName'] === value;
            // this.$emit('filterHandler',row[property] === value);
        }
    },
    created() {
        this.urls = localStorage.getItem('seeDaima');
    },
    mounted() {
        if (this.he) {
            this.$nextTick(() => {
                var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
                if (isMac) {
                    //your code
                    // 根据浏览器高度设置初始高度
                    this.tableHeight = window.innerHeight - 252;
                    // 监听浏览器高度变化，改变表格高度
                    window.onresize = () => {
                        this.tableHeight = window.innerHeight - 252;
                    };
                } else {
                    // 根据浏览器高度设置初始高度
                    this.tableHeight = window.innerHeight - 239;
                    // 监听浏览器高度变化，改变表格高度
                    window.onresize = () => {
                        this.tableHeight = window.innerHeight - 239;
                    };
                }
            });
        } else {
            this.$nextTick(() => {
                var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
                if (isMac) {
                    //your code
                    // 根据浏览器高度设置初始高度
                    this.tableHeight = window.innerHeight - 428;
                    // 监听浏览器高度变化，改变表格高度
                    window.onresize = () => {
                        this.tableHeight = window.innerHeight - 428;
                    };
                } else {
                    // 根据浏览器高度设置初始高度
                    this.tableHeight = window.innerHeight - 372;
                    // 监听浏览器高度变化，改变表格高度
                    window.onresize = () => {
                        this.tableHeight = window.innerHeight - 372;
                    };
                }
            });
        }
    }
    // methods: {
    //     height() {
    //         if (window.innerHeight >= 1329) {
    //             this.tableHeight = window.innerHeight * 0.75;
    //         }
    //     }
    // },
    // created() {
    //     window.onresize = () => {
    //         this.height();
    //     };
    // }
};
</script>

<style lang='scss' scoped>
::v-deep.el-table th {
    padding: 10px 0 !important;
}
::v-deep.el-table td {
    padding: 3px 0 !important;
}
::v-deep.el-table--border th {
    background: linear-gradient(0deg, #ffffff 0%, #d1def5 100%);
}
::v-deep.el-table tr:nth-child(2n) {
    background: #f5f8fd;
}
::v-deep.el-table tbody tr:hover > td {
    background-color: #bfcbe2 !important;
}
::v-deep.el-table .cell {
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #172b43;
    line-height: 16px;
    .el-table__column-filter-trigger {
        line-height: 20px;
    }
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
::v-deep.ercordCasl .el-table__body tr.current-row > td {
    background: #bfcbe2 !important;
}
::v-deep.el-table .DisabledSelection .cell .el-checkbox__inner {
    display: none;
    position: relative;
}
::v-deep.el-table .DisabledSelection .cell:before {
    content: '关联';
    position: absolute;
}
::v-deep.el-table .DisabledSelections .cell .el-checkbox__inner {
    display: none;
    position: relative;
}
::v-deep.el-table .DisabledSelections .cell:before {
    content: '备用';
    position: absolute;
}
.shuoming {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
::v-deep.el-table .caret-wrapper {
    height: 20px;
    i:first-child {
        top: -1px;
    }
    i:last-child {
        bottom: -1px;
    }
}
</style>
