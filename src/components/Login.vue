<template>
    <el-container>
        <el-header>
            <el-row>
                <h1>University Educational Administrative System</h1>
            </el-row>
        </el-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <el-form :model="LoginForm" label-position="left" label-width="100px">
                        <h2>Sign In</h2>
                        <el-form-item label="User ID">
                            <el-input v-model="LoginForm.id" placeholder="Your ID" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Password">
                            <el-input v-model="LoginForm.pwd" type="password" placeholder="Your Password" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="User Group">
                            <el-select v-model="LoginForm.user_group" placeholder="Please choose your identity" style="width: 100%">
                                <el-option label="Students" value="Student"></el-option>
                                <el-option value="Instructor" label="Instructors"></el-option>
                                <el-option value="Root" label="Root User"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Captcha">
                            <el-row>
                                <el-col :span="12">
                                    <el-input v-model="LoginForm.captcha" placeholder="Captcha code" clearable></el-input>
                                </el-col>
                                <el-col :span="12">
                                    <img :src="captchaImgURL" @click="getCaptcha">
                                </el-col>

                            </el-row>
                        </el-form-item>
                        <el-button type="primary" @click="handleLogin" style="width: 80%; margin-top: 30px; margin-bottom: 10px">Log In</el-button>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
            <input type="hidden" :value="LoginForm.verifyARGS">
        </el-footer>
    </el-container>
</template>

<script>
    import qs from 'qs';
    import ElInput from "element-ui/packages/input/src/input";
    export default {
        components: {ElInput},
        name: "login",
        data() {
            return {
                LoginForm: {
                    id: '',
                    pwd: '',
                    user_group: '',
                    captcha: '',
                    verifyARGS: '',
                },
                captchaImgURL: '',
                loginMessage: ''
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            getCaptcha(){
                var that = this;
                var captchaUrl = '';
                this.$axios.get("http://localhost:8000/getVerificationCode").then((response)=>{
                    if(response.data.status === 'success'){
                        that.captchaImgURL = 'http://localhost:8000/' + response.data.data.url;
                        that.LoginForm.verifyARGS = response.data.data.verifyARGS;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            handleLogin(){
                var that = this;
                this.$axios.post("http://localhost:8000/verifyLogin", qs.stringify(this.LoginForm), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((resp) => {
                    if(resp.data.status === 'success'){
                        // console.log(resp.data);
                        that.loginMessage = resp.data.data;
                        this.$message({
                            message: that.loginMessage,
                            type: 'success',
                            duration: 2000
                        });
                        setTimeout(()=>{
                            this.$router.push('/');
                        }, 2000);
                    }else if(resp.data.status === 'Failed'){
                        // console.log(resp.data);
                        that.loginMessage = resp.data.message;
                        this.$message({
                            message: that.loginMessage,
                            type: 'error',
                            duration: 2000
                        });
                        that.loginMessage = resp.data.message;
                        that.getCaptcha();
                        that.LoginForm.pwd = '';
                        that.LoginForm.captcha = '';
                    }else {
                        // console.log(resp.data);
                        that.loginMessage = 'Unknown Error! Please Try Again!';
                        this.$message({
                            message: that.loginMessage,
                            type: 'error',
                            duration: 2000
                        });
                        that.getCaptcha();
                        that.LoginForm.pwd = '';
                        that.LoginForm.captcha = '';
                    }
                }).catch((err) => {
                    that.loginMessage = 'Unknown Error! Please Try Again!';
                    this.$message({
                        message: that.loginMessage,
                        type: 'error',
                        duration: 2000
                    });
                    console.log(err);
                    that.getCaptcha();
                    that.LoginForm.pwd = '';
                    that.LoginForm.captcha = '';
                })
            }
        },
        mounted: function () {
            this.getCaptcha();
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        text-align: center;
        line-height: 2;
    }


    p {
        margin: 0
    }

    form{
        padding: 30px 40px;
        margin-top: 2em;
        -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        background: #ffffff;
    }
     form h2{
         text-transform: uppercase;
         letter-spacing: 2px;
         font-size: 20px;
         margin: 0 0 60px 0;
         color: #000000;
         text-align: left;
     }
    .el-button{
        height: 50px;
        padding-right: 20px;
        padding-left: 20px;
        border: none;
        background: #33cccc;
        color: #ffffff;
        -webkit-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        -moz-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        -o-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    }



</style>

<style>
    .el-message {
        margin-top: 160px !important;
    }
    body{
        /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",sans-serif;*/
        line-height: 1.5;
        font-size: 16px;
        color: #848484;
        background-color: #f0f0f0;
    }
</style>
