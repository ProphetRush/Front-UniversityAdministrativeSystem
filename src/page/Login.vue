
<template>
    <div class="container">
        <el-container>
            <el-header>
                <el-row>
                    <h1>University Educational Administrative System</h1>
                </el-row>
            </el-header>
            <el-main>
                <el-row type="flex" justify="center">
                    <el-col :span="6">
                        <el-form :model="LoginForm" label-position="left" label-width="100px" class="animated fadeIn">
                            <h2>Sign In</h2>
                            <el-form-item label="User ID" prop="id" :rules="[
                              { type: 'number', message: 'Please input correct ID type!'}
                            ]">
                                <el-input v-model.number="LoginForm.id" placeholder="Your ID" clearable></el-input>
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
                                        <img :src="captchaImgURL" @click="getCaptcha" :loading="loading">
                                    </el-col>

                                </el-row>
                            </el-form-item>
                            <el-button type="primary" @click="handleLogin" style="width: 80%; margin-top: 30px; margin-bottom: 10px; font-size:18px">LOG IN</el-button>
                        </el-form>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer style="margin-top: 20px">
                <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
            </el-footer>
        </el-container>
    </div>

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
                    captcha: ''
                },
                captchaImgURL: '',
                loginMessage: '',
                loading: false
            }
        },
        methods: {
            getCaptcha(){
                this.loading = true;
                var that = this;
                var captchaUrl = '';
                this.$axios.get("/api/getVerificationCode").then((response)=>{
                    if(response.data.status === 'success'){
                        that.captchaImgURL = '/api/' + response.data.data.url;
                        that.loading = false;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            handleLogin(){
                var that = this;
                this.$axios.post("/api/verifyLogin", qs.stringify(this.LoginForm), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((resp) => {
                    if(resp.data.status === 'success'){
                        that.loginMessage = resp.data.data;
                        this.$message({
                            message: that.loginMessage,
                            type: 'success',
                            duration: 2000,
                            customClass: 'message-login'
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
                            duration: 2000,
                            customClass: 'message-login'
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
                            duration: 2000,
                            customClass: 'message-login'
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
                        duration: 2000,
                        customClass: 'message-login'
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
    @import "../../static/css/animate.css";
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

    .el-button:hover{
        color: #ffffff;
        background: #47d1d1 !important;
        outline: none;
    }

    .el-footer{
        color: #848484;
        font-size: 16px;
    }

    .container{
        line-height: 1.5;
        font-size: 16px;
        color: #848484;
        background-color: #f0f0f0;
        height: 100% !important;
    }




</style>

<style>
    .message-login {
        margin-top: 160px !important;
    }
</style>
