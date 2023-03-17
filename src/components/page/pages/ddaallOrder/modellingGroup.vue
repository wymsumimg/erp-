<template>
    <div class="container">
        <!-- 造型组 -->

        <!-- <div class="orderTop">造型组</div> -->
        <title-name></title-name>
        <div class="orderCont">
            <div class="orderSearch tableTop checkNameTop" flex="main:justify" style="margin-top: 0">
                <!-- <div style="width: 150px; text-align: left;margin-left:10px;">造型设计列表</div> -->
                <div class="checkName">
                    <ul flex="cross:center">
                        <li
                            @click="checkChange(item, index)"
                            :class="{ checkClass: active == item.id }"
                            v-for="(item, index) in titleArr"
                            :key="index"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
                <div flex class="osselect">
                    <el-select v-model="ssVal" clearable placeholder="请选择是否创建" @change="searchBtn()">
                        <el-option v-for="item in selectStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>

                    <el-input style="margin-left: 1px" v-model="compPama.QueryString" clearable placeholder="模具名称"></el-input>
                    <el-button class="orderBtn" @click="searchBtn()">搜索</el-button>
                </div>
            </div>
            <div class="orderTable mart" v-show="active == 0">
                <div class="tableod">
                    <!-- max-height="640" -->
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="订单编号" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="moldType_name" label="模具类型" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="name" label="模具名称" show-overflow-tooltip align="center" width="130"> </el-table-column>

                        <el-table-column prop="endTime" label="交付时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="testTime" label="试模时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="pic1" label="产品图片" align="center" min-width="280">
                            <slot slot-scope="scope">
                                <div class="selimgBox" flex=" cross:center">
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic1">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic1)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>

                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic2">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic2)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic3">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic3)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="fileCount" label="文件数" align="center"></el-table-column>
                        <el-table-column prop="ctTime" label="创建时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="address" label="状态" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <span>
                                    <!-- 待设计-1 0待审核  未通过1   通过2  已创建3  -->
                                    <!-- -1待创建 0待审核 1未通过 2通过 -->
                                    <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                        getStatus[scope.row.status]
                                    }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="order_remark" label="订单说明" show-overflow-tooltip align="center" min-width="150">
                        </el-table-column>
                        <el-table-column prop="user_name" label="指派人" show-overflow-tooltip align="center" min-width="150">
                        </el-table-column>

                        <el-table-column prop="address" label="操作" align="center" min-width="300">
                            <slot slot-scope="scope">
                                <div flex=" main:justify">
                                    <!-- 待设计  未通过  upImg 文件灰  -->
                                    <!-- 已通过  upFile  图片灰 -->
                                    <!-- 设计完成 全灰 -->
                                    <div>
                                        <el-tooltip v-if="!btn[11]" content="没有权限，不能操作" placement="top">
                                            <div class="caozuoStyle" style="color: #999">上传图片</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="upImgBtn(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status < 2 ? '#345AFF' : '#999' }"
                                        >
                                            上传图片
                                        </div>
                                    </div>

                                    <div>
                                        <el-tooltip v-if="!btn[12]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">上传文件</div>
                                        </el-tooltip>
                                        <div v-else @click="upFIleBtn(scope.row)" class="caozuoStyle">上传文件</div>
                                    </div>

                                    <!-- <div @click="recordBtn(scope.row)" class="caozuoStyle">上传记录</div> -->
                                    <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">修改详情</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            修改详情
                                        </div>
                                    </div>
                                    <div>
                                        <!-- 派单 删除都是（-1,0可删） 状态-1  和0  可点；   0 回写（id传真正的值）  -->
                                        <el-tooltip v-if="!btn[64]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">派单</div>
                                        </el-tooltip>
                                        <el-tooltip
                                            v-else-if="scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4"
                                            content="订单开始，不可更改"
                                            placement="top"
                                        >
                                            <div style="color: #999" class="caozuoStyle">派单</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="ProductPaiDan(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            派单
                                        </div>
                                    </div>
                                    <div>
                                        <!-- 派单 删除都是（-1,0可删） 状态-1  和0  可点；   0 回写（id传真正的值）  -->
                                        <el-tooltip v-if="!btn[64]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <el-tooltip v-else-if="scope.row.status==2||scope.row.status==3||scope.row.status==4" content="订单开始，不可删除" placement="top">
                                            <div style="color: #999" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="delPaiDan(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            删除
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="tablePage">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="compPama.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="compPama.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable mart" v-show="active == 1">
                <div class="tableod">
                    <!-- max-height="640" -->
                    <el-table
                        :data="tableData"
                        :max-height="tableHeight"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="序号" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (compPama.PageIndex - 1) * compPama.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="订单编号" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="moldType_name" label="模具类型" align="center" min-width="100"> </el-table-column>
                        <el-table-column prop="name" label="模具名称" show-overflow-tooltip align="center" width="130"> </el-table-column>

                        <el-table-column prop="taskBegin" label="预估开始时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="taskEnd" label="预估结束时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="workBegin" label="实际开始时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="worEnd" label="实际结束时间" align="center" min-width="180"> </el-table-column>
                        <el-table-column prop="pic1" label="造型图纸" align="center" min-width="280">
                            <slot slot-scope="scope">
                                <div class="selimgBox" flex=" cross:center">
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic1">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic1)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>

                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic2">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic2)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>
                                    <div style="width: 50px; height: 40px; margin-right: 32px" v-if="scope.row.pic3">
                                        <div class="imgLeft imgleftBoxTable" @click="bigImg(scope.row.pic3)">
                                            <el-image
                                                style="width: 50px; height: 40px; border: 1px solid #c0ccda; border-radius: 4px"
                                                :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                fit="contain"
                                            ></el-image>
                                        </div>
                                    </div>
                                </div>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="address" label="状态" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <span>
                                    <!-- 开始  完成 撤销 详情 -->
                                    <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                        getStatus[scope.row.status]
                                    }}</span>
                                </span>
                            </slot>
                        </el-table-column>

                        <el-table-column prop="address" label="操作" align="center" min-width="120">
                            <slot slot-scope="scope">
                                <div flex=" main:justify">
                                    <!-- <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">创建</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            创建
                                        </div>
                                    </div> -->

                                    <div>
                                        <!-- 派单 删除都是（-1,0可删） 状态-1  和0  可点；   0 回写（id传真正的值）  -->
                                        <el-tooltip v-if="!btn[64]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">{{scope.row.status>0?'编辑':'创建'}}</div>
                                        </el-tooltip>
                                        <el-tooltip
                                            v-else-if="scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4"
                                            content="订单开始，不可更改"
                                            placement="top"
                                        >
                                            <div style="color: #999" class="caozuoStyle">{{scope.row.status>0?'编辑':'创建'}}</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="ProductPaiDan(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            {{scope.row.status>0?'编辑':'创建'}}
                                        </div>
                                    </div>
                                    <div>
                                        <!-- 派单 删除都是（-1,0可删） 状态-1  和0  可点；   0 回写（id传真正的值）  -->
                                        <el-tooltip v-if="!btn[64]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <el-tooltip v-else-if="scope.row.status==2||scope.row.status==3||scope.row.status==4" content="订单开始，不可删除" placement="top">
                                            <div style="color: #999" class="caozuoStyle">删除</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="delPaiDan(scope.row)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            删除
                                        </div>
                                    </div>

                                    <!-- <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">开始</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            开始
                                        </div>
                                    </div>
                                    <div>
                                        <el-tooltip v-if="!btn[13]" content="没有权限，不能操作" placement="top">
                                            <div style="color: #999" class="caozuoStyle">详情</div>
                                        </el-tooltip>
                                        <div
                                            v-else
                                            @click="moreBtn(scope.row.id, scope.row.status)"
                                            class="caozuoStyle"
                                            :style="{ color: scope.row.status == -1 ? '#999' : '#345AFF' }"
                                        >
                                            详情
                                        </div>
                                    </div> -->
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="tablePage">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="compPama.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="compPama.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>
        <!-- 上传文件 -->
        <div class="dialogclass">
            <el-dialog
                title="上传文件"
                :visible.sync="upFileDio"
                :show-close="this.progressPercent == 0 || this.progressPercent == 100"
                width="800px"
                :close-on-click-modal="false"
            >
                <div slot="title" class="dialog-title">
                    <span class="title-text">上传模具设计源文件</span>
                    <span style="color: #345aff; margin-left: 10px">[{{ mojuName }}]</span>
                    <div class="button-right">
                        <span class="title-close"></span>
                    </div>
                </div>
                <div>
                    <div flex="cross:center" style="margin-bottom: 25px; padding: 0 10px">
                        <div class="chooseFile" flex="cross:center">
                            <div>选择文件：</div>
                            <div class="chooseF">
                                <el-input v-model="fileName" readonly placeholder="请选择文件"></el-input>

                                <div class="prose" flex v-if="loading">
                                    <div class="name">{{ this.fileName.split(',')[this.j] }}</div>
                                    <el-progress
                                        style="width: 370px"
                                        :format="format"
                                        :stroke-width="8"
                                        :percentage="progressPercent"
                                    ></el-progress>
                                </div>
                            </div>
                        </div>
                        <div class="inputBox">
                            <el-button class="dioSave btnCancel seR">选择..</el-button>
                            <input type="file" id="fileId" ref="fileId" multiple title @change="upLoadFile($event)" />
                        </div>
                        <el-button class="dioSave" @click="saveDio()">上传</el-button>
                    </div>

                    <div class="tableod">
                        <el-table
                            :data="tableFileList"
                            border
                            :row-class-name="tableRowClassName"
                            :header-cell-class-name="headerStyle"
                            style="width: 100%"
                            max-height="650"
                        >
                            <el-table-column prop="date" label="序号" width="80" align="center">
                                <slot slot-scope="scope">
                                    <span class="white">
                                        <span>{{ (fileParams.PageIndex - 1) * fileParams.PageSize + scope.$index + 1 }}</span>
                                    </span>
                                </slot>
                            </el-table-column>
                            <el-table-column prop="fileName" label="文件名" show-overflow-tooltip align="center"> </el-table-column>
                            <el-table-column prop="fileSize" label="文件大小(k)" align="center"> </el-table-column>

                            <el-table-column prop="ctTime" label="上传时间" align="center" width="180"> </el-table-column>
                            <!-- <el-table-column prop="order_name" label="上传人" align="center"> </el-table-column> -->
                            <el-table-column prop="address" label="操作" align="center">
                                <slot slot-scope="scope">
                                    <div>
                                        <div @click="delBtn(scope.row, scope.$index + 1)" class="caozuoStyle" style="color: #e6331d">
                                            删除
                                        </div>
                                    </div>
                                </slot>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="dioPage diopageright">
                        <el-pagination
                            @size-change="filehandleSizeChange"
                            @current-change="filehandleCurrentChange"
                            :current-page="fileParams.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="fileParams.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="fileTotal"
                        >
                        </el-pagination>
                    </div>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                   
                </span> -->
            </el-dialog>
        </div>
        <!-- 上传图片 -->
        <div class="dialogclass upImgCalss">
            <el-dialog title="上传图片" :visible.sync="upImgDio" width="800px" @close="closeImgDio" v-if="upImgDio">
                <div slot="title" class="dialog-title">
                    <span class="title-text">上传产品造型图</span>
                    <span style="color: #345aff; margin-left: 10px">[{{ mojuName }}]</span>
                    <div class="button-right">
                        <span class="title-close"></span>
                    </div>
                </div>
                <div style="height: 400px; padding: 100px 0; box-sizing: border-box">
                    <div flex="main:around">
                        <el-upload
                            :action="`${upDaima}api/File/UpLoadProgramPic`"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :class="{ hide: hideUpload }"
                            :on-change="handleChange"
                            :on-success="handleSuccess"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-upload
                            :action="`${upDaima}api/File/UpLoadProgramPic`"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2"
                            :class="{ hide: hideUpload2 }"
                            :on-change="handleChange2"
                            :on-success="handleSuccess2"
                            :file-list="fileList2"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-upload
                            :action="`${upDaima}api/File/UpLoadProgramPic`"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview3"
                            :on-remove="handleRemove3"
                            :class="{ hide: hideUpload3 }"
                            :on-change="handleChange3"
                            :on-success="handleSuccess3"
                            :file-list="fileList3"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
            </el-dialog>
        </div>

        <div class="dialogclass">
            <el-dialog title="修改详情" :visible.sync="moreDio" width="800px">
                <div>
                    <div class="tableod">
                        <el-table
                            :data="editDetailList"
                            border
                            :row-class-name="tableRowClassName"
                            :header-cell-class-name="headerStyle"
                            style="width: 100%"
                            max-height="650"
                        >
                            <el-table-column prop="date" label="序号" width="80" align="center">
                                <slot slot-scope="scope">
                                    <span class="white">
                                        <span>{{ (editDetailParams.PageIndex - 1) * editDetailParams.PageSize + scope.$index + 1 }}</span>
                                    </span>
                                </slot>
                            </el-table-column>

                            <el-table-column prop="amount" label="造型图片（改）" align="center" width="280">
                                <slot slot-scope="scope">
                                    <div class="selimgBox" flex=" cross:center">
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic1" @click="bigImg(scope.row.pic1)">
                                                <el-image
                                                    style="width: 50px; height: 40px; margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic2" @click="bigImg(scope.row.pic2)">
                                                <el-image
                                                    style="width: 50px; height: 40px; margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic3" @click="bigImg(scope.row.pic3)">
                                                <el-image
                                                    style="width: 50px; height: 40px; margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                    </div>
                                </slot>
                            </el-table-column>
                            <el-table-column prop="ctTime" label="上传时间" align="center" width="180"> </el-table-column>
                            <!-- <el-table-column prop="buyer_name" label="修改次数" align="center"> </el-table-column> -->
                            <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center" width="100"> </el-table-column>
                            <el-table-column prop="address" label="状态" align="center">
                                <slot slot-scope="scope">
                                    <span>
                                        <!-- 待设计-1   未通过1   通过2  已创建0 -->
                                        <span class="designColored" :style="{ color: statusColor[scope.row.status] }">{{
                                            getStatus[scope.row.status]
                                        }}</span>
                                    </span>
                                </slot>
                            </el-table-column>
                        </el-table>
                        <div class="dioPage diopageright">
                            <el-pagination
                                @size-change="edhandleSizeChange"
                                @current-change="edhandleCurrentChange"
                                :current-page="editDetailParams.PageIndex"
                                :page-sizes="[20, 50, 100]"
                                :page-size="editDetailParams.PageSize"
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="edTotal"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogclass paidanCalss">
            <el-dialog title="派单" :visible.sync="paidanDio" width="620px">
                <!-- <div slot="title" class="dialog-title">
                    <span class="title-text">上传产品造型图</span>
                    <span style="color: #345aff; margin-left: 10px">[{{ mojuName }}]</span>
                    <div class="button-right">
                        <span class="title-close"></span>
                    </div>
                </div> -->
                <div style="padding: 30px 0 0; box-sizing: border-box">
                    <div class="typeBottom" flex="main:around">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="选择人员：">
                                <el-select v-model="form.user_id" placeholder="请选择/输入"  @change="changeUser">
                                    <el-option
                                        v-for="(item, index) in userListName"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                       
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- HH:mm:ss -->
                            <el-form-item label="选择时间：" style="margin-top: 30px">
                                <el-date-picker
                                    v-model="form.date"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>

                            <div class="tijiao">
                                <el-button class="dioSave" @click="submitClick()">提交</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { UserList } from '@/api/api';
import {
    DesignList,
    AddDesign,
    DesignPicList,
    AddDesignFile,
    DesignFileList,
    DeleteDesignFile,
    AddDesignTask,
    DeleteDesignTask
} from '@/api/design';
export default {
    components: {},
    data() {
        return {
            tableData: [],
            compPama: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20
                // status: ''
            },
            total: 0,
            selectStatus: [
                {
                    id: -1,
                    name: '待分配'
                },
                {
                    id: 0,
                    name: '待设计'
                },
                {
                    id: 1,
                    name: '设计中'
                },
                {
                    id: 2,
                    name: '待审核'
                },
                {
                    id: 3,
                    name: '不通过'
                },
                {
                    id: 4,
                    name: '通过'
                },
                {
                    id: '',
                    name: '全部状态'
                }
                // {
                //     id: -1,
                //     name: '待设计订单'
                // },
                // {
                //     id: 0,
                //     name: '待审核订单'
                // },
                // {
                //     id: 1,
                //     name: '未通过订单'
                // },
                // {
                //     id: 2,
                //     name: '通过订单'
                // },
                // {
                //     id: 3,
                //     name: '设计完成订单'
                // },
                // {
                //     id: '',
                //     name: '全部订单'
                // }
            ],
            ssVal: '',
            seeDaima: '',
            upDaima: '',
            imgBigTu: '',
            dialogVisible: false,
            tableHeight: 0,
            upFileDio: false,
            moreDio: false,
            form: {},
            upImgDio: false,
            getStatus: {
                '-1': '待分配',
                0: '待设计',
                1: '设计中',
                2: '待审核',
                3: '不通过',
                4: '通过'
            },
            statusColor: {
                '-1': '#FFA300',
                0: '#FFA300',
                1: '#FF0000',
                2: '#27c6de',
                3: '#18A837',
                4: '#18A837'
            },
            dialogVisibleImg: false,
            hideUpload: false,
            hideUpload2: false,
            hideUpload3: false,
            fileList: [],
            fileList2: [],
            fileList3: [],
            fileName1: '',
            fileName2: '',
            fileName3: '',
            editDetailList: [],
            fileName: '',
            tableFileList: [],
            fileParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                user_id: localStorage.getItem('user_id')
            },
            fileTotal: 0,
            editDetailParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20
            },
            edTotal: 0,
            progressPercent: 0,
            loading: false,
            j: 0,
            mojuName: '',
            btn: {},
            titleArr: [
                { id: 0, name: '产品造型' },
                { id: 1, name: '产品三维' }
            ],
            active: 0,
            paidanDio: false,
            userListName: []
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getDesignList();
        this.seeDaima = localStorage.getItem('seeDaima');
        this.upDaima = localStorage.getItem('upDaima');
        this.$nextTick(() => {
            var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (isMac) {
                //your code
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 245;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 245;
                };
            } else {
                // 根据浏览器高度设置初始高度
                this.tableHeight = window.innerHeight - 240;
                // 监听浏览器高度变化，改变表格高度
                window.onresize = () => {
                    this.tableHeight = window.innerHeight - 240;
                };
            }
        });
        this.btn = this.rightControl();
    },
    methods: {
        changeUser(){
            this.$forceUpdate()
        },
        delPaiDan(row) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id,
                        order_id: row.order_id
                    };
                    DeleteDesignTask(params).then((res) => {
                        let { Data, ReturnCode } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getDesignList();
                        }
                        // if(ReturnCode==206){
                        //     this.$message.warning(res.ErrorMessage)
                        // }
                    });
                })
                .catch(() => {});
        },
        submitClick() {
            console.log(this.form.date);
            // return
            if (this.form.user_id == '') {
                this.$message.warning('请选择人员');
                return;
            }
            let params = {
                id: this.statuspd == -1 ? 0 : this.idpd,
                cp_id: localStorage.getItem('comp_id'),
                order_id: this.order_idpd,
                type: this.active,
                user_id: this.btn[64] ? '' : this.form.user_id,
                begintime: this.form.date[0],
                endtime: this.form.date[1]
            };
            AddDesignTask(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.$message.success('提交成功');
                    this.paidanDio = false;
                    this.getDesignList();
                }
            });
        },
        ProductPaiDan(row) {
            this.form = {};
            // -1,0
            if(row.status==0){
                this.form.user_id=row.user_id
                this.form.date=[row.testTime,row.endTime]
            }

            
            this.order_idpd = row.order_id;
            this.statuspd = row.status;
            this.idpd = row.id;
            console.log(row, '0000000000000000000---row========');
            this.getUserList();
            this.paidanDio = true;
        },
        getUserList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            UserList(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.userListName = Data;
                }
            });
        },
        checkChange(item, index) {
            console.log(item, index);
            this.active = item.id;
            this.getDesignList();
        },
        format(percentage) {
            return percentage === 100 ? '保存中...' : `${percentage}%`;
        },
        handleRemove(file, fileList) {
            console.log(file);
            this.fileName1 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
            this.hideUpload = fileList.length >= 1;
        },
        handleRemove2(file, fileList) {
            console.log(file);
            this.fileName2 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
            this.hideUpload2 = fileList.length >= 1;
        },
        handleRemove3(file, fileList) {
            console.log(file);
            this.fileName3 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
            this.hideUpload3 = fileList.length >= 1;
        },
        handlePictureCardPreview(file) {
            this.imgBigTu = file.url;
            this.dialogVisible = true;
        },
        handlePictureCardPreview2(file) {
            this.imgBigTu = file.url;
            this.dialogVisible = true;
        },
        handlePictureCardPreview3(file) {
            this.imgBigTu = file.url;
            this.dialogVisible = true;
        },

        dioClose(val) {
            this.dialogVisible = val;
        },
        handleChange(file, fileList) {
            this.hideUpload = fileList.length >= 1;
        },
        handleChange2(file, fileList) {
            this.hideUpload2 = fileList.length >= 1;
        },
        handleChange3(file, fileList) {
            this.hideUpload3 = fileList.length >= 1;
        },
        handleSuccess(file, fileList) {
            this.fileName1 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
        },
        handleSuccess2(file, fileList) {
            this.fileName2 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
        },
        handleSuccess3(file, fileList) {
            this.fileName3 = file.Name;
            this.getPic(this.fileName1, this.fileName2, this.fileName3);
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
        getPic(Name, Name2, Name3) {
            let params = {
                id: this.baseId ? this.baseId : 0,
                cp_id: localStorage.getItem('comp_id'),
                order_id: this.order_id,
                pic1: Name,
                pic2: Name2,
                pic3: Name3,
                status: 0,
                user_id: localStorage.getItem('user_id')
            };
            AddDesign(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    // 重新赋值
                    this.baseId = Data;
                }
            });
        },
        closeImgDio() {
            this.getDesignList();
            // this.fileList=[]
            // this.fileList2=[]
            // this.fileList3=[]
        },

        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        handleSizeChange(val) {
            this.compPama.PageSize = val;
            this.getDesignList();
        },
        handleCurrentChange(val) {
            this.compPama.PageIndex = val;
            this.getDesignList();
        },
        edhandleSizeChange(val) {
            this.editDetailParams.PageSize = val;
            this.moreBtn(this.edID);
        },
        edhandleCurrentChange(val) {
            this.editDetailParams.PageIndex = val;
            this.moreBtn(this.edID);
        },
        filehandleSizeChange(val) {
            this.fileParams.PageSize = val;
            this.getDesignFileList(this.file_design_id);
        },
        filehandleCurrentChange(val) {
            this.fileParams.PageIndex = val;
            this.getDesignFileList(this.file_design_id);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        recordBtn() {
            this.$router.push('/modellingGroupDetails');
        },
        delBtn(row, index) {
            this.$confirm(`确定要删除文件序号“${index}”吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteDesignFile(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('删除成功');
                            this.getDesignFileList(this.file_design_id);
                            this.getDesignList();
                        }
                    });
                })
                .catch(() => {});
        },
        getDesignList() {
            this.compPama.type = this.active;
            this.compPama.status = this.ssVal;
            this.compPama.user_id = this.btn[64] ? '' : localStorage.getItem('user_id');
            DesignList(this.compPama).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data;
                    this.total = PageCount;
                }
            });
        },
        searchBtn() {
            this.getDesignList();
        },
        bigImg(img) {
            this.imgBigTu = this.seeDaima + 'Files/ProgramPic/' + img;
            console.log(img);
            this.dialogVisible = true;
        },
        upFIleBtn(row) {
            // if (row.status == 2) {
            this.mojuName = row.name;
            this.fileName = '';
            this.upFileDio = true;
            this.file_design_id = row.id;
            this.getDesignFileList(row.id);
            // }
        },
        upImgBtn(row) {
            if (row.status < 2) {
                this.upImgDio = true;
                this.mojuName = row.name;
                this.order_id = row.order_id;
                this.baseId = row.id;
                if (row.pic1) {
                    let imgUrl = this.seeDaima + 'Files/ProgramPic/' + row.pic1;
                    this.fileList[0] = {
                        url: imgUrl,
                        name: 'pic1'
                    };
                    this.hideUpload = this.fileList.length >= 1;
                } else {
                    this.fileList = [];
                    this.hideUpload = this.fileList.length >= 1;
                }

                if (row.pic2) {
                    let imgUrl = this.seeDaima + 'Files/ProgramPic/' + row.pic2;
                    this.fileList2[0] = {
                        url: imgUrl,
                        name: 'pic1'
                    };
                    this.hideUpload2 = this.fileList2.length >= 1;
                } else {
                    this.fileList2 = [];
                    this.hideUpload2 = this.fileList2.length >= 1;
                }
                if (row.pic3) {
                    let imgUrl = this.seeDaima + 'Files/ProgramPic/' + row.pic3;
                    this.fileList3[0] = {
                        url: imgUrl,
                        name: 'pic1'
                    };
                    this.hideUpload3 = this.fileList3.length >= 1;
                } else {
                    this.fileList3 = [];
                    this.hideUpload3 = this.fileList3.length >= 1;
                }
                this.fileName1 = row.pic1;
                this.fileName2 = row.pic2;
                this.fileName3 = row.pic3;
                if (this.fileName1 || this.fileName2 || this.fileName3) {
                    this.getPic(this.fileName1, this.fileName2, this.fileName3);
                }
            }
        },
        moreBtn(id, status) {
            if (status == -1) {
                return;
            } else {
                this.edID = id;
                this.moreDio = true;

                this.editDetailParams.BaseID = id;
                DesignPicList(this.editDetailParams).then((res) => {
                    let { ReturnCode, Data, PageCount } = res;
                    if (ReturnCode == 200) {
                        this.editDetailList = Data;
                        this.edTotal = PageCount;
                    }
                });
            }
        },
        goFile1() {
            this.$refs.files1.click();
        },

        upLoadFile(e) {
            var files = e.target.files;
            this.fileSize = [];
            for (let i = 0; i < files.length; i++) {
                this.fileName += files[i].name + ',';
                this.fileSize.push(files[i].size);
            }
            if (files.length >= 1) {
                this.fileName = this.fileName.substr(0, this.fileName.length - 1);
            }

            this.files = files;
        },
        upFileWen(form, index) {
            if (this.j >= this.files.length) {
                this.j = 0;
                console.log('this.j>0');
                return;
            }
            var that = this;
            this.loading = true;
            let config = {
                timeout: 0,
                onUploadProgress: function (progress) {
                    that.progressPercent = Math.round((progress.loaded * 100) / progress.total);
                }.bind(this)
            };
            this.$axios.post(this.upDaima + 'api/File/UpLoadFile', form, config).then((res) => {
                if (res.status == 200) {
                    // this.fileName = res.data[0].Name;
                    this.guidName = res.data[0].Name;
                    this.filepath = res.data[0].URL;
                    // this.$refs['fileId'].value = '';
                    this.loading = false;
                    this.progressPercent = 0;
                    this.getAddDesignFile(form, index);
                } else {
                    this.loading = false;
                    this.progressPercent = 0;
                    this.$message.error('上传失败');
                }
            });
        },
        saveDio() {
            // if (this.fileName == '') {
            //     this.$message.warning('请选择本地文件');
            //     return;
            // }
            if (this.j >= this.files.length) {
                this.j = 0;
                console.log('this.j>0');
                // 刷新列表
                this.$message.success('保存成功');
                this.getDesignFileList(this.file_design_id);
                this.fileName = '';
                this.fileSize = [];
                this.getDesignList();
                return;
            }
            // for (let i = 0; i < this.files.length; i++) {
            var form = new FormData();
            form.append('file', this.files[this.j]);
            console.log(form, 'xx');
            this.upFileWen(form, this.j);
            // }
        },
        getAddDesignFile(form, index) {
            console.log(this.fileSize, '000this.fileSize');

            let params = {
                design_id: this.file_design_id,
                fileName: this.fileName.split(',')[this.j],
                filepath: this.filepath,
                guidName: this.guidName,
                fileSize: this.fileSize[this.j],
                remark: '',
                user_id: localStorage.getItem('user_id')
            };
            AddDesignFile(params)
                .then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        // 刷新列表
                        // this.getDesignFileList(this.file_design_id);
                        // this.fileName = '';
                        // this.getDesignList();
                        this.j++;
                        this.saveDio();
                    }
                })
                .then(() => {});
        },
        getDesignFileList(id) {
            this.fileParams.BaseID = id;
            DesignFileList(this.fileParams).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.tableFileList = Data;
                    this.fileTotal = PageCount;
                }
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

<style lang='scss' scoped>
//@import url(); 引入公共css类
.inputBox {
    position: relative;
    .seR {
        margin-right: 30px;
    }
    input {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}
</style>

<style lang='scss'>
.hide .el-upload--picture-card {
    display: none;
}

.upImgCalss {
    .el-upload-list--picture-card .el-upload-list__item {
        transition: all 0s !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        img {
            height: auto !important;
        }
    }
}
</style>