<template>
    <div class="container yichu" id="app-root">
        <!-- 订单档案详情 -->
        <div class="dingDang">
            <div class="orderTop"><span style="cursor: pointer" @click="$router.go(-1)">订单状态展示</span></div>

            <div class="mingcheng" @mouseover="nameEnter()" @mouseleave="nameLeave()">
                <div class="mcname">流程</div>
                <el-collapse-transition>
                    <div class="mcBody" v-if="nameMing">
                        <ul class="transition-box">
                            <!-- @mouseover="mouseOver(index)"
                                @mouseleave="mouseLeave(index)" -->
                            <li
                                v-for="(item, index) in orderList"
                                :key="index"
                                @click="goAnchor('anchor-' + index, index)"
                                @mouseover="mouseOver(index)"
                                @mouseleave="mouseLeave(index)"
                                :style="{ color: navLiNumclick == index ? '#2A5389' : '' }"
                            >
                                <div>{{ item.name }}</div>
                                <div class="shuoming" v-show="index == navLiNum">
                                    <div class="smNei">已完成 — 已上传2份</div>
                                    <div class="zhizhen"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="dingDangTop">
                <table>
                    <tr>
                        <td>
                            <span class="bhName">订单编号：</span>
                            <span class="bhcode">HZYB20220228</span>
                        </td>
                        <td>
                            <span class="bhName">模具：</span>
                            <span class="bhcode">HZYB20220228</span>
                        </td>
                        <td>
                            <span class="bhName">客户：</span>
                            <span class="bhcode">HZYB20220228</span>
                        </td>
                        <td>
                            <span class="bhName">试模时间：</span>
                            <span class="bhcode">HZYB20220228</span>
                        </td>
                        <td>
                            <span class="bhName">交付时间：</span>
                            <span class="bhcode">HZYB20220228</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- <title-name></title-name> -->
        
        <div class="orderCont" id="orderCont" style="margin-top: 89px">
            <div class="orderTable" id="anchor-0">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow1 = !ziliaoShow1"
                            :style="{ transform: ziliaoShow1 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>造型-已完成</span>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow1">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="完成时间" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="操作人" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="状态" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="备注" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="handleClick(scope.row)" class="caozuoStyle">查看</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="bomDouble" id="anchor-1">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow2 = !ziliaoShow2"
                            :style="{ transform: ziliaoShow2 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>BOM清单-已完成</span>
                    </div>
                </div>
                <div flex="main:justify" v-show="ziliaoShow2">
                    <div class="bdLeft">
                        <div class="orderTable">
                            <div class="tableod tableMax">
                                <div flex="main:justify">
                                    <div class="yclName">原材料</div>
                                    <div class="detailSearch" flex="cross:center">
                                        <el-input v-model="lhParms.QueryString" clearable placeholder="请输入料号名称"></el-input>
                                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                                    </div>
                                </div>

                                <el-table
                                    :data="lhData"
                                    border
                                    :row-class-name="tableRowClassName"
                                    :header-cell-class-name="headerStyle"
                                    style="width: 100%"
                                    max-height="500"
                                >
                                    <el-table-column prop="date" label="序号" width="100" align="center">
                                        <slot slot-scope="scope">
                                            <span class="white">
                                                <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                            </span>
                                        </slot>
                                    </el-table-column>
                                    <el-table-column prop="code" label="料号" width="180" align="center"> </el-table-column>
                                    <el-table-column prop="bomType_Name" label="工件" width="180" align="center"> </el-table-column>
                                    <el-table-column prop="name" label="原材料" align="center"> </el-table-column>
                                    <el-table-column prop="processFlow_name" label="尺寸" align="center"> </el-table-column>
                                    <el-table-column prop="CraftList" label="数量" align="center"> </el-table-column>
                                </el-table>
                                <div class="pagenofixed">
                                    <el-pagination
                                        @size-change="lhSizeChange"
                                        @current-change="lhCurrentChange"
                                        :current-page="lhParms.PageIndex"
                                        :page-sizes="[20, 50, 100]"
                                        :page-size="lhParms.PageSize"
                                        background
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="lhtotal"
                                    >
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bdLeft">
                        <div class="orderTable">
                            <div class="tableod tableMax">
                                <div flex="main:justify">
                                    <div class="yclName">标准件</div>
                                </div>

                                <el-table
                                    :data="lhData"
                                    border
                                    :row-class-name="tableRowClassName"
                                    :header-cell-class-name="headerStyle"
                                    style="width: 100%"
                                    max-height="500"
                                >
                                    <el-table-column prop="date" label="序号" width="100" align="center">
                                        <slot slot-scope="scope">
                                            <span class="white">
                                                <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                            </span>
                                        </slot>
                                    </el-table-column>
                                    <el-table-column prop="code" label="名称" width="180" align="center"> </el-table-column>
                                    <el-table-column prop="bomType_Name" label="尺寸" width="180" align="center"> </el-table-column>
                                    <el-table-column prop="name" label="数量" align="center"> </el-table-column>
                                </el-table>
                                <div class="pagenofixed">
                                    <el-pagination
                                        @size-change="lhSizeChange"
                                        @current-change="lhCurrentChange"
                                        :current-page="lhParms.PageIndex"
                                        :page-sizes="[20, 50, 100]"
                                        :page-size="lhParms.PageSize"
                                        background
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="lhtotal"
                                    >
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 造型 -->
            <div class="orderTable" id="anchor-2">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow3 = !ziliaoShow3"
                            :style="{ transform: ziliaoShow3 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>工艺-已完成</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="工件/料号/状态"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow3">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="工艺说明" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="完成时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="状态" align="center"> </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class="orderTable" id="anchor-3">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow4 = !ziliaoShow4"
                            :style="{ transform: ziliaoShow4 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>加工排期-已完成</span>
                        <span class="zanwei">（2022-02-25 — 2022-06-01/暂未排期）</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="工件/料号/工艺/状态"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow4">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="设备" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="计划时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="实际时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="加工状态" align="center"> </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable" id="anchor-4">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow5 = !ziliaoShow5"
                            :style="{ transform: ziliaoShow5 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>编程-进行中</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="请输入料号名称"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow5">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="数量" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="设备" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="操作人" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="完成时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="状态" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="handleClick(scope.row)" class="caozuoStyle">查看</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable" id="anchor-5">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow6 = !ziliaoShow6"
                            :style="{ transform: ziliaoShow6 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>CAD-进行中</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="工件/料号/工艺/状态"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow6">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="图纸数量" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="设备" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="操作人" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="完成时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="状态" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="handleClick(scope.row)" class="caozuoStyle">查看</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class="orderTable" id="anchor-6">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow7 = !ziliaoShow7"
                            :style="{ transform: ziliaoShow7 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>机台加工-进行中</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="工件/料号/工艺/状态"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow7">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="工艺" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="代码数量" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="完成数量" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="设备" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="实际开始时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="实际结束时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="状态" align="center"> </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable" id="anchor-7">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow8 = !ziliaoShow8"
                            :style="{ transform: ziliaoShow8 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>装配-未开始</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="工件/料号/状态"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow8">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="料号编号" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="料号名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="工件" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="计划完成时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="实际完成时间" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="状态" align="center"> </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable" id="anchor-8">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow9 = !ziliaoShow9"
                            :style="{ transform: ziliaoShow9 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>试模-未开始</span>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow9">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="状态" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="说明" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="操作人" align="center"> </el-table-column>
                        <el-table-column prop="address" label="操作" align="center">
                            <slot slot-scope="scope">
                                <div flex="cross:center main:center">
                                    <div @click="handleClick(scope.row)" class="caozuoStyle">查看</div>
                                </div>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="orderTable" id="anchor-9">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow10 = !ziliaoShow10"
                            :style="{ transform: ziliaoShow10 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>交付-已完成</span>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow10">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="模具名称" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="预计交付时间" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="实际交付时间" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="客户名称" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="客户联系人" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="客户联系电话" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="配送方式" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="物流公司" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="单号" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="物流联系人" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="客户累计订单" align="center"> </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="orderTable" id="anchor-10">
                <div class="tableTop" flex="main:justify">
                    <div flex="cross:center">
                        <div
                            @click="ziliaoShow11 = !ziliaoShow11"
                            :style="{ transform: ziliaoShow11 ? 'rotate(0deg)' : 'rotate(180deg)' }"
                            class="shousuoIconBox"
                            flex="cross:center main:center"
                        >
                            <i class="el-icon-d-arrow-right shousuoIcon"></i>
                        </div>
                        <span>结单-已完成</span>
                    </div>
                    <div class="detailSearch" flex="cross:center">
                        <el-input v-model="lhParms.QueryString" clearable placeholder="请输入料号名称"></el-input>
                        <el-button class="orderBtn mar5" @click="lhSearch()">搜索</el-button>
                    </div>
                </div>
                <div class="tableod tableMax" v-show="ziliaoShow11">
                    <el-table
                        :data="lhData"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="headerStyle"
                        style="width: 100%"
                        max-height="500"
                    >
                        <el-table-column prop="date" label="序号" width="100" align="center">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (lhParms.PageIndex - 1) * lhParms.PageSize + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="code" label="付款账户" width="180" align="center"> </el-table-column>
                        <el-table-column prop="bomType_Name" label="资金说明" width="180" align="center"> </el-table-column>
                        <el-table-column prop="name" label="付款时间" align="center"> </el-table-column>
                        <el-table-column prop="processFlow_name" label="客户名称" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="联系人" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="联系电话" align="center"> </el-table-column>
                        <el-table-column prop="CraftList" label="操作人" align="center"> </el-table-column>
                    </el-table>
                    <div class="pagenofixed">
                        <el-pagination
                            @size-change="lhSizeChange"
                            @current-change="lhCurrentChange"
                            :current-page="lhParms.PageIndex"
                            :page-sizes="[20, 50, 100]"
                            :page-size="lhParms.PageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="lhtotal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialogclass">
            <el-dialog title="上传记录" :visible.sync="moreDio" width="800px">
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

                            <el-table-column prop="amount" label="造型图片预览" align="center" width="280">
                                <slot slot-scope="scope">
                                    <div class="selimgBox" flex=" cross:center">
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic1" @click="bigImg(scope.row.pic1)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic2" @click="bigImg(scope.row.pic2)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic3" @click="bigImg(scope.row.pic3)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                    </div>
                                </slot>
                            </el-table-column>
                            <el-table-column prop="ctTime" label="上传时间" align="center" width="180"> </el-table-column>
                            <el-table-column prop="remark" label="上传原因" show-overflow-tooltip align="center">
                            </el-table-column>
                            <el-table-column prop="address" label="状态" align="center">
                                <slot slot-scope="scope">
                                    <span>
                                        <!-- 待创建-1   未通过1   通过2  已创建0 -->
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
        <div class="dialogclass">
            <el-dialog title="代码详情" :visible.sync="moreDio" width="800px">
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
                            <el-table-column prop="ctTime" label="代码名称" align="center" width="180"> </el-table-column>
                            <el-table-column prop="remark" label="代码大小" show-overflow-tooltip align="center"></el-table-column>
                            <el-table-column prop="remark" label="说明" show-overflow-tooltip align="center">
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
        <div class="dialogclass">
            <el-dialog title="CAD图片" :visible.sync="moreDio" width="800px">
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

                            <el-table-column prop="amount" label="图片预览" align="center" width="280">
                                <slot slot-scope="scope">
                                    <div class="selimgBox" flex=" cross:center">
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic1" @click="bigImg(scope.row.pic1)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic1"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic2" @click="bigImg(scope.row.pic2)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic2"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="imgLeft imgleftBoxTable" v-if="scope.row.pic3" @click="bigImg(scope.row.pic3)">
                                                <el-image
                                                    style="width: 50px; height: 40px;margin-right: 32px"
                                                    :src="seeDaima + 'Files/ProgramPic/' + scope.row.pic3"
                                                    fit="contain"
                                                ></el-image>
                                            </div>
                                        </div>
                                    </div>
                                </slot>
                            </el-table-column>
                            <el-table-column prop="ctTime" label="上传时间" align="center" width="180"> </el-table-column>
                            
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
    </div>
</template>

<script>
import {
    BomList,
    
} from '@/api/design';

export default {
    components: {},
    data() {
        return {
            tableData: [],
            
           
            code: '',
            baseId: 0,
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
            lhData: [],
            lhtotal: 0,
            lhchoose: '',
            fileList: [],
            upDaimaUrl: '',
            fileList2: [],
            pic1: '',
            pic2: '',
            ziliaoShow1: true,
            ziliaoShow2: true,
            ziliaoShow3: true,
            ziliaoShow4: true,
            ziliaoShow5: true,
            ziliaoShow6: true,
            ziliaoShow7: true,
            ziliaoShow8: true,
            ziliaoShow9: true,
            ziliaoShow10: true,
            ziliaoShow11: true,

            orderList: [
                { id: 1, name: '造型' },
                { id: 2, name: 'BOM清单' },
                { id: 3, name: '工艺' },
                { id: 4, name: '加工排期' },
                { id: 5, name: '编程' },
                { id: 6, name: 'CAD图片' },
                { id: 7, name: '加工机台' },
                { id: 8, name: '装配' },
                { id: 9, name: '模具试模' },
                { id: 10, name: '交付' },
                { id: 11, name: '结单' }
            ],
            navLiNum: 0,
            nameMing: false,
            navLiNumclick:0,
            moreDio:false,
            getStatus: {
                '-1': '待创建',
                0: '待审核',
                1: '未通过',
                2: '通过',
                3: '已创建'
            },
            statusColor: {
                '-1': '#FFA300',
                0: '#FFA300',
                1: '#FF0000',
                2: '#18a837',
                3: '#000'
            },
            editDetailParams:{},
            edTotal:0,
            editDetailList:[]
        };
    },
    computed: {},
    watch: {},
    created() {
        if (localStorage.getItem('baseId')) {
            this.baseId = localStorage.getItem('baseId');
        } else {
            this.baseId = this.$route.query.baseId;
        }

        this.code = this.$route.query.code;
        // this.amount = this.$route.query.amount;
        this.order_name = this.$route.query.order_name;
        this.buyer_name = this.$route.query.buyer_name;
        this.testTime = this.$route.query.testTime;
        this.endTime = this.$route.query.endTime;
        this.order_id = this.$route.query.order_id;
        // this.pic1 = this.$route.query.pic1;
        // this.pic2 = this.$route.query.pic2;
        // // console.log(this.pic1,this.pic2,'-----------');
        // if(this.pic1){
        //     let pic1obj={name:'图片一',url:this.pic1}
        //      this.fileList.push(pic1obj)
        // }
        // if(this.pic2){
        //     let pic1obj2={name:'图片二',url:this.pic2}
        //     this.fileList2.push(pic1obj2)
        // }

        this.getBomList();

    },
    mounted() {
       
        // console.log(localStorage.getItem('upDaima'),'上传');
        this.upDaimaUrl = localStorage.getItem('upDaima');
    },
    methods: {
        mouseOver(index) {
            this.navLiNum = index;
        },
        mouseLeave(index) {
            this.navLiNum = '';
        },
        nameEnter() {
            this.nameMing = true;
        },
        nameLeave() {
            this.nameMing = false;
        },
        clearFiles() {
            this.$refs['my-upload'].clearFiles();
        },
        clearFiles2() {
            this.$refs['my-upload2'].clearFiles();
        },
        
        
        
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        lhSizeChange(val) {
            this.lhParms.PageSize = val;
            this.getBomList();
        },
        lhCurrentChange(val) {
            this.lhParms.PageIndex = val;
            this.getBomList();
        },
        edhandleSizeChange(val){},
        edhandleCurrentChange(val){},

        
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        
        

        getBomList() {
            this.lhParms.BaseID = this.baseId;
            BomList(this.lhParms).then((res) => {
                let { ReturnCode, Data, PageCount } = res;
                if (ReturnCode == 200) {
                    this.lhData = Data;
                    this.lhtotal = PageCount;
                }
            });
        },
        

        
        
       
        lhSearch() {
            this.getBomList();
        },
        
        
        
        
        
        
        
        

        goAnchor(selector, index) {
            this.navLiNumclick = index;
            console.log(selector, 'selector');

            const scrollBox = document.querySelector('#app-root'); // 容器
            let distance = scrollBox.scrollTop;
            const curTag = this.$el.querySelector('#' + selector); // 节点tag
            const offsetTop = curTag.offsetTop - 155; // 滚动距离
            let step = offsetTop / 50;
            if (offsetTop > distance) {
                smoothDown();
            } else {
                const newTotal = distance - offsetTop;
                step = newTotal / 50;
                smoothUp();
            }
            scrollBox.scrollTop = offsetTop;
            function smoothDown() {
                if (distance < offsetTop) {
                    distance += step;
                    scrollBox.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                } else {
                    scrollBox.scrollTop = offsetTop;
                }
            }
            function smoothUp() {
                if (distance > offsetTop) {
                    distance -= step;
                    scrollBox.scrollTop = distance;
                    setTimeout(smoothUp, 10);
                } else {
                    scrollBox.scrollTop = offsetTop;
                }
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
<style lang='scss' scoped>
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