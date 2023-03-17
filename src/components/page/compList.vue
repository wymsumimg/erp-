<template>
    <div class="homePageIndex themeBg">
        <!-- 这是首页 -->
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center ">
                <comp-logo></comp-logo>
                <div class="cpmlist" flex="cross:center ">
                    <div class="clFangKuai"></div>
                    <div class="clT">公司列表</div>
                </div>
            </div>

            <out-login></out-login>
        </div>
        <div class="gongDanCenter">
            <div class="gdc_top">
                <ul flex="main:justify">
                    <li flex="dir:top main:center">
                        <div class="cqgd" flex="cross:center ">
                            <span class="cqgd_l">工厂数：</span><span class="chaoColor">{{gongchang.company_count}}<span class="ge">个</span></span>
                        </div>
                        <div class="cqgd jrdq" flex="cross:center ">
                            <span class="cqgd_l">现有接单数：</span><span class="chaoColor">{{gongchang.jiedan_total_count}}<span class="ge">个</span></span>
                        </div>
                    </li>
                    <li flex="dir:top main:center">
                        <div class="cqgd" flex="cross:center ">
                            <span class="cqgd_l">待完成工单：</span><span class="chaoColor chaoColorRed">{{gongchang.dwc_status_count}}<span class="ge">个</span></span>
                        </div>
                        <div class="cqgd jrdq" flex="cross:center ">
                            <span class="cqgd_l">已完成工单：</span><span class="chaoColor chaoColorRed">{{gongchang.ywc_status_count}}<span class="ge">个</span></span>
                        </div>
                    </li>
                    <li flex="dir:top main:center">
                        <div class="cqgd" flex="cross:center ">
                            <span class="cqgd_l">今日新增工单：</span
                            ><span class="chaoColor chaoColorBlue">{{gongchang.today_gongdan_count}}<span class="ge">个</span></span>
                        </div>
                        <div class="cqgd jrdq" flex="cross:center ">
                            <span class="cqgd_l">总工单：</span><span class="chaoColor chaoColorBlue">{{gongchang.gongdan_count}}<span class="ge">个</span></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="gdc_bott comp_gdc_bott">
                <div class="gb_add" flex="main:justify">
                    <div class="gb_add_l" flex="cross:center" @click="addComp()">
                        <i class="el-icon-plus"></i>
                        <span class="gb_comp">添加公司</span>
                    </div>
                    <div class="gb_add_r" flex>
                        <!-- <div class="gb_add_r_c" flex="cross:center">
                            <span class="gb_crate">可否承接工单：</span>
                            <el-select v-model="createVal" placeholder="请选择">
                                <el-option v-for="item in createList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gb_add_r_n gb_add_r_c" flex="cross:center">
                            <span class="gb_crate">可否新建工单：</span>
                            <el-select v-model="newVal" placeholder="请选择">
                                <el-option v-for="item in newList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </div> -->
                        <div class="comName" flex="cross:center">
                            <el-input v-model="zcompPama.obj.name" placeholder="公司名称" clearable></el-input>
                            <el-button type="primary" @click="searchCom()">搜索</el-button>
                        </div>
                    </div>
                </div>
                <div class="gb_table cp_table">
                    <el-table
                        v-loading="zloadingcomp"
                        element-loading-background="transparent"
                        border
                        :header-cell-class-name="headerStyle"
                        :row-style="{ height: '0.65rem' }"
                        :data="zdaiCompList"
                        class="elTabledetail"
                        style="width: 100%"
                        :stripe="true"
                    >
                        <el-table-column prop="room" label="序号" align="center" width="73px">
                            <slot slot-scope="scope">
                                <span class="white">
                                    <span>{{ (zcompPama.pager.page - 1) * zcompPama.pager.rows + scope.$index + 1 }}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="公司名称" align="center">
                            <slot slot-scope="scope">
                                <span class="white"> {{ scope.row.name | noValue }} </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="地址" align="center">
                            <slot slot-scope="scope">
                                <span class="white"> {{ scope.row.address | noValue }} </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="可否新建工单" align="center">
                            <slot slot-scope="scope">
                                <span class="white"> {{ gongdan[scope.row.ifcreategd] | noValue }} </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="可否承接工单" align="center">
                            <slot slot-scope="scope">
                                <span class="white"> {{ gongdan[scope.row.ifacceptgd] | noValue }} </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="创建日期" align="center">
                            <slot slot-scope="scope">
                                <span class="white"> {{ scope.row.createtime | noValue }} </span>
                            </slot>
                        </el-table-column>
                        <el-table-column prop="name" label="查看代工厂" align="center">
                            <slot slot-scope="scope">
                                <el-button type="text" @click="letSee(scope.row)">查看</el-button>
                                <el-button type="text" @click="xiucom(scope.row)">修改</el-button>
                            </slot>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pageSize">
                    <el-pagination
                        @size-change="zdaiSizeChange"
                        @current-change="zcurrentDai"
                        :current-page="zcompPama.pager.page"
                        :page-size="zcompPama.pager.rows"
                        layout="total,  prev, pager, next, jumper"
                        :total="zdaiTotal"
                        background
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="daigongchang">
            <el-dialog title="代工厂列表" :visible.sync="dialogTableVisible" width="80%">
                <el-table
                    v-loading="loadingcomp"
                    element-loading-background="transparent"
                    border
                    :header-cell-class-name="headerStyleDia"
                    :row-style="{ height: '0.6rem' }"
                    :data="daiCompList"
                    class="elTabledetail"
                    style="width: 100%"
                    :stripe="true"
                >
                    <el-table-column prop="room" label="序号" align="center" width="73px">
                        <slot slot-scope="scope">
                            <span class="white">
                                <span>{{ (compPama.pager.page - 1) * compPama.pager.rows + scope.$index + 1 }}</span>
                            </span>
                        </slot>
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="id" align="center">
                        <slot slot-scope="scope">
                            <span class="letsee"> {{ scope.row.ID | noValue }} </span>
                        </slot>
                    </el-table-column> -->
                    <el-table-column prop="name" label="公司名称" align="center">
                        <slot slot-scope="scope">
                            <span class="white"> {{ scope.row.name | noValue }} </span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="name" label="地址" align="center">
                        <slot slot-scope="scope">
                            <span class="white"> {{ scope.row.address | noValue }} </span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="name" label="创建日期" align="center">
                        <slot slot-scope="scope">
                            <span class="white"> {{ scope.row.createtime | noValue }} </span>
                        </slot>
                    </el-table-column>
                </el-table>
                <div class="diopage">
                    <el-pagination
                        @size-change="daiSizeChange"
                        @current-change="currentDai"
                        :current-page="compPama.pager.page"
                        :page-size="compPama.pager.rows"
                        layout="total,  prev, pager, next, jumper"
                        :total="daiTotal"
                        background
                    >
                    </el-pagination>
                </div>
            </el-dialog>
        </div>
        <div class="addBox">
            <el-dialog :title="xiugai==0?'添加公司':'修改公司'" :visible.sync="addvisible" width="55%">
                <div class="ab_bxo">
                    <el-form ref="form" :model="form" label-width="120px" label-position="right">
                        <div flex="main:justify">
                            <div>
                                <el-form-item label="公司名称：">
                                    <el-input v-model="name"></el-input>
                                </el-form-item>
                                <el-form-item label="默认用户名：">
                                    <el-input v-model="username"></el-input>
                                </el-form-item>
                                <el-form-item label="上级关联工厂：">
                                    <el-select v-model="compID">
                                        <el-option
                                            :label="item.name"
                                            :value="item.id"
                                            v-for="(item, index) in xialaDai"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="公司地址：">
                                    <el-input v-model="address"></el-input>
                                </el-form-item>
                                <el-form-item label="默认密码：">
                                    <el-input v-model="userpwd"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div flex>
                            <div style="width: 40%">
                                <el-form-item label="可否新建工单：">
                                    <el-radio-group v-model="ifcreategd">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="可否承接工单：">
                                    <el-radio-group v-model="ifacceptgd">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addCo()">{{xiugai==0?'添加':'保存'}}</el-button>
                    <el-button @click="cancelAdd()">取消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {} from '@/api/api';
import compLogo from './component/compLogo.vue';
import outLogin from '../page/component/outLogin.vue'
export default {
    components: { compLogo ,outLogin},
    data() {
        return {
            checkNum: 0,
            createVal: 1,
            createList: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                }
            ],
            newVal: 1,
            newList: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                }
            ],
            compVal: '',
            loading: false,
            dialogTableVisible: false,
            gridData: [{}, {}, {}],
            loadingMX: false,
            addvisible: false,
            form: {},
            zcompPama:{
                "pager":{
                        "rows":6,
                        "page":1
                },
                "obj":{
                    "id":null, 
                    "name":"" ,
                    "comp_id": 0
                }
            },
            zdaiCompList:[],
            zdaiTotal:0,

            compPama:{
                "pager":{
                        "rows":10,
                        "page":1
                },
                "obj":{
                    "id":null, 
                    "name":"" ,
                    "comp_id": 0
                }
            },
            daiCompList:[],
            daiTotal:0,

            gongdan:{
                '1':'是',
                '0':'否',

            },
            zloadingcomp:true,
            loadingcomp:true,
            name:"",
            username:"",
            address:"",
            userpwd:"",
            ifcreategd:'0',
            ifacceptgd:'0',
            xialaDai:[],
            compID:"",
            xiugai:0,
            gongchang:{}
        };
    },
    computed: {},

    mounted() {
        function resizeFont() {
            //获取屏幕宽度
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; //设计图参考宽度
            let design = 1920;
            if (clientWidth <= 820) {
                let rem = 820 / 19.2;
                document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
            } else {
                // if (clientWidth > 1920)
                //     document.getElementsByTagName('html').item(0).style.fontSize = '92px';
                // else
                document.getElementsByTagName('html').item(0).style.fontSize = (clientWidth / design) * 95.5 + 'px';
            }
        }
        resizeFont();
        window.onresize = function () {
            resizeFont();
        };

        this.zpostQuery_company_list()
        this.postquery_tongji_list()
    },
    methods: {
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        headerStyleDia({ row, column, rowIndex, columnIndex }) {
            return 'tableStyleDia';
        },
        letSee(row) {
            this.postQuery_company_list(row.id)
            this.dialogTableVisible = true;
        },
        addComp() {
            this.addvisible = true;
            this.getcomp()
        },
        cancelAdd() {
            this.addvisible = false;

            
        },
        getcomp(){
            let compPama= {
                pager: {
                    rows: 2000,
                    page: 1
                },
                obj: {
                    name: '',
                    comp_id: localStorage.getItem('comp_id')
                }
            }
            compPama.obj.comp_id = localStorage.getItem('comp_id')
            query_company_list(compPama).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.xialaDai = Data.rows;
                    console.log(this.xialaDai,'--------');
                }
            });

        },
        addCo() {
            if(this.name==""){
                this.$message.warning('请输入公司名称')
                return
            }
            if(this.address==""){
                this.$message.warning('请输入公司地址')
                return
            }
            if(this.username==""){
                this.$message.warning('请输入默认用户名')
                return
            }
            if(this.userpwd==""){
                this.$message.warning('请输入默认密码')
                return
            }
            if(this.compID==""){
                this.$message.warning('请选择关联工厂')
                return
            }
            let params={
                    "id":this.xiugai, //0=新增，>0修改
                    "name":this.name,
                    "address":this.address,
                    "ifcreategd":this.ifcreategd, // 是否创建工单，平台添加根据表单选项，非平台则传0
                    "ifacceptgd":this.ifacceptgd, // 是否接受工单，平台添加根据表单选项，非平台则传0
                    "ifadmin":1, // 平台=1，公司=0,
                    "username":this.username,
                    "userpwd":this.userpwd,
                    "comp_id":this.compID //上级公司ID，没有则0，平台添加则是下拉列表选项，公司添加，则=当前登录的公司
                }
            add_compnay(params).then(res=>{
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.$message.success('添加公司成功')
                    this.addvisible=false
                    this.zpostQuery_company_list()
                    this.xiugai=0

                }
            })
        },
        zcurrentDai(val){
            this.zcompPama.pager.page=val
            this.zpostQuery_company_list()
        },
        zdaiSizeChange(val){
            this.zcompPama.pager.rows=val
            this.zpostQuery_company_list()
        },
        zpostQuery_company_list(){
            this.zcompPama.obj.comp_id=localStorage.getItem('comp_id')
            query_company_list(this.zcompPama).then(res=>{
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.zdaiCompList=Data.rows
                    this.zdaiTotal=Data.total
                }
                this.zloadingcomp=false
            })
        },
        currentDai(val){
            this.compPama.pager.page=val
            this.postQuery_company_list()
        },
        daiSizeChange(val){
            this.compPama.pager.rows=val
            this.postQuery_company_list()
        },
        postQuery_company_list(id){
            this.compPama.obj.comp_id= Number(id)
            query_company_list(this.compPama).then(res=>{
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.daiCompList=Data.rows
                    this.daiTotal=Data.total
                }
                this.loadingcomp=false
            })
        },
        searchCom(){
            this.zpostQuery_company_list()
        },
        xiucom(row){
             this.addvisible=true
             this.getcomp()
             console.log(row,'----');
             this.name=row.name
            this.address=row.address
            this.ifcreategd=String(row.ifcreategd)
            this.ifacceptgd=String(row.ifacceptgd)
            // this.compID=row.id

            
            let params={
                comp_id:row.id  //不是公司id 不改
            }
            query_user(params).then(res=>{
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.username=Data[0]?Data[0].name:""
                    this.userpwd=Data[0]?Data[0].pwd:""
                }
            })

            this.xiugai=row.id
        },
        postquery_tongji_list(){
            let params={
                comp_id:0
            }
            query_tongji_list(params).then(res=>{
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gongchang=Data
                }
            })
        },
    },

    watch: {},
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss'>
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
