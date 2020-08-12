<template>
    <div class="main">
        <el-button type="primary" icon="el-icon-arrow-left" class="left-button" @click="goLogin">Login</el-button>
        <h1>REGISTER</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--切换邮箱或者手机-->
            <el-form-item label="email/phone">
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
                    <img :src="imgVC.data" ref="code" @click="getImgNew">
                </div>
            </el-form-item>
            <el-form-item >
                <el-button type="success" style="width: 150px;" @click="getCodeMessage">点击获取验证码</el-button>
                <el-input v-model="ruleForm.code" placeholder="验证码" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import userApi from "../../api/user"
    import checkImgApi from '../../api/checkImg'
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
                        userApi.register(this.ruleForm)
                            .then(res=>{
                                console.log(res)
                                this.$message("注册成功")
                            }).catch(err=>console.log(err))
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
            },
            /**
             * 刷新验证码
             */
            getNewImg(){
                this.imgvalue=false
                this.$nextTick(()=>{
                    this.imgvalue=true
                })
            },
            /**
             * 获取短信或者邮箱验证码
             */
            getCodeMessage(){
               if(!this.value){
                   checkImgApi.checkImgCode(this.imgVC)
                       .then(res=>{
                           console.log(res)
                           this.$message({
                               type:'success',
                               message:"邮件图片验证码通过"
                           })
                           userApi.getcodeByEmail(this.ruleForm.email)
                               .then(()=>{
                                   this.$message({
                                       type:"success",
                                       message:"邮件已发送"
                                   })
                                   /**
                                    * 调用邮件注册方法
                                    */
                                   this.ruleForm.phone=''


                               })
                       }).catch(err => console.log(err))
               }else {
                   checkImgApi.checkImgCode(this.imgVC)
                       .then(res=>{
                           console.log(res)
                           this.$message({
                               type:'success',
                               message:res.msg
                           })
                           userApi.getcodeByMsm(this.ruleForm.phone)
                               .then(()=>{
                                   this.$message({
                                       type:"success",
                                       message:"手机短信发送成功"
                                   })
                               })
                           /**
                            * 调用注册方法
                            */
                           this.ruleForm.email=''
                       }).catch(err => console.log(err))
               }
            },
            /**
             * 刷新验证码
             */
            getImgNew(){
                checkImgApi.getImg()
                    .then(res=>{
                        console.log(res)
                        this.imgVC.imgCodeKey=res.data.result.imgCodeKey
                        this.imgVC.data=res.data.result.data
                    })
            },
        },
        created(){
                this.getImgNew()
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
    .verify{
        display: flex;
        flex-direction: column;
    }
</style>
