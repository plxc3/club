<template>
    <div class="main">
        <el-button type="primary" icon="el-icon-arrow-left" class="left-button" @click="goLogin">Login</el-button>
        <h1>REGISTER</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--切换邮箱或者手机-->
            <el-form-item label="phone/email">
                <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        class="switch-button"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" v-if="value">
                <el-input v-model.number="ruleForm.phone"/>
            </el-form-item>
            <el-form-item
                    prop="email"
                    label="邮箱"
                    v-if="!value"
            >
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-show="value">
                <el-button type="success" style="width: 150px;">点击获取验证码</el-button>
                <el-input v-model="ruleForm.code" placeholder="验证码" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Registert",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            /**
             * 手机号验证
             */
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };

            return {
                ruleForm: {
                    password: '',
                    checkPass: '',
                    email:'',
                    phone: ''
                },
                value:true,
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    email:[ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ]

                },
                /**
                 * 邮箱验证
                 */
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                },
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
            goLogin(){
                this.$router.push({path:"/loginpage"})
            }
        }
    }
</script>

<style scoped>

    @media screen and (max-width: 600px){
        .main{
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0;
        }
    }
    @media screen and (min-width: 1196px){
        .main{
            text-align: center;
            width: 400px;
            margin: 78px auto;
        }
    }
    .left-button{
        float: left;
    }
    .switch-button{
        padding-top: 10px;
        float: left;
    }
</style>
