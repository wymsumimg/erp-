<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">
                <div class="title_left">用户登录</div>
            </div>
            <el-form :model="param" :rules="rules" ref="param" label-width="0px" class="ms-content">
                <div class="loginInput">
                    <el-form-item
                        prop="username"
                        class="form_container"
                        style="position: relative"
                        :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
                    >
                        <img class="topDing" src="../common/comImg/index/user.png" alt="" />
                        <el-input v-model="param.username" placeholder="请输入用户名"> </el-input>
                    </el-form-item>

                    <el-form-item
                        prop="password"
                        style="position: relative"
                        class="form_container"
                        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
                    >
                        <img class="topDing" src="../common/comImg/index/password.png" alt="" />
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm('param')"
                        >
                        </el-input>
                    </el-form-item>
                </div>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('param')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Login, RoleMenu } from '@/api/api.js';
import { toggleClass } from '../../utils/index';
export default {
    data: function () {
        return {
            isRules: {},
            // 验证码
            disabled: false,
            time: 5,
            rules: {},

            param: {
                username: '',
                password: ''
            },
            keepLogin: false,

            value: 'ch',

            themecolor: 'ff6302', //默认颜色蓝色 409eff
            login_staus: 3
        };
    },

    mounted() {
        toggleClass(document.body, 'custom-' + this.themecolor);
        this.$store.commit('setThemeColor', this.themecolor);
        let curcolor = this.$store.state.themecolor;
        // 根据全局换肤 得到全局颜色
        localStorage.setItem('themeColor', this.themecolor);
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler(newVal, oldVal) {
                if (this.$route.query.uid) {
                    // console.log(this.$route.query, '-------this.$route.query');
                    // this.login_staus = 3;
                    // console.log(this.$route.query.uid);
                    this.param.username = this.$route.query.uid;
                    this.param.password = this.$route.query.pwd;
                    // Ym9zZW5BZG1pbg  bosenAdmin
                    // MTIzNDU2  123456
                    // http://localhost:8080/#/login?uid=Ym9zZW5BZG1pbg&pwd=MTIzNDU2
                    // 解码
                    // let jieatob = atob(this.$route.query.uid);
                    // let str = decodeURI(jieatob);
                    // this.param.username = str;
                    // console.log(this.param.username, '--');

                    // let jieatob2 = atob(this.$route.query.pwd);
                    // let str2 = decodeURI(jieatob2);
                    // this.param.password = str2;
                    // console.log(this.param.password, '--');

                    // let uid = encodeURI(this.$route.query.uid); // 进行URI编码
                    // let base64uid = btoa(uid);
                    // console.log(base64uid, 'base64');
                    // let jieatob = atob(base64uid);
                    // let str = decodeURI(jieatob);
                    // this.param.username = str;
                    // console.log(this.param.username, '--');

                    // let pwd = encodeURI(this.$route.query.pwd); // 进行URI编码
                    // let base64pwd = btoa(pwd);
                    // console.log(base64pwd, 'base64');
                    // let jieatob2 = atob(base64pwd);
                    // let str2 = decodeURI(jieatob2);
                    // this.param.password = str2;
                    // console.log(this.param.password, '--');

                    // let pwd = encodeURI(this.$route.query.pwd); // 进行URI编码
                    // let base64pwd = btoa(pwd);
                    // console.log(base64, 'base64');
                    // this.param.password = base64pwd;
                    // console.log(decodeURI(pwd), '===0');
                    // console.log(encode(this.$route.query.pwd), '===2');

                    // this.param.password = this.$route.query.pwd;
                    this.getLogin(this.$route.query.path);
                }
            }
        }
    },
    methods: {
        enCode(str) {
            let code = encodeURI(str); // 进行URI编码
            let base64 = btoa(code); // 进行base64格式的编码
            return base64;
        },
        // 解码
        deCode(base64) {
            let code = atob(base64); // 把base64 先解码
            let str = decodeURI(code); //
        },
        //点击登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.param.username == '') {
                        this.$message.warning('请输入用户名');
                        return;
                    }
                    if (this.param.password == '') {
                        this.$message.warning('请输入密码');
                        return;
                    }
                    //用户名密码登录
                    // const rLoading = this.openLoading();
                    this.getLogin();
                }
            });
        },
        getLogin() {
            let params = {
                name: this.param.username,
                pwd: this.param.password
            };
            Login(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (Data.User.status == 0) {
                        this.$message.warning('当前账号已被禁用，请联系管理员');
                        return;
                    }
                    // console.log(Data);
                    // rLoading.close();
                    localStorage.setItem('comp_id', Data.User.cp_id);
                    localStorage.setItem('ManageName', Data.User.name);
                    localStorage.setItem('login_staus', Data.User.cp_id);
                    localStorage.setItem('user_id', Data.User.id);
                    localStorage.setItem('role_id', Data.User.role_id);
                    localStorage.setItem('account', Data.User.account);

                    // 0 查看9002  1 上传9001
                    let dataServe = Data.Server;
                    for (let i = 0; i < dataServe.length; i++) {
                        if (dataServe[i].type == 0) {
                            localStorage.setItem('seeDaima', dataServe[i].localServer);
                        } else if (dataServe[i].type == 1) {
                            localStorage.setItem('upDaima', dataServe[i].localServer);
                        }
                    }
                    this.getRoleMenu();
                } else {
                    // rLoading.close();
                }
            });
        },
        getRoleMenu() {
            let params = {
                ID: localStorage.getItem('role_id')
            };
            RoleMenu(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.items = Data;
                    localStorage.setItem('roleMenu', JSON.stringify(this.items));
                    this.$router.replace('/index');
                }
            });
        }
    }
};
</script>
<style lang='scss'>
.el-icon-info {
    font-size: 18px;
}
.el-icon-error {
    font-size: 18px;
}
.el-icon-warning {
    font-size: 18px;
}
.el-icon-success {
    font-size: 18px;
}
.login-btn {
    .el-button {
        background-color: #2966ee;
        color: #fff;
        border: none;
    }
}

.keepLo .el-checkbox {
    color: #bebebf;
}
/* .el-input-group__append, .el-input-group__prepend{
    padding: 0 12px !important;
} */
.el-input-group__prepend {
    padding: 0 12px !important;
}
.loginInput .el-input__inner {
    padding-left: 37px;
    border: 1px solid #ccc;
    // background-color: #256899;
    color: #333;
}
.keepLo .el-checkbox__inner {
    border: 1px solid #46a6dc;
    background: transparent;
}
.form_container input::-webkit-input-placeholder {
    color: #ccc;
}
.form_container input:-moz-placeholder {
    color: #ccc;
}
.form_container input::-moz-placeholder {
    color: #ccc;
}
.form_container input:-ms-input-placeholder {
    color: #ccc;
}
.title_right .el-input__inner {
    background: rgba(70, 166, 220, 0.5) !important;
    color: #46a6dc;
    border: none;
}
.operateDropOption {
    background: rgba(70, 166, 220, 0.5) !important;
    ul {
        li {
            color: #fff;
        }
        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
            background-color: #46a6dc;
        }
    }
}
</style>

<style  scoped>
.login-wrap {
    /* position: relative; */
    width: 100%;
    height: 100%;
    background: 100% url('../../assets/img/login-bg.jpg') no-repeat #a8a7a3;
    background-size: cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    /* border: 2px solid #065c9a; */
    border-bottom: none;
    padding: 15px 30px 0;
    overflow: hidden;
    box-sizing: border-box;
}
.title_left {
    float: left;
}
.title_right {
    float: right;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    margin: -190px 0 0 -175px;
    background: rgba(255, 255, 255, 0.4);
    overflow: hidden;
}
.ms-content {
    /* border: 2px solid #065c9a; */
    border-top: none;
    padding: 10px 30px 30px;
}
.login-btn {
    text-align: center;
    margin-top: 10px;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
<style lang="scss" scoped>
.titlePosi {
    padding-top: 7%;
    .titleQi {
        text-align: center;
        // font-size: 53px;
        font-family: 缁忓吀缁嗗渾绠€;
        font-weight: 400;
        background: linear-gradient(to right, #009df4 0%, #00e9d0 100%);
        -webkit-background-clip: text;
        color: transparent;
    }
    .titleQiEn {
        text-align: center;
        font-size: 17px;
        font-family: FZLTXHJW;
        font-weight: normal;
        background: linear-gradient(to right, #009df4 0%, #00e9d0 100%);
        -webkit-background-clip: text;
        color: transparent;
    }
}
.jiaoBiao1 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 36px;
    height: 36px;

    .jbImg1 {
        width: 100%;
        transform: rotate(270deg);
    }
}
.jiaoBiao2 {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 36px;
    height: 36px;
    .jbImg1 {
        width: 100%;
    }
}
.jiaoBiao3 {
    position: absolute;

    width: 36px;
    height: 36px;
    left: 0px;
    bottom: 0px;
    .jbImg1 {
        width: 100%;
        transform: rotate(180deg);
    }
}
.jiaoBiao4 {
    position: absolute;

    width: 36px;
    height: 36px;
    right: 0px;
    bottom: 0px;
    .jbImg1 {
        width: 100%;
        transform: rotate(90deg);
    }
}
.topDing {
    position: absolute;
    left: 12px;
    top: 10px;
    z-index: 22;
    width: 17px;
}
</style> 