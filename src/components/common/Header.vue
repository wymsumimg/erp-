<template>
    <div>
        <div class="header" flex="cross:center main:justify">
            <!-- 折叠按钮 -->
            <!-- <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div> -->
            <div flex="cross:center">
                <div flex class="logowidth">
                    <div class="topLogo">
                        <img src="../common/comImg/index/gongdan.png" alt="" />
                    </div>
                    <div class="logo">工单中心</div>
                </div>
                <div style="margin-left: 10px">
                    <v-sidebar></v-sidebar>
                </div>
            </div>

            <div class="useres" flex="cross:center ">
                <img src="../common/comImg/index/users.png" alt="" />
                <div class="text">
                    {{ ManageName }}
                </div>
                <!-- <div class="outlogin" @click="outLogin()">退出登录</div> -->
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link"> 设置<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 密码弹窗 -->
        <div class="dialogclass">
            <el-dialog title="修改密码" :visible.sync="addLx" width="500px" @close="cancel">
                <div>
                    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
                        <el-form-item label="原密码：" prop="PwdOld" style="width: 93%">
                            <el-input v-model="form.PwdOld" placeholder="请输入原密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="PwdNew" style="width: 93%">
                            <el-input v-model="form.PwdNew" placeholder="请输入新密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="confirmPwdNew" style="width: 93%">
                            <el-input v-model="form.confirmPwdNew" placeholder="请再次输入密码" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="dioSave" @click="AddMoldType()">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
import vSidebar from './Sidebar.vue';
import { ChangePWD } from '@/api/api';
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.PwdNew) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            collapse: true,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            ManageName: '',
            addLx: false,
            form: {
                PwdNew: '',
                PwdOld: '',
                confirmPwdNew: ''
            },
            rules: {
                PwdOld: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
                PwdNew: [{ required: true, message: '请设置密码', trigger: 'blur' }],
                confirmPwdNew: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        vSidebar
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        //修改密码
        changePwd() {
            this.addLx = true;
        },
        outLogin() {
            this.$confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    localStorage.clear();
                    this.$router.replace('/login');
                })
                .catch(() => {});
        },
        AddMoldType() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.ChangePWD();
                    this.addLx = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        ChangePWD() {
            let params = {
                Account: localStorage.getItem('account'),
                PwdOld: this.form.PwdOld,
                PwdNew: this.form.confirmPwdNew
            };
            ChangePWD(params).then((res) => {
                let { Data, ReturnCode } = res;
                if (ReturnCode == 200) {
                    localStorage.clear();
                    this.$router.replace('/login');
                    this.$message({
                        message: '修改成功！请重新登陆',
                        type: 'success'
                    });
                }
            });
        },
        cancel() {
            this.$refs.form.resetFields();
        },
        handleCommand(command) {
            this[command]();
        }
    },
    mounted() {
        this.ManageName = localStorage.getItem('ManageName');
    }
};
</script>
<style scoped>
.logowidth {
    width: 170px;
    border-right: 1px solid #aabad4;
}
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
    padding: 0 20px;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.el-dropdown-link {
    margin-left: 20px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
}
.el-icon-arrow-down {
    font-size: 16px;
}
</style>
