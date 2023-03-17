<template>
    <div class="operationGuide container" flex="main:center">
        <div class="ogcontent">
            <div class="ogleft">
                <div class="oltitle">操作指引</div>

                <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    style="margin: 0 20px"
                    @blur="styleBlur"
                    @focus="styleFocus"
                    clearable
                >
                    <i
                        v-show="!state"
                        class="el-icon-search"
                        slot="suffix"
                        style="margin: 12px"
                        :style="styleActive ? 'color:#496bff' : ''"
                        @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                        <div class="autocomplete-choose-name" v-html="htmlValue(item.value.split('.')[1])"></div>
                    </template>
                </el-autocomplete>

                <ul class="olUl">
                    <li
                        v-for="(item, index) in firstTitle"
                        :key="index"
                        :style="{
                            color: firstActive == item.id ? '#2A5389' : '#181818',
                            fontWeight: firstActive == item.id ? '600' : '400'
                        }"
                        @click="firstClick(item)"
                    >
                        {{ item.value }}
                    </li>
                </ul>
            </div>
            <div class="ogcontent">
                <div class="octitle">
                    <div class="ocorder" v-for="(item, index) in firstTitle" :key="index" v-show="firstActive == item.id">
                        {{ item.value }}
                    </div>
                    <div class="octime">更新时间：2022-4-13</div>
                </div>
                <div class="bonheight" id="appRoot">
                    <div v-for="(itemes, indexes) in secondTitle" :key="indexes" v-show="indexes + 1 == firstActive">
                        <div class="ocNeoRong" v-for="(item, index) in itemes" :key="index" :id="'anchor-' + item.id">
                            <div class="ocNeoRongName" :style="highlight == item.id ? 'color:#2a5389;font-weight: 600;' : ''">
                                {{ item.value }}
                            </div>
                            <div class="octext">
                                <span class="oc-1">{{ item.oc1 }}</span>
                                <span class="oc-2" @click="jumpLink(item.ocUrl)">{{ item.oc2 }}</span>
                                <span class="oc-3">{{ item.oc3 }}</span>
                                <span class="oc-2" @click="jumpLink2(item.ocUrl2)">{{ item.oc22 }}</span>
                                <span class="oc-3">{{ item.oc33 }}</span>
                                <span class="oc-img" @click="seeImg(item.ocImg)" v-show="item.ocImg"> 查看大图 > </span>
                            </div>
                        </div>
                        <div style="height: 637px"></div>
                    </div>
                </div>
            </div>
            <enlarge-img
                :imgBigTu="imgBigTu"
                :imgwidth="imgwidth"
                :dialogVisible="dialogVisible"
                v-if="dialogVisible"
                @dioClose="dioClose"
            ></enlarge-img>
            <div class="ogright">
                <div class="ortitle">本页目录</div>
                <ul
                    class="orUl"
                    :ref="'menu' + indexes"
                    v-for="(itemes, indexes) in secondTitle"
                    :key="indexes"
                    v-show="indexes + 1 == firstActive"
                >
                    <li
                        v-for="(item, index) in itemes"
                        :key="index"
                        :style="{
                            color: secondActive == index + 1 ? '#2A5389' : '#181818',
                            borderLeft: secondActive == index + 1 ? '6px solid #2A5389' : '',
                            paddingLeft: secondActive == index + 1 ? '14px' : '20px',
                            fontWeight: secondActive == index + 1 ? '600' : '400'
                        }"
                        @click="muluClick(index, 'anchor-' + item.id)"
                    >
                        {{ item.value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
var baseURL = window.baseURL.split('api')[0];
export default {
    components: {},
    data() {
        return {
            state: '',
            styleActive: false,
            highlight: Number,
            firstTitle: [
                { id: 1, value: '订单相关问题' },
                { id: 2, value: '设计相关问题' },
                { id: 3, value: '工艺相关问题' },
                { id: 4, value: '生产管理相关问题' },
                { id: 5, value: '编程管理相关问题' },
                { id: 6, value: '数据库相关问题' }
            ],
            firstActive: 1,
            secondTitle: [
                [
                    {
                        id: 1,
                        fatherId: 1,
                        index: 0,
                        value: '1.如何创建订单？',
                        ocUrl: '/orderList',
                        ocUrl2: '/customList',
                        oc1: '在',
                        oc2: '“订单列表”',
                        oc3: '页面中进行添加即可。注：创建订单之前需要确认客户是否已经录入到系统中，如果没有则需要在',
                        oc22: '“客户列表”',
                        oc33: '中添加。',
                        ocImg: baseURL + 'helpImg/如何创建订单.png'
                    },
                    {
                        id: 2,
                        fatherId: 1,
                        index: 1,
                        value: '2.如何添加客户？',
                        ocUrl: '/customList',
                        oc1: '在',
                        oc2: '“客户列表”',
                        oc3: '页面中进行添加即可。注：录入前需要提前收集客户信息。',
                        ocImg: baseURL + 'helpImg/如何添加客户.png'
                    },
                    {
                        id: 3,
                        fatherId: 1,
                        index: 2,
                        value: '3.如何修改订单信息？',
                        ocUrl: '/orderList',
                        oc1: '在',
                        oc2: '“订单列表”',
                        oc3: '页面中找到要修改的订单，点击“详情”，进入详情页点击“编辑”进行修改即可。',
                        ocImg: baseURL + 'helpImg/修改订单.png'
                    },
                    {
                        id: 4,
                        fatherId: 1,
                        index: 3,
                        value: '4.如何修改客户信息？',
                        ocUrl: '/customList',
                        oc1: '在',
                        oc2: '“客户列表”',
                        oc3: '页面找到需要修改的客户信息点击“编辑”，重新输入客户信息修改即可。',
                        ocImg: baseURL + 'helpImg/如何修改客户信息.png'
                    },
                    {
                        id: 5,
                        fatherId: 1,
                        index: 4,
                        value: '5.如何取消订单任务？',
                        ocUrl: '/orderList',
                        oc1: '在',
                        oc2: '“订单列表”',
                        oc3: '中找到需要取消的订单，点击“取消”即可。注：但需要填写取消原因。',
                        ocImg: ''
                    },
                    {
                        id: 6,
                        fatherId: 1,
                        index: 5,
                        value: '6.如何删除订单？',
                        ocUrl: '/orderList',
                        oc1: '在',
                        oc2: '“订单列表”',
                        oc3: '中找到需要删除的订单，点击“删除”即可。注：删除的前提是此订单的状态为“待设计”才可以删除成功。',
                        ocImg: ''
                    },
                    {
                        id: 7,
                        fatherId: 1,
                        index: 6,
                        value: '7.如何删除客户？',
                        ocUrl: '/customList',
                        oc1: '在',
                        oc2: '“客户列表”',
                        oc3: '页面找到需要删除的客户信息，点击“删除”即可；若此客户有未完结的订单，是无法删除的。',
                        ocImg: ''
                    },
                    {
                        id: 8,
                        fatherId: 1,
                        index: 7,
                        value: '8.如何审核图纸？',
                        ocUrl: '/orderList',
                        oc1: '在',
                        oc2: '“订单列表”',
                        oc3: '页面，找到状态为“待审核”的订单，点击“详情”，在详情页对图纸进行审核即可。',
                        ocImg: baseURL + 'helpImg/如何审核造型图片.png'
                    },
                    {
                        id: 9,
                        fatherId: 1,
                        index: 8,
                        value: '9.订单完成后怎么办？',
                        ocUrl: '/orderList',
                        oc1: '订单试模完成后，在',
                        oc2: '“订单列表”',
                        oc3: '中找到该订单点击“交付”即可。',
                        ocImg: ''
                    }
                ],
                [
                    {
                        id: 10,
                        fatherId: 2,
                        index: 0,
                        value: '1.什么是造型设计？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '造型设计是针对销售上传的订单要求设计出模具渲染图纸、效果图以及相关的工程文件。',
                        ocImg: ''
                    },
                    {
                        id: 11,
                        fatherId: 2,
                        index: 1,
                        value: '2.如何上传造型图纸？',
                        ocUrl: '/modellingGroup',
                        oc1: '在',
                        oc2: '“造型设计”',
                        oc3: '页面找到需要上传图片的订单且此订单状态为“待设计”或“未通过”时，点击“上传图片”进行上传即可。',
                        ocImg: baseURL + 'helpImg/如何上传造型图片.png'
                    },
                    {
                        id: 12,
                        fatherId: 2,
                        index: 2,
                        value: '3.如何上传造型文件？',
                        ocUrl: '/modellingGroup',
                        oc1: '在',
                        oc2: '“造型设计”',
                        oc3: '页面找到需要上传文件的订单且此订单状态为“通过”时，点击“上传文件”进行上传即可。注：上传后不可更改。',
                        ocImg: baseURL + 'helpImg/如何上传文件.png'
                    },
                    {
                        id: 13,
                        fatherId: 2,
                        index: 3,
                        value: '4.未通过订单如何查看审核结果？',
                        ocUrl: '/modellingGroup',
                        oc1: '当订单状态为“未通过”时，想要查看驳回原因，则点击此订单的',
                        oc2: '“修改详情”',
                        oc3: '进行查看即可。',
                        ocImg: baseURL + 'helpImg/未通过订单查看原因.png'
                    },
                    {
                        id: 14,
                        fatherId: 2,
                        index: 4,
                        value: '5.什么是BOM设计？',
                        ocUrl: '/customList',
                        oc1: '',
                        oc2: '',
                        oc3: '根据模具的造型图纸及工程文件整理制作模具所需要的原材料和标准件清单。',
                        ocImg: ''
                    },
                    {
                        id: 15,
                        fatherId: 2,
                        index: 5,
                        value: '6.如何进行BOM设计？',
                        ocUrl: '/bomGroup',
                        oc1: '打开',
                        oc2: '“BOM设计”',
                        oc3: '页面，找到需要创建或编辑的订单，同时订单状态为“待设计”或“设计完成”，点击“创建”（状态为待设计）或者“编辑”（状态为设计完成）进入BOM设计页进行设计即可。',
                        ocImg: baseURL + 'helpImg/BOM设计.png'
                    },
                    {
                        id: 16,
                        fatherId: 2,
                        index: 6,
                        value: '7.如何上传CAD图纸？',
                        ocUrl: '/programming',
                        oc1: '上传CAD图纸的前提为此订单已创建工艺流程，然后在',
                        oc2: '“CAD列表”',
                        oc3: '中找到需要上传图纸的工艺且此工艺状态为“待设计”，点击“上传”即可。注：只有此工艺在已排加工任务的情况下才能在CAD列表中找到。',
                        ocImg: baseURL + 'helpImg/CAD上传.png'
                    },
                    {
                        id: 17,
                        fatherId: 2,
                        index: 7,
                        value: '8.CAD图纸如何表示上传完毕？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '当某个工艺的CAD图纸全部上传完成，点击“完成”同时状态变为“设计完成”则 表示上传完毕。',
                        ocImg: ''
                    },
                    {
                        id: 18,
                        fatherId: 2,
                        index: 8,
                        value: '9.如何修改设计完成的CAD？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '如果工艺状态为“设计完成”，则点击此工艺的“撤销”即可，同时状态变为“待设计”。注：正在加工的工艺无法进行更改。',
                        ocImg: baseURL + 'helpImg/CAD撤销.png'
                    }
                ],
                [
                    {
                        id: 19,
                        fatherId: 3,
                        index: 0,
                        value: '1.如何创建工艺流程？',
                        ocUrl: '/craftGroup',
                        oc1: '在',
                        oc2: '“工艺列表”',
                        oc3: '中找到需要创建工艺流程的订单，点击“创建”进入模具详情页，在“料号信息”列表找到需要创建的工件料号，点击“创建”进行添加即可。',
                        ocImg: baseURL + 'helpImg/工艺流程创建.png'
                    },
                    {
                        id: 20,
                        fatherId: 3,
                        index: 1,
                        value: '2.添加工艺流程时需要注意那些？',
                        ocUrl: '',
                        oc1: '(1)对已经加工排期的工艺，则标准工艺流程及此工艺均不可更改（不包括调换顺序）',
                        oc2: '',
                        oc3: '(2)所有工艺“是否跳过”均默认开启状态，不允许跳过需要手动点击按钮关闭。',
                        ocImg: ''
                    },
                    {
                        id: 21,
                        fatherId: 3,
                        index: 2,
                        value: '3.如何删除订单的工艺流程?',
                        ocUrl: '/craftGroup',
                        oc1: '想要清空已创建完成的工艺流程，则在',
                        oc2: '“工艺列表”',
                        oc3: '点击“删除”可清空该订单的所有的工艺流程。注：若订单已被生产管理进行排期，则无法删除。',
                        ocImg: ''
                    }
                ],
                [
                    {
                        id: 22,
                        fatherId: 4,
                        index: 0,
                        value: '1.如何创建生产任务？',
                        ocUrl: '/productionList',
                        oc1: '在订单的BOM清单设计完成的基础上进行创建，在',
                        oc2: '“生产任务”',
                        oc3: '页面找到想要创建任务的订单，点击“创建”，根据提示进行操作即可。',
                        ocImg: baseURL + 'helpImg/创建生产任务.png'
                    },
                    {
                        id: 23,
                        fatherId: 4,
                        index: 1,
                        value: '2.如何修改生产任务？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的订单，点击“编辑”进行操作即可。',
                        ocImg: baseURL + 'helpImg/编辑生产任务.png'
                    },
                    {
                        id: 24,
                        fatherId: 4,
                        index: 2,
                        value: '3.如何创建加工任务？',
                        ocUrl: '/processingPlan',
                        oc1: '在已创建生产任务的订单基础上进行创建，在',
                        oc2: '“加工任务”',
                        oc3: '页面点击“批量创建”按钮，根据提示操作即可。',
                        ocImg: baseURL + 'helpImg/创建加工任务.png'
                    },
                    {
                        id: 25,
                        fatherId: 4,
                        index: 3,
                        value: '4.如何修改加工任务？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的加工任务，点击“编辑”进行操作即可。',
                        ocImg: baseURL + 'helpImg/修改加工任务.png'
                    },
                    {
                        id: 26,
                        fatherId: 4,
                        index: 4,
                        value: '5.生产任务删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若此订单已创建加工任务，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 27,
                        fatherId: 4,
                        index: 5,
                        value: '6.加工任务删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若此订单已上传代码或者上传CAD图纸，则不可删除。',
                        ocImg: ''
                    }
                ],
                [
                    {
                        id: 28,
                        fatherId: 5,
                        index: 0,
                        value: '1.如何上传代码？',
                        ocUrl: '/listPendingOrders',
                        oc1: '在',
                        oc2: '“编程设计”',
                        oc3: '页面找到需要上传的工艺，点击“上传”，点击“选择”按钮，选择本地文件（一次只能选择一个），点击“上传”按钮即可上传成功。',
                        ocImg: baseURL + 'helpImg/编程上传文件.png'
                    },
                    {
                        id: 29,
                        fatherId: 5,
                        index: 1,
                        value: '2.如何上传图纸？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '点击“上传”，点击“图纸-加号”选择本地图片（一次只能选择一个）即可上传成功。',
                        ocImg: baseURL + 'helpImg/编程上传图片.png'
                    },
                    {
                        id: 30,
                        fatherId: 5,
                        index: 2,
                        value: '3.如何添加分组？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '第一种： 在“上传”对话框中“分组”框中输入想要添加的文字，如何选择上传文件或者上传图纸，分组名就可赋予相应的文件或者图纸；第二种：先选择上传文件，在输入分组名，也可赋予到相应文件中。',
                        ocImg: ''
                    },
                    {
                        id: 31,
                        fatherId: 5,
                        index: 3,
                        value: '4.如何设置备用代码？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '在已上传的代码列表中，勾选相应的代码的“备用”复选框，即可设置成备用代码。',
                        ocImg: baseURL + 'helpImg/编程备用代码.png'
                    },
                    {
                        id: 32,
                        fatherId: 5,
                        index: 4,
                        value: '5.删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若某一代码已加工或正在加工，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 33,
                        fatherId: 5,
                        index: 5,
                        value: '6.设计完成的订单如何继续上传代码或图纸？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若此订单未开始加工或者未加工到此工艺的最后一个代码时，可点击“撤销”，同时状态变为“待设计”即可继续上传代码或图片。',
                        ocImg: baseURL + 'helpImg/编程撤销.png'
                    }
                ],
                [
                    {
                        id: 34,
                        fatherId: 6,
                        index: 0,
                        value: '1.如何添加模具类型？',
                        ocUrl: '/moldBase',
                        oc1: '在',
                        oc2: '“模具类别”',
                        oc3: '页面的【类型名称】框中输入文字，点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建模具.png'
                    },
                    {
                        id: 35,
                        fatherId: 6,
                        index: 1,
                        value: '2.如何修改已添加的模具类型？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的模具类型，点击“编辑”，重新输入即可。',
                        ocImg: baseURL + 'helpImg/修改模具类型.png'
                    },
                    {
                        id: 36,
                        fatherId: 6,
                        index: 2,
                        value: '3.模具删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若模具类型已被订单管理创建订单时使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 37,
                        fatherId: 6,
                        index: 3,
                        value: '4.如何添加原材料？',
                        ocUrl: '/materialInventory',
                        oc1: '添加原材料首先需要创建原材料类型。在',
                        oc2: '“原材料库”',
                        oc3: '页面的【类型】框中选择或输入原材料类型，在【名称】框中输入原材料名称，点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建原材料.png'
                    },
                    {
                        id: 38,
                        fatherId: 6,
                        index: 4,
                        value: '5.如何添加原材料类型？',
                        ocUrl: '/materialInventory',
                        oc1: '在',
                        oc2: '“原材料库”',
                        oc3: '页面点击“类型管理”，在【类型】框中输入类型名称，点击“添加”按钮即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建原材料类型.png'
                    },
                    {
                        id: 39,
                        fatherId: 6,
                        index: 5,
                        value: '6.如何修改原材料？',
                        ocUrl: '/materialInventory',
                        oc1: '在',
                        oc2: '“原材料库”',
                        oc3: '页面找到想要修改的原材料，重新选择或输入类型以及名称，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改原材料.png'
                    },
                    {
                        id: 40,
                        fatherId: 6,
                        index: 6,
                        value: '7.如何修改原材料类型？',
                        ocUrl: '/typeManagement',
                        oc1: '在',
                        oc2: '“类型管理”',
                        oc3: '页面，找到想要修改的原材料类型，点击“编辑”，重新输入类型名称，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改原材料类型.png'
                    },
                    {
                        id: 41,
                        fatherId: 6,
                        index: 7,
                        value: '8.原材料删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若原材料已被BOM设计使用则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 42,
                        fatherId: 6,
                        index: 8,
                        value: '9.原材料类型删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若原材料类型已被原材料创建名称时使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 43,
                        fatherId: 6,
                        index: 9,
                        value: '10.如何添加标准件？',
                        ocUrl: '/standardPartLibrary',
                        oc1: '添加标准件首先需要添加标准件类型，然后在',
                        oc2: '“标准件库”',
                        oc3: '页面根据类型添加标准件名称，点击“添加”即可成功。',
                        ocImg: baseURL + 'helpImg/创建标准件.png'
                    },
                    {
                        id: 44,
                        fatherId: 6,
                        index: 10,
                        value: '11.如何添加标准件类型？',
                        ocUrl: '/standardPartLibrary',
                        oc1: '在',
                        oc2: '“标准件库”',
                        oc3: '页面点击“类型管理”，在【类型】框中输入类型名称，点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建标准件类型.png'
                    },
                    {
                        id: 45,
                        fatherId: 6,
                        index: 11,
                        value: '12.如何修改标准件类型？',
                        ocUrl: '/bztypeManagement',
                        oc1: '在',
                        oc2: '“类型管理”',
                        oc3: '找到想要修改的标准件类型，点击“编辑”，重新输入类型名称，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改标准件类型.png'
                    },
                    {
                        id: 46,
                        fatherId: 6,
                        index: 12,
                        value: '13.如何修改标准件？',
                        ocUrl: '/standardPartLibrary',
                        oc1: '在',
                        oc2: '“标准件库”',
                        oc3: '页面找到想要修改的标准件，点击“编辑”，重新选择或输入类型以及名称，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改标准件.png'
                    },
                    {
                        id: 47,
                        fatherId: 6,
                        index: 13,
                        value: '14.标准件删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若标准件已被BOM设计使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 48,
                        fatherId: 6,
                        index: 14,
                        value: '15.标准件类型删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若标准件类型已被标准件创建名称时使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 49,
                        fatherId: 6,
                        index: 15,
                        value: '16.如何添加标准件规格？',
                        ocUrl: '/standardPartLibrary',
                        oc1: '在',
                        oc2: '“标准件库”',
                        oc3: '页面找到想要添加规格的标准件，点击“规格”，在【尺寸】框中输入尺寸，在【价格】框中输入价格（可输入0），点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建标准件规格.png'
                    },
                    {
                        id: 50,
                        fatherId: 6,
                        index: 16,
                        value: '17.如何修改标准件规格？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的标准件，点击“规格”，再找到需要修改的规格点击“编辑”，重新输入【尺寸】和【价格】点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改标准件规格.png'
                    },
                    {
                        id: 51,
                        fatherId: 6,
                        index: 17,
                        value: '18.标准件规格删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若标准价规格已被BOM设计使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 52,
                        fatherId: 6,
                        index: 18,
                        value: '19.如何添加工件？',
                        ocUrl: '/jobLibrary',
                        oc1: '在',
                        oc2: '“工件库”',
                        oc3: '页面的【工件名称】框中输入工件名称，点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建工件.png'
                    },
                    {
                        id: 53,
                        fatherId: 6,
                        index: 19,
                        value: '20.如何修改工件？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的工件，点击“编辑”，重新输入工件名称即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改工件.png'
                    },
                    {
                        id: 54,
                        fatherId: 6,
                        index: 20,
                        value: '21.工件删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若工件已被BOM设计使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 55,
                        fatherId: 6,
                        index: 21,
                        value: '22.如何添加工艺？',
                        ocUrl: '/processDatabase',
                        oc1: '在',
                        oc2: '“工艺库”',
                        oc3: '页面的【工艺名称】框中输入工艺名称，在【所需时长】框中输入最少用时和最多用时（可选填），选择工作方式--手动或自动（默认为手动），点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建工艺.png'
                    },
                    {
                        id: 56,
                        fatherId: 6,
                        index: 22,
                        value: '23.如何修改工艺？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的工艺，点击“编辑”，重新根据提示进行输入或选择，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改工艺.png'
                    },
                    {
                        id: 57,
                        fatherId: 6,
                        index: 23,
                        value: '24.工艺删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若工艺已被工艺流程库使用，则不可删除。',
                        ocImg: ''
                    },
                    {
                        id: 58,
                        fatherId: 6,
                        index: 24,
                        value: '25.如何添加工艺流程？',
                        ocUrl: '/processLibrary',
                        oc1: '在',
                        oc2: '“工艺流程库”',
                        oc3: '页面点击“添加工艺流程”按钮，在【流程名称】框中输入流程名称，在【工艺流程】左侧框中双击或者选中工艺点击“添加”即可添加到右侧空白框中，流程顺序为添加的顺序，删除工艺与添加相反，即双击或选中右侧已添加的工艺点击“删除”，点击“添加”即可添加成功。',
                        ocImg: baseURL + 'helpImg/创建工艺流程.png'
                    },
                    {
                        id: 59,
                        fatherId: 6,
                        index: 25,
                        value: '26.如何修改工艺流程？',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '找到想要修改的工艺流程，点击“编辑”，操作方法与添加流程一致，点击“保存”即可修改成功。',
                        ocImg: baseURL + 'helpImg/修改工艺流程.png'
                    },
                    {
                        id: 60,
                        fatherId: 6,
                        index: 26,
                        value: '27.工艺流程删除说明：',
                        ocUrl: '',
                        oc1: '',
                        oc2: '',
                        oc3: '若工艺流程已被工艺管理创建工艺流程时使用，则不可删除。',
                        ocImg: ''
                    }
                ]
            ],
            secondActive: 1,
            imgBigTu: '',
            dialogVisible: false,
            imgwidth: '90%'
        };
    },
    computed: {},
    watch: {},
    methods: {
        htmlValue(val) {
            let key = this.state;
            if (key.length > 0) {
                return val.replace(new RegExp(key, 'g'), "<span style='color:#496bff;'>" + key + '</span>');
            }

            return val;
        },

        styleFocus() {
            this.styleActive = true;
        },
        styleBlur() {
            this.styleActive = false;
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.secondTitle.flat(Infinity);
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                return state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
            };
        },
        handleSelect(item) {
            this.firstActive = item.fatherId;
            this.highlight = item.id;
            this.$nextTick(() => {
                eval('this.$refs.menu' + (item.fatherId - 1))[0].scrollTop = item.index * 45;
                this.muluClick(item.index, 'anchor-' + item.id);
            });
        },
        firstClick(item) {
            document.querySelector('#appRoot').scrollTop = 0;
            this.firstActive = item.id;
            this.secondActive = 1;
        },
        muluClick(index, selector) {
            this.highlight = selector.slice(7, selector.length);
            this.secondActive = index + 1;
            // debugger
            const scrollBox = document.querySelector('#appRoot'); // 容器
            let distance = scrollBox.scrollTop;
            const curTag = this.$el.querySelector('#' + selector); // 节点tag
            const offsetTop = curTag.offsetTop - 100; // 滚动距离
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
        },
        seeImg(img) {
            console.log(img);
            this.imgBigTu = img;
            this.dialogVisible = true;
        },
        dioClose(val) {
            this.dialogVisible = val;
        },
        jumpLink(url) {
            this.$router.push(url);
        },
        jumpLink2(url) {
            this.$router.push(url);
        }
    },
    created() {},
    mounted() {
        // console.log(window.baseURL.split('api')[0],'window.baseURL');
        // this.baseURL=window.baseURL.split('api')[0]
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
<style lang="scss">
.el-autocomplete-suggestion {
    width: auto !important;
}
</style>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
