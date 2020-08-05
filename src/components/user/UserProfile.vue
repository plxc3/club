<template>
<div class="main">
    <el-form ref="userProfile" :model="userProfile" label-width="80px">
        <el-form-item label="课程封面" >
            <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8002/oss/fileoss/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <!--通过img标签进行回显示-->
                <img :src="userProfile.avatar" alt="">
            </el-upload>
        </el-form-item>
        <el-form-item label="名字">
            <el-input v-model="userProfile.name" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-select v-model="userProfile.sex" placeholder="请选择活动区域">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定修改</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    export default {
        name: "UserProfile",
        data(){
            return {
                userProfile:{}
            }
        },
        methods:{
            onSubmit() {
                console.log('submit!');
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
            /**
             * 上传成功后的回调函数
             */
            handleAvatarSuccess(res){
                console.log(res)
                this.course.cover=res.data.url
                this.dialogImageUrl=res.data.url
            },
        },
        created(){
            this.userProfile.id
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

</style>
