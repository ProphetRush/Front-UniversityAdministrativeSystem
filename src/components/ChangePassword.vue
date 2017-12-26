<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Settings</el-breadcrumb-item>
                    <el-breadcrumb-item>Change Password</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:30px">
            <el-col :span="9" class="warp-main">
                <el-form :model="pwdForm" status-icon ref="pwdForm" label-position="left" :rules="rules" label-width="200px" class="animated fadeIn">
                    <h2>Change Password</h2>
                    <el-form-item :label="user.user_group+' ID'">
                        <p>{{user.group_id}}</p>
                    </el-form-item>
                    <el-form-item :label="user.user_group+' Name'">
                        <p>{{user.username}}</p>
                    </el-form-item>
                    <el-form-item label="Previous Password" prop="previousPwd">
                        <el-input type="password" v-model="pwdForm.previousPwd" placeholder="Please input your current password"></el-input>
                    </el-form-item>
                    <el-form-item label="New Password" prop="newPwd">
                        <el-input type="password" v-model="pwdForm.newPwd" placeholder="Please input your new password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm new Password" prop="confirmPwd">
                        <el-input type="password" v-model="pwdForm.confirmPwd" placeholder="Please confirm your new password"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="24" style="margin-left: 20px">
                            <el-button type="default" @click="handleChangePwd" style="background: #20bfda;">SUBMIT</el-button>
                            <el-button @click="resetForm('pwdForm')" style="background: #c3d1e2">RESET</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-footer style="margin-top: 20px;text-align: center">
                    <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
                </el-footer>
            </el-col>


        </el-row>

    </el-row>

</template>

<script>
    import qs from 'qs';

    export default {
        name: "change-password",
        data(){
            var validatePass0 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input your current Password!'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input your new Password!'));
                } else {

                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input your new password again!'));
                } else if (value !== this.pwdForm.newPwd) {
                    callback(new Error('Inconsistent input! Please try again!'));
                } else {
                    callback();
                }
            };
            return{
                pwdForm: {
                    previousPwd:'',
                    newPwd: '',
                    confirmPwd:'',
                },
                user:{
                    uuid: '',
                    username: '',
                    user_group: '',
                    group_id: ''
                },
                rules: {
                    previousPwd: [
                        { validator: validatePass0, trigger: 'blur' }
                    ],
                    newPwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }

        },

        mounted: function(){
            var that = this;
            this.$axios.get("http://localhost:8000/getUser").then((resp) => {
                if(resp.data.status === 'success'){
                    that.user.username = resp.data.data.username;
                    that.user.user_group = resp.data.data.user_group;
                    that.user.uuid = resp.data.data.id;
                    that.user.group_id = resp.data.data.group_id;
                    console.log(that.user);
                }else{
                    this.$router.push("/login");
                }
            }).catch((err) =>{
                console.log(err);
                this.$router.push("/login");
            })
        },

        methods: {
            handleChangePwd(){
                this.$refs['pwdForm'].validate((valid) => {
                    if (valid) {
                        var that = this;
                        this.$axios.post("http://localhost:8000/changePassword", qs.stringify(this.pwdForm), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then((resp) => {
                            if(resp.data.status === 'success'){
                                this.$message({
                                    message: resp.data.message,
                                    type: 'success',
                                    duration: 2000,
                                    customClass: 'message-changepwd'
                                });
                                setTimeout(()=>{
                                    this.$router.push('/login');
                                }, 2000);
                            }else if(resp.data.status === 'Failed'){
                                this.$message({
                                    message: resp.data.message,
                                    type: 'error',
                                    duration: 2000,
                                    customClass: 'message-changepwd'
                                });
                            }else {
                                that.loginMessage = 'Unknown Error! Please Try Again!';
                                this.$message({
                                    message: that.loginMessage,
                                    type: 'error',
                                    duration: 2000,
                                    customClass: 'message-changepwd'
                                });
                            }
                        }).catch((err) => {
                            that.loginMessage = 'Unknown Error! Please Try Again!';
                            this.$message({
                                message: that.loginMessage,
                                type: 'error',
                                duration: 2000,
                                customClass: 'message-changepwd'
                            });
                            console.log(err);
                        })
                    } else {
                        return false;
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style scoped>
    @import "../../static/css/animate.css";
    .warp-breadcrum{
        margin-top: 20px;
        margin-left: 10px;
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

    p{
        margin: 0;

    }

    .el-button{
        width: 40%;
        height: 50px;
        padding-right: 20px;
        padding-left: 20px;
        border: none;

        color: #ffffff;
        -webkit-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        -moz-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        -o-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
        margin-top: 30px;
        margin-bottom: 10px;
        font-size:18px;
        margin-left: 25px;
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



</style>

<style>
    .message-changepwd {
        margin-top: 210px !important;
        margin-left: 180px;
    }
</style>
