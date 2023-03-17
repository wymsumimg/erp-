<template>
    <div class="container yichu">
        <!-- 订单列表 -->

        <div class="orderTop">
            <span style="cursor: pointer" @click="$router.go(-1)">BOM设计</span>
            <span class="dayu">></span><span class="nextchuang">{{ bom.status == 0 ? '创建' : '编辑' }}</span>
        </div>
        <div class="orderCont">
            <div class="jibenziliao">
                <div flex="cross:center" class="tableTop" style="margin-top: 0; border-top: 1px solid #bfc3c6">
                    <div
                        @click="baseShow = !baseShow"
                        :style="{ transform: baseShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                        class="shousuoIconBox"
                        flex="cross:center main:center"
                    >
                        <i class="el-icon-d-arrow-right shousuoIcon"></i>
                    </div>
                    <span>基本资料</span>
                </div>

                <div class="zlTable" v-show="baseShow">
                    <table class="tableClass" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="nameLeft">订单号：</td>
                            <td class="nameRight">{{ bom.order_code }}</td>
                            <td class="nameLeft">模具名称：</td>
                            <td class="nameRight">
                                {{ bom.name }}
                            </td>
                            <td class="nameLeft">模具类型：</td>
                            <td class="nameRight">{{ bom.moldType_name }}</td>
                            <td class="nameLeft">客户名称：</td>
                            <td class="nameRight">{{ bom.buyer_name }}</td>
                        </tr>
                        <tr>
                            <td class="nameLeft">试模时间：</td>
                            <td class="nameRight">{{ bom.testTime }}</td>
                            <td class="nameLeft">交付时间：</td>
                            <td class="nameRight">{{ bom.endTime }}</td>
                            <td class="nameLeft">创建时间：</td>
                            <td class="nameRight">{{ bom.ctTime }}</td>

                            <td class="nameLeft">订单说明：</td>
                            <td class="nameRight">{{ bom.remark }}</td>
                        </tr>
                    </table>

                    <div class="selftb" flex>
                        <div class="selftb_l" flex>
                            <div class="selftb_img">造型图片：</div>
                            <div class="selimgBox" flex="main:around cross:center">
                                <div style="width: 160px; height: 112px">
                                    <div class="imgLeft imgleftBox" v-if="bom.pic1" @click="bigImg(bom.pic1)">
                                        <el-image
                                            style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                            :src="seeDaima + 'Files/ProgramPic/' + bom.pic1"
                                            fit="contain"
                                        ></el-image>
                                        <div class="imgIcon">
                                            <i class="el-icon-zoom-in"></i>
                                        </div>
                                    </div>
                                    <div class="tableImgZhan neiZhan imgLeft" v-else>
                                        <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                    </div>
                                </div>
                                <div style="width: 160px; height: 112px">
                                    <div class="imgLeft imgleftBox" v-if="bom.pic2" @click="bigImg(bom.pic2)">
                                        <el-image
                                            style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                            :src="seeDaima + 'Files/ProgramPic/' + bom.pic2"
                                            fit="contain"
                                        ></el-image>
                                        <div class="imgIcon">
                                            <i class="el-icon-zoom-in"></i>
                                        </div>
                                    </div>
                                    <div class="tableImgZhan neiZhan imgLeft" v-else>
                                        <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                    </div>
                                </div>
                                <div style="width: 160px; height: 112px">
                                    <div class="imgLeft imgleftBox" v-if="bom.pic3" @click="bigImg(bom.pic3)">
                                        <el-image
                                            style="width: 160px; height: 112px; border: 1px solid #c0ccda; border-radius: 4px"
                                            :src="seeDaima + 'Files/ProgramPic/' + bom.pic3"
                                            fit="contain"
                                        ></el-image>
                                        <div class="imgIcon">
                                            <i class="el-icon-zoom-in"></i>
                                        </div>
                                    </div>
                                    <div class="tableImgZhan neiZhan imgLeft" v-else>
                                        <img src="../../../common/comImg/index/组 17 拷贝@2x.png" alt="" />
                                    </div>
                                </div>

                                <!-- <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                        :src="seeDaima + 'Files/ProgramPic/' +bom.pic1"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                       :src="seeDaima + 'Files/ProgramPic/' +bom.pic2"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div>
                                <div class="imgLeft imgleftBox">
                                    <el-image
                                        style="width: 160px; height: 112px"
                                        :src="seeDaima + 'Files/ProgramPic/' +bom.pic3"
                                        fit="contain"
                                    ></el-image>
                                    <div class="imgIcon" @click="bigImg(img)">
                                        <i class="el-icon-zoom-in"></i>
                                    </div>
                                </div> -->
                            </div>
                        </div>

                        <div class="selftb_l selftb_r">
                            <ul>
                                <li flex="cross:center" v-for="(item, index) in design_Files" :key="index">
                                    <div class="sr_title" v-show="index == 0">工程文件：</div>
                                    <div class="sr_name" flex="cross:center main:center">
                                        <img src="../../../common/comImg/index/file.png" alt="" />
                                        <el-tooltip class="item" effect="dark" :content="item.fileName" placement="top">
                                            <span class="yichuHide">{{ item.fileName }}</span>
                                        </el-tooltip>
                                    </div>

                                    <div class="sr_name1 sr_k">{{ item.fileSize }}k</div>
                                    <div class="sr_name2" flex="cross:center main:center" @click="downLoadFile(item)">
                                        <div class="sr_downLoad">下载</div>
                                    </div>
                                    <div class="sr_more" @click="moreClick()" v-show="index == 0 && design_Files.length >= 3">更多></div>
                                </li>
                                <div v-show="design_Files.length == 0">
                                    <li flex="cross:center main:center">-</li>
                                    <li flex="cross:center main:center">-</li>
                                    <li flex="cross:center main:center">-</li>
                                </div>
                                <div v-show="design_Files.length == 1">
                                    <li flex="cross:center main:center">-</li>
                                    <li flex="cross:center main:center">-</li>
                                </div>
                                <div v-show="design_Files.length == 2">
                                    <li flex="cross:center main:center">-</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <enlarge-img :imgBigTu="imgBigTu" :dialogVisible="dialogVisible" v-if="dialogVisible" @dioClose="dioClose"></enlarge-img>

            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow = !ziliaoShow"
                            :style="{ transform: ziliaoShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>料号信息</span>
                        <el-button class="buttonAdd" @click="addLiaoHao()" style="margin-left: 57px">添加料号</el-button>
                        <export-import :set-export-data="setExportData" :get-import-data="getImportData" :displayexport="displayexport">
                            <template slot="export">
                                <el-button class="buttonAdd">导出</el-button>
                            </template>
                            <template slot="import">
                                <el-button class="buttonAdd">导入数据</el-button>
                            </template>
                        </export-import>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable @clear="lhclear" placeholder="请输入料号名称"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <!-- <transition name="fade"> -->
                <div class="tableod tableMax" v-show="ziliaoShow">
                    <el-table
                        :data="lhData.slice((lhPageIndex - 1) * lhPageSize, lhPageIndex * lhPageSize)"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhPageIndex - 1) * lhPageSize + scope.$index + 1 }}</span>
                                    <!-- <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span> -->
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_name" label="工件" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="料号" align="center"> </el-table-column>
                        <el-table-column prop="materialType_name" label="原材料类型" align="center"> </el-table-column>
                        <!-- <el-table-column prop="" label="原材料编号" align="center"> </el-table-column> -->
                        <el-table-column prop="material_name" label="原材料名称" align="center"> </el-table-column>

                        <el-table-column prop="address" label="原材料尺寸" min-width="160" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>长:{{ scope.row.L }}-</span>
                                    <span>宽:{{ scope.row.W }}-</span>
                                    <span>高:{{ scope.row.H }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="amount" label="原材料数量" align="center"> </el-table-column>
                        <!-- <el-table-column prop="picFile" label="图纸" align="center">
                                <slot slot-scope="scope">
                                    <div :class="scope.row.picFile == '' ? 'noyulan' : 'yulan'">
                                        <a :href="scope.row.picFile"></a>
                                        预览
                                    </div>
                                </slot>
                            </el-table-column> -->
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="handleClick(scope.row)" class="caozuoStyle">编辑</div>
                                    <div @click="lhdelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhPageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhPageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                        <!-- <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination> -->
                    </div>
                </div>
                <!-- </transition> -->
            </div>
            <!-- <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="yclShow = !yclShow"
                            :style="{ transform: yclShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>原材料信息</span>
                        <el-button class="buttonAdd" @click="addYuancailiao">添加原材料</el-button>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="yclParams.QueryString" clearable placeholder="请输入原材料名称"></el-input>
                        <el-button class="orderBtn mar5" @click="yclSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="yclShow">
                    <el-table
                        :data="yclData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (yclParams.PageIndex - 1) * yclParams.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="原材料名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="type_name" label="原材料类型" align="center"> </el-table-column>
                        <el-table-column prop="address" label="原材料尺寸" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>长:{{ scope.row.L }}-</span>
                                    <span>宽:{{ scope.row.W }}-</span>
                                    <span>高:{{ scope.row.H }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="amount" label="原材料数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="yclhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                    <div @click="ycldelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="yclSizeChange"
                            @current-change="yclCurrentChange"
                            :current-page="yclParams.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="yclParams.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="ycltotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div> -->
            <div class="orderTable">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="bzjShow = !bzjShow"
                            :style="{ transform: bzjShow ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>

                        <span>标准件信息</span>
                        <el-button class="buttonAdd" @click="addBzj">添加标准件</el-button>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="bzjParams.QueryString" clearable @clear="bzjclear" placeholder="请输入标准件名称"></el-input>
                        <el-button class="orderBtn mar5" @click="bzjSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="bzjShow">
                    <el-table
                        :data="bzjData.slice((bzjPageIndex - 1) * bzjPageSize, bzjPageIndex * bzjPageSize)"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (bzjPageIndex - 1) * bzjPageSize + scope.$index + 1 }}</span>
                                    <!-- <span>{{ (bzjParams.PageIndex - 1) * bzjParams.PageSize + scope.$index + 1 }}</span> -->
                                </span>
                            </slot>
                        </el-table-column>

                        <!-- <el-table-column prop="bom_name" label="编号" width="180" align="center"> </el-table-column> -->
                        <el-table-column prop="name" label="标准件名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="typen_name" label="标准件类型" align="center"> </el-table-column>
                        <el-table-column prop="part_spec_name" label="标准件规格" align="center"> </el-table-column>
                        <el-table-column prop="amount" label="标准件数量" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="bzjhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                    <div @click="bzjdelClick(scope.row)" class="caozuoStyle delbtn">删除</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="bzjSizeChange"
                            @current-change="bzjCurrentChange"
                            :current-page="bzjPageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="bzjPageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="bzjtotal"
                        >
                        </el-pagination>
                    </div>
                    <!-- <div class="pagenofixed">
                        <el-pagination
                            @size-change="bzjSizeChange"
                            @current-change="bzjCurrentChange"
                            :current-page="bzjParams.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="bzjParams.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="bzjtotal"
                        >
                        </el-pagination>
                    </div> -->
                </div>
            </div>
            <!-- 添加料号 -->
            <div class="dialogclass">
                <el-dialog :title="lhgyName" :visible.sync="liaohao" width="500px">
                    <div>
                        <el-form ref="ruleForm" :model="form" :rules="ruleslh" label-width="120px">
                            <el-form-item label="料号编号：" v-show="lhstatus == 1">
                                <el-input v-model="lhCode" placeholder="请输入" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="料号名称：" prop="lhName">
                                <el-input v-model="lhName" placeholder="请输入名称"></el-input>
                            </el-form-item>
                            <el-form-item label="工件：">
                                <div flex="cross:center">
                                    <el-select v-model="gjchoose" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in gjprocess" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="原材料类型：">
                                <div flex="cross:center">
                                    <el-select v-model="ylxChoose" @change="yclchange" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in yclLiexing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="原材料名称：">
                                <el-select v-model="ymcChoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in yclList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="尺寸长：">
                                <el-input v-model="lhL" type="number" @change="lhlchange()" placeholder="请输入尺寸长"> </el-input>
                            </el-form-item>
                            <el-form-item label="尺寸宽：">
                                <el-input v-model="lhW" type="number" @change="lhWchange()" placeholder="请输入尺寸宽"> </el-input>
                            </el-form-item>
                            <el-form-item label="尺寸高：">
                                <el-input v-model="lhH" type="number" @change="lhHchange()" placeholder="请输入尺寸高"> </el-input>
                            </el-form-item>

                            <!-- <el-form-item label="数量：">
                                <el-input v-model="lhAmount" type="number" @change="lhAmountchange()" placeholder="请输入原材料数量">
                                </el-input>
                            </el-form-item> -->
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="liaohaoSave">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <!-- <div class="dialogclass">
                <el-dialog :title="yclName" :visible.sync="yuancailiao" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="选择料号：">
                                <el-select v-model="lhchoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in liaohaoList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="原材料类型：">
                                <div flex="cross:center">
                                    <el-select v-model="ylxChoose" @change="yclchange" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in yclLiexing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="原材料名称：">
                                <el-select v-model="ymcChoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in yclList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="尺寸长：">
                                <el-input v-model="lhL" type="number" @change="lhlchange()" placeholder="请输入尺寸长"> </el-input>
                            </el-form-item>
                            <el-form-item label="尺寸宽：">
                                <el-input v-model="lhW" type="number" @change="lhWchange()" placeholder="请输入尺寸宽"> </el-input>
                            </el-form-item>
                            <el-form-item label="尺寸高：">
                                <el-input v-model="lhH" type="number" @change="lhHchange()" placeholder="请输入尺寸高"> </el-input>
                            </el-form-item>

                            <el-form-item label="数量：">
                                <el-input v-model="lhAmount" type="number" @change="lhAmountchange()" placeholder="请输入原材料数量">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="yuancailiaoSave()">保存</el-button>
                    </span>
                </el-dialog>
            </div> -->
            <!-- 添加类型 -->
            <div class="dialogclass">
                <el-dialog title="添加类型" :visible.sync="addLx" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="类型：">
                                <el-input v-model="leixingVal" placeholder="请输入类型名称"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="addLXVal">添加</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="dialogclass">
                <el-dialog :title="bzjName" :visible.sync="biaozhuanjian" width="500px">
                    <div>
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="标准件类型：">
                                <div flex="cross:center">
                                    <el-select v-model="blchoose" @change="bzchange" filterable placeholder="请选择/输入">
                                        <el-option v-for="(lh, i) in bzjLeixing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="标准件名称：">
                                <el-select v-model="bmchoose" @change="bzjmcChange" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in bzjList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标准件规格：">
                                <el-select v-model="bgchoose" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in bzjGuige" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="数量：">
                                <el-input v-model="ycNumber" type="number" @change="ycChange()" placeholder="请输入标准件数量"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="yauncaiSave">保存</el-button>
                    </span>
                </el-dialog>
            </div>
            <!-- 工程文件 -->
            <div class="dialogclass">
                <el-dialog title="工程文件" :visible.sync="upFileDio" width="800px">
                    <div>
                        <div class="tableod">
                            <el-table
                                :data="txtList"
                                border
                                :row-class-name="tableRowClassName"
                                :header-cell-class-name="headerStyle"
                                style="width: 100%"
                            >
                                <el-table-column prop="date" label="序号" width="80" align="center">
                                    <slot slot-scope="scope">
                                        <span class="white">
                                            <span>{{ (gcParms.PageIndex - 1) * gcParms.PageSize + scope.$index + 1 }}</span>
                                        </span>
                                    </slot>
                                </el-table-column>
                                <el-table-column prop="fileName" label="工程文件" align="center"> </el-table-column>
                                <el-table-column prop="fileSize" label="文件大小" align="center">
                                    <slot slot-scope="scope">
                                        <span class="white"> {{ scope.row.fileSize }}k </span>
                                    </slot>
                                </el-table-column>
                                <el-table-column prop="address" label="操作" align="center">
                                    <slot slot-scope="scope">
                                        <div flex="cross:center main:center">
                                            <!-- <div @click="yclhandleClick(scope.row)" class="caozuoStyle">编辑</div>
                                            <div @click="ycldelClick(scope.row)" class="caozuoStyle delbtn">删除</div> -->
                                            <div class="sr_downLoad" @click="downLoadFile(scope.row)">下载</div>
                                        </div>
                                    </slot>
                                </el-table-column>
                            </el-table>
                            <div class="dioPage diopageright">
                                <el-pagination
                                    @size-change="gcSizeChange"
                                    @current-change="gcCurrentChange"
                                    :current-page="gcParms.PageIndex"
                                    :page-sizes="[20, 50, 100]"
                                    :page-size="gcParms.PageSize"
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="gctotal"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- <span slot="footer" class="dialog-footer">
                   
                </span> -->
                </el-dialog>
            </div>
            <!-- 导入 -->
            <div class="">
                <el-dialog :title="'导入数据：' + numAdd.length + '条'" :visible.sync="importDio" width="1500px">
                    <div class="importHd">
                        <ul flex="cross:center">
                            <li class="xuhao"></li>
                            <li>料号名称</li>
                            <li>工件</li>
                            <li>原材料类型</li>
                            <li>原材料名称</li>
                            <li>原材料尺寸规格</li>
                            <li class="xuhao"></li>
                        </ul>
                    </div>
                    <div class="importHd importTd" v-loading="loading">
                        <ul flex="cross:center" v-for="(item, index) in numAdd" v-show="numAdd.length>0" :key="index">
                            <li class="xuhao">{{ index + 1 }}</li>
                            <li>
                                <el-input v-model="item.name" placeholder="请输入料号名称"></el-input>
                            </li>
                            <li>
                                <el-select v-model="item.bom_type_id" @change="bomTypeId()" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in gjprocess" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </li>
                            <li>
                                <el-select
                                    v-model="item.material_type_id"
                                    @change="materialTypeId(item.material_type_id)"
                                    filterable
                                    placeholder="请选择/输入"
                                >
                                    <el-option v-for="(lh, i) in yclLiexing" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </li>
                            <li>
                                <el-select v-model="item.material_id" @change="materialId()" filterable placeholder="请选择/输入">
                                    <el-option v-for="(lh, i) in item.yclList" :key="i" :label="lh.name" :value="lh.id"></el-option>
                                </el-select>
                            </li>
                            <li>
                                <el-input v-model="item.size" placeholder="请输入原材料尺寸规格"></el-input>
                            </li>
                            <li flex="cross:center" class="xuhao delBtn" @click="deleteBtn(item, index)">
                                <i class="el-icon-remove-outline"></i>
                            </li>
                        </ul>
                        <ul v-show="numAdd.length<=0">
                            <li>
                                暂无符合条件的数据
                            </li>
                        </ul>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="dioSave" @click="importBtn()">导入</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
var re = /^[1-9]+[0-9]*]*$/;
import {
    BomList,
    AddBom,
    ModifyBom,
    DeleteBom,
    BomMaterialList,
    AddBomMaterial,
    ModifyBomMaterial,
    DeleteBomMaterial,
    BomPartList,
    AddBomPart,
    ModifyBomPart,
    DeleteBomPart,
    AddDesignPic,
    BomDetial,
    DesignFileList,
    AddBomMaterial_Excel
} from '@/api/design';
import {
    MateialList,
    MateialTypeList,
    PartTypeList,
    PartList,
    PartSpecList,
    AddMateialType,
    AddPartType,
    ProcessFlowList,
    CraftList,
    BomTypeList
} from '@/api/base';
import { compare } from '@/utils/index';
import exportImport from '../../component/exportImport.vue';
export default {
    components: {
        exportImport
    },
    data() {
        return {
            orderVal: '',
            tableData: [],
            currentPage: 1,
            shangPage: '',
            liaohao: false,
            form: {},
            yuancailiao: false,
            addLx: false,
            biaozhuanjian: false,
            liaohaoData: [
                {
                    key: 1,
                    label: `备选项1`,
                    disabled: false
                },
                {
                    key: 2,
                    label: `备选项3`,
                    disabled: false
                }
            ],
            code: '',
            baseId: 0,
            // amount: '',
            liaohaoVal: [],
            order_name: '',
            buyer_name: '',
            testTime: '',
            endTime: '',
            order_id: '',
            lhParms: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: '',
                BaseID: 0
            },
            yclParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: '',
                BaseID: 0
            },
            bzjParams: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                QueryString: '',
                BaseID: 0
            },
            lhData: [],
            lhtotal: 0,
            yclData: [],
            ycltotal: 0,
            bzjData: [],
            bzjtotal: 0,
            bzjtotal2: 0,

            liaohaoList: [],
            yclLiexing: [],
            yclList: [],
            bzjLeixing: [],
            bzjList: [],
            bzjGuige: [],

            lhchoose: '',
            ylxChoose: '',
            ymcChoose: '',
            lhL: '',
            lhW: '',
            lhH: '',
            lhAmount: 1,

            blchoose: '',
            bmchoose: '',
            bgchoose: '',

            leixingVal: '',
            ycNumber: '',
            typeAddbzj: 0,
            gyprocess: [],
            gjprocess: [],
            gychoose: '',
            gjchoose: '',
            lhName: '',

            currentIndex: -1,
            xiugaiList: [],
            currentIndexxg: -1,
            gyData: [],
            showgy: false,
            ruleslh: {},
            bzjName: '',
            yclName: '',
            lhgyName: '',
            fileList: [
                // {
                //     name: 'food.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // },
                // {
                //     name: 'food2.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }
            ],
            upDaimaUrl: '',
            fileList2: [],
            pic1: '',
            pic2: '',
            ziliaoShow: true,
            yclShow: true,
            baseShow: true,
            bzjShow: true,
            upFileDio: false,
            dialogVisible: false,
            bom: {},
            tableFileList: [],
            lhCode: '',
            bzjPageIndex: 1,
            bzjPageSize: 20,
            lhPageIndex: 1,
            lhPageSize: 20,
            txtList: [],
            gcParms: {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 1,
                PageIndex: 1,
                PageSize: 20,
                user_id: localStorage.getItem('user_id')
            },
            gctotal: 0,
            design_Files: [],
            lhstatus: 0,
            displayexport: false,
            importDio: false,
            numAdd: [],
            loading: false
        };
    },
    computed: {},
    watch: {},
    created() {
        this.seeDaima = localStorage.getItem('seeDaima');
        // this.DataId = JSON.parse(this.$Base64.decode(this.$route.query.info)).DataId;
        // this.design_id=JSON.parse(this.$Base64.decode(this.$route.query.info)).designId
        // this.nameCreateOrEdit=JSON.parse(this.$Base64.decode(this.$route.query.info)).name
        // this.order_id=JSON.parse(this.$Base64.decode(this.$route.query.info)).order_id

        console.log(JSON.parse(this.$Base64.decode(this.$route.query.info)), '-----');
        this.DataId = JSON.parse(this.$Base64.decode(this.$route.query.info)).bom_id;
        this.design_id = JSON.parse(this.$Base64.decode(this.$route.query.info)).design_id;
        // this.nameCreateOrEdit=JSON.parse(this.$Base64.decode(this.$route.query.info)).name
        this.order_id = JSON.parse(this.$Base64.decode(this.$route.query.info)).order_id;
        this.bom = JSON.parse(this.$Base64.decode(this.$route.query.info));

        // bom明细
        this.getBomDetial();

        // this.getBomList();
        // this.getBomMaterialList();
        // this.getBomPartList();

        // this.nopageBomList();
    },
    mounted() {
        if (JSON.parse(this.$Base64.decode(this.$route.query.info)).name == 0) {
            this.shangPage = '创建';
        } else if (JSON.parse(this.$Base64.decode(this.$route.query.info)).name == 1) {
            this.shangPage = '编辑';
        }

        // 原材料类型
        this.getMateialTypeList();
        // 工件列表
        this.getBomTypeList();
    },
    methods: {
        bomTypeId() {
            this.$forceUpdate();
        },
        materialTypeId(material_type_id) {
            this.$forceUpdate();
            console.log(material_type_id, 'material_type_id');
            this.getMateialList(material_type_id, false);
        },
        materialId() {
            this.$forceUpdate();
        },
        deleteBtn(item, index) {
            this.$confirm('确定删除此列?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.numAdd.splice(index, 1);
                })
                .catch(() => {});
        },
        importBtn() {
            for (let i = 0; i < this.numAdd.length; i++) {
                if (this.numAdd[i].material_type_id == '') {
                    this.$message.warning('请选择原材料类型');
                    return;
                }
                if (this.numAdd[i].material_id == '') {
                    this.$message.warning('请选择原材料名称');
                    return;
                }
            }

            AddBomMaterial_Excel(this.numAdd).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    console.log();
                    this.$message.success('导入成功');
                    this.DataId = Data;
                    this.getBomDetial();
                    this.importDio = false;
                }
            });
        },
        setExportData() {
            return {
                excelTitle: {
                    code: '编号',
                    name: '名称'
                },
                excelData: [],
                excelName: '导出'
            };
        },
        rename(arr) {
            let map = JSON.parse(JSON.stringify(arr));
            console.log(map); // arr.forEach((item) => { //     map[item.__EMPTY_2] = map[item.__EMPTY_2] === undefined ? 0 : map[item.__EMPTY_2] + 1; //     map[item.__EMPTY_2] && (item.__EMPTY_2 += map[item.__EMPTY_2]); // }); // return arr;
            let map1 = [];
            for (let i = 0; i < arr.length; i++) {
                map1 = [];
                for (let j = 0; j < map.length; j++) {
                    if (map[j][this.keyLing]) {
                        if (arr[i][this.keyLing] == map[j][this.keyLing]) {
                            map1.push(map[j]);
                        }
                    }
                }

                if (map1.length > 1) {
                    console.log(map1, 'map1');
                    let xg = 0;
                    for (let k = 0; k < arr.length; k++) {
                        if (arr[k][this.keyLing]) {
                            if (map1[0][this.keyLing] == arr[k][this.keyLing]) {
                                xg++;
                                arr[k][this.keyLing] = arr[k][this.keyLing] + xg.toString();
                            }
                        }
                    }
                } else {
                    //debugger;
                    if (map1[0] != null) {
                        if (map1[0][this.keyNum]) {
                            if (map1[0][this.keyNum] > 1) {
                                for (let k = 0; k < arr.length; k++) {
                                    if (arr[k][this.keyLing]) {
                                        if (map1[0][this.keyLing] == arr[k][this.keyLing]) {
                                            arr[k][this.keyLing] = arr[k][this.keyLing] + '1';
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        setRepeatArr(arrNew) {
            let obj = {};
            arrNew.forEach((item, index) => {
                if (obj[item[this.keyLing]]) {
                    let indexArr = obj[item[this.keyLing]];
                    indexArr.push(index);
                    if (indexArr.length === 2 && (arrNew[indexArr[0]][this.keyNum] <= 1 || !arrNew[indexArr[0]][this.keyNum])) {
                        arrNew[indexArr[0]][this.keyLing] += +'1';
                    }
                    item[this.keyLing] += indexArr.length;
                } else {
                    obj[item[this.keyLing]] = [index];
                    if (item[this.keyNum] > 1) {
                        item[this.keyLing] += 1;
                    }
                }
            });
            return arrNew;
        },
        getImportData(data) {
            console.log(data);
            if(this.gjprocess.length<=0||this.yclLiexing.length<=0){
                this.$message.warning('请至数据库先添加工件或原材料')
                return
            }

            this.importDio = true;
            this.loading = true;

            this.arrList = [];
            this.newArrList = [];
            data.forEach((item, index) => {
                for (var key in item) {
                    if (item[key] == '零件名称') {
                        this.keyLing = key;
                    }
                    if (item[key] == '数量') {
                        this.keyNum = key;
                    }
                    if (item[key] == '实际尺寸') {
                        this.keySize = key;
                    }
                    if (item[key] == '零件类别') {
                        this.keytype = key;
                    }
                }
            });
            data.forEach((item, index) => {
                for (var key in item) {
                    if (key == this.keyLing) {
                        this.arrList.push(item);
                    }
                }
            });
            // planA
            this.setRepeatArr(this.arrList);
            // planB
             //  this.rename(this.arrList);

            // let obj = {};
            // this.arrList.forEach((item, index) => {
            //     if (obj[item[this.keyLing]]) {
            //         let indexArr = obj[item[this.keyLing]];
            //         indexArr.push(index);
            //         if (indexArr.length === 2 && (this.arrList[indexArr[0]][this.keyNum] <= 1 || !this.arrList[indexArr[0]][this.keyNum])) {
            //             this.arrList[indexArr[0]][this.keyLing] += +'1';
            //         }
            //         item[this.keyLing] += indexArr.length;
            //     } else {
            //         obj[item[this.keyLing]] = [index];
            //         if (item[this.keyNum] > 1) {
            //             item[this.keyLing] += 1;
            //         }
            //     }
            // });

            this.numAdd2 = [];

            this.arrList.map((item) => {
                if (item[this.keyNum] == 1) {
                    this.numAdd2.push({
                        ...item,
                        name: item[this.keyLing]
                    });
                } else {
                    for (let index = 0; index < item[this.keyNum]; index++) {
                        this.numAdd2.push({
                            ...item,
                            name: item[this.keyLing] + '-' + (index + 1)
                        });
                    }
                }
            });

            console.log(this.numAdd2, 'Arr=');

            this.numAdd2.forEach((item, index) => {
                for (let i = 0; i < this.gjprocess.length; i++) {
                    // console.log(this.gjprocess[i].name, 'gj.name');
                    if (item[this.keytype] == this.gjprocess[i].name) {
                        item.bom_type_id = this.gjprocess[i].id;
                        item.noGj = false;
                    }
                }

                item.size = item[this.keySize];
                item.amount = 1;
                item.L = item.size.split('x')[0] ? item.size.split('x')[0] : '';
                item.W = item.size.split('x')[1] ? item.size.split('x')[1] : '';
                item.H = item.size.split('x')[2] ? item.size.split('x')[2] : '';
                item.bom_id = this.DataId ? this.DataId : 0;
                item.cp_id = localStorage.getItem('comp_id');
                item.order_id = this.order_id;
                item.design_id = this.design_id;
                item.user_id = localStorage.getItem('user_id');
                item.mark = '';
                // 原材料类型
                // this.getMateialTypeList();
                item.material_type_id = this.yclLiexing[0].id;

                // item.material_id = this.yclList[0].id;
                // item.yclList = this.yclList
            });
            this.numAdd = [];
            this.numAdd2.forEach((item, index) => {
                if (item.noGj == false) {
                    // this.numAdd=this.numAdd.splice(index, 1)
                    // console.log(item);
                    this.numAdd.push(item);
                }
            });
            this.getMateialList(this.yclLiexing[0].id, true);
            // console.log(this.yclList,'---this.yclListthis.yclList');

            console.log(this.numAdd, 'Arr=001');
            this.loading = false;
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        bigImg(img) {
            this.imgBigTu = this.seeDaima + 'Files/ProgramPic/' + img;
            console.log(img);
            this.dialogVisible = true;
        },
        clearFiles() {
            this.$refs['my-upload'].clearFiles();
        },
        clearFiles2() {
            this.$refs['my-upload2'].clearFiles();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList, '======handleRemove');
        },
        handlePreview(file) {
            console.log(file, '00000handlePreview');
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
                // `当前限制选择 1 个文件，请删除重新选择`
                `当前已有选择文件`
            );
        },
        beforeRemove2(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        changePic1(response, file) {
            file.name = '图片一';
            let type = 0;
            this.getPic(response.Name, type);
        },

        handleRemove2(file, fileList) {
            console.log(file, fileList, '======handleRemove');
        },
        handlePreview2(file) {
            console.log(file, '00000handlePreview');
        },
        handleExceed2(files, fileList) {
            this.$message.warning(
                // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
                `当前已有选择文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        changePic2(response, file) {
            file.name = '图片二';
            let type = 1;
            this.getPic(response.Name, type);
        },
        getPic(Name, type) {
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                order_id: this.order_id,
                design_id: this.baseId,
                FileName: Name,
                type: type,
                user_id: localStorage.getItem('user_id')
            };
            AddDesignPic(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    // 重新赋值
                    this.baseId = Data;
                    localStorage.setItem('baseId', this.baseId);
                    this.getBomList();
                    this.clearFiles();
                    this.clearFiles2();
                }
            });
        },
        lhlchange() {
            if (this.lhL <= 0) {
                this.$message.warning('长不能小于等于0');
                this.lhL = '';
                return;
            }
        },
        lhWchange() {
            if (this.lhW <= 0) {
                this.$message.warning('宽不能小于等于0');
                this.lhW = '';
                return;
            }
        },
        lhHchange() {
            if (this.lhH <= 0) {
                this.$message.warning('高不能小于等于0');
                this.lhH = '';
                return;
            }
        },

        lhAmountchange() {
            if (!re.test(this.lhAmount)) {
                this.$message.warning('数量为正整数');
                this.lhAmount = '';
                return;
            }
        },
        ycChange() {
            if (!re.test(this.ycNumber)) {
                this.$message.warning('数量为正整数');
                this.ycNumber = '';
                return;
            }
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        lhSizeChange(val) {
            // this.lhParms.PageSize = val;
            // this.getBomList();
            this.lhPageSize = val;
        },
        lhCurrentChange(val) {
            // this.lhParms.PageIndex = val;
            // this.getBomList();
            this.lhPageIndex = val;
        },
        yclSizeChange(val) {
            this.yclParams.PageSize = val;
            this.getBomMaterialList();
        },
        yclCurrentChange(val) {
            this.yclParams.PageIndex = val;
            this.getBomMaterialList();
        },
        gcSizeChange(val) {
            this.gcParms.PageSize = val;
            this.getDesignFileList(this.design_id);
        },
        gcCurrentChange(val) {
            this.gcParms.PageIndex = val;
            this.getDesignFileList(this.design_id);
        },

        bzjSizeChange(val) {
            // this.bzjParams.PageSize = val;
            // this.getBomPartList();

            this.bzjPageSize = val;
        },
        bzjCurrentChange(val) {
            // this.bzjParams.PageIndex = val;
            // this.getBomPartList();
            this.bzjPageIndex = val;
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        handleClick(row) {
            // processFlow_id: 2
            // processFlow_name: "抽屉面"

            console.log(row, 'row=--');

            this.lhgyName = '编辑料号';
            this.liaohao = true;
            this.lhName = row.name;
            // 工件列表
            this.getBomTypeList();
            this.gjchoose = row.bom_type_id;
            this.getMateialTypeList();
            this.ylxChoose = row.material_type_id;
            this.getMateialList(this.ylxChoose);
            this.ymcChoose = row.material_id;
            this.lhstatus = 1;
            this.lhL = row.L;
            this.lhW = row.W;
            this.lhH = row.H;
            this.rowidlhes = row.id;
            this.amount = 1;
            this.lhCode = row.code;
            // this.rowCode = row.code;
        },
        addLiaoHao() {
            this.lhgyName = '添加料号';
            this.liaohao = true;
            this.ylxChoose = '';
            this.lhName = '';
            this.ymcChoose = '';
            this.gychoose = '';
            this.gjchoose = '';
            this.lhstatus = 0;
            this.lhL = '';
            this.lhW = '';
            this.lhH = '';

            // this.gongyiliucheng();

            // 原材料类型
            // this.getMateialTypeList();
            // // 工件列表
            // this.getBomTypeList();
        },
        gongyiliucheng(row) {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            ProcessFlowList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gyprocess = Data;
                    if (row) {
                        let newobj = {
                            name: row.processFlow_name,
                            id: row.processFlow_id
                        };
                        this.gyprocess.push(newobj);
                        this.gychoose = row.processFlow_id;
                    }
                }
            });
        },
        getBomTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            BomTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gjprocess = Data;
                }
            });
        },
        addLeiXing() {
            this.lxtatus = 1;
            this.addLx = true;
        },
        addyclLeiXing() {
            this.lxtatus = 0;
            this.addLx = true;
        },
        addLXVal() {
            if (this.lxtatus == 0) {
                let params = {
                    name: this.leixingVal,
                    cp_id: localStorage.getItem('comp_id'),
                    user_id: localStorage.getItem('user_id')
                };
                AddMateialType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.addLx = false;
                        this.getMateialTypeList();
                    }
                });
            } else {
                let params = {
                    name: this.leixingVal,
                    cp_id: localStorage.getItem('comp_id'),
                    user_id: localStorage.getItem('user_id')
                };
                AddPartType(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.addLx = false;
                        this.getPartTypeList();
                    }
                });
            }
        },
        addBzj() {
            this.typeAddbzj = 0;
            this.biaozhuanjian = true;
            this.bzjName = '添加标准件';
            this.getPartTypeList();
            this.blchoose = '';
            this.bmchoose = '';
            this.bgchoose = '';
            this.ycNumber = '';
            // this.lhchoose = '';
            this.getPartSpecList();
        },
        bzjhandleClick(row) {
            this.bzjName = '编辑标准件';
            // this.lhchoose = row.bom_id;

            this.typeAddbzj = 1;
            this.bzjrowID = row.id;
            this.leixingVal = '';
            this.biaozhuanjian = true;
            this.getPartTypeList();
            this.blchoose = row.part_type_id;
            this.bmchoose = row.part_id;
            this.getPartList();
            this.bgchoose = row.part_spec_id;

            this.ycNumber = row.amount;
        },
        delClick() {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {});
        },
        liaohaoSave() {
            // if (this.lhCode == '') {
            //     this.$message.warning('请输入料号名称');
            //     return;
            // }
            if (this.lhName == '') {
                this.$message.warning('请输入料号名称');
                return;
            }
            if (this.gjchoose == '') {
                this.$message.warning('请选择工件');
                return;
            }
            if (this.ylxChoose == '') {
                this.$message.warning('请选择原材料类型');
                return;
            }
            if (this.ymcChoose == '') {
                this.$message.warning('请选择原材料名称');
                return;
            }
            if (this.lhL == '') {
                this.$message.warning('请输入尺寸长');
                return;
            }
            if (this.lhW == '') {
                this.$message.warning('请输入尺寸宽');
                return;
            }
            if (this.lhH == '') {
                this.$message.warning('请输入尺寸高');
                return;
            }
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                name: this.lhName,
                bom_id: this.DataId ? this.DataId : 0,
                order_id: this.order_id,
                design_id: this.design_id,
                material_id: this.ymcChoose,
                bom_type_id: this.gjchoose,
                L: this.lhL,
                W: this.lhW,
                H: this.lhH,
                amount: 1,
                mark: '111',
                user_id: localStorage.getItem('user_id')
            };
            if (this.lhstatus == 0) {
                AddBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('添加成功');
                        this.liaohao = false;
                        this.DataId = Data;
                        this.getBomDetial();
                    }
                    // if (ReturnCode == 203) {
                    //     this.$message.error('数据已关联，不能保存');
                    // }
                });
            } else {
                params.id = this.rowidlhes;
                params.code = this.lhCode;
                ModifyBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('编辑成功');
                        this.liaohao = false;
                        // this.DataId=Data
                        this.getBomDetial();
                    }
                });
            }

            // if (this.lhstatus == 0) {
            //     // 添加成功，会返回设计表的ID,如果第一次创建需要将design_id更新
            //     let params = {
            //         cp_id: localStorage.getItem('comp_id'),
            //         order_id: this.order_id,
            //         design_id: this.baseId,
            //         name: this.lhName,
            //         processFlow_id: this.gychoose,
            //         user_id: localStorage.getItem('user_id'),
            //         bomType_id: this.gjchoose
            //     };
            //     AddBom(params).then((res) => {
            //         let { ReturnCode, Data } = res;
            //         if (ReturnCode == 200) {
            //             this.$message.success('添加料号成功');
            //             this.liaohao = false;
            //             // 重新赋值
            //             this.baseId = Data;
            //             localStorage.setItem('baseId', this.baseId);
            //             this.getBomList();

            //             // this.getBomMaterialList();
            //             // this.getBomPartList();
            //         }
            //         if (ReturnCode == 203) {
            //             this.$message.error('数据已关联，不能保存');
            //         }
            //     });
            // } else {
            //     let params = {
            //         cp_id: localStorage.getItem('comp_id'),
            //         order_id: this.order_id,
            //         design_id: this.baseId,
            //         name: this.lhName,
            //         processFlow_id: this.gychoose,
            //         user_id: localStorage.getItem('user_id'),
            //         id: this.rowidlhes,
            //         code: this.rowCode,
            //         bomType_id: this.gjchoose
            //     };
            //     ModifyBom(params).then((res) => {
            //         let { ReturnCode, Data } = res;
            //         if (ReturnCode == 200) {
            //             this.$message.success('添加编辑成功');
            //             this.liaohao = false;
            //             this.getBomList();
            //         }
            //         if (ReturnCode == 203) {
            //             this.$message.error('数据已关联，不能保存');
            //         }
            //     });
            // }

            // 工艺流程直接保存，则直接保存 否则 （如果有新建的流程），则弹出以下提示
            // this.$confirm('是否将新建的工艺流程保存到流程库?', '提示', {
            //     confirmButtonText: '保存',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // })
            //     .then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '保存成功!'
            //         });
            //     })
            //     .catch(() => {});
        },

        // getBomList() {
        //     this.lhParms.BaseID = this.baseId;
        //     BomList(this.lhParms).then((res) => {
        //         let { ReturnCode, Data, PageCount } = res;
        //         if (ReturnCode == 200) {
        //             this.lhData = Data;
        //             this.lhtotal = PageCount;
        //         }
        //     });
        // },
        lhdelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBomMaterial(params).then((res) => {
                        let { ReturnCode, Data, ErrorMessage } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomDetial();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error(ErrorMessage);
                        }
                    });
                })
                .catch(() => {});
        },

        getBomMaterialList() {
            this.yclParams.BaseID = this.baseId;
            BomMaterialList(this.yclParams).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.yclData = Data;
                    this.ycltotal = PageCount;
                }
            });
        },
        ycldelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBomMaterial(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomMaterialList();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此订单已被生产管理创建生产任务');
                        }
                    });
                })
                .catch(() => {});
        },
        // getBomPartList() {
        //     this.bzjParams.BaseID = this.baseId;
        //     BomPartList(this.bzjParams).then((res) => {
        //         let { ReturnCode, Data, PageCount } = res;
        //         if (ReturnCode == 200) {
        //             this.bzjData = Data;
        //             this.bzjtotal = PageCount;
        //         }
        //     });
        // },
        bzjdelClick(row) {
            this.$confirm('确定要删除此项吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        id: row.id
                    };
                    DeleteBomPart(params).then((res) => {
                        let { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBomDetial();
                        }
                        if (ReturnCode == 203) {
                            this.$message.error('删除失败，此订单已被生产管理创建生产任务');
                        }
                    });
                })
                .catch(() => {});
        },
        lhSearch() {
            // this.getBomList();
            if (!this.lhData2) {
                this.lhData2 = this.lhData;
                this.lhtotal2 = this.lhtotal;
            } else {
                this.lhData = this.lhData2;
                this.lhtotal = this.lhtotal2;
            }

            this.lhData2 = this.lhData;
            var arr = [];
            for (var i = 0; i < this.lhData.length; i++) {
                if (this.lhData[i].name.indexOf(this.lhParms.QueryString) >= 0) {
                    arr.push(this.lhData[i]);
                }
            }
            this.lhData = arr;
            this.lhtotal = this.lhData.length;
        },
        lhclear() {
            this.lhData = this.lhData2;
            this.lhtotal = this.lhData.length;
        },
        yclSearch() {
            // this.getBomMaterialList();
        },
        bzjSearch() {
            // this.getBomPartList();
            if (!this.bzjData2) {
                this.bzjData2 = this.bzjData;
                this.bzjtotal2 = this.bzjtotal;
            } else {
                this.bzjData = this.bzjData2;
                this.bzjtotal = this.bzjtotal2;
            }

            var arr = [];
            for (var i = 0; i < this.bzjData.length; i++) {
                if (this.bzjData[i].name.indexOf(this.bzjParams.QueryString) >= 0) {
                    arr.push(this.bzjData[i]);
                }
            }
            this.bzjData = arr;
            this.bzjtotal = this.bzjData.length;
        },
        bzjclear() {
            this.bzjData = this.bzjData2;
            this.bzjtotal = this.bzjData.length;
        },
        // 原材料 不分页
        yclchange() {
            this.ymcChoose = '';
            this.getMateialList(this.ylxChoose);
        },
        // 料号  BomList
        nopageBomList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.baseId ? this.baseId : 0
            };
            BomList(params).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.liaohaoList = Data;
                }
            });
        },
        // 原材料类型  MateialTypeList
        getMateialTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            MateialTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.yclLiexing = Data;
                }
            });
        },
        //原材料（名称）列表 MateialList
        getMateialList(ylxChoose, daoshu) {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: ylxChoose
            };
            MateialList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.yclList = Data;
                    if (this.numAdd.length > 0 && daoshu == true) {
                        this.numAdd.forEach((item, index) => {
                            item.yclList = this.yclList;
                            item.material_id = this.yclList[0].id;
                        });
                    } else if (this.numAdd.length > 0 && daoshu == false) {
                        this.numAdd.forEach((item, index) => {
                            if (item.material_type_id == ylxChoose) {
                                item.yclList = this.yclList;
                                item.material_id = this.yclList.length > 0 ? this.yclList[0].id : '';
                            }
                        });
                    }
                }
            });
        },

        // 标准件 不分页
        bzchange() {
            this.bmchoose = '';
            this.bgchoose = '';
            this.getPartList();
            // this.getPartSpecList();
        },
        bzjmcChange() {
            this.bgchoose = '';
            this.getPartSpecList();
        },
        // 料号  BomList
        //  标准件类型 PartTypeList
        getPartTypeList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            PartTypeList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjLeixing = Data;
                }
            });
        },
        // 标准件名称 PartList
        getPartList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.blchoose
            };
            PartList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjList = Data;
                }
            });
        },
        // 标准件规格 PartSpecList
        getPartSpecList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0,
                BaseID: this.bmchoose
            };
            PartSpecList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.bzjGuige = Data;
                }
            });
        },

        // 添加原材料
        yuancailiaoSave() {
            if (this.lhchoose == '') {
                this.$message.warning('请选择料号');
                return;
            }
            if (this.ylxChoose == '') {
                this.$message.warning('请选择原材料类型');
                return;
            }
            if (this.ymcChoose == '') {
                this.$message.warning('请选择原材料名称');
                return;
            }
            if (this.lhL == '') {
                this.$message.warning('请输入尺寸长');
                return;
            }
            if (this.lhW == '') {
                this.$message.warning('请输入尺寸宽');
                return;
            }
            if (this.lhH == '') {
                this.$message.warning('请输入尺寸高');
                return;
            }
            // if (this.lhAmount == '') {
            //     this.$message.warning('请输入原材料数量');
            //     return;
            // }
            this.lhlchange();
            this.lhWchange();
            this.lhHchange();
            this.lhAmountchange();
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                bom_id: this.lhchoose, //0 this.lhchoose,
                order_id: this.order_id,
                design_id: this.baseId,
                material_id: this.ymcChoose,
                L: this.lhL,
                W: this.lhW,
                H: this.lhH,
                amount: 1, // this.lhAmount,
                mark: '',
                user_id: localStorage.getItem('user_id')
            };
            if (this.typeAddtcl == 0) {
                AddBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('原材料添加成功');
                        this.yuancailiao = false;
                        this.getBomMaterialList();
                    }
                    if (ReturnCode == 203) {
                        this.$message.error('数据已关联，不能保存');
                    }
                });
            } else {
                params.id = this.bjyclID;
                ModifyBomMaterial(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('原材料编辑成功');
                        this.yuancailiao = false;
                        this.getBomMaterialList();
                    }
                    if (ReturnCode == 203) {
                        this.$message.error('数据已关联，不能保存');
                    }
                });
            }
        },
        addYuancailiao() {
            this.leixingVal = '';
            this.typeAddtcl = 0;
            this.yuancailiao = true;
            this.typeAddtcl = 0;
            this.ylxChoose = '';
            this.ymcChoose = '';
            this.lhchoose = '';
            this.lhL = '';
            this.lhW = '';
            this.lhH = '';
            this.lhAmount = 1;
            this.yclName = '添加原材料';
            this.getMateialTypeList();
            this.nopageBomList();
        },
        // 编辑原材料
        yclhandleClick(row) {
            this.yclName = '编辑原材料';
            this.leixingVal = '';
            this.typeAddtcl = 1;
            this.bjyclID = row.id;
            this.yuancailiao = true;
            this.getMateialTypeList();
            this.ylxChoose = row.material_type_id;
            this.getMateialList();
            this.ymcChoose = row.material_id;
            this.lhchoose = row.bom_id;
            this.lhL = row.L;
            this.lhW = row.W;
            this.lhH = row.H;
            this.lhAmount = row.amount;
        },

        // 保存标准件
        yauncaiSave() {
            // if (this.lhchoose == '') {
            //     this.$message.warning('请选择料号');
            //     return;
            // }
            if (this.blchoose == '') {
                this.$message.warning('请选择标准件类型');
                return;
            }
            if (this.bmchoose == '') {
                this.$message.warning('请选择标准件名称');
                return;
            }
            if (this.bgchoose == '') {
                this.$message.warning('请选择标准件规格');
                return;
            }
            if (this.ycNumber == '') {
                this.$message.warning('请输入原材料数量');
                return;
            }
            this.ycChange();
            let params = {
                cp_id: localStorage.getItem('comp_id'),
                bom_id: this.DataId ? this.DataId : 0,
                order_id: this.order_id,
                design_id: this.design_id,
                part_spec_id: this.bgchoose,
                part_id: this.bmchoose,
                amount: this.ycNumber,
                mark: '',
                user_id: localStorage.getItem('user_id')
            };
            if (this.typeAddbzj == 0) {
                AddBomPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('标准件添加成功');
                        this.DataId = Data;
                        // this.biaozhuanjian=false
                        this.getBomDetial();
                    }
                    if (ReturnCode == 203) {
                        this.$message.error('数据已关联，不能保存');
                    }
                });
            } else {
                params.id = this.bzjrowID;
                ModifyBomPart(params).then((res) => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        this.$message.success('标准件添加成功');
                        this.biaozhuanjian = false;
                        this.getBomDetial();
                    }
                    if (ReturnCode == 203) {
                        this.$message.error('数据已关联，不能保存');
                    }
                });
            }
        },
        getCraftList() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                EndablePager: 0
            };
            CraftList(params).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gyData = Data;
                }
            });
        },
        addChuansuo() {
            if (this.currentIndex != -1) {
                this.xiugaiList.push(this.gyData[this.currentIndex]);
                this.gyData.splice(this.currentIndex, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        deleteChuansuo() {
            if (this.currentIndexxg != -1) {
                this.gyData.push(this.xiugaiList[this.currentIndexxg]);
                this.xiugaiList.splice(this.currentIndexxg, 1);
                this.currentIndex = -1;
                this.currentIndexxg = -1;
            } else {
                this.$message.warning('请选中一项');
            }
        },
        clickLi(gy, i) {
            this.currentIndex = i;
        },
        clickLixg(xg, i) {
            this.currentIndexxg = i;
        },
        showlhadd() {
            this.showgy = true;
        },
        showlhddel() {
            this.showgy = false;
        },
        moreClick() {
            this.upFileDio = true;
            this.getDesignFileList(this.design_id);
        },
        getBomDetial() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                ID: this.DataId ? this.DataId : 0,
                BaseID: this.design_id
            };
            BomDetial(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    this.design_Files = Data.design_Files;
                    // this.bom=Data.bom
                    this.lhData = Data.bom_material ? Data.bom_material : [];
                    for (let i = 0; i < this.lhData.length; i++) {
                        this.lhData[i].cttimechuo = new Date(this.lhData[i].ctTime).getTime();
                    }
                    this.lhData.sort(compare('cttimechuo', false));
                    this.lhtotal = this.lhData.length;
                    this.bzjData = Data.bom_part ? Data.bom_part : [];
                    for (let i = 0; i < this.bzjData.length; i++) {
                        this.bzjData[i].cttimechuo = new Date(this.bzjData[i].ctTime).getTime();
                    }
                    this.bzjData.sort(compare('cttimechuo', false));
                    this.bzjtotal = this.bzjData.length;
                }
            });
        },
        getDesignFileList(id) {
            // let params = {
            //     CP_ID: localStorage.getItem('comp_id'),
            //     EndablePager: 0,
            //     PageIndex: 1,
            //     PageSize: 20,
            //     BaseID: id,
            //     user_id: localStorage.getItem('user_id')
            // };
            this.gcParms.BaseID = id;
            DesignFileList(this.gcParms).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    console.log(Data, '------tableFileList');
                    this.txtList = Data;
                    // if(Data.length>3){
                    //     this.tableFileList = Data.slice(0,3)
                    // }else{
                    // this.tableFileList = Data

                    // }
                    this.gctotal = PageCount;
                }
            });
        },
        downLoadFile(item) {
            console.log(this.seeDaima + 'Files/' + item.guidName, '===');
            this.$axios
                .get(this.seeDaima + 'Files/' + item.guidName, {
                    responseType: 'blob'
                })
                .then((res) => {
                    this.wenbenRes = res.data;

                    this.saveTXT(this.wenbenRes, item.fileName);
                });
        },
        saveTXT(content, filename) {
            // var blob = new Blob(['\ufeff' + content], { type: 'text/txt,charset=UTF-8' });
            // if (typeof blob === 'object' && blob instanceof Blob) {
            //     blob = URL.createObjectURL(blob);
            // }
            // const aLink = document.createElement('a');
            // aLink.href = blob;
            // aLink.download = filename;
            // aLink.click();
            const blob = new Blob([content], { type: 'application/zip' });
            // const fileName = this.bathCode + '.zip';
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a');
                elink.download = filename;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        }
    },

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        localStorage.removeItem('baseId');
    },
    activated() {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.fade-enter,
.fade-leave-to {
    opacity: 0;

    transform: translateY(-5px);
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
</style>
