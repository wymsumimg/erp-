<template>
    <div class="dialogclass">
        <el-dialog
            :title="(this.Row.bianji ? '编辑' : '添加') + '工艺流程'"
            :visible="Visible"
            min-width="1233px"
            width="1233px"
            @close="close"
        >
            <div class="zlTable">
                <table class="tableClass" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="nameLeft">模具名称：</td>
                        <td class="nameRight">{{ data.name }}</td>
                        <td class="nameLeft">模具类型：</td>
                        <td class="nameRight">{{ data.moldType_name }}</td>
                        <td class="nameLeft">料号编号：</td>
                        <td class="nameRight">{{ Row.ID }}</td>
                        <td class="nameLeft">工件名称：</td>
                        <td class="nameRight">{{ Row.BomTypeName }}</td>
                    </tr>
                    <tr>
                        <td class="nameLeft">料号名称：</td>
                        <td class="nameRight">{{ Row.MaterialName }}</td>
                        <td class="nameLeft">原料类型：</td>
                        <td class="nameRight">{{ Row.TypeName }}</td>
                        <td class="nameLeft">原料名称：</td>
                        <td class="nameRight">{{ Row.MName }}</td>
                        <td class="nameLeft">原料尺寸：</td>
                        <td class="nameRight">{{ Row.W }}*{{ Row.H }}*{{ Row.L }}</td>
                    </tr>
                </table>

                <div class="jibenziliao" style="margin-top: 12px; border: 1px solid #bfc3c6">
                    <div flex="cross:center" class="tableTop" style="margin-top: 0px; border: 0; border-bottom: 1px solid #bfc3c6">
                        <span>工艺流程</span>
                    </div>

                    <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
                        <el-form-item label="选择流程：">
                            <el-tooltip content="该流程已创建加工任务" :disabled="!Boolean(Row.IsLock)" placement="top">
                                <el-select
                                    v-model="form.licheng"
                                    placeholder="请选择流程"
                                    :disabled="Boolean(Row.IsLock)"
                                    @change="ProcessFlowDetialList"
                                >
                                    <el-option
                                        :label="item.name"
                                        :value="item.id"
                                        v-for="(item, index) in lichengData"
                                        :key="index"
                                    ></el-option>
                                </el-select>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="工艺名称：">
                            <el-select v-model="form.gongyi" placeholder="请选择工艺" @change="gychange">
                                <el-option :label="item.name" :value="item.id" v-for="(item, index) in gongyiData" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button class="dioSave btnOk" @click="addDomain" style="margin-top: 4px"> + 插入</el-button>
                    </el-form>

                    <div class="tableod" flex style="margin: 0px 22px 20px 22px">
                        <el-form
                            :inline="true"
                            ref="dynamicValidateForm"
                            class="demo-form-inline"
                            label-width="20px"
                            style="
                                position: relative;
                                width: 400px;
                                height: 322px;
                                border: 1px solid #b2b6b8;
                                margin-right: 20px;
                                overflow: auto;
                            "
                        >
                            <vuedraggable
                                v-model="list"
                                class="list-group"
                                @start="drag = true"
                                @end="drag = false"
                                v-bind="dragOptions"
                                :move="checkMove"
                            >
                                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                    <template>
                                        <div
                                            v-for="(domain, index) in list"
                                            :key="index"
                                            :style="domain.showText ? 'height: 100px' : ''"
                                            class="list-group-item"
                                            @click="onDomain(domain, index)"
                                        >
                                            <div
                                                style="
                                                    width: 93%;
                                                    height: 42px;
                                                    margin: 0 12px;
                                                    border-bottom: 1px solid #d6e1f5;
                                                    line-height: 42px;
                                                "
                                                label-width="30"
                                                flex="main:justify"
                                                :style="i == index ? 'background: #bfcbe2;' : ''"
                                            >
                                                <div
                                                    style="
                                                        font-size: 16px;
                                                        font-family: Microsoft YaHei;
                                                        font-weight: 400;
                                                        color: #222222;
                                                        margin-left: 10px;
                                                    "
                                                    v-text="index < 9 ? `0${index + 1}` : `${index + 1}`"
                                                ></div>
                                                <div
                                                    class="inpt"
                                                    style="
                                                        width: 35%;
                                                        font-size: 14px;
                                                        font-family: Microsoft YaHei;
                                                        font-weight: 400;
                                                        color: #333333;
                                                        text-align: center;
                                                    "
                                                >
                                                    {{ domain.Name }}
                                                </div>
                                                <div style="width: 25%">可跳过 <el-switch v-model="domain.Skippable"></el-switch></div>
                                                <el-tooltip v-if="Boolean(domain.IsLock)" content="该工艺已创建加工任务" placement="top">
                                                    <i
                                                        class="el-icon-close"
                                                        style="margin-right: 10px; line-height: 42px; font-size: 18px"
                                                    ></i>
                                                </el-tooltip>
                                                <i
                                                    v-else
                                                    class="el-icon-close"
                                                    style="margin-right: 10px; line-height: 42px; font-size: 18px"
                                                    @click.stop="delet(domain, index)"
                                                ></i>
                                            </div>
                                        </div>
                                    </template>
                                </transition-group>
                            </vuedraggable>
                        </el-form>

                        <div style="width: 700px; height: 322px; background: #f6f9fd" flex>
                            <el-form ref="form" label-width="80px" style="margin: 20px">
                                <el-form-item label="加工基准：">
                                    <el-autocomplete
                                        style="width: 210px"
                                        v-model="domain.Remark2"
                                        :fetch-suggestions="querySearchAsync"
                                        placeholder="输入100字内"
                                        @select="handleSelect"
                                        :maxlength="100"
                                        type="textarea"
                                        :rows="2"
                                    ></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="准备步骤：">
                                    <el-autocomplete
                                        style="width: 210px"
                                        v-model="domain.Remark3"
                                        :fetch-suggestions="querySearchAsync1"
                                        placeholder="输入100字内"
                                        @select="handleSelect"
                                        :maxlength="100"
                                        type="textarea"
                                        :rows="2"
                                    ></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="加工说明：">
                                    <el-input
                                        style="width: 210px"
                                        v-model="domain.Remark"
                                        placeholder="输入100字内"
                                        type="textarea"
                                        resize="none"
                                        maxlength="100"
                                        :rows="2"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="预估时间：">
                                    <el-input
                                        style="width: 210px"
                                        v-model="domain.time"
                                        placeholder="输入时间(m)"
                                        type="textarea"
                                        resize="none"
                                        maxlength="100"
                                        :rows="2"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="width: 50%; height: 281px; border-left: 1px solid #d6e1f5; margin: 20px">
                                <div flex="cross:center" style="margin-bottom: 25px; padding: 0 10px">
                                    <div class="chooseFile" flex="cross:center">
                                        <div>选择文件：</div>
                                        <div class="chooseF">
                                            <el-input v-model="domain.fName" readonly placeholder="请选择文件"></el-input>
                                        </div>
                                    </div>
                                    <div class="inputBox">
                                        <input type="file" id="file" style="display: none" ref="files" multiple @change="upload" />
                                    </div>
                                    <el-button class="dioSave btnCancel" @click="goFile(index)">选择</el-button>
                                </div>
                                <div class="upImgCalss" style="margin: 50px 0 0 100px">
                                    <div class="img">
                                        <el-upload
                                            :action="`${url}api/File/UpLoadProgramPic`"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :class="{ hide: domain.picURL }"
                                            :on-change="handleChange"
                                            :on-success="handleSuccess"
                                            :file-list="fileList"
                                            :before-upload="beforeAvatarUpload"
                                        >
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                    </div>
                                    <div style="width: 146px; text-align: center">工艺简图</div>
                                </div>
                            </div>
                        </div>

                        <!-- <el-table
                            v-if="Visible"
                            ref="dragTable"
                            :data="list"
                            row-key="craft_id"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                            :header-cell-class-name="headerStyle"
                            max-height="400"
                        >
                            <el-table-column align="center" label="序号" width="65">
                                <template slot-scope="scope">
                                    <span>{{ scope.$index + 1 }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="名称">
                                <template slot-scope="{ row }">
                                    <span>{{ row.Name }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="加工基准">
                                <template slot-scope="{ row }">
                                    <el-autocomplete
                                        v-model="row.Remark2"
                                        :fetch-suggestions="querySearchAsync"
                                        placeholder="请输入内容"
                                        @select="handleSelect"
                                        :maxlength="100"
                                        type="textarea"
                                        :rows="2"
                                    ></el-autocomplete>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="准备步骤">
                                <template slot-scope="{ row }">
                                    <el-autocomplete
                                        v-model="row.Remark3"
                                        :fetch-suggestions="querySearchAsync1"
                                        placeholder="请输入内容"
                                        @select="handleSelect"
                                        :maxlength="100"
                                        type="textarea"
                                        :rows="2"
                                    ></el-autocomplete>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="加工说明">
                                <template slot-scope="{ row }">
                                    <el-input
                                        v-model="row.Remark"
                                        placeholder="输入100字内"
                                        type="textarea"
                                        resize="none"
                                        maxlength="100"
                                        :rows="2"
                                    ></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="预估时间(m)">
                                <template slot-scope="{ row }">
                                    <el-input
                                        v-model="row.time"
                                        placeholder="输入时间"
                                        type="textarea"
                                        resize="none"
                                        maxlength="100"
                                        :rows="2"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                    ></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="工程文件">
                                <template slot-scope="{ row, $index }">
                                    <span v-if="row.fName" style="cursor: pointer" @click="goFile($index)">{{ row.fName }}</span>
                                    <el-button v-else class="dioSave btnCancel" @click="goFile($index)">选择</el-button>

                                    <input type="file" id="file" style="display: none" ref="files" multiple @change="upload" />
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="工艺简图" width="105px">
                                <template slot-scope="{ row, $index }">
                                    <div class="upImgCalss">
                                        <el-upload
                                            :action="`${url}api/File/UpLoadProgramPic`"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            style="display: flex"
                                            :on-change="handleChange"
                                            :on-success="handleSuccess"
                                            :file-list="row.picURL ? [{ url: urls + 'Files/ProgramPic/' + row.picURL }] : []"
                                            :before-upload="beforeAvatarUpload"
                                        >
                                            <i class="el-icon-plus"></i>
                                            <span
                                                style="display: block; width: 57%; height: 100%; position: absolute; top: 0"
                                                @click="onIndex($index)"
                                            ></span>
                                        </el-upload>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="是否允许跳过">
                                <template slot-scope="{ row }">
                                    <el-switch
                                        v-model="row.Skippable"
                                        :active-value="true"
                                        :inactive-value="false"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                    >
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template slot-scope="{ row, $index }">
                                    <el-tooltip v-if="Boolean(row.IsLock)" content="该工艺已创建加工任务" placement="top">
                                        <el-button style="color: #999999" type="text" size="small">删除</el-button>
                                    </el-tooltip>
                                    <el-button v-else style="color: #e6331d" type="text" size="small" @click="delet(row, $index)"
                                        >删除</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table> -->

                        <!-- <el-form
                            :inline="true"
                            :model="dynamicValidateForm"
                            ref="dynamicValidateForm"
                            class="demo-form-inline"
                            label-width="20px"
                        >
                            <vuedraggable
                                v-model="dynamicValidateForm.domains"
                                class="list-group"
                                @start="drag = true"
                                @end="drag = false"
                                v-bind="dragOptions"
                                :move="checkMove"
                            >
                                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                    <template>
                                        <div
                                            v-for="(domain, index) in dynamicValidateForm.domains"
                                            :key="index"
                                            :style="domain.showText ? 'height: 100px' : ''"
                                            class="list-group-item"
                                        >
                                            <el-tooltip content="该工艺已创建加工任务" :disabled="!Boolean(domain.IsLock)" placement="top">
                                                <el-form-item
                                                    :label="index < 9 ? `0${index + 1}-` : `${index + 1}-`"
                                                    style="width: 559px; margin: 12px"
                                                    label-width="30"
                                                    flex
                                                >
                                                    <el-input v-model="domain.name" disabled class="inpt"></el-input>
                                                    <el-button
                                                        size="mini"
                                                        style="position: absolute; margin-left: -81px; margin-top: 6px"
                                                        @click="showText(index)"
                                                    >
                                                        添加说明</el-button
                                                    >
                                                    <el-input
                                                        v-if="domain.showText"
                                                        v-model="domain.text"
                                                        placeholder="输入内容在35字内"
                                                        type="textarea"
                                                        resize="none"
                                                        maxlength="35"
                                                        :rows="2"
                                                        style="position: absolute; margin-left: -310px; margin-top: 40px; width: 310px"
                                                    ></el-input>
                                                    <i
                                                        style="position: absolute; margin-top: 6px"
                                                        class="el-icon-remove-outline"
                                                        @click.prevent="removeDomain(domain)"
                                                    ></i>

                                                    <span style="position: absolute; margin-left: 60px; width: 140px"
                                                        >是否允许跳过<el-switch v-model="domain.delivery"></el-switch
                                                    ></span>
                                                </el-form-item>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                </transition-group>
                            </vuedraggable>
                        </el-form> -->
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="dioSave" @click="Save">提交</el-button>
                <!-- <el-button class="dioSave btnCancel">清空</el-button> -->
            </span>
        </el-dialog>
        <el-dialog title="插入原因" :visible="Visibles" width="500px" @close="closes">
            <div>
                <el-form :inline="true" :model="forms" class="demo-form-inline" label-width="120px">
                    <el-form-item label="原因：" placeholder="请输入插入原因">
                        <el-input type="textarea" v-model="forms.desc" style="width: 300px"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="dioSave" @click="Saves">确定</el-button>
            </span>
        </el-dialog>

        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable';
import { AddBomCraftDetial, ProcessFlowList, CraftList, ModifyBomCraftDetial } from '@/api/api';
import { ProcessFlowDetialList } from '@/api/base';
import Sortable from 'sortablejs';
export default {
    components: { vuedraggable },
    props: {
        Visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        Row: {
            type: Object,
            default: {}
        }
        // bom_craft_id: {
        //     type: Number,
        //     default: 0
        // }
    },
    data() {
        return {
            form: {
                licheng: '',
                gongyi: ''
            },
            dynamicValidateForm: {
                domains: [],
                domain: []
            },
            Visibles: false,
            forms: {
                desc: ''
            },
            lichengData: [],
            gongyiData: [],
            gongyiName: '',
            shan: [],
            drag: false,
            sortable: null,
            list: [],
            show: false,
            fileList: [],
            dialogVisible: false,
            url: '',
            urls: '',
            domain: {},
            i: 0
        };
    },
    watch: {
        Visible: function (val) {
            if (val) {
                this.i = 0;
                this.ProcessFlowList();
                this.CraftList();
                // this.$nextTick(() => {
                //     this.setSort();
                // });
                this.restaurants = this.loadAll();
                this.restaurants1 = this.loadAll1();

                this.list = [];
                if (this.Row.Craft != null) {
                    this.huixie();
                }
            }
        }
    },
    created() {
        this.ProcessFlowList();
    },
    mounted() {
        this.url = localStorage.getItem('upDaima');
        this.urls = localStorage.getItem('seeDaima');
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            };
        }
    },
    methods: {
        onDomain(domain, index) {
            this.domain = domain;
            this.index = index;
            this.i = index;
            this.fileList = this.list[index].picURL ? [{ url: this.urls + 'Files/ProgramPic/' + this.list[index].picURL }] : [];
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        handlePictureCardPreview(file) {
            this.imgBigTu = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            this.list[this.i].picURL = '';
        },
        handleChange(file, fileList) {
            // console.log(index);
            // this.list[index].picURL = true;
        },
        handleSuccess(file, fileList) {
            this.list[this.i].picURL = file.Name;
            this.list[this.i].picName = file.FName;
        },
        onIndex(index) {
            this.index = index;
        },
        beforeAvatarUpload(file) {
            const isJPEG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpg';
            const bmp = file.type === 'image/bmp';
            if (!isJPEG && !isPNG && !isJPG && !bmp) {
                this.$message.error('上传图片只能是 JPG 、PNG 、JPEG、bmp格式!');
            }
            return isJPEG || isPNG || isJPG || bmp;
        },
        delet(row, index) {
            this.list.splice(index, 1);
            this.removeDomain(row);
        },
        goFile(index) {
            this.index = index;
            this.show = true;
            this.$nextTick(() => {
                this.$refs.files.click();
            });
        },
        upload(e) {
            let files = e.target.files || e.dataTransfer.files;
            // 通过FormData将文件转成二进制数据
            let formData = new FormData();
            // 将文件转二进制
            formData.append('upload', files[0]);

            this.$axios.post(this.url + 'api/File/UpLoadFile', formData).then((res) => {
                // for (let index = 0; index < this.list.length; index++) {
                //    if (this.index===index) {
                //        this.list=[...this.list,]
                //    }

                // }
                // this.list[this.index].fURL = res.data[0].Name;
                // this.list[this.index].fName = res.data[0].FName;
                this.$set(this.list[this.index], 'fURL', res.data[0].Name);
                this.$set(this.list[this.index], 'fName', res.data[0].FName);
                this.$refs.files.value = null;
            });
        },
        loadAll() {
            return [
                { value: '四面分中' },
                { value: '导柱/导套孔' },
                { value: '基准孔' },
                { value: '基准角' },
                { value: '精定位' },
                { value: '具体在图示上指示' }
            ];
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 0);
        },
        loadAll1() {
            return [
                { value: '胚料' },
                { value: '工艺孔划线钻孔攻牙' },
                { value: 'NC铣斜孔平台' },
                { value: '组装加工' },
                { value: '粗加工切边' },
                { value: '锯料' },
                { value: 'NC铣过渡基准' },
                { value: '精飞/磨床' },
                { value: '调质开粗' },
                { value: '真空淬火' },
                { value: 'NC工艺垫脚' },
                { value: '品检' }
            ];
        },
        querySearchAsync1(queryString, cb) {
            var restaurants = this.restaurants1;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 0);
        },
        createStateFilter(queryString) {
            return (state) => {
                return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        setSort() {
            const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                setData: function (dataTransfer) {
                    // to avoid Firefox bug
                    // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                    dataTransfer.setData('Text', '');
                },
                onEnd: (evt) => {
                    const targetRow = this.list.splice(evt.oldIndex, 1)[0];
                    this.list.splice(evt.newIndex, 0, targetRow);
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
            return 'tableStyle';
        },
        checkMove: function (evt) {
            this.index = evt.draggedContext.futureIndex;
            this.i = evt.draggedContext.futureIndex;
            return console.log(evt.draggedContext);
        },
        huixie() {
            // this.$nextTick(() => {
            for (var i = 0; i < this.lichengData.length; i++) {
                if (this.lichengData[i].id == this.Row.ProcessFlowId) {
                    this.form.licheng = this.lichengData[i].name;
                    this.ProcessFlow_id = this.lichengData[i].id;
                }
            }

            this.list = JSON.parse(JSON.stringify(this.Row.Craft));
            this.domain = this.list[this.i];
            this.fileList = this.list[this.i].picURL ? [{ url: this.urls + 'Files/ProgramPic/' + this.list[this.i].picURL }] : [];
            // });
            for (var i = 0; i < this.Row.Craft.length; i++) {
                let obj = {
                    name: this.Row.Craft[i].Name,
                    value: this.Row.Craft[i].Craft_ID,
                    ID: this.Row.Craft[i].ID,
                    delivery: this.Row.Craft[i].Skippable,
                    IsLock: this.Row.Craft[i].IsLock,
                    text: this.Row.Craft[i].Remark,
                    craft_id: this.Row.Craft[i].Craft_ID,
                    showText: this.Row.Craft[i].Remark != '' || false
                };
                // this.dynamicValidateForm.domain.push(obj);
                this.dynamicValidateForm.domains.push(obj);
            }
        },
        ProcessFlowDetialList() {
            this.ProcessFlow_id = this.form.licheng;
            let params = {
                CP_ID: Number(localStorage.getItem('comp_id')),
                baseID: this.ProcessFlow_id
            };
            ProcessFlowDetialList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    Data.map((item) => {
                        item.delivery = true;
                    });
                    this.dynamicValidateForm.domains = Data;
                    console.log(Data);
                    let dataNew = []; //新数组
                    Data.map((item) => {
                        let obj = {
                            Skippable: true,
                            Name: item.name,
                            Craft_ID: item.craft_id
                        };
                        dataNew.push(obj);
                    });
                    this.list = dataNew;
                }
            });
        },
        gychange() {
            for (let i = 0; i < this.gongyiData.length; i++) {
                if (this.gongyiData[i].id == this.form.gongyi) {
                    this.gongyiName = this.gongyiData[i].name;
                }
            }
        },
        //工艺列表
        CraftList() {
            let params = {
                CP_ID: Number(localStorage.getItem('comp_id'))
            };
            CraftList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    this.gongyiData = Data;
                }
            });
        },
        //工艺流程列表
        ProcessFlowList() {
            let params = {
                CP_ID: Number(localStorage.getItem('comp_id'))
            };
            ProcessFlowList(params).then((res) => {
                let { Data, ReturnCode, PageCount } = res;
                if (ReturnCode == 200) {
                    // Data.map(item){
                    //     item.Skippable=true;
                    // }
                    this.lichengData = Data;
                }
            });
        },
        //为料号创建工艺
        AddBomCraftDetial() {
            if (this.Row.bianji) {
                //编辑
                if (!this.Row.IsLock) {
                    let params = [];
                    let Obj = {
                        ProcessFlow_id: this.ProcessFlow_id,
                        CP_ID: Number(localStorage.getItem('comp_id')),
                        User_id: Number(localStorage.getItem('user_id'))
                    };
                    for (let i = 0; i < this.list.length; i++) {
                        let obj = {
                            cp_id: Number(localStorage.getItem('comp_id')),
                            bom_id: Number(this.data.bom_id),
                            craft_id: this.list[i].Craft_ID,
                            m_index: i + 1,
                            bom_material_id: this.Row.ID,
                            bom_craft_id: JSON.parse(this.$Base64.decode(this.$route.query.info)).id,
                            remark: this.list[i].Remark || '',
                            user_id: Number(localStorage.getItem('user_id')),
                            skippable: this.list[i].Skippable,
                            picName: this.list[i].picName || '',
                            picURL: this.list[i].picURL || '',
                            quality: 0,
                            time: this.list[i].time || 0,
                            fName: this.list[i].fName || '',
                            fURL: this.list[i].fURL || '',
                            remark2: this.list[i].Remark2 || '',
                            remark3: this.list[i].Remark3 || ''
                        };
                        params.push(obj);

                        Obj.Bom_craftDetial = params;
                    }

                    if (Obj.Bom_craftDetial == undefined) {
                        return this.$message.warning('请先添加工艺！');
                    }
                    // for (let index = 0; index < Obj.Bom_craftDetial.length; index++) {
                    //     if (
                    //         Obj.Bom_craftDetial[index].craft_id ==
                    //         (index + 1 >= Obj.Bom_craftDetial.length ? '' : Obj.Bom_craftDetial[index + 1].craft_id)
                    //     ) {
                    //         this.$message.warning('相邻的两段工艺不能相同！');
                    //         return;
                    //     }
                    // }
                    AddBomCraftDetial(Obj).then((res) => {
                        let { Data, ReturnCode, ErrorMessage } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.$emit('update:visible', false);
                            this.$parent.BomCraftDetialList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error(ErrorMessage);
                        }
                    });
                } else {
                    let params = [];
                    for (let i = 0; i < this.list.length; i++) {
                        let obj = {
                            id: this.list[i].ID == 0 ? 0 : this.list[i].ID,
                            cp_id: Number(localStorage.getItem('comp_id')),
                            bom_id: Number(this.data.bom_id),
                            craft_id: this.list[i].Craft_ID,
                            m_index: i + 1,
                            bom_material_id: this.Row.ID,
                            bom_craft_id: Number(JSON.parse(this.$Base64.decode(this.$route.query.info)).id),
                            remark: this.list[i].Remark || '',
                            user_id: Number(localStorage.getItem('user_id')),
                            skippable: this.list[i].Skippable,
                            picName: this.list[i].picName || '',
                            picURL: this.list[i].picURL || '',
                            quality: 0,
                            time: this.list[i].time || 0,
                            fName: this.list[i].fName || '',
                            fURL: this.list[i].fURL || '',
                            remark2: this.list[i].Remark2 || '',
                            remark3: this.list[i].Remark3 || ''
                        };
                        params.push(obj);
                    }
                    // for (let index = 0; index < params.length; index++) {
                    //     if (params[index].craft_id == (index + 1 >= params.length ? '' : params[index + 1].craft_id)) {
                    //         this.$message.warning('相邻的两段工艺不能相同！');
                    //         return;
                    //     }
                    // }
                    for (let i = 0; i < this.shan.length; i++) {
                        let obj = {
                            id: this.shan[i].ID,
                            cp_id: Number(localStorage.getItem('comp_id')),
                            bom_id: Number(this.data.bom_id),
                            craft_id: -100,
                            m_index: 0,
                            bom_material_id: this.Row.ID,
                            bom_craft_id: Number(JSON.parse(this.$Base64.decode(this.$route.query.info)).id),
                            remark: this.shan[i].Remark || '',
                            user_id: Number(localStorage.getItem('user_id')),
                            skippable: this.shan[i].Skippable,
                            picName: this.list[i].picName || '',
                            picURL: this.list[i].picURL || '',
                            quality: 0,
                            time: this.list[i].time || 0,
                            fName: this.list[i].fName || '',
                            fURL: this.list[i].fURL || '',
                            remark2: this.list[i].Remark2 || '',
                            remark3: this.list[i].Remark3 || ''
                        };
                        params.push(obj);
                    }
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].id == 0 && params[i].craft_id == -100) {
                            params.splice(i, 1);
                        }
                    }
                    ModifyBomCraftDetial(params).then((res) => {
                        let { Data, ReturnCode, ErrorMessage } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.$emit('update:visible', false);
                            this.$parent.BomCraftDetialList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error(ErrorMessage);
                        }
                    });
                }
            } else {
                //添加
                let params = [];
                let Obj = {
                    ProcessFlow_id: this.ProcessFlow_id,
                    CP_ID: Number(localStorage.getItem('comp_id')),
                    User_id: Number(localStorage.getItem('user_id'))
                };
                for (let i = 0; i < this.list.length; i++) {
                    let obj = {
                        cp_id: Number(localStorage.getItem('comp_id')),
                        bom_id: Number(this.data.bom_id),
                        craft_id: this.list[i].Craft_ID,
                        m_index: i + 1,
                        bom_material_id: this.Row.ID,
                        bom_craft_id: JSON.parse(this.$Base64.decode(this.$route.query.info)).id || 0,
                        remark: this.list[i].Remark || '',
                        user_id: Number(localStorage.getItem('user_id')),
                        skippable: this.list[i].Skippable,
                        picName: this.list[i].picName || '',
                        picURL: this.list[i].picURL || '',
                        quality: 0,
                        time: this.list[i].time || 0,
                        fName: this.list[i].fName || '',
                        fURL: this.list[i].fURL || '',
                        remark2: this.list[i].Remark2 || '',
                        remark3: this.list[i].Remark3 || ''
                    };
                    params.push(obj);

                    Obj.Bom_craftDetial = params;
                }
                if (Obj.Bom_craftDetial == undefined) {
                    return this.$message.warning('请先添加工艺！');
                }
                // for (let index = 0; index < Obj.Bom_craftDetial.length; index++) {
                //     if (
                //         Obj.Bom_craftDetial[index].craft_id ==
                //         (index + 1 >= Obj.Bom_craftDetial.length ? '' : Obj.Bom_craftDetial[index + 1].craft_id)
                //     ) {
                //         this.$message.warning('相邻的两段工艺不能相同！');
                //         return;
                //     }
                // }
                AddBomCraftDetial(Obj).then((res) => {
                    let { Data, ReturnCode, ErrorMessage } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.$router.push({
                            query: {
                                info: this.$Base64.encode(
                                    JSON.stringify({
                                        ...this.data,
                                        id: Data
                                    })
                                )
                            }
                        });
                        this.$emit('update:visible', false);
                        this.$parent.BomCraftDetialList();
                    }
                    if (ReturnCode == 203) {
                        this.$message.error(ErrorMessage);
                    }
                });
            }
        },
        Saves() {
            this.closes();
        },
        closes() {
            this.Visibles = false;
            this.forms.desc = '';
        },
        showText(i) {
            this.dynamicValidateForm.domains[i].showText = !this.dynamicValidateForm.domains[i].showText;
            this.dynamicValidateForm = { ...this.dynamicValidateForm };
        },
        Save() {
            this.AddBomCraftDetial();
        },
        removeDomain(item) {
            if (item.IsLock) {
                this.$message({
                    message: '加工任务已确定，不可删除！',
                    type: 'warning'
                });
                return;
            }
            this.shan.push(item);
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            // if (this.data.k) {
            //     this.$confirm('确定要插入工艺嘛？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     })
            //         .then(() => {
            //             this.Visibles = true;
            //         })
            //         .catch(() => {
            //             this.$message({
            //                 type: 'info',
            //                 message: '已取消插入'
            //             });
            //         });
            //     return;
            // }
            if (this.form.licheng == '') {
                this.$message.warning('请选择工艺流程！');
                return;
            }
            if (this.gongyiName == '') {
                this.$message.warning('请选择工艺！');
                return;
            }

            var end = this.dynamicValidateForm.domains.slice(-1);
            // if (end[0].name == this.gongyiName) {
            //     this.$message.warning('相邻的两段工艺不能相同！');
            //     return;
            // } else
            if (this.Row.IsLock) {
                this.dynamicValidateForm.domains.push({
                    name: this.gongyiName,
                    value: this.form.gongyi,
                    craft_id: this.form.gongyi,
                    delivery: true,
                    text: '',
                    showText: false,
                    ID: 0
                });
                this.list.push({
                    Name: this.gongyiName,
                    Craft_ID: this.form.gongyi,
                    Skippable: true,
                    Remark: '',
                    ID: 0
                });
            } else {
                this.dynamicValidateForm.domains.push({
                    name: this.gongyiName,
                    value: this.form.gongyi,
                    craft_id: this.form.gongyi,
                    delivery: true,
                    text: '',
                    showText: false
                });
                this.list.push({
                    Name: this.gongyiName,
                    Craft_ID: this.form.gongyi,
                    Skippable: true,
                    Remark: ''
                });
            }
        },
        close() {
            this.$emit('update:visible', false);
            this.dynamicValidateForm.domains = [];
            this.form = {
                licheng: '',
                gongyi: ''
            };
            this.form.licheng = '';
            this.shan = [];
            this.gongyiName = '';
        }
    }
};
</script>

<style scoped lang='scss'>
.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: linear-gradient(0deg, #2a5389 0%, #a2c2ec 100%);
}

.list-group {
    min-height: 0px;
    max-height: 450px;
    // overflow: auto;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
::v-deep.list-group-item .el-input.is-disabled .el-input__inner {
    border-color: #606266 !important;
    color: #606266 !important;
}
// ::v-deep .tableod {
//     .el-upload--picture-card {
//         width: 72px;
//         height: 72px;
//         line-height: 80px;
//     }
//     .el-upload-list--picture-card .el-upload-list__item {
//         width: 72px;
//         height: 72px;
//     }
// }
</style>
<style lang="scss">
.el-autocomplete-suggestion {
    width: auto !important;
}
.upImgCalss {
    .el-upload-list--picture-card .el-upload-list__item {
        transition: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        img {
            height: auto !important;
        }
    }
}
.el-textarea__inner {
    // height: 40px;
    // line-height: 2;
    resize: none;
}
.demo-form-inline .el-input__inner {
    width: 250px;
}
.chooseF .el-input__inner {
    width: 160px;
}
.img {
    width: 148px;
    height: 148px;
    margin-bottom: 8px;
    overflow: hidden;
}
.hide .el-upload--picture-card {
    display: none;
}
.el-dialog .el-dialog__body {
    overflow-y: clip;
    overflow-x: clip;
}
</style>
