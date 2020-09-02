<template>
    <div class="main">
        <el-button type="primary" icon="el-icon-arrow-left" class="left-button" @click="goRegister">Register</el-button>
        <h1>LOGIN</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--切换邮箱或者手机-->
            <el-form-item label="email/phone" class="switch">
                <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        class="switch-button"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" v-if="value">
                <el-input v-model.number="ruleForm.phone" prefix-icon="el-icon-phone"/>
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
            <el-form-item label="验证码" >
                <el-input
                        v-model="imgVC.imgCode"
                        placeholder="验证码"
                        autocomplete="off"
                        autocapitalize="off"
                        spellcheck="false"
                        maxlength="6"
                        style="float: left; width: 122px;"
                ></el-input>
                <div >
                    <img :src="imgVC.data" ref="code" @click="getNewImg">
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import cookie from 'js-cookie'
    import userApi from '../../api/user'
    import checkImgApi from '../../api/checkImg'

    export default {
        name: "Login",
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
            /**
             * 手机号验证
             */
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };

            return {
                userId:"",
                /**
                 *图片验证码
                 */
                imgVC:{
                    /**
                     * imgurl
                     */
                    data:"",
                    imgCodeKey:"",
                    imgCode:""
                },
                ruleForm: {
                    password: '',
                    checkPass: '',
                    email: '',
                    phone: ''
                },
                loginInfo: {},
                value: true,
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { trigger: 'blur'}
                    ],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ]

                },

            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if(this.value){
                            this.ruleForm.email=''
                        }else {
                            this.ruleForm.phone=''
                        }
                        checkImgApi.checkImgCode(this.imgVC)
                            .then(res=>{
                                this.$message({
                                    type:'success',
                                    message:res.msg
                                })
                                userApi.loginSubmit(this.ruleForm)
                                    .then(res => {
                                        /**
                                         * 获取token并放到cookie里面
                                         * 第一个参数cookie名称，参数值，作用范围
                                         */
                                        cookie.set("token", res.data.token)
                                        //调用接口获取用户信息，放到cookie里
                                        userApi.userLoginInfo()
                                            .then(res => {
                                                this.$message({
                                                    type:'success',
                                                    message:"登陆成功"
                                                })
                                                console.log(res);
                                                this.loginInfo = res.data.loginInfo
                                                //用于参数传递用
                                                this.userId=res.data.loginInfo.id
                                                this.$store.dispatch("getUserId",this.userId)
                                                cookie.set("userId",this.userId)
                                                cookie.set("userLoginInfo", this.loginInfo)
                                                window.location.href='/'
                                            })
                                    }).catch(err => console.log(err))
                            }).catch(err=>{console.log(err)})



                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goRegister() {
                this.$router.push({path: "/register"})
            },
            /**
             * 刷新验证码
             */
            getNewImg(){
                // this.imgvalue=false
                // this.$nextTick(()=>{
                //     this.imgvalue=true
                // })
                checkImgApi.getImg()
                    .then(res=>{
                        console.log(res)
                        this.imgVC.imgCodeKey=res.data.result.imgCodeKey
                        this.imgVC.data=res.data.result.data
                    })
            },
        },
        created(){
            this.getNewImg()
        }
    }
</script>

<style scoped>

    @media screen and (max-width: 600px) {
        .main {
            width: 95%;
            padding: 3px;
            position: relative;
            top: 0;
            bottom: 0;
        }
    }

    @media screen and (min-width: 1196px) {
        .main {
            text-align: center;
            width: 400px;
            margin: 78px auto;
        }
    }

    .left-button {
        float: left;
    }

    .switch-button {
        padding-top: 10px;
        float: left;
    }
</style>
