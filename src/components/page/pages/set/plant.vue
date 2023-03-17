<template>
    <div class="container">
        <div class="center">
            <div class="title">工厂设置</div>
            <div class="basics">
                基础信息
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin: 29px 0 30px 80px"
                >
                    <el-form-item label="登录账号"> 159****9887 </el-form-item>
                    <el-form-item label="到期时间"> 2023-01-01 </el-form-item>
                    <el-form-item label="工厂名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入工厂名称"></el-input>
                    </el-form-item>
                    <el-form-item label="工厂地址">
                        <el-input v-model="ruleForm.address" placeholder="请输入工厂地址"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="ruleForm.linkman" placeholder="请输入联系人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="工厂logo" prop="logo">
                        <el-upload
                            action="#"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :http-request="upload"
                        >
                            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                            <!-- 上传进度条 -->
                            <el-progress v-if="showProgress" type="circle" :percentage="percent" class="progress" />
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="basics">
                其他信息
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 29px 0 30px 80px">
                    <el-form-item label="订单编号设置">
                        <el-radio-group v-model="ruleForm.order">
                            <el-radio :label="true">随系统生成</el-radio>
                            <el-radio :label="false">手动录入</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="料号编号设置">
                        <el-radio-group v-model="ruleForm.part">
                            <el-radio :label="true">随系统生成</el-radio>
                            <el-radio :label="false">手动录入</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="订单编号前缀名">
                        <el-input v-model="ruleForm.precondition" placeholder="请输入订单号前缀"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="basics">
                编程设置
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 29px 0 30px 0">
                    <el-form-item label="是否开启编程代码审核功能" label-width="180px">
                        <el-radio-group v-model="ruleForm.codeReviews">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否开启随传随加工功能" label-width="180px">
                        <el-radio-group v-model="ruleForm.timelyProcessing">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <div class="basics">
                预警设置
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin: 29px 0 30px 80px">
                    <el-form-item label="交付预警（天）">
                        <el-input-number v-model="ruleForm.day" :min="0" style="width: 180px; height: 40px"></el-input-number>
                    </el-form-item>
                </el-form>
            </div>
            <div class="footer">
                <div class="ftr-btn">
                    <button class="save" @click="submitForm('ruleForm')">保存</button>
                    <button class="call" @click="resetForm('ruleForm')">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                address: '',
                linkman: '',
                phone: '',
                email: '',
                logo: '',
                order: true,
                part: true,
                precondition: '',
                codeReviews: true,
                timelyProcessing: true,
                day: 0
            },
            rules: {
                name: [{ required: true, message: '请输入工厂名称', trigger: 'blur' }],
                linkman: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                logo: [{ required: true, message: '请上传logo', trigger: 'blur' }]
            },
            showProgress: false
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.logo = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        upload(res, file) {
            console.log(res, file);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../common/set.scss';
</style>
